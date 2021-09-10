Page({
  /**
   * 页面的初始数据
   */
  data: {
    sampleid: "",
    reportUrl: null,
    reportShow: false
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

//获取到hpv报告页面输入的值，查询mongodb数据库，并返回状态
inputVal: function (e) {
    let sampleid = e.detail.value
    console.info(sampleid)
    this.setData({
      sampleid: sampleid
    })

  },
  //  
  checkLiverReport: function () {
    var that = this
    wx.request({
      url: "https://bainuo.beijingepidial.com/admin/epiliver/checkliverval",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {"sampleid":that.data.sampleid},
      // data: {"sampleid": 1121032800079},
      complete: function (res) {
        console.info("++++++++++++++++++++++")
        console.info(res.data)
if(!res.data){
  wx.showModal({
    title: '提示',
    content:"请输入正确的条码"
  })
}else{
       if(res.data.pdf){
        wx.navigateTo({url: '../pdf/epiliverpdf?pdf=' + res.data.pdf})
       }else{
         wx.showModal({
           title: '提示',
           content:"报告还未生成，请耐心等待！"
         })
       }
      }
      }
    })
    // var params = options.params;
    // var id = options.pgxTestBasicId;
    // that.setData({
    //   reportUrl: params + '?pgxTestBasicId=' + id
    // })
    // that.setData({
    //   reportShow: false
    // })
   

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '报告加载中',
    // })
   
  },
  onHide:function(){
  
  }
})
