chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "000000000017",
        title: 'Open with youtube',
        contexts: ['selection'],
    });
});
const handleOnClick = ({selectionText}, _) => {
    const url = `https://www.youtube.com/results?search_query=${selectionText}`;
    chrome.tabs.create({ url });
};
chrome.contextMenus.onClicked.addListener(handleOnClick);