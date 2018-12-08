
import { queryParams, array2Descendants } from "./common";
import XLSX from 'xlsx';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import moment from "moment";
import Vue from "Vue";
import { MRLI_DEVICE_SOCKET_URL } from "./constants"

export const CentralInterface = new Vue();

export const RequestDataItem = class RequestDataItem {

  constructor(obj = {}) {
    this.attributes = {};
    this.objectId = "";
    this.subItems = [];

    this.addAttribute("project_id", User.info.project_id);
    this.addAttribute("user_id", User.info.id);
    this.addAttribute("operator_id", User.info.id);
    $.extend(this, obj);
  }

  addAttributes(objs) {
    for (let key in objs) {
      this.addAttribute(key, objs[key]);
    }
    return this;
  }

  addAttribute(name, value) {
    if (!!value || typeof value == "number") {
      this.attributes[String(name).trim()] = String(value).trim();
    }
    else delete this.attributes[String(name).trim()];
    return this;
  }

  addSubItem(obj) {
    this.subItems.push(obj);
    return this;
  }

  addSubItems(objs) {
    for (let item of objs) {
      this.addSubItem(item);
    }
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

    this.addAttribute("project_id", User.info.project_id);
    this.addAttribute("operator_id", User.info.id);
    this.addAttribute("user_id", User.info.id);

    $.extend(this, obj);
  }

  getJsonParams() {
    if (User.isSystemAdmin) {
      let asp = this.serviceId.split(".")[1];
      if (asp == "getlist") {
        delete this.attributes["project_id"];
        for (let item of this.dataItems) {
          delete item["project_id"];
        }
      }
    }
    return this;
  }

  addAttributes(objs) {
    for (let key in objs) {
      this.addAttribute(key, objs[key]);
    }
    return this;
  }

  addAttribute(name, value) {
    if (!!value || typeof value == "number") {
      this.attributes[String(name).trim()] = String(value).trim();
    }
    else delete this.attributes[String(name).trim()];
    return this;
  }

  addDataItem(requestDataItem) {
    this.dataItems.push(requestDataItem);
    return this;
  }

  addDataItems(requestDataItems) {
    this.dataItems = this.dataItems.concat(requestDataItems);
    return this;
  }

  addDataItemAttr(index, key, value) {
    let dataItem = this.dataItems[index];
    if (dataItem) {
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

  constructor(obj = {}, code = 1) {

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
    if (typeof (obj) == 'string') {
      this.message = obj;
      this.resultCode = code;
    }
    else $.extend(this, obj);
  }
}


export const MrLIDeviceSocket = class MrLIDeviceSocket {

  /**闸机状态 */
  static GATE_STATE = {
    /**已开闸 */
    GATE_STATE_OPEN: 0,
    /**确认开闸 */
    GATE_STATE_CONFIRM: 1,
    /**重复入场 */
    GATE_STATE_IN_REPEAT: 2,
    /**无入场记录 */
    GATE_STATE_NO_RECORD: 3,
    /**需要收费 */
    GATE_STATE_CHARGE: 4,
    /**支付成功 */
    GATE_STATE_PAY_SUCCESS: 5,
    /**支付失败 */
    GATE_STATE_PAY_FILE: 6
  }

  /**操作类型 */
  static WS_OPERATE_TYPES = {
    /**确认入场 */
    CONFIRMINPARK: "confirminpark",
    /**确认出场 */
    CONFIRMOUTPARK: "confirmoutpark",
    /**车辆入场 */
    INPARK: "inpark",
    /**车辆出场 */
    OUTPARK: "outpark",
    /**开闸 */
    OPENBRAKE: "openBrake"
  }

  constructor(url = MRLI_DEVICE_SOCKET_URL) {
    this._url = url;
    this._devices = {};
    this._timer_id = 0;
  }

  _timer() {
    try {
      /**
       * 检验是否在线
       */
      this._stompClient.send("live");
    } catch (error) {
      /**
       * 断开重连
       */
      this.connection();
    }
  }

  _stopTimer() {
    clearInterval(this._timer_id);
  }

  addDeviceEventListener(deviceId = "", callBack = o => console.log(o), thatObj) {
    if (!this._devices[deviceId]) {
      this._devices[deviceId] = callBack.bind(thatObj || this);
    }
    return this;
  }

  sendMsg(deviceId = "", ws_operate_type = "", callBack = () => { }) {
    let data = {
      'ws_operate_type': ws_operate_type,
      'device_id': deviceId,
      'operator_id': User.info.id
    }
    this._stompClient.send("/ws-push/welcome", {}, JSON.stringify(data))
    callBack && callBack.bind && callBack();
    return this;
  }

  connection() {
    this._stopTimer();
    // 建立连接对象
    let socket = new SockJS(this._url);
    // 获取STOMP子协议的客户端对象
    this._stompClient = Stomp.over(socket);
    // 定义客户端的认证信息,按需求配置
    let headers = {}
    // 向服务器发起websocket连接
    this._stompClient.connect(headers, () => {
      this._timer_id = setInterval(this._timer.bind(this), 5000);
      for (let id in this._devices) {
        this._stompClient.subscribe(`/device/${id}/msg`, response => {
          let data = {};
          try {
            response.body = JSON.parse(response.body);
            if (response.body.responseMessage) {
              response.body.responseMessage = JSON.parse(response.body.responseMessage);
              data = response.body.responseMessage;
            }
            else data = response.body;
          }
          catch (error) {
            data = response
          }
          this._devices[id](data);
        }, headers);
      }
    }, (err) => this.connection());

    // this._stompClient.debug = false;
    return this;
  }
  /**
   * 断开链接
   */
  disconnect() {
    if (this._stompClient) {
      this._stopTimer();
      this._stompClient.disconnect();
    }
    return this;
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

  get project_id() {
    return this.isSystemAdmin ? null : this.__info.project_id;
  }

  get isSystemAdmin() {
    return 3 == this.__info.user_type;
  }

  get info() {
    return this.__info;
  }
  set info(v) {
    v.login_time = moment().format("YYYY-MM-DD HH:mm:ss")
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
  constructor(api) {
    this.$api = api;
    this.dictionary = {};
  }
  async ins() {
    let response = await this.$api.dictionary
      .getlist(new RequestParams()
        .addAttribute("project_id", User.project_id)
        .addAttribute("page_size", -1));

    for (let item of response.dataItems.map(o => o.attributes)) {
      if (!this.dictionary[item.dic_key]) {
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

  constructor(api) {
    this.$api = api;
    this.resourceMenus = [];
  }

  async ins() {
    let response = await this.$api.menu
      .getlist(new RequestParams()
        .addAttribute("user_id", User.info.id)
        .addAttribute("page_size", -1)
      )
    return this.resourceMenus = array2Descendants(response.dataItems.map((o, i) => (o.attributes.index = i, o.attributes)));
  }

}

/**
 * 导出 Excel 表格数据到文件
 */
export const ExcelSheets = class ExcelSheets {




  static get dictionary() {
    return {
      房屋列表: {
        code: "房屋编号",
        courtyard: "庭院",
        building: "楼栋",
        units: "单元",
        room_no: "房号",
        remark: "备注",
      },
      住户列表: {
        house_code: "房屋编号",
        code: "住户编号",
        full_name: "姓名",
        sex: "性别",
        household_type: "住户类型",
        tel: "电话号码",
        identification_no: "证件号码",
        addr: "证件地址",
        birthday: "出生日期",
        remark: "备注",
      },
      车辆列表: {
        household_code: "住户编号",
        car_no: "车牌号",
        car_brand: "品牌",
        car_mode: "型号",
        car_color: "颜色",
        remark: "车辆备注",
      },
      月卡续费: {
        car_no: "车牌号",
        amount: "收费金额",
        pay_mode: "支付方式",
        old_end_time: "旧有效期至",
        new_end_time: "新有效期至",
        source: "来源",
        remark: "备注",
      },
      日志管理: {
        id: "ID",
        project_id: "项目ID",
        operator_id: "操作员ID",
        user_name: "操作员",
        resource_id: "资源ID",
        resource_name: "资源",
        content: "操作内容",
        operator_time: "操作时间",
        remark: "备注",
      },
      车位列表: {
        car_place_no: "车位号",
        car_group_id: "车位组ID",
      }
    };
  }

  constructor() {
    this.sheets = {};
  }
  /**
   * 添加工作蒲
   * @param {*} name 工作铺名称
   */
  addSheet(name) {
    if (!this.sheets[name]) {
      this.sheets[name] = {
        rows: [],
        headers: []
      };
    }
    return this;
  }

  setSheetHeader(name, headers) {
    this.addSheet(name);
    this.sheets[name].headers = headers;
    return this;
  }

  /**
   * 添加表格一行数据
   * @param {*} sheetName 添加到哪个工作簿下
   * @param {*} row 数据对象，以[KEY]作为标题
   */
  addRow(sheetName, row) {
    this.sheets[sheetName].rows.push(row);
    return this;
  }
  /**
   * 批量添加数据行
   * @param {*} sheetName 工作部名称
   * @param {*} rows 数据列表
   */
  addRows(sheetName, rows) {
    if (!Array.isArray(rows)) return new Error("addRows(sheetName, rows[必须是数组])");
    for (let row of rows) {
      this.addRow(sheetName, row);
    }
    return this;
  }

  /**
   * 导出数据到文件
   * 导出数据会自动以对象的[Key]为标题
   * 导出直接下载
   * @param {*} filename 文件名称不带后缀
   */
  exportExcel(filename) {
    const wb = XLSX.utils.book_new();
    for (let sheetName in this.sheets) {
      let header = null;
      if (this.sheets[sheetName]) if (this.sheets[sheetName].headers.length) {
        header = this.sheets[sheetName].headers
      }
      const ws = XLSX.utils.json_to_sheet(this.sheets[sheetName].rows, header);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    }
    XLSX.writeFile(wb, filename + ".xlsx");
  }

  /**
   * 解析 Excel 表格文件
   * @param {*} file 文件
   */
  importExcel(file) {
    return new Promise(resolve => {
      let reader = new FileReader();
      reader.onload = (e => {
        let binary = "";
        let bytes = new Uint8Array(e.target.result);
        let length = bytes.byteLength;
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        /* read workbook */
        var wb = XLSX.read(binary, { type: 'binary' });
        let data = {};
        for (let name of wb.SheetNames) {
          let header = 2;
          if (this.sheets[name]) if (this.sheets[name].headers.length) {
            header = this.sheets[name].headers
          }
          data[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: header }).slice(2);
        }
        resolve(data);
      }).bind(this);
      reader.readAsArrayBuffer(file);
    });
  }


  empty() {
    this.sheets = {};
    return this;
  }

}
/**
 * 网络对象
 * 目前可以获取本地的网络IP地址
 * ips[0]
 */
export const Network = class Network {
  constructor() {
    this.__ips = [];
    var that = this;

    var RTCPeerConnection = window.RTCPeerConnection
      || window.mozRTCPeerConnection
      || window.webkitRTCPeerConnection;
    var mediaConstraints = {
      optional: [{ RtpDataChannels: true }]
    };
    var servers = undefined;
    //add same stun server for chrome  
    if (window.webkitRTCPeerConnection) servers = { iceServers: [{ urls: "stun:stun.services.mozilla.com" }] };
    //construct a new RTCPeerConnection  
    var pc = new RTCPeerConnection(servers, mediaConstraints);
    //listen for candidate events  
    pc.onicecandidate = function (ice) {
      //skip non-candidate events  
      if (ice.candidate) {
        //match just the IP address  
        var ip_addr = (/([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(ice.candidate.candidate)||[])[1];
        //remove duplicates  
        if (ip_addr) that.__ips.push(ip_addr)
      }
    };
    //create a bogus data channel  
    pc.createDataChannel("");
    //create an offer sdp  
    pc.createOffer(function (result) {
      //trigger the stun server request  
      pc.setLocalDescription(result, function () { });
    }, function () { });
  }

  get ips() {
    return this.__ips;
  }
}
