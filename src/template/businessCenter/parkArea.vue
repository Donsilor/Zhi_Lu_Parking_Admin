<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="add-department blu-button" @click="showEditParkArea()">+新增</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="cominput fl">
          <span class="conditions-text">编号：</span>
          <input type="text" placeholder="请输入" v-model="searchParams.area_code">
        </div>
        <div class="cominput fl">
          <span class="conditions-text">车场类型：</span> 
            <select name="" v-model="searchParams.park_type">
                <option value="null">请选择</option>
                <option  v-for="(park,index)  in park_types" :value="index" :key="index">{{park}}</option>
            </select>
        </div>
        <div class="cominput fl normargin">
          <span class="conditions-text">区域类型：</span>
              <select name="" v-model="searchParams.area_type">
                <option value="null">请选择</option>
                <option  v-for="(area,index)  in area_types[searchParams.park_type]" :value="index" :key="index">{{area}}</option>
              </select>
        </div>
        <div class="cominput fl">
          <span class="conditions-text">名称：</span>
          <input type="text" placeholder="请输入" v-model="searchParams.area_name">
        </div>
        <div class="fl create">
          <span>创建时间：</span>
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
          <button class="plechoose fl" @click="selectedAll">{{selectedArea.length>0?"全不选":"全选"}} <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl" @click="delPark(null)">批量删除</button>
          <button class="greenbut fl" @click="showEditParkAreaConfig(null)">配置车场收费标准</button>
          <div>共搜索到 <span>{{areas.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button" @click="loadAreasDatas()">搜索</button>
          <button class="clear-button bluborder-button" @click="searchParams = {}, searchTimes = []">清除</button>
          <button class="ss transf-button" v-bind:class="{hide:searchDivShow}" v-on:click="searchDivShow=!searchDivShow">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{searchDivShow === true ? "收起搜索" : "展开搜索"}}</span>
          </button>
        </div>
      </div>
    </div>
    <!-- 车场区域 -->
    <div class="result clf">
      <div class="selected" v-show="selectedArea.length">已选 <span>{{selectedArea.length}}</span> 项数据</div>
      <div class="tab">
        <table class="yardarea-table">
          <tr>
            <th></th>
            <th>编号</th>
            <th>名称</th>
            <th>车场类型</th>
            <th>区域类型</th>
            <th>区域车位数</th>
            <th>是否限制<br/>临时在车</th>
            <th>创建时间</th>
            <th>更新时间</th>
            <th>操作员</th>
            <th>操作</th>
          </tr>
          <tr v-for="(area, index) in areas.dataItems" v-bind:key="index">
            <td><input type="checkbox" :value="index" v-model="selectedArea"></td>
            <td>{{area.area_code}}</td>
            <td>{{area.area_name}}</td>
            <td>{{["普通车场"/*0*/,"大套小车场"/*1*//*一个项目ID下只能有一种车场类型*/][area.park_type]}}</td>
            <td>{{[["地面车库","地下车库","其他车库"]/*普通车场时：0地面车库 1地下车库 2其他车库（如机械车库等）*/,["大车场","小车场"]/*(大套小车场时：0大车场 1小车场)*/][area.park_type][area.area_type]}}</td>
            <td>{{"没有返回这个字段"}}</td>
            <td>{{["不限制","限制"/*是否限制临时车(0：不限制1：限制)*/][area.temp_car_inout]}}</td>
            <td>{{area.create_time}}</td>
            <td>{{area.update_time}}</td>
            <td>{{area.user_name}}</td>
            <td>
              <a href="javascript:" class="bj" @click="showEditParkArea(index)">编辑</a>
              <a href="javascript:" class='delete' @click="delPark(index)">删除</a>
              <a href="javascript:" @click="showCarManager(index)">管理车位</a>
              <a href="javascript:" class="fees" @click="showEditParkAreaConfig(index)">收费标准</a>
            </td>
          </tr>
        </table>
      </div>
      <Pagination
        :previousPage="loadAreasDatas" 
        :nextPage="loadAreasDatas"
        :skipPage="loadAreasDatas"
        :pageIndex="areas.attributes.page_index"
        :totalPages="areas.attributes.total_pages"
        :pageSize="areas.attributes.page_size"
        :tatal="areas.attributes.tatal"
      ></Pagination>
    </div>
    <!--新增和编辑车场弹窗-->
    <div class="main" v-if="ifRenew">
      <div class="depwd" v-drag.cursor="'#Renew'">
        <div class="top-nav" id="Renew">
          <p class="t-text fl">车场区域</p>
          <p class="close fr" @click="ifRenew = false">x</p>
        </div>
        <div class="bot">
          <p class="red" hidden><i class="iconfont icon-jian-tianchong"></i>错误提示的文案<span>x</span></p>
          <div class="cet">
            <div class="clf">
              <p class="clf"><span class="fl">编号：</span><input class="fl" type="text" v-model="areaDatas.area_code" placeholder="请输入编号，必填"></p>
              <p class="clf"><span class="fl">名称：</span><input class="fl" type="text" v-model="areaDatas.area_name" placeholder="请输入"></p>
              <p class="clf"><span class="fl">车场类型：</span>
                <select name="" value="0" v-model="areaDatas.park_type">
                  <option  v-for="(park,index)  in park_types" :value="index" :key="index">{{park}}</option>
                </select>
              <p class="clf"><span class="fl">区域类型：</span>
                <select name="" value="0" v-model="areaDatas.area_type">
                  <option  v-for="(area,index)  in area_types[areaDatas.park_type||0]" :value="index" :key="index">{{area}}</option>
                </select>
              </p>
              <p class="clf"><span class="fl">区域车位数：</span><input class="fl" type="text" v-model="areaDatas.area_type" placeholder="请选择"></p>
              <p class="clf"><span class="fl">是否限制临时车：</span>
                <span class="p-text">
							<span class="flase fl ckb"><input class="rad" type="radio" id="deo1" v-model="areaDatas.temp_car_inout" name="radio" value="0"><label
                for="deo1"></label></span>
								<span class="rad-text fl">否</span>
								<span class="true fl ckb"><input class="rad" type="radio" id="deo2" v-model="areaDatas.temp_car_inout" name="radio" value="1"><label
                  for="deo2"></label></span>
								<span class="rad-text fl">是</span>
								</span>
              </p>
              <p class="clf"><span class="fl">进入限制时长：</span>
                <input class="minute" type="text" value="5" v-model="areaDatas.in_time_long">分钟
              </p>
              <p class="bz clf"><span class="fl">备注：</span><input class="fl" type="text" v-model="areaDatas.remark" placeholder="请输入备注" id="inp"></p>
            </div>
            <div class="button clf">
              <a class="qr fr" @click="editParkArea">确定</a>
              <a class="qx fr" @click="ifRenew = false">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 收费标准弹窗 -->
    <div class="main1" v-if="ifConfig">
      <div class="depwd" v-drag.cursor="'#Config'">
        <div class="top-nav" id="Config">
          <p class="t-text fl">收费标准配置</p>
          <p class="fees-close fr" @click="ifConfig = false">x</p>
        </div>
        <div class="bot clf">
          <div class="bot-left fl">
            <input type="text" placeholder="请输入内容" v-model="searchStandard.key"/>
            <!-- 已有收费标准树结构 -->
            <div class="feestype">
              <el-tree 
              :data="standards.tree" 
              :props="defaultProps" 
              :node-key="'id'"
              :highlight-current="true"
              @node-click="handleNodeClick"
              :render-content="renderRoleNodeContent"></el-tree>
            </div>
          </div>
          <div class="bot-right fr">
            <div class="nav-choose clf">
              <div class="clf"><span>收费标准：</span>
                <el-cascader
                  expand-trigger="hover"
                  :options="chargeStandardOptions"
                  :props="{
                    value:'dic_code',
                    children:'children',
                    label:'remark'
                  }"
                  v-model="chargeStandards"
                  @change="changeForm">
                </el-cascader>
              </div>
            </div>
            <!-- 月卡 -->
            <div class="center-right clf" v-if="[0,1].some(o=>o==chargeStandards[1])">
               <ul class="clf" v-for="(item, index) in standardData.depict" v-bind:key="index">
                <li><span>{{item.count}}个月：</span><input type="number" step="1" min="1" max="1000" v-model="item.fee"/></li>
                <!-- <li><span>{{index+6}}个月：</span><input type="number" step="1" min="1" max="1000" v-model="mCodes[index+5]"/></li> -->
               </ul>
            </div>
            <!-- 年卡 -->
            <div class="center-right clf" v-else-if="[2,3].some(o=>o==chargeStandards[1])">
              <ul class="clf">
                <li  v-for="(item, index) in standardData.depict" v-bind:key="index">
                  <span>{{item.count}}年：</span><input type="number" step="1" min="1" max="99999" v-model="item.fee"/></li>
              </ul>
            </div>
            <!-- 深圳住宅收费 -->
            <div class="center-right clf" v-else-if="chargeStandards[1]==4">
              <ul class="clf">
                <li class="marginBottom50">
                  <div class="clf">
                    <span>进场免费时间：</span>
                    <input class="width100" type="number" step="1" min="1" max="60" v-model="standardData.depict.freeTime"/>
                    <span>分钟</span>
                  </div>
                  <div>
                    <label><input type="checkbox" v-model="standardData.depict.chargeIncludeFreeTime"><span>计费包含免费分钟</span></label>
                  </div>
                </li>
                <li>
                  <div class="clf">
                    <span>最高收费：</span>
                    <input class="width100" type="number" step="1" min="1" max="60" v-model="standardData.depict.maxFee"/>
                    <span>元</span>
                  </div>
                </li>
                <li class="widthMax marginBottom50" >
                  <label>
                    <input type="radio" name="residenceChargeStandardRadio" value="DAY" v-model="standardData.depict.chargeType">
                    <span>按天收费&emsp;&emsp;</span>
                  </label>
                  <div class="fl">
                    <span>收费金额：</span>
                    <input type="number" step="1" min="1" max="100" v-model="standardData.depict.dayFee">
                    <span>元</span>
                  </div>
                </li>
                <li class="widthMax" >
                  <label class="fl">
                    <input type="radio" name="residenceChargeStandardRadio" value="HOUR" v-model="standardData.depict.chargeType">
                    <span>按时收费&emsp;&emsp;</span>
                  </label>
                  <div class="fl">
                    <span>首时段&emsp;收费单位时间：</span>
                    <input class="width100" type="number" step="1" min="1" max="100" v-model="standardData.depict.firstTime">
                    <span>小时</span>
                    <input class="width100" type="number" step="1" min="1" max="100" v-model="standardData.depict.firstTimeFee">
                    <span>元</span>
                  </div>
                </li>
                <li class="widthMax">
                  <label class="fl">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</label>
                  <div class="fl">
                    <span>其他时段&emsp;每小时收费：</span>
                    <input class="width100" type="number" step="1" min="1" max="100" v-model="standardData.depict.otherTimeFee">
                    <span>元</span>
                  </div>
                </li>
              </ul>
            </div>
            <!-- 按小时收费 -->
            <div class="center-right clf" v-else-if="chargeStandards[1]==5">
              <ul class="clf">
                <li>
                  <span>进场免费时间：</span>
                  <input type="number" step="1" min="1" max="1000" v-model="standardData.depict.freeTime"/>
                  <span class="widthAuto">分钟</span>
                </li>
                <li  v-for="(item, index) in standardData.depict.hourFeeList" v-bind:key="index">
                  <span>{{item.count}}小时：</span><input type="number" step="1" min="1" max="1000" v-model="item.fee"/></li>
                <li><span>最高收费：</span><input type="number" step="1" min="1" max="1000" v-model="standardData.depict.maxFee"/></li>
              </ul>
            </div>
            <!-- 按次收费 -->
            <div class="center-right clf" v-else-if="chargeStandards[1]==6">
              <ul class="clf">
                <li>
                  <span>进场免费时间：</span>
                  <input type="number" step="1" min="1" max="1000" v-model="standardData.depict.freeTime"/>
                  <span class="widthAuto">分钟</span>
                </li>
                <li><span>每次收费：</span><input type="number" step="1" min="1" max="1000" v-model="standardData.depict.timeFee"/></li>
                <li><span>最高收费：</span><input type="number" step="1" min="1" max="1000" v-model="standardData.depict.maxFee"/></li>
                <li>
                  <label>
                    <input type="checkbox" v-model="standardData.depict.overDayRepeatCharge">
                    <span>24小时后重复计费</span>
                  </label>
                </li>
              </ul>
            </div>
            <!-- 自定义收费 -->
            <div class="center-right clf" v-else-if="chargeStandards[1]==7">
              <ul class="clf">
                <li>
                  <span>进场免费时间：</span>
                  <input type="number" step="1" min="1" max="1000" v-model="standardData.depict.freeTime"/>
                  <span class="widthAuto">分钟</span>
                </li>
                <li><span>每次收费：</span><input type="number" step="1" min="1" max="1000" value="250"/></li>
              </ul>
              <table class="tempChargeStandard" cellpadding="0" cellspacing="0">
                <tr>
                  <th>开始时间</th>
                  <th>结束时间</th>
                  <th>收费金额(元)</th>
                  <th>计费单位(分钟)</th>
                  <th>操作</th>
                </tr>
                <tr v-for="(item, index) in standardData.depict.timeIntervalFeeList" :key="index">
                  <td>{{item.beginTime}}</td>
                  <td>{{item.endTime}}</td>
                  <td>{{item.unitTimeFee}}</td>
                  <td>{{item.unitTime}}</td>
                  <td>
                    <a href="javascript:">编辑</a>
                    <a href="javascript:">删除</a>
                  </td>
                </tr>
              </table>
              <div class="tempChargeStandardEdit">
                <ul class="clf">
                  <li>
                    <span>开始时间：</span>
                    <input type="time" v-model="tandardData.depict.beginTime">
                  </li>
                  <li>
                    <span>结束时间：</span>
                    <input type="time" v-model="tandardData.depict.endTime">
                  </li>
                  <li>
                    <span>收费金额：</span>
                    <input type="number" step="1" min="1" max="1000" v-model="tandardData.depict.unitTimeFee">
                  </li>
                  <li>
                    <span>计费单位：</span>
                    <input type="number" step="1" min="1" max="1000" v-model="tandardData.depict.unitTime">
                    <span>分钟</span>
                  </li>
                  <li class="widthMax btns">
                    <a href="javascript:" class="addBtn">添加</a>
                    <a href="javascript:">清空</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="right-button clf" v-if="chargeStandards[1]">
              <a class="fees-save" href="javascript:" @click="editStandar()">确认保存</a>
              <a class="fees-add" href="javascript:" @click="copyAndP()">复制/粘贴</a>
              <a class="fees-add" href="javascript:" @click="clickAddStandard()">新增</a>
            </div>
          </div>
        </div>
      </div>
    </div> 
    <!-- 车位管理弹窗 -->
    <div class="vehreg-main" v-if="ifVehreg">
      <div class="depwd" v-drag.cursor="'#Vehreg'">
        <div class="top-nav" id="Vehreg">
          <p class="t-text fl">车位管理</p>
          <p class="v-close fr" @click="ifVehreg = false">x</p>
        </div>
        <div class="bot clf">
          <div class="vc-cet">
            <div class="clf">
              <p class="clf">
                <span class="fl">车场区域：</span>
                <input type="text" v-model="placeDatas.parkArea">
              </p>
              <p class="clf">
                <span class="fl">车位号：</span>
                <input type="text" v-model="placeDatas.car_place_no">
              </p>
              <p class="button clf">
                <a class="v-qr fl" @click="editCarsDatas()">添加车位</a>
                <a class="v-qr fl" @click="ifImportAuthorize = true">导入车位</a>
              </p>
            </div>
          </div>
          <div class="vehregHandle clf">
            <div class="fl">
              <button class="plechoose fl" @click="selectedCarAll()">{{selectedCar.length>0?"全不选":"全选"}}  <img src="../../assets/images/icon_9.png" alt=""></button>
              <button class="batchdel fl" @click="delCar(null)">批量删除</button>
              <button class="greenbut fl" @click="mergeCar(null)">合并到车位组</button>
              <div class="fl">共搜索到 <span >{{cars.attributes.tatal}}</span> 条数据</div>
            </div>
            <div class="fr ParkingSpotSearch clf">
              <span class="fl">车位号：</span>
              <input type="search" placeholder="请输入车位号" v-model="searchCars.key">
              <button class="v-qr fr" @click="loadCarsDatas()">搜索</button>
            </div>
          </div>
          <div class="selected" v-show="selectedCar.length">已选 <span>{{selectedCar.length}}</span> 项数据</div>
          <div class="residents-table clf">
            <table>
              <tr>
                <th></th>
                <th>车位组编号</th>
                <th>车位号</th>
                <th>创建时间</th>
                <th>更新时间</th>
                <th>操作员</th>
                <th>操作</th>
              </tr>
               <tr v-for="(car, index) in cars.dataItems" v-bind:key="index">
            <td><input type="checkbox" :value="index" v-model="selectedCar"></td>
            <td>{{car.car_group_id}}</td>
            <td>{{car.car_place_no}}</td>
            <td>{{car.create_time}}</td>
            <td>{{car.update_time}}</td>
            <td>{{car.operator_id}}</td>
            <td>
              <a href="javascript:" class="bj" @click="editPlace(index)">编辑</a>
              <a href="javascript:" class='delete' @click="delCar(index)">删除</a>
            </td>
          </tr>
            </table>
          </div>
          <Pagination
            :previousPage="loadCarsDatas" 
            :nextPage="loadCarsDatas"
            :skipPage="loadCarsDatas"
            :pageIndex="cars.attributes.page_index"
            :totalPages="cars.attributes.total_pages"
            :pageSize="cars.attributes.page_size"
            :tatal="cars.attributes.tatal"
          ></Pagination>
        </div>
      </div>
    </div> 
    <!-- 导入车位 -->
    <div class="import-main" v-if="ifImportAuthorize">
      <div class="depwd" v-drag.cursor="'#ImportAuthorize'">
        <div class="top-nav" id="ImportAuthorize">
          <p class="t-text fl">导入车位</p>
          <p class="close fr" @click="ifImportAuthorize = false">x</p>
        </div>
        <div class="bot">
          <div class="cet clf">
            <div class="fl choose-file">选择文件<input type="file" accept=".xls,.xlsx"  /></div>
            <a class="fr downloadtemp" href="javascript:">下载模板</a>
            <p>支持扩展名：.xls .xlsx</p>
          </div>
          <div class="button clf">
            <a class="upload fr" href="javascript:">上传</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 确认删除弹窗 -->
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
// import { User } from "../../assets/js/common";
import {
  RequestParams,
  RequestDataItem,
  User,
  DataDictionary
} from "../../assets/js/entity";
import Pagination from "../Pagination";
import moment from "moment";
import { array2Descendants } from "../../assets/js/common";
export default {
  data() {
    return {
      toggleSearchText: "收起搜索",
      searchDivShow: true,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      searchTimes: [],
      searchAreaHlodId: null,
      ifConfig: false,
      ifRenew: false,
      ifVehreg: false,
      ifImportAuthorize: false,
      ifDel: false,
      areas: {
        attributes: {
          page_index: 1, //当前页码
          page_size: 2, //当前页数
          tatal: 10, //总条目数
          total_pages: 10 //条页数
        },
        dataItems: {}
      },
      // 车位信息
      cars: {
        attributes: {
          page_index: 1, //当前页码
          page_size: 2, //当前页数
          tatal: 10, //总条目数
          total_pages: 10 //条页数
        },
        dataItems: {}
      },
      selectedArea: [],
      // 车场区域查询数据
      searchParams: {
        project_id: null,
        area_code: null,
        area_name: null,
        park_type: null,
        area_type: null,
        key: null,
        begin_time: null,
        end_time: null,
        page_index: null,
        page_size: null
      },
      /**车场数据 */
      areaDatas: {
        id: null,
        project_id: null,
        area_code: null,
        area_name: null,
        park_type: 0,
        area_type: 0,
        temp_car_inout: null,
        in_time_long: null,
        create_time: null,
        update_time: null,
        operator_id: null,
        user_name: null,
        remark: null
      },
      park_types: ["普通车场", "大套小车场"],
      area_types: [["地面车库", "地下车库", "其他车库"], ["大车场", "小车场"]],
      selectedCar: [],
      // 车位数据
      placeDatas: {
        id: null,
        project_id: User.info.project_id,
        area_id: null,
        car_place_no: null,
        car_group_id: null,
        create_time: null,
        update_time: null,
        operator_id: User.info.id,
        parkArea: null,
        remark: null
      },
      // 车位查询
      searchCars: {
        key: null //车位号或者车位编号组
      },
      /* 收费标准配置 - 收费标准 */
      chargeStandardValue: "",
      chargeStandards: [],
      chargeStandardOptions: [],
      // 已有收费标准数据
      standards: {
        attributes: {
          page_index: 1, //当前页码
          page_size: 2, //当前页数
          tatal: 10, //总条目数
          total_pages: 10 //条页数
        },
        tree: [
          {
            label: "月卡A",
            children: [
              { label: "月卡A · 有位月卡收费标准" },
              { label: "月卡A · 有位月卡收费标准" }
            ]
          },
          {
            label: "临时车A",
            children: [
              { label: "临时车A · 深圳住宅收费标准" },
              { label: "临时车A · 通用收费标准1（按小时收费）" }
            ]
          },
          {
            label: "临时车B",
            children: [
              { label: "临时车B · 通用收费标准3（自定义收费）" },
              { label: "临时车B · 通用收费标准2（按次收费）" }
            ]
          }
        ],
        dataItems: []
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 当前选择的已有收费标准
      selectedParentIndex: -1,
      // 点击的节点数据
      clickStandar: null,
      // 收费标准查询
      searchStandard: {
        project_id: null,
        area_id: null,
        key: null
      },
      searchStandards:{},
      standardData:{},
      // 收费标准上传数据结构
      standardDatas: {
        id: null,
        project_id: null,
        area_id: null,
        standard_code: null,
        standard_name: null,
        car_type: null,
        standard_type: null,
        standard_content: null,
        operator_id: null,
        ramark: null
      },
      // 月卡
      mCodes:[],
      // 年卡
      yCodes:[],
      // 深圳住宅
      sCodes:[],
      // sCodes:{
      //   come:null,
      //   max:null,
      //   haveIn:null,
      //   day:null,
      //   money:null,
      //   hour:null,
      //   firsttime:null,
      //   firstMoney:null,
      //   otherMoney:null,
      // },
      // 小时收费
      hCodes:[],
      // 次数收费
      tCodes:[],
      // 自定义
      oCodes:[],
      // 粘贴板上的内容
      copys:null,
    };
  },
  components: {
    /**分页组件 */
    Pagination
  },
  methods: {
    /* 切换收费标准 */
    changeForm(value) {
      this.standardData = this.searchStandards.car_type[value[0]].getChildrenKey(value[1])
      console.log(this.standardData, value)
    },
    //车场信息 全选全不选
    selectedAll() {
      if (this.selectedArea.length) {
        this.selectedArea = [];
      } else this.selectedArea = this.areas.dataItems.map((o, i) => i);
    },
    /**显示编辑 */
    showEditParkArea(id) {
      this.areaDatas = this.areas.dataItems[id] || {
        park_type: 0,
        area_type: 0
      };
      this.ifRenew = true;
      this.searchAreaHlodId = this.areaDatas.id;
      this.loadAreasDatas();
    },
    /**显示配置车场收费标准 */
    showEditParkAreaConfig(index) {
      this.searchStandard.area_id =
        index != null ? this.areas.dataItems[index].id : null;
      this.ifConfig = true;
      this.loadStandardDatas();
    },
    /**显示车位管理 */
    showCarManager(index) {
      this.ifVehreg = true;
      let data = this.areas.dataItems[index];
      this.placeDatas.parkArea = data ? data.area_name : "未选择";
      this.placeDatas.area_id = data ? data.id : null;
      this.loadCarsDatas();
    },
    /**新增或编辑车场区域数据 */
    editParkArea() {
      this.$api.area
        .editor(
          new RequestParams()
            .addAttributes(this.areaDatas)
            .addAttribute("project_id", User.info.project_id)
            .addAttribute("operator_id", User.info.id)
        )
        .then(response => {
          this.$message.success(response.message);
          this.ifRenew = false;
          this.loadAreasDatas();
        })
        .catch(({ message }) => this.$message.error(message));
    },
    /**加载车辆区域列表数据 */
    loadAreasDatas(pageNum = 1, params = {}) {
      let searchTimes = this.searchTimes.map(o =>
        moment(o).format("YYYY-MM-DD HH:mm:ss")
      );
      this.$api.area
        .getlist(
          new RequestParams()
            .addAttributes(params)
            .addAttributes(this.searchParams)
            .addAttribute("page_index", pageNum)
            .addAttribute("project_id", User.info.project_id)
            .addAttribute("begin_time", searchTimes[0])
            .addAttribute("end_time", searchTimes[1])
        )
        .then(response => {
          this.areas.attributes = response.attributes;
          this.areas.dataItems = response.dataItems.map(o => o.attributes);
        })
        .catch(response => this.$message.error(response.message));
    },
    // 删除车场数据
    delPark(id) {
      let datas =
        id != null
          ? [this.areas.dataItems[id]]
          : this.selectedArea.map(o => this.areas.dataItems[o]);
      if (datas.length) {
        this.$confirm(
          `确定要删除车场数据[${datas.map(o => o.area_name)}]吗?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() =>
            this.$api.area.delete(
              new RequestParams().addDataItems(
                datas.map(o => new RequestDataItem().addAttribute("id", o.id))
              )
            )
          )
          .then(response => {
            this.$message.success("删除成功");
            this.selectedArea = [];
            this.loadAreasDatas();
          })
          .catch(({ message }) => this.$message.error(message))
          .catch(() => {
            this.$message.info("已取消删除");
          });
      } else this.$message.info("请选择要删除的车场区域");
    },

    // 以下车位信息方法
    selectedCarAll() {
      if (this.selectedCar.length) {
        this.selectedCar = [];
      } else this.selectedCar = this.cars.dataItems.map((o, i) => i);
    },
    // 加载车位数据
    loadCarsDatas(pageNum = 1, params = {}) {
      this.$api.place
        .getlist(
          new RequestParams()
            .addAttributes(params)
            .addAttributes(this.searchCars)
            .addAttribute("page_index", pageNum)
        )
        .then(response => {
          this.cars.attributes = response.attributes;
          this.cars.dataItems = response.dataItems.map(o => o.attributes);
        })
        .catch(response => this.$message.error(response.message));
    },
    // 编辑车位信息,将选中的车位号显示到上方车位号栏中
    editPlace(id) {
      let data = this.cars.dataItems[id];
      if (data) {
        this.placeDatas.car_place_no = data.car_place_no;
        this.placeDatas.id = data.id;
      } else {
        this.$message.error("所选车位不存在！");
      }
    },
    // 编辑或新建车位信息
    editCarsDatas() {
      this.placeDatas.car_group_id =
        this.placeDatas.car_place_no + new Date().getTime();
      this.$api.place
        .editor(
          new RequestParams().addDataItem(
            new RequestDataItem().addAttributes(this.placeDatas)
          )
        )
        .then(response => {
          this.$message.success(response.message);
          this.placeDatas.car_place_no = null;
          this.placeDatas.car_group_id = null;
          this.placeDatas.id = null;
          this.loadCarsDatas();
        })
        .catch(({ message }) => this.$message.error(message));
    },
    // 合并车位组
    mergeCar(id) {
      let datas =
        id != null
          ? [this.cars.dataItems[id]]
          : this.selectedCar.map(o => this.cars.dataItems[o]);
      if (datas.length) {
        this.$confirm(
          `确定要合并车位号[${datas.map(o => o.car_place_no)}]吗?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() =>
            this.$api.place.merge(
              new RequestParams().addDataItems(
                datas.map(o =>
                  new RequestDataItem()
                    .addAttribute("id", o.id)
                    .addAttribute("car_group_id", o.car_group_id)
                )
              )
            )
          )
          .then(response => {
            this.$message.success("合并成功");
            this.selectedCar = [];
            this.loadCarsDatas();
          })
          .catch(({ message }) => this.$message.error(message))
          .catch(() => {
            this.$message.info("已取消合并");
          });
      } else this.$message.info("请选择要合并的车位数据");
    },
    // 删除车位数据
    delCar(id) {
      let datas =
        id != null
          ? [this.cars.dataItems[id]]
          : this.selectedCar.map(o => this.cars.dataItems[o]);
      if (datas.length) {
        this.$confirm(
          `确定要删除车位数据[${datas.map(o => o.car_place_no)}]吗?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() =>
            this.$api.place.delete(
              new RequestParams().addDataItems(
                datas.map(o => new RequestDataItem().addAttribute("id", o.id))
              )
            )
          )
          .then(response => {
            this.$message.success("删除成功");
            this.selectedCar = [];
            this.loadCarsDatas();
          })
          .catch(({ message }) => this.$message.error(message))
          .catch(() => {
            this.$message.info("已取消删除");
          });
      } else this.$message.info("请选择要删除的车位数据");
    },

    // 收费标准管理
    // 收费标准节点点击
    handleNodeClick(data) {
      this.clickStandar = data;
      this.standards.dataItems.forEach((o, i) => {
        if (o.id == data.pid) {
          this.selectedParentIndex = i;
        }
      });
    },
    // 加载收费标准
    loadStandardDatas(pageNum = 1, params = {}) {
      this.$api.standard
        .getlist(
          new RequestParams()
            .addAttributes(params)
            .addAttributes(this.searchStandard)
        )
        .then(response => {
          this.standards.attributes = response.attributes;
          this.standards.dataItems = response.dataItems.map(o => o.attributes);
          
          if(!this.chargeStandardOptions.length) new DataDictionary(this.$api).ins().then(datas => {
            this.searchStandards = datas;
            for(let name in datas.car_type){
              datas.car_type[name].children = datas.car_type[name].depict.split(",").map(o=>{
                if(typeof(datas.standard_type[o].depict) == "string"){
                  datas.standard_type[o].depict = JSON.parse(datas.standard_type[o].depict);
                }
                return datas.standard_type[o]
              })
              datas.car_type[name].getChildrenKey = function(code){
                return this.children.filter(o=>o.dic_code==code)[0];
              }
              this.chargeStandardOptions.push(datas.car_type[name])
            }
            this.chargeStandardOptions = this.chargeStandardOptions;
            console.log(this.chargeStandardOptions)
          });
        })
        .catch(response => this.$message.error(response.message));
    },
    // 点击新增按钮,清空条目
    clickAddStandard(){
      this.yCodes=[];
      this.mCodes=[];
      this.sCodes=[];
      this.hCodes=[];
      this.tCodes=[];
    },
    // 新增或编辑收费标准
    editStandar() {
      console.log(this.chargeStandardValue);
    },
    // 复制或粘贴
    copyAndP(){
      if(this.copys){//已有内容，粘贴
        this.copys=null;

      }else{//复制当前

      }
    },
    // 初始化删除按钮
    renderRoleNodeContent (h, {node, data, store}) {
      return (
        <span class='custom-tree-node'>
          <span> {node.label}</span>
          <span class='handleBtns'>
            < a href='javascript:' onclick='delStandar(node.data)'>< img src={require('../../assets/images/deleteIcon.png')} /></ a>
          </span>
        </span>
      )
    },
    // 删除收费标准
    delStandar(datas) {
      if (datas.length) {
        this.$confirm(
          `确定要删除收费标准数据[${datas.map(o => o.label)}]吗?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() =>
            this.$api.standard.delete(
              new RequestParams().addDataItems(
                datas.map(o => new RequestDataItem().addAttribute("id", o.id))
              )
            )
          )
          .then(response => {
            this.$message.success("删除成功");
            this.loadStandardDatas();
          })
          .catch(({ message }) => this.$message.error(message))
          .catch(() => {
            this.$message.info("已取消删除");
          });
      } else this.$message.info("请选择要删除的车位数据");
    }
  },
  mounted() {
    this.loadAreasDatas(1);
    
  }
};
</script>

<style scoped>
@import "../../assets/css/YardArea.css";
</style>
