// pages/exchangemoney/exchangemoney.js
const runService = require("../../services/runService.js");
const utils = require("../../utils/util.js");
const runUtil = require("../../utils/RunUtil.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  
  onShow: function (options) {
    this.refreshgiveawylist();
    runService.getExchangeData(res => {
      var data = res.data.data;
      
      var stepmoney = Number(parseFloat(data.stepsidealmoney) / Number(app.globalData.sysSet.proportion)).toFixed(2).toString();
      stepmoney = Number(stepmoney.substring(0, stepmoney.lastIndexOf('.') + 2));
      this.setData({
        idealmoney: data.idealmoney,
        exchangemoney: data.exchangemoney,
        exchangnumber: data.exchangnumber,
        stepsidealmoney: data.stepsidealmoney,
        stepmoney: stepmoney
      })
    });
  },
  unlockAll: function () {
    wx.navigateTo({
      url: '/pages/unlockedstep/unlockedstep',
    })
  },
  idealmoneyInput:function(e){
    this.setData({
      inputvalue: e.detail.value
    });
  },
  exchangemoney: function (e) {
    this.setData({
      btnDisabled: 'disabled'
    });
    var inputvalue = Number(this.data.inputvalue);
    if (typeof (this.data.inputvalue) == 'undefined') {
      wx.showModal({
        title: '提示',
        content: '请输入卡币数',
        showCancel: false
      })
      this.setData({
        btnDisabled: ''
      });
      return;
    } else if (utils.isEmpty(inputvalue.toString())) {
      wx.showModal({
        title: '提示',
        content: '请输入卡币数',
        showCancel: false
      })
      this.setData({
        btnDisabled: ''
      });
      return;
    } else if (inputvalue > Number(this.data.idealmoney)) {
      wx.showModal({
        title: '提示',
        content: '卡币不足',
        showCancel: false
      })
      this.setData({
        btnDisabled: ''
      });
      return;
    } else if (inputvalue < Number(this.data.exchangnumber)) {
      wx.showModal({
        title: '提示',
        content: '至少要兑换' + this.data.exchangnumber+"卡币",
        showCancel: false
      })
      this.setData({
        btnDisabled: ''
      });
      return;
    }else {

      //符合换钱条件
      runService.exchangemoney(inputvalue, res => {
        var errorcode = res.data.data;
        if (errorcode == 1) {
          //重新获取
          runService.getExchangeData(msg => {
            var data = msg.data.data;
            this.setData({
              idealmoney: data.idealmoney,
              exchangemoney: data.exchangemoney,
              exchangnumber: data.exchangnumber,
              stepsidealmoney: data.stepsidealmoney
            })
          });

          this.setData({
            inputvalue:"",
            btnDisabled: ''
          })

          wx.showModal({
            title: '提示',
            content: '换钱成功',
            showCancel: false
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '换钱请求提交失败',
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

},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (msg) {
    var that = this;

    //赠送分享
    if (msg.target.dataset.flagdesc == "giveaway") {
      var nickname = app.globalData.userInfo.nickname == "" ? "好友" : app.globalData.userInfo.nickname;
      return {
        title: nickname + '请求你赞助步数',
        path: '/pages/giveaway/giveaway?openid=' + app.globalData.userInfo.openid + '&nickname=' + app.globalData.userInfo.nickname,
        imageUrl: app.CDN_URL + 'share_tran.png'
      }
    }
  },
  
  toflush: function () {
    wx.showLoading({
      title: '数据刷新中',
    })
    this.refreshgiveawylist();
  },
  //初始化赠送记录
  refreshgiveawylist: function () {
    runService.getGiveAwayList(gres => {
      wx.hideLoading();
      //初始化赠送列表
      var giveawaylist = runUtil.getgiveawayList(app.globalData.sysSet.giveaway_count);
      var giveawaycountflag = false;
      var awaylist = gres.data.data.awaylist;
      var totawaystep = gres.data.data.totawaystep;
      var totawayidealmoney = gres.data.data.kabi;
      if (awaylist.length > 0) {
        giveawaycountflag = true
      }
      for (var i = 0; i < awaylist.length; i++) {
        awaylist[i].avatarUrl = awaylist[i].avatarUrl == "" ? app.CDN_URL + "frienddefault.png" : awaylist[i].avatarUrl;
        giveawaylist[i] = awaylist[i];
      }
      this.setData({
        giveawaycountflag: giveawaycountflag,
        giveawaylist: giveawaylist,
        totawaystep: totawaystep,
        totawayidealmoney: totawayidealmoney,
        giveaway_step: app.globalData.sysSet.giveaway_step
      })

    })
  },
  //获取别人的赠送步数
  exchangeGiveAway: function () {
    if (Number(this.data.totawaystep) >= Number(app.globalData.sysSet.giveaway_step)) {
      runService.exchangeGiveAway(res => {
        if (res.data.data == 1) {
          wx.showModal({
            title: '提示',
            content: '领取成功',
            showCancel: false
          })
          //重置赠送记录
          this.setData({
            shuijing: Number(this.data.shuijing) + Number(this.data.totawayidealmoney),//卡币增加
            giveawaycountflag: false,
            giveawaylist: runUtil.getgiveawayList(app.globalData.sysSet.giveaway_count),
            totawaystep: 0,
            totawayidealmoney: 0,
            giveaway_step: app.globalData.sysSet.giveaway_step,
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '领取失败，赠送只有当天才有效且' + "满" + app.globalData.sysSet.giveaway_step + "步才可兑换",
            showCancel: false
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: "满" + app.globalData.sysSet.giveaway_step + "步才可兑换",
        showCancel: false
      })
    }
  }
})