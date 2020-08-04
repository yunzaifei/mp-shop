// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartList: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0,
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
    const cartList = wx.getStorageSync('cart') || [];
    this.setData({ address });
    this.setCart(cartList);
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
  },
  /**
   * 商品选中事件
   * @param {*} e 
   */
  handleItemChange(e) {
    const { index } = e.currentTarget.dataset;
    const { cartList } = this.data;
    cartList[index].checked = !cartList[index].checked;
    this.setCart(cartList);
  },
    /**
   * 全部选中事件
   */
  handleAllChange() {
    const { cartList, allChecked } = this.data;
    cartList.forEach(v => v.checked = !allChecked);
    this.setCart(cartList);
  },
  /**
   * 编辑商品数量
   * @param {*} e 
   */
  handleNumEdit(e) {
    const { index, operation } = e.currentTarget.dataset;
    const { cartList } = this.data;
    if (operation === -1 && cartList[index].num === 1) {
      wx.showModal({
        title: '提示',
        content: '是否删除商品？',
        success: (res) => {
          if (res.confirm) {
            cartList.splice(index, 1);
            this.setCart(cartList);
          }
        }
      });
    } else {
      cartList[index].num += operation;
      this.setCart(cartList);
    }
  },
  /**
   * 结算事件
   */
  handlePay() {
    const { address, totalNum } = this.data;
    if (totalNum === 0) {
      wx.showToast({
        title: '您还没有选购商品',
        icon: 'none',
      });
    } else if (!address.userName) {
      wx.showToast({
        title: '您还没有选择收货地址',
        icon: 'none',
      });
    } else {
      wx.navigateTo({
        url: '/pages/pay/index',
      })
    }
  },
  /**
   * 重置购物车
   */
  setCart(cartList) {
    let allChecked = !!(cartList.length);
    let totalPrice = 0;
    let totalNum = 0;
    cartList.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    this.setData({ 
      cartList,
      allChecked,
      totalPrice,
      totalNum,
    });
    wx.setStorageSync('cart', cartList);
  },
})