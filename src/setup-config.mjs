#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const configPath = path.join(os.homedir(), '.svg2ico-config.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function createConfig(overwrite = false) {
    console.log(overwrite ? "Updating configuration file." : "Setting up configuration file.");
    
    const inputFolder = await askQuestion("Enter the input folder path: ");
    const outputFolder = await askQuestion("Enter the output folder path: ");
    const pngSize = await askQuestion("Enter the default PNG size (e.g., 64 for 64x64): ");
    
    const config = {
        inputFolder: inputFolder.trim() || "C:/path/to/default/input",
        outputFolder: outputFolder.trim() || "C:/path/to/default/output",
        pngSize: parseInt(pngSize.trim(), 10) || 256
    };
    
    if (overwrite) {
        fs.unlinkSync(configPath);
        console.log("Existing configuration file removed.");
    }
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`Configuration file created at ${configPath}`);
    
    rl.close();
}

async function updateConfig() {
    if (fs.existsSync(configPath)) {
        await createConfig(true);
    } else {
        console.log("No existing configuration file found. Creating a new one.");
        await createConfig();
    }
}

async function setPngSize() {
    const pngSize = await askQuestion("Enter the new default PNG size (e.g., 256 for 256x256): ");
    const config = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath)) : {};
    config.pngSize = parseInt(pngSize.trim(), 10) || 256;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`PNG size updated to ${config.pngSize} in ${configPath}`);
    rl.close();
}

if (process.argv.includes("--update")) {
    updateConfig();
} else if (process.argv.includes("--set-size")) {
    setPngSize();
} else if (!fs.existsSync(configPath)) {
    createConfig();
} else {
    console.log(`Configuration file already exists at ${configPath}`);
}
