//index.js
import { request } from '../../service/index';

//获取应用实例
const app = getApp()

Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList: [],
  },
  onLoad: function () {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  /**
   * 获取轮播图
   */
  getSwiperList() {
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
    .then(res => {
      this.setData({
        swiperList: res.data.message,
      });
    });
  },
  /**
   * 获取分类导航
   */
  getCateList() {
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'})
    .then(res => {
      this.setData({
        catesList: res.data.message,
      });
    });
  },
  /**
   * 获取楼层数据
   */
  getFloorList() {
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'})
    .then(res => {
      this.setData({
        floorList: res.data.message,
      });
    });
  },
})
