// pages/search/index.js
import { request } from '../../service/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isFocus: false,
    searchInput: '',
  },
  timeID: -1,

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 输入框输入改变事件
   * @param {*} e 
   */
  handleInput(e) {
    console.log(e);
    const { value } = e.detail;
    if(value.trim()) {
      this.setData({ isFocus: true });
      clearTimeout(this.timeID);
      this.timeID = setTimeout(() => {
        this.getQsearch(value);
      }, 1000);
    } else {
      this.setData({ isFocus: false });
    }
  },
  /**
   * 获取搜索结果
   */
  getQsearch(query) {
    request({
      url: '/goods/qsearch',
      data: { query }
    }).then(res => {
      this.setData({ goods: res });
    })
  },
  /**
   * 取消
   */
  handleCancel() {
    this.setData({
      searchInput: '',
      isFocus: false,
      goods: [],
    });
  }
})