// pages/report_epiliver/userform.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [{sex:'男',value:'male'},{sex:'女',value:'female'}]
    
    },

//绑定输入的姓名 
bininput_name: function (e) {  this.setData({   idname: e.detail.value  }) 
console.info(e.detail.value )
},
//绑定选择的性别 
bininput_sex: function (e) {  this.setData({   sex: e.detail  }) 
console.info(e.detail.value )
}, 
//绑定输入的身份证 
bininput_identity: function (e) {  this.setData({   identity: e.detail.value  }) 
console.info(e.detail.value )
}, 
//绑定输入的电话 
bininput_mobile: function (e) {  this.setData({   mobile: e.detail.value  }) 
console.info(e.detail.value )
},
//绑定输入的样本编码
bininput_sampleid: function (e) {  this.setData({   identity: e.detail.value  }) 
console.info(e.detail.value )
}, 
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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