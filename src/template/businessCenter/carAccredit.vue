<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="registration-car blu-button" @click="showEditCars(null)">登记车辆</button>
        <button class="upload-aut blu-button" @click="ifImportAuthorize = true">导入授权</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="cominput fl">
          <span class="conditions-text">车牌号码：</span>
          <input type="text" placeholder="请输入" v-model="searchParams.car_no">
        </div>
        <div class="cominput fl">
          <span class="conditions-text">住户姓名：</span>
          <input type="text" placeholder="请输入" v-model="searchParams.household_name">
        </div>
        <div class="cominput fl">
          <span class="conditions-text">房号：</span>
          <input type="text" placeholder="请输入" v-model="searchParams.room_no">
        </div>
        <div class="cominput fl">
          <span class="conditions-text">电话号码：</span>
          <input type="text" placeholder="请输入" v-model="searchParams.tel">
        </div>
        <div class="cominput fl">
          <span class="conditions-text">车辆品牌：</span>
          <input type="text" placeholder="请输入" v-model="searchParams.car_brand">
        </div>
        <div class="fl create">
          <span>更新时间：</span>
          <div>
            <div class="c-datepicker-date-editor  J-datepicker-range-day mt10">
              <el-date-picker
                v-model="searchTimes"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="clf bottom">
        <div class="fl">
          <button class="plechoose fl" @click="selectedAll">请选择 <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl" @click="delCars(null)">批量删除</button>
          <button class="greenbut fl">配置车场收费标准</button>
          <div>共搜索到 <span>{{cars.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="clear-button bluborder-button" @click="searchParams = {}, searchTimes = []">清除</button>
          <button class="ss transf-button" v-bind:class="{hide:!searchDivShow}" v-on:click="searchDivShow=!searchDivShow">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{searchDivShow === true ? "收起搜索" : "展开搜索"}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="selected" v-show="selecedCars.length">已选 <span>{{selecedCars.length}}</span> 项数据</div>
      <div class="tab">
        <table class="vehiclelicense-table">
          <tr>
            <th class="ckb"></th>
            <th>车牌号码</th>
            <th>住户姓名</th>
            <th>房号</th>
            <th>电话号码</th>
            <th>车辆颜色</th>
            <th>车辆品牌</th>
            <th>车辆型号</th>
            <th>状态</th>
            <th>创建时间</th>
            <th>更新时间</th>
            <th>操作员</th>
            <th>是否授权</th>
            <th class="de">操作</th>
          </tr>
          <tr v-for="(car, index) in cars.dataItems" v-bind:key="index">
            <td class="ckb"><input class="rad" type="checkbox" :value="index" v-model="selecedCars" ></td>
            <td>{{car.car_no}}</td>
            <td>{{car.household_name}}</td>
            <td>{{car.room_no}}</td>
            <td>{{car.tel}}</td>
            <td><span class="col black" :style="{ 'background-color': car.car_color}"></span></td>
            <td>{{car.car_brand}}</td>
            <td>{{car.car_mode}}</td>
            <td>{{["正常","冻结","注销"][car.status]}}</td>
            <td>{{car.create_time}}</td>
            <td>{{car.update_time}}</td>
            <td>{{car.user_name}}</td>
            <td> <a class="nonreg" href="javascript:;" @click="carData = car,ifAuthorize = true">{{/*是否已授权（已授权、未授权，通过判断车辆授权表是否有记录返回）*/"未授权"}}</a> </td>
            <td class="de detext">
              <a class="bj" href="javascript:;" @click="showEditCars(index)">编辑</a>
              <a class="delete" href="javascript:;" @click="delCars(index)">删除</a>
            </td>
          </tr>
        </table>
      </div>
      <Pagination
        :previousPage="loadCarDatas"
        :nextPage="loadCarDatas"
        :skipPage="loadCarDatas"
        :pageIndex="cars.attributes.page_index"
        :totalPages="cars.attributes.total_pages"
        :pageSize="cars.attributes.page_size"
        :tatal="cars.attributes.tatal"
      ></Pagination>
    </div>
    <!--弹窗-->
    <div class="main" v-if="ifEditRegister">
      <div class="depwd" v-drag.cursor="'#EditRegister'">
        <div class="top-nav" id="EditRegister">
          <p class="t-text fl">车辆登记</p>
          <p class="close fr" @click="ifEditRegister = false">x</p>
        </div>
        <div class="bot">
          <p class="red" hidden><i class="iconfont icon-jian-tianchong"></i>错误提示的文案<span>x</span></p>
          <div class="cet">
            <div class="clf">
              <p class="clf">
                <span class="fl">
                  <span class='red-text'>*</span>
                  住户：{{[selecredHouseHoldData.full_name||"",selecredHouseHoldData.room_no||"",selecredHouseHoldData.tel||""]}}
                </span>
                <span class="plechoose" @click="ifVehreg = true, loadHouseHoldsDatas()">请选择</span>
              </p>
              <p class="clf"><span class="fl"><span class='red-text'>*</span>车牌号码：</span><input class="fl" type="text" v-model="carData.car_no" placeholder="请输入6-8位数字密码，必填"> </p>
              <p class="clf"><span class="fl">车辆颜色：</span><span class="color-choose fl">颜色选择器<input class="fr" v-model="carData.car_color" type="color"></span> </p>
              <p class="clf"><span class="fl">车辆品牌：</span><input class="fl" type="text" v-model="carData.car_brand" placeholder="请输入6-8位数字密码，必填"> </p>
              <p class="clf"><span class="fl">车辆型号：</span><input class="fl" type="text" v-model="carData.car_mode" placeholder="请输入6-8位数字密码，必填"> </p>
              <p class="bz clf"><span class="fl">备注：</span><input class="fl" type="text" v-model="carData.remark" placeholder="请输入备注" id="inp"></p>
            </div>
            <div class="button clf">
              <a class="qr fr" @click="editCars()">确定</a>
              <a class="qx fr" @click="ifEditRegister = false">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="import-main" v-if="ifImportAuthorize">
      <div class="depwd" v-drag.cursor="'#ImportAuthorize'">
        <div class="top-nav" id="ImportAuthorize">
          <p class="t-text fl">导入授权</p>
          <p class="close fr" @click="ifImportAuthorize = false">x</p>
        </div>
        <div class="bot">
          <div class="cet clf">
            <div class="fl choose-file" onclick="document.getElementById('ImportAuthorizeFile').click()">
              选择文件
              <input type="file" id="ImportAuthorizeFile" hidden/>
            </div>
            <a class="fr downloadtemp" href="javascript:;">下载模板</a>
            <p>支持扩展名：.xls .xlsx</p>
          </div>
          <div class="button clf">
            <a class="upload fr" href="javascript:;">上传</a>
          </div>
        </div>
      </div>
    </div>
    <div class="nonreg-main" v-if="ifAuthorize">
      <div class="depwd" v-drag.cursor="'#Authorize'">
        <div class="top-nav" id="Authorize">
          <p class="t-text fl">{{placeData.car_group_id?"授权车位组":"车辆授权"}}</p>
          <p class="close fr" @click="ifAuthorize = false">x</p>
        </div>
        <div class="bot">
          <p class="red" hidden><i class="iconfont icon-jian-tianchong"></i>错误提示的文案<span>x</span></p>
          <div class="cet">
            <div class="clf">

              <p class="clf"><span class="fl">车牌号码：</span><span class="p-text">{{carData.car_no}}</span></p>
              <p class="clf"><span class="fl">车牌类型：</span>
                <select>
                  <option>选择1</option>
                  <option>选择2</option>
                </select>
              </p>
              <p class="clf"><span class="fl">授权车位：</span><span class="p-text fl">{{placeData.car_group_id || placeData.car_place_no}}<span hidden class="red-text">为车位组时显示车位组名称，并修改标题为授权车位组</span></span>
                <a class="ap-choose" href="javascript:" @click="ifAuthorizedParking = true, loadPlaceDatas()">请选择</a>
              </p>
              <p class="clf">
                <span class="fl">授权月份：</span>
                <el-date-picker
                  v-model="caraccreditData.autoMonth"
                  type="month"
                  class="p-text"
                  placeholder="选择月">
                </el-date-picker>
                <span class="red-text position-red">根据车辆类型及授权车位自动关联收费标准</span>
              </p>
              <p class="clf"><span class="fl">收费金额：</span>
                <input class="fl" type="text" v-model="caraccreditData.amount" placeholder="请输入备注" >
              </p>
              <p class="clf"><span class="fl">可通行的设备：</span><span class="p-text">{{selecredDevices.map(o=>devices.dataItems[o].device_name)}}<a
                class="choose-equ" @click="ifTraffic = true,loadDeviceDatas()" href="javascript:;">请选择</a></span></p>
              <p class="bz clf"><span class="fl">备注：</span><input class="fl" type="text" placeholder="请输入备注"></p>
            </div>
            <div class="button clf">
              <a class="qr fr">确定</a>
              <a class="qx fr" @click="ifAuthorize = false">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vehreg-main" v-if="ifVehreg" >
      <div class="depwd" v-drag.cursor="'#Vehreg'">
        <div class="top-nav" id="Vehreg">
          <p class="t-text fl"></p>
          <p class="v-close fr" @click="ifVehreg = false">x</p>
        </div>
        <div class="bot">
          <div class="vc-cet">
            <div class="clf">
              <p class="clf">
                <span class="fl">姓名：</span>
                <input type="text" placeholder="请输入" v-model="searchHouseHolds.full_name">
              </p>
              <p class="clf"> 
                <span class="fl">房号：</span>
                <input type="text" placeholder="请输入" v-model="searchHouseHolds.room_no">
              </p>
              <p class="clf">
                <span class="fl">电话：</span>
                <input type="text" placeholder="请输入" v-model="searchHouseHolds.tel">
              </p>
              <p class="button clf">
                <a class="v-qx fr" @click="searchHouseHolds = {}">清除</a>
                <a class="v-qr fr" @click="loadHouseHoldsDatas()">搜索</a>
              </p>
            </div>
          </div>
          <div class="residents-table">
            <table>
              <tr>
                <th>姓名</th>
                <th>性别</th>
                <th>住户类型</th>
                <th>电话</th>
                <th>证件号码</th>
                <th>证件地址</th>
                <th>出生日期</th>
                <th>操作员</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
              <tr  v-for="(houseHold, index) in houseHolds.dataItems" v-bind:key="index">
                <td>{{houseHold.full_name}}</td>
                <td>{{["女","男"][houseHold.sex]}}</td>
                <td>{{["亲属","业主","租客","朋友"/*住户类型(0：亲属1：业主2：租客3：朋友)*/][houseHold.household_type]}}</td>
                <td>{{houseHold.tel}}</td>
                <td>{{houseHold.identification_no}}</td>
                <td>{{houseHold.addr}}</td>
                <td>{{houseHold.birthday}}</td>
                <td>{{houseHold.user_name}}</td>
                <td>{{["正常","冻结","注销"/*(0：正常1：冻结2：注销)*/][houseHold.status]}}</td>
                <td>
                  <a href="javascript:" class="v-choose" @click="selecredHouseHoldData = houseHold, ifVehreg = false">选择</a>
                </td>
              </tr>
            </table>
          </div>
          <Pagination
            :previousPage="loadHouseHoldsDatas"
            :nextPage="loadHouseHoldsDatas"
            :skipPage="loadHouseHoldsDatas"
            :pageIndex="houseHolds.attributes.page_index"
            :totalPages="houseHolds.attributes.total_pages"
            :pageSize="houseHolds.attributes.page_size"
            :tatal="houseHolds.attributes.tatal"
          ></Pagination>
        </div>
      </div>
    </div>
    <div class="traffic-main" v-if="ifTraffic"  >
      <div class="depwd" v-drag.cursor="'#Traffic'">
        <div class="top-nav" id="Traffic">
          <p class="t-text fl">可通行设备</p>
          <p class="traffic-close fr" @click="ifTraffic = false">x</p>
        </div>
        <div class="bot">
          <div class="traffic-cet">
            <div class="clf">
              <p class="clf"><span class="fl">设备编号：</span><input type="text" v-model="searchDevices.device_code" placeholder="请输入"></p>
              <p class="clf"><input type="text" v-model="searchDevices.device_name" placeholder="请输入"><span class="fr">设备名称：</span></p>
              <p class="clf"><span class="fl">设备类型：</span>
                <select v-model="searchDevices.device_type">
                  <option  v-for='(device, index) in {
                    WORKS:"工作站",INLET:"入口",OUTLET:"出口",CAMERA:"摄像头",LED:"LED显示屏",HORN:"喇叭",BARRIERGATE:"道闸"
                  }' v-bind:key="index" :value="index">{{device}}</option>
                </select>
              </p>
              <p class="button clf">
                <a class="traffic-qx fr" @click="searchDevices = {}">取消</a>
                <a class="traffic-qr fr" @click="loadDeviceDatas()">搜索</a>
              </p>
            </div>
          </div>
          <div class="residents-table">
            <table>
              <tr>
                <th>选择</th>
                <th>设备编号</th>
                <th>设备名称</th>
                <th>设备类型(只显示出口和入口)</th>
                <th>开闸方式</th>
              </tr>
            </table>
            <div class="scrollDiv">
              <table>
                <tr v-for="(device, index) in devices.dataItems" v-bind:key="index">
                  <td class="traffic-ckb">
                    <input class="check" type="checkbox" :id="index" :value="index" v-model="selecredDevices" >
                    <label :for="index"></label>
                  </td>
                  <td>{{device.device_code}}</td>
                  <td>{{device.device_name}}</td>
                  <td>{{/*设备类型(WORKS：工作站 INLET：入口　OUTLET：出口 CAMERA：摄像头 LED：LED显示屏 HORN：喇叭 BARRIERGATE：道闸,从数据字典获取，有层级关系，工作站为第一层，出入口为第二层，其他设备为第三层)*/
                    {WORKS:"工作站",INLET:"入口",OUTLET:"出口",CAMERA:"摄像头",LED:"LED显示屏",HORN:"喇叭",BARRIERGATE:"道闸"}[device.device_type]
                  }}</td>
                  <td>{{[/*开闸方式(0无1自动开闸2确认开闸)*/"无","自动开闸","确认开闸"][device.cut_off_mode]}}</td>
                </tr>
              </table>
            </div>
          </div>
          <p class="button clf">
            <a class="traffic-qr fr" @click="ifTraffic = false">确认选择</a>
          </p>
        </div>
      </div>
    </div>
    <div class="ap-main" v-if="ifAuthorizedParking" >
      <div class="depwd" v-drag.cursor="'#AuthorizedParking'">
        <div class="top-nav" id="AuthorizedParking">
          <p class="t-text fl">授权车位</p>
          <p class="ap-close fr" @click="ifAuthorizedParking = false">x</p>
        </div>
        <div class="bot">
          <div class="ap-cet">
            <div class="clf">
              <p class="clf"><span class="fl">车位号或车位组编号：</span><input type="text" v-model="searchParams.key" placeholder="请输入" ></p>
              <p class="button clf">
                <a class="ap-search fr" @click="loadPlaceDatas(1, {key:searchParams.key})" href="javascript:;">搜索</a>
                <a class="ap-clear fr" @click="searchParams.key = null" href="javascript:;">清除</a>
              </p>
            </div>
          </div>
          <div class="residents-table">
            <table>
              <tr>
                <th>车位主编号</th>
                <th>车位号</th>
                <th>操作</th>
              </tr>
              <tr  v-for="(place, index) in places.dataItems" v-bind:key="index">
                <td>{{place.car_group_id/*车位组编号(GUID做为车位组编号，为空时没有车位组,导入时只要不大于32位字符即可)*/}}</td>
                <td>{{place.car_place_no}}</td>
                <td>
                  <a class="choose-parkingnumber" @click="placeData = place, ifAuthorizedParking = false" href="javascript:;">选择</a>
                </td>
              </tr>
            </table>
          </div>
          <Pagination
            :previousPage="loadPlaceDatas"
            :nextPage="loadPlaceDatas"
            :skipPage="loadPlaceDatas"
            :pageIndex="places.attributes.page_index"
            :totalPages="places.attributes.total_pages"
            :pageSize="places.attributes.page_size"
            :tatal="places.attributes.tatal"
          ></Pagination>
        </div>
      </div>
    </div>
    <!-- <div class="delete_prompt" v-if="ifDel">
      <div class="depwd">
        <div class="text">你是否确认删除选中的记录</div>
        <div class="button clf">
          <a class="qr fr">确定</a>
          <a class="qx fr" @click="ifDel = false">取消</a>
        </div>
      </div>
    </div> -->
    <!--弹窗-->
  </div>
</template>

<script>
import { User } from "../../assets/js/common";
import { RequestParams, RequestDataItem } from "../../assets/js/entity";
import Pagination from "../Pagination";
import moment from "moment";
  export default {
    data () {
      return {
        searchDivShow: true,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        searchTimes:[],
        searchParams:{
          project_id:null,
          car_no:null,
          household_name:null,
          room_no:null,
          tel:null,
          car_brand:null,
          key:null,
          begin_time:null,
          end_time:null,
          page_index:null,
          page_size:null
        },
        selecedCars:[],
        carData:{
          id:null,
          project_id:null,
          household_id:null,
          car_no:null,
          car_color:null,
          car_brand:null,
          car_mode:null,
          operator_id:null,
          remark:null
        },
        caraccreditData:{
          id:null,
          autoMonth:null,
          project_id:null,
          car_id:null,
          /**车辆类型(通过授权确认车辆类型，此类型由数据字典提供，选择输入，不能手动录入) */
          car_type:null,
          /**车位ID(为空时代码没有固定位的固定车,车位组时为车位组编号) */
          place_id:null,
          /**是否车位组授权(0：否1：是)在车位ID为车位组编号时，此字段内容为1 */
          is_group:null,
          /**授权描述 */
          describe:null,
          amount:null,
          end_time:null,
          operator_id:null,
          remark:null,
        },
        cars:{
          attributes: {
            page_index: 1, //当前页码
            page_size: 2, //当前页数
            tatal: 10, //总条目数
            total_pages: 10 //条页数
          },
          dataItems: {

          },
        },
        caraccredits:{
          attributes: {
            page_index: 1, //当前页码
            page_size: 2, //当前页数
            tatal: 10, //总条目数
            total_pages: 10 //条页数
          },
          dataItems: {

          },
        },
        places:{
          attributes: {
            page_index: 1, //当前页码
            page_size: 2, //当前页数
            tatal: 10, //总条目数
            total_pages: 10 //条页数
          },
          dataItems: {

          },
        },
        selecredDevices:[],
        searchDevices:{
          device_code:null,
          device_name:null,
          device_type:null,
        },
        devices:{
          attributes: {
            page_index: 1, //当前页码
            page_size: 2, //当前页数
            tatal: 10, //总条目数
            total_pages: 10 //条页数
          },
          dataItems: {

          },
        },
        placeData:{
          id:null,
          project_id:null,
          area_id:null,
          car_place_no:null,
          car_group_id:null,
          operator_id:null,
          remark:null,
        },
        searchHouseHolds:{
          full_name:null,
          tel:null,
          room_no:null,
        },
        selecredHouseHoldData:{
          id:null,
          project_id:null,
          house_id:null,
          household_type:null,
          room_no:null,
          full_name:null,
          sex:null,
          tel:null,
          identification_no:null,
          addr:null,
          birthday:null,
          operator_id:null,
          remark:null
        },
        houseHolds:{
          attributes: {
            page_index: 1, //当前页码
            page_size: 2, //当前页数
            tatal: 10, //总条目数
            total_pages: 10 //条页数
          },
          dataItems: [],
        },
        ifEditRegister: false,
        ifImportAuthorize: false,
        ifAuthorize: false,
        ifVehreg: false,
        ifTraffic: false,
        ifAuthorizedParking: false,
        ifDel: false
      };
    },
    components: {
      /**分页组件 */
      Pagination
    },
    methods: {
      selectedAll(){
        if(this.selecedCars.length){
          this.selecedCars = [];
        }
        else this.selecedCars = this.cars.dataItems.map((o,i)=>i);
      },

      showEditCars(id){
        this.carData = this.cars.dataItems[id] || {};
        this.selecredHouseHoldData.full_name = this.carData.household_name,
        this.selecredHouseHoldData.room_no = this.carData.room_no,
        this.selecredHouseHoldData.tel = this.carData.tel
        this.selecredHouseHoldData.id = this.carData.household_id
        this.ifEditRegister = true;
      },

      editCars(){
        if(this.selecredHouseHoldData.id){
          this.$api.car.editor(new RequestParams()
          .addDataItem(new RequestDataItem()
          .addAttributes(this.carData)
          .addAttribute("operator_id", User.info.id)
          .addAttribute("project_id", User.info.project_id)
          .addAttribute("household_id", this.selecredHouseHoldData.id))
          )
          .then(response=>{
            this.$message.success(response.message)
            this.ifEditRegister = false;
            this.loadCarDatas();
          })
          .catch(({message}) => this.$message.error(message))
        }
        else this.$message.info("请选择住户");
      },

      delCars(id){
          
        let datas = id != null ? [this.cars.dataItems[id]] : this.selecedCars.map(o=>this.cars.dataItems[o]);
        if(datas.length){
          this.$confirm(`确定要删除车辆[${datas.map(o=>o.car_no)}]吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => this.$api.car.delete(new RequestParams().addDataItems(datas.map(o=>new RequestDataItem().addAttribute("id", o.id)))))
          .then(response=>{
            this.$message.success("删除成功");
            this.loadCarDatas();
          })
          .catch(({message}) => this.$message.error(message))
          .catch(() => {
            this.$message.info("已取消删除");
          });
        }
        else this.$message.info("请选择要删除的车辆");
      },

      loadHouseHoldsDatas(pageNum = 1, params = {}) {
        let key = "1 = 1 ";
        for(let k in this.searchHouseHolds){
          this.searchHouseHolds[k] && (key += ` OR ${k} link %${this.searchHouseHolds[k]}% `);
        }
        this.$api.household
          .getlist(new RequestParams()
          .addAttributes(params)
          // .addAttribute("key", key)
          .addAttribute("page_index", pageNum)
          )
          .then(response => {
            this.houseHolds.attributes = response.attributes;
            this.houseHolds.dataItems = response.dataItems.map(o => o.attributes);
          })
          .catch(response => this.$message.error(response.message));
      },
      /**加载车辆区域列表数据 */
      loadCarDatas(pageNum = 1, params = {}) {
        let searchTimes = this.searchTimes.map(o=>moment(o).format("YYYY-MM-DD HH:mm:ss"))
        this.$api.car
          .getlist(new RequestParams()
          .addAttributes(this.searchParams)
          .addAttributes(params)
          .addAttribute("page_index", pageNum)
          .addAttribute("begin_time", searchTimes[0])
          .addAttribute("end_time", searchTimes[1]))
          .then(response => {

            this.cars.attributes = response.attributes;
            this.cars.dataItems = response.dataItems.map(o => o.attributes);
          })
          .catch(response => this.$message.error(response.message));
      },
      /**加载车辆区域列表数据 */
      loadPlaceDatas(pageNum = 1, params = {}) {
        this.$api.place
          .getlist(new RequestParams()
          .addAttributes(this.searchParams)
          .addAttributes(params)
          .addAttribute("page_index", pageNum)
          )
          .then(response => {

            this.places.attributes = response.attributes;
            this.places.dataItems = response.dataItems.map(o => o.attributes);
          })
          .catch(response => this.$message.error(response.message));
      },
      /**加载车辆区域列表数据 */
      loadDeviceDatas(pageNum = 1, params = {}) {
        this.$api.device
          .getlist(new RequestParams()
          .addAttributes(this.searchDevices)
          .addAttributes(params)
          .addAttribute("page_index", pageNum)
          .addAttribute("page_size", 100000)
          // .addAttribute("key", `device_type in ("INLET","OUTLET")`)
          )
          .then(response => {

            this.devices.attributes = response.attributes;
            this.devices.dataItems = response.dataItems.map(o => o.attributes);
          })
          .catch(response => this.$message.error(response.message));
      }
    },
    mounted () {
      this.loadCarDatas(1);
    }
  };
</script>

<style scoped>
  @import "../../assets/css/VehicleLicense.css";
  @import "../../assets/css/datepicker.css";
</style>
