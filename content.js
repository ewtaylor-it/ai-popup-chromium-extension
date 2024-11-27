// Check if the warning has already been shown on this page
if (!window.hasShownPopup) {
  window.hasShownPopup = true;

  // Create the overlay container
  const overlay = document.createElement("div");
  overlay.id = "custom-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "10000";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.opacity = "0"; // Start invisible
  overlay.style.transition = "opacity 0.5s ease"; // Fade-in effect

  // Append the overlay to the document body first
  document.body.appendChild(overlay);

  // Trigger the fade-in effect
  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
  });

  // Create the pop-up container
  const popup = document.createElement("div");
  popup.id = "custom-popup";
  popup.style.backgroundColor = "#fff";
  popup.style.padding = "20px";
  popup.style.borderRadius = "8px";
  popup.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
  popup.style.maxWidth = "700px";
  popup.style.width = "80%";
  popup.style.fontFamily = "Arial, sans-serif";
  popup.style.color = "#333";
  popup.style.textAlign = "center";
  popup.style.transform = "scale(0.8)"; // Start smaller
  popup.style.transition = "transform 0.3s ease"; // Scale-up effect

  // Place the logo at the top of the pop-up
  const logo = document.createElement("img");
  logo.src = chrome.runtime.getURL("images/icon128-black.png");
  logo.style.width = "100px";
  logo.style.height = "100px";
  logo.style.marginTop = "20px";
  logo.style.display = "block";
  logo.style.marginLeft = "auto";
  logo.style.marginRight = "auto";

  // Insert the logo at the beginning of the pop-up
  popup.insertBefore(logo, popup.firstChild);

  // Set the pop-up message
  const message = document.createElement("div");
  const header = document.createElement("h2");
  header.innerText = `
    You are about to access a publicly-available Generative AI (GenAI) tool.
`;
  header.style.fontSize = "24px";
  message.style.font = "Arial, sans-serif";
  header.style.fontWeight = "bold";
  header.style.marginBottom = "20px";
  message.appendChild(header);

  const paragraph = document.createElement("p");
  paragraph.innerText = `
    The Administrative Guideline on the safe and responsible use of GenAI requires that you only use publicly-available information with publicly-available tools. You should never input information that is sensitive in nature (including confidential, personal or health information) into this tool. 
    
    Your use of this tool may be monitored by your organisation. 

`;
  message.style.fontSize = "16px";
  message.style.font = "Arial, sans-serif";
  message.style.marginBottom = "20px";
  message.appendChild(paragraph);

  const bold = document.createElement("b");
  bold.innerText =
    "By clicking 'Continue' you confirm your understanding of the above.";
  message.appendChild(bold);
  message.style.marginBottom = "20px";
  popup.appendChild(message);

  // Create a close button
  const closeBtn = document.createElement("button");
  closeBtn.innerText = "Continue";
  closeBtn.style.padding = "10px 20px";
  closeBtn.style.border = "none";
  closeBtn.style.backgroundColor = "#316297";
  closeBtn.style.color = "#fff";
  closeBtn.style.borderRadius = "5px";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.fontSize = "16px";
  closeBtn.style.transition = "background-color 0.3s ease"; // Hover effect

  // Hover effect for the button
  closeBtn.addEventListener("mouseover", () => {
    closeBtn.style.backgroundColor = "#0056b3"; // Darker blue on hover
  });
  closeBtn.addEventListener("mouseout", () => {
    closeBtn.style.backgroundColor = "#007BFF"; // Original color
  });

  // Close the pop-up on button click
  closeBtn.onclick = () => {
    // Check if the user opted out
    if (checkbox.checked) {
      // Send a message to the background script
      chrome.runtime.sendMessage({ type: "OPT_OUT" });
    }

    chrome.runtime.sendMessage({ type: "CONTINUE" });

    // Fade-out effect
    overlay.style.opacity = "0";
    popup.style.transform = "scale(0.8)";
    // Restore scrolling
    document.body.style.overflow = "";

    // Remove the overlay after the transition ends
    setTimeout(() => {
      overlay.remove();
    }, 500); // Match the duration of the fade-out transition
  };

  popup.appendChild(closeBtn);

  // Create the checkbox container
  const checkboxContainer = document.createElement("div");
  checkboxContainer.style.marginBottom = "20px";
  checkboxContainer.style.display = "flex";
  checkboxContainer.style.alignItems = "center";
  checkboxContainer.style.justifyContent = "center";

  // Create the checkbox input
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "optOutCheckbox";
  checkbox.style.marginTop = "20px";
  checkbox.style.marginRight = "10px";

  // Create the label for the checkbox
  const checkboxLabel = document.createElement("label");
  checkboxLabel.htmlFor = "optOutCheckbox";
  checkboxLabel.style.marginTop = "20px";
  checkboxLabel.innerText = "Don't show this warning again during this visit";

  // Append the checkbox and label to the container
  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(checkboxLabel);
  popup.appendChild(checkboxContainer);

  overlay.appendChild(popup);

  // Prevent scrolling while pop-up is displayed
  document.body.style.overflow = "hidden";

  // Trigger the scale-up effect
  requestAnimationFrame(() => {
    popup.style.transform = "scale(1)";
  });
}
