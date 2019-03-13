/**
 * 广告工具js
 */

const app = getApp();

//从cdn加载广告数据
function loadPromotAdvance(cb) {
  // if (!app.globalData.promotAdvance){
    wx.request({
      url: app.CDN_URL + 'bookList-advance.json?t=1',
      method: "GET",
      success: function (res) {
        app.globalData.promotAdvance = res.data;
        if (typeof cb === "function") {
          cb(res);
        }
      },

      fail: function (res) {
      }

    });
  // }
}

module.exports = {
  loadPromotAdvance: loadPromotAdvance
}

