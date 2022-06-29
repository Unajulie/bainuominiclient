// pages/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 泛癌点击注册查询条码
  genericlogin: function (e) {
    wx.getStorage({
      key: 'sessionuser',
      success: function (res) {
        console.log('s:' + res.data)
        wx.navigateTo({
          url: "../../packageA/pages/report_generic/report_generic"
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: "../user/login"
        })
      }
    })
  },
  // 肝癌点击查询注册条码
  liverlogin: function (e) {
    wx.getStorage({
      key: 'sessionuser',
      success: function (res) {
        console.log('s:' + res.data)
        wx.navigateTo({
          url: "../../packageA/pages/report_epiliver/report_epiliver"
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: "../user/login"
        })
      }
    })
  },
  // 宫颈癌点击查询注册条码
  hpvlogin: function (e) {
    wx.getStorage({
      key: 'sessionuser',
      success: function (res) {
        console.log('s:' + res.data)
        wx.navigateTo({
          url: "../../packageB/pages/report_epihpv/report_epihpv"
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: "../user/login"
        })
      }
    })
  },
    // 宫颈癌点击查询注册条码
    epiagelogin: function (e) {
      wx.getStorage({
        key: 'sessionuser',
        success: function (res) {
          console.log('s:' + res.data)
          wx.navigateTo({
            url: "../../packageC/pages/report_epiage/report_epiage"
          })
        },
        fail: function (res) {
          wx.navigateTo({
            url: "../user/login"
          })
        }
      })
    },
  onLoad: function (options) {
    let oThis = this
    wx.getStorage({
      key: 'sessionuser',
      success: function (res) {
        oThis.setData({
          username: res.data.username
        })
      },
    })
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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