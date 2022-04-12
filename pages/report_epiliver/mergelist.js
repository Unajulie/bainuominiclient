Page({

    /**
     * 页面的初始数据
     */
    data: {
        endate: new Date().toLocaleDateString().replace(new RegExp('/', 'g'), '-')
    },
    // 肝癌客户申请检测
    Mergeinfo: function (e) {
        wx.getStorage({
            key: 'sessionuser',
            success: function (res) {
                wx.navigateTo({
                    url: "../report_epiliver/staffmergeinfo"
                })
            },
        })
    },
    // 获取输入的姓名
    searchName: function (e) {
        console.info(e)
        this.setData({
            username: e.detail.value
        })
    },
    // 获取输入的样本编号
    searchSampleid: function (e) {
        console.info(e)
        this.setData({
            sampleid: e.detail.value
        })
    },
    // 选择开始时间
    selStartdate: function (e) {
        this.setData({
            startdate: e.detail.value
        })
    },
    // 选择结束时间
    selTilldate: function (e) {
        this.setData({
            tilldate: e.detail.value
        })
    },
    search: function (e) {
        let that = this
        let username = that.data.username
        let sampleid = that.data.sampleid
        let startime = that.data.startdate
        let totime = that.data.tilldate
        console.info(username)
        console.info(sampleid)
        if (username || sampleid || startime || totime) {
            wx.getStorage({
                key: 'sessionuser',
                success: function (sessionuser) {
                    let data = {}
                    data.stafftel = sessionuser.data.phone
                    data.startdate = that.data.startdate ? that.data.startdate : ''
                    data.tilldate = that.data.tilldate ? that.data.tilldate : ''
                    data.username = that.data.username ? that.data.username : ''
                    data.sampleid = that.data.sampleid ? that.data.sampleid : ''
                    wx.request({
                        url: "https://bainuo.beijingepidial.com/client/liver/mergedlist/search",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        data: data,
                        complete: function (res) {
                            console.info(res)
                            if (res.data.total == 0) {
                                wx.showToast({
                                    title: '无符合条件结果',
                                    icon: 'error',
                                    duration: 2000
                                })
                                that.setData({
                                    searchedlist: res.data.rows
                                })
                            } else {
                                that.setData({
                                    searchedlist: res.data.rows
                                })
                            }
                        }
                    })
                },
                fail: function (res) {
                    wx.navigateTo({
                        url: "../user/stafflogin"
                    })
                }
            })

        }
    },
    // 工作人员肝癌已绑定列表查看已绑定信息
    getMergedinfo: function (e) {
        let that = this
        console.info(e)
        let data = {}
        data.sampleid = e.currentTarget.dataset.sampleid
        data.username = e.currentTarget.dataset.username
        wx.request({
            url: "https://bainuo.beijingepidial.com/client/liver/mergedinfo",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: data,
            complete: function (res) {
                let url = '../report_epiliver/staffmergeinfo?sampleid=' + res.data.sampleid + "&username=" + res.data.username + "&disable=" + res.data.disable
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
                    url: "https://bainuo.beijingepidial.com/client/liver/mergedlist",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    data: data,
                    complete: function (res) {
                        console.info(res)
                        oThis.setData({
                            mergedlist: res.data.rows,
                        })

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