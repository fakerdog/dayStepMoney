// pages/redBag/redBag.js
const app = getApp();
const drawService = require("../../services/drawService.js");
const Animation = require("../../utils/animationUtil.js");
const drawUtil = require("../../utils/drawUtil.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: Number(0.000).toFixed(3),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    drawService.instDrawGetDetailBackNum(options.money, res => {
      Animation.numberAnimation(Number(0.000).toFixed(3), res.data.data, 0.001, 4, 65, () => { }, res => {
        this.setData({
          money: res
        });
      })
      //弹出分享窗口，点击分享或者20卡币
    })

    //获取banner信息
    drawService.getLuckyDrawBanner(res => {
      var banner = res.data.banner;
      if (banner) {
        for (var i = 0; i < banner.length; i++) {
          var imgUrl = app.CDN_URL + banner[i].imgUrl;
          banner[i].imgUrl = imgUrl;
        }
        var bannerindex = parseInt(banner.length * Math.random());
        this.setData({
          drawbanner: banner[bannerindex]
        })

      }
    })

    //获取微信头像随机展示
    drawService.getLuckyDrawHead(res => {
      var head = res.data.head;
      if (head) {
        drawUtil.getRandomArrayElementsHead(head, 19, res => {
          this.setData({
            drawhead: res
          })
        })
      }
    })
  },

  //统计广告位点击次数
  numclick: function () {
    var appid = this.data.drawbanner.bannerId;
    var appname = this.data.drawbanner.title;
    console.log(appid + ' ' + appname)
    drawService.updateStatisCount(appname, appid, res => { })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})