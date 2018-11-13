
import {queryParams} from "./common";

export const RequestDataItem = class RequestDataItem {

  constructor(obj = {}) {
    this.attributes = {};
    this.objectId = "";
    this.subItems = [];

    $.extend(this, obj);
  }

  addAttributes(objs){
    for(let key in objs){
      this.addAttribute(key, objs[key]);
    }
    return this;
  }

  addAttribute(name, value) {
    if (!!value || typeof value == "number") {
      this.attributes[name] = value;
    }
    return this;
  }

  addSubItem(obj) {
    this.subItems.push(obj);
    return this;
  }
}

export const RequestParams = class RequestParams {

  constructor(obj = {}) {
    /**附带属性 */
    this.attributes = {};
    this.seqId = "";
    /**业务规则ID，按业务规范命名进行设置； */
    this.serviceId = "";
    /**业务对象列表； */
    this.dataItems = [];

    $.extend(this, obj);
  }

  addAttributes(objs){
    for(let key in objs){
      this.addAttribute(key, objs[key]);
    }
    return this;
  }

  addAttribute(name, value) {
    if (!!value || typeof value == "number") {
      this.attributes[name] = value;
    }
    return this;
  }

  addDataItem(requestDataItem) {
    this.dataItems.push(requestDataItem);
    return this;
  }

  addDataItems(requestDataItems){
    this.dataItems = this.dataItems.concat(requestDataItems);
    return this;
  }

  addDataItemAttr(index, key, value){
    let dataItem = this.dataItems[index];
    if(dataItem){
      dataItem.addAttribute(key, value);
    }
    else {
      dataItem = new RequestDataItem();
      dataItem.addAttribute(key, value);
      this.dataItems.push(dataItem)
    }
    return this;
  }

}

export const ResponseBody = class ResponseBody {

  constructor(obj = {}) {

    /**附加属性； */
    this.attributes = {};
    /**返回的业务对象列表； */
    this.dataItems = [];
    /**resultCode对应的消息描述 */
    this.message = "";
    /**0：成功 1：失败  */
    this.resultCode = 0;
    this.seqId = "";
    /**业务规则ID，按业务规范命名进行设置； */
    this.erviceId = "";

    $.extend(this, obj);
  }
}

/**
 * 自定义的 WebSocket
 * @param {*} url 地址支持 $协议
 * @param {*} params 参数
 */
export const MrLIWebSocket = class MrLIWebSocket {

  static get ONCLOSE(){return "ONCLOSE";}
  static get ONERROR(){return "ONERROR";}
  static get ONMESSAGE(){return "ONMESSAGE";}
  static get ONOPEN(){return "ONOPEN";}

  constructor(url = "", params = {}){
    this.__webSocket = new WebSocket(queryParams(url, params));
  }
  /**
   * 发送消息
   * @param {*} message 
   */
  send(message){
    this.__webSocket.send(message);
  }
  /**
   * 关闭链接
   */
  close(){
    this.__webSocket.close();
  }
  /**
   * 绑定灰调方法
   * @param {*} type 方法类型
   * @param {*} callBack 回掉函数
   * @param {*} that 作用域
   */
  addEventListener(type, callBack, that){
    switch(type){
      case "ONCLOSE":{ 
        this.__webSocket.onclose = function(data){
          callBack.call(that || this, data);
        }
        break;
      }
      case "ONERROR":{ 
        this.__webSocket.onerror = function(data){
          callBack.call(that || this, data);
        }
        break;
      }
      case "ONOPEN":{ 
        this.__webSocket.onopen = function(data){
          callBack.call(that || this, data);
        }
        break;
      }
      case "ONMESSAGE":{ 
        this.__webSocket.onmessage = function(data){
          callBack.call(that || this, data);
        }
        break;
      }
      default: break;
    }
  }
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
      /**((0普通账号1项目管理员2系统普通账号3系统管理员) 由系统自动生成，不能手工选择) */
      user_type: null
    }, JSON.parse(localStorage.getItem("UserInfo") || "{}"));
  }

  get isSystemAdmin(){
    return 3 == this.__info.user_type;
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

/**
 * 数据字典
 * @param {*} api 
 */
export const DATA_DICTIONARY = class DATA_DICTIONARY {
  constructor(api){
    this.$api = api;
    this.dictionary = {};
  }
  async loadData(){
    return await this.$api.dictionary
    .getlist(new RequestParams()
    .addAttribute("project_id", User.info.project_id)
    .addAttribute("page_size", 10000000)
    .addAttribute("page_index", 1))
  }
  async ins(){
    await this.loadData().then(response => {
      for(let item of response.dataItems.map(o => o.attributes)){
        if(!this.dictionary[item.dic_key]){
          this.dictionary[item.dic_key] = {};
        }
        this.dictionary[item.dic_key][item.dic_code] = item;
      }
    })
    .catch(response => console.log(response.message));
    return this.dictionary;
  }
}

