// pages/auth/index.js
import { request } from '../../service/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 获取授权信息
   * @param {*} e 
   */
  handleGetUserInfo(e) {
    const { encryptedData, rawData, iv, signature } = e.detail;
    wx.login({
      timeout: 10000,
      success: (res) => {
        const { code } = res;
        request({ 
          url: '/users/wxlogin',
          method: 'post',
          data: { encryptedData, rawData, iv, signature, code },
        }).then(res => {
          if (res) {
            const { token } = res;
            wx.setStorageSync('token', token);
          }
          wx.navigateBack({
            delta: 1,
          });
        });
      }
    })
  }
})