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
  checkEpiageReport: function () {
    var that = this
    console.info(this.data.sampleid+"-----")
    wx.request({
      url: "https://bainuo.beijingepidial.com/admin/epiage/useruploadbarcode",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {"barcode":that.data.sampleid},
      // data: {"sampleid": 1121032800079},
      complete: function (res) {
        console.info("++++++++++++++++++++++")
        console.info(res.data)
        switch (res.data.status){
          case "INVALID":
            // wx.showModal({title: '提示',content:"库存查无该条码，请联系客服"})
            
            wx.navigateTo({
              url: '../report_epiage/report_epistatus?INVALID=res.data.status',
            })
            break;
          case "NO_STATUS":
            // wx.showModal({title: '提示',content:"该条码等待检测中"})
            wx.navigateTo({
              url: '../report_epiage/report_epistatus?NO_STATUS',
            })
            break;
          case "POST_FROM_LAB":
            // wx.showModal({title: '提示',content:"试剂盒已从实验室寄出"})
            wx.navigateTo({
              url: '../report_epiage/report_epistatus?POST_FROM_LAB',
            })
            break;
          case "PARCEL_RECEIVED":
            // wx.showModal({title: '提示',content:"实验室已收到您寄回的样本包裹"})
            wx.navigateTo({
              url: '../report_epiage/report_epistatus?PARCEL_RECEIVED',
            })
            break;
            case "REGISTERED_IN_LIMS":
              // wx.showModal({title: '提示',content:"样本已经等待检测"})
              wx.navigateTo({
                url: '../report_epiage/report_epistatus?REGISTERED_IN_LIMS',
              })
              break;
              case "WAITING_DNA_PREP":
                // wx.showModal({title: '提示',content:"等待DNA提取"})
                wx.navigateTo({
                  url: '../report_epiage/report_epistatus?WAITING_DNA_PREP',
                })
                break;
              case "SEQUENCING":
                // wx.showModal({title: '提示',content:"分析DNA序列中"})
                wx.navigateTo({
                  url: '../report_epiage/report_epistatus?SEQUENCING',
                })
                break;  
          case "Completed":
            /* if(res.data.pdf){
              wx.showToast({title: '加载中', icon: 'loading', duration: 10000});
              wx.navigateTo({url: '../pdf/epiagepdf?pdf=' + res.data.pdf})
            }else{
              wx.showModal({title: '提示',content:"报告已经生成,等待管理员生成PDF报告"})
            } */
            break;
        }
     

      // if(!res.data){
      //   wx.showModal({title: '提示',content:"请输入正确的条码"})
      // }else{
      //       if(res.data.pdf){
      //         //  console.info(res.data.pdf)
              
             
      //       }else{
      //         wx.showModal({
      //           title: '提示',
      //           content:"报告还未生成，请耐心等待！"
      //         })
      //       }
      //       }
            }
          })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})