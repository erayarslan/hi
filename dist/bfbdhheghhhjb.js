var EXPECTED_SCORE=7,HEPSIBURADA="hepsiburada.com",SEARCH_URL="http://www.hepsiburada.com/ara?q=";"https:"===location.protocol&&(SEARCH_URL="https://service.prerender.io/"+SEARCH_URL);var HOST_JOKER_PREFIX="www.",QUERY_SLICE_COUNT=4,DEFAULT_CURRENCY="TL",BRAND_DETECTION=!1,DEFAULT_ICON="../assets/icon128.png",AJAX_SNIFFER=!1,HASH_CHANGE_SNIFFER=!1,CLICK_TRACKER=!0;if(!window.isTop&&location.href.indexOf(SEARCH_URL)>-1){for(var resultCount=document.getElementsByClassName("result-count"),pagination=document.getElementById("pagination"),relatedKeywords=document.getElementById("relatedKeywords"),totalItemCount=resultCount.length?parseInt(resultCount[0].innerText.split(".").join("")):0,lastPage=pagination?parseInt(pagination.firstElementChild.lastElementChild.innerText):0,keywords=relatedKeywords?Array.prototype.slice.call(relatedKeywords.getElementsByTagName("a")).map(function(e){return e.innerText}):[],items=document.getElementsByClassName("search-item"),results=[],i=0;i<items.length;i++){var data={},els=items[i].getElementsByClassName("price product-price"),images=items[i].getElementsByTagName("img"),links=items[i].getElementsByTagName("a"),ratings=items[i].getElementsByClassName("ratings active"),discount=items[i].getElementsByClassName("badge highlight discount-badge");data.image=images.length?images[0].src:"",data.price=els.length?els[0].innerText:"",data.url="http://www.hepsiburada.com"+(links.length?links[0].pathname:""),data.discount=discount.length?discount[0].innerText:"%0",data.rating=5*parseInt(ratings.length?ratings[0].style.width:"100%")/100,data.cmp_price=window.name,results.push(data)}chrome.runtime.sendMessage({iframe:{totalItemCount:totalItemCount,keywords:keywords,lastPage:lastPage,results:results}})}