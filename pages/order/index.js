// pages/order/index.js
import { request } from '../../service/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      name: '全部',
      isActive: true,
    },{
      id: 1,
      name: '待付款',
      isActive: false,
    },{
      id: 2,
      name: '待发货',
      isActive: false,
    },{
      id: 3,
      name: '退款/退货',
      isActive: false,
    }],
    orders: []
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let pages = getCurrentPages();
    const { type } = pages[pages.length - 1].options;
    console.log(type);
    this.changeTabsItem(type-1);
    this.getOrderList(type);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 标题切换
   * @param {*} e 
   */
  handleTabsItemChange(e) {
    const {index} = e.detail;
    this.changeTabsItem(index);
    this.getOrderList(index+1);
  },
  /**
   * tab切换标签方法
   * @param {*} index 
   */
  changeTabsItem(index) {
    let { tabs } = this.data;
    tabs.forEach((v, i) => {
      v.isActive = i===index;
    });
    this.setData({ tabs });
  },
  /**
   * 获取订单信息
   * @param {*} type 
   */
  getOrderList(type) {
    const token = wx.getStorageSync('token');
    if (token) {
      request({
        url: '/my/orders/all',
        header: { Authorization: token },
        data: { type }
      }).then(res => {
        console.log(res);
        let { orders } = res;
        orders = orders.map(v => ({ ...v, create_time_cn: new Date(v.create_time).toLocaleString() })) 
        this.setData({ orders });
      });
    } else {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
    }
  },
})