// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      name: '体验问题',
      isActive: true,
    },{
      id: 1,
      name: '商品/商家投诉',
      isActive: false,
    }],
    chooseImgs: [],
    textVal: '',
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 标题切换
   * @param {*} e 
   */
  handleTabsItemChange(e) {
    const {index} = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => {
      v.isActive = i===index;
    });
    this.setData({ tabs });
  },
  /**
   * 选择图片事件
   */
  handleChooseImg(){
    wx.chooseImage({
      count: 9,
      success: (result) => {
        const { tempFilePaths } = result;
        const { chooseImgs } = this.data;
        this.setData({
          chooseImgs: [...chooseImgs, ...tempFilePaths],
        });
      }
    })
  },
  /**
   * 删除图片
   * @param {*} e 
   */
  handleRemoveImg(e) {
    console.log(e);
    const { index } = e.currentTarget.dataset;
    const { chooseImgs } = this.data;
    chooseImgs.splice(index, 1);
    this.setData({ chooseImgs });
  },
  /**
   * 文本输入
   */
  handleText(e) {
    this.setData({ textVal: e.detail.value.trim() });
  },
  /**
   * 提交
   */
  handleSubmit() {
    const { textVal, chooseImgs } = this.data;
    if(textVal) {
      chooseImgs.forEach(v => {
        wx.uploadFile({
          filePath: v,
          name: 'file',
          url: 'https://api.superbed.cn/upload',
          success: (result) => {
            console.log(result);
          }
        });
      });
      this.setData({ textVal: '', chooseImgs: [] });
      wx.navigateBack({
        delta: 1,
      });
    } else {
      wx.showToast({
        title: '反馈意见不能为空！',
        icon: 'none',
      });
    }
  }
}) 