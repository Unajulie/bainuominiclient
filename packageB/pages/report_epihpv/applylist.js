// pages/report_generic/applylist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    // 肝癌客户申请检测
    applyTest: function (e) {
      wx.getStorage({
        key:'sessionuser',
        success:function (res) {
          wx.navigateTo({
            url: "../report_epihpv/userform"
          })
        },
      })
    },
    // 肝癌客户点击已填写过的信息出现二维码
    getQrinfo: function (e) {
      var that = this
      wx.getStorage({
        key: 'sessionuser',
        success: function (res) {
          wx.request({
            url: "https://bainuo.beijingepidial.com/client/hpv/checkqrinfo",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
              "qrid": e.currentTarget.dataset.qrid,
            },
            complete: function (res) {
              that.setData({
                  qrid:res.data.id,
                  username:e.currentTarget.dataset.username
              })
              let url = '../report_epihpv/applyqr?qrid='+ res.data._id + "&username=" + that.data.username
              console.info(url)
              wx.navigateTo({
                  url: url
              })
          }
          })
        },
        fail: function () {
          wx.navigateTo({
            url: '../user/login',
          })
        }
      })
  
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    let oThis = this
      wx.getStorage({
          key: 'sessionuser',
          success: function (res) {
            console.info(res)
            let data = {}
            data.phone = res.data.phone
           oThis.setData({
             phone:res.data.phone,
             username:res.data.username,
             mark:res.data.mark
           })
            console.info(data)
            wx.request({
              url: "https://bainuo.beijingepidial.com/client/hpv/applylist",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              data: data,
              complete: function (res) {
                console.info("------")
                console.info(res)
                oThis.setData({
                  applylist:res.data,
                })
                wx.hideLoading()
              }
            })
          },
          fail: function (res) {
        console.info(res)
          }
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