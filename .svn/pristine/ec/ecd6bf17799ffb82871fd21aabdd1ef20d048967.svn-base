// pages/unlockedstep/unlockedstep.js
const runService = require("../../services/runService.js");
const RunUtil = require("../../utils/RunUtil.js");
const Calendar = require("../../utils/Calendar.js");
const drawService = require("../../services/drawService.js");
const configServer = require("../../utils/server.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    selectIndex: 0,
    startTime: null,
    flag: false
  },
  //广告位数据
  prepareAdvert: function () {
    //加载数据
    configServer.getConfig(res => {
      if (res.data) {
        var modalObj = null;

        if (res.data) {
          for (var i = 0; i < res.data.length; i++) {
            var obj = res.data[i];
            if (obj.id === 103) {
              modalObj = obj;
            }
          }
        }
        app.globalData.modalObj = modalObj;
        this.setData({
          modalObj: modalObj
        });
      }
    });
  },
  toRedBag: function () {
    var that = this;
    wx.navigateToMiniProgram({
      appId: that.data.modalObj.appid,
      path: that.data.modalObj.path,
      success: function (res) {
        that.setData({
          redPackageModal: false
        });
        configServer.updateStatisCount(that.data.modalObj.appname, that.data.modalObj.appid);
      }
    })
  },

  toclose: function () {
    this.setData({
      redPackageModal: false,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.modalObj) {
      this.prepareAdvert();
    }
    //不四舍五入
    var money = Number(parseFloat(app.globalData.stepInfo.moneyTot) / Number(app.globalData.sysSet.proportion)).toFixed(2).toString();
    money = Number(money.substring(0, money.lastIndexOf('.') + 2));
    this.setData({
      nickname: app.globalData.userInfo.nickname,
      stepTot: app.globalData.stepInfo.stepTot,
      moneyTot: parseInt(app.globalData.stepInfo.moneyTot),
      money: money,
      iphone: app.globalData.iphonex,
      hiddenCanvas: true,
      hiddenMonthCanvas: true,
      unlock_step_limit1: parseInt(app.globalData.sysSet.unlock_step_limit1),
      unlock_step_limit2: parseInt(app.globalData.sysSet.unlock_step_limit2),
      unlock_step_limit3: parseInt(app.globalData.sysSet.unlock_step_limit3),
      shuijing: app.globalData.drawGet.idealMoney,
      rmoney: app.globalData.drawGet.money,
      keep_staytime: app.globalData.sysSet.keep_staytime

    })
    runService.getRunDataList(res => {
      var steplist = res.data.data

      //获取小程序appid
      drawService.getLuckyDrawBanner(msg => {
        var banner = msg.data.banner;
        if (banner) {
          var banlength = banner.length;
          var cnum = 1;
          for (var i = 0; i < steplist.length; i++) {
            if (steplist[i].type == 3) {
              steplist[i].bannerId = banner[cnum % banlength].bannerId;
              steplist[i].title = banner[cnum % banlength].title;
              cnum++;
            }
          }
        }
        this.setData({
          steplist: steplist
        })
      });

    });

    wx.showShareMenu({
      withShareTicket: true
    });
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var paramDate = new Date();
    var signDates = app.globalData.stepInfo.stepList;
    var calendarObj = Calendar.getSignCalendar(paramDate, signDates);
    this.data.calendarObj = calendarObj;
    if (this.data.flag) {
      var nowDate = new Date();
      var nowTime = nowDate.getTime();
      if (Number(nowTime) - Number(this.data.startTime) > Number(app.globalData.sysSet.keep_staytime) * 1000) { //测试超过指定时间
        this.data.flag = false;
        var selectIndex = this.data.selectIndex;
        //统计点开后停留指定时间的广告数量
        var appid = this.data.steplist[this.data.selectIndex].bannerId;
        var appname = this.data.steplist[this.data.selectIndex].title;
        drawService.updateStatisEffectiveCount(appname, appid, res => {
        })
        this.doServiceGet(selectIndex);
      } else {
        wx.showModal({
          title: '提示',
          content: '您需要停留' + app.globalData.sysSet.keep_staytime + '秒才可以领取',
          showCancel: false
        })
      }
    }
  },
  //去抽奖
  todraw: function () {
    wx.navigateTo({
      url: '/pages/draw/draw',
    })
  },

  //玩游戏领取
  numclick: function (e) {
    var that = this;
    that.data.selectIndex = e.target.dataset.index;
    wx.navigateToMiniProgram({
      appId: that.data.steplist[that.data.selectIndex].bannerId,
      success: function (res) {
        var appid = that.data.steplist[that.data.selectIndex].bannerId;
        var appname = that.data.steplist[that.data.selectIndex].title;
        //统计点击次数
        drawService.updateStatisCount(appname, appid, res => {
        })
        that.data.flag = true;
        var startDate = new Date();
        that.data.startTime = startDate.getTime();
      }
    })

  },

  //直接领取
  getShuiJing: function (e) {
    var that = this;
    var selectIndex = that.data.selectIndex = e.target.dataset.index;
    this.doServiceGet(selectIndex);
  },

  //领取
  doServiceGet: function (selectIndex) {
    var that = this;
    var date = that.data.steplist[selectIndex].date;
    var step = that.data.steplist[selectIndex].steps;
    var tempsjnum = that.data.steplist[selectIndex].sjnum;
    runService.groupshare(date, res => {
      //领取成功
      if (res.data.data == 1) {
        app.globalData.stepInfo.stepTot = app.globalData.stepInfo.stepTot - step;
        app.globalData.stepInfo.moneyTot = app.globalData.stepInfo.moneyTot - tempsjnum;
        app.globalData.drawGet.idealMoney = app.globalData.drawGet.idealMoney + tempsjnum;
        that.data.steplist.splice(selectIndex, 1);
        that.setData({
          shuijing: app.globalData.drawGet.idealMoney,
          steplist: that.data.steplist,
          stepTot: app.globalData.stepInfo.stepTot,
          moneyTot: app.globalData.stepInfo.moneyTot,
          showShareModal: false,
        });
        wx.showModal({
          title: '领取成功',
          showCancel: false,
          content: '已成功获得' + tempsjnum + '卡币'
        })
      } else {
        that.setData({
          showShareModal: false
        })
        wx.showModal({
          title: '领取失败',
          showCancel: false,
          content: '领取失败'
        })
      }
    })
  },

  //找好友解锁
  unlockshare: function (e) {
    this.data.selectIndex = e.target.dataset.index;
    var text = "找好友帮忙解锁，可获取" + this.data.steplist[this.data.selectIndex].sjnum + "卡币";
    this.data.helpflag = 1;

    this.setData({
      showShareModal: true,
      modaltext: text,
      diffgroup: false
    })
  },

  hideShareModal: function () {
    this.setData({
      showShareModal: false
    })
  },

  //今日步数分享图
  todayStepShareImg: function (msg) {
    console.log(msg)
    if (typeof (msg.detail.userInfo) == "undefined") { //授权失败
    } else { //授权成功
      drawService.toDrawUser(msg.detail.userInfo, res => {
      })
      app.globalData.userInfo.nickname = msg.detail.userInfo.nickName;
      var that = this;
      this.setData({
        showModalStatus: true,
        hiddenCanvas: true
      });

      wx.showLoading({
        title: '图片生成中...',
      });
      wx.getImageInfo({
        src: app.CDN_URL + 'drawerbgIndex.png',
        success: function (res) {
          that.data.drawerbgIndex = res.path;
          that._drawShareImg();
        }
      })
    }
  },

  //画图
  _drawShareImg: function () {
    this.setData({
      hiddenCanvas: false
    });
    var destWidth = 1305;
    var destHeight = 1501;
    const ctx = wx.createCanvasContext('shareCanvas');
    ctx.drawImage(this.data.drawerbgIndex, 0, 0, destWidth, destHeight);
    var mystep = app.globalData.stepInfo.todayAllStep;
    //计算卡路里
    var k = 0.8;
    var weight = parseInt(60);//kg
    var height = parseInt(175);//cm
    var stepWidth = height * 0.4 / 100; //步幅，米
    var caloris = (weight * mystep / 1000 * stepWidth * k).toFixed(1);
    var km = (stepWidth * mystep / 1000).toFixed(1); //公里
    var shareObj = RunUtil.getRateAndLetters(mystep, 1);
    var shareLetters = RunUtil.getShareLetters();
    //显示数据
    var userInfo = app.globalData.userInfo;
    var nickName = userInfo.nickname;

    //数据
    ctx.setFontSize(80);
    ctx.setFillStyle("#141414");
    ctx.textAlign = 'center';
    ctx.fillText(nickName, 645, 120);

    ctx.setFillStyle("#408b51");
    ctx.fillText(shareObj.rate + "%", 825, 250);//排行

    ctx.setFontSize(60);
    ctx.setFillStyle("#141414");
    ctx.fillText("今日步数超过了全国               的网友", 645, 240);

    ctx.setFontSize(48);
    ctx.fillText("运动" + km + "公里，消耗" + caloris + "卡路里", 645, 930);

    if (shareLetters) {
      ctx.setFontSize(60);
      ctx.setFillStyle("#408b51");
      ctx.fillText(shareLetters[0], 645, 1150);
      ctx.fillText(shareLetters[1], 645, 1250);
    }
    ctx.setFillStyle("#fff");
    ctx.setFontSize(150);
    ctx.textAlign = 'center';
    ctx.fillText(mystep, 670, 670);//步数

    //图片显示
    var that = this;
    ctx.draw(true, res => {
      wx.canvasToTempFilePath({
        destWidth: destWidth,
        destHeight: destHeight,
        width: destWidth,
        height: destHeight,
        canvasId: 'shareCanvas',
        success: function (res) {
          that.setData({
            showModalStatus: true,
            hiddenCanvas: true,
            imagePath: res.tempFilePath,
          });
        },
        complete: function (res) {
          //图片生成完成
          wx.hideLoading();
        }
      });
    });
  },

  /**
   * 保存图片
   */
  saveImg: function () {
    var filePath = this.data.imagePath;
    wx.saveImageToPhotosAlbum({
      filePath: filePath,
      success: res => {
        wx.showToast({
          title: '已保存到相册',
          icon: 'success',
          duration: 2000
        });
        this.setData({
          showModalStatus: false,
          hiddenCanvas: true
        });
      }
    });
  },

  /**
   * 取消保存图片
   */
  cancel: function () {
    this.setData({
      showModalStatus: false,
      hiddenCanvas: true,
    });
  },

  /**
     * 月分享
     */
  doshare: function (msg) {
    if (typeof (msg.detail.userInfo) == "undefined") { //授权失败
    } else { //授权成功
      drawService.toDrawUser(msg.detail.userInfo, res => {
      })
      app.globalData.userInfo.nickname = msg.detail.userInfo.nickName;
      var that = this;
      this.setData({
        showModalMonthStatus: true
      });
      wx.getImageInfo({
        src: app.CDN_URL + 'drawerbg.png',
        success: function (res) {
          that.data.drawerbg = res.path;
          that.drawMonthShareImg();
        }
      })
    }
  },

  /**
   * 画图
   */
  drawMonthShareImg: function () {
    wx.showLoading({
      title: '图片生成中...',
    });
    this._drawMonthShareImg();
  },

  //画图
  _drawMonthShareImg: function () {
    this.setData({
      hiddenMonthCanvas: false
    });
    var destWidth = 1305;
    var destHeight = 1920;
    const ctx = wx.createCanvasContext('shareMonthCanvas');
    ctx.drawImage(this.data.drawerbg, 0, 0, destWidth, destHeight);

    //显示数据
    var calendarObj = this.data.calendarObj;
    var totalSteps = calendarObj.totalSteps;
    var totalStepsValue = calendarObj.totalStepsValue;
    var totalDates = calendarObj.totalDates;
    var shareObj = RunUtil.getRateAndLetters(totalStepsValue, totalDates);

    //显示数据
    var now = new Date();
    var month = now.getMonth() + 1;
    var userInfo = app.globalData.userInfo;
    var nickName = userInfo.nickname;

    //数据
    ctx.setFontSize(80);
    ctx.setFillStyle("#FFF");
    ctx.textAlign = 'center';
    ctx.fillText(nickName, 645, 140);

    ctx.setFillStyle("#000");
    ctx.fillText(totalSteps, 575, 300);//步数
    ctx.fillText(shareObj.avgSteps, 945, 425);//平均
    ctx.fillText(shareObj.rate + "%", 710, 550);//排行

    ctx.setFontSize(60);
    ctx.setFillStyle("#FFF");
    ctx.fillText(month + "月已完成                 步", 445, 300);
    ctx.fillText("平均每天行走                 步", 780, 420);
    ctx.fillText("超过了全国               的网友", 645, 550);
    ctx.setFillStyle("#141414");
    ctx.fillText(shareObj.letters, 645, 590);

    ctx.setFontSize(80);
    ctx.setFillStyle("#FFF");
    ctx.textAlign = 'center';
    ctx.fillText(month + "月", 645, 700);

    //日历
    var days = ["日", "一", "二", "三", "四", "五", "六"];
    ctx.setFontSize(60);
    for (var i = 0; i < days.length; i++) {
      if (i === 0 || i === days.length - 1) {
        ctx.setFillStyle("#ff7e38");
      } else {
        ctx.setFillStyle("#141414");
      }
      var day = days[i];
      ctx.fillText(day, 90 + i * 180, 810);
    }

    ctx.setFontSize(16);
    ctx.setFillStyle("#141414");
    var curCalendars = this.data.calendarObj.calendar;
    var j = 0;
    var height = 760;
    var signbgHeight = 665;
    for (var i = 0; i < curCalendars.length; i++) {
      var item = curCalendars[i];
      var date = item.date;
      if (i % 7 === 0) {
        height += 180;
        signbgHeight += 180;
        j = 0;
      }
      ctx.setFillStyle("#141414");
      ctx.setFontSize(60);
      ctx.fillText(date, 95 + j * 180, height);
      // console.log(item);
      if (item.steps) {
        if (parseInt(item.tmpSteps) >= 10000) {
          ctx.drawImage("../../images/signbg.png", 30 + j * 180, signbgHeight, 140, 130);
        }
        ctx.setFillStyle("#ff7e38");
        ctx.setFontSize(40);
        ctx.fillText(item.steps, 100 + j * 180, signbgHeight + 155);
      }
      j += 1;
    }

    //图片显示
    var that = this;
    ctx.draw(true, res => {
      wx.canvasToTempFilePath({
        destWidth: destWidth,
        destHeight: destHeight,
        width: destWidth,
        height: destHeight,
        canvasId: 'shareMonthCanvas',
        success: function (res) {
          that.setData({
            imageMonthPath: res.tempFilePath,
          });
        },
        complete: function (res) {
          //图片生成完成
          wx.hideLoading();
        }
      });
    });
  },

  /**
   * 保存图片
   */
  saveMonthImg: function () {
    var filePath = this.data.imageMonthPath;
    wx.saveImageToPhotosAlbum({
      filePath: filePath,
      success: res => {
        wx.showToast({
          title: '已保存到相册',
          icon: 'success',
          duration: 2000
        });
        this.setData({
          showModalMonthStatus: false,
          hiddenMonthCanvas: true
        });
      }
    });
  },

  /**
   * 保存图片
   */
  monthcancel: function () {
    this.setData({
      showModalMonthStatus: false,
      hiddenMonthCanvas: true
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (msg) {
    var that = this;
    var path = "/pages/index/index";
    if (msg.from === 'button' && this.data.helpflag == 1 && that.data.steplist.length > 0) {
      this.data.helpflag = 0;
      path = "/pages/friendhelp/friendhelp?openid=" + app.globalData.userInfo.openid + "&date=" + that.data.steplist[that.data.selectIndex].date + "&nickname=" + that.data.nickname + "&sjnum=" + that.data.steplist[that.data.selectIndex].sjnum;

      setTimeout(function () {
        // 分享到个人
        var modalObj = that.data.modalObj;
        if (modalObj) {
          that.setData({
            redPackageModal: true
          });
          //开启定时器
          if (modalObj.limit != -1) {
            var modalfootersecond = modalObj.limit;
            that.setData({
              modalfootersecond: modalfootersecond
            });
            var itime = setInterval(() => {
              if (modalfootersecond == 0) {
                that.setData({
                  redPackageModal: false
                });
                clearInterval(itime);
              } else {
                modalfootersecond--;
                that.setData({
                  modalfootersecond: modalfootersecond
                });
              }
            }, 1000);
          }
        }
        that.setData({
          showShareModal: false
        });
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '若分享成功，请等待好友解锁即可获得卡币'
        });
      }, 3000);

      return {
        title: that.data.nickname + "@我，快帮我解锁，就可以快速提现1元红包了",
        path: path,
        imageUrl: app.CDN_URL + 'share_tran.png'
      }
    } else if (msg.from === 'menu') {
      return {
        title: "负责任地告诉你这是真的！！",
        path: path,
        imageUrl: app.CDN_URL + 'share_tran.png'
      }
    } else if (msg.target.dataset.sflag == 2) { //分享
      var that = this;
      var selectIndex = msg.target.dataset.index;
      setTimeout(function () {
        that.doServiceGet(selectIndex);
      }, 3000);
      return {
        title: "负责任地告诉你这是真的！！",
        path: path,
        imageUrl: app.CDN_URL + 'share_tran.png'
      }
    }
  }
})