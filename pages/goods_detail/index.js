// pages/goods_detail/index.js
import {request} from '../../service/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

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
  handlePreviewImage(e) {
    console.log('*****************');
    const urls = this.data.goodsObj.pics.map(v => v.pics_mid);
    const {url} = e.currentTarget.dataset;
    wx.previewImage({
      urls,
      current: url,
    })
  }
})