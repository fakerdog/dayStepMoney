// pages/friendhelp/friendhelp.js
const runService = require("../../services/runService.js");
const drawService = require("../../services/drawService.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabledflag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.friendopenid = options.openid;
    this.data.date = options.date;
    this.data.friendnickname = options.nickname;
    this.data.sjnum = options.sjnum;
    app.getUserInfo(res => {
      //自己进入自己的卡片，直接回index
      if (this.data.friendopenid == app.globalData.userInfo.openid) {
        wx.redirectTo({
          url: '/pages/index/index'
        })
      }
      this.setData({
        nickname: this.data.friendnickname,
        sjnum:this.data.sjnum
      })
      //新用户
      if (app.globalData.userInfo.isnew == 1 || app.globalData.userInfo.isnew == "1") {
        this.setData({
          newmoney: Number(app.globalData.userInfo.newmoney).toFixed(3),
          newflag: true
        })
      } else {
        drawService.getDrawGet(res => {
          this.setData({
            money: this.data.tempnewuserflag ? 0 : Number(res.data.data.money).toFixed(3),
            newflag: false
          })
        });
      }
    });
  },
  helpunlock: function () {
    if (this.data.friendopenid) {
      this.setData({
        disabledflag: true
      })
      runService.friendhelp(this.data.friendopenid, this.data.date, res => {
        var that=this;
        if (res.data.data == 1) {
          setTimeout(function () {
            wx.showModal({
              title: '提示',
              content: '帮助好友解锁成功',
              showCancel: false
            })
          }, 500);
        } else if (res.data.data == 2) {
          setTimeout(function () {
            wx.showModal({
              title: '提示',
              content: '您已经帮ta解锁过了！',
              showCancel: false
            })
          }, 500);
        }
      }, () => {
        this.setData({
          disabledflag: false
        })
      });
    }
  },
  toindex: function () {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})