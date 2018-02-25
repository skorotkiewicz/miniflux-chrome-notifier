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
    var linkMap = {};
    chrome.notifications.create({
        title: 'I have something new for you from: ',
        type: 'basic',
        iconUrl: '../img/icon.png',
        message: 'From: ' + from,
        contextMessage: localStorage["minifluxurl"],
        isClickable: true
    }, function (notifId) {
        linkMap[notifId] = localStorage["minifluxurl"] + '/unread';
    });

    chrome.notifications.onClicked.addListener(function (notifId) {
        if (linkMap[notifId]) {
            chrome.tabs.create({ url: linkMap[notifId] });
        }
        chrome.browserAction.setBadgeText({ text: '' });
    });
}

if (localStorage["update_seconds"] != undefined) {
    chrome.alarms.create("notification", { delayInMinutes: parseInt(localStorage["update_seconds"]), periodInMinutes: parseInt(localStorage["update_seconds"]) });
} else {
    chrome.alarms.create("notification", { delayInMinutes: 1, periodInMinutes: 1 });
}

  chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === "notification") {
        get_unread();
    }
  });