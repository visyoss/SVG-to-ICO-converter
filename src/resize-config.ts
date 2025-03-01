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

async function setPngSize(): Promise<void> {
    const pngSize = await askQuestion("Enter the new default PNG size (e.g., 256 for 256x256): ");
    const config: Config = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf-8')) : { inputFolder: '', outputFolder: '', pngSize: 256, useTimeout: false };
    config.pngSize = parseInt(pngSize.trim(), 10) || 256;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`PNG size updated to ${config.pngSize} in ${configPath}`);
    rl.close();
}

setPngSize();