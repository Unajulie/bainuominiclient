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
  checkLiverReport: function (e) {
    let oThat=this
    //console.info("https://bainuo.beijingepidial.com/public/pdffile/"+this.data.sampleid+".pdf")
    //wx.showToast({title: '加载中', icon: 'loading', duration: 10000});
    let oThis=this
    wx.getStorage({
      key:'sessionuser',
      success:function (res) {
        console.log('s:' + res.data)
        let phone =e.currentTarget.dataset.phone?e.currentTarget.dataset.phone:res.data.phone
        wx.request({
          url: "https://bainuo.beijingepidial.com/client/liver/uploadbarcode",
          header: {"Content-Type": "application/x-www-form-urlencoded"},
          method: "POST",
          data: {"sampleid":oThis.data.sampleid,"phone":phone},
          // data: {"sampleid": 1121032800079},
          complete: function (res) {
            console.info("xxxxx-->"+res.data)
            //如果是空字符串
            if(res.data==""){wx.showModal({title: '提示',content:"库存查无该条码，请联系客服"})}
            else if(res.data.status=="user_empty"){
              wx.navigateTo({
                url: 'userform',
              })
            }
            else{
              let url="../report_epiage/report_epistatus?status="+res.data.status+"&barcode="+barcode+"&phone="+phone
              wx.navigateTo({ url:url })
            }
          },
        fail:function(res){
        }})
      }
    }) 




    // wx.downloadFile({
    //   url:"https://bainuo.beijingepidial.com/public/pdffile/"+this.data.sampleid+".pdf",  
    //   header: {},
    //   success: function(res) {
    //     var filePath = res.tempFilePath;
    //     console.log(res);
    //     if (res.statusCode == 404) {
    //       wx.showToast({title: '请输入正确的二维码！',icon: 'success',duration: 2000})
    //     } else {
    //       wx.openDocument({
    //         filePath: filePath,
    //         fileType: 'pdf',
    //         success: function(res) {
    //           console.log(res);
    //           wx.showToast({title: "打开成功",icon: 'success',duration: 2000})
    //         },
    //         fail: function(res) {
    //           wx.showToast({title: "打开失败",icon: 'success',duration: 2000})
    //         },   
    //         complete: function(res) {
              
    //           console.log(res);
    //         }
    //         })
    //       }
    //     },
    //     fail: function(res) { 
    //       console.info(res)
    //       console.log('文件下载失败');
    //     },
    //     complete: function(res) {},
        
    //     })
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
