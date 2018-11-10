

import $ from 'jquery';
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

/**用户数据管理 */
export const User = new class User {

  constructor() {
    this.__info = $.extend({
      create_time: null,
      dept_id: null,
      full_name: null,
      id: null,
      password: null,
      photo: null,
      project_id: null,
      remark: null,
      status: null,
      tel: null,
      update_time: null,
      user_name: null,
      user_type: null
    }, JSON.parse(localStorage.getItem("UserInfo") || "{}"));
  }

  get info() {
    return this.__info;
  }
  set info(v) {
    localStorage.setItem("UserInfo", JSON.stringify(this.__info = v));
  }
  empty() {
    this.info.id = null;
    this.info = this.info;
  }
};
