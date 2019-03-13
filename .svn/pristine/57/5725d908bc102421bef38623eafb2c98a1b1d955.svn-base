// pages/record/record.js
const app = getApp();
const runService = require("../../services/runService.js");
const drawService = require("../../services/drawService.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    drawService.getDrawGet(res => {
      this.setData({
        nickname: app.globalData.userInfo.nickname,
        shuijing: res.data.data.idealMoney,
      })

    });
    runService.getrecordlist(res => {
      this.setData({
        recordlist: res.data.data
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toindex:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})