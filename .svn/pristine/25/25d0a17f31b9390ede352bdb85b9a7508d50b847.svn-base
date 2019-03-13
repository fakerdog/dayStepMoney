// pages/withdetail/withdetail.js
const app = getApp();
const drawService = require("../../services/drawService.js");
const utils = require("../../utils/util.js");
const drawUtil = require("../../utils/drawUtil.js");
const assistService = require("../../services/assistService.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: Number(0.000).toFixed(3),
    assistcount: 0,
    kefuicon: app.CDN_URL + "kefu.png"
  },
  initasisst: function (count) {
    var assistlist = [];
    for (var i = 0; i < count; i++) {
      assistlist[i] = {
        openid: "",
        friendopenid: "",
        avatarUrl: app.CDN_URL + "assistfriend.png"
      }
    }
    return assistlist;
  },
  //发起助力
  toassist: function () {
    assistService.toAssistance(res => {
      if (res.data.data == 0) {
        this.data.assistlist[0].avatarUrl = app.CDN_URL + "systemicon.png";
        this.data.assistlist[0].openid = app.globalData.userInfo.openid;
        this.data.assistlist[0].friendopenid = app.globalData.userInfo.openid;
        this.setData({
          assistlist: this.data.assistlist,
          assistflag: true,
          assistcount: 1
        })
        wx.showModal({
          title: '提示',
          content: '成功得到一次助力，去找其他朋友助力~',
          showCancel: false
        })

      }

    })
  },
  allwithdetail: function () {
    this.setData({
      allmoney: Number(Math.floor(this.data.money * 100) / 100)
    })
  },
  //点击立即提现的方法
  towithdetail: function () {
    this.setData({
      btnDisabled: 'disabled'
    });
    var allmoney = this.data.allmoney;
    if (typeof (allmoney) == 'undefined') {
      wx.showModal({
        title: '提示',
        content: '请输入提现金额',
        showCancel: false
      })
      this.setData({
        btnDisabled: ''
      });
    } else if (utils.isEmpty(allmoney.toString())) {
      wx.showModal({
        title: '提示',
        content: '请输入提现金额',
        showCancel: false
      })
      this.setData({
        btnDisabled: ''
      });
    } else {
      if (allmoney > this.data.money) {
        wx.showModal({
          title: '提示',
          content: '余额不足',
          showCancel: false
        })
        this.setData({
          btnDisabled: ''
        });
      } else if (allmoney < Number(app.globalData.sysSet.withdraw_bottom)) {
        this.setData({
          warnObject: {
            warntitle: "提示",
            warndesc: '每次提现金额至少' + app.globalData.sysSet.withdraw_bottom + '元'
          },
          showModal: true,
          btnDisabled: ''
        })
      } else if (allmoney > Number(app.globalData.sysSet.withdraw_top)) {
        wx.showModal({
          title: '提示',
          content: '每次提现金额限额' + Number(app.globalData.sysSet.withdraw_top) + '元',
          showCancel: false
        })
      } else if (this.data.assistcount < this.data.assist_totalcount) {
        wx.showModal({
          title: '助力已发起',
          content: this.data.assist_totalcount + '位朋友助力才可提现',
          showCancel: false,
          success: res => {
            this.toassist();
          }
        })
        this.setData({
          btnDisabled: ''
        });
      } else {
        //符合提现条件
        drawService.drawCash(Number(Math.floor(this.data.allmoney * 100) / 100) * 100, res => {
          var errorcode = res.data.data;
          if (errorcode == 0) {
            this.setData({
              money: Number(this.data.money - this.data.allmoney).toFixed(3),
              allmoney: ''
            })
            wx.showModal({
              title: '提现成功',
              content: '资金会在1~3个工作日转入你的微信钱包',
              showCancel: false
            })
            this.setData({
              btnDisabled: ''
            });
          } else if (errorcode == 7) { //消耗助力机会提现成功
            //助力
            this.setData({
              money: Number(this.data.money - this.data.allmoney).toFixed(3),
              allmoney: '',
              assistlist: this.initasisst(Number(app.globalData.sysSet.assist_count)),
              assistflag: false,
              assistcount: 0
            })
            wx.showModal({
              title: '提现成功',
              content: '资金会在1~3个工作日转入你的微信钱包',
              showCancel: false
            })
            this.setData({
              btnDisabled: ''
            });
          } else if (errorcode == 8) {
            wx.showModal({
              title: '提示',
              content: '助力已经过期,重新为您发起助力',
              showCancel: false
            })
            this.setData({
              btnDisabled: ''
            });
            this.data.assistlist = this.initasisst(Number(app.globalData.sysSet.assist_count));
            this.toassist();
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
      }
    }
  },

  /*键盘输入时触发事件  可以替换原值 赋值操作*/
  moneyInput: function (e) {
    var v2 = e.detail.value;
    var psize;
    if (parseInt(Number(v2)) == Number(v2)) {
      psize = 0;
    } else {
      psize = v2.toString().split(".")[1].length
    }
    if (psize > 2) {
      v2 = Number(v2).toFixed(2);
    }
    this.setData({
      allmoney: v2
    });
  },
  //刷新助力信息
  flushassistinfo: function () {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    //获取助力人微信头像
    assistService.getAssistList(res => {
      var list = res.data.data;
      if (list != null) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].openId == list[i].friendOpenId) {
            this.data.assistlist[i].openid = list[i].openId;
            this.data.assistlist[i].friendopenid = list[i].friendOpenId;
            this.data.assistlist[i].avatarUrl = app.CDN_URL + "systemicon.png"
          } else {
            this.data.assistlist[i].openid = list[i].openId;
            this.data.assistlist[i].friendopenid = list[i].friendOpenId;
            this.data.assistlist[i].avatarUrl = list[i].avatarUrl == "" ? app.CDN_URL + "frienddefault.png" : list[i].avatarUrl
          }

        }
        this.data.assistflag = true;
        this.data.assistcount = list.length;
        this.setData({
          assistlist: this.data.assistlist,
          assistflag: this.data.assistflag,
          assistcount: this.data.assistcount
        })
      } else {
        this.data.assistflag = false
        this.setData({
          assistlist: this.initasisst(Number(app.globalData.sysSet.assist_count)),
          assistflag: this.data.assistflag,
          assistcount: 0
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      assist_totalcount: Number(app.globalData.sysSet.assist_count),
      assistlist: this.initasisst(Number(app.globalData.sysSet.assist_count)),
      special_withdraw_money: parseFloat(Number(app.globalData.sysSet.special_withdraw_money) / 100)
    })
    //获取助力人微信头像
    assistService.getAssistList(res => {
      var list = res.data.data;
      if (list != null) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].openId == list[i].friendOpenId) {
            this.data.assistlist[i].openid = list[i].openId;
            this.data.assistlist[i].friendopenid = list[i].friendOpenId;
            this.data.assistlist[i].avatarUrl = app.CDN_URL + "systemicon.png"
          } else {
            this.data.assistlist[i].openid = list[i].openId;
            this.data.assistlist[i].friendopenid = list[i].friendOpenId;
            this.data.assistlist[i].avatarUrl = list[i].avatarUrl == "" ? app.CDN_URL + "frienddefault.png" : list[i].avatarUrl
          }

        }
        this.data.assistflag = true;
        this.data.assistcount = list.length;
        this.setData({
          assistlist: this.data.assistlist,
          assistflag: this.data.assistflag,
          assistcount: this.data.assistcount
        })
      } else {
        this.data.assistflag = false
        this.setData({
          assistlist: this.data.assistlist,
          assistflag: this.data.assistflag,
        })
      }

    })
    drawService.getLuckyDrawHead(res => {
      var head = res.data.head;
      if (head) {
        drawUtil.getRandomArrayElementsHead(head, 32, res => {
          this.setData({
            drawhead: res
          })
        })
      }
    })
  },
  toAdvise: function () {
    wx.navigateTo({
      url: '/pages/advise/advise',
    })
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
    app.getUserInfo(res => {
      drawService.getDrawGet(res => {
        this.setData({
          shuijing: res.data.data.idealMoney,
          money: Number(res.data.data.money).toFixed(3)
        })
      })
    })
  },

  hideModal:function(){
    this.setData({
      showModal:false
    })
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
  onShareAppMessage: function (msg) {
    var that = this;
    var path = "/pages/index/index";
    var title = "";
    if (msg.from === 'button') {
      path = "/pages/assist/assist?openid=" + app.globalData.userInfo.openid + "&nickname=" + app.globalData.userInfo.nickname;
      title = app.globalData.userInfo.nickname + "@我，还差你一个助攻，我就能领到红包了";
    }
    return {
      title: title,
      path: path,
      imageUrl: app.CDN_URL + 'share_tran.png',
    }

  }

})