// pages/liver/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      phone:'',
      pwd:'',
      username:'',
      mark:'',
      //是否密码框
    passwordType:true,
    // 是否显示密码
    show_pass:false

    },
    seeTap:function(){
        
        this.setData({
          // 切换图标
          show_pass:!this.data.show_pass,
          // 切换是否密码框
          passwordType:!this.data.passwordType,
        })
      },
    btnForget:function(e){
        wx.navigateTo({
          url: "../user/fgpwd"
        })
      },
      next:function(e){
        wx.navigateTo({
          url: "../user/register"
        })
      },
      inputPhone:function(e){
        var phone = e.currentTarget.dataset.name;
        this.setData({
          [phone]: e.detail.value.replace(/\s+/g, '')
        })
      },
      userPwd:function(e){
        console.info(e.detail.value)
        this.setData({pwd: e.detail.value}) 
      },
      login:function(){
        let oThis=this
        if(!this.data.phone){
            wx.showToast({
                title: '请输入账号',
                icon: 'error',
                duration: 2000
            }) 
        }else if(!this.data.pwd){
            wx.showToast({
                title: '请输入密码',
                icon: 'error',
                duration: 2000
            })
        }else{
            let sessionuser={}
            sessionuser.phone=this.data.phone
            sessionuser.password=this.data.pwd
            sessionuser.mark='staff'
        wx.request({

            url: "https://bainuo.beijingepidial.com/client/staff/login",
            header: {"Content-Type": "application/x-www-form-urlencoded"},
            method: "POST",
            data: sessionuser,
            complete: function (res) {
               if(res.data.status=="success"){
                oThis.setData({username:res.data.result.username})
                sessionuser.username=oThis.data.username
                sessionuser.mark=res.data.mark
                wx.setStorage({
                  key: "sessionuser",
                  data: sessionuser,
                  success: function(res){
                      //直接跳到tab首页
                      wx.switchTab({url: '../../../pages/report/report'})
                  },
                  fail:function(res){
                      console.info(res)
                      wx.showToast({
                          title: '登陆状态保存失败',
                          icon: 'error',
                          duration: 2000
                      })
                  }
                })                 
               }else{
                wx.showToast({
                    title: '账号或密码有误',
                    icon: 'error',
                    duration: 2000
                })
               }
            }
        })
      }
    },

})