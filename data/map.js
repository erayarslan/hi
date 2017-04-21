/**
 * do NOT use www prefix on these domains
 */

var map = {
  "hepsiburada.com": {
    "product_detail": "/:product-p-:sku",
    "product_name": "document.getElementsByClassName('product-name')[0].innerText",
    "product_brand": "document.getElementsByClassName('brand-name')[0].innerText"
  },
  "urun.n11.com": {
    "product_detail": "/:category/:product-P:sku",
    "product_name": "document.getElementsByClassName('proName')[0].innerText",
    "product_brand": "window.dataLayer[0].pBrand"
  },
  "urun.gittigidiyor.com": {
    "product_detail": "/:category/:product-:sku",
    "product_name": "document.getElementsByClassName('title')[0].innerText",
    "product_brand": "window.TRACKING_PRODUCT_BRAND"
  },
  "teknosa.com": {
    "product_detail": "/urunler/:sku/:product",
    "product_name": "$.Teknosa.ProductDetail.ProductName",
    "product_brand": "$.Teknosa.ProductDetail.ProductBrandName"
  }
};