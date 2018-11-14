
import {queryParams,array2Descendants} from "./common";
import XLSX from 'xlsx';

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

  get project_id(){
    return this.__info.project_id;
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
export const DataDictionary = class DataDictionary {
  constructor(api){
    this.$api = api;
    this.dictionary = {};
  }
  async ins(){
    let response = await this.$api.dictionary
    .getlist(new RequestParams()
    .addAttribute("project_id", User.info.project_id)
    .addAttribute("page_size", 10000000)
    .addAttribute("page_index", 1));
    
    for(let item of response.dataItems.map(o => o.attributes)){
      if(!this.dictionary[item.dic_key]){
        this.dictionary[item.dic_key] = {};
      }
      this.dictionary[item.dic_key][item.dic_code] = item;
    }
    return this.dictionary;
  }
}

/**
 * 菜单资源对象
 * @param {*} api 
 */
export const ResourceMenu = class ResourceMenu {
  
  constructor(api){
    this.$api = api;
    this.resourceMenus = [];
  }

  async ins(){
    let response = await this.$api.menu
    .getlist(new RequestParams()
    .addAttribute("page_index", 1)
    .addAttribute("page_size", 1000000));
    return this.resourceMenus = array2Descendants(response.dataItems.map((o,i) => (o.attributes.index = i,o.attributes)));
  }

}

/**
 * 导出 Excel 表格数据到文件
 */
export const ExcelSheets = class ExcelSheets {
  
  constructor(){
    this.sheets = {};
  }
  /**
   * 添加工作蒲
   * @param {*} name 工作铺名称
   */
  addSheet(name){
    if(!this.sheets[name]){
      this.sheets[name] = [];
    }
    return this;
  }

  /**
   * 添加表格一行数据
   * @param {*} sheetName 添加到哪个工作簿下
   * @param {*} row 数据对象，以[KEY]作为标题
   */
  addRow(sheetName, row){
    this.sheets[sheetName].push(row);
    return this;
  }
  /**
   * 批量添加数据行
   * @param {*} sheetName 工作部名称
   * @param {*} rows 数据列表
   */
  addRows(sheetName, rows){
    this.sheets[sheetName] = this.sheets[sheetName].concat(rows);
    return this;
  }

  /**
   * 导出数据到文件
   * 导出数据会自动以对象的[Key]为标题
   * 导出直接下载
   * @param {*} filename 文件名称不带后缀
   */
  exportExcel(filename){
    const wb = XLSX.utils.book_new();
    for(let sheetName in this.sheets){
      const ws = XLSX.utils.json_to_sheet(this.sheets[sheetName]);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    }
    XLSX.writeFile(wb, filename + ".xlsx");
  }
  
  empty(){
    this.sheets = {};
    return this;
  }

}
/**
 * 网络对象
 * 目前可以获取本地的网络IP地址
 * ips[0]
 */
export const Network = new class Network {
  constructor(){
    function loadNetworkIps(){
      return new Promise(resolve=>{
          var ip_dups = {};    
          //compatibility for firefox and chrome    
          var RTCPeerConnection = window.RTCPeerConnection    
              || window.mozRTCPeerConnection    
              || window.webkitRTCPeerConnection;    
          var useWebKit = !!window.webkitRTCPeerConnection;    
          //bypass naive webrtc blocking using an iframe    
          if(!RTCPeerConnection){    
              //NOTE: you need to have an iframe in the page right above the script tag    
              //    
              //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>    
              //<script>...getIPs called in here...    
              var iframe = document.createElement("iframe");
              iframe.sandbox = "allow-same-origin";
              var win = iframe.contentWindow;    
              RTCPeerConnection = win.RTCPeerConnection    
                  || win.mozRTCPeerConnection    
                  || win.webkitRTCPeerConnection;    
              useWebKit = !!win.webkitRTCPeerConnection;    
          }    
          //minimal requirements for data connection    
          var mediaConstraints = {    
              optional: [{RtpDataChannels: true}]    
          };    
          var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};    
          //construct a new RTCPeerConnection    
          var pc = new RTCPeerConnection(servers, mediaConstraints);    
          function handleCandidate(candidate){    
              //match just the IP address    
              var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/    
              var ip_addr = ip_regex.exec(candidate)[1];    
              //remove duplicates    
              ip_dups[ip_addr] = true;
          }
          //listen for candidate events    
          pc.onicecandidate = function(ice){    
              //skip non-candidate events    
              if(ice.candidate)    
                  handleCandidate(ice.candidate.candidate);    
          };    
          //create a bogus data channel    
          pc.createDataChannel("");    
          //create an offer sdp    
          pc.createOffer(function(result){    
              //trigger the stun server request    
              pc.setLocalDescription(result, function(){}, function(){});    
          }, function(){});    
          //wait for a while to let everything done    
          setTimeout(function(){    
              //read candidate info from local description    
              var lines = pc.localDescription.sdp.split('\n');    
              lines.forEach(function(line){
                  if(line.indexOf('a=candidate:') === 0)    
                      handleCandidate(line);    
              });
              resolve(Object.keys(ip_dups));
          }, 1000);    
      });
    }
    
    loadNetworkIps().then(ips=>this.ips = ips);
  }
}
