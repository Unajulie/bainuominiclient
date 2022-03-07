Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    // 肝癌客户申请检测
    Mergeinfo: function (e) {
        wx.getStorage({
            key: 'sessionuser',
            success: function (res) {
                wx.navigateTo({
                    url: "../report_epihpv/staffmergeinfo"
                })
            },
        })
    },
    // 工作人员肝癌已绑定列表查看已绑定信息
    getMergedinfo: function (e) {
        let that=this
        console.info(e)
        let data={}
        data.sampleid=e.currentTarget.dataset.sampleid
        data.username=e.currentTarget.dataset.username
        wx.request({
            url: "https://bainuo.beijingepidial.com/client/hpv/mergedinfo",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: data,
            complete: function (res) {
                let url = '../report_epihpv/staffmergeinfo?sampleid=' + res.data.sampleid + "&username=" + res.data.username
                console.info(url)
                wx.navigateTo({
                    url: url
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
                let data = {}
                data.stafftel = res.data.phone
                console.info(data)
                wx.request({
                    url: "https://bainuo.beijingepidial.com/client/hpv/mergedlist",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    data: data,
                    complete: function (res) {
                        oThis.setData({
                            mergedlist: res.data,
                        })
                        wx.hideLoading()
                    }
                })
            },
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    }


})