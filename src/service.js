var service = {
  log: function (title, message) {
    chrome.notifications.create("", {
      title: title,
      message: message,
      type: "basic",
      iconUrl: "../assets/icon120.png"
    }, function () {
    });
  }
};

chrome.browserAction.onClicked.addListener(function (tab) {
  service.log("hi", "Hepsiburada.com Insight");
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.iframe) {
    service.log("Hepsiburada.com'da", request.iframe, "!");
  }
});
