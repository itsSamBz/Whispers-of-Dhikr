let dikhrData = [];

// Load dikhr data from JSON file
fetch("/adkhar.json")
    .then((response) => response.json())
    .then((data) => {
        dikhrData = data;
        setupAlarm();
    });

function setupAlarm() {
    chrome.storage.local.get(["interval", "snoozeDuration"], function (result) {
        const interval = result.interval || 60; // Default to 1 minute
        const snoozeDuration = result.snoozeDuration || 0;

        if (snoozeDuration > 0) {
            const snoozeEnd = Date.now() + snoozeDuration * 60 * 60 * 1000;
            chrome.storage.local.set({ snoozeEnd: snoozeEnd });
        }

        chrome.alarms.create("showNotification", { periodInMinutes: interval });
    });
}

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "showNotification") {
        chrome.storage.local.get(["snoozeEnd"], function (result) {
            const now = Date.now();
            if (!result.snoozeEnd || now >= result.snoozeEnd) {
                showRandomDikhr();
            }
        });
    }
});

function showRandomDikhr() {
    if (dikhrData.length > 0) {
        const randomIndex = Math.floor(Math.random() * dikhrData.length);
        const dikhr = dikhrData[randomIndex];

        chrome.notifications.create({
            type: "basic",
            iconUrl: "/assets/img/icon48.png",
            title: "وقت الذكر",
            message: dikhr.content,
            buttons: [{ title: "Snooze" }],
        });
    }
}

chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
    if (buttonIndex === 0) {
        // Open popup for snooze settings
        chrome.action.openPopup();
    }
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "updateAlarm") {
        setupAlarm();
    }
});
