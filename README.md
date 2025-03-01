# SVG2ICO
The simplest command-line tool to batch convert SVG files to ICO (Windows icon / Favicon) format.

## 📋 Overview

**SVG2ICO** converts SVG vector graphics into ICO files that can be used for:
- Windows application icons
- Website favicons (favicon.ico)
- File association icons
- Any other use case requiring ICO format

## 🚀 Installation

### Install globally (recommended)
> [!IMPORTANT]
> During the setup always make sure you're using complete paths (not relative). The setup command creates a config file at your home directory ```Ex. /Users/yourname/.svg2ico-config.json```.
```bash
npm install -g svg2ico && svg2ico-setup
now you generate files with: "svg2ico" 
```

### Updating Icon sizes and folder paths:
 ```Bash
 svg2ico-update
 or 
 svg2ico-resize - this option retains system paths and only updates sizes.
 You can also use the [Path Override](#path-override) to update sizes for specific files.
 ```

> Use [This Guide](https://github.com/visyoss/Assets/blob/2471b7675648816ad40acb568ea593f967540926/cheat-sheet's/icon-sizing.md) for a cheat-sheet on Web based Icons.

### Path override
Path overrides can be created with the following command:

```bash
svg2ico [SVG-folder] [Converted-ICO-folder]
```

#### Parameters:

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| `input-folder` | Directory containing SVG files to convert | `"../Desktop/Design/icons"` |
| `output-folder` | Directory where the new ICO files will be saved | `"../Desktop/Design/converted-ico-files"` |

### Desktop Shortcut (Optional)
> [!NOTE]
> This is only available on windows.

This repository includes a [bat file](./src/run-svg2ico.bat). Which makes it possible to run the converter from a button (Shortcut) on your desktop.

## Creating the shortcut:

1. Right-click on your desktop
2. Select "New" > "Shortcut"
3. Input the path to ```run-svg2ico.bat```
4. Click "Next" and give your shortcut a name (e.g., "SVG to ICO Converter")
5. Click "Finish"
> [!TIP]
> The path to ```run-svg2ico.bat``` is in the projects root folder I.E ```~/svg2ico/run-svg2ico.bat```

Now you can run the converter with a single click from your desktop!


### Process flow:

1. SVG files are read from the input folder
2. Each SVG is converted to a high-quality PNG 
    > Default's to 64x64px, you can update that [here](#updating-icon-sizes-and-folder-paths).
3. PNGs are then converted to ICO format
4. ICO files are saved to the output folder

## 📦 Dependencies

**This tool relies on the following npm packages:**

- [sharp](https://www.npmjs.com/package/sharp) - Handles SVG to PNG conversion.
- [png-to-ico](https://www.npmjs.com/package/png-to-ico) - Handles PNG to ICO conversion.
- [@shopify/cli-kit](https://www.npmjs.com/package/@shopify/cli-kit) - Provides CLI utilities.
- [rimraf](https://www.npmjs.com/package/rimraf) - Used for cleaning up directories.
- [ts-node](https://www.npmjs.com/package/ts-node) - TypeScript execution environment.
- [typescript](https://www.npmjs.com/package/typescript) - TypeScript language support.


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Security

This project is completely local as in no data gets sent out or collected. It should be safe to use on any system.

> [!IMPORTANT]
> Report venerability's to dev@webflok.com or create a [GitHub Issue](https://github.com/visyoss/SVG-to-ICO-converter/issues/new/choose).

## 📄 License

This project is licensed under the MIT [LICENSE](LICENSE)

## 👨‍💻 Author

[Ethan](https://github.com/visyoss)