Page({
    /**
     * 页面的初始数据
     */
    data: {
      firstJump:undefined
    },
    checkepiageReport: function (e) {
      var that = this;
      let vdata={}
    vdata.sampleid=e.currentTarget.dataset.sampleid
    wx.request({
      url: "https://bainuo.beijingepidial.com/client/epiage/checkpdf",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: vdata,
      // data: {"sampleid": 1121032800079},
      complete: function (res) {
        if (that.data.firstJump) {
          wx.navigateTo({
            url:  "../report_epiage/report_epistatus?sampleid=" + e.currentTarget.dataset.sampleid+ "&pdf=" + res.data.pdf,
            success: function (res) {
              that.setData({ firstJump: false });
             }
          })
        }
       
      }
    })
      //   console.info(e)
      // wx.navigateTo({
      //   url:  "../report_epiage/report_epistatus?sampleid=" + e.currentTarget.dataset.sampleid+"&username="+e.currentTarget.dataset.username
      // })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let oThis = this
      wx.getStorage({
        key: 'sessionuser',
        success: function (res) {
          wx.request({
            url: "https://bainuo.beijingepidial.com/client/epiage/barcodes",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
              "tel": res.data.phone
            },
            complete: function (res) {
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
    },
    onShow: function () {
      this.setData({ firstJump:true})
      }
  })
