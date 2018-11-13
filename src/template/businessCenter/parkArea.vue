<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="add-department blu-button" @click="ifRenew = true">+新增</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="cominput fl">
          <span class="conditions-text">编号：</span>
          <input type="text" placeholder="请输入" v-model="searchParams.area_code">
        </div>
        <div class="cominput fl">
          <span class="conditions-text">车场类型：</span> 
            <select name="" v-model="searchParams.park_type">
                <option  v-for="(park,index)  in park_types" :value="index" :key="index">{{park}}</option>
            </select>
        </div>
        <div class="cominput fl normargin">
          <span class="conditions-text">区域类型：</span>
              <select name="" v-model="searchParams.area_type">
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
          <button class="greenbut fl" @click="showEditParkAreaConfig">配置车场收费标准</button>
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
              <a href="javascript:" class="fees">收费标准</a>
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
    <!--新增和编辑弹窗-->
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
        <div class="bot">
          <div class="bot-left fl">
            <input type="text" placeholder="请输入内容"/>
            <div class="feestype">
              <ul class="clf">
                <li><i class="icon iconfont icon-jjia- fl"></i><span class="li-text fl">月卡A收费标准</span><i
                  class="icon iconfont icon-jian-copy fl"></i></li>
                <li><i class="icon iconfont icon-jjia- fl"></i><span class="li-text fl">月卡B收费标准</span><i
                  class="icon iconfont icon-jian-copy fl"></i></li>
                <li><i class="icon iconfont icon-jjia- fl"></i><span class="li-text fl">临时车A收费标准</span><i
                  class="icon iconfont icon-jian-copy fl"></i></li>
                <li><i class="icon iconfont icon-jjia- fl"></i><span class="li-text fl">临时车B收费标准</span><i
                  class="icon iconfont icon-jian-copy fl"></i></li>
                <li><i class="icon iconfont icon-jjia- fl"></i><span class="li-text fl">临时车C收费标准</span><i
                  class="icon iconfont icon-jian-copy fl"></i></li>
              </ul>
            </div>
          </div>
          <div class="bot-right fr">
            <div class="nav-choose clf">
              <div class="clf"><span>车辆类型：</span>
                <select>
                  <option>月卡A</option>
                  <option>月卡B</option>
                  <option>临时车A</option>
                </select>
              </div>
              <div class="clf"><span>收费标准：</span>
                <select>
                  <option>有位月卡收费标准</option>
                  <option>无位月卡收费标准</option>
                  <option>有位月卡收费标准</option>
                </select>
              </div>
            </div>
            <div class="center-right clf">
              <ul class="clf">
                <li><input type="number" step="1" min="1" max="1000" value="250"/><span>1个月：</span></li>
                <li><input type="number" step="1" min="1" max="1000" value="250"/><span>7个月：</span></li>
                <li><input type="number" step="1" min="1" max="1000" value="250"/><span>2个月：</span></li>
                <li><input type="number" step="1" min="1" max="1000" value="250"/><span>8个月：</span></li>
                <li><input type="number" step="1" min="1" max="1000" value="250"/><span>3个月：</span></li>
                <li><input type="number" step="1" min="1" max="1000" value="250"/><span>9个月：</span></li>
                <li><input type="number" step="1" min="1" max="1000" value="250"/><span>4个月：</span></li>
                <li><input type="number" step="1" min="1" max="1000" value="250"/><span>10个月：</span></li>
                <li><input type="number" step="1" min="1" max="1000" value="250"/><span>5个月：</span></li>
                <li><input type="number" step="1" min="1" max="1000" value="250"/><span>11个月：</span></li>
                <li><input type="number" step="1" min="1" max="1000" value="250"/><span>6个月：</span></li>
                <li><input type="number" step="1" min="1" max="1000" value="250"/><span>12个月：</span></li>
              </ul>
            </div>
            <div class="right-button clf">
              <a class="fees-save" href="javascript:">确认保存</a>
              <a class="fees-add" href="javascript:">新增</a>
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
        <div class="bot">
          <div class="vc-cet">
            <div class="clf">
              <p class="clf">
                <span class="fl">车场区域：</span>
                <input type="text">
              </p>
              <p class="clf">
                <span class="fl">车位号：</span>
                <input type="text" >
              </p>
              <p class="button clf">
                <a class="v-qr fl">添加车位</a>
                <a class="v-qr fl">导入车位</a>
              </p>
            </div>
          </div>
          <div class="vehregHandle clf">
            <div class="fl">
              <button class="plechoose fl" @click="selectedCarAll()">{{selectedCar.length>0?"全不选":"全选"}}  <img src="../../assets/images/icon_9.png" alt=""></button>
              <button class="batchdel fl" @click="delCar(null)">批量删除</button>
              <button class="greenbut fl">合并到车位组</button>
              <div class="fl">共搜索到 <span >{{cars.attributes.tatal}}</span> 条数据</div>
            </div>
            <div class="fr ParkingSpotSearch clf">
              <span class="fl">车位号：</span>
              <input type="search" placeholder="请输入车位号" v-model="searchCars.key">
              <button class="v-qr fr">搜索</button>
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
            <td>{{placeDatas.car_group_id}}</td>
            <td>{{placeDatas.car_place_no}}</td>
            <td>{{placeDatas.create_time}}</td>
            <td>{{placeDatas.update_time}}</td>
            <td>{{placeDatas.operator_id}}</td>
            <td>
              <a href="javascript:" class="bj" @click="aa">编辑</a>
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
    <!-- 确认删除弹窗 -->
    <div class="delete_prompt" v-if="ifDel">
      <div class="depwd">
        <div class="text">你是否确认删除选中的记录</div>
        <div class="button clf">
          <a class="qr fr">确定</a>
          <a class="qx fr" @click="ifDel = false">取消</a>
        </div>
      </div>
    </div>
    <!--弹窗-->
  </div>
</template>

<script>
// import { User } from "../../assets/js/common";
import { RequestParams, RequestDataItem ,User } from "../../assets/js/entity";
import Pagination from "../Pagination";
import moment from "moment";
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
      selectedCar: [],
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
      // 车位数据
      placeDatas: {
        id: null,
        project_id: null,
        area_id: null,
        car_place_no: null,
        car_group_id: null,
        create_time: null,
        update_time: null,
        operator_id: null,
        remark: null
      },
      // 车位查询
      searchCars: {
        key: null //车位号或者车位编号组
      }
    };
  },
  components: {
    /**分页组件 */
    Pagination
  },
  methods: {
    //车场信息 全选全不选
    selectedAll() {
      if (this.selectedArea.length) {
        this.selectedArea = [];
      } else this.selectedArea = this.areas.dataItems.map((o, i) => i);
    },
    /**显示编辑 */
    showEditParkArea(id) {
      this.areaDatas = this.areas.dataItems[id] || {};
      this.ifRenew = true;
      this.searchAreaHlodId = this.areaDatas.id;
      this.loadAreasDatas();
    },
    /**显示配置车场收费标准 */
    showEditParkAreaConfig() {
      this.ifConfig = true;
    },
    /**显示车位管理 */
    showCarManager() {
      this.ifVehreg = true;
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
    // 删除
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
    // 编辑或新建车位信息
    editCarsDatas() {
      this.$api.place
        .editor(
          new RequestParams()
            .addAttributes(this.areaDatas)
            .addAttribute("project_id", User.info.project_id)
            .addAttribute("operator_id", User.info.id)
        )
        .then(response => {
          this.$message.success(response.message);
          this.ifRenew = false;
          this.loadCarsDatas();
        })
        .catch(({ message }) => this.$message.error(message));
    },
    // 删除
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
            this.$api.area.delete(
              new RequestParams().addDataItems(
                datas.map(o => new RequestDataItem().addAttribute("id", o.id))
              )
            )
          )
          .then(response => {
            this.$message.success("删除成功");
            this.loadAreasDatas();
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
