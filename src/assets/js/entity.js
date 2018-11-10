


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




