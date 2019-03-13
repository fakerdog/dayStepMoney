// pages/giveaway/giveaway.js
const runService = require("../../services/runService.js");
const utils = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function (options) {
    this.data.friendopenid = options.openid;
    this.setData({
      friendnickname: options.nickname == "" ? "好友" : options.nickname
    })
  },
  toindex:function(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  onShow: function () {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    app.getUserInfo(res => {
      if (this.data.friendopenid == app.globalData.userInfo.openid){
        wx.redirectTo({
          url: '/pages/index/index',
        })
      }
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

                var money = Number(parseFloat(moneyTot) / Number(app.globalData.sysSet.proportion)).toFixed(2).toString();
                money = Number(money.substring(0, money.lastIndexOf('.') + 2));
                this.setData({
                  inputvalue: mystep,
                  mystep: mystep,
                  ideamoneyTot: moneyTot,
                  money: money
                });
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
    });
  },

  idealmoneyInput: function (e) {
    this.setData({
      inputvalue: e.detail.value
    });
  },

  togiveaway: function (e) {
    this.setData({
      btnDisabled: 'disabled'
    });
    var inputvalue = Number(this.data.inputvalue);
    if (typeof (this.data.inputvalue) == 'undefined') {
      wx.showModal({
        title: '提示',
        content: '请输入步数',
        showCancel: false
      })
      this.setData({
        btnDisabled: ''
      });
      return;
    } else if (utils.isEmpty(inputvalue.toString())) {
      wx.showModal({
        title: '提示',
        content: '请输入步数',
        showCancel: false
      })
      this.setData({
        btnDisabled: ''
      });
      return;
    } else if (inputvalue > Number(this.data.mystep)) {
      wx.showModal({
        title: '提示',
        content: '步数不足',
        showCancel: false
      })
      this.setData({
        btnDisabled: ''
      });
      return;
    } else if (inputvalue < 100) {
      wx.showModal({
        title: '提示',
        content: '至少捐赠100步',
        showCancel: false
      })
      this.setData({
        btnDisabled: ''
      });
      return;
    } else {

      //符合捐赠条件
      runService.giveawaymystep(inputvalue,this.data.friendopenid, res => {
        var errorcode = res.data.data;
        if (errorcode == 1) {
          this.setData({
            mystep: Number(this.data.mystep) - inputvalue
          })

          this.setData({
            inputvalue: "",
            btnDisabled: ''
          })

          wx.showModal({
            title: '提示',
            content: '捐赠成功',
            showCancel: false
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '系统繁忙，捐赠失败',
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})