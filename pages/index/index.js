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
    request({url: '/home/swiperdata'})
    .then(res => {
      this.setData({
        swiperList: res.map(v => ({
          ...v,
          navigator_url: v.navigator_url.replace('main', 'index'),
        })),
      });
    });
  },
  /**
   * 获取分类导航
   */
  getCateList() {
    request({url: '/home/catitems'})
    .then(res => {
      this.setData({
        catesList: res.map(v => ({
          ...v,
          navigator_url: v.navigator_url ? v.navigator_url.replace('main', 'index') : '',
        })),
      });
    });
  },
  /**
   * 获取楼层数据
   */
  getFloorList() {
    request({url: '/home/floordata'})
    .then(res => {
      this.setData({
        floorList: res,
      });
    });
  },
})
