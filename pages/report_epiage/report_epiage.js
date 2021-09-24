// pages/report_epihpv/report_epihpv.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sampleid: "",
  },

  scanCode: function () {
    var that = this;
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        that.setData({
          sampleid: res.result
        });
      }
    })
  },

  //获取到hpv报告页面输入的值，查询mysql数据库，并返回状态
  inputVal: function (e) {
    let sampleid = e.detail.value
    console.info(sampleid)
    this.setData({
      sampleid: sampleid
    })

  },
  //  
  checkEpiageReport: function (e) {
    wx.showLoading({
      title: '加载中',
      duration: 10000,
      mask: true
    })
    console.info("simpleid:" + e.currentTarget.dataset.simpleid)
    let barcode = e.currentTarget.dataset.simpleid ? e.currentTarget.dataset.simpleid : this.data.sampleid
    var that = this
    console.info(this.data.sampleid + "-----")

    wx.getStorage({
      key: 'sessionuser',
      success: function (res) {
        console.log('s:' + res.data)
        let phone = e.currentTarget.dataset.phone ? e.currentTarget.dataset.phone : res.data.phone
        wx.request({
          url: "https://bainuo.beijingepidial.com/client/epiage/uploadbarcode",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: {
            "barcode": barcode,
            "phone": phone
          },
          // data: {"sampleid": 1121032800079},
          complete: function (res) {
            console.info("xxxxx-->" + res.data)
            wx.hideLoading()
            //如果是空字符串
            if (res.data == "") {
              wx.showModal({
                title: '提示',
                content: "库存查无该条码，请联系客服"
              })
            } else {
              // let url = "../report_epiage/report_epistatus?status=" + res.data.status + "&barcode=" + barcode + "&phone=" + phone
              let url = "../report_epiage/userform?status=" + res.data.status + "&sampleid=" + barcode + "&phone=" + phone
              wx.navigateTo({
                url: url
              })
            }
          },
          fail: function (res) {

          }
        })
      },fail:function(){
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
        console.log('s:' + res.data)
        wx.request({
          url: "https://bainuo.beijingepidial.com/client/epiage/barcodes",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: {
            "phone": res.data.phone
          },
          // data: {"sampleid": 1121032800079},
          complete: function (res) {
            console.info("hello")
            console.info(res.data)
            oThis.setData({
              barcodebox: res.data
            })
          }
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../user/login',
        })
      }
    })
  }
})