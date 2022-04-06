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
                    url: "../report_epihpv/staffmergeinfo"
                })
            },
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
                let startime = that.data.startdate
                let totime = that.data.tilldate
                console.info(startime)
                console.info(totime)
                if (!totime||!startime|| totime < startime) {
                    wx.showToast({
                        title: '时间段无效',
                        icon: 'error',
                        duration: 2000
                    })
                    this.setData({
                        startdate: "",
                        tilldate: ""
                    })
                } else {
                    wx.getStorage({
                        key: 'sessionuser',
                        success: function (sessionuser) {
                            let data = {}
                            data.startdate = that.data.startdate
                            data.tilldate = that.data.tilldate
                            data.stafftel=sessionuser.data.phone
                            wx.request({
                                url: "https://bainuo.beijingepidial.com/client/hpv/mergedlist/search",
                                header: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                method: "POST",
                                data: data,
                                complete: function (res) {
                                    console.info(res)
                                    that.setData({
                                        searchedlist:res.data.rows
                                    })
                                }
                            })
                        },
                        fail:function(res){
                            wx.navigateTo({
                              url: "../user/stafflogin"
                            })
                          }
                    })
                }
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
                let url = '../report_epihpv/staffmergeinfo?sampleid=' + res.data.sampleid + "&username=" + res.data.username+"&disable="+res.data.disable
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