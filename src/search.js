var Search = function (query, price) {
  var iframe = document.createElement('iframe');
  var id = Utils.getStrId();
  iframe.style.display = 'none';
  iframe.id = id;
  iframe.src = SEARCH_URL + query;
  iframe.name = price;
  document.body.appendChild(iframe);
  /**
   * THIS IS CANNOT WORK BECAUSE CROSS-ORIGIN FRAME PROBLEM
   * but_good_trick_;)
   *
   * Error: Uncaught DOMException: Blocked a frame with origin "http://target.com" from accessing a cross-origin frame.
   */
  iframe.onload = function () {
    /**
     * Proxy
     * .execute("page_title", "document.getElementById('%%').contentWindow.document.title".pass(id))
     * .then(function (response) {
     * });
     */
  };
};