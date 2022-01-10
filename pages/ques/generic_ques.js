// import request from '../../servers/request'
// import { showToast } from '../../utils/util'

Page({
    data: {
        questions: [],
        // 有几项问卷
        count: 0,
        // 问卷目前正在哪项以及输入的值是什么
        curId: 0,
        // 蓝色进度条宽度
        activeWidth: 0,
        // 向后端返回的数据
        survey_result: [],

    },
    onLoad() {

        // 问卷后端返回数组
        let questions = [
            // 尊敬的用户,非常感谢您对我们公司与产品的信任与支持。为了优化我们的报告系统，给您提供更满意的体验和更优质的服务，需要花费您几分钟的时间参与到此次产品的满意度调查。请如实填写，我们想了解您的看法与感受，并获得您的宝贵意见和建议，这对于我们精进产品和服务很重要！
            {
                question: '尊敬的用户,',
                type: 3
            },

            {
                question: '1.您的报告所显示的结果为？',
                type: 2,
                id: 0,
                inputval: "",
                options: [{
                        id: 0,
                        text: '低风险',
                        isselected: false
                    },
                    {
                        id: 1,
                        text: '中风险',
                        isselected: false
                    },
                    {
                        id: 2,
                        text: '高风险',
                        isselected: false
                    },
                ]
            },
            {
                question: '2.报告所显示的结果信息及解读，您是否能够理解？',
                type: 2,
                id: 1,
                inputval: "",
                options: [{
                        id: 3,
                        text: '能，表述清晰易懂',
                        isselected: false
                    },
                    {
                        id: 4,
                        text: '一般，大致可以理解，不影响获知结果',
                        isselected: false
                    },
                    {
                        id: 5,
                        text: '理解困难，需要进一步的内容讲解',
                        isselected: false
                    },
                ]
            },
            {
                question: '3一些专业词条的注解是否对于您的报告阅读提供了帮助?',
                type: 2,
                id: 2,
                inputval: "",
                options: [{
                        id:6,
                        text: '有，帮助我更理解了该产品的优势所在',
                        isselected: false
                    },
                    {
                        id: 7,
                        text: '一般，我不是很在意专业词条的注解',
                        isselected: false
                    },
                    {
                        id: 8,
                        text: '没有，不理解一些专业词条的注解',
                        isselected: false
                    },
                ]
            },
            {
                question: '4.健康生活指南及改善建议对您的身体健康有帮助吗？',
                type: 2,
                id: 3,
                inputval: "",
                options: [{
                        id: 9,
                        text: '有帮助，会根据指南调节生活作息',
                        isselected: false
                    },
                    {
                        id: 10,
                        text: '一般，只是了解了健康生活的相关信息',
                        isselected: false
                    },
                    {
                        id: 11,
                        text: '没有帮助，感觉健康生活指南的意义不大',
                        isselected: false
                    },
                ]
            },
            {
                question: '5.您最看重报告的哪些内容？(可多选)?',
                type: 4,
                id: 4,
                inputval: "",
                options: [{
                        id: 13,
                        text: '报告的获取途径及快捷程度',
                        isselected: false
                    },
                    {
                        id: 14,
                        text: '报告的结果解读是否详尽易懂 ',
                        isselected: false
                    },
                    {
                        id: 15,
                        text: '获取报告后的健康服务(如解答、宣讲)',
                        isselected: false
                    },
                    {
                        id: 16,
                        text: '报告是否会呈现有效改善措施',
                        isselected: false
                    },
                    {
                        id: 17,
                        text: '其他',
                        isselected: false
                    },
                ]
            },
            {
                question: '6.根据该报告，您觉得最需要改进的是哪些方面？(可多选)',
                type: 4,
                id: 5,
                inputval: "",
                options: [{
                        id: 18,
                        text: '报告结果及解读',
                        isselected: false
                    },
                    {
                        id: 19,
                        text: '报告获取途径及快捷程度 ',
                        isselected: false
                    },
                    {
                        id: 20,
                        text: '产品信息的宣传及相关问题解答',
                        isselected: false
                    },
                    {
                        id: 21,
                        text: '健康生活指南及建议',
                        isselected: false
                    },
                    {
                        id: 22,
                        text: '其他',
                        isselected: false
                    },
                ]
            },
            {
                question: '7.对于该产品的使用体验（仅包含获取报告，报告解读和售后服务部分）',
                type: 5,
                id: 6,
                inputval: "",
                options: [{
                        id: 23,
                        text: '满意',
                        isselected: false
                    },
                    {
                        id: 24,
                        text: '一般 ',
                        isselected: false
                    },
                    {
                        id: 25,
                        text: '不满意',
                        isselected: false
                    },
                ]
            },
            {
                question: '8.您是否愿意继续使用该产品作为预防癌症的途径？',
                type: 2,
                id: 7,
                inputval: "",
                options: [{
                        id: 26,
                        text: '会',
                        isselected: false
                    },
                    {
                        id: 27,
                        text: '不会 ',
                        isselected: false
                    },
                ]
            },
            //   {
            //     question: '10.请您给出宝贵的意见',
            //     type: 1,
            //     id: 10,
            //     placeholder: '请您给出宝贵的意见'
            //   },

        ]

        this.setData({
            questions: questions,
            count: questions.length,
            // 最终的问卷调查结果
            survey_result: Array(questions.length - 1).fill(0)
        })
    },
    //点击开始回答问卷
    handleStart() {
        const {
            curId
        } = this.data
        this.setData({
            curId: curId + 1,
        })
    },
    // 点击问卷某个选项进行下一步问卷
    handleNext() {
        const {
            curId,
            count,
            survey_result
        } = this.data
        if (survey_result[curId-1]==0) {
            wx.showToast({
                title: '请选择',
                icon: 'error',
                duration: 2000
            })
            return
        } 
        const step = 670 / count
        this.setData({
            curId: curId + 1,
            activeWidth: step * (curId + 1)
        })
    },
    // 上一步
    handleLast() {
        const {
            curId,
            count
        } = this.data

        if (this.data.curId !== 0) {
            this.setData({
                curId: curId - 1
            })
        }
        const step = 670 / count
        this.setData({
            activeWidth: step * (curId - 1)
        })

    },
    // 用户仅单选
    handleSelect(e) {
        let {
            id,
            question,
            index,
            value,
            options,
            text
        } = e.currentTarget.dataset
        console.info(options)
        this.data.survey_result.splice((index), 1, {
            id,
            question,
            value,
            text,
            options
        })
        this.data.survey_result[id].inputval=""
        let survey_result = this.data.survey_result
        this.setData({
            survey_result
        })

        console.log('survey_result:', this.data.survey_result)
    },
    //用户单选加填写
    handleSinSelect(e) {
        let {
            id,
            question,
            value,
            index,
            text,
            optionid,
            isselected
        } = e.currentTarget.dataset
        let options = this.data.survey_result[id].options ? this.data.survey_result[id].options : e.currentTarget.dataset.options
// console.info(options[optionid])
// console.info(isselected)
        //optionid为单个答案
      
        // console.info(options[optionid])
// console.info(isselected)
//控制单选框中只有最后一个选中的 才能被选中， 其他的都变成不选中状态

options[optionid].isselected = (isselected == false ? true : false)

// for(let i=0;i<options.length;i++){
//     // console.info(optionid)
// // console.info(options[i])
// if(options[optionid].isselected==false){
//     options[i].isselected==true
//     console.info(options[i])
// }
// }
        this.data.survey_result.splice(index, 1, {
            id,
            question,
            isselected,
            options,
            value,
            text
        })
        this.data.survey_result[id].inputval = this.data.questions[id].inputval
        // console.info(this.data.survey_result[id])
        let survey_result = this.data.survey_result
        this.setData({
            survey_result
        })
        // console.info(survey_result)
    },
    //单选填写
    handlesinInput(e) {
        let {
            id,
            index,
            question
        } = e.currentTarget.dataset
        let options = this.data.survey_result[id].options ? this.data.survey_result[id].options : e.currentTarget.dataset.options
        console.info(options)
        options.splice(options.length - 1, 1)
        options[options.length] = {
            id: options.length + 1,
            "text": "不满意:" + e.detail.value,
            isselected: true,
            extra: true
        }
        let inputval=this.data.survey_result[id].inputval?this.data.survey_result[id].inputval:e.detail.value
        this.data.survey_result.splice(index, 1, {
            id,
            question,
            options,
            inputval
        })
        let survey_result = this.data.survey_result
        this.setData({
            survey_result
        })
        console.info(survey_result)
    },
    // 用户多选加填写
    handleMultiSelect(e) {
        let {
            id,
            question,
            value,
            index,
            text,
            optionid,
            isselected
        } = e.currentTarget.dataset
        let options = this.data.survey_result[id].options ? this.data.survey_result[id].options : e.currentTarget.dataset.options
        options[optionid].isselected = (isselected == false ? true : false)
        this.data.survey_result.splice(index, 1, {
            id,
            question,
            isselected,
            options,
            value,
            text
        })
        this.data.survey_result[id].inputval = this.data.questions[id].inputval
        let survey_result = this.data.survey_result
        this.setData({
            survey_result
        })
        console.info(survey_result)
    },
    //用户填写
    handleInput(e) {
        console.info(e.detail.value)
        let {
            id,
            index,
            question,
        } = e.currentTarget.dataset
        let options = this.data.survey_result[id].options ? this.data.survey_result[id].options : e.currentTarget.dataset.options
        options.splice(options.length - 1, 1)
        options[options.length] = {
            id: options.length + 1,
            "text": "其他:" + e.detail.value,
            isselected: true,
            extra: true
        }
        let inputval=this.data.survey_result[id].inputval?this.data.survey_result[id].inputval:e.detail.value
        this.data.survey_result.splice(index, 1, {
            id,
            question,
            options,
            inputval
        })
        let survey_result = this.data.survey_result
        this.setData({
            survey_result
        })
        console.info(survey_result)

    },
    checkboxChange(e) {
        const {
            id,
            question,
            isselected,
            value,
            index,
            text
        } = e.currentTarget.dataset
        const {
            survey_result
        } = this.data
        survey_result.splice(index, 1, {
            id,
            question,
            isselected,
            value,
            text
        })
        console.info(value)
        console.info(text)
        console.info(isselected)
        if (value) {
            this.setData({
                survey_result

            })
        }
        const {
            selectedata
        } = e.target.dataset.value

        // this.setData({
        //   [string]: !this.data.options[e.target.dataset.value].isselected
        // })
        // let detailValue = this.data.options.filter(it => it.isselected).map(it => it.value)
        // console.log('所有选中的值为：', detailValue)
    },
    // 如果有是输入框，则输入
    //   handleInput(e) {
    //     const { value } = e.detail
    //     const { id,question, index } = e.currentTarget.dataset
    //     const { survey_result } = this.data
    // console.info(e)
    //     survey_result.splice(index, 1, { id,question, value })
    //     this.setData({
    //       survey_result
    //     })
    //     // console.log('survey_result:', this.data.survey_result)
    //   },
    // 静止用手左右滑动
    forbid() {
        return false
    },
    submitQues() {
        let oThis = this
        wx.getStorage({
            key: 'sessionuser',
            success: function (sessionuser) {
                let quesarrs = {}
                console.info(sessionuser)
                quesarrs.phone = sessionuser.data.phone
                quesarrs.username=sessionuser.data.username
                quesarrs.questions=oThis.data.survey_result
                console.info(quesarrs)
                wx.request({
                    url: "https://bainuo.beijingepidial.com/client/users/save/ques",
                    header: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    data:quesarrs,
                    // data: {"sampleid": 1121032800079},
                    complete: function (res) {
                        //用户点击确定后没值的输入值后就不可编辑
                        //一定要写成this.data.isDisabled，不然判断出不来
                        console.info(res)
                        if (res.statusCode == 200) {
                            wx.showToast({
                                title: '问卷保存成功',
                                icon: 'success',
                                duration: 2000,
                                // success: () => {
                                //     setTimeout(() => {
                                //       wx.navigateBack();
                                //     }, 2000);
                                //   }
                                complete: function () {
                                    setTimeout(function () {
                                        wx.switchTab({
                                            url: "/pages/report/report"
                                        })
                                    }, 2000);
                                }
                            });
                        }
                    }
                })
            }
        })
    }
})