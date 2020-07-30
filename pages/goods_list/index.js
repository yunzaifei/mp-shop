// pages/goods_list/index.js
import { request } from '../../service/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      name: '综合',
      isActive: true,
    },{
      id: 1,
      name: '销量',
      isActive: false,
    },{
      id: 2,
      name: '价格',
      isActive: false,
    }],
    goods: [],
  },
  totalPage: 1,
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { cid='' } = options;
    this.queryParams.cid = cid;
    this.getGoods();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.queryParams.pagenum = 1;
    this.setData({goods: []});
    this.getGoods();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.queryParams.pagenum < this.totalPage) {
      this.queryParams.pagenum++;
      this.getGoods();
    } else {
      wx.showToast({
        title: '已经到底了',
      })
    }
  },
  /**
   * 获取商品列表
   */
  getGoods() {
    request({
      url: '/goods/search',
      data: this.queryParams,
    }).then(res => {
      const { goods, total } = res;
      this.totalPage = Math.ceil(total/this.queryParams.pagesize);
      this.setData({
        goods: this.data.goods.concat(goods),
      });
      wx.stopPullDownRefresh();
    })
  },
  /**
   * 标题切换
   * @param {*} e 
   */
  handleTabsItemChange(e) {
    const {index} = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => {
      v.isActive = i===index;
    });
    this.setData({ tabs });
  }
})