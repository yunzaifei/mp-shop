// pages/goods_detail/index.js
import {request} from '../../service/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false,
  },

  goodsInfo: {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let pages = getCurrentPages();
    const { goods_id } = pages[pages.length - 1].options;
    this.getGoodDetail(goods_id);
    let collect = wx.getStorageSync('collect') || [];
    let isCollect = collect.some(v => v.goods_id == goods_id);
    this.setData({ isCollect });
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
      this.goodsInfo.checked = true;
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
  },
  /**
   * 收藏点击事件
   */
  handleCollect() {
    const collect = wx.getStorageSync('collect') || [];
    const { isCollect, goodsObj } = this.data;
    if (isCollect) {
      const index = collect.findIndex(v => v.goods_id === this.goodsInfo.goods_id);
      collect.splice(index, 1);
      wx.showToast({
        title: '取消收藏',
        icon: 'none',
        mask: true,
      });
    } else {
      collect.push(this.goodsInfo);
      wx.showToast({
        title: '收藏成功',
        icon: 'none',
        mask: true,
      });
    }
    this.setData({ isCollect: !isCollect });
    wx.setStorageSync('collect', collect);
  }
})