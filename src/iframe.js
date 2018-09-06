// Hepsiburada.com IFrame Wrapper

if (!window.isTop) {
  if (location.href.indexOf(SEARCH_URL) > -1) {
    var resultCount = document.getElementsByClassName("result-count");
    var pagination = document.getElementById('pagination');
    var relatedKeywords = document.getElementById('relatedKeywords');

    var totalItemCount = resultCount.length ? parseInt(resultCount[0].innerText.split('.').join('')) : 0;
    var lastPage = pagination ? parseInt(pagination.firstElementChild.lastElementChild.innerText) : 0;
    var keywords = relatedKeywords ? Array.prototype.slice.call(relatedKeywords.getElementsByTagName('a')).map(function (i) {
      return i.innerText;
    }) : [];

    var items = document.getElementsByClassName('search-item');
    var results = [];

    for (var i = 0; i < items.length; i++) {
      var data = {};

      var els = items[i].getElementsByClassName('price product-price');
      var images = items[i].getElementsByTagName('img');
      var links = items[i].getElementsByTagName("a");
      var ratings = items[i].getElementsByClassName("ratings active");
      var discount = items[i].getElementsByClassName("badge highlight discount-badge");

      data['image'] = (images.length ? images[0].src : "").replace('280-413', '364-180');
      data['price'] = els.length ? els[0].innerText : "";
      data['url'] = "https://www.hepsiburada.com" + (links.length ? links[0].pathname : "");
      data['discount'] = discount.length ? discount[0].innerText : "%0";
      data['rating'] = (parseInt(ratings.length ? ratings[0].style.width : "100%") * 5) / 100;
      data['cmp_price'] = window.name;

      results.push(data);
    }

    chrome.runtime.sendMessage({
      iframe: {
        totalItemCount: totalItemCount,
        keywords: keywords,
        lastPage: lastPage,
        results: results
      }
    });
  }
}