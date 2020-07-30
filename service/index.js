let reqTimes = 0;
export const request = (params) => new Promise((resolve, reject) => {
  reqTimes++;
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';
  wx.showLoading({
    title: '加载中',
    mask: true,
  });
  wx.request({
    ...params,
    url: baseUrl + params.url,
    success: (result) => { resolve(result.data.message); },
    fail: (err) => { reject(err) },
    complete: (res) => {
      reqTimes--;
      if(reqTimes === 0) {
        wx.hideLoading();
      }
    },
  })
});