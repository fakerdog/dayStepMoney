// pages/pubwithdetail/pubwithdetail.js
// pages/withdetail/withdetail.js
const app = getApp();
const drawService = require("../../services/drawService.js");
const runService = require("../../services/runService.js");
const utils = require("../../utils/util.js");
const drawUtil = require("../../utils/drawUtil.js");
const assistService = require("../../services/assistService.js");
const configServer = require("../../utils/server.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: Number(0.000).toFixed(3),
    modalbackimg: "../../images/redenvelope.png"
  },
  tobanner: function() {
    var that = this;
    wx.navigateToMiniProgram({
      appId: that.data.bannerObj.appid,
      path: that.data.bannerObj.path,
      success: function(res) {
        configServer.updateStatisCount(that.data.bannerObj.appname, that.data.bannerObj.appid);
      }
    })
  },
  toRedBag: function() {
    var that = this;
    wx.navigateToMiniProgram({
      appId: that.data.modalObj.appid,
      path: that.data.modalObj.path,
      success: function(res) {
        that.setData({
          redPackageModal: false
        });
        configServer.updateStatisCount(that.data.modalObj.appname, that.data.modalObj.appid);
      }
    })
  },

  toclose: function() {
    this.setData({
      redPackageModal: false,
    });
  },
  toSaveadv: function(e) {
    var that = this;
    wx.navigateToMiniProgram({
      appId: that.data.bannerObj.appid,
      path: that.data.bannerObj.path,
      success: function(res) {
        that.setData({
          widthdrawFlag: false,
        });
        configServer.updateStatisCount(this.data.widthdrawObject.appname, this.data.widthdrawObject.appid);
      }
    })
  },
  hideSaveModal: function() {
    this.setData({
      widthdrawFlag: false
    })
  },
  //广告位数据
  prepareAdvert: function() {
    //加载数据
    configServer.getConfig(res => {
      if (res.data) {
        var leftArr = [];
        var moreObj = null;
        var bannerObj = null;
        var shareObj = null;
        var contactObj = null;
        var promotionObj = null;
        var modalObj = null;
        var controlObject = null;
        var sharewarnObject = null;
        var savemodalObject = null;
        var widthdrawObject = null;

        if (res.data) {
          for (var i = 0; i < res.data.length; i++) {
            var obj = res.data[i];
            if (obj.id === 0 || obj.id === 1 || obj.id === 2 || obj.id === 3) {
              leftArr.push(obj);
            } else if (obj.id === 4) {
              moreObj = obj;
            } else if (obj.id === 5) {
              bannerObj = obj;
            } else if (obj.id === 6) {
              shareObj = obj;
            } else if (obj.id === 100) {
              contactObj = obj;
            } else if (obj.id === 102) {
              promotionObj = obj;
            } else if (obj.id === 103) {
              modalObj = obj;
            } else if (obj.id === 200) {
              controlObject = obj;
              Object.assign(controlObject, {
                curnum: 0,
                shareflag: false
              })
            } else if (obj.id === 300) {
              savemodalObject = obj;
            } else if (obj.id === 400) {
              widthdrawObject = obj;
            }
          }
        }

        if (modalObj) {
          this.setData({
            redPackageModal: true
          });
          //开启定时器
          if (modalObj.limit != -1) {
            var modalfootersecond = modalObj.limit;
            this.setData({
              modalfootersecond: modalfootersecond
            });
            var itime = setInterval(() => {
              if (modalfootersecond == 0) {
                this.setData({
                  redPackageModal: false
                });
                clearInterval(itime);
              } else {
                modalfootersecond--;
                this.setData({
                  modalfootersecond: modalfootersecond
                });
              }
            }, 1000);
          }
        }

        this.setData({
          bannerObj: bannerObj,
          modalObj: modalObj,
          savemodalObject: savemodalObject,
          widthdrawObject: widthdrawObject
        });
      }
    });
  },
  //点击立即提现的方法
  towithdetail: function() {
    this.setData({
      btnDisabled: 'disabled'
    });
    if (Number(this.data.money) < this.data.smoney) {
      wx.showModal({
        title: '提示',
        content: '余额不足' + this.data.smoney + '元，无法提现',
        showCancel: false
      })
      return;
    }
    //符合提现条件
    drawService.drawCashForMoeny(Number(Math.floor(this.data.smoney * 100) / 100) * 100, res => {
      var errorcode = res.data.data;
      if (errorcode == 0) {
        this.setData({
          money: Number(this.data.money - this.data.smoney).toFixed(3),
          allmoney: ''
        })
        wx.showModal({
          title: '提现成功',
          content: '资金会在1~3个工作日转入你的微信钱包',
          showCancel: false
        })
        if(this.data.widthdrawObject){
          this.setData({
            widthdrawFlag:true
          })
        }
        this.setData({
          btnDisabled: ''
        });
      } else if (errorcode == 100) {
        wx.showModal({
          title: '提示',
          content: '你已经提现过一次了,不能再次提现',
          showCancel: false
        })
        this.setData({
          btnDisabled: ''
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '系统繁忙，请稍后(或明日)再试',
          showCancel: false
        })
        this.setData({
          btnDisabled: ''
        });
      }
    }, () => {
      this.setData({
        btnDisabled: ''
      });
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.prepareAdvert();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    app.getUserInfo(res => {
      drawService.getDrawGet(res => {
        this.setData({
          shuijing: res.data.data.idealMoney,
          money: Number(res.data.data.money).toFixed(3)
        })
        runService.getSysInfo(res => {
          var sysSet = res.data.data.sysset;
          app.globalData.sysSet = sysSet;
          that.setData({
            smoney: parseFloat(Number(sysSet.special_withdraw_money) / 100)
          })

        });
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(msg) {
    var that = this;
    var path = "/pages/index/index";
    var title = "";
    return {
      title: title,
      path: path,
      imageUrl: ""
    }

  }

})