// pages/cart/index.js
import { request } from '../../service/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartList: [],
    totalPrice: 0,
    totalNum: 0,
  },
  header: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address = wx.getStorageSync('address');
    let cartList = wx.getStorageSync('cart') || [];
    cartList = cartList.filter(v => v.checked);
    let totalPrice = 0;
    let totalNum = 0;
    cartList.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    });
    this.setData({ 
      address,
      cartList,
      totalPrice,
      totalNum,
    });
  },
  /**
   * 支付按钮事件
   */
  handleOrderPay() {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
    } else {
      // console.log('token', token);
      const { address, totalPrice, cartList } = this.data;
      this.header = { Authorization: token };
      request({
        url: '/my/orders/create',
        method: 'post',
        header: this.header,
        data: {
          order_price: totalPrice,
          consignee_addr: address.addresAll,
          goods: cartList.map(v => ({
            goods_id: v.goods_id,
            goods_number: v.num,
            goods_price: v.goods_price,
          })),
        }
      }).then(this.createPayParams);
    }
  },
  /**
   * 获取支付参数
   * @param {*} res 
   */
  createPayParams(res) {
    const { order_number } = res;
    request({
      url: '/my/orders/req_unifiedorder',
      method: 'post',
      header: this.header,
      data: { order_number },
    }).then(result => {
      result.order_number = order_number;
      this.wxRequestPay(result);
    });
  },
  /**
   * 微信支付请求
   * @param {*} res 
   */
  wxRequestPay(res) {
    const { pay, order_number } = res;
    wx.requestPayment({
      ...pay,
    }).then(result => {
      this.checkOrder(order_number);
    });
  },
  /**
   * 查看订单支付状态
   * @param {*} order_number 订单编号
   */
  checkOrder(order_number) {
    request({
      url: '/my/orders/chkOrder',
      method: 'post',
      header: this.header,
      data: { order_number },
    }).then(res => {
      wx.showToast({  title: '支付成功' });
      wx.navigateTo({  url: '/pages/order/index' });
      let cart = wx.getStorageSync('cart');
      cart = cart.filter(v => !v.checked);
      wx.setStorageSync('cart', cart);
    });
  },
})