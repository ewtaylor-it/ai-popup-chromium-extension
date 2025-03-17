# AI Pop-Up Chromium Extension

A chromium extension that provides a pop-up when a user visits an AI website like ChatGPT or Claude.

![Screenshot 2024-11-28 094245](https://github.com/user-attachments/assets/b53c99ad-27af-4fa1-ad19-e97c12012929)

## Getting started

The method of installing this extension will vary depending on your use-case, but for the Swan Hill Rural City Council, we enforced using these two methods:

- Group Policy
- Publicly Accessible Web Server (Git Pages in our case)

The idea is that the group policy will enforce the installation of the extension on all devices within the organisation, and the publicly accessible web server will host the metadata file that will allow the extension to be installed on the browser, and will host the extension itself.

### Group Policy

We enforced the following group policy settings:

Chrome: `User Configuration > Administrative Templates > Google > Google Chrome > Extensions`:

- [ExtensionInstallAllowlist](https://chromeenterprise.google/policies/?policy=ExtensionInstallAllowlist): `Enabled` with the value `{extension_id}`
- [ExtensionInstallForcelist](https://chromeenterprise.google/policies/?policy=ExtensionInstallForcelist): `Enabled` with the value `{extension_id};https://{web_server}/ai-popup-chromium-extension.xml`
- [ExtensionInstallSources](https://chromeenterprise.google/policies/?policy=ExtensionInstallSources): `Enabled` with the value `https://{web_server}/*`

Edge: `User Configuration > Administrative Templates > Microsoft Edge > Extensions`:

- [ExtensionInstallAllowlist](https://docs.microsoft.com/en-us/deployedge/microsoft-edge-policies#extensioninstallallowlist): `Enabled` with the value `{extension_id}`
- [ExtensionInstallForcelist](https://docs.microsoft.com/en-us/deployedge/microsoft-edge-policies#extensioninstallforcelist): `Enabled` with the value `{extension_id};https://{web_server}/ai-popup-chromium-extension.xml`
- [ExtensionInstallSources](https://docs.microsoft.com/en-us/deployedge/microsoft-edge-policies#extensioninstallsources): `Enabled` with the value `https://{web_server}/*`

### Local Setup

1. Create a fork of this repository
2. Clone the forked repository to your local machine
3. Open the browser and navigate to `chrome://extensions` or `edge://extensions` if you are using Edge
4. Enable Developer Mode
5. Click on `Load Unpacked` and select the forked repository folder
6. The extension should now be installed

### Organisation Setup

1. Create a fork of this repository
2. Clone the forked repository to your local machine
3. Pack the extension using any Chromium-based browser, save the `.crx` file as `ai-popup-chromium-extension.crx`
4. Save the below XML file as `ai-popup-chromium-extension.xml`
5. Update the XML file with the correct values
6. Save both files to a publicly accessible web server
7. Create a group policy that enforces the above settings, and assign it to the devices you want the extension to be installed on
8. Run a `gpupdate /force` on the devices to manually update the group policy

**Disclaimer** - I am under the assumption that publicly-accessible just means that the web server is accessible to the devices that the group policy is enforced on. I have not tested this with a server only available by VPN for example, but I assume it would still work.

#### XML File

```xml
<?xml version='1.0' encoding='UTF-8'?>
<gupdate xmlns="http://www.google.com/update2/response" protocol="2.0">
    <app appid='{extension id}'>
        <updatecheck codebase='https://{web_server}/ai-popup-chromium-extension.crx' version='1.0.0' />
    </app>
</gupdate>
```

Below is a link to a guide that I think was invaluable to my development and ensuring the extension updated properly via the group policy.
<https://reece.tech/posts/enterprise-chrome-extension/>

### JSON Setup

The websites that will be detected are stored in a JSON file called `target-hosts.json`.

You can quite easily change the JSON file to better suit your organisation, but note that by default the extension will try to fetch the JSON file directly from this repository, only referring to the local copy if that fails. Bypassing this is fairly straight-forward:

1. Open the `background.js` file
2. Change the `targetHostUrl` variable to `null`, then save the file
3. Now, it will always refer to the local copy of the JSON file
