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

const configPath = path.join(os.homedir(), '.svg2ico-config.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function createConfig(overwrite = false) {
    const { renderInfo, renderSuccess, renderWarning, renderError } = await loadShopifyUI();
    renderInfo(overwrite ? "Updating configuration file." : "Setting up configuration file.");
    
    const inputFolder = await askQuestion("Enter the input folder path: ");
    const outputFolder = await askQuestion("Enter the output folder path: ");
    const pngSize = await askQuestion("Enter the default PNG size (e.g., 64 for 64x64): ");
    const useTimeout = await askQuestion("If you're not developing this project set to false all this does is slow the script down.(true/false): ");
    
    const config = {
        inputFolder: inputFolder.trim() || "C:/path/to/default/input",
        outputFolder: outputFolder.trim() || "C:/path/to/default/output",
        pngSize: parseInt(pngSize.trim(), 10) || 256,
        useTimeout: useTimeout.trim().toLowerCase() === 'true'
    };
    
    if (overwrite) {
        fs.unlinkSync(configPath);
        renderInfo("Existing configuration file removed.");
    }
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    renderSuccess(`Configuration file created at ${configPath}`);
    
    rl.close();
}

async function updateConfig() {
    const { renderInfo, renderSuccess, renderWarning, renderError } = await loadShopifyUI();
    if (fs.existsSync(configPath)) {
        await createConfig(true);
    } else {
        renderWarning("No existing configuration file found. Creating a new one.");
        await createConfig();
    }
}

async function setPngSize() {
    const { renderInfo, renderSuccess, renderWarning, renderError } = await loadShopifyUI();
    const pngSize = await askQuestion("Enter the new default PNG size (e.g., 256 for 256x256): ");
    const config = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath)) : {};
    config.pngSize = parseInt(pngSize.trim(), 10) || 256;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    renderSuccess(`PNG size updated to ${config.pngSize} in ${configPath}`);
    rl.close();
}

(async () => {
    const { renderInfo, renderSuccess, renderWarning, renderError } = await loadShopifyUI();
    if (process.argv.includes("--update")) {
        updateConfig();
    } else if (process.argv.includes("--set-size")) {
        setPngSize();
    } else if (!fs.existsSync(configPath)) {
        createConfig();
    } else {
        renderInfo(`Configuration file already exists at ${configPath}`);
    }
})();
