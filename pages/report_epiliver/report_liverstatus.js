// pages/report_epiage/report_epistatus.js
Page({

      /**
       * 页面的初始数据
       */
      data: {

      },
      showpdf: function (e) {
        let oThis = this
        wx.getStorage({
              key: 'sessionuser',
              success: function (res) {
                let data = {}
                data.phone = e.currentTarget.dataset.phone ? e.currentTarget.dataset.phone : res.data.phone
                data.sampleid = e.currentTarget.dataset.barcode ? e.currentTarget.dataset.barcode : oThis.data.sampleid
                console.info(data)
                wx.showLoading({
                  title: '加载中',
                  duration:10000,
                  mask: true
                })
                wx.request({
                      url: "https://bainuo.beijingepidial.com/client/liver/ckstatus",
                      header: { "Content-Type": "application/x-www-form-urlencoded"},
                      method: "POST",
                      data: data,
                      // data: {"sampleid": 1121032800079},
                      complete: function (res) {
                        wx.showLoading({
                          title: '加载中',
                          duration:10000,
                          mask: true
                        })
                        if (res.data.pdf) {
                           wx.downloadFile({
                          url: "https://bainuo.beijingepidial.com/public/pdffile/" +res.data.pdf,
                          header: {},
                          success: function (res) {
                            wx.showLoading({
                              title: '加载中',
                              duration:10000,
                              mask: true
                            })
                            var filePath = res.tempFilePath;
                            console.log(res);
                            if (res.statusCode == 404) {
                              wx.showToast({
                                title: '请输入正确的二维码！',
                                icon: 'success',
                                duration: 2000
                              })
                            } else {
                              wx.openDocument({
                                filePath: filePath,
                                fileType: 'pdf',
                                success: function (res) {
                                  wx.hideLoading()
                                  console.log(res);
                                  wx.showToast({
                                    title: "打开成功",
                                    icon: 'success',
                                    duration: 2000
                                  })
                                },
                                fail: function (res) {
                                  wx.hideLoading()
                                  wx.showToast({
                                    title: "打开失败",
                                    icon: 'success',
                                    duration: 2000
                                  })
                                },
                                complete: function (res) {

                                  console.log(res);
                                }
                              })
                            }
                          },
                          fail: function (res) {
                            console.info(res)
                            console.log('文件下载失败');
                          },
                          complete: function (res) {},

                        })
                     
                    }
                    else {
                      wx.hideLoading()
                      wx.showModal({
                        title: '提示',
                        content: "请耐心等待实验室人员生成PDF报告"
                      })
                    }


                  },
                  fail: function (res) {}
              })
          },
          fail: function (e) {
            wx.navigateTo({
              url: '../epiage/login'
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
        //console.info(options.status )
        let data = {}
        data.sampleid = options.sampleid
        data.phone = options.phone
        console.info(data)
        wx.request({
          url: "https://bainuo.beijingepidial.com/client/liver/ckstatus",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: data,
          // data: {"sampleid": 1121032800079},
          complete: function (res) {
            oThis.setData({
              status: res.data.status,
              sampleid: res.data.sampleid
            })
          }
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../epiage/login',
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