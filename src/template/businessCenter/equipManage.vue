<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="add-department blu-button" @click="showEditDevice(null)">+新增</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="cominput fl">
          <span class="conditions-text" >车场区域：</span>
          <input type="text" placeholder="请输入设备编号或者设备名称" v-model="searchParam">
          <button @click="loadDeviceDatas()" class="search-button blu-button fl">搜索</button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="tab">
        <div class="equipInfoTable">
          <div class="tr level1_ths">
            <div class="th"></div>
            <div class="th">设备编号</div>
            <div class="th">设备名称</div>
            <div class="th">所属区域</div>
            <div class="th">设备类型</div>
            <div class="th">IP地址</div>
            <div class="th">MAC地址</div>
            <div class="th">创建时间</div>
            <div class="th">更新时间</div>
            <div class="th">操作员</div>
            <div class="th">操作</div>
          </div>
          <div class="level1_item" v-for="(device, index) in devices.tree" v-bind:key="index">
            <div class="tr level1_itemTable">
              <div class="td"><a href="javascript:" class="toggleBtn" @click="device.isShowChildren = !device.isShowChildren, pucker = !pucker" :pucker="pucker" >+</a></div>
              <div class="td">
                <div class="tr level1_dataItem">
                  <div class="td" :title="device.device_code">{{device.device_code||"&nbsp;"}}</div>
                  <div class="td" :title="device.device_name">{{device.device_name||"&nbsp;"}}</div>
                  <div class="td">{{device.area_name}}</div>
                  <div class="td" :title="device.device_type">{{/*设备类型(WORKS：工作站 INLET：入口　OUTLET：出口 CAMERA：摄像头 LED：LED显示屏 HORN：喇叭
                    BARRIERGATE：道闸,从数据字典获取，有层级关系，工作站为第一层，出入口为第二层，其他设备为第三层)*/
                    {WORKS:"工作站",INLET:"入口",OUTLET:"出口",CAMERA:"摄像头",LED:"LED显示屏",HORN:"喇叭",BARRIERGATE:"道闸"}[device.device_type]
                  }}</div>
                  <div class="td" :title="device.device_ip">{{device.device_ip||"&nbsp;"}}</div>
                  <div class="td" :title="device.device_mac">{{device.device_mac||"&nbsp;"}}</div>
                  <div class="td" :title="device.create_time">{{device.create_time||"&nbsp;"}}</div>
                  <div class="td" :title="device.update_time">{{device.update_time||"&nbsp;"}}</div>
                  <div class="td" :title="device.user_name">{{device.user_name||"&nbsp;"}}</div>
                  <div class="td">
                    <a href="javascript:" @click="showEditDevice(device)">编辑</a>
                    <a href="javascript:" @click="delDevice(device)">删除</a>
                  </div>
                </div>
                <div class="tr level1_toggleTable" v-show="device.isShowChildren && device.children.length">
                  <div class="tr level2_ths">
                    <div class="th"></div>
                    <div class="th">设备编号</div>
                    <div class="th">设备名称</div>
                    <div class="th">设备类型</div>
                    <div class="th">IP地址</div>
                    <div class="th">MAC地址</div>
                    <div class="th">开闸方式</div>
                    <div class="th">加载参数</div>
                    <div class="th">创建时间</div>
                    <div class="th">更新时间</div>
                    <div class="th">操作员</div>
                    <div class="th">操作</div>
                  </div>
                  <div class="tr level2_item" v-for="(device_, index_) in device.children" v-bind:key="index_">
                    <div class="tr level2_itemTable">
                      <div
                        class="td"><a href="javascript:" class="toggleBtn" @click="device_.isShowChildren = !device_.isShowChildren, pucker = !pucker" :pucker="pucker">+</a></div>
                      <div class="td">
                        <div class="tr level2_dataItem">
                          <div class="td" :title="device_.device_code">{{device_.device_code||"&nbsp;"}}</div>
                          <div class="td" :title="device_.device_name">{{device_.device_name||"&nbsp;"}}</div>
                          <div class="td">{{/*设备类型(WORKS：工作站 INLET：入口　OUTLET：出口 CAMERA：摄像头 LED：LED显示屏 HORN：喇叭 BARRIERGATE：道闸,从数据字典获取，有层级关系，工作站为第一层，出入口为第二层，其他设备为第三层)*/
                            {WORKS:"工作站",INLET:"入口",OUTLET:"出口",CAMERA:"摄像头",LED:"LED显示屏",HORN:"喇叭",BARRIERGATE:"道闸"}[device_.device_type]
                          }}</div>
                          <div class="td" :title="device_.device_ip">{{device_.device_ip||"&nbsp;"}}</div>
                          <div class="td" :title="device_.device_mac">{{device_.device_mac||"&nbsp;"}}</div>
                          <div class="td">{{[/*开闸方式(0无1自动开闸2确认开闸)*/"无","自动开闸","确认开闸"][device_.cut_off_mode]}}</div>
                          <div class="td" :title="device_.load_para">{{device_.load_para || "无"}}</div>
                          <div class="td" :title="device_.create_time">{{device_.create_time||"&nbsp;"}}</div>
                          <div class="td" :title="device_.update_time">{{device_.update_time||"&nbsp;"}}</div>
                          <div class="td" :title="device_.user_name">{{device_.user_name||"&nbsp;"}}</div>
                          <div class="td">
                            <a href="javascript:" @click="showEditDevice(device_)">编辑</a>
                            <a href="javascript:" @click="delDevice(device_)">删除</a>
                          </div>
                        </div>
                        <div class="tr level2_toggleTable" v-show="device_.isShowChildren && device_.children.length">
                          <div class="tr level3_ths">
                            <div class="th">设备编号</div>
                            <div class="th">设备名称</div>
                            <div class="th">设备类型</div>
                            <div class="th">IP地址</div>
                            <div class="th">MAC地址</div>
                            <div class="th">加载参数</div>
                            <div class="th">创建时间</div>
                            <div class="th">更新时间</div>
                            <div class="th">操作员</div>
                            <div class="th">操作</div>
                          </div>
                          <div class="tr level3_item" v-for="(device__, index__) in device_.children" v-bind:key="index__">
                            <div class="tr level3_itemTable">
                              <div class="td">
                                <div class="tr level3_dataItem">
                                  <div class="td" :title="device__.device_code">{{device__.device_code||"&nbsp;"}}</div>
                                  <div class="td" :title="device__.device_name">{{device__.device_name||"&nbsp;"}}</div>
                                  <div class="td">{{/*设备类型(WORKS：工作站 INLET：入口　OUTLET：出口 CAMERA：摄像头 LED：LED显示屏 HORN：喇叭 BARRIERGATE：道闸,从数据字典获取，有层级关系，工作站为第一层，出入口为第二层，其他设备为第三层)*/
                                    {WORKS:"工作站",INLET:"入口",OUTLET:"出口",CAMERA:"摄像头",LED:"LED显示屏",HORN:"喇叭",BARRIERGATE:"道闸"}[device__.device_type]
                                  }}</div>
                                  <div class="td" :title="device__.device_ip">{{device__.device_ip||"&nbsp;"}}</div>
                                  <div class="td" :title="device__.device_mac">{{device__.device_mac||"&nbsp;"}}</div>
                                  <div class="td" :title="device__.load_para">{{device__.load_para||"&nbsp;"}}</div>
                                  <div class="td" :title="device__.create_time">{{device__.create_time||"&nbsp;"}}</div>
                                  <div class="td" :title="device__.update_time">{{device__.update_time||"&nbsp;"}}</div>
                                  <div class="td" :title="device__.user_name">{{device__.user_name||"&nbsp;"}}</div>
                                  <div class="td">
                                    <a href="javascript:" @click="showEditDevice(device__)">编辑</a>
                                    <a href="javascript:" @click="delDevice(device__)">删除</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <Pagination
        :previousPage="loadDeviceDatas"
        :nextPage="loadDeviceDatas"
        :skipPage="loadDeviceDatas"
        :pageIndex="devices.attributes.page_index"
        :totalPages="devices.attributes.total_pages"
        :pageSize="devices.attributes.page_size"
        :tatal="devices.attributes.tatal"
      ></Pagination> -->
    </div>
    <!--弹窗-->
    <div class="main" v-if="ifEditInfo">
      <div class="depwd" v-drag.cursor="'#EditInfo'">
        <div class="top-nav" id="EditInfo">
          <p class="t-text fl">{{deviceData.id ? "修改设备" : "新增设备"}}</p>
          <p class="close fr" @click="ifEditInfo = false">x</p>
        </div>
        <div class="bot">
          <p class="red" hidden><i class="iconfont icon-jian-tianchong"></i>错误提示的文案<span>x</span></p>
          <div class="cet">
            <div class="clf">
              <p class="clf" >
                <span class="fl">设备编号：</span>
                <input class="fl" type="text" v-bind:disabled="!!deviceData.id" placeholder="请输入编号，必填" v-model="deviceData.temp_device_code">
              </p>
              <p class="clf">
                <span class="fl">设备名称：</span>
                <input class="fl" type="text" placeholder="请输入" v-model="deviceData.temp_device_name">
              </p>
              <p class="clf">
                <span class="fl">设备类型：</span>
                <select v-model="deviceData.temp_device_type">
                  <option  v-for='(device, index) in {
                    WORKS:"工作站",INLET:"入口",OUTLET:"出口",CAMERA:"摄像头",LED:"LED显示屏",HORN:"喇叭",BARRIERGATE:"道闸"
                  }' v-bind:key="index" :value="index">{{device}}</option>
                </select>
              </p>
              <p class="clf" v-show="deviceData.temp_device_type != 'WORKS'">
                <span class="fl">{{
                    {OUTLET:1,INLET:1}[deviceData.temp_device_type] ? "所属工作站" : "所属设备"
                  }}：</span>
                <select v-model="selectedParentIndex" @change="deviceData.area_id = selectedParentIndex.area_id">
                  <option  v-for="(device, index) in devices.dataItems.filter(o=>{
                    return {OUTLET:1,INLET:1}[deviceData.temp_device_type]?o.device_type == 'WORKS':deviceData.temp_device_type!='WORKS'?{OUTLET:1,INLET:1}[o.device_type]:true
                  })" v-bind:key="index" :value="device">{{device.device_name}}</option>
                </select>
              </p>
              <p class="clf">
                <span class="fl">所属区域：</span>
                <!-- :disabled="deviceData.temp_device_type != 'WORKS'" -->
                <select v-model="deviceData.area_id" >
                  <option v-for='(area) in areas.dataItems' v-bind:key="area.id" :value="area.id">{{area.area_name}}</option>
                </select>
              </p>
              <p class="clf">
                <span class="fl">IP地址或机号：</span>
                <input class="fl" type="text" placeholder="请输入" v-model="deviceData.temp_device_ip">
              </p>
              <p class="clf" v-show="{OUTLET:1,INLET:1,WORKS:1}[deviceData.temp_device_type]">
                <span class="fl">MAC地址：</span>
                <input class="fl" type="text" placeholder="请输入" v-model="deviceData.temp_device_mac">
              </p>
              <p class="bz clf">
                <span class="fl">备注：</span>
                <input class="fl" type="text" placeholder="请输入备注" v-model="deviceData.remark">
              </p>
              <p class="bz clf" v-show="deviceData.temp_device_type != 'WORKS'">
                <span class="fl">加载参数：</span>
                <input class="fl" type="text" placeholder="请输入备注" v-model="deviceData.load_para">
              </p>
              <p class="clf" v-show="{OUTLET:1,INLET:1}[deviceData.temp_device_type]">
                <span class="fl">开闸方式：</span>
                <select v-model="deviceData.temp_cut_off_mode">
                  <option v-for='(device, index) in ["无","自动开闸","确认开闸"]' v-bind:key="index" :value="index">{{device}}</option>
                </select>
              </p>
            </div>
            <div class="button clf">
              <a class="qr fr" @click="editDevice()">确定</a>
              <a class="qx fr" @click="ifEditInfo = false">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="delete_prompt" v-if="ifDel">
      <div class="depwd">
        <div class="text">你是否确认删除选中的记录</div>
        <div class="button clf">
          <a class="qr fr" @click="">确定</a>
          <a class="qx fr" @click="ifDel = false">取消</a>
        </div>
      </div>
    </div> -->
    <!--弹窗-->
  </div>
</template>

<script>
import { RequestParams,User, RequestDataItem } from "../../assets/js/entity";
import { array2Descendants , isChildrensId, RegExpCheck} from "../../assets/js/common";
import Pagination from "../Pagination";
import moment from "moment";
export default {
  name:"equipManage",
  data () {
    return {
      searchDivShow: true,
      ifEditInfo: false,
      ifDel: false,
      selectedParentIndex:{},
      pucker:false,
      /**搜索参数 */
      searchParam: "",
      deviceData:{
        id:null,//          	Y	String	ID
        area_id:null,//     	Y	String	区域ID
        pid:0,//         	Y	String	设备父级ID
        device_code:null,// 	Y	String	设备编号
        device_name:null,// 	Y	String	设备名称
        device_type:"WORKS",// 	Y	String	设备类型(WORKS：工作站 INLET：入口　OUTLET：出口 CAMERA：摄像头 LED：LED显示屏 HORN：喇叭 BARRIERGATE：道闸,从数据字典获取，有层级关系，工作站为第一层，出入口为第二层，其他设备为第三层)
        cut_off_mode:0,//	Y	Int	    开闸方式(0无1自动开闸2确认开闸)
        device_ip:null,//   	Y	String	IP地址
        device_mac:null,
        load_para:null,//   	N	String	加载参数
        isfee_zero:0,//  	Y	Int	    收费0元自动开闸（0：否1是；设备类型为出口时使用）
        user_name:null,//	    Y	String	操作员
        remark:null,//      	N	String	备注
        create_time:null,// 	Y	String	创建时间
        update_time:null,// 	Y	String	更新时间
        temp_device_code: null,
        temp_device_name: null,
        temp_device_type: null,
        temp_cut_off_mode: null,
        temp_device_ip: null,
        temp_device_mac: null
      },
      devices:{
        attributes: {
          page_index: 1, //当前页码
          page_size: 2, //当前页数
          tatal: 10, //总条目数
          total_pages: 10 //条页数
        },
        tree:[],
        dataItems: {

        },
      },
      areas:{
        attributes: {
          page_index: 1, //当前页码
          page_size: 2, //当前页数
          tatal: 10, //总条目数
          total_pages: 10 //条页数
        },
        dataItems: {

        },
      }
    };
  },
  components: {
    /**分页组件 */
    Pagination
  },
  filters:{
  },
  methods: {

    showEditDevice(data){
      if(data){
        this.deviceData = data
        this.deviceData.temp_device_code = this.deviceData.device_code
        this.deviceData.temp_device_name = this.deviceData.device_name
        this.deviceData.temp_device_type = this.deviceData.device_type
        this.deviceData.temp_cut_off_mode = this.deviceData.cut_off_mode
        this.deviceData.temp_device_ip = this.deviceData.device_ip
        this.deviceData.temp_device_mac = this.deviceData.device_mac
        this.selectedParentIndex = this.devices.dataItems.filter(o=>o.id == data.pid)[0] || {};
      }
      else this.deviceData = {}
      this.ifEditInfo = true;
    },

    editDevice(){

      this.deviceData.device_code = this.deviceData.temp_device_code
      this.deviceData.device_name = this.deviceData.temp_device_name
      this.deviceData.device_type = this.deviceData.temp_device_type
      this.deviceData.cut_off_mode = this.deviceData.temp_cut_off_mode
      this.deviceData.device_ip = this.deviceData.temp_device_ip
      this.deviceData.device_mac = this.deviceData.temp_device_mac
      
      let adopt = null;

      if(!RegExpCheck.isNumber(String(this.deviceData.device_code).trim())) adopt = "请填写正确的设备编号";
      if(!RegExpCheck.isName(String(this.deviceData.device_name).trim())) adopt = "请填写正确的设备名称";
      if(!RegExpCheck.isIp(String(this.deviceData.device_ip).trim())) adopt = "请填写正确的IP地址或机号";
      if({OUTLET:1,INLET:1,WORKS:1}[this.deviceData.temp_device_type] && !RegExpCheck.isMACAddr(String(this.deviceData.device_mac).trim())) adopt = "请填写正确的MAC地址";
      if(!RegExpCheck.isText(String(this.deviceData.remark).trim())) adopt = "请填写正确格式的备注";

      if(adopt) return this.$message.error(adopt);

      let data = this.selectedParentIndex;
      if(data.id){
        if(isChildrensId(this.deviceData, data.id)){
          return this.$message.error("不能选择自己/下级元素")
        }
      }


      this.$api.device.editor(new RequestParams()
        .addAttributes(this.deviceData)
        .addAttribute("pid", data.id ? data.id : 0))
        .then(response=>{
          this.$message.success(response.message)
          this.ifEditInfo = false;
          this.loadDeviceDatas();
        })
        .catch(({message}) => this.$message.error(message))
    },

    delDevice(data){
      this.$confirm(`确定要删除吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => this.$api.device.delete(new RequestParams().addDataItemAttr(0, "id", data.id)))
      .then(response=>{
        this.$message.success("删除成功");
        this.loadDeviceDatas();
      })
      .catch(({message}) => this.$message.error(message))
      .catch(() => {
        this.$message.info("已取消删除");
      });
    },

    /**加载车辆区域列表数据 */
    loadDeviceDatas(pageNum = 1, params = {}) {
      this.$api.device
        .getlist(new RequestParams()
        .addAttributes(params)
        .addAttribute("key", this.searchParam && ` AND device_code like '${this.searchParam}' OR device_name like '${this.searchParam}'`)
        .addAttribute("page_size", -1)
        )
        .then(response => {
          this.devices.attributes = response.attributes;
          this.devices.dataItems = response.dataItems.map(o => o.attributes);
          this.devices.tree = array2Descendants(this.devices.dataItems.map((o,i) => (o.isShowChildren = false,o.index = i,o)));
          console.log(this.devices.tree)
        })
        .catch(response => this.$message.error(response.message));
    },
    /**加载车辆区域列表数据 */
    loadAreaDatas(pageNum = 1, params = {}) {
      this.$api.area
        .getlist(new RequestParams()
        .addAttribute("page_index", pageNum)
        .addAttribute("page_size", -1)
        )
        .then(response => {
          this.areas.attributes = response.attributes;
          this.areas.dataItems = response.dataItems.map(o => o.attributes)
        })
        .catch(response => this.$message.error(response.message));
    },
  },
  mounted() {
    this.loadDeviceDatas(1, {});
    this.loadAreaDatas();
  }
}
</script>

<style scoped>
@import "../../assets/css/EquipmentManagement_1.css";
</style>
