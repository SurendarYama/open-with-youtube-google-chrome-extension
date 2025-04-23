chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "000000000017",
        title: 'open with youtube',
        contexts: ['selection'],
    },
    function () {
        if (chrome.runtime.lastError) {
           console.log('Got expected error: ' + chrome.runtime.lastError.message);
        }
    });
});
const handleOnClick = (info, _) => {
    const selectedText = info.selectionText;
    const url = `https://www.youtube.com/results?search_query=${selectedText}`;
    chrome.tabs.create({ url });
};
chrome.contextMenus.onClicked.addListener(handleOnClick);