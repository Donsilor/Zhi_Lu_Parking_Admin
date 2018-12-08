

/**
 * 数组转对象
 * @param {*} arr 
 * @param {*} key 
 */
export const array2Object = function (arr = [], key = "id", type=1) {
  let result = {}, results = [];
  for (let o of arr) {
    if (o[key]) result[o[key]] = o;
  }
  return result;
}

/**
 * 讲一个列表数据根据某个Key[pid]作为列表的子孙关系，重新生成一个带子孙关系对象
 * @param {*} arr 
 * @param {*} idKey 自己的Key
 * @param {*} pidKey 父级ID的Key
 * @param {*} type 返回类型 1 数组 0 以ID为Key的对象
 */
export const array2Descendants = function (arr = [], idKey = "id", pidKey = "pid", type = 1) {
  let objs = {}, objarr = [];
  for (let item of arr) {
    let id = item[idKey], pid = item[pidKey];

    /**初始化所有人 */
    if (!(id in objs)) {
      objs[id] = item;
      if (type) {
        objs[id]["children"] = [];
        objarr.push(item);
      }
      else {
        objs[id]["children"] = {};
      }
    }

    for (let itemId in objs) {
      /**找到孩子 */
      if (pid == itemId) {
        type ?
          objs[itemId]["children"].push(objs[id]) :
          objs[itemId]["children"][id] = objs[id];
      }
      /**找到父亲 */
      else if (id == objs[itemId][pidKey]) {
        type ?
          objs[id]["children"].push(objs[itemId]) :
          objs[id]["children"][itemId] = objs[itemId];
      }
    }
  }
  /**找出所有的终极父亲 */
  let results = {}, resultArr = [];
  for (let itemId in objs) {
    if (!(objs[itemId][pidKey] in objs)) {
      type ?
        resultArr.push(objs[itemId]) :
        results[itemId] = objs[itemId];
    }
  }
  return type ? resultArr : results;
}

/**
 * 判断是否是下级或者自己
 * @param {*} obj 
 * @param {*} id 
 */
export const isChildrensId = function(obj, id){
  return obj.id == id || obj.children && obj.children.some(o=>{
    if(o.id == id){
      return true;
    }
    else return isChildrensId(o, id)
  })
}
/**
 * 根据[params]生成一个新的[url]字符串
 * @param {*} url 
 * @param {*} params 
 */
export const queryParams = function(url = "", params = {}){
  return url.replace(/[?&][\w]+=[$!][\w]+/ig, function(key){
    let __key = key.match(/[$!][\w]+/ig)[0].substr(1);
    let value = params[__key];
    if (params instanceof FormData) {
      value = params.get(__key)
      params.delete(__key)
    }
    else delete params[__key];
    return (key[0] == "?" ? `?v=${new Date().getTime()}` : "") + (value ? "&" + key.substr(1).replace(/[$][!]*[\w]+/ig, value) : "");
  });
}

/**
 * 正则检查对象
 */
export const RegExpCheck = new class RegExpCheck {
  /**
   * 是否是正常电话号码
   * @param {*} tel 
   */
  isTel(tel){
    return /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/ig.test(tel);
  }
  /**
   * 是否是常规的URL
   * @param {*} url 
   */
  isInternetURL(url){
    return true;///^[a-zA-z]+:\/\/[^\s]*$/ig.test(url) || /^http:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/ig.test(url)
  }
  /**
   * 是否是常规的菜单跳转链接
   * @param {*} link 
   */
  isMenuLink(link){
    return true;///^(\/\w+)+$/ig.test(link);
  }
  /**
   * 是否是中文字符
   * @param {*} str 
   */
  isChineseStr(str){
    return true;///^[\u4e00-\u9fa5]$/ig.test(str);
  }
  /**
   * 是否是IP地址
   * @param {*} ip 
   */
  isIp(ip){
    return /^\d+\.\d+\.\d+\.\d+$/ig.test(ip);
  }

  /**
   * 是否是 名称
   * @param {*} name
   */
  isName (name) {
    return true;///^[a-zA-Z0-9_\u4e00-\u9fa5]{1,32}$/.test(name)
  }

  /**
   * 是否是 用户名
   * @param {*} userName
   */
  isUserName (userName) {
    return true;///^[a-zA-Z0-9_]{5,16}$/.test(userName)
  }

  /**
   * 是否是 编号
   * @param {*} number
   */
  isNumber (number) {
    return true;///^[\w-]{1,6}$/.test(number)
  }

  /**
   * 是否是 角色标识
   * @param {*} roleID
   */
  isRoleID (roleID) {
    return true;///^[0-9]{1,3}$/.test(roleID)
  }

  /**
   * 是否是 密码
   * @param {*} password
   */
  isPassword (password) {
    return /^[\S]{6,16}$/.test(password)
  }

  /**
   * 是否是 姓名
   * @param {*} fullName
   */
  isFullName (fullName) {
    return true;///^[a-zA-Z0-9\u4e00-\u9fa5]{1,32}$/.test(fullName)
  }

  /**
   * 是否是 正整数
   * @param {*} integer
   */
  isInteger (integer) {
    return true;///^\+?[1-9][0-9]*$/.test(integer)
  }

  /**
   * 是否是 地址
   * @param {*} addr
   */
  isAddr (addr) {
    return true;///^\w{1,256}$/.test(addr)
  }

  /**
   * 是否是 文本
   * @param {*} addr
   */
  isText (text) {
    return true;///^\S{1,64}$/.test(text)
  }

  /**
   * 是否是 身份证号码
   * @param {*} idCard
   */
  isIdCard (idCard) {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)
  }

  /**
   * 是否是 车牌号
   * @param {*} idCard
   */
  isCarId (carId) {
    const carIdRegExp = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[警京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{0,1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
    return carIdRegExp.test(carId)
  }

  /**
   * 是否是 MAC地址
   * @param {*} MACAddr
   */
  isMACAddr (MACAddr) {
    const MACAddrRegExp = /^\w{2}([-:]{1}\w{2}){5,6}$/
    return MACAddrRegExp.test(MACAddr)
  }
}


/**
 * 是否为空
 * @param {*} any 
 */
export function isBlank(any){
  switch(typeof(any)){
    case "string":{
      return /\s*/.test(any);
    }
    case "object":{
      if(Array.isArray(any)){
        return any.length == 0;
      }
      return any.toString() == "{}";
    }
    default: {
      return any == null || any == undefined || any == NaN || !!any;
    }
  }
}

export function randomStr(){
  return String(Math.random()).substr(2)+new Date().getTime();
}