// pages/report_epiliver/userform.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [{
            sex: '男',
            value: 'male'
        }, {
            sex: '女',
            value: 'female'
        }]

    },

    //绑定输入的姓名 
    bininput_name: function (e) {
        this.setData({
            username: e.detail.value
        })
        console.info(e.detail.value)
    },
    //绑定选择的性别 
    bininput_sex: function (e) {
        this.setData({
            sex: e.detail.value
        })
        console.info(e.detail.value)
    },
    //绑定输入的身份证 
    bininput_identity: function (e) {
        this.setData({
            identity: e.detail.value
        })
        console.info(e.detail.value)
    },
    //绑定输入的电话 
    bininput_mobile: function (e) {
        this.setData({
            mobile: e.detail.value
        })
        console.info(e.detail.value)
    },
    //绑定输入的样本编码
    bininput_sampleid: function (e) {
        this.setData({identity: e.detail.value})
        console.info(e.detail.value)
    },
    btnckreport:function(e){
        let data={}
        data.idCard=this.data.identity
        data.sex=0
        data.tel=this.data.phone
        data.sampleid=this.data.sampleid
        data.username=this.data.username
        data.created=new Date().toLocaleDateString()
        console.info(data)
        wx.request({
            url: "https://bainuo.beijingepidial.com/client/liver/saveuser",
            header: {"Content-Type": "application/x-www-form-urlencoded"},
            method: "POST",
            data: data,
            // data: {"sampleid": 1121032800079},
            complete: function (res) {
              console.info(res.data)
              //如果是空字符串
            //   if(res.data.status=="success"){wx.showModal({title: '提示',content:"库存查无该条码，请联系客服"})}
            //   else{
            //     wx.navigateTo({url: 'userform?sampleid='+oThis.data.sampleid})
            //   }
            },
          fail:function(res){
          }})
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let sampleid=options.sampleid
        let oThis = this
        wx.getStorage({
            key: 'sessionuser',
            success: function (res) {
                oThis.setData({phone: res.data.phone,sampleid:sampleid})
                let data={}
                data.sampleid=sampleid
                data.tel=res.data.phone
                console.info("xxx")
                wx.request({
                    url: "https://bainuo.beijingepidial.com/client/liver/finduser",
                    header: {"Content-Type": "application/x-www-form-urlencoded"},
                    method: "POST",
                    data: data,
                    // data: {"sampleid": 1121032800079},
                    complete: function (res) {
                      oThis.setData({identity:res.data.idCard,username:res.data.username})  
                      console.info(res.data)
                      //如果是空字符串
                    //   if(res.data.status=="success"){wx.showModal({title: '提示',content:"库存查无该条码，请联系客服"})}
                    //   else{
                    //     wx.navigateTo({url: 'userform?sampleid='+oThis.data.sampleid})
                    //   }
                    },
                  fail:function(res){
                  }})
                
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