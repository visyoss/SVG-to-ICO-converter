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

### Install globally (recommended)
> [!IMPORTANT]
> The setup command will prompt for SVG (Input Folder) & ICO (Output Folder) paths, always include the entire path (not relative) to insure the program can reach the folder('s).
```bash
npm install -g svg2ico && \npm run svg2ico-setup
## The setup command is required to set default SVG and output ICO folders. 
```
Now you can run `svg2ico` in your terminal. Your new ICO files will be at the path you put in the setup command.
>[!TIP] 
> If you ever need to update the path's to folders run:
> ```Bash
> npm run svg2ico-update
> ```

### PNG sizing 

The PNG size defines the size of the generated ICO file, you can update the size at any point with:
```bash
npm run svg2ico-png-resize
```
- This script will prompt you for a "px" size type so you're input should look similar to:
    - "16" = "16x16px"
    - "32" = "32x32"
- After you've updated the sizing simply run the ```svg2ico``` command and program will automatically update all your ICO files. 
> [!TIP]
> Looking to only update sizes for one file or specific files? Add a new folder in you're SVG's main folder with the SVG's you intend to resize then run the command with [Path Override](#path-override)

> [!TIP]
> Use [This Guide](https://github.com/visyoss/Assets/blob/2471b7675648816ad40acb568ea593f967540926/cheat-sheet's/icon-sizing.md) for a cheat-sheet on Web based Icons.

## 💻 Command Line Use
### Setup
> [!TIP]
> Setup default folder locations by running:
> ```Bash
> npm run svg2ico-setup
> ```
<!-- > 3. If the output folder doesn't exist the program will create a folder with the name you include. -->
### Path override
Path overrides can be useful by allowing you to create separate folders from your default, like if you wanted specific icons to be a specific size but don't want to modify all your SVG / ICO files.

```bash
svg2ico [SVG-folder] [Converted-ICO-folder]
```
> [!TIP]
> When running the command you wont include brackets.
> 1. **Example:** ```svg2ico /your/path/folder-with-svg-files /your/path/folder-for-new-ico-files```
### After using setup command to set folder locations: 

```bash
svg2ico
```

#### Parameters:

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| `input-folder` | Directory containing SVG files to convert | `"../Desktop/Design/icons"` |
| `output-folder` | Directory where the new ICO files will be saved | `"../Desktop/Design/converted-ico-files"` |

### Desktop Shortcut (Optional)
> [!NOTE]
> This is only available on windows. [Linux Example](#linux-setup)

This repository includes a [bat file](./src/run-svg2ico.bat). Which makes it possible to run the converter from a button (Shortcut) on your desktop.

## Creating the shortcut:

1. Right-click on your desktop
2. Select "New" > "Shortcut"
3. Input the path to ```run-svg2ico.bat```
4. Click "Next" and give your shortcut a name (e.g., "SVG to ICO Converter")
5. Click "Finish"
> [!TIP]
> The path to ```run-svg2ico.bat``` is in the projects root folder I.E ```~/SVG-to-ICO-converter/run-svg2ico.bat```

Now you can run the converter with a single click from your desktop!

## Linux setup (Optional)
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