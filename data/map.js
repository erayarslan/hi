/**
 * DON'T use www prefix on these domains
 */

var map = {
  "hepsiburada.com": {
    "product_detail": "/:product-p-:sku",
    "product_name": "utagData.product_name_array",
    "product_brand": "utagData.product_brand",
    "product_price": "utagData.product_prices[0]"
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
    "product_name": "extend_google_tag_params.cd_product_name",
    "product_brand": "extend_google_tag_params.cd_product_brand",
    "product_price": "extend_google_tag_params.cd_product_price"
  },
  'trendyol.com': {
    "product_detail": "/:brand/:uri",
    "product_name": "__PRODUCT_DETAIL_APP_INITIAL_STATE__.product.name",
    "product_brand": "__PRODUCT_DETAIL_APP_INITIAL_STATE__.product.brand.beautifiedName",
    "product_price": "__PRODUCT_DETAIL_APP_INITIAL_STATE__.product.price.sellingPrice.value.toString()"
  }
};

var tracker_map = {
  "akakce.com": {
    "detect_url": "/:category/en-ucuz-:product-fiyati,:sku.html",
    "selectors": ['.iC']
  }
};