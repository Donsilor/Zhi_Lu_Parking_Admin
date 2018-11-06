

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
 */
export const array2Descendants = function (arr = [], idKey = "id", pidKey = "pid") {
  let objs = {};
  for (let item of arr) {
    let id = item[idKey], pid = item[pidKey];

    /**初始化所有人 */
    if (!(id in objs)) {
      objs[id] = item;
      objs[id]["childrens"] = {};
    }

    for (let itemId in objs) {
      /**找到孩子 */
      if (pid == itemId) {
        objs[itemId]["childrens"][id] = objs[id];
      }
      /**找到父亲 */
      else if (id == objs[itemId][pidKey]) {
        objs[id]["childrens"][itemId] = objs[itemId];
      }
    }
  }
  /**找出所有的终极父亲 */
  let results = {};
  for (let itemId in objs) {
    if (!(objs[itemId][pidKey] in objs)) {
      results[itemId] = objs[itemId];
    }
  }
  return results;
}

/**用户数据管理 */
export const User = new class User {

  constructor(){
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
    },JSON.parse(localStorage.getItem("UserInfo") || "{}"));
  }

  get info(){
    return this.__info;
  }
  set info(v){
    localStorage.setItem("UserInfo", JSON.stringify(this.__info = v));
  }
  empty(){
    this.info.id = null;
    this.info = this.info;
  }
};
