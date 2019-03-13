// pages/advise/advise.js
const app = getApp();
const adviseServer = require("../../services/AdviseServer.js");
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // saveCourseBg: app.CDN_URL + "advisesave.png",
    saveCourseBg: app.CDN_URL + "ZT.png",
  },
  formSubmit:function(e){
    if ( util.isEmpty(e.detail.value.wxid)) {
      e.detail.value.wxid="未填联系方式"
    }
    if (util.isEmpty(e.detail.value.text)){
      wx.showModal({
        title: '提示',
        content: '建议反馈不能为空',
        showCancel:false
      })
      return;
    }
    adviseServer.sendAdvise(e.detail.value,res=>{
     if(res.data!="error"){
       wx.showToast({
         title: '建议反馈成功',
         icon: 'success',
         duration: 2000
       })
     }else{
       wx.showToast({
         title: '建议反馈失败',
         image:"../../images/fail.png",
         duration: 2000
       })
     }
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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