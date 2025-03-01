#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');

// Dynamically import the Shopify CLI Kit UI module
async function loadShopifyUI() {
    const { renderInfo, renderSuccess, renderWarning, renderError, renderTasks } = await import('@shopify/cli-kit/node/ui');
    return { renderInfo, renderSuccess, renderWarning, renderError, renderTasks };
}

(async () => {
    const { renderInfo, renderSuccess, renderWarning, renderError, renderTasks } = await loadShopifyUI();

    // Read global configuration file
    const configPath = path.join(os.homedir(), '.svg2ico-config.json');
    let config = {};
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }

    // Get input and output directories from command line arguments or config file
    const args = process.argv.slice(2);
    const inputFolder = args[0] ? path.resolve(args[0]) : path.resolve(config.inputFolder || path.join(__dirname, '../../Desktop/Design/all-icons'));
    const outputFolder = args[1] ? path.resolve(args[1]) : path.resolve(config.outputFolder || path.join(__dirname, '../Desktop/Design/conv-ico'));
    const pngSize = config.pngSize || 256; // Read PNG size from config, default to 256

    // Ensure output folder exists
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
    }

    renderInfo(`Input folder: ${inputFolder}`);
    renderInfo(`Output folder: ${outputFolder}`);

    fs.readdir(inputFolder, async (err, files) => {
        if (err) {
            renderError('Error reading folder:', err);
            return;
        }

        const svgFiles = files.filter(file => file.endsWith('.svg'));

        if (svgFiles.length === 0) {
            renderWarning('No SVG files found.');
            return;
        }

        renderInfo(`Found ${svgFiles.length} SVG files to convert...`);

        const tasks = svgFiles.map(file => ({
            title: `Converting ${file}`,
            task: async () => {
                const inputPath = path.join(inputFolder, file);
                const outputPath = path.join(outputFolder, file.replace('.svg', '.ico'));
                const pngTemp = path.join(outputFolder, `${file}.temp.png`);

                try {
                    // Convert SVG to PNG first
                    await sharp(inputPath)
                        .resize(pngSize, pngSize) // Use configured size
                        .png()
                        .toFile(pngTemp);

                    // Introduce a 3-second pause for testing
                    await new Promise(resolve => setTimeout(resolve, 3000));

                    // Then convert PNG to ICO using png-to-ico
                    const icoBuffer = await pngToIco([pngTemp]);
                    fs.writeFileSync(outputPath, icoBuffer);

                    // Remove temporary PNG file
                    fs.unlinkSync(pngTemp);

                    renderSuccess(`✅ Converted: ${file} -> ${file.replace('.svg', '.ico')}`);
                } catch (error) {
                    renderError(`❌ Error converting ${file}:`, error);
                }
            }
        }));

        await renderTasks(tasks);

        renderSuccess('🎉 Batch conversion completed!');
    });
})();
