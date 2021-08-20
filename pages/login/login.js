// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    btnstate:"default",
    account:"",
    password:""
  },

  accountInput:function(e){
    var content = e.detail.value;
    if(content!=''){
      this.setData({disabled:false,btnstate:"primary",account:content});
    }else{
      this.setData({disabled:true,btnstate:"default"});
    }
  },
  pwdBlur:function(e){
    var password= e.detail.value;
    if(password!=''){
      this.setData({password:passwd});
    }
  }
})