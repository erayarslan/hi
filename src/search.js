var search = function (query, price) {
  var str = function () {
    /*
       document.getElementById('%%').contentWindow.document.getElementsByClassName('search-item')[0].getElementsByClassName('price product-price')[0].innerText
     */
  };

  var iframe = document.createElement('iframe');
  var id = utils.getStrId();
  iframe.style.display = 'none';
  iframe.id = id;
  iframe.src = SEARCH_URL + query;
  iframe.name = price;
  document.body.appendChild(iframe);
  iframe.onload = function () {
    /*
    scripts
      .execute(multiline(str).pass(id))
      .then(function (response) {
        next(response)
      });
    */
  };
};