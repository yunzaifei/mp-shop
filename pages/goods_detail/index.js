// pages/goods_detail/index.js
import {request} from '../../service/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

  goodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    this.getGoodDetail(goods_id);
  },
  /**
   * 获取商品详情
   */
  getGoodDetail(goods_id) {
    request({
      url: '/goods/detail',
      data: { goods_id }
    }).then(res => {
      const { goods_name, goods_price, goods_introduce, pics } = res;
      this.goodsInfo = res;
      this.setData({
        goodsObj: {
          goods_name,
          goods_price,
          goods_introduce: goods_introduce.replace('.webp', '.jpg'),
          pics,
        }
      });
    })
  },
  /**
   * 放大预览图片
   * @param {*} e 
   */
  handlePreviewImage(e) {
    const urls = this.data.goodsObj.pics.map(v => v.pics_mid);
    const {url} = e.currentTarget.dataset;
    wx.previewImage({
      urls,
      current: url,
    })
  },
  /**
   * 点击加入购物车
   */
  handleAddCart() {
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id);
    if (index === -1) {
      this.goodsInfo.num = 1;
      cart.push(this.goodsInfo);
    } else {
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });
  }
})