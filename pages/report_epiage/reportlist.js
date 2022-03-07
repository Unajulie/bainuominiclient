Page({
    /**
     * 页面的初始数据
     */
    data: {
    },
    checkepiageReport: function (e) {
        console.info(e)
      wx.navigateTo({
        url:  "../report_epiage/report_epistatus?sampleid=" + e.currentTarget.dataset.sampleid+"&username="+e.currentTarget.dataset.username
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
    }
  })