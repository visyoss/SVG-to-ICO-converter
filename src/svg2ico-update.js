#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import os from 'os';
import readline from 'readline';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Dynamically import the Shopify CLI Kit UI module
async function loadShopifyUI() {
    const { renderInfo, renderSuccess, renderWarning, renderError } = await import('@shopify/cli-kit/node/ui');
    return { renderInfo, renderSuccess, renderWarning, renderError };
}

// Path to the configuration file
const configPath = path.join(os.homedir(), '.svg2ico-config.json');

// Function to prompt user for input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

// Main function to update the configuration
async function updateConfig() {
    const { renderInfo, renderSuccess, renderWarning, renderError } = await loadShopifyUI();

    if (fs.existsSync(configPath)) {
        renderInfo(`Configuration file already exists at ${configPath}.`);
        const answer = await askQuestion('Do you want to overwrite it? (yes/no): ');
        if (answer.toLowerCase() !== 'yes') {
            renderWarning('Aborting update.');
            rl.close();
            return;
        }
        fs.unlinkSync(configPath);
    }

    const inputFolder = await askQuestion('Enter the input folder path: ');
    const outputFolder = await askQuestion('Enter the output folder path: ');
    const pngSize = await askQuestion('Enter the PNG size (default is 256): ');

    const config = {
        inputFolder: inputFolder.trim(),
        outputFolder: outputFolder.trim(),
        pngSize: parseInt(pngSize.trim()) || 256
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    renderSuccess(`Configuration updated successfully at ${configPath}.`);

    rl.close();
}

updateConfig();