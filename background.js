chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "open_with_youtube",
    title: "Open with youtube (Ctrl+Y)",
    contexts: ["selection"],
  });
});

const querySearch = (selectionText) => {
  const url = `https://www.youtube.com/results?search_query=${selectionText}`;
  chrome.tabs.create({ url });
};
const handleOnClick = ({ selectionText }, _) => querySearch(selectionText);
chrome.contextMenus.onClicked.addListener(handleOnClick);

chrome.commands.onCommand.addListener((command) => {
  if (command === "open_with_youtube") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTabId },
          func: () => window.getSelection().toString(),
        },
        (results) => {
          const selectionText = results[0].result;
          if (selectionText) {
            querySearch(selectionText);
          } else {
            console.log("No text selected.");
          }
        }
      );
    });
  }
});
