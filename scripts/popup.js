
if (localStorage["minifluxurl"] != undefined) {
    chrome.browserAction.setBadgeText({ text: '' });
    chrome.tabs.create({url: localStorage["minifluxurl"] + '/unread'});
} else {
    chrome.tabs.create({url: "options.html"});
}