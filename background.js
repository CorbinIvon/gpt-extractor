chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === 'saveConversation') {
    let url = message.url;
    let filename = `${sender.tab.title}.conversation.txt`;

    // Downloads the file
    chrome.downloads.download({
      url: url,
      filename: filename
    });
  }
});