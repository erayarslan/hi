if (!window.isTop) {
  if (location.href.indexOf(SEARCH_URL) > -1) {
    var items = document.getElementsByClassName('search-item');
    if (items.length) {
      var els = items[0].getElementsByClassName('price product-price');
      if (els.length) {
        var text = els[0].innerText;
        chrome.runtime.sendMessage({iframe: text});
      }
    }
  }
}