export function removeCookie(cname) {
  setCookie(cname, "", -1)
}

export function setCookie(cname, cvalue, exhours) {
  var d = new Date();
  if (!exhours) {
    exhours = 1
  }
  d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));

  // console.log("now:", d)


  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires + ";" + " path=*"
}

export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

export function checkCookie() {
  var token = getCookie('TJSPACE_token')
  if (token) {
    return true
  }
  else {
    return false
  }
}


/**
 * 为中、英文字符串折叠
 * @param {string}} string 需要折叠的字符串
 * @param {int} length 保留长度
 */
export function collapse(string, length) {
  for (var i = 0; i < string.length; i++) {
    if (string.charCodeAt(i) > 127 || string.charCodeAt(i) < 0) {
      length -= 2;
    } else {
      length -= 1;
    }
    if (length < 0) {
      return string.slice(0, i - 1) + "...";
    }
  }
  return string;
}

/**
 * 判读是否是正确的手机号
 * @param {string} s 
 */
export function checkMobile(s) {
  var length = s.length;
  if (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(s)) {
    return true;
  } else {
    return false;
  }
} 