<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="registration-car blu-button" @click="showEditCars(null)">登记车辆</button>
        <!-- <button class="upload-aut blu-button" @click="ifImportAuthorize = true">导入授权</button> -->
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
                value-format="yyyy-MM-DD HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="clf bottom">
        <div class="fl">
          <button class="plechoose fl" @click="selectedAll">请选择 <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl" @click="delCars(null)">批量删除</button>
          <!--<button class="greenbut fl">配置车场收费标准</button>-->
          <div>共搜索到 <span>{{cars.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button">搜索</button>
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
            <td><div :title="car.car_no">{{car.car_no}}</div></td>
            <td><div :title="car.household_name">{{car.household_name}}</div></td>
            <td><div :title="car.room_no">{{car.room_no}}</div></td>
            <td><div :title="car.tel">{{car.tel}}</div></td>
            <td><div :title="car.car_color"><span class="col black" :style="{ 'background-color': car.car_color}"></span></div></td>
            <td><div :title="car.car_brand">{{car.car_brand}}</div></td>
            <td><div :title="car.car_mode">{{car.car_mode}}</div></td>
            <td>{{["正常","冻结","注销"][car.status]}}</td>
            <td><div :title="car.create_time">{{car.create_time}}</div></td>
            <td><div :title="car.update_time">{{car.update_time}}</div></td>
            <td><div :title="car.user_name">{{car.user_name}}</div></td>
            <td> <a class="nonreg" href="javascript:;" @click="!car.is_oauth && (carData = car,ifAuthorize = true)">{{car.is_oauth?"已授权":"未授权"}}</a> </td>
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
                  住户：&emsp;&emsp;&emsp;{{selecredHouseHoldData.full_name||"",selecredHouseHoldData.room_no||"",selecredHouseHoldData.tel||""}}
                </span>
                <span class="plechoose" @click="ifVehreg = true, loadHouseHoldsDatas()">请选择</span>
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>车牌号码：</span>
                <input class="fl" type="text" v-model="carData.temp_car_no" placeholder="请输入6-8位数字密码，必填">
              </p>
              <p class="clf">
                <span class="fl">车辆颜色：</span>
                <span class="color-choose fl">
                  <input type="text" placeholder="颜色选择器" v-model="carData.temp_car_color">
                </span>
              </p >
              <p class="clf">
                <span class="fl">车辆品牌：</span>
                <input class="fl" type="text" v-model="carData.temp_car_brand" placeholder="请输入6-8位数字密码，必填">
              </p>
              <p class="clf">
                <span class="fl">车辆型号：</span>
                <input class="fl" type="text" v-model="carData.temp_car_mode" placeholder="请输入6-8位数字密码，必填">
              </p>
              <p class="bz clf">
                <span class="fl">备注：</span>
                <input class="fl" type="text" v-model="carData.remark" placeholder="请输入备注" id="inp">
              </p>
            </div>
            <div class="button clf">
              <a class="qr fr" @click="editCars()">确定</a>
              <a class="qx fr" @click="ifEditRegister = false">取消</a>
            </div>
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

              <p class="clf"><span class="fl">车牌号码：</span><span class="p-text" :asd="caraccreditData.car_id = carData.id">{{carData.car_no}}</span></p>
              <p class="clf"><span class="fl">授权车位：</span><span class="p-text fl" :asd="caraccreditData.is_group = placeData.car_group_id?1:0" :asdasd="caraccreditData.place_id = placeData.car_group_id || placeData.id">{{placeData.car_group_id || placeData.car_place_no}}<span hidden class="red-text">为车位组时显示车位组名称，并修改标题为授权车位组</span></span>
                <a class="ap-choose" href="javascript:" @click="ifAuthorizedParking = true, loadPlaceDatas()">请选择</a>
              </p>
              <p class="clf">
                <span class="fl" :pucker="pucker">车牌类型：</span>
                <select v-model="caraccreditData.car_type">
                  <option v-for="(item, key, index) in standards" :key="index" :value="key">{{item.name}}</option>
                </select>
              </p>
              <p class="clf">
                <span class="fl">收费标准：</span>
                <select v-model="standardData">
                  <option v-for="(item, index) in (standards[caraccreditData.car_type]||{list:[]}).list" :key="index" :value="item">{{item.standard_name}}</option>
                </select>
              </p>
              <p class="clf">
                <span class="fl">授权月份：</span>
                  <select v-model="caraccreditData.autoMonthData" @change="caraccreditData.amount = caraccreditData.autoMonthData.fee">
                    <option v-for="(item, index) in standardData.standard_content" :key="index" :value="item">{{item.count}}</option>
                  </select>
                <span class="red-text position-red">根据车辆类型及授权车位自动关联收费标准</span>
              </p>
              <p class="clf"><span class="fl">收费金额：</span>
                <input class="fl" type="text" disabled v-model="caraccreditData.amount" placeholder="请输入备注" >
              </p>
              <p class="clf"><span class="fl">可通行的设备：</span><span class="p-text">{{selecredDevices.map(o=>devices.dataItems[o].device_name)}}<a
                class="choose-equ" @click="ifTraffic = true,loadDeviceDatas()" href="javascript:;">请选择</a></span></p>
              <p class="bz clf"><span class="fl">备注：</span><input class="fl" type="text" placeholder="请输入备注"></p>
            </div>
            <div class="button clf">
              <a class="qr fr" @click="editAuthorize()">确定</a>
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
          <p class="close fr" @click="ifVehreg = false">x</p>
        </div>
        <div class="bot clf">
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
                <td><div :title="houseHold.full_name">{{houseHold.full_name}}</div></td>
                <td><div :title="houseHold.sex">{{['女','男'][houseHold.sex]}}</div></td>
                <td><div :title="houseHold.household_type">{{['亲属','业主','租客','朋友'/*住户类型(0：亲属1：业主2：租客3：朋友)*/][houseHold.household_type]}}</div></td>
                <td><div :title="houseHold.tel">{{houseHold.tel}}</div></td>
                <td><div :title="houseHold.identification_no">{{houseHold.identification_no}}</div></td>
                <td><div :title="houseHold.addr">{{houseHold.addr}}</div></td>
                <td><div :title="houseHold.birthday">{{houseHold.birthday}}</div></td>
                <td><div :title="houseHold.user_name">{{houseHold.user_name}}</div></td>
                <td><div :title="houseHold.status">{{['正常','冻结','注销'/*(0：正常1：冻结2：注销)*/][houseHold.status]}}</div></td>
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
          <p class="close fr" @click="ifTraffic = false">x</p>
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
                    <!-- <label :for="index"></label> -->
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
          <p class="close fr" @click="ifAuthorizedParking = false">x</p>
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
                  <a class="choose-parkingnumber" @click="placeData = place, loadStandardsDatas(), ifAuthorizedParking = false" href="javascript:;">选择</a>
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
  </div>
</template>

<script>
import { RequestParams, RequestDataItem ,User, DataDictionary} from "../../assets/js/entity";
import { RegExpCheck } from '../../assets/js/common'
import Pagination from "../Pagination";
import moment from "moment";
  export default {
    data () {
      return {
        pucker:false,
        searchDivShow: true,
        searchTimes:[],
        searchParams:{
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
        standards:{},
        carData:{
          id:null,//          	Y	String	ID
          household_id:null,//	Y	String	住户ID
          car_no:null,//      	Y	String	车牌号码
          car_color:null,//   	N	String	车辆颜色(如：#FFFFFF)
          car_brand:null,//   	N	String	车辆品牌
          car_mode:null,//    	N	String	车辆型号
          remark:null,//      	N	String	备注
          temp_car_no:null,//      	Y	String	车牌号码 副本
          temp_car_color:null,//   	N	String	车辆颜色(如：#FFFFFF) 副本
          temp_car_brand:null,//   	N	String	车辆品牌 副本
          temp_car_mode:null,//    	N	String	车辆型号 副本
        },
        standardData:{},
        caraccreditData:{
          id:null,//          	Y	String	ID
          car_id:null,//	Y	String	车辆ID
          car_type:null,//	Y	String	车辆类型(通过授权确认车辆类型，此类型由数据字典提供，选择输入，不能手动录入)
          place_id:null,//	Y	String	车位ID(为空时代码没有固定位的固定车,车位组时为车位组编号)
          is_group:null,//	Y	int	是否车位组授权(0：否1：是)在车位ID为车位组编号时，此字段内容为1
          describe:null,//	N	String	授权描述
          begin_time:null,//	Y	String	有效开始时间(格式：yyyy-MM-dd HH:mm:ss)
          end_time:null,//	Y	String	有效结束时间(格式：yyyy-MM-dd HH:mm:ss)
          remark:null,//	N	String	备注
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
          area_id:null,
          car_place_no:null,
          car_group_id:null,
          remark:null,
        },
        searchHouseHolds:{
          full_name:null,
          tel:null,
          room_no:null,
        },
        selecredHouseHoldData:{
          id:null,
          house_id:null,
          household_type:null,
          room_no:null,
          full_name:null,
          sex:null,
          tel:null,
          identification_no:null,
          addr:null,
          birthday:null,
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
        this.carData.temp_car_no = this.carData.car_no
        this.carData.temp_car_color = this.carData.car_color
        this.carData.temp_car_brand = this.carData.car_brand
        this.carData.temp_car_mode = this.carData.car_mode
      },

      editAuthorize(){
        if(!this.selecredDevices.length){
          return this.$message.error("请选择可通行设备")
        }
        this.$api.carauth.editor(new RequestParams().addDataItems(new RequestDataItem()
        .addAttributes(this.caraccreditData)
        .addAttribute("end_time", moment().add(this.caraccreditData.autoMonthData.count, 'months').format("YYYY-MM-DD HH:mm:ss"))
        .addSubItems(this.selecredDevices.map(o=>new RequestDataItem()
        .addAttribute("id", Math.random().toString().replace(/[.]/ig, ""))
        .addAttribute("device_id", this.devices.dataItems[o].id)
        ))
        ))
        .then(response=>{
            this.$message.success(response.message)
            this.ifAuthorize = false;
            this.loadCarDatas();
        })
        .catch(({message}) => this.$message.error(message))
      },

      editCars(){

        let adopt = null;

//        if(!RegExpCheck.isCarId(String(this.carData.car_no).trim())) adopt = "请填写正确的车牌号";

        if(adopt) return this.$message.error(adopt);

        this.carData.car_no = this.carData.temp_car_no
        this.carData.car_color = this.carData.temp_car_color
        this.carData.car_brand = this.carData.temp_car_brand
        this.carData.car_mode = this.carData.temp_car_mode

        if(this.selecredHouseHoldData.id){
          this.$api.car.editor(new RequestParams()
          .addDataItem(new RequestDataItem()
          .addAttributes(this.carData)
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
          this.$confirm(`确定要删除车辆吗?`, '提示', {
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

      loadStandardsDatas(){
        this.$api.standard
          .getlist(new RequestParams().addAttribute("area_id", this.placeData.area_id).addAttribute("page_size", 1000000))
          .then(response => {
            new DataDictionary(this.$api).ins().then(datas => {

              if(!datas.standard_type){
                return this.$message.error("请先前往配置收费标准数据字典");
              }

              for(let item of response.dataItems.map(o => o.attributes)){
                if(!this.standards[item.car_type]){
                  this.standards[item.car_type] = {
                    name:datas.car_type[item.car_type].dic_name,
                    list:[]
                  };
                }
                item.standard_name = datas.standard_type[item.standard_type].dic_name;
                item.standard_content = JSON.parse(item.standard_content)
                this.standards[item.car_type].list.push(item)
              }

              this.standards = this.standards;
              this.pucker = !this.pucker;
            })
          })
          .catch(response => this.$message.error(response.message));
      },

      loadHouseHoldsDatas(pageNum = 1, params = {}) {
        let key = "and 1 = 1 ";
        for(let k in this.searchHouseHolds){
          this.searchHouseHolds[k] && (key += ` OR ${k} like '%${this.searchHouseHolds[k]}%' `);
        }
        this.$api.household
          .getlist(new RequestParams()
          .addAttributes(params)
          .addAttribute("key", key)
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
        this.$api.car
          .getlist(new RequestParams()
          .addAttributes(this.searchParams)
          .addAttributes(params)
          .addAttribute("page_index", pageNum)
          .addAttribute("begin_time", this.searchTimes[0])
          .addAttribute("end_time", this.searchTimes[1]))
          .then(response => {
            this.cars.attributes = response.attributes;
            this.cars.dataItems = response.dataItems.map(o => o.attributes);
            this.selecedCars = [];
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
          // .addAttribute("key", `device_type in ('INLET','OUTLET')`)
          )
          .then(response => {

            this.devices.attributes = response.attributes;
            this.devices.dataItems = response.dataItems.map(o => o.attributes);
            this.selecredDevices = []
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
