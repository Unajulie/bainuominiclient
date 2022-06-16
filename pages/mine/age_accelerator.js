//请在下方的滑块上选择您的实际年龄，计算您所在年龄组的平均表观遗传年龄(EpiAge)
//预期生物学年龄 0.9044*M1+ 8.9657
// 请在下方的滑块上选择你的表观遗传年龄(EpiAge)结果，与与你有相同表观遗传年龄结果的人的平均年龄进行比较。
// 预期实际年龄 (M2-8.9657)/0.9044
// 年龄加速器(this.state.biological - (0.902 * this.state.naturally + 4.564)).toFixed(2)
Page({
    data: {
        pageData: {},

    },
    // 计算预期生物学年龄
    expepiage: function (e) {
        let oThis = this
        oThis.setData({
            inpchroage: e.detail.value,
            expepiageval: (0.9044 * e.detail.value + 8.9657).toFixed(1)

        })
        if (oThis.data.inpchroage > 0 && oThis.data.inpepiage > 0) {
            oThis.setData({
                epiageaccelerateval: (oThis.data.inpepiage - (0.902 * oThis.data.inpchroage + 4.564)).toFixed(2)
            })
        }
    },
    // 计算预期实际年龄
    expchroage: function (e) {
        let oThis = this
        oThis.setData({
            inpepiage: e.detail.value,
            expchroageval: ((e.detail.value - 8.9657) / 0.9044).toFixed(1),
        })
        if (oThis.data.inpchroage > 0 && oThis.data.inpepiage > 0) {
            oThis.setData({
                epiageaccelerateval: (oThis.data.inpepiage - (0.902 * oThis.data.inpchroage + 4.564)).toFixed(2)
            })
        }
        console.info(oThis.data.epiageaccelerateval)
    },
    // 计算生物学年龄加速器
    epiageaccelerate: function (e) {
        let oThis = this
        if (oThis.data.inpchroage > 0 && oThis.data.inpepiage > 0) {
            oThis.setData({
                epiageaccelerateval: oThis.data.inpepiage - (0.902 * oThis.data.inpchroage + 4.564).toFixed(2)
            })
        }
    },
    onLoad: function () {
        let oThis = this
        if (oThis.data.inpchroage > 0 && oThis.data.inpepiage > 0) {
            oThis.setData({
                epiageaccelerateval: oThis.data.inpepiage - (0.902 * oThis.data.inpchroage + 4.564).toFixed(2)
            })
        }
        console.info(oThis.data.epiageaccelerateval)
    }
    // onLoad:function(options){
    //     let oThis = this
    //     for(var i = 1; i < 5; ++i) {
    //         (function (index) {
    //          oThis.pageData['slider' + index + 'change'] = function(e) {
    //             console.log('slider' + index+ '发生 change 事件，携带值为', e.detail.value)
    //           }
    //         })(i);
    //       // 年龄加速器计算  (this.state.biological - (0.902 * this.state.naturally + 4.564)).toFixed(2)
    //       }
    // }
})