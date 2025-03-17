# AI Pop-Up Chromium Extension

A Chromium extension that detects when a user visits AI-related websites (such as ChatGPT or Claude) and displays a pop-up message.

This repository contains all the code, resources, and documentation you need to install, configure, and maintain the extension for both personal and organizational use.

![Screenshot 2024-11-28 094245](https://github.com/user-attachments/assets/b53c99ad-27af-4fa1-ad19-e97c12012929)

## Table of Contents

- [AI Pop-Up Chromium Extension](#ai-pop-up-chromium-extension)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [How It Works](#how-it-works)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Local Setup](#local-setup)
    - [Organisation Setup](#organisation-setup)
  - [Usage](#usage)
  - [Configuration](#configuration)
    - [`target-hosts.json`](#target-hostsjson)
    - [`manifest.json`](#manifestjson)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)

## Overview

The AI Pop-Up Chromium Extension was developed to warn users when they visit designated AI websites, displaying a custom pop-up that alerts them of the dangers of entering sensitive or private information into these websites. This has been particularly important in the surge of AI websites that have been created in the past few years, and the potential for these websites to leak sensitive information, whether intentionally or unintentionally.

### How It Works

1. The extension loads a list of target AI websites from a JSON file (`target-hosts.json` by default).
2. When a user visits a page, the extension checks if the domain matches any entry in the list.
3. If it matches, a pop-up appears, informing the user of the AI-related website visit.

---

## Features

- **Domain Monitoring** - Tracks custom-defined domains (e.g., ChatGPT, Claude, Bard, etc.)
- **Configurable JSON File** - Easily update the `target-hosts.json` to add/remove sites.
- **Local & Remote JSON Support** - Fetches from a remote URL (this repo, by default) or falls back to the local JSON file.
- **Organisation-Ready** - Integration with group policy for Chromium-based browsers in enterprise environments.
- **Easy to Deploy** - Straightforward packaging and installation process via CRX files and an XML update manifest.

---

## Prerequisites

- **Chromium-based Browser** - Chrome and Edge are supported for group policy deployment, but local installation works on any Chromium-based browser.
- **Git** - If you plan to clone and manage the code locally.
- **Web Server (Optional for Organisation Setup)** - A publicly (or internally) accessible web server to host the `.crx` and `.xml` files if you plan to distribute it via group policy.

## Installation

### Local Setup

1. **Fork this repository**: Click on the "Fork" button at the top right corner of GitHub.
2. **Clone the repo**:

   ```bash
   git clone https://github.com/ewtaylor-it/ai-popup-chromium-extension
   ```

3. **Load as an unpacked extension**:
   - Open `chrome://extensions` (or `edge://extensions` for Microsoft Edge).
   - Enable **Developer Mode** (usually a toggle in the upper right).
   - Click **Load Unpacked**, then select the cloned repository folder.
4. **Verify installation**:
   - Open or refresh an AI-related domain (e.g., chatgpt.com).
   - Check if the extension icon appears or if the pop-up triggers.

### Organisation Setup

For enterprise-wide deployment, follow these steps:

1. **Fork and Clone** this repository.
2. **Pack the Extension** to generate a `.crx` file (e.g., `ai-popup-chromium-extension.crx`).
   - In Chrome/Edge, open the Extensions page.
   - Click "Pack extension".
   - Point it to your local folder and generate a `.crx` file.
3. **Create an XML Update Manifest** (e.g., `ai-popup-chromium-extension.xml`). Update the `{extension_id}` and `{web_server}` placeholders.

   ```xml
   <?xml version='1.0' encoding='UTF-8'?>
   <gupdate xmlns="http://www.google.com/update2/response" protocol="2.0">
    <app appid="{extension_id}">
        <updatecheck codebase="https://{web_server}/ai-popup-chromium-extension.crx" version="1.0.0" />
    </app>
   </gupdate>
   ```

4. **Host the Files** (`.crx` and `.xml`) on a publicly accessible server.
5. **Configure Group Policies**:
   - Chrome: `User Configuration > Administrative Templates > Google Chrome > Extensions`
     - [ExtensionInstallAllowlist](https://chromeenterprise.google/policies/?policy=ExtensionInstallAllowlist): `{extension_id}`
     - [ExtensionInstallForcelist](https://chromeenterprise.google/policies/?policy=ExtensionInstallForcelist): `{extension_id};https://{web_server}/ai-popup-chromium-extension.xml`
     - [ExtensionInstallSources](https://chromeenterprise.google/policies/?policy=ExtensionInstallSources): `https://{web_server}/*`
   - Edge: `User Configuration > Administrative Templates > Microsoft Edge > Extensions`
     - [ExtensionInstallAllowlist](https://docs.microsoft.com/en-us/deployedge/microsoft-edge-policies#extensioninstallallowlist): `{extension_id}`
     - [ExtensionInstallForcelist](https://docs.microsoft.com/en-us/deployedge/microsoft-edge-policies#extensioninstallforcelist): `{extension_id};https://{web_server}/ai-popup-chromium-extension.xml`
     - [ExtensionInstallSources](https://docs.microsoft.com/en-us/deployedge/microsoft-edge-policies#extensioninstallsources): `https://{web_server}/*`
6. **Deploy Group Policy** to the intended devices.
7. **Force Update Group Policy**:

   ```bash
   gpupdate /force
   ```

## Usage

1. Once installed, the extension runs in the background.
2. Navigate to any AI-related domain specified in the `target-hosts.json`.
3. A pop-up should appear indicating that you have visited a monitored website.

You can customise the message or the logic in `content.js` and `background.js` as needed to suit your organisation's workflow.

---

## Configuration

### `target-hosts.json`

- This file contains a list of domains where the extension will trigger its pop-up.
- By defauly, the extension attempts to fetch `target-hosts.json` from this repository. If the fetch fails, it falls back to the local copy.
- To always use the local copy:
  1. Open `background.js`.
  2. Change the `targetHostUrl` variable to `null`.
  3. Save the file. <!-- NOTE: We should clatify the needing to increment the version number if it's not mentioned later. -->

### `manifest.json`

- Declares extension permissions, background scripts, content scripts, etc.
- **Only modify** if you need extra permissions or want to change extension details.

---

## Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project.
2. Create your feature branch: (`git checkout -b feature/new-feature`).
3. Commit your changes: (`git commit -am 'Add new feature'`).
4. Push to the branch: (`git push origin feature/new-feature`).
5. Submit a pull request.

Please refer to our [Contributing Guidelines](CONTRIBUTING.md) for more information.

---

## License

Distributed under the GPL-3.0 License. See `LICENSE` for more information.

---

## Acknowledgements

- [Alastair Paterson](https://reece.tech/posts/enterprise-chrome-extension/) for guidance on enterprise extension updates.
