// miniprogram/pages/info/info.js

// 连接数据库
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    content: '', // 评论信息
    score: 5, // 评分
    images: [], // 上传的图片
    fileIds: [], // 上传到云存储后返回的fileid
    movieId: -1 // 每一条评论的id号
  },

  // 评论改变时
  onCommentChange: function(event) {
    this.setData({
      content: event.detail
    })
  },

  // 评分改变时
  onScoreChange: function(event) {
    this.setData({
      score: event.detail
    })
  },

  // 上传图片
  uploadImage: function(event) {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      // 注意以下得用箭头函数，否则打印的this=null
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log('tempFilePaths--->', tempFilePaths)
        this.setData({
          images: this.data.images.concat(tempFilePaths)
        })
      }
    })
  },

  // 提交评论
  doSubmit: function(event) {
    console.log('event----------', this.data)
    if (this.data.content.trim() == "") {
      wx.showToast({
        title: '评论不能为空噢Θ◇Θ',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '评论中....',
      })
      // 上传图片到云存储
      let promiseArr = []
      for (let i = 0; i < this.data.images.length; i++) {
        // Promise数组
        promiseArr.push(new Promise((resolve, reject) => {
          let item = this.data.images[i];
          let suffix = /\.\w+$/.exec(item)[0]; // 正则表达式，返回文件的后缀名
          wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + suffix, // 文件名字
            filePath: item, // 文件路径
          }).then(res => {
            // get resource ID
            console.log('res==========', res)
            this.setData({
              fileIds: this.data.fileIds.concat(res.fileID)
            })
            // 注意必须resolve
            resolve();
          }).catch(error => {
            console.log('error----------', error)
          })
        }))
      }

      // 利用Promise.all达到，所有异步操作结束后执行其他--传递的参数必须为Promise对象构成的数组
      Promise.all(promiseArr).then(res => {
        // 存储到数据库中
        db.collection('movie').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            content: this.data.content,
            score: this.data.score,
            movieid: this.data.movieId,
            fileIds: this.data.fileIds
          },
          success: res => {
            wx.hideLoading()
            wx.showToast({
              title: '评论成功',
              success: res => {
                setTimeout(() => {
                  wx.navigateBack() // 成功后返回上一页   
                }, 300)           
              }
            })
            console.log('评论成功---------', res)
          },
          fail: err => {
            wx.hideLoading()
            wx.showToast({
              title: '评论失败，请联系管理员'
            })
            console.error('评论失败========', err)
          }
        })
      }).catch(err => {
        console.error('err=====', err)
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取参数详情movieid
    wx.showLoading({
      title: 'Loading....',
    })
    this.setData({
      movieId: options.movieid
    })
    // 调用云函数--获取详细信息
    wx.cloud.callFunction({
        name: 'getDetail',
        data: {
          movieid: options.movieid
        }
      })
      .then(res => {
        this.setData({
          detail: JSON.parse(res.result)
        })
        wx.hideLoading()
        console.log('detail----------->', res)
      })
      .catch(err => {
        console.error('err---------->', err)
        wx.hideLoading()
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})