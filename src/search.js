var search = function (query, price) {
  var str = function () {
    /*
     document.getElementById('hepsiburada').contentWindow.document.getElementsByClassName('search-item')[0].getElementsByClassName('price product-price')[0].innerText
     */
  };

  var iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.id = IFRAME_ID;
  iframe.src = SEARCH_URL + query;
  iframe.name = price;
  document.body.appendChild(iframe);
  iframe.onload = function () {
    /*
    scripts
      .execute(multiline(str))
      .then(function (response) {
        next(response)
      });
    */
  };
};