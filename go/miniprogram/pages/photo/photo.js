
var page = undefined;
var app = getApp();

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
    listt: ["喜欢一个人🌈就想在天空给你画一道彩虹", "会一切顺利😊心想事成的哦！", "甩掉霉运💗事事顺心呢！", "彩虹是云朵的梦🤞我们是此刻装进梦里的小幸运！", "好人会梦想成真的！👌", "🌈🌈🌈彩虹在这里哦！！🌈🌈🌈", "梦想还是要有的😊万一实现了呢~"],
    mmurl: '../../images/xin4.png',
    urllist: ['../../images/xin1.png', '../../images/xin2.png', '../../images/xin3.png', '../../images/xin4.png', '../../images/xin5.png', '../../images/xin6.png', '../../images/xin7.png', '../../images/xin8.png'],
    count: 0,
    imgUrls: [
      'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/swip2.jpg',
      'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/TIME6.jpg',
      'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/swip4.jpg',
      'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/swip5.jpg'
    ],
    contentItems: {
      '初恋朦胧': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/si1.jpg',
      },
      '热恋共存': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/si2.jpg',
      },
      '依恋独立': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/si3.jpg',
      },
      '平淡共生': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/si4.jpg',
      }
    },
    listItems: {
      'Min Wish': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/TIME1.jpg',
        content: '当你爱上一个人的时候，就想把自己喜欢的东西给ta看，想让ta可以体会你自己的这份喜悦的情感。<小哥，两个人吃的是饭， 一个人吃的是饲料>🍚 ',
      },
      'Love Letter': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/TIME2.jpg',
        content: '从前的日色变得慢 车，马，邮件都慢 一生只够爱一个人 从前的锁也好看 钥匙精美有样子 你锁了 人家就懂了🚆',
      },
      '1 + 1 = ∞': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/TIME3.jpg',
        content: '当缺爱的机器人得到了源源不尽的动力、永远都在的陪伴，一切不可能都能成为可能👊',
      },
      'To stay together till death and end': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/TIME4.JPG',
        content: '至此，心猿归林 意马有缰💗',
      },
      'Endless Power': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/swip3.JPG',
        content: '真正的爱情怎么会是因为对方而荒废自己的梦想，是因为对方而成为更好的人才是啊！正因为天泽那么优秀，小小年纪却拥有着自己独一无二的梦想与坚持，才使雯更加想向他靠近，因为他变成更好更努力的人！💪',
      },
      'Prayer': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/TIME5.jpg',
        content: '祈求天地放过一双恋人，怕发生的别发生⭐',
      },
      'Rose': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/TIME7.JPG',
        content: '从千千万万朵玫瑰花里筛选出少数，从千千万万人群中看到了你，这些都不是偶然的事件🌹',
      },
      'New Node': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/TIME8.jpg',
        content: '高考结束 全新的人生才刚刚开始呢 噶油噶油gogogo❗',
      },
      'Three Years Birthday': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/TIME9.jpg',
        content: '我们更习惯也更擅长用实际行动去向对方表达这份爱，生活中的惊喜，永远都会有。╰(*°▽°*)╯',
      },
      'Journey': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/TIME10.jpg',
        content: '活着是用脚来衡量，我们的灵魂，在这看山看水看风景间，不断靠近。👈',
      },
      'Gather together': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/TIME11.jpg',
        content: '你知道，如果你能克服了异地恋，那么你就能够克服其他任何事情。✌',
      },
      'Pearl of the Palm': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/TIME12.jpg',
        content: '恭喜你，成为了我的掌上明珠🐷',
      },
      'Prince': {
        address: 'cloud://study-cloud-1cd056.7374-study-cloud-1cd056/images/TIME13.jpg',
        content: '如果有人爱上一朵花，天上的星星有亿万颗，而这朵花只长在其中一颗上，这足以让他在仰望夜空时感到快乐。🌼',
      }
    },

  },

  onLoad: function () {
    page = this;
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
      },
      fail: err => {
      }
    })
  },
  bindbt: function () {
    var that = this;
    var rem = this.data.count + 1;
    var list = this.data.urllist;
    if (rem >= 8) rem = rem - 8;
    this.setData({
      count: rem,
      mmurl: list[rem],
    })

    var s = this.data.ccc + 1;
    if (s >= 7)
      s = s - 7;
    this.setData({
      ccc: s
    })

    doommList.push(new Doomm(this.data.listt[this.data.ccc], Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 10), getRandomColor()));
    this.setData({
      doommData: doommList
    })
  },

  audioPlay: function () {
    this.setData({
      action: {
        method: 'play'
      }
    })
  },
  audioPause: function () {
    this.setData({
      action: {
        method: 'pause'
      }
    })
  },
  audioPlaybackRateSpeedUp: function () {
    this.setData({
      action: {
        method: 'setPlaybackRate',
        data: 2
      }
    })
  },
  audioPlaybackRateNormal: function () {
    this.setData({
      action: {
        method: 'setPlaybackRate',
        data: 1
      }
    })
  },
  audioPlaybackRateSlowDown: function () {
    this.setData({
      action: {
        method: 'setPlaybackRate',
        data: 0.5
      }
    })
  },
  audio14: function () {
    this.setData({
      action: {
        method: 'setCurrentTime',
        data: 14
      }
    })
  },
  audioStart: function () {
    this.setData({
      action: {
        method: 'setCurrentTime',
        data: 0
      }
    })
  },

  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: 'Min 💗💗 Yun',
      desc: '微距MY',
      path: '/pages/photo/photo',
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



