var service = {
  log: function (title, message) {
    chrome.notifications.create("", {
      title: title,
      message: message,
      type: 'basic',
      iconUrl: DEFAULT_ICON
    }, function () {
    });
  },
  thanks: function () {
    chrome.notifications.create("", {
      title: "hi",
      message: "Teşekkürler :>",
      type: 'basic',
      iconUrl: DEFAULT_ICON
    }, function (createdId) {
      setTimeout(function () {
        chrome.notifications.clear(createdId);
      }, 1500);
    });
  },
  product: function (title, message, image, url, rating) {
    chrome.notifications.create('', {
      title: title,
      message: message,
      contextMessage: rating + ' puanlı ürün',
      requireInteraction: true,
      type: 'image',
      iconUrl: DEFAULT_ICON,
      imageUrl: image,
      buttons: [{
        title: "Hatalı içerik :<",
        iconUrl: "../assets/dislike.png"
      }]
    }, function (createdId) {
      var click = function (id) {
        if (id === createdId) {
          service.navigate(url);
          chrome.notifications.clear(id);
          chrome.notifications.onClicked.removeListener(click);
        }
      };

      var button = function (id, button) {
        if (id === createdId && button === 0) {
          service.thanks();
          chrome.notifications.clear(id);
          chrome.notifications.onClicked.removeListener(click);
        }
      };

      chrome.notifications.onButtonClicked.addListener(button);
      chrome.notifications.onClicked.addListener(click)
    });
  },
  navigate: function (url) {
    chrome.tabs.create({url: url});
  },
  moneyToNumber: function (str) {
    var a = str.indexOf(DEFAULT_CURRENCY) > -1 ? str.split('.').join('') : str;
    return parseFloat(a);
  }
};

chrome.browserAction.onClicked.addListener(function (tab) {
  service.log("hi", "Hepsiburada.com Insight");
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.iframe) {
    var data = request.iframe;

    var price = service.moneyToNumber(data.price);
    var cmp_price = service.moneyToNumber(data.cmp_price);

    if (cmp_price > price) {
      service.product('Daha ucuza Hepsiburada.com\'da !', data.price, data.image, data.url, data.rating);
    }
  }
});
