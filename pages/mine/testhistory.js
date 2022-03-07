// pages/report_generic/applylist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    // 泛癌客户申请检测
    Mergeinfo: function (e) {
      wx.getStorage({
        key:'sessionuser',
        success:function (res) {
          wx.navigateTo({
            url: "../report_generic/staffmergeinfo"
          })
        },
      })
    },
    // 泛癌客户点击已填写过的信息出现二维码
    getQrinfo: function (e) {
      var that = this
      wx.getStorage({
        key: 'sessionuser',
        success: function (res) {
          wx.request({
            url: "https://bainuo.beijingepidial.com/client/generic/checkqrinfo",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
              "qrid": e.currentTarget.dataset.qrid,
            },
            complete: function (res) {
              console.info("返回的信息")
              console.info(res)
              that.setData({
                  qrid:res.data.id,
                  username:e.currentTarget.dataset.username
              })
              let url = '../report_generic/applyqr?qrid='+ res.data._id + "&username=" + that.data.username
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
             username:res.data.username
           })
            console.info(data)
            wx.request({
              url: "https://bainuo.beijingepidial.com/client/generic/applylist",
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
        
          }
        })
  },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    }
   

})