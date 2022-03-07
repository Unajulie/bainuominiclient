Page({

    /**
     * 页面的初始数据
     */
    data: {
        qrid: '',
        username: ''
    },

    // 用户编辑修改二维码信息
    checkqrinfo: function (e) {
        let oThis = this
        let data={}
        data.qrid=oThis.data.qrid,
        data.username= oThis.data.username
        wx.request({
            url: "https://bainuo.beijingepidial.com/client/liver/checkqrinfo",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: data,
            complete: function (res) {
                oThis.setData({
                    qrid: res.data._id,
                    phone:res.data.phone,
                    username: res.data.username,
                    sex: res.data.sex,
                    idCard:res.data.idCard,
                    colldate: res.data.colldate
                })
                wx.navigateTo({
                    url: "../report_epiliver/userform?qrid=" + res.data._id + "&phone="+res.data.phone+"&username=" + res.data.username+"&sex="+res.data.sex+"&idCard="+res.data.idCard+"&colldate="+res.data.colldate
                })
            }
        })
    },
    // 用户删除二维码信息
    deleteqrinfo: function (e) {
        let oThis = this
        console.info("点击了确认删除")
        console.info(oThis.data.qrid)
        wx.showModal({
            title: '信息确认',
            content: '是否确认删除此受检人信息记录？（删除后不会影响已给工作人员扫描绑定的检测码）',
            cancelText: "取消",
            success: function (res) {
                console.info(res)
                if (res.confirm) {
                    //用户点击了确认删除后执行删除操作
                    console.info(oThis.data.qrid)
                    let data={}
                    data.qrid=oThis.data.qrid,
                    data.username=oThis.data.username
                    wx.request({
                        url: "https://bainuo.beijingepidial.com/client/liver/deleteqrinfo",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        data:data,
                        complete: function (res) {
                            console.info("----++++++++--")
                            console.info(res)
                            if(res.data=="success"){
                                wx.showToast({
                                    title: '删除成功',
                                    icon: 'success',
                                    duration: 2000
                                },
                                wx.navigateTo({
                                    url:  '../report_epiliver/applylist'
                                })
                                )
                            }
                        }
                    })
                } else {
                    console.log('用户点击取消')
                }
            }
        })
       

    },
    onLoad: function (options) {
        let oThis = this
        wx.getStorage({
            key: 'sessionuser',
            success: function (res) {
                oThis.setData({
                    qrid: options.qrid,
                    username: options.username
                })
                let data = {}
                data.qrid = options.qrid
                data.username = options.username
                //   wx.request({
                //     url: "https://bainuo.beijingepidial.com/client/liver/qrinfo",
                //     header: {
                //       "Content-Type": "application/x-www-form-urlencoded"
                //     },
                //     method: "POST",
                //     data: data,
                //     complete: function (res) {
                //       console.info("------")
                //       console.info(res)
                //       oThis.setData({
                //         qrid:res.data.qrid,
                //         username: res.data.username,
                //         pdfurl:res.data.pdf?"https://bainuo.beijingepidial.com/public/pdffile/" +res.data.pdf:""
                //       })
                //       wx.hideLoading()
                //     }
                //   })
            },
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