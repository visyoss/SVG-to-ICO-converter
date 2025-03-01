#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import os from 'os';
import readline from 'readline';

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
    if (fs.existsSync(configPath)) {
        console.log(`Configuration file already exists at ${configPath}.`);
        const answer = await askQuestion('Do you want to overwrite it? (yes/no): ');
        if (answer.toLowerCase() !== 'yes') {
            console.log('Aborting update.');
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
    console.log(`Configuration updated successfully at ${configPath}.`);

    rl.close();
}

updateConfig();