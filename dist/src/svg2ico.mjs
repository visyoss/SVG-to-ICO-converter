#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import os from 'os';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { renderInfo, renderSuccess, renderWarning, renderError, renderTasks } from '@shopify/cli-kit/node/ui';
(async () => {
    // Read global configuration file
    const configPath = path.join(os.homedir(), '.svg2ico-config.json');
    let config = {};
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }
    // Get input and output directories from command line arguments or config file
    const args = process.argv.slice(2);
    const inputFolder = args[0]
        ? path.resolve(args[0])
        : path.resolve(config.inputFolder || path.join(__dirname, '../../Desktop/Design/all-icons'));
    const outputFolder = args[1]
        ? path.resolve(args[1])
        : path.resolve(config.outputFolder || path.join(__dirname, '../Desktop/Design/conv-ico'));
    const pngSize = config.pngSize || 256; // Default PNG size
    // Ensure output folder exists
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
    }
    renderInfo({ headline: 'Conversions started' });
    fs.readdir(inputFolder, async (err, files) => {
        if (err) {
            renderError({ headline: `Error reading folder: ${err}` });
            return;
        }
        const svgFiles = files.filter((file) => file.endsWith('.svg'));
        if (svgFiles.length === 0) {
            renderWarning({ headline: 'No SVG files found.' });
            return;
        }
        const tasks = svgFiles.map((file) => ({
            title: `Converting ${file}`,
            task: async () => {
                const inputPath = path.join(inputFolder, file);
                const outputPath = path.join(outputFolder, file.replace('.svg', '.ico'));
                const pngTemp = path.join(outputFolder, `${file}.temp.png`);
                try {
                    // Convert SVG to PNG first
                    await sharp(inputPath)
                        .resize(pngSize, pngSize)
                        .png()
                        .toFile(pngTemp);
                    // Introduce a 3-second pause (for testing)
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    // Convert PNG to ICO using png-to-ico
                    const icoBuffer = await pngToIco([pngTemp]);
                    fs.writeFileSync(outputPath, new Uint8Array(icoBuffer));
                    // Remove temporary PNG file
                    fs.unlinkSync(pngTemp);
                }
                catch (error) {
                    renderError({ headline: `❌ Error converting ${file}: ${error}` });
                }
            }
        }));
        // Run tasks sequentially so only one progress bar is active at a time.
        await renderTasks(tasks);
        renderSuccess({ headline: '🎉 Batch conversion completed!' });
    });
})();
