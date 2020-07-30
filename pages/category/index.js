// pages/category/index.js
import { request } from '../../service/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftList: [],
    rightList: [],
    activeIndex: 0,
    scrollTop: 0,
  },

  cateList: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const storageData = wx.getStorageSync('category');
    if (storageData) {
      if (Date.now() - storageData.time > 30000) {
        this.getCategory();
      } else {
        this.cateList = storageData.data;
        const leftList = this.cateList.map(v => v.cat_name);
        const rightList = this.cateList[0].children;
        this.setData({
          leftList,
          rightList,
        });
      }
    } else {
      this.getCategory();
    }
  },
  /**
   * 获取分类数据
   */
  getCategory() {
    request({ url: '/categories' })
      .then(res => {
        this.cateList = res;
        wx.setStorageSync('category', { time: Date.now(), data: this.cateList });
        const leftList = this.cateList.map(v => v.cat_name);
        const rightList = this.cateList[0].children;
        this.setData({
          leftList,
          rightList,
        });
      })
  },
  /**
   * 左侧菜单点击事件
   */
  handleItemTap(e) {
    const { index } = e.target.dataset;
    const rightList = this.cateList[index].children;
    this.setData({ 
      activeIndex: index,
      scrollTop: 0,
      rightList,
    });
  },
})