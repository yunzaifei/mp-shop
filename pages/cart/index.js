// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartList: []
  },

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
    const cartList = wx.getStorageSync('cart');
    this.setData({ 
      address, 
      cartList,
    });
  },
  /**
   * 点击收货地址
   */
  handleChooseAddress() {
    wx.getSetting({
      withSubscriptions: true,
      success: (result) => {
        const scopeAddress = result.authSetting["scope.address"];
        const successAddress = (res) => {
          console.log(res);
          res.addressAll = res.provinceName+res.cityName+res.countyName+res.detailInfo;
          wx.setStorageSync('address', res);
        };
        if(scopeAddress === false) {
          wx.openSetting({
            withSubscriptions: true,
            success: () => {
              wx.chooseAddress({ success: successAddress });
            }
          })
        } else {
          wx.chooseAddress({ success: successAddress });
        }
      }
    })
  }
})