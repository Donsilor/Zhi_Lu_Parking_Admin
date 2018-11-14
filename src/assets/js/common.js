

import $ from 'jquery';
import XLSX from 'xlsx';
/**
 * 数组转对象
 * @param {*} arr 
 * @param {*} key 
 */
export const array2Object = function (arr = [], key = "id") {
  let result = {};
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
 * 解析 Excel 表格文件
 * @param {*} file 文件
 * @param {*} header 要获取列标识，字段数组
 */
export const importExcel = function(file, header){
  return new Promise(resolve => {
    let reader = new FileReader();
    reader.onload = function (e) {
      let binary = "";
      let bytes = new Uint8Array(e.target.result);
      let length = bytes.byteLength;
      for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      /* read workbook */
      var wb = XLSX.read(binary, {type: 'binary'});
      let data = {};
      for(let name of wb.SheetNames){
        data[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], {header:header});
      }
      resolve(data);
    }
    reader.readAsArrayBuffer(file);
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
    return /^[a-zA-z]+:\/\/[^\s]*$/ig.test(url) || /^http:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/ig.test(url)
  }
  /**
   * 是否是常规的菜单跳转链接
   * @param {*} link 
   */
  isMenuLink(link){
    return /^(\/\w+)+$/ig.test(link);
  }
  /**
   * 是否是中文字符
   * @param {*} str 
   */
  isChineseStr(str){
    return /^[\u4e00-\u9fa5]$/ig.test(str);
  }
  /**
   * 是否是IP地址
   * @param {*} ip 
   */
  isIp(ip){
    return /^\d+\.\d+\.\d+\.\d+$/ig.test(ip);
  }

}