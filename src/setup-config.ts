#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import os from 'os';
import readline from 'readline';

interface Config {
    inputFolder: string;
    outputFolder: string;
    pngSize: number;
    useTimeout: boolean;
}

const configPath = path.join(os.homedir(), '.svg2ico-config.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query: string): Promise<string> {
    return new Promise(resolve => rl.question(query, resolve));
}

async function createConfig(overwrite = false): Promise<void> {
    console.log(overwrite ? "Updating configuration file." : "Setting up configuration file.");
    
    const inputFolder = await askQuestion("Enter the input folder path: ");
    const outputFolder = await askQuestion("Enter the output folder path: ");
    const pngSize = await askQuestion("Enter the default PNG size (e.g., 64 for 64x64): ");
    const useTimeout = await askQuestion("dev mode (slows the conversater).(true/false): ");
    
    const config: Config = {
        inputFolder: inputFolder.trim() || "C:/path/to/default/input",
        outputFolder: outputFolder.trim() || "C:/path/to/default/output",
        pngSize: parseInt(pngSize.trim(), 10) || 256,
        useTimeout: useTimeout.trim().toLowerCase() === 'true'
    };
    
    if (overwrite) {
        fs.unlinkSync(configPath);
        console.log("Existing configuration file removed.");
    }
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`Configuration file created at ${configPath}`);
    
    rl.close();
}

async function updateConfig(): Promise<void> {
    if (fs.existsSync(configPath)) {
        const answer = await askQuestion('Configuration file already exists. Do you want to overwrite it? (yes/no): ');
        if (answer.toLowerCase() === 'yes') {
            await createConfig(true);
        } else {
            console.log('Aborting update.');
            rl.close();
        }
    } else {
        await createConfig();
    }
}

async function setPngSize(): Promise<void> {
    const pngSize = await askQuestion("Enter the new default PNG size (e.g., 256 for 256x256): ");
    const config: Config = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf-8')) : { inputFolder: '', outputFolder: '', pngSize: 256, useTimeout: false };
    config.pngSize = parseInt(pngSize.trim(), 10) || 256;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`PNG size updated to ${config.pngSize} in ${configPath}`);
    rl.close();
}

async function main() {
    if (process.argv.includes("--update")) {
        await updateConfig();
    } else if (process.argv.includes("--set-size")) {
        await setPngSize();
    } else if (!fs.existsSync(configPath)) {
        await createConfig();
    } else {
        const answer = await askQuestion('Configuration file already exists. Do you want to overwrite it? (yes/no): ');
        if (answer.toLowerCase() === 'yes') {
            await createConfig(true);
        } else {
            console.log('Aborting setup.');
            rl.close();
        }
    }
}

main().catch(console.error);