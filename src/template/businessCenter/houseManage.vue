<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="registration-car blu-button" @click="showEditHouses(null)">+新增</button>
        <button class="upload-aut blu-button" @click="ifImportAuthorize = true">导入</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="cominput fl">
          <span class="conditions-text" >庭院：</span>
          <input type="text" placeholder="请输入" v-model="searchParams.courtyard">
        </div>
        <div class="cominput fl">
          <span class="conditions-text">楼栋：</span>
          <input type="text" placeholder="请输入" v-model="searchParams.building">
        </div>
        <div class="cominput fl">
          <span class="conditions-text">单元：</span>
          <input type="text" placeholder="请输入" v-model="searchParams.units">
        </div>
        <div class="cominput fl">
          <span class="conditions-text">房号：</span>
          <div class="custom-input">
          <input type="text" placeholder="请输入" v-model="searchParams.room_no">
          </div>
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
          <button class="batchdel fl" @click="delHouses(null)">批量删除</button>
          <button data-v-a422a792="" class="blu-button fl">导出EXCEL</button>
          <button hidden class="greenbut fl">配置车场收费标准</button>
          <div>共搜索到 <span>{{houses.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button" @click="loadHousesDatas()">搜索</button>
          <button class="clear-button bluborder-button" @click="searchParams = {}, searchTimes = []">清除</button>
          <button class="ss transf-button"  v-bind:class="{hide:!searchDivShow}"
                  v-on:click="searchDivShow=!searchDivShow">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{searchDivShow === true ? "收起搜索" : "展开搜索"}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="selected" v-show="selectedHouses.length">已选 <span>{{selectedHouses.length}}</span> 项数据</div>
      <div class="tab">
        <table class="buildingmanagement-table">
          <tr>
            <th></th>
            <th>庭院</th>
            <th>楼栋</th>
            <th>单元</th>
            <th>房号</th>
            <th>创建时间</th>
            <th>更新时间</th>
            <th>操作员</th>
            <th>操作</th>
          </tr>
          <tr  v-for="(house, index) in houses.dataItems" v-bind:key="index">
            <td><input type="checkbox" :value="index" v-model="selectedHouses" ></td>
            <td><div :title="house.courtyard">{{house.courtyard}}</div></td>
            <td><div :title="house.building">{{house.building}}</div></td>
            <td><div :title="house.units">{{house.units}}</div></td>
            <td><div :title="house.room_no">{{house.room_no}}</div></td>
            <td><div :title="house.create_time">{{house.create_time}}</div></td>
            <td><div :title="house.update_time">{{house.update_time}}</div></td>
            <td><div :title="house.user_name">{{house.user_name}}</div></td>
            <td>
              <a href="javascript:" class="bj" @click="showEditHouses(index)">编辑</a>
              <a href="javascript:" @click="delHouses(index)">删除</a>
            </td>
          </tr>
        </table>
      </div>
      <Pagination
        :previousPage="loadHousesDatas"
        :nextPage="loadHousesDatas"
        :skipPage="loadHousesDatas"
        :pageIndex="houses.attributes.page_index"
        :totalPages="houses.attributes.total_pages"
        :pageSize="houses.attributes.page_size"
        :tatal="houses.attributes.tatal"
      ></Pagination>
    </div>
    <!--弹窗-->
    <div class="main" v-if="ifEditInfo">
      <div class="depwd" v-drag.cursor="'#EditInfo'">
        <div class="top-nav" id="EditInfo">
          <p class="t-text fl">房屋信息</p>
          <p class="close fr" @click="ifEditInfo = false">x</p>
        </div>
        <div class="bot clf">
          <div class="cet">
            <div class="clf">
              <p class="red" hidden >
                <i class="iconfont icon-jian-tianchong"></i>错误提示的文案<span>x</span>
              </p>
              <p class="clf">
                <span class="fl">庭院：</span>
                <input class="fl" type="text" v-model="houseData.temp_courtyard" placeholder="请输入编号，必填">
              </p>
              <p class="clf">
                <span class="fl">楼栋：</span>
                <input class="fl" v-model="houseData.temp_building" type="text" placeholder="请输入6-8位数字密码，必填">
              </p>
              <p class="clf">
                <span class="fl">单元：</span>
                <input class="fl" v-model="houseData.temp_units" type="text" placeholder="请输入6-8位数字密码，必填">
              </p>
              <p class="clf">
                <span class="fl">房号：</span>
                <input class="fl" type="text" v-model="houseData.temp_room_no" placeholder="请输入6-8位数字密码，必填">
              </p>
              <p class="clf">
                <span class="fl">备注：</span>
                <textarea class="fl" v-model="houseData.remark" placeholder="请输入备注"></textarea>
              </p>
            </div>
            <div class="button clf">
              <a class="qr fr" @click="editHouses">确定</a>
              <a class="qx fr" @click="ifEditInfo = false">取消</a>
            </div>
          </div>
          <div class="data clf">
            <a class="addresidents" href="javascript:" v-show="this.searchHouseHlodId" @click="showEditHouseHolds(null)">添加住户</a><span>共搜索到{{houseHolds.attributes.tatal || 0}}条数据</span>
          </div>
          <div class="residents-table">
            <table>
              <tr>
                <!--<th></th>-->
                <th>姓名</th>
                <th>性别</th>
                <th>住户类型</th>
                <th>电话</th>
                <th>证件号码</th>
                <th>证件地址</th>
                <th>出生日期</th>
                <th>创建时间</th>
                <th>更新时间</th>
                <th>操作员</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
              <tr  v-for="(houseHold, index) in houseHolds.dataItems" v-bind:key="index">
                <!--<td><input type="checkbox" :value="index" v-model="selectedHouseHolds" ></td>-->
                <td><div :title="houseHold.full_name">{{houseHold.full_name}}</div></td>
                <td><div :title="houseHold.sex">{{['女','男'][houseHold.sex]}}</div></td>
                <td><div :title="houseHold.household_type">{{['亲属','业主','租客','朋友'/*住户类型(0：亲属1：业主2：租客3：朋友)*/][houseHold.household_type]}}</div></td>
                <td><div :title="houseHold.tel">{{houseHold.tel}}</div></td>
                <td><div :title="houseHold.identification_no">{{houseHold.identification_no}}</div></td>
                <td><div :title="houseHold.addr">{{houseHold.addr}}</div></td>
                <td><div :title="houseHold.birthday">{{houseHold.birthday}}</div></td>
                <td><div :title="houseHold.create_time">{{houseHold.create_time}}</div></td>
                <td><div :title="houseHold.update_time">{{houseHold.update_time}}</div></td>
                <td><div :title="houseHold.user_name">{{houseHold.user_name}}</div></td>
                <td><div :title="houseHold.status">{{['正常','冻结','注销'/*(0：正常1：冻结2：注销)*/][houseHold.status]}}</div></td>
                <td>
                  <a href="javascript:" @click="showEditHouseHolds(index)">编辑</a>
                  <a href="javascript:" class="delete" @click="delHouseHolds(index)">删除</a>
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
    <div class="import-main" v-if="ifImportAuthorize">
      <div class="depwd" v-drag.cursor="'#ImportAuthorize'">
        <div class="top-nav" id="ImportAuthorize">
          <p class="t-text fl">导入授权</p>
          <p class="close fr" @click="ifImportAuthorize = false">x</p>
        </div>
        <div class="bot clf">
          <div class="cet clf">
            <div class="fl choose-file">选择文件<input type="file" accept=".xls,.xlsx" @change="selectImportExcelFile" /></div>
            <a class="fr downloadtemp" >下载模板</a>
            <p>{{importExcelFile.name || ""}} 支持扩展名：.xls .xlsx</p>
          </div>
          <div class="button clf">
            <a class="upload fr" href="javascript:" @click="importExcel()">上传</a>
          </div>
        </div>
      </div>
    </div>
    <div class="add_inhabitant" v-if="ifAddInhabitant">
      <div class="depwd" v-drag.cursor="'#addInhabitant'">
        <div class="top-nav" id="addInhabitant">
          <p class="t-text fl">住户授权</p>
          <p class="close fr" @click="ifAddInhabitant = false">x</p>
        </div>
        <div class="bot clf">
          <div class="cet">
            <div class="clf">
              <p class="red" hidden><i class="iconfont icon-jian-tianchong"></i>错误提示的文案<span>x</span></p>
              <div class="clf">
                <span class="fl">姓名：</span>
                <input class="fl" type="text" placeholder="请输入编号，必填" v-model="houseHoldData.temp_full_name">
              </div>
              <div class="clf">
                <span class="fl">性别：</span>
                <label><input type="radio" name="residentSex" value="1" v-model="houseHoldData.temp_sex">男</label>
                <label><input type="radio" name="residentSex" value="0" v-model="houseHoldData.temp_sex">女</label>
                <!--<input class="fl" type="text" placeholder="19000124000" v-model="houseHoldData.sex">-->
              </div>
              <div class="clf">
                <span class="fl">住户类型：</span>
                <select v-model="houseHoldData.temp_household_type">
                  <option value="0">亲属</option>
                  <option value="1">业主</option>
                  <option value="2">租客</option>
                  <option value="3">朋友</option>
                </select>
              </div>
              <div class="clf">
                <span class="fl">电话号码：</span>
                <input class="fl" type="text" placeholder="请输入6-8位数字密码，必填" v-model="houseHoldData.temp_tel">
              </div>
              <div class="clf">
                <span class="fl">证件号码：</span>
                <input class="fl" type="text" placeholder="请输入6-8位数字密码，必填" v-model="houseHoldData.temp_identification_no">
              </div>
              <div class="clf">
                <span class="fl">证件地址：</span>
                <input class="fl" type="text" placeholder="请输入6-8位数字密码，必填" v-model="houseHoldData.temp_addr">
              </div>
              <div class="clf">
                <span class="fl">出生日期：</span>
                <el-date-picker
                  v-model="houseHoldData.temp_birthday"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <div class="clf">
                <span class="fl">备注：</span>
                <input class="fl w85" type="text" placeholder="请输入备注" v-model="houseHoldData.remark">
              </div>
            </div>
            <div class="button clf">
              <a class="qr fr" @click="editHouseHlolds">确定</a>
              <a class="qx fr" @click="ifAddInhabitant = false">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--弹窗-->
  </div>
</template>

<script>
import { RequestParams, RequestDataItem,User, ExcelSheets } from "../../assets/js/entity";
import Pagination from "../Pagination";
import moment from "moment";
import { array2Object, RegExpCheck } from '../../assets/js/common'
import XLSX from 'xlsx';
export default {
  data () {
    return {
      asd:false,
      searchDivShow: true,
      ifEditInfo: false,
      ifImportAuthorize: false,
      ifAddInhabitant: false,
      /* ele-ui时间插件 */
      searchTimes:[],
      searchHouseHlodId:null,
      searchParams:{
        courtyard:null,
        building:null,
        units:null,
        room_no:null,
        key:null
      },
      selectedHouses:[],
      selectedHouseHolds:[],
      /**房屋数据 */
      houseData:{
        id:null,//          	Y	String	ID
        courtyard:null,//   	Y	String	庭院
        building:null,//    	Y	String	楼栋
        units:null,//       	Y	String	单元
        room_no:null,//     	Y	String	房号
        remark:null,//      	N	String	备注
        temp_courtyard: null, //   	Y	String	庭院副本
        temp_building: null, //    	Y	String	楼栋副本
        temp_units: null, //       	Y	String	单元副本
        temp_room_no: null //     	Y	String	房号副本
      },
      /**房屋住户数据 */
      houseHoldData:{
        id:null,//               	Y	String	ID
        house_id:null,//         	Y	String	房屋ID
        household_type:null,//   	Y	Int	住户类型(0：亲属1：业主2：租客3：朋友)
        full_name:null,//        	Y	String	姓名
        sex:null,//              	Y	Int	性别(0：女1：男)
        tel:null,//              	Y	String	电话
        identification_no:null,//	N	String	证件号码
        addr:null,//             	N	String	证件地址
        birthday:null,//         	N	String	出生日期
        remark:null,//           	N	String	备注
        temp_household_type:null,//   	Y	Int	住户类型(0：亲属1：业主2：租客3：朋友) 副本
        temp_full_name:null,//        	Y	String	姓名 副本
        temp_sex:null,//              	Y	Int	性别(0：女1：男) 副本
        temp_tel:null,//              	Y	String	电话 副本
        temp_identification_no:null,//	N	String	证件号码 副本
        temp_addr:null,//             	N	String	证件地址 副本
        temp_birthday:null,//         	N	String	出生日期 副本
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
      houses:{
        attributes: {
          page_index: 1, //当前页码
          page_size: 2, //当前页数
          tatal: 10, //总条目数
          total_pages: 10 //条页数
        },
        dataItems: [],
      },
      importExcelFile:{},
      ifEditRegister: false,
      ifImportAuthorize: false,
      ifAuthorize: false,
      ifVehreg: false,
      ifTraffic: false,
      ifAuthorizedParking: false
    };
  },
  components: {
    /**分页组件 */
    Pagination
  },
  methods: {
    selectImportExcelFile({target}){
      this.importExcelFile = target.files[0];
    },

    importExcel(){
      this.$confirm(`确定要导入[${this.importExcelFile.name}]吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      })
      .then(()=>{
        let excelSheets = new ExcelSheets();
        for(let name in ExcelSheets.dictionary){
          excelSheets.setSheetHeader(name, Object.keys(ExcelSheets.dictionary[name]));
        }

        return excelSheets.importExcel(this.importExcelFile).then(({住户列表,房屋列表,车辆列表})=>{
          return this.$api.house.editor(new RequestParams()
          .addDataItems(房屋列表.map(o=>new RequestDataItem().addAttributes(o))))
          .then(({dataItems}) => {
            let houses = array2Object(dataItems.map(o=>o.attributes), "code");
            return this.$api.household.editor(new RequestParams()
            .addDataItems(住户列表.map(o=>{
              return new RequestDataItem().addAttributes(o).addAttribute("house_id", houses[o.house_code].id);
            })))
          })
          .then(({dataItems})=>{
            let households = array2Object(dataItems.map(o=>o.attributes), "code");
            return this.$api.car.editor(new RequestParams()
            .addDataItems(车辆列表.map(o=>{
              return new RequestDataItem().addAttributes(o).addAttribute("household_id", households[o.household_code].id);
            })))
          })
          .then(()=>{
            this.$message.success("导入成功");
            this.loadHousesDatas();
          })
          .catch(error => this.$message.error(error.message), console.log(error))
          .catch(error => this.$message.error(error.message))
          .catch(error => this.$message.error(error.message));
        })
      })
      .catch((error) => (this.$message.info("文件不正确，导入失败") ,console.log(error)))
      .catch(() => this.$message.info("已取消删除"))
      .finally(()=>this.ifImportAuthorize = false);
    },

    selectedAll(){
      if(this.selectedHouses.length){
        this.selectedHouses = [];
      }
      else this.selectedHouses = this.houses.dataItems.map((o,i)=>i);
    },

    showEditHouses(id){
      this.houseData = this.houses.dataItems[id] || {};
      this.ifEditInfo = true;
      this.searchHouseHlodId = this.houseData.id;
      this.loadHouseHoldsDatas();
      this.houseData.temp_courtyard = this.houseData.courtyard
      this.houseData.temp_building = this.houseData.building
      this.houseData.temp_units = this.houseData.units
      this.houseData.temp_room_no = this.houseData.room_no
    },

    showEditHouseHolds(id){
      this.houseHoldData = this.houseHolds.dataItems[id] || {};
      this.ifAddInhabitant = true;
      this.searchHouseHlodId = this.houseData.id;
      this.houseHoldData.temp_household_type = this.houseHoldData.household_type
      this.houseHoldData.temp_full_name = this.houseHoldData.full_name
      this.houseHoldData.temp_sex = this.houseHoldData.sex
      this.houseHoldData.temp_tel = this.houseHoldData.tel
      this.houseHoldData.temp_identification_no = this.houseHoldData.identification_no
      this.houseHoldData.temp_addr = this.houseHoldData.addr
      this.houseHoldData.temp_birthday = this.houseHoldData.birthday
    },

    editHouses(){

      let adopt = null;

      if(!RegExpCheck.isText(String(this.houseData.temp_room_no).trim())) adopt = "请填写正确的房号";
      if(!RegExpCheck.isText(String(this.houseData.temp_units).trim())) adopt = "请填写正确的单元";
      if(!RegExpCheck.isText(String(this.houseData.temp_building).trim())) adopt = "请填写正确的楼栋";
      if(!RegExpCheck.isText(String(this.houseData.temp_courtyard).trim())) adopt = "请填写正确的庭院名称";

      if(adopt) return this.$message.error(adopt);

      this.houseData.courtyard = this.houseData.temp_courtyard
      this.houseData.building = this.houseData.temp_building
      this.houseData.units = this.houseData.temp_units
      this.houseData.room_no = this.houseData.temp_room_no

      this.houseHoldData.household_type = this.houseHoldData.temp_household_type
      this.houseHoldData.full_name = this.houseHoldData.temp_full_name
      this.houseHoldData.sex = this.houseHoldData.temp_sex
      this.houseHoldData.tel = this.houseHoldData.temp_tel
      this.houseHoldData.identification_no = this.houseHoldData.temp_identification_no
      this.houseHoldData.addr = this.houseHoldData.temp_addr
      this.houseHoldData.birthday = this.houseHoldData.temp_birthday

      this.$api.house.editor(new RequestParams()
      .addDataItem(new RequestDataItem()
      .addAttributes(this.houseData)
      ))
      .then(response=>{
        this.$message.success(response.message)
        this.ifEditInfo = false;
        this.loadHousesDatas();
      })
      .catch(({message}) => this.$message.error(message))
    },

    editHouseHlolds(){

      let adopt = null;

      if(!RegExpCheck.isFullName(String(this.houseHoldData.full_name).trim())) adopt = "请填写正确的姓名";
      if(!RegExpCheck.isTel(String(this.houseHoldData.tel).trim())) adopt = "请填写正确的电话号码";
      if(!RegExpCheck.isIdCard(String(this.houseHoldData.identification_no).trim())) adopt = "请填写正确的证件号码";
      if(!RegExpCheck.isAddr(String(this.houseHoldData.addr).trim())) adopt = "请填写正确的证件地址";

      if(adopt) return this.$message.error(adopt);

      this.$api.household.editor(new RequestParams()
      .addDataItem(new RequestDataItem()
      .addAttributes(this.houseHoldData)
      .addAttribute("house_id", this.searchHouseHlodId)
      ))
      .then(response=>{
        this.$message.success(response.message)
        this.ifAddInhabitant = false;
        this.ifEditInfo = false;
        this.loadHouseHoldsDatas();
      })
      .catch(({message}) => this.$message.error(message))
    },

    delHouses(id){
        
      let datas = id != null ? [this.houses.dataItems[id]] : this.selectedHouses.map(o=>this.houses.dataItems[o]);
      if(datas.length){
        this.$confirm(`确定要删除庭院吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => this.$api.house.delete(new RequestParams().addDataItems(datas.map(o=>new RequestDataItem().addAttribute("id", o.id)))))
        .then(response=>{
          this.$message.success("删除成功");
          this.loadHousesDatas();
        })
        .catch(({message}) => this.$message.error(message))
        .catch(() => {
          this.$message.info("已取消删除");
        });
      }
      else this.$message.info("请选择要删除的庭院");
    },

    delHouseHolds(id){
        
      let datas = id != null ? [this.houseHolds.dataItems[id]] : this.selectedHouseHolds.map(o=>this.houseHolds.dataItems[o]);
      if(datas.length){
        this.$confirm(`确定要删除住户吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => this.$api.household.delete(new RequestParams().addDataItems(datas.map(o=>new RequestDataItem().addAttribute("id", o.id)))))
        .then(response=>{
          this.$message.success("删除成功");
          this.loadHouseHoldsDatas();
        })
        .catch(({message}) => this.$message.error(message))
        .catch(() => {
          this.$message.info("已取消删除");
        });
      }
      else this.$message.info("请选择要删除的住户");
    },
    /**加载车辆区域列表数据 */
    loadHousesDatas(pageNum = 1, params = {}) {
      this.$api.house
        .getlist(new RequestParams()
        .addAttributes(params)
        .addAttributes(this.searchParams)
        .addAttribute("page_index", pageNum)
        .addAttribute("begin_time", this.searchTimes[0])
        .addAttribute("end_time", this.searchTimes[1]))
        .then(response => {
          this.houses.attributes = response.attributes;
          this.houses.dataItems = response.dataItems.map(o => o.attributes);
          this.selectedHouses = [];
        })
        .catch(response => this.$message.error(response.message));
    },
    
    loadHouseHoldsDatas(pageNum = 1, params = {}) {
      this.$api.household
        .getlist(new RequestParams()
        .addAttributes(params)
        .addAttribute("page_index", pageNum)
        .addAttribute("house_id", this.searchHouseHlodId))
        .then(response => {
          this.houseHolds.attributes = response.attributes;
          this.houseHolds.dataItems = response.dataItems.map(o => o.attributes);
          this.selectedHouseHolds = [];
        })
        .catch(response => this.$message.error(response.message));
    }
  },
  mounted () {
    this.loadHousesDatas(1);
  }
}
</script>

<style scoped>
@import "../../assets/css/BuildingManagement.css";
</style>
<style lang="stylus" scoped>
.add_inhabitant
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(0, 0, 0, .2)
  z-index 1002

  .depwd
    width 800px
    top calc(50% - 280px)
    left calc(50% - 400px)

  .bot
    height 500px

    .cet
      width 95%
      margin 0 auto
      padding-top 20px

      div.clf
        line-height 30px
        margin-bottom 20px
        width 50%
        float left

        &:first-child
          width 100%

        &:last-child
          width 100%

        span
          text-align right
          width 5rem

        .el-input
          width 70%

          .el-input__inner
            border 1px solid #999

      input[type=text],
      select
        float left
        width 70%
        height 30px
        border 1px solid #999
        padding-left 10px
        border-radius 3px

        &.w85
          width 85%

      input[type=radio]
        margin-right 5px

      label
        font-size 14px
        margin-right 20px
        cursor pointer


</style>
