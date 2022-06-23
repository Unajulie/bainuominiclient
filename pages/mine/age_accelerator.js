//请在下方的滑块上选择您的实际年龄，计算您所在年龄组的平均表观遗传年龄(EpiAge)
// M1：实际年龄 M2：生物学年龄
//预期生物学年龄 0.9044*M1+ 8.9657
// 请在下方的滑块上选择你的表观遗传年龄(EpiAge)结果，与与你有相同表观遗传年龄结果的人的平均年龄进行比较。
// 预期实际年龄 (M2-8.9657)/0.9044
// 年龄加速器 M2-(0.9044*M1+8.9657)
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
                epiageaccelerateval: (oThis.data.inpepiage - (0.9044 * oThis.data.inpchroage + 8.9657)).toFixed(2)
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
                epiageaccelerateval: (oThis.data.inpepiage - (0.9044 * oThis.data.inpchroage + 8.9657)).toFixed(2)
            })
        }
        console.info(oThis.data.epiageaccelerateval)
    },

})