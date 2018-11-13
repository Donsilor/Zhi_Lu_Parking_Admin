

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
 * @param {*} header 要获取列标识
 */
export const exportExcel = async function(file, header){
  
  let binary = await new Promise(resolve => {
    let reader = new FileReader();
    reader.onload = function (e) {
      let binarys = "";
      let bytes = new Uint8Array(e.target.result);
      let length = bytes.byteLength;
      for (let i = 0; i < length; i++) {
        binarys += String.fromCharCode(bytes[i]);
      }
      resolve(binarys);
    }
    reader.readAsArrayBuffer(file);
  });

  /* read workbook */
  var wb = XLSX.read(binary, {type: 'binary'});
  let data = {};
  for(let name of wb.SheetNames){
    data[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], {header:header});
  }
  return data;
}
