//app.js
App({
  globalData:{
    userInfo:{},
    url:'/pages/index/index'
  },
  onLaunch: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
        success: function(res) {
            if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                    success: function(res) {
                      console.log("userInfo", res.userInfo);
                      that.globalData.userInfo = res.userInfo
                        // 用户已经授权过
                        // 根据自己的需求有其他操作再补充
                        // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                        // wx.login({
                        //     success: res => {
                                // 获取到用户的 code 之后：res.code
                                // console.log("用户的res:", res);
                                // 可以传给后台，再经过解析获取用户的 openid
                                // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                                // wx.request({
                                //     // 自行补上自己的 APPID 和 SECRET
                                //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
                                //     success: res => {
                                //         // 获取到用户的 openid
                                //         console.log("用户的openid:" + res.data.openid);
                                //     }
                                // });
                            // }
                        // });
                    }
                });
            } else {
                // 用户没有授权
                // 跳转到授权页面
                // wx.reLaunch({
                //   url: '/pages/login/login'
                // })
            }
        }
    });
  },
})