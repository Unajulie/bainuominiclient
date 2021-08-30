// pages/epihpvreport/epihpvreport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    report: {},
    inserval:{},
    hpvs:{},
    reportid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面的this才有setdata放法，微信的request不能直接用this。微信的this没有setdata方法。
    let oThis = this
    wx.request({
      url: "https://bainuo.beijingepidial.com/admin/epihpv/epihpvreport",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {"barcode": options.barcode},
      // data: {"barcode": 1121032800079},
      complete: function (res) {
        console.info("------------------")
        console.info(res.data)
        oThis.setData({
          report: res.data
        })
        //  这里的this指向的是wx.request方法，不是epihpvreport页面
        //由barcode查询到report数据库中的对应数据，再根据该条数据中的reportid查询result数据库
        //中的对应结果
      }
    })
    //向服务端请求实验室人员在后台报告页面输入的数据并返回来
    wx.request({
      url: "https://bainuo.beijingepidial.com/admin/epihpv/hpvinserval",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {"barcode": options.barcode},
      // data: {"barcode": 1121032800079},
      complete: function (res) {
        // console.info(res)
        oThis.setData({
          inserval: res.data[0]
        })
//这里接受到的数据表数据是在第一个数组里res.data[0]
      }
    })
    //先服务端请求数据库result表里一个barcode对应的各种hpv型的数据渲染到页面
    wx.request({
      url: "https://bainuo.beijingepidial.com/admin/epihpv/inserval",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {"barcode": options.barcode},
      // data: {"barcode": 1121032800079},
      complete: function (res) {
        console.info("*******************")
        console.info(res.data)
        oThis.setData({
          hpvs: res.data
        })
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