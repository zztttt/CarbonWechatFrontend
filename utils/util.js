const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const stringSwitch = (s) => {
  switch(s){
    case '首页':
      return 'home';
    case '兑换':
      return 'exchange';
    case "我的":
      return 'mine';
  }
  return 'null';
}

const vehicleStringSwitch = (s) => {
  switch(s){
    case '地铁':
      return 0;
    case '单车':
      return 1;
    case '公交':
      return 2;
  }
}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  stringSwitch: stringSwitch,
  vehicleStringSwitch: vehicleStringSwitch
}
