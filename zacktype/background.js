chrome.action.onClicked.addListener((tab) => {
  console.log("ZackType: Extension icon clicked");
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    })
    .then(() => {
      chrome.tabs.sendMessage(tab.id, { action: "toggleUI" });
    })
    .catch((err) => {
      console.error("ZackType: Failed to inject content script:", err);
    });
});
