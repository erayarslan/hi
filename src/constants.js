var EXPECTED_SCORE = 7;
var HEPSIBURADA = "hepsiburada.com";
// Bypass "Mixed-Content" ;) also so slow cause prerender :/
var SEARCH_URL = "http://www.hepsiburada.com/ara?q=";

if (location.protocol === 'https:') {
  SEARCH_URL = "https://service.prerender.io/" + SEARCH_URL;
}

var HOST_JOKER_PREFIX = "www.";
var QUERY_SLICE_COUNT = 4;
var DEFAULT_CURRENCY = "TL";
var BRAND_DETECTION = false;
var DEFAULT_ICON = "../assets/icon128.png";
var AJAX_SNIFFER = false;
var HASH_CHANGE_SNIFFER = false;
var CLICK_TRACKER = true;