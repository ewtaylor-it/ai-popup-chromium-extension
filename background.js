/**
 * This script listens for completed navigation events and injects a content script into the tab if the host is in the target list.
 * The content script displays a pop-up warning message to the user.
 */

// Object to keep track of warned tabs during the session
const warnedTabs = {};

// Object to keep track of warned hosts during the session
const warnedHosts = {};

// Variable to store the last warned host
warnedHost = null;

// Listen for completed navigation events
chrome.webNavigation.onCompleted.addListener((details) => {
  const url = new URL(details.url);
  const tabId = details.tabId;

  console.log(`Navigated to URL: ${url.href}`);
  console.log(`Tab ID: ${tabId}`);

  // Check if the current host is in the target list
  if (targetHosts.includes(url.hostname)) {
    console.log(`Host ${url.hostname} is in the target list`);

    // Check if the host has been warned in this session
    if (!warnedHosts[url.hostname] && url.hostname !== warnedHost) {
      console.log(`Host ${url.hostname} has not been warned yet`);

      // Inject the content script into the tab
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content.js"],
      });

      console.log(`Injected content script into tab ${tabId}`);

      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === "CONTINUE" && sender.tab.id === tabId) {
          console.log(`Received CONTINUE message from tab ${tabId}`);
          warnedHost = url.hostname;
          warnedTabs[tabId] = true;
          console.log(`Host ${url.hostname} has been warned`);
        }
      });

      // Mark this host as warned if we receive a 'optOut' message
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === "OPT_OUT" && sender.tab.id === tabId) {
          warnedHosts[url.hostname] = true;
          console.log(`Host ${url.hostname} opted out`);
        }
      });

      // Clear the warning when the tab is closed
      chrome.tabs.onRemoved.addListener(function handleTabClose(closedTabId) {
        if (closedTabId === tabId) {
          delete warnedTabs[tabId];
          console.log(`Tab ${tabId} closed, warning cleared`);
          chrome.tabs.onRemoved.removeListener(handleTabClose);
        }
      });
    } else if (url.hostname === warnedHost) {
      console.log(`Host ${url.hostname} has already been warned`);
    } else {
      console.log(`Host ${url.hostname} has opted out`);
    }
  } else {
    console.log(`Host ${url.hostname} is not in the target list`);
  }
});
