//index.js
//获取应用实例
var app = getApp();
var calendarSignData;
var date;
var calendarSignDay;

var page = undefined;

var doommList = [];
var i = 0;
class Doomm {
  constructor(text, top, time, color) {
    this.text = text;
    this.top = top;
    this.time = time;
    this.color = color;
    this.display = true;
    let that = this;
    this.id = i++;
    setTimeout(function () {
      doommList.splice(doommList.indexOf(that), 1);
      page.setData({
        doommData: doommList
      })
    }, this.time * 1000)
  }
}
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  data: {
    doommData: [],
    ccc: 0,
    listt: ["喜欢一个人💫就想在天空给你画一道彩虹", "会一切顺利😊心想事成的哦！", "甩掉霉运💗事事顺心呢！", "彩虹是云朵的梦🤞我们是此刻装进梦里的小幸运！", "好人会梦想成真的！👌", "🌈🌈🌈彩虹在这里哦！！🌈🌈🌈", "梦想还是要有的😊万一实现了呢~", "成功的路不止一条🚀坚持梦想的人总会相遇！", "做你自己☀无拘无束发挥潜力！", "年轻的时候一切的误差都可以理解为天意🚩", "不回头地走下去🏰因为前面还有向往的生活！", "痛苦和孤独能让你更加强大👊", "吃过苦后🔶更乐观向上有信仰！", "别用5%的负面评价去否定100%的努力💪", "我们都在为了自己心中所想生活努力着💑", "再快乐的心都有烦恼🙈千万不要在意", "⭐You influence my whole trajectory", "✨不断成长，不断进步，变得优秀，变得成熟。", "心有多静，福有多深。🌠", "今天，去抓住你的彩虹吧🌈"],
    openid: '',
    mmurl: '../../images/xin4.png',
    mmurl1: '../../images/xin4.png',
    urllist: ['../../images/xin1.png', '../../images/xin2.png', '../../images/xin3.png', '../../images/xin4.png', '../../images/xin5.png', '../../images/xin6.png', '../../images/xin7.png', '../../images/xin8.png'],
    count: 0,
    count1: 0,
    windowWidth: "",//窗口宽度
    windowHeigh: "",//窗口高度
    packetList: [{}],//红包队列
    packetNum: 20,//总共红包的数量
    showInter: ''//  循环动画定时器
  },

  //事件处理函数
  calendarSign: function () {
    calendarSignData[date] = date;
    calendarSignDay = calendarSignDay + 1;
    wx.setStorageSync("calendarSignData", calendarSignData);
    wx.setStorageSync("calendarSignDay", calendarSignDay);

    this.setData({
      calendarSignData: calendarSignData,
      calendarSignDay: calendarSignDay
    })
  },

  bindbt: function () {
    var that = this;
    var rem = this.data.count1 + 1;
    var list = this.data.urllist;
    if (rem >= 8) rem = rem - 8;
    this.setData({
      count1: rem,
      mmurl1: list[rem],
    })

    var s = this.data.ccc + 1;
    if (s >= 20)
      s = s - 20;
    this.setData({
      ccc: s
    })

    doommList.push(new Doomm(this.data.listt[this.data.ccc], Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 10), getRandomColor()));
    this.setData({
      doommData: doommList
    })
  },

  onLoad: function () {
    page = this;
    var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth() + 1;
    date = mydate.getDate();
    var day = mydate.getDay();
    var nbsp = 7 - ((date - day) % 7);
    var monthDaySize;
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      monthDaySize = 31;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
      monthDaySize = 30;
    } else if (month == 2) {
      // 计算是否是闰年,如果是二月份则是29天
      if ((year - 2000) % 4 == 0) {
        monthDaySize = 29;
      } else {
        monthDaySize = 28;
      }
    };
    // 判断是否签到过
    if (wx.getStorageSync("calendarSignData") == null || wx.getStorageSync("calendarSignData") == '') {
      wx.setStorageSync("calendarSignData", new Array(monthDaySize));
    };
    if (wx.getStorageSync("calendarSignDay") == null || wx.getStorageSync("calendarSignDay") == '') {
      wx.setStorageSync("calendarSignDay", 0);
    }
    calendarSignData = wx.getStorageSync("calendarSignData")
    calendarSignDay = wx.getStorageSync("calendarSignDay")
    this.setData({
      year: year,
      month: month,
      nbsp: nbsp,
      monthDaySize: monthDaySize,
      date: date,
      calendarSignData: calendarSignData,
      calendarSignDay: calendarSignDay,
      openid: app.globalData.openid
    })

    var that = this;

    // 获取手机屏幕宽高
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeigh: res.windowHeight,
          top: res.windowHeight - 100  
        })
      }
    })

    
  },

  drawImage() {
    var that = this;
    var rem = this.data.count + 1;
    var list = this.data.urllist;
    if (rem >= 8) rem = rem - 8;
    this.setData({
      count: rem,
      mmurl: list[rem],
    })

    that.setData({
      packetList: [{}],//红包队列
      packetNum: 20,//总共红包的数量
      showInter: ''//  循环动画定时器
    })

    //建立临时红包列表
    var packetList = [];
    //建立临时红包图片数组
    var srcList = ["../../images/a1.png", "../../images/a2.png", "../../images/a3.png", "../../images/a4.png", "../../images/a5.png", "../../images/a6.png", "../../images/a7.png", "../../images/a8.png", "../../images/a9.png", "../../images/a10.png", "../../images/a1.png"];
    //生成初始化红包
    for (var i = 0; i < that.data.packetNum; i++) {
      // 生成随机位置（水平位置）
      var left = Math.random() * that.data.windowWidth - 20;
      // 优化位置，防止红包越界现象，保证每个红包都在屏幕之内
      if (left < 0) {
        left += 20;
      } else if (left > that.data.windowWidth) {
        left -= 20;
      }
      // 建立临时单个红包
      var packet = {
        src: srcList[Math.round(Math.random() * 10)],
        top: -30,
        left: left,
        speed: Math.random() * 2500 + 3000     //生成随机掉落时间，保证每个掉落时间保持在3秒到5.5秒之间
      }
      // 将单个红包装入临时红包列表
      packetList.push(packet);
      // 将生成的临时红包列表更新至页面数据，页面内进行渲染
      that.setData({
        packetList: packetList
      })
    }

    // 初始化动画执行当前索引
    var tempIndex = 0;
    // 开始定时器，每隔1秒掉落一次红包
    that.data.showInter = setInterval(function () {
      // 生成当前掉落红包的个数，1-3个
      var showNum = Math.ceil(Math.random() * 3);
      // 防止数组越界
      if (tempIndex * showNum >= that.data.packetNum) {
        // 如果所有预生成的红包已经掉落完，清除定时器
        clearInterval(that.data.showInter);
      } else {
        switch (showNum) {
          case 1:
            //设置临时红包列表当前索引下的top值，此处top值为动画运动的最终top值 
            packetList[tempIndex].top = that.data.windowHeigh;
            // 当前次掉落几个红包，索引值就加几
            tempIndex += 1;
            break;
          case 2:
            packetList[tempIndex].top = that.data.windowHeigh;
            packetList[tempIndex + 1].top = that.data.windowHeigh;
            tempIndex += 2;
            break;
          case 3:
            packetList[tempIndex].top = that.data.windowHeigh;
            packetList[tempIndex + 1].top = that.data.windowHeigh;
            packetList[tempIndex + 2].top = that.data.windowHeigh;
            tempIndex += 3;
            break;
          default:
            console.log();
        }
        // 更新红包列表数据
        that.setData({
          packetList: packetList
        })
      }
    }, 500)
  },

  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: 'Min 💗💗 Yun',
      desc: '微距MY',
      path: '/pages/Calendar/Calendar',
      success: function (res) {
        // 转发成功

        that.shareClick();
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})
