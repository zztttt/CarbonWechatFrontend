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
      return 'subway';
    case '单车':
      return 'bike';
    case '公交':
      return 'bus';
  }
}

const editDistance = (s1, s2) =>  {
  var len1 = s1.length, len2 = s2.length;
  var dp = new Array(len1 + 1);
  // init dp array
  for(let i = 0; i < len1 + 1; ++i){
    dp[i] = new Array(len2 + 1);
    for(let j = 0; j < len2 + 1; ++j){
      dp[i][j] = 0;
    }
  }
  for(let i = 0; i < len1 + 1; ++i){
    dp[i][0] = i;
  }
  for(let i = 0; i < len2 + 1; ++i){
    dp[0][i] = i;
  }
  //console.log(dp);
  // dp
  for(let i = 1; i < len1 + 1; ++i){
    for(let j = 1; j < len2 + 1; ++j){
      if(s1[i - 1] === s2[j - 1]){
        dp[i][j] = dp[i - 1][j - 1];
      }else{
        dp[i][j] = Math.min(dp[i][j - 1], Math.min(dp[i - 1][j], dp[i - 1][j - 1])) + 1;
      }
    }
  }
  return dp[len1][len2];
}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  stringSwitch: stringSwitch,
  vehicleStringSwitch: vehicleStringSwitch,
  editDistance: editDistance
}
