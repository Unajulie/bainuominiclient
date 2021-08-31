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
        console.log(res.result)
        that.setData({
          barcode: res.result
        });
      }
    })
  },

//获取到hpv报告页面输入的值，查询mysql数据库，并返回状态
inputVal: function (e) {
  let oThis = this
    let barcode = e.detail.value.replace(/\s+/g, '')
    console.info(barcode)
    oThis.setData({
      barcode: barcode
    })

  },
  //  
  checkHpvReport: function () {
    //通过barcode查询宫颈癌报告,1先获取输入的值，返回给后台数据库去查询是否存在这个barcode,如果有数据有返回，没有数据就提示错误信息或输入正确的barcode.
    let oThis = this
    wx.request({
      url: "https://bainuo.beijingepidial.com/admin/epihpv/chechpval",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {"barcode":this.data.barcode},
      // data: {"barcode": 1121032800079},
      complete: function (res) {
        console.info("++++++++++++++++++++++")
        console.info(res.data.Barcode)
       if(res.data.Barcode){
        wx.navigateTo({url: '../epihpvreport/epihpvreport?barcode=' + res.data.Barcode})
       }else{
         wx.showModal({
           title: '提示',
           content:"请输入正确的条码"
         })
       }
      }
    })
    

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onReady: function () {


  }
})