chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.notifications.create("", {
    title: "hi",
    message: 'Hepsiburada.com Insight',
    type: "basic",
    iconUrl: "../assets/icon120.png"
  }, function () {
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.notifications.create("", {
    title: "#hi found something!",
    message: request.join(','),
    type: "basic",
    iconUrl: "../assets/icon120.png"
  }, function () {
  });
});