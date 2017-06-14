if (!window.isTop) {
  if (location.href.indexOf(SEARCH_URL) > -1) {
    var totalItemCount = parseInt(document.getElementsByClassName("result-count")[0].innerText.split('.').join(''));

    var items = document.getElementsByClassName('search-item');
    var results = [];

    for (var i = 0; i < items.length; i++) {
      var data = {};

      var els = items[i].getElementsByClassName('price product-price');
      var images = items[i].getElementsByTagName('img');
      var links = items[i].getElementsByTagName("a");
      var ratings = items[i].getElementsByClassName("ratings active");

      data['image'] = images.length ? images[0].src : "";
      data['price'] = els.length ? els[0].innerText : "";
      data['url'] = links.length ? links[0].href : "";
      data['rating'] = (parseInt(ratings.length ? ratings[0].style.width : "100%") * 5) / 100;
      data['cmp_price'] = window.name;

      results.push(data);
    }

    chrome.runtime.sendMessage({
      iframe: {
        totalItemCount: totalItemCount,
        results: results
      }
    });
  }
}