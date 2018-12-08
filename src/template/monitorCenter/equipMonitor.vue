<template>
  <div class="content clf">
    <div class="wrap clf">
      <div class="wrap-left fl">
        <div class="ltop" v-for="(item , key, index) in devices" :key="index">
          <div class="openc ltopopen" v-if="item.equip_switch">
            <div class="opend" @click="mrLIDeviceSocket.sendMsg(key, 'openBrake', o=>openBrake(key)), item.equip_switch = !item.equip_switch" >开闸</div>
            <!-- <div class="closed" >关闸</div> -->
            <div class="watch_video" >观看视频</div>
          </div>
          <p class="p1"><span class="sptop" @click="item.equip_switch = !item.equip_switch">...</span></p>
          <section class="secl fl"><img :style="item.status? {
            bottom: '14px',
            left: '-6px'
          } : {}" :pucker="pucker" :src="require(item.status ? '../../assets/images/secl.png' : '../../assets/images/secr.png')"></section>
          <section class="secr fr">
            <b>{{item.device_name}}</b>
            <span :style="{color:item.status?'red':'#52d669'}" :pucker="pucker">道闸已{{item.status ? "开启" : "关闭"}}</span>
          </section>
        </div>
      </div>
      <div class="wrap-right fr">
        <ul>
          <li v-for="(item , key, index) in devices" :key="index">
            <!-- <video-player class="vjs-custom-skin"
              :ref="item.id"
              :pause="{}"
              :options="{
                overNative: true,
                pause:{},
                autoplay: true,
                controls: false,
                techOrder: ['html5','flash'],
                sourceOrder: true,
                html5: { hls: { withCredentials: false } },
                flash: { hls: { withCredentials: false } },
                poster:GET_FILE_URL+item.photo,
                sources: [{
                  type: 'rtmp/mp4',
                  src: 'rtmp://192.168.55.50:1935/hls/stream1'
                }]
            }"></video-player> -->
            <img :pucker="pucker" v-if="item.isPhoto" :src="GET_FILE_URL+item.photo" :alt="GET_FILE_URL+item.photo">
          </li>
        </ul>
      </div>
    </div>
    <div class="wrap1 clf">
      <div class="wrap1-left fl">
        <div class="top">
          <a class="but1 fl" @click="loadAreaCarDatas(), ifAreaCar = true">场内车辆查询</a>
          <a class="but1 fl" @click="loadAreaCarDatas(true), ifSystemMessages = true">系统消息查询</a>
          <a class="but2 fl" @click="tempOccupy.tempCar.id ? tempOccupy.isShow = true:$alert('请选择车辆记录')">临占固</a>
          <a class="but2 fl" @click="ifChangeShifts = true">换班</a>
          <a class="but2 fl" @click="manualEntry.tempCar.id ? manualEntry.isShow = true:$alert('请选择车辆记录')">人工出入场</a>
          <p class="ptext">当日收入总额：<span class="redtext"><strong :pucker="pucker">{{totalfee}}</strong></span>元</p>
        </div>
        <div class="bot">
          <el-tabs v-model="messageTabs" type="card">
            <el-tab-pane label="最近通行" name="recentPassage">
              <el-table 
              :data="recentPassageDatas" 
              border style="width: 100%" 
              height="325" 
              tooltip-effect="light" 
              highlight-current-row 
              @current-change="(e)=>(tempOccupy.tempCar = e, manualEntry.tempCar = e)">
                <el-table-column type="index" width="50" fixed show-overflow-tooltip></el-table-column>
                <el-table-column label="车牌号" width="150" prop="car_no" show-overflow-tooltip></el-table-column>
                <el-table-column label="固占临原车牌" width="120" prop="old_car_no" show-overflow-tooltip></el-table-column>
                <el-table-column label="车辆类型" width="120" prop="car_type" :formatter="(a,b,e)=>(dataDictionary['car_type'][e]||{dic_name:'未知类型'}).dic_name" show-overflow-tooltip></el-table-column>
                <el-table-column label="入场操作员" width="120" prop="in_operator" show-overflow-tooltip></el-table-column>
                <el-table-column label="出场操作员" width="120" prop="out_operator" show-overflow-tooltip></el-table-column>
                <el-table-column label="入场设备" width="120" prop="in_device" show-overflow-tooltip></el-table-column>
                <el-table-column label="出场设备" width="150" prop="out_device" show-overflow-tooltip></el-table-column>
                <el-table-column label="入场时间" width="120" prop="in_time" show-overflow-tooltip></el-table-column>
                <el-table-column label="出场时间" width="120" prop="out_time" show-overflow-tooltip></el-table-column>
                <el-table-column label="收费开始时间" width="120" prop="charge_begin_time" show-overflow-tooltip></el-table-column>
                <el-table-column label="收费结束时间" width="120" prop="charge_end_time" show-overflow-tooltip></el-table-column>
                <el-table-column label="缴费时间" width="120" prop="charge_fee_time" show-overflow-tooltip></el-table-column>
                <el-table-column label="状态" width="120" prop="status" :formatter="(a,b,e)=>['入场','未缴费','已缴费','已出场'][e]||e" show-overflow-tooltip></el-table-column>
                <el-table-column label="入场开闸类型" width="120" prop="in_opengate_type" :formatter="(a,b,e)=>['自动开闸','确认开闸','遥控按钮开闸（非法开闸）'][e]" show-overflow-tooltip></el-table-column>
                <el-table-column label="出场开闸类型" width="120" prop="out_opengate_type" :formatter="(a,b,e)=>['自动开闸','确认开闸','遥控按钮开闸（非法开闸）'][e]" show-overflow-tooltip></el-table-column>
                <el-table-column label="应收金额" width="120" prop="receivable" show-overflow-tooltip></el-table-column>
                <el-table-column label="优惠金额" width="120" prop="preferential" show-overflow-tooltip></el-table-column>
                <el-table-column label="附加金额" width="120" prop="additional" show-overflow-tooltip></el-table-column>
                <el-table-column label="实收金额" width="120" prop="collected" show-overflow-tooltip></el-table-column>
                <el-table-column label="支付方式" width="120" prop="pay_mode" :formatter="(a,b,e)=>['现金','微信公众号支付','微信刷卡支付','支付宝网页支付','支付宝刷卡支付'][e]" show-overflow-tooltip></el-table-column>
                <el-table-column label="小车场入场时间" width="120" prop="small_in_time" show-overflow-tooltip></el-table-column>
                <el-table-column label="小车场入场设备" width="120" prop="small_in_device" show-overflow-tooltip></el-table-column>
                <el-table-column label="小车场出场时间" width="120" prop="small_out_time" show-overflow-tooltip></el-table-column>
                <el-table-column label="小车场出场设备" width="120" prop="small_out_device" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="80" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="inParkConfirm = scope.row,ifReviseNumber = true">车牌校正</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="系统消息" name="systemMessages">
              <el-table :data="systemMessagesDatas" border style="width: 100%" height="325" tooltip-effect="light">
                <el-table-column type="index" width="50" fixed show-overflow-tooltip></el-table-column>
                <el-table-column label="日期" width="140" prop="date" show-overflow-tooltip></el-table-column>
                <el-table-column label="内容" width="680" prop="tip" show-overflow-tooltip></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="wrap1-right fr">
        <div class="section-one clf">
          <div class="pbb"><strong>粤B·123456</strong></div>
          <div class="ps">2015-09-2608：50：08 入场</div>
          <div class="pst">已停<span>1</span>天<span>12</span>小时<span>8</span>分<span>41</span>秒</div>
        </div>
        <div class="clf" style="margin-bottom:3.125rem;">
          <div class="pgt">应收金额：<span><strong>60</strong></span>元</div>
          <div class="pl fl">优惠金额：<span>20</span>元</div>
          <div class="pr fr">实收金额：<span>80</span>元</div>
        </div>
        <div class="py clf">
          <div class="pay xj">
            <label><input type="radio" name="radio1" value="1" id="way">现金</label>
          </div>
          <div class="pay zfb">
            <label><input type="radio" name="radio1" value="1" id="zfb">支付宝</label>
          </div>
          <div class="wx wx">
            <label><input type="radio" name="radio1" value="1" id="wx">微信</label>
          </div>
        </div>
        <div class="clf">
          <a class="but" href="javascript:">确认开闸</a>

        </div>
      </div>
    </div>
    <div class="vehreg-main" v-if="ifAreaCar" >
      <div class="depwd" v-drag.cursor="'#AreaCar'">
        <div class="top-nav" id="AreaCar">
          <p class="t-text fl">场内车辆查询</p>
          <p class="close fr" @click="ifAreaCar = false">x</p>
        </div>
        <div class="bot clf">
          <div class="vc-cet">
            <div class="clf">
              <p class="clf">
                <span class="fl">车牌号码：</span>
                <input type="text" placeholder="模糊查询" v-model="searchAreaCar.carPlate">
              </p>
              <p class="clf">
                <span class="fl">设备：</span>
                <select v-model="searchAreaCar.equip">
                  <option  v-for="(item , key, index) in devices" :key="index" :value="item">{{item.device_name}}</option>
                </select>
              </p>
              <p class="clf">
                <span class="fl">入场时间段：</span>
                <el-date-picker
                  v-model="searchAreaCar.timeQuantum"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </p>
              <p class="button clf">
                <a class="v-qx fr" @click="searchAreaCar = {}">清除</a>
                <a class="v-qr fr" @click="loadAreaCarDatas()">搜索</a>
              </p>
            </div>
          </div>
          <div class="residents-table">
            <el-table :data="areaCarDatas.dataItems" height="350" border style="width: 100%" tooltip-effect="light">
              <el-table-column label="车牌" width="100" prop="car_no" show-overflow-tooltip></el-table-column>
              <el-table-column label="车辆类型" width="80" prop="car_type" :formatter="(a,b,e)=>(dataDictionary['car_type'][e]||{dic_name:'未知类型'}).dic_name" show-overflow-tooltip></el-table-column>
              <el-table-column label="入口" width="100" prop="in_device" show-overflow-tooltip></el-table-column>
              <el-table-column label="入场时间" width="160" prop="in_time" show-overflow-tooltip></el-table-column>
              <el-table-column label="照片" width="" prop="in_photo" show-overflow-tooltip>
                <template slot-scope="scope">
                  <a :href="GET_FILE_URL+scope.row.in_photo" target="_blank">{{GET_FILE_URL+scope.row.in_photo}}</a>
                </template>
              </el-table-column>
              <el-table-column label="操作"  width="85">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="inParkConfirm = scope.row,ifReviseNumber = true">车牌校正</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <Pagination
            :pageIndex="areaCarDatas.attributes.page_index"
            :totalPages="areaCarDatas.attributes.total_pages"
            :pageSize="areaCarDatas.attributes.page_size"
            :tatal="areaCarDatas.attributes.tatal"
          ></Pagination>
        </div>
      </div>
    </div>
    <div class="vehreg-main" v-if="ifSystemMessages" >
      <div class="depwd" v-drag.cursor="'#SystemMessages'">
        <div class="top-nav" id="SystemMessages">
          <p class="t-text fl">系统消息查询</p>
          <p class="close fr" @click="ifSystemMessages = false">x</p>
        </div>
        <div class="bot clf">
          <div class="vc-cet">
            <div class="clf">
              <p class="clf">
                <span class="fl">车牌号码：</span>
                <input type="text" placeholder="模糊查询" v-model="searchAreaCar.carPlate">
              </p>
              <p class="clf">
                <span class="fl">设备：</span>
                <label>
                  <select v-model="searchAreaCar.equip">
                    <option  v-for="(item , key, index) in devices" :key="index" :value="item">{{item.device_name}}</option>
                  </select>
                </label>
              </p>
              <p class="clf">
                <span class="fl">入场时间段：</span>
                <el-date-picker
                  v-model="searchAreaCar.timeQuantum"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </p>
              <p class="button clf">
                <a class="v-qx fr" @click="searchAreaCar = {}">清除</a>
                <a class="v-qr fr" @click="loadAreaCarDatas(true)">搜索</a>
              </p>
            </div>
          </div>
          <div class="residents-table">
            <el-table :data="systemMessageDatas.dataItems" height="350" border style="width: 100%" tooltip-effect="light">
              <el-table-column type="index"></el-table-column>
              <el-table-column label="时间" width="160" prop="date" show-overflow-tooltip></el-table-column>
              <el-table-column label="信息内容" prop="tip" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
          <Pagination
            :pageIndex="systemMessageDatas.attributes.page_index"
            :totalPages="systemMessageDatas.attributes.total_pages"
            :pageSize="systemMessageDatas.attributes.page_size"
            :tatal="systemMessageDatas.attributes.tatal"
          ></Pagination>
        </div>
      </div>
    </div>
    <el-dialog title="临占固" width="600px" :visible.sync="tempOccupy.isShow" center>
      <div class="bot">
        <p class="tip" v-if="tempOccupy.tempCar.tip">{{tempOccupy.tempCar.tip}}</p>
        <div class="searchForm clf">
          <input type="text" v-model="tempOccupy.selectKey" placeholder="车牌号，姓名，手机号">
          <a href="javascript:" class="blu-button" @click="loadCarDatas()">查找</a>
        </div>
        <select class="selectCar" v-model="tempOccupy.selectedCar">
          <option  v-for="(item , index) in tempOccupy.cars" :key="index" :value="item">{{item.car_no}}</option>
        </select>
        <img :src="GET_FILE_URL+tempOccupy.tempCar.in_photo" alt="" class="CarImg">
        <p class="TempOccupyCarNumber">{{tempOccupy.tempCar.car_no}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="blu-button" @click="tempoffixed()">确 定</button>
      </span>
    </el-dialog>
    <el-dialog title="换班" width="500px" :visible.sync="ifChangeShifts" center>
      <div class="bot">
        <div class="items">
          <div class="item">
            <span>工作站：</span>
            <div>{{works.device_name}}</div>
          </div>
          <div class="item">
            <span>操作员：</span>
            <div>{{userInfo.full_name}}</div>
          </div>
          <div class="item">
            <span>登陆时间：</span>
            <div>{{userInfo.login_time}}</div>
          </div>
          <p class="charge">当班次收费总额：<strong>{{totalfee}}元</strong></p>
          <div class="item">
            <span>用户名：  </span>
            <div><label>
              <input type="text" v-model="changeShiftsUsername">
            </label></div>
          </div>
          <div class="item">
            <span>密&emsp;码：  </span>
            <div><label>
              <input type="password" v-model="changeShiftsPassword">
            </label></div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="blu-button" @click="changeShifts()">确 定</button>
      </span>
    </el-dialog>
    <el-dialog title="人工出入场" width="800px" :visible.sync="manualEntry.isShow" center>
      <div class="bot">
        <div class="info">
          <div class="item">
            <span>入场时间：</span>
            <div>{{manualEntry.selectedCar.in_time}}</div>
          </div>
          <div class="item">
            <span>入场设备：</span>
            <div>{{manualEntry.selectedCar.in_device}}</div>
          </div>
          <div class="item">
            <span>车辆类型：</span>
            <div>{{(dataDictionary['car_type'][manualEntry.selectedCar.car_type]||{dic_name:'未知类型'}).dic_name}}</div>
          </div>
        </div>
        <div class="confirmCarNumber">
        <div class="fl">
        <div class="item">
          <span>请选择设备：</span>
          <div>
            <label>
              <select v-model="manualEntry.selectDevice">
                <option  v-for="(item , key, index) in devices" :key="index" :value="item">{{item.device_name}}</option>
              </select>
            </label>
          </div>
        </div>
        </div>
        </div>
        <licensePlate :value="manualEntry.selectedCar.car_no" :clickKeyDown="loadAreaCarDatas2" :clickSubmit="confirmoutpark"></licensePlate>
        <div class="carImgs">
          <ul class="clf">
            <li v-for="(item, index) in manualEntry.cars" :key="index"><img  @click="manualEntry.selectedCar = item" :style="manualEntry.selectedCar.id==item.id?{border:'1px solid #F00'}:{}" :src="GET_FILE_URL+item.in_photo" :alt="GET_FILE_URL+item.in_photo"></li>
          </ul>
        </div>
      </div>
    </el-dialog>
    <el-dialog :title="inParkConfirm.temp_inout_id?'确认开闸':'车牌校正'" width="600px" :visible.sync="ifReviseNumber" center>
      <div class="bot">
        <p class="tip" v-show="inParkConfirm.tip">{{inParkConfirm.tip}}</p>
        <img :src="GET_FILE_URL+inParkConfirm.in_photo" :alt="GET_FILE_URL+inParkConfirm.in_photo" class="CarImg">
        <p class="TempOccupyCarNumber">{{inParkConfirm.car_no}}</p>
        <licensePlate :value="inParkConfirm.car_no" :clickSubmit="parkConfirm"></licensePlate>
      </div>
    </el-dialog>
    <!--弹窗-->
  </div>
</template>

<script>

import { RequestParams,Network, RequestDataItem,MrLIDeviceSocket,DataDictionary, User,CentralInterface } from "../../assets/js/entity";
import { array2Object } from "../../assets/js/common";
import {GET_FILE_URL} from "../../assets/js/constants";
import moment from "moment"
import Pagination from '../Pagination';
import licensePlate from "../licensePlate";


export default {
  name:"equipMonitor", 
  data() {
    return {
      changeShiftsUsername:"",
      changeShiftsPassword:"",
      userInfo:User.info,
      GET_FILE_URL:GET_FILE_URL,
      pucker:false,
      ifDel: false,
      equip_entry: false,
      equip_output: false,
      network:new Network(),
      devices:{},
      works:{},
      mrLIDeviceSocket:new MrLIDeviceSocket(),
      incarqueryData:{
        id:null,//                 	Y	string	ID
        project_id:null,//         	Y	string	项目ID
        car_no:null,//             	Y	string	车牌号码
        old_car_no:null,//         	N	string	固占临原车牌
        car_type:null,//           	Y	string	车牌类型(此类型由数据字典提供，选择输入，不能手动录入)
        in_operator_id:null,//     	Y	string	入场操作员ID
        out_operator_id:null,//    	N	string	出场操作员ID
        in_operator:null,//        	Y	string	入场操作员
        out_operator:null,//       	N	string	出场操作员
        in_device_id:null,//       	Y	string	入场设备ID
        out_device_id:null,//      	N	string	出场设备ID
        in_device:null,//          	Y	string	入场设备
        out_device:null,//         	N	string	出场设备
        in_time:null,//            	Y	string	入场时间（格式：yyyy-MM-dd HH:mm:ss)
        out_time:null,//           	N	string	出场时间（格式：yyyy-MM-dd HH:mm:ss)
        charge_begin_time:null,//  	N	string	收费开始时间（格式：yyyy-MM-dd HH:mm:ss)
        charge_end_time:null,//    	N	string	收费结束时间（格式：yyyy-MM-dd HH:mm:ss)
        charge_fee_time:null,//    	N	string	缴费时间（格式：yyyy-MM-dd HH:mm:ss)
        status:null,//             	Y	int	状态(0:入场1未缴费2已缴费3已出场)
        in_photo:null,//           	N	string	入场抓拍照片(多张照片以";"号分隔)
        out_photo:null,//          	N	string	出场抓拍照片(多张照片以";"号分隔)
        in_opengate_type:null,//   	Y	int	入场开闸类型(0:自动开闸1：确认开闸2：遥控按钮开闸（非法开闸）)
        out_opengate_type:null,//  	Y	int	出场开闸类型(0:自动开闸1：确认开闸2：遥控按钮开闸（非法开闸）)
        receivable:null,//         	Y	decimal(10,2)	应收金额
        preferential:null,//       	Y	decimal(10,2)	优惠金额
        additional:null,//         	Y	decimal(10,2)	附加金额
        collected:null,//          	Y	decimal(10,2)	实收金额
        pay_mode:null,//           	Y	int	支付方式(0：现金1：微信公众号支付2：微信刷卡支付3：支付宝网页支付4：支付宝刷卡支付)
        small_in_device_id:null,// 	N	string	小车场入场设备ID
        small_in_time:null,//      	N	string	小车场入场时间（格式：yyyy-MM-dd HH:mm:ss)
        small_out_device_id:null,//	N	string	小车场出场设备ID
        small_out_time:null,//     	N	string	小车场出场时间（格式：yyyy-MM-dd HH:mm:ss)
        small_in_device:null,//    	N	string	小车场入场设备
        small_out_device:null,//   	N	string	小车场出场设备
        tip:null,//提示消息
        remark:null,//             	N	string	备注
      },

      /* 最近通行 和 系统消息 选项卡 */
      messageTabs: 'recentPassage',

      /* 最近通行 数据 */
      recentPassageDataObjs:{},
      recentPassageDatas: [ ],
      dataDictionary:{},

      /* 系统消息 数据 */
      systemMessagesDatas: [],

      /* 场内车辆查询 弹窗 */
      ifAreaCar: false,

      /* 场内车辆查询 搜索 */
      searchAreaCar:{
        carPlate:null,
        equip:null,
        timeQuantum:null
      },

      /* 场内车辆弹窗 数据 */
      areaCarDatas:{
        attributes: {
          page_index: 1, //当前页码
          page_size: 2, //当前页数
          tatal: 10, //总条目数
          total_pages: 10 //条页数
        },
        dataItems: []
      },

      /* 系统消息查询 弹窗 */
      ifSystemMessages: false,

      /* 系统消息查询 搜索 */
      searchSystemMessage:{
        carPlate:null,
        equip:null,
        timeQuantum:null
      },

      /* 系统消息查询 数据 */
      systemMessageDatas:{
        attributes: {
          page_index: 1, //当前页码
          page_size: 2, //当前页数
          tatal: 10, //总条目数
          total_pages: 10 //条页数
        },
        dataItems: []
      },

      /* 换班 弹窗 */
      ifChangeShifts: false,

      /* 人工出入场 弹窗 */
      manualEntry: {
        isShow:false,
        cars:[],
        selectDevice:{},
        selectedCar:{},
        tempCar:{},
      },

      /* 车牌校正 弹窗 */
      ifReviseNumber: false,

      /* 临占固 弹窗 */
      tempOccupy:{
        isShow:false,
        cars:[],
        selectKey:"",
        selectedCar:{},
        tempCar:{},
      },
      /**车牌矫正 */
      inParkConfirm:{},

    };
  },

  methods: {
    openBrake(id){
      this.devices[id].status = true;
      setTimeout(()=>{
        this.devices[id].status = false;
        this.pucker = !this.pucker;
      }, 1000000/**十秒后自动落闸 */)
    },
    tempoffixed(){
      this.$api.monitor.tempoffixed(new RequestParams()
      // inout_id	Y		出入记录ID
      // old_car_no	Y		原车牌
      // new_car_no	Y		新车牌
      // remark	N	string	备注
      .addAttribute("inout_id", this.tempOccupy.tempCar.id)
      .addAttribute("old_car_no", this.tempOccupy.selectedCar.car_no)
      .addAttribute("new_car_no", this.tempOccupy.tempCar.car_no)
      )
      .then(response=>{
        this.tempOccupy.isShow = false;
        this.tempOccupy.tempCar = {};
      })
      .catch(response => this.$message.error(response.message));
    },

    parkConfirm(new_car_no){
      if(this.inParkConfirm.temp_inout_id){
        /**确认开闸 */
        if(MrLIDeviceSocket.GATE_STATE.GATE_STATE_CONFIRM == this.inParkConfirm.gate_state){
          this.confirminpark(this.inParkConfirm.in_device_id,this.inParkConfirm.temp_inout_id);
        }
        /**重复入场 */
        else if(MrLIDeviceSocket.GATE_STATE.GATE_STATE_IN_REPEAT == this.inParkConfirm.gate_state){
          /**没有改车牌 */
          if(this.inParkConfirm.car_no == new_car_no){
            this.$confirm(`是否覆盖历史入场记录?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(response=>{
              this.confirminpark(this.inParkConfirm.in_device_id,this.inParkConfirm.temp_inout_id, this.inParkConfirm.old_temp_inout_id);
            })
          }
          else {
            this.carrevise(new_car_no).then(response=>{
              this.confirminpark(this.inParkConfirm.in_device_id,  this.inParkConfirm.temp_inout_id);
            })
            .catch(response => this.$message.error(response.message));;
          }
        }
      }
      /**车牌矫正 */
      else this.carrevise(new_car_no).then(response=>{
        this.ifReviseNumber = false;
        this.loadAreaCarDatas();
      })
      .catch(response => this.$message.error(response.message));;
    },

    confirminpark(id, temp_inout_id, old_temp_inout_id/*/重复入场类型:1.覆盖历史，2.车牌校正*/){
      this.$api.monitor.confirminpark(new RequestParams()
      .addAttribute("repeat_inpark_type", old_temp_inout_id?1:false)
      .addAttribute("old_temp_inout_id", old_temp_inout_id)
      .addAttribute("temp_inout_id", temp_inout_id)).then(response=>{
        this.openBrake(id);
        this.ifReviseNumber = false;
        this.$message.success(response.message)
      })
      .catch(response => this.$message.error(response.message));
    },

    confirmoutpark(){
      // temp_inout_id	Y	string	临时出入记录ID
      // operator_id	Y	string	操作员ID
      // pay_mode           	Y	int	支付方式(0：现金1：微信公众号支付2：微信刷卡支付3：支付宝网页支付4：支付宝刷卡支付)
      // remark	N	string	备注

      if(this.manualEntry.selectedCar.id) this.$api.monitor.confirmoutpark(new RequestParams()
        .addAttribute("temp_inout_id", this.manualEntry.tempCar.temp_inout_id)
        .addAttribute("old_inout_id", this.manualEntry.selectedCar.id)
        .addAttribute("pay_mode", 0)
        ).then(response=>{
          this.manualEntry.isShow = false;
          this.manualEntry.tempCar = {};
        })
        .catch(response => this.$message.error(response.message));
      else this.$alert("请选择");
    },

    carrevise(new_car_no){
      return this.$api.monitor.carrevise(new RequestParams()
      // inout_id	Y		出入记录ID
      // old_car_no	Y		原车牌
      // new_car_no	Y		新车牌
      // remark	N	string	备注
      .addAttribute("inout_id", this.inParkConfirm.id)
      .addAttribute("old_car_no", this.inParkConfirm.car_no)
      .addAttribute("new_car_no", new_car_no)
      )
    },

    changeShifts(){
      // user_name	Y	String	用户名
      // password	Y	String	密码
      // old_operator_id	Y	String	原用户ID
      // device_id	Y	String	设备ID（只工作站类型）
      // in_total	Y	int	入场数
      // out_total	Y	int	出场数
      // totalfee	Y	decimal(10,2)	总收费金额
      // remark	N	string	备注
      // User.info.user_name
      this.$api.monitor.changeshifts(new RequestParams()
      .addAttribute("user_name", this.changeShiftsUsername)
      .addAttribute("password", this.changeShiftsPassword)
      .addAttribute("old_operator_id", this.userInfo.id)
      .addAttribute("device_id", this.works.id)
      .addAttribute("in_total", this.recentPassageDatas.length)
      .addAttribute("out_total", this.recentPassageDatas.filter(o=>o.out_device_id).length)
      .addAttribute("totalfee", this.totalfee)
      )
      .then(async response=>{
        let userInfo = response.dataItems[0].attributes;
        if(userInfo.project_id != User.project_id){
          this.$alert("非法登陆")
        }
        else {
          let menus = await this.$api.menu.getlist(new RequestParams().addAttribute("page_size", -1))
          if(menus.dataItems.findIndex(o=>o.attributes.resource_url == this.$route.path) >= 0){
            User.info = this.userInfo = userInfo;
            CentralInterface.$emit("refreshUser")
            this.ifChangeShifts = false
            this.$message.success("登陆成功")
          }
          else this.$alert("非法登陆")
        }
      })
      .catch(response => this.$message.error(response.message));

    },

    loadCarDatas() {
      let k = this.tempOccupy.selectKey
      this.$api.car
        .getlist(new RequestParams()
        .addAttribute("key", k && `and is_oauth = 1 and (household_name like '%${k}%' or tel like '%${k}%' or car_no like '%${k}%')`)
        .addAttribute("page_size", -1)
        )
        .then(response => {
          this.tempOccupy.cars = response.dataItems.map(o=>o.attributes);
        })
        .catch(response => this.$message.error(response.message));
    },

    /**这是场内车辆查询和系统消息查询的弹窗 */
    loadAreaCarDatas(tip){
      let keys = `AND 1=1`;
      keys += `${tip?` and remark is not null`:''}`
      keys += `${this.searchAreaCar.carPlate?` and car_no like '%${this.searchAreaCar.carPlate}%'`:""}`
      keys += `${this.searchAreaCar.equip?` and ${this.searchAreaCar.equip.device_type=='INLET'?'in_device_id':'out_device_id'} = '${this.searchAreaCar.equip.id}'`:""}`;
      if(this.searchAreaCar.timeQuantum){
        let t = this.searchAreaCar.timeQuantum;
        keys += `${t[0]?` and in_time >= '${t[0]}'`:""}`
        keys += `${t[1]?` and in_time <= '${t[1]}'`:""}`;
      }

      this.$api.monitor.incarquery(new RequestParams().addAttribute("key",keys))
      .then(response=>{
          this.systemMessageDatas.attributes = this.areaCarDatas.attributes = response.attributes;
          this.areaCarDatas.dataItems = response.dataItems.map(o=>o.attributes);
          this.systemMessageDatas.dataItems = this.areaCarDatas.dataItems.map(o=>({date:o.in_time,content:o.remark}))
      })
      .catch(response => this.$message.error(response.message));
    },
    /**
     * 1。 先获取工作站并判断该工作站是否正确是本机工作站
     * 2.  再获取工作站下的出入口设备并将其显示在屏幕上， 一个设备对应一个视频直播
     * 3.  然后根据Socket消息来获取设备运行的情况
     */
    loadDeviceDatas() {
      //先获取工作站
      this.$api.device
        .getlist(new RequestParams()
        .addAttribute("key", ` AND device_type = 'WORKS'`)
        .addAttribute("page_size", -1)
        )
        .then(response => {
          if(!response.dataItems.length){
            return this.$alert("没有配置工作站");
          }
          let WORKS = this.works = response.dataItems.map(o => o.attributes).filter(o=>o.device_ip == this.network.ips[0])[0];
          if(!WORKS){
            return this.$alert("请检验工作站IP与本机IP是否一致");
          }

          this.$api.device
            .getlist(new RequestParams()
            .addAttribute("key", ` AND device_type in ('INLET','OUTLET') AND pid = '${WORKS.id}'`) //  = ''
            .addAttribute("page_size", -1)
            )
            .then(response => {
              let devices = response.dataItems.map(o=>{
                let item = o.attributes;
                item.photo = "";
                item.isPhoto = false;
                item.status = false;
                item.equip_switch = false;
                return item;
              });
              if(devices.length < 2){
                return this.$alert("请检验工作站出入口配置是否正确");
              }
              this.devices = array2Object(devices);
              for(let id in this.devices){
                this.mrLIDeviceSocket.addDeviceEventListener(id, this.receiveSocketMessage, this);
              }

              this.mrLIDeviceSocket.connection();
              new DataDictionary(this.$api).ins().then(datas => this.dataDictionary = datas)
            })
            .catch(response => this.$message.error(response.message))
        })
        .catch(response => this.$message.error(response.message));
    },

    /**实在没办法了，这是人工出入场的车牌选择 */
    loadAreaCarDatas2(car_no){
      if(car_no && car_no.length < 6){
        return ;
      }
      let k = this.manualEntry.selectDevice.device_type;

      this.$api.monitor.incarquery(new RequestParams()
      .addAttribute("key", 
      (car_no ? ` and car_no like '%${car_no}%'` : `and car_no is null or car_no = ''`) + 
      (k ? ` and ${k == 'INLET'?'in_device_id':'out_device_id'} = '${this.manualEntry.selectDevice.id}'` : ``)))
      .then(response=>{
        this.manualEntry.cars = response.dataItems.map(o=>o.attributes);
      })
      .catch(response => this.$message.error(response.message));
    },

    addRecentPassage(device_id, time, photo, response){
      this.recentPassageDataObjs[response.temp_inout_id] = $.extend(this.recentPassageDataObjs[response.temp_inout_id] || {}, response);
      this.recentPassageDatas = Object.values(this.recentPassageDataObjs).sort((a, b)=>new Date(b[time]) - new Date(a[time]))
      if(response.tip){
        this.systemMessagesDatas.unshift({date:response[time],content:response.tip})
        this.$notify.info({
          title: '消息',
          message: response.tip,
          position: 'bottom-right'
        });
      }
      if(response[device_id]){
        this.devices[response[device_id]].isPhoto = true;
        this.devices[response[device_id]].photo = response[photo];
        setTimeout(()=>{
          this.devices[response[device_id]].isPhoto = false;
        },5000);
      }
      /**闸机状态 */
      switch(+response.gate_state){
        /**已经开闸 */
        case MrLIDeviceSocket.GATE_STATE.GATE_STATE_OPEN:{
          this.openBrake(device_id);
          break;
        }
        /**确认开闸 */
        case MrLIDeviceSocket.GATE_STATE.GATE_STATE_CONFIRM:{
          this.inParkConfirm = response
          this.ifReviseNumber = true;
          break;
        }
        /**重复入场 */
        case MrLIDeviceSocket.GATE_STATE.GATE_STATE_IN_REPEAT:{
          this.inParkConfirm = response
          this.ifReviseNumber = true;
          break;
        }
        /**无入场记录 */
        case MrLIDeviceSocket.GATE_STATE.GATE_STATE_NO_RECORD:{
          //弹窗 人工出入场
          //加载在场内车辆查询中获取所有没有车牌号的记录
          //选择车牌对应的记录
          //调用确认出场接口
          this.manualEntry.isShow = true;
          this.manualEntry.tempCar = response;
          this.manualEntry.selectedCar.car_no = response.car_no
          this.loadAreaCarDatas2(response.car_no);
          break;
        }
        /**需要收费 */
        case MrLIDeviceSocket.GATE_STATE.GATE_STATE_CHARGE:{
          break;
        }
        /**支付成功 */
        case MrLIDeviceSocket.GATE_STATE.GATE_STATE_PAY_SUCCESS:{
          break;
        }
        /**支付失败 */
        case MrLIDeviceSocket.GATE_STATE.GATE_STATE_PAY_FILE:{
          break;
        }
        default: break;
      }
    },
    /**
     * 收到Socket消息
     */
    receiveSocketMessage(response){
      console.log(response);
      switch(response.ws_notify_type){
        /**车辆出场 */
        case MrLIDeviceSocket.WS_OPERATE_TYPES.OUTPARK:{
          if(response.temp_inout_id){
            this.addRecentPassage("out_device_id","out_time","out_photo",response)
          }
          break;
        }
        /**车辆入场 */
        case MrLIDeviceSocket.WS_OPERATE_TYPES.INPARK:{
          if(response.temp_inout_id){
            this.addRecentPassage("in_device_id","in_time","in_photo",response)
          }
          break;
        }
        /**确认入场 */
        case MrLIDeviceSocket.WS_OPERATE_TYPES.CONFIRMINPARK:{
          break;
        }
        /**确认出场 */
        case MrLIDeviceSocket.WS_OPERATE_TYPES.CONFIRMOUTPARK:{
          break;
        }
        /**开闸 */
        case MrLIDeviceSocket.WS_OPERATE_TYPES.OPENBRAKE:{
          break;
        }
        default: {
        };
      }
      this.pucker = !this.pucker;
    },
  },
  components:{
    Pagination,licensePlate
  },
  computed:{
    totalfee(){
      return this.recentPassageDatas.filter(o=>o.out_operator_id==this.userInfo.id).reduce((a,b)=>a.collected+b.collected,0);
    },
  },
  mounted() {
    this.loadDeviceDatas();
    console.log(this.$route)
  },
  destroyed(){
    this.mrLIDeviceSocket.disconnect();
  }
};
</script>

<style scoped>
@import "../../assets/css/EquipmentMonitoring.css";
</style>
