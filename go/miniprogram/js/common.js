var formatNumber = function (n) {
  return ('' + n)[1] ? n : '0' + n;
};

var formatTime = function (t) {
  var oldday = new Date("2016/6/10");
  var days = t.getTime() - oldday.getTime();
  var day = parseInt(days / (1000 * 60 * 60 * 24));
  const year = t.getFullYear();
  return t.getFullYear() + '年' + formatNumber(t.getMonth() + 1) + '月' + formatNumber(t.getDate()) + '日 ' + formatNumber(t.getHours()) + ':' + formatNumber(t.getMinutes()) + ':' + formatNumber(t.getSeconds()) + '           💗已经' + day + '天'; 
};
 

/*
* 暴露接口给外部
*/
module.exports = { formatTime };