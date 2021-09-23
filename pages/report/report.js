// pages/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  liverlogin:function(e){
    wx.getStorage({
      key:'sessionuser',
      success:function (res) {
        console.log('s:' + res.data)
        wx.navigateTo({
          url: "../report_epiliver/report_epiliver"
        })
      },
      fail:function(res){
        wx.navigateTo({
          url: "../user/login"
        })
      }
    })
  },
  epilogin:function(e){
    wx.getStorage({
      key:'sessionuser',
      success:function (res) {
        console.log('s:' + res.data)
        wx.navigateTo({
          url: "../report_epiage/report_epiage"
        })
      },
      fail:function(res){
        wx.navigateTo({
          url: "../user/login"
        })
      }
    })   
  },
  uteruslogin:function(e){
    wx.getStorage({
      key:'sessionuser',
      success:function (res) {
        console.log('s:' + res.data)
        wx.navigateTo({
          url: "../report_epihpv/report_epihpv"
        })
      },
      fail:function(res){
        wx.navigateTo({
          url: "../user/login"
        })
      }
    })   
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