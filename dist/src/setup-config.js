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
const configPath = path_1.default.join(os_1.default.homedir(), '.svg2ico-config.json');
const rl = readline_1.default.createInterface({
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
    const useTimeout = await askQuestion("If you're not developing this project set to false all this does is slow the script down.(true/false): ");
    const config = {
        inputFolder: inputFolder.trim() || "C:/path/to/default/input",
        outputFolder: outputFolder.trim() || "C:/path/to/default/output",
        pngSize: parseInt(pngSize.trim(), 10) || 256,
        useTimeout: useTimeout.trim().toLowerCase() === 'true'
    };
    if (overwrite) {
        fs_1.default.unlinkSync(configPath);
        console.log("Existing configuration file removed.");
    }
    fs_1.default.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`Configuration file created at ${configPath}`);
    rl.close();
}
async function updateConfig() {
    if (fs_1.default.existsSync(configPath)) {
        const answer = await askQuestion('Configuration file already exists. Do you want to overwrite it? (yes/no): ');
        if (answer.toLowerCase() === 'yes') {
            await createConfig(true);
        }
        else {
            console.log('Aborting update.');
            rl.close();
        }
    }
    else {
        await createConfig();
    }
}
async function setPngSize() {
    const pngSize = await askQuestion("Enter the new default PNG size (e.g., 256 for 256x256): ");
    const config = fs_1.default.existsSync(configPath) ? JSON.parse(fs_1.default.readFileSync(configPath, 'utf-8')) : { inputFolder: '', outputFolder: '', pngSize: 256, useTimeout: false };
    config.pngSize = parseInt(pngSize.trim(), 10) || 256;
    fs_1.default.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`PNG size updated to ${config.pngSize} in ${configPath}`);
    rl.close();
}
async function main() {
    if (process.argv.includes("--update")) {
        await updateConfig();
    }
    else if (process.argv.includes("--set-size")) {
        await setPngSize();
    }
    else if (!fs_1.default.existsSync(configPath)) {
        await createConfig();
    }
    else {
        const answer = await askQuestion('Configuration file already exists. Do you want to overwrite it? (yes/no): ');
        if (answer.toLowerCase() === 'yes') {
            await createConfig(true);
        }
        else {
            console.log('Aborting setup.');
            rl.close();
        }
    }
}
main().catch(console.error);
