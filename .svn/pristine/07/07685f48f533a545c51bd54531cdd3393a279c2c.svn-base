/**
 * 大转盘抽奖
 */

const util = require("../../utils/util.js");
const PromotAdvaceUtil = require("../../utils/PromotAdvaceUtil.js");
const ShareUtil = require("../../utils/ShareUtil.js");
const Animation = require("../../utils/animationUtil.js");
const draw = require("../../utils/drawUtil.js");
const drawService = require("../../services/drawService.js");
const runService = require("../../services/runService.js");
const runUtil = require("../../utils/RunUtil.js");
const app = getApp();

Page({

  data: {
    drawicon: app.CDN_URL + "draw2.gif?t=3",
    modalbackimg: "../../images/redenvelope.png",
    modalbackshareimg: app.CDN_URL + "share.png",
    modalbacklineimg: app.CDN_URL + "ling.png",
    money: Number(0.000).toFixed(3),
    drawMoney: Number(0.000).toFixed(3),
    popuphidden: false,
    sharePng: app.CDN_URL + 'share.png',
    dayMoney: Number(0.000).toFixed(3),
    loadflag: false,
    guide: false
  },

  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var model = res.model.replace(/\s/g, "");
        if (model.indexOf("iPhone") != -1) { //iphoneX
          app.globalData.iphonex = true;
        } else {
          app.globalData.iphonex = false;
        }
      }
    });
    this.data.loadflag = true;
    this.data.tempnewuserflag = false;
    //获取用户提现数据，用于轮动展示
    drawService.getDrawMoneyUser(res => {
      var swiperItems = res.data.data;
      for (var i = 0; i < swiperItems.length; i++) {
        if (swiperItems[i].nickname.length > 8) {
          swiperItems[i].nickname = swiperItems[i].nickname.slice(0, 7) + '...';
        }
      }
      that.setData({
        swiperItems: swiperItems
      })
    })
    that.setData({
      options: options
    })
  },

  onShow: function () {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    app.getUserInfo(res => {
      if (app.globalData.userInfo.isnew == 1 || app.globalData.userInfo.isnew == "1") {
        app.globalData.userInfo.isnew = 0;
        this.data.tempnewuserflag = true;
        this.setData({
          newmoney: Number(app.globalData.userInfo.newmoney).toFixed(3),
          newuserflag: true
        })
        draw.getNewRandomArrayElements(res => {
          app.globalData.drawItem = res;
        })
      }

      drawService.getDrawGet(res => {
        app.globalData.drawGet={
          idealMoney: Number(res.data.data.idealMoney),
          money: Number(res.data.data.money).toFixed(3),
          dayMoney: Number(res.data.data.dayMoney).toFixed(3)
        }
        this.setData({
          shuijing: res.data.data.idealMoney,
          money: this.data.tempnewuserflag ? 0 : Number(res.data.data.money).toFixed(3),
          dayMoney: Number(res.data.data.dayMoney).toFixed(3)
        })
        if (this.data.loadflag) {
          //初次加载
          this.data.loadflag = false;
          wx.login({
            success: res => {
              if (this.data.tempnewuserflag) {
                this.setData({
                  newuserflag: true
                })
              }
              var code = res.code; //code
              wx.getWeRunData({
                success: res => {
                  var iv = res.iv;
                  var encryptedData = res.encryptedData;

                  //加载打卡数据，并实现打卡
                  runService.encryptWeRunData(encryptedData, iv, code, res => {
                    var data = res.data.data;
                    //当前月的数据
                    var mystep = parseInt(data.step);
                    var sjNum = parseInt(data.sjNum);
                    var stepTot = parseInt(data.stepTot);
                    var moneyTot = parseInt(data.moneyTot);
                    var todayallstep = parseInt(data.todayallstep);
                    var stepList = data.stepList;
                    var sysSet = data.sysset;
                    this.data.mystep = mystep;
                    app.globalData.stepInfo = {};
                    app.globalData.stepInfo.mystep = mystep;
                    app.globalData.stepInfo.sjNum = sjNum;
                    app.globalData.stepInfo.stepTot = stepTot;
                    app.globalData.stepInfo.moneyTot = moneyTot;
                    app.globalData.stepInfo.todayAllStep = todayallstep;
                    app.globalData.stepInfo.stepList = stepList;
                    app.globalData.sysSet = sysSet;

                    this.setData({
                      mystep: mystep,
                      sjNum: sjNum,
                      stepTot: stepTot,
                      moneyTot: moneyTot
                    });
                    //画图
                    this.drawerStepCanvas();
                    wx.hideLoading(); //数据加载完成
                  });
                },
                fail: res => {
                  this.data.loadflag = true;
                  wx.hideLoading();
                  this.setData({
                    showScopeModule: true,
                    newuserflag: false
                  })
                }
              });
            }
          });
        } else {
          wx.hideLoading();
          this.setData({
            mystep: app.globalData.stepInfo.mystep,
            sjNum: app.globalData.stepInfo.sjNum,
            stepTot: app.globalData.stepInfo.stepTot,
            moneyTot: app.globalData.stepInfo.moneyTot
          });
        }
      })

    })
  },

  onReady: function (e) {
    //分享
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  //用户分享
  onShareAppMessage: function (msg) {
    return {
      title: '负责任地告诉你这是真的！',
      path: '/pages/index/index',
      imageUrl: app.CDN_URL + 'share_tran.png'
    }
  },
  closeguide: function () {
    this.setData({
      guide: false
    })
  },
  tohelpguide: function () {
    this.setData({
      guide: false
    })
    wx.navigateTo({
      url: '/pages/help/help'
    })
  },
  //新用户红包
  handleNewUserMoney: function () {
    wx.showLoading({
      title: '领取现金红包中',
    })
    drawService.getSysMoney(Number(app.globalData.userInfo.newmoney).toFixed(3), res => {
      if (res.data.data == 1) {
        this.data.tempnewuserflag = false;
        app.globalData.userInfo.money = Number(app.globalData.userInfo.newmoney).toFixed(3);
        this.setData({
          money: app.globalData.userInfo.money,
          newuserflag: false
        })
        wx.showToast({
          title: '获得' + this.data.newmoney + '元',
          icon: 'success',
          duration: 1500,
        })
        //弹出引导框
        var stepproportions = app.globalData.sysSet.stepproportion;
        var guidestep = Number(this.data.mystep) + Number(this.data.stepTot);
        var guidekabi = Number(guidestep / stepproportions).toFixed(0);
        var guidemoney = Number(guidekabi / 1000).toFixed(1);
        this.setData({
          guide: true,
          guidekabi: guidekabi,
          guidemoney: guidemoney,
          guidestep: guidestep
        })
      } else {
        wx.showToast({
          title: "领取失败",
          icon: 'success',
          duration: 1500,
        })
      }
    });
  },
  /**
   * 根据步数画图
   */
  drawerStepCanvas: function () {
    var winWidth = wx.getSystemInfoSync().windowWidth;
    ////创建并返回绘图上下文context对象
    var cxt_arc = wx.createCanvasContext('canvasArc');
    cxt_arc.beginPath();

    cxt_arc.setStrokeStyle('#FFFFFF');
    cxt_arc.setLineWidth(4);
    cxt_arc.setLineCap('round')
    cxt_arc.arc(48, 50, 44, Math.PI * 0.5, Math.PI * 2.5, false);
    cxt_arc.stroke();
    cxt_arc.draw();
    //计时器
    this.clearTimeInterval(); //清除计时器
    var that = this;
    var mystep = this.data.mystep;
    var minPercent = Math.PI * 0.5;
    var maxPercent = Math.PI * (0.5 + (mystep / 10000) * 2);
    if (maxPercent > Math.PI * 2.5) {
      maxPercent = Math.PI * 2.5;
    }
    var curPercent = minPercent;
    var inter_id = setInterval(function () {
      if (curPercent >= maxPercent) {
        that.clearTimeInterval();
        that.setData({
          scalecls: "scale-cls"
        });
      } else {
        curPercent += 0.1;
        cxt_arc.setStrokeStyle('#40d07f');
        cxt_arc.setLineWidth(4);
        cxt_arc.setLineCap('round')
        cxt_arc.arc(48, 50, 44, minPercent, curPercent, false);
        cxt_arc.stroke();
        cxt_arc.draw();
      }
    }, 30);
    app.globalData.time_inter_ids.push(inter_id); //计时器数组

  },

  //清除所有计时器
  clearTimeInterval: function () {
    var ids = app.globalData.time_inter_ids;
    if (ids && ids.length > 0) {
      for (var i = 0; i < ids.length; i++) {
        clearInterval(ids[i]);
      }
    }
    app.globalData.time_inter_ids = [];
  },
  //清除某个计时器
  clearTimeIntervalById: function (inteId) {
    var ids = app.globalData.time_inter_ids;
    if (ids && ids.length > 0 && inteId) {
      for (var i = 0; i < ids.length; i++) {
        if (inteId == ids[i]) {
          clearInterval(ids[i]);
        }
      }
    }
  },
  //提现授权
  towithdetail: function (res) {
    if (typeof (res.detail.userInfo) == "undefined") { //授权失败
    } else { //授权成功
      drawService.toDrawUser(res.detail.userInfo, res => {
        wx.navigateTo({
          url: '/pages/withdetail/withdetail',
        })
      })
    }
  },
  unlockAll: function () {
    wx.navigateTo({
      url: '/pages/unlockedstep/unlockedstep',
    })
    this.setData({
      guide: false
    })
  },
  unlocktoday: function () {
    if (app.globalData.stepInfo.sjNum <= 0) {
      wx.showToast({
        title: '无步数可兑换',
      })
      return;
    }
    wx.showLoading({
      title: '数据加载中',
    })
    runService.unlocktoday(res => {
      wx.hideLoading(); //数据加载完成
      if (res.data.data == 1) {
        wx.showToast({
          title: '兑换成功',
        })
        var num = app.globalData.stepInfo.sjNum;
        app.globalData.stepInfo.sjNum = 0;
        app.globalData.stepInfo.mystep = 0
        this.setData({
          shuijing: Number(this.data.shuijing) + Number(num),
          sjNum: 0,
          mystep: 0
        }, () => {
          this.drawerStepCanvas();
        })

      }
    })
  },
  torecord: function () {
    wx.navigateTo({
      url: '/pages/record/record',
    })
  },
  tohelp: function () {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  toExchangeMoney: function (res) {
    if (typeof (res.detail.userInfo) == "undefined") { //授权失败
    } else { //授权成功
      drawService.toDrawUser(res.detail.userInfo, res => {
        wx.navigateTo({
          url: '/pages/exchangemoney/exchangemoney',
        })
      })
    }
  },
  //打开设置
  myopenSetting: function () {
    var code = this.data.code;
    var that = this;
    wx.openSetting({
      success: res => {
        if (res.authSetting['scope.werun']) {
          that.setData({
            showScopeModule: false
          })
        }
      }
    })
  },

  //去抽奖
  toDraw: function () {
    wx.navigateTo({
      url: '/pages/draw/draw',
    })
  }


})