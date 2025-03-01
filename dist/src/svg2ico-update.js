#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const readline_1 = __importDefault(require("readline"));
// Path to the configuration file
const configPath = path_1.default.join(os_1.default.homedir(), '.svg2ico-config.json');
// Function to prompt user for input
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));
// Main function to update the configuration
async function updateConfig() {
    if (fs_1.default.existsSync(configPath)) {
        console.log(`Configuration file already exists at ${configPath}.`);
        const answer = await askQuestion('Do you want to overwrite it? (yes/no): ');
        if (answer.toLowerCase() !== 'yes') {
            console.log('Aborting update.');
            rl.close();
            return;
        }
        fs_1.default.unlinkSync(configPath);
    }
    const inputFolder = await askQuestion('Enter the input folder path: ');
    const outputFolder = await askQuestion('Enter the output folder path: ');
    const pngSize = await askQuestion('Enter the PNG size (default is 256): ');
    const config = {
        inputFolder: inputFolder.trim(),
        outputFolder: outputFolder.trim(),
        pngSize: parseInt(pngSize.trim(), 10) || 256
    };
    fs_1.default.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`Configuration updated successfully at ${configPath}.`);
    rl.close();
}
updateConfig();
