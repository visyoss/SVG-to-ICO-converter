# SVG2ICO
The simplest command-line tool to batch convert SVG files to ICO (Windows icon / Favicon) format.

## 📋 Overview

**SVG2ICO** converts SVG vector graphics into ICO files that can be used for:
- Windows application icons
- Website favicons (favicon.ico)
- File association icons
- Any other use case requiring ICO format

This tool maintains image quality by first converting SVGs to high-resolution PNG files (256x256) and then to ICO format, ensuring crisp icons at all sizes.
> [!TIP]
> You can change the default PNG sizing in ```batch-convert.js: line 43.```

## 🚀 Installation

### Option 1: Install globally (recommended)

```bash
npm install -g svg2ico
```

This makes the `svg2ico` command available system-wide.

### Option 2: Clone the repository
> [!NOTE]
> NPM / Node is required this programs only been tested with [Node.js Version 20](https://nodejs.org/en/download).

```bash
# Clone the repository
git clone https://github.com/visyoss/SVG-to-ICO-converter.git 

# Or with GitHub CLI
gh repo clone visyoss/SVG-to-ICO-converter

# Navigate to the project directory
cd ~/SVG-to-ICO-converter

# Install dependencies
npm install
```
> [!NOTE]
> To change the program / cloned repos folder name add a new name after the clone command 

**Example**: ```git clone https://github.com/visyoss/SVG-to-ICO-converter.git svg2ico``` 
- Replace svg2ico with desired name.

## 🔧 Default path & PNG Config

Modify the default folder in [batch-convert.js](./batch-convert.js) on line 9-10.

```javascript
// Default paths (edit these to match your systems locations)
const DEFAULT_INPUT_FOLDER = "../Desktop/Design/icons";
const DEFAULT_OUTPUT_FOLDER = "../Desktop/Design/converted-ico-files";
```
### Updating PNG sizing 
To update default sizing modify this [File](./batch-convert.js). PNG sizing determines the .ico's file's size. 

```javascript
// line 42-44
await sharp(inputPath)
        .resize(256, 256) // Standard icon size
        .png()
```

> [!TIP]
> Use [This Guide](https://github.com/visyoss/Assets/blob/2471b7675648816ad40acb568ea593f967540926/cheat-sheet's/icon-sizing.md) for a list of web based Icon size defaults.

## 💻 Command Line Use

### You can override the default folder's with:
```bash
svg2ico [SVG-folder] [Converted-ICO-folder]
```
### Using set folder locations: 

```bash
svg2ico
```
> [!TIP] 
> Update the [Conversion file](./batch-convert.js). To match your systems SVG & converted ICO folder locations.
[More Info📎](#-default-path--png-config)
#### Parameters:

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| `input-folder` | Directory containing SVG files to convert | `"../Desktop/Design/icons"` |
| `output-folder` | Directory where the new ICO files will be saved | `"../Desktop/Design/converted-ico-files"` |

### Desktop Shortcut (Optional)
> [!NOTE]
> This is only available on windows.

This repository includes a [batch file](batch-convert.js). This makes it possible to run the converter from a button (Shortcut) on your desktop.

## Creating the shortcut:

1. Right-click on your desktop
2. Select "New" > "Shortcut"
3. Input the path to ```run-svg2ico.bat```
4. Click "Next" and give your shortcut a name (e.g., "SVG to ICO Converter")
5. Click "Finish"
> [!TIP]
> The path to ```run-svg2ico.bat``` is in the projects root folder I.E ```~/SVG-to-ICO-converter/run-svg2ico.bat```

Now you can run the converter with a single click from your desktop!
## Linux setup
The setup to get this program working is the same as Windows. Shortcuts aren't available that I know of but you can create something very similar by:

> Creating an alias for the program

```bash
alias svg2ico='path/to/convert/file/batch-convert.js'
```
1. Add this line to you Bash file at ```~/.bashrc```.
    > Systems other than Ubuntu may have different paths.
2. Make the alias usable  ```source ~/.bashrc```. 
3. Now the program can be ran from anywhere in your system by just calling the alias name I.E ```svg2ico```.
> [!TIP]
>  The "alias" (In this example ```svg2ico```) name can be anything. You'll use this name to call the program whenever you want to generate new ICO file's.

### Process flow:

1. SVG files are read from the input folder
2. Each SVG is converted to a high-quality PNG 
    > Default's to 256x256px, you can update that [here](#-configuration).
3. PNGs are then converted to ICO format
4. ICO files are saved to the output folder

## 📦 Dependencies

**This tool relies on the following npm packages:**

- [sharp](https://www.npmjs.com/package/sharp) - Handles SVG to PNG conversion.
    > Version (2.1.8)
- [png-to-ico](https://www.npmjs.com/package/png-to-ico) - Handles PNG to ICO conversion.
    > Version (0.33.5)
## 🔍 Troubleshooting:

- **Error: Cannot find module '*Package Name*'**: Run `npm install` in the project directory / root.
- **Permission errors**: Run with administrator privileges or adjust folder permissions
- **Output folder not found**: The tool will attempt to create the output folder if it doesn't exist.
- **Error: Input file contains unsupported image format**: Usually the cause of this is a malformed SVG, you can troubleshoot this in VS Code with an extension like [SVG syntax / preview](https://marketplace.visualstudio.com/items?itemName=jock.svg).


> [!NOTE]
> If you encounter an error not listed here, create an issue [here](https://github.com/visyoss/SVG-to-ICO-converter/issues/new/choose). If you find the solution please add that (or create a contribution).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
> [!NOTE]
> If you update how the program functions make sure to update this file for future users. Also any contributions should include a description on what you've added. 

## 🛠️ Issues
If you encounter any issues, please report them on the [GitHub Issue](https://github.com/visyoss/SVG-to-ICO-converter/issues/new/choose). page. Include your OS, Node.js version, and steps to reproduce the issue.

### Security

This project is completely local as in no data get's sent out or collected. Always Ensure dependencies (sharp and png-to-ico) are up to date as best practice.

> [!IMPORTANT]
> Report venerability's to dev@webflok.com or create a [GitHub Issue](https://github.com/visyoss/SVG-to-ICO-converter/issues/new/choose).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

[Ethan](https://github.com/visyoss)