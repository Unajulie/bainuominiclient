// pages/intro/intro-epiage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  tobuy:function(e){
    wx.request({
      url: "https://bainuo.beijingepidial.com/client/goods/getunitprice",
      header: {
          "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      // data: formdata,
      success: function (res) {
       console.info(res)
      },
      fail:function (res) {
          console.log(res)
      },
      complete:function (res) {
          console.log(res)
      }
  })
     wx.navigateTo({url: '../intro/epiage-buy' })
  },
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