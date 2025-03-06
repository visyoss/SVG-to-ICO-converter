<a align="center"> 
    <p align="center">
  <picture>
    <img alt="SVG to ICO file converter" src="https://github.com/user-attachments/assets/bf262cfd-5131-441b-8c66-9f78c53aa73a">
    </picture>
  </a>
</p>
    <h2 align="center">
    SVG2ICO</h2>

<h4 align="center"> 
👨‍💻 Author: <a href="https://github.com/visyoss">Ethan</a> |
📄 License: <a href="https://github.com/visyoss/svg2ico/blob/bd6c01f8e35ffbed2f17155b014302201caee884/LICENSE">MIT</a> |
📧 Email: <a href="mailto:dev@webflok.com">dev@webflok.com</a>
</h4>
</h4>
<p align="center">
  The simplest command-line tool to convert SVG files to ICO format.
  (Windows icon / Favicon) format.
</p>


---

## 📋 Overview

**SVG2ICO** converts SVG vector graphics into ICO files that can be used for:
- Windows application icons
- Website favicons (favicon.ico)
- File association icons
- Any other use case requiring ICO format
---

## 🚀 Getting Started

### Installation & Setup:
> 📦 Prerequisites: [npm v20+↗](https://nodejs.org/en/download/)
```bash
npm install -g svg2ico && svg2ico-setup
```

---
### Interacting with the tool:

- ```svg2ico``` - Runs the converter.
- ```svg2ico-update```- Used to update path & size.
- ```svg2ic-resize``` - Used to edit the output (.ico) sizes.
- ```svg2ico [SVG-folder] [Converted-ICO-folder]``` - Used temporarily override converter paths.
---
#### Parameters:

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| `input-folder` | Directory containing SVG files to convert | `"../Desktop/Design/icons"` |
| `output-folder` | Directory where the new ICO files will be saved | `"../Desktop/Design/converted-ico-files"` |
| `icon-size` | Size of the output ICO files | `64x64 px` |

---
## Process flow:

1. SVG files are read from the input folder
2. Each SVG is converted to a high-quality PNG 
3. PNGs are then converted to ICO format
4. ICO files are saved to the output folder

---



<!-- ### !!!! Temporary removal, the bat file is not reliable.

Desktop Shortcut (Optional) 
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

Now you can run the converter with a single click from your desktop! -->