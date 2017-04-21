var service = {
  log: function (title, message) {
    chrome.notifications.create("", {
      title: title,
      message: message,
      type: "basic",
      iconUrl: "../assets/icon120.png"
    }, function () {
    });
  },
  image: function (title, message, image, url) {
    chrome.notifications.create("", {
      title: title,
      message: message,
      type: "image",
      iconUrl: "../assets/icon120.png",
      imageUrl: image
    }, function (createdId) {
      var handler = function (id) {
        if (id === createdId) {
          service.navigate(url);
          chrome.notifications.clear(id);
          chrome.notifications.onClicked.removeListener(handler);
        }
      };

      chrome.notifications.onClicked.addListener(handler);
    });
  },
  navigate: function (url) {
    chrome.tabs.create({url: url});
  }
};

chrome.browserAction.onClicked.addListener(function (tab) {
  service.log("hi", "Hepsiburada.com Insight");
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.iframe) {
    service.image("Hepsiburada.com'da", request.iframe.price + "!", request.iframe.image, request.iframe.url);
  }
});
