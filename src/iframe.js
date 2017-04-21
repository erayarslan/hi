var data = {};

if (!window.isTop) {
  if (location.href.indexOf(SEARCH_URL) > -1) {
    var items = document.getElementsByClassName('search-item');
    if (items.length) {
      var els = items[0].getElementsByClassName('price product-price');
      var images = items[0].getElementsByTagName('img');
      var links = items[0].getElementsByTagName("a");

      data['image'] = images.length ? images[0].src : "";
      data['price'] = els.length ? els[0].innerText : "";
      data['url'] = links.length ? links[0].href : "";
      data['cmp_price'] = window.name;


      chrome.runtime.sendMessage({iframe: data});
    }
  }
}