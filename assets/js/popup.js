document.addEventListener("DOMContentLoaded", function () {
  // Load saved settings
  chrome.storage.local.get(["interval", "snoozeDuration"], function (result) {
      const interval = result.interval || 60;
      const intervalInput = document.querySelector(`input[name="interval"][value="${interval}"]`);
      if (intervalInput) {
          intervalInput.checked = true;
      }
      document.getElementById("snoozeDuration").value = result.snoozeDuration || 0;
  });

  // Save settings
  document.getElementById("saveButton").addEventListener("click", function () {
      const intervalInput = document.querySelector('input[name="interval"]:checked');
      if (!intervalInput) {
          return;
      }
      const interval = parseFloat(intervalInput.value);
      const snoozeDuration = parseInt(document.getElementById("snoozeDuration").value);

      chrome.storage.local.set({ interval: interval, snoozeDuration: snoozeDuration }, function () {
          const saveButton = document.getElementById("saveButton");
          saveButton.textContent = "... جاري الحفظ";
          setTimeout(function () {
              saveButton.textContent = "حفظ الإعدادات";
          }, 2000);

          // Update the alarm
          chrome.runtime.sendMessage({ action: "updateAlarm" });
      });
  });
});
