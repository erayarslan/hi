var n = chrome.notifications;

var Notification = {
  welcome: function () {
    n.create('', {
      title: 'hi',
      message: 'Hepsiburada.com Insight',
      type: 'basic',
      iconUrl: DEFAULT_ICON
    }, function () {
    });
  },
  thanks: function () {
    n.create('', {
      title: 'hi',
      message: 'Teşekkürler :>',
      type: 'basic',
      iconUrl: DEFAULT_ICON
    }, function (createdId) {
      setTimeout(function () {
        n.clear(createdId);
      }, 1500);
    });
  },
  product: function (o, _success, _wrong) {
    n.create('', {
      title: o.title,
      message: o.message,
      contextMessage: o.totalItemCount + " sonuçtan, " + o.rating + ' puanlı ürün.',
      requireInteraction: true,
      type: 'image',
      iconUrl: DEFAULT_ICON,
      imageUrl: o.image,
      buttons: [{
        title: 'Hatalı içerik :<',
        iconUrl: '../assets/dislike.png'
      }]
    }, function (createdId) {
      var click = function (id) {
        if (id === createdId) {
          _success();
          n.clear(id);
          n.onClicked.removeListener(click);
        }
      };

      var button = function (id, button) {
        if (id === createdId && button === 0) {
          _wrong();
          n.clear(id);
          n.onClicked.removeListener(click);
        }
      };

      n.onButtonClicked.addListener(button);
      n.onClicked.addListener(click)
    });
  }
};