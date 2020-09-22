var http = require( '../../utils/util' )
var url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic"
var app = getApp()

Page({

  data:{
    "loadingHide" : true,
    "textContent" : [
        {"words":"请上传图片，扫描文字...."},
        {"words":"请上传图片，扫描文字...."},
        {"words":"请上传图片，扫描文字...."},
        {"words":"请上传图片，扫描文字...."},
    ]
  },

  onLoad: function () {
 
    /**
   * 转发分享
   */
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })

  },
  
  chooseWxImage: function(type) {
    var that = this;

    that.setData({
      loadingHide : false
    })

    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function(res) {
        var tempFilesSize = res.tempFiles[0].size;

        if(tempFilesSize > 1024*1024*2){

          that.setData({
            loadingHide : true
          })

          wx.showToast({
            title: '图片大小超出2M',
            icon: 'none'
          })

          return;
        }

        console.log(res);
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], // 选择图片返回的相对路径
          encoding: 'base64', // 编码格式
          success: res => { // 成功的回调
            that.request(res.data);
            //检测图片
            // wx.cloud.init()
            // wx.cloud.callFunction({
            //   name:'checkImage',
            //   data:{
            //     file: res.data
            //   },
            //   success(imgRes){
            //     console.log(imgRes)
            //     if (imgRes.result.errorCode == '87014') {
            //       wx.showToast({
            //       title: '图片含有违法违规内容',
            //       icon: 'none'
            //     })
            //     return
            //   } else {
                //图片正常
                // that.request(res.data);
              // }
              },fail(_res){
                that.setData({
                  loadingHide : false
                })
                console.log(_res)
              }
            })
          }
        })
      },

  upload: function() {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#a3a2a2",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },

  //识别文字
  request: function(imageBade) {
    var that = this;
    var data = {
      access_token : "24.8f334f27cb3ac24cf401fe308c488302.2592000.1602322751.282335-22613664",
      image : imageBade,
      language_type : "CHN_ENG"
    }
    var header = {"content-type": "application/x-www-form-urlencoded"}
    http.request( url, 'POST', data, header, function( res ) {
      console.log(res.words_result);

      if(res.words_result.length == 0){
        wx.showToast({
          title: '该图片没有文字',
          icon: 'none',
        });
      }else{
        that.setData({
          loadingHide : true,
          "textContent" : res.words_result
        })
      }

    }, function( res ) {
      console.log( res )
      wx.showToast({
        title: '识别失败',
        icon: 'none',
      });
    })
  }

  

})
