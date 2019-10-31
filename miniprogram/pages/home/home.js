// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:[]
  },

  /**
   * 跳转到评价详情页
   * 通过event事件的属性获取自定义data-movieid的值
   */
  jumpInfo: function(event) {
    // 跳转到指定url页面
    wx.navigateTo({
      url: `../info/info?movieid=${event.target.dataset.movieid}`
    })
  },

  /**
   * 获取电影信息
   */
  getMovieList: function() {
    // 加载提示框
    wx.showLoading({
      title: 'Loading...'
    })
    /**
     * 加载数据
     * name：表示调用云函数'movielist'
     * data: 表示对应云函数的参数
     */
    wx.cloud.callFunction({
      name: 'movielist',
      data: {
        start: this.data.movie.length,
        count: 10
      }
    })
      .then(res => {
        console.log('res----------', res)
        // 修改当前data中的movie属性值
        this.setData({
          movie: this.data.movie.concat(JSON.parse(res.result).subjects)
        })
        // 隐藏提示框    
        wx.hideLoading()
      })
      .catch(err => {
        console.error('err---------', err)
        wx.hideLoading()
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMovieList()
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
    this.getMovieList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})