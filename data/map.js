/**
 * do NOT use www prefix on these domains
 */

var map = {
  "hepsiburada.com": {
    "product_detail": "/:product-p-:sku",
    "product_name": "window.productModel",
    "product_brand": "document.getElementsByClassName('brand-name')[0].innerText",
    "product_price": "document.getElementsByClassName('price')[0].innerText"
  },
  "urun.n11.com": {
    "product_detail": "/:category/:product-P:sku",
    "product_name": "window.dataLayer[0].title",
    "product_brand": "window.dataLayer[0].pBrand",
    "product_price": "window.dataLayer[0].pDiscountedPrice"
  },
  "urun.gittigidiyor.com": {
    "product_detail": "/:category/:product-:sku",
    "product_name": "window.TRACKING_PRODUCT_TITLE",
    "product_brand": "window.TRACKING_PRODUCT_BRAND",
    "product_price": "window.TRACKING_PRODUCT_PRICE"
  },
  "teknosa.com": {
    "product_detail": "/urunler/:sku/:product",
    "product_name": "$.Teknosa.ProductDetail.ProductName",
    "product_brand": "$.Teknosa.ProductDetail.ProductBrandName",
    "product_price": "$.Teknosa.ProductDetail.ProductPrice"
  }
};