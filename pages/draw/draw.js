// pages/draw/draw.js
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

  /**
   * 页面的初始数据
   */
  //奖品配置
  awardsConfig: {
    chance: true,
    awards: [{
      'index': 0,
      'name': '随机红包',
      'award': 'A'
    },
    {
      'index': 1,
      'name': '神秘大奖',
      'award': 'B'
    },
    {
      'index': 2,
      'name': '10卡币',
      'award': 'C'
    },
    {
      'index': 3,
      'name': '谢谢参与',
      'award': 'D'
    },
    {
      'index': 4,
      'name': '20卡币',
      'award': 'E'
    },
    {
      'index': 5,
      'name': '1元红包',
      'award': 'F'
    },
    {
      'index': 6,
      'name': '分享好友',
      'award': 'G'
    }
    ],
  },
  data: {
    drawItem: [],
    modalbackimg: "../../images/redenvelope.png",
    modalbackshareimg: app.CDN_URL + "share.png",
    modalbacklineimg: app.CDN_URL + "ling.png",
    indexflag: 3,
    drawmsg: '',
    awardsList: {},
    animationData: {},
    btnDisabled: '',
    shareFlag: '',
    RedagDisabled: false,
    sjDrawNum: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
    * 生命周期函数--监听页面显示
    */
  onShow: function () {
    //新用户
    if (app.globalData.drawItem) {
      this.data.drawItem = app.globalData.drawItem;
      app.globalData.drawItem = null;
    }
    drawService.getDrawGet(res => {
      this.setData({
        shuijing: res.data.data.idealMoney,
        money: Number(res.data.data.money).toFixed(3),
        dayMoney: Number(res.data.data.dayMoney).toFixed(3)
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.drawAwardRoundel();
  },
  //画抽奖圆盘
  drawAwardRoundel: function () {
    var awards = this.awardsConfig.awards;
    var awardsList = [];
    var turnNum = 1 / awards.length; // 文字旋转 turn 值

    // 奖项列表
    for (var i = 0; i < awards.length; i++) {
      awardsList.push({
        turn: i * turnNum + 'turn',
        lineTurn: i * turnNum + turnNum / 2 + 'turn',
        award: awards[i].name
      });
    }

    this.setData({
      btnDisabled: this.awardsConfig.chance ? '' : 'disabled',
      awardsList: awardsList
    });
  },
  toawardIndex: function (drawmsg) {
    var indexflag;
    if (drawmsg == "A") { //返回随机红包
      indexflag = 0;
    } else if (drawmsg == "B") { //幸运奖
      indexflag = 1;
      //测试数字动态,以下应该获得卡币或者红包时触发，
    } else if (drawmsg == "C") { //10卡币
      indexflag = 2;
    } else if (drawmsg == "D") { //谢谢参与
      indexflag = 3;
    } else if (drawmsg == "E") { //5卡币
      indexflag = 4;
    } else if (drawmsg == "G") { //分享好友
      indexflag = 6;
    }
    return indexflag;
  },

  //发起抽奖
  playReward: function () {
    this.setData({
      shareFlag: 2,
      drawmsg: ''
    })
    if (typeof (this.data.shuijing) == 'undefined' || Number(this.data.shuijing) < 10) {
      //卡币不够，直接给出提示
      wx.showModal({
        title: '卡币不够了',
        cancelText: "步数兑换",
        cancelColor: "#3cc51f",
        content: '可以用步数兑换',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            wx.navigateTo({
              url: '/pages/unlockedstep/unlockedstep',
            })
          }

        }
      });
      return;
    } else {
      this.setData({
        shuijing: this.data.shuijing - 10
      })
      if (this.data.drawItem.length == 0) { //判断随机的数组中是否为空
        draw.getRandomArrayElements(res => {
          this.data.drawItem = res;
        })
      }
      var drawType = this.data.drawItem.pop(); //取出最后一个下标的值
      var awarddrawIndex = this.toawardIndex(drawType);
      this.runDeg = this.runDeg || 0;
      Animation.rotateAnimation(this.runDeg + (360 - this.runDeg % 360) + (360 * 6 - awarddrawIndex * (360 / this.awardsConfig.awards.length)), 4000, 'ease', (res, runDeg) => {
        this.setData({
          animationData: res,
          btnDisabled: 'disabled'
        });
        this.runDeg = runDeg;
      });
      var resdata;
      drawService.goDraw(drawType, res => {
        resdata = res;

      }, () => {
        this.setData({
          btnDisabled: ''
        });
      })

      setTimeout(() => {
        if (!resdata) {
          this.data.indexflag = this.toawardIndex("D");
          this.data.drawmsg = "D";
          this.setData({
            drawmsg: "D"
          })
          Animation.rotateAnimation(this.runDeg + (360 - this.runDeg % 360) + (360 * 6 - this.data.indexflag * (360 / this.awardsConfig.awards.length)), 1000, 'ease', (res, runDeg) => {
            wx.showToast({
              title: '谢谢参与',
              icon: 'success',
              duration: 1000
            })
            this.setData({
              animationData: res,
              btnDisabled: ''
            });
            this.runDeg = runDeg;
          });
          return;
        }

        var res = resdata;
        var drawflag = res.data.data.flag;
        if (drawflag) {
          this.data.indexflag = this.toawardIndex(res.data.message);
          this.data.drawmsg = res.data.message;
          this.setData({
            drawmsg: this.data.drawmsg //返回的红包金额
          })
          if (this.data.drawmsg == "A") { //返回随机红包
            this.setData({
              drawMoney: res.data.data.drawMoney //返回的红包金额
            })
          }
        } else { //今日获得随机红包已经超过0.4000元，提示幸运奖
          var sjmy = res.data.data.sjmy;
          this.setData({
            drawmsg: "B"
          })
          this.data.indexflag = 1;
        }
        this.stopDraw(this.data.indexflag);
      }, 4000)

    }
  },

  //抽奖盘转动
  stopDraw: function (awardIndex) {
    var awardIndex = awardIndex; //数据来自请求返回的结果res
    if (awardIndex == 2) {
      this.setData({
        popuphidden: true,
        btnDisabled: '',
        sjDrawNum: 10
      })
    } else if (awardIndex == 4) {
      this.setData({
        popuphidden: true,
        btnDisabled: '',
        sjDrawNum: 20
      })
    } else {
      if (awardIndex == 0) { //随机红包的弹窗
        this.setData({
          popuphidden: true,
          btnDisabled: ''
        })
      } else if (awardIndex == 1) { //幸运奖的弹窗
        this.setData({
          popuphidden: true,
          btnDisabled: ''
        })
        drawService.getLuckyDrawBanner(res => {
          var banner = res.data.banner;
          if (banner) {
            for (var i = 0; i < banner.length; i++) {
              var imgUrl = app.CDN_URL + banner[i].imgUrl;
              banner[i].imgUrl = imgUrl;
            }
            var bannerindex = parseInt(banner.length * Math.random());
            this.setData({
              item: banner[bannerindex]
            })
          }
        })
      } else if (awardIndex == 3) { //随机红包的弹窗
        wx.showToast({
          title: '谢谢参与',
          icon: 'success',
          duration: 1000
        })
        this.setData({
          btnDisabled: ''
        })
      } else if (awardIndex == 6) { //分享还有的弹窗
        this.setData({
          popuphidden: true,
          btnDisabled: ''
        })
      }
    }
  },
  //领红包
  toRedBag: function () {
    var that = this;
    if (!that.data.RedagDisabled) {
      that.setData({
        RedagDisabled: true
      })
      drawService.instDrawGetDetailBackNum(Number(this.data.drawMoney).toFixed(3), res => {
        wx.showToast({
          title: '红包领取成功',
          icon: 'success',
          duration: 500
        })
        setTimeout(function () {
          that.setData({
            money: Number(res.data.data).toFixed(3),
            popuphidden: false
          })
        }, 500)
        setTimeout(function () {
          that.setData({
            RedagDisabled: false
          })
        }, 600)
      })
    }
  },
  //获得卡币
  hdshuijing: function () {
    var that = this;
    if (!this.data.RedagDisabled) {
      that.setData({
        RedagDisabled: true
      })
      wx.showToast({
        title: '获得' + this.data.sjDrawNum + '卡币',
        icon: 'success',
        duration: 1500,
      })
      that.setData({
        popuphidden: false,
        RedagDisabled: '',
        RedagDisabled: false,
        btnDisabled: '',
        shuijing: Number(this.data.shuijing) + Number(this.data.sjDrawNum),
      })

    }
  },
  //统计广告点击次数
  numclick: function () {
    var that = this;
    wx.navigateToMiniProgram({
      appId: that.data.item.bannerId,
      success: function (res) {
        var appid = that.data.item.bannerId;
        var appname = that.data.item.title;
        drawService.updateStatisCount(appname, appid, res => {
          that.setData({
            popuphidden: false
          })
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        popuphidden: false
      })
    }, 3000);

    return {
      title: '负责任地告诉你这是真的！',
      path: '/pages/index/index',
      imageUrl: app.CDN_URL + 'share_tran.png'
    }
  }
})