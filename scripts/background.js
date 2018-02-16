function get_unread() {
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(localStorage["minifluxlogin"] + ':' + localStorage["minifluxpassword"]));
    
    fetch(localStorage["minifluxurl"] + '/v1/entries?status=unread&direction=desc', {
            method:'GET',
            headers: headers,
        })
        .then(
            r => r.json()
        )
        .then(
            obj => {
                if (obj.total > 0) {
                    chrome.browserAction.setBadgeText({ text: '' + obj.total + '' });
                    notification(obj.entries[0].feed.title);
                } else {
                    chrome.browserAction.setBadgeText({ text: '' });
                }
            }
        );
}

function notification(from) {
    chrome.notifications.create(localStorage["minifluxurl"] + '/unread', {
        title: 'I have something new for you from: ',
        type: 'basic',
        iconUrl: '../img/icon.png',
        message: 'From: ' + from,
        contextMessage: ' ',
        isClickable: true
    }, function (notificationId) {});

    chrome.notifications.onClicked.addListener(function (notificationId) {
        chrome.tabs.create({ url: notificationId });
        chrome.browserAction.setBadgeText({ text: '' });
    });
}

if (localStorage["update_seconds"] != undefined) {
    setTimeout(get_unread, 1000 * localStorage["update_seconds"]);
} else {
    setTimeout(get_unread, 1000 * 60);
}