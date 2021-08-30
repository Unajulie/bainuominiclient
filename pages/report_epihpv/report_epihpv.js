// pages/report_epihpv/report_epihpv.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    barcode: "",
  },
  scanCode: function () {
    var that = this;
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        that.setData({
          barcode: res.result
        });
      }
    })
  },

//获取到hpv报告页面输入的值，查询mysql数据库，并返回状态
inputVal: function (e) {
    let barcode = e.detail.value.replace(/\s+/g, '')
    console.info(barcode)
    this.setData({
      barcode: barcode
    })

  },
  //  
  checkHpvReport: function () {
    wx.navigateTo({
      url: '../epihpvreport/epihpvreport?barcode=' + this.data.barcode,
      success:function(res){
        console.info("success")
      },
      fail:function(){
        console.info("failed")
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})