// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      name: "商品收藏",
      isActive: true,
    },{
      id: 1,
      name: "品牌收藏",
      isActive: false,
    },{
      id: 2,
      name: "店铺收藏",
      isActive: false,
    },{
      id: 3,
      name: "浏览足迹",
      isActive: false,
    }],
    collect: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const collect = wx.getStorageSync('collect') || [];
    this.setData({ collect });
  },
  /**
   * 标题切换
   * @param {*} e 
   */
  handleTabsItemChange(e) {
    const {index} = e.detail;
    const { tabs } = this.data;
    tabs.forEach((v, i) => v.isActive = (i === index));
    this.setData({ tabs });
  },
})