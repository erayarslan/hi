var service = {
  log: function (title, message) {
    chrome.notifications.create("", {
      title: title,
      message: message,
      type: 'basic',
      iconUrl: '../assets/icon120.png'
    }, function () {
    });
  },
  image: function (title, message, image, url) {
    chrome.notifications.create("", {
      title: title,
      message: message,
      type: 'image',
      iconUrl: '../assets/icon120.png',
      imageUrl: image
    }, function (createdId) {
      var handler = function (id) {
        if (id === createdId) {
          service.navigate(url);
          chrome.notifications.clear(id);
          chrome.notifications
            .onClicked.removeListener(handler);
        }
      };

      chrome.notifications
        .onClicked.addListener(handler);
    });
  },
  navigate: function (url) {
    chrome.tabs.create({url: url});
  },
  moneyToNumber: function (str) {
    var a = str.indexOf('TL') > -1 ? str.split('.').join('') : str;
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
      service.image('Daha ucuza Hepsiburada.com\'da !', data.price, data.image, data.url);
    }
  }
});
