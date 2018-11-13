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
        <div class="condition">
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
          <button class="batchdel fl" @click="delHouses(null)">批量删除</button>
          <button hidden class="greenbut fl">配置车场收费标准</button>
          <div>共搜索到 <span>{{houses.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button" @click="loadHousesDatas()">搜索</button>
          <button class="clear-button bluborder-button" @click="searchParams = {}, searchTimes = []">清除</button>
          <button class="ss transf-button"  v-bind:class="{hide:searchDivShow}" v-on:click="searchDivShow=!searchDivShow">
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
            <td>{{house.courtyard}}</td>
            <td>{{house.building}}</td>
            <td>{{house.units}}</td>
            <td>{{house.room_no}}</td>
            <td>{{house.create_time}}</td>
            <td>{{house.update_time}}</td>
            <td>{{house.user_name}}</td>
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
        <div class="bot">
          <div class="cet">
            <div class="clf">
              <p class="red" hidden ><i class="iconfont icon-jian-tianchong"></i>错误提示的文案<span>x</span></p>
              <p class="clf"><span class="fl">庭院：</span><input class="fl" type="text" v-model="houseData.courtyard" placeholder="wx88888888888888"></p>
              <p class="clf"><input class="fr" v-model="houseData.building" type="text" placeholder="19000124000"><span class="fr">楼栋：</span></p>
              <p class="clf"><span class="fl">单元：</span><input class="fl" v-model="houseData.units" type="text" placeholder="134@qq.com"></p>
              <p class="clf"><input class="fr" type="text" v-model="houseData.room_no" placeholder="当前默认....."><span class="fr">房号：</span></p>
              <p class="clf"><span class="fl">备注：</span><input class="fl" v-model="houseData.remark" type="text" placeholder="请再次输入主机密码，必填"></p>
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
                <th></th>
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
                <td><input type="checkbox" :value="index" v-model="selectedHouseHolds" ></td>
                <td>{{houseHold.full_name}}</td>
                <td>{{["女","男"][houseHold.sex]}}</td>
                <td>{{["亲属","业主","租客","朋友"/*住户类型(0：亲属1：业主2：租客3：朋友)*/][houseHold.household_type]}}</td>
                <td>{{houseHold.tel}}</td>
                <td>{{houseHold.identification_no}}</td>
                <td>{{houseHold.addr}}</td>
                <td>{{houseHold.birthday}}</td>
                <td>{{houseHold.create_time}}</td>
                <td>{{houseHold.update_time}}</td>
                <td>{{houseHold.user_name}}</td>
                <td>{{["正常","冻结","注销"/*(0：正常1：冻结2：注销)*/][houseHold.status]}}</td>
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
    <div class="delete_prompt" v-if="ifDel">
      <div class="depwd">
        <div class="text">你是否确认删除选中的记录</div>
        <div class="button clf">
          <a class="qr fr">确定</a>
          <a class="qx fr" @click="ifDel = false">取消</a>
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
            <div class="fl choose-file">选择文件<input type="file"/></div>
            <a class="fr downloadtemp" href="javascript:">下载模板</a>
            <p>支持扩展名：.xls .xlsx</p>
          </div>
          <div class="button clf">
            <a class="upload fr" href="javascript:">上传</a>
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
        <div class="bot">
          <div class="cet">
            <div class="clf">
              <p class="red" hidden><i class="iconfont icon-jian-tianchong"></i>错误提示的文案<span>x</span></p>
              <div class="clf">
                <span class="fl">姓名：</span>
                <input class="fl" type="text" placeholder="请输入编号，必填" v-model="houseHoldData.full_name">
              </div>
              <div class="clf">
                <span class="fl">性别：</span>
                <input class="fl" type="text" value="19000124000" v-model="houseHoldData.sex">
              </div>
              <div class="clf">
                <span class="fl">住户类型：</span>
                <select v-model="houseHoldData.household_type">
                  <option value="0">亲属</option>
                  <option value="1">业主</option>
                  <option value="2">租客</option>
                  <option value="3">朋友</option>
                </select>
              </div>
              <div class="clf">
                <span class="fl">电话号码：</span>
                <input class="fl" type="text" placeholder="请输入6-8位数字密码，必填" v-model="houseHoldData.tel">
              </div>
              <div class="clf">
                <span class="fl">证件号码：</span>
                <input class="fl" type="text" placeholder="请输入6-8位数字密码，必填" v-model="houseHoldData.identification_no">
              </div>
              <div class="clf">
                <span class="fl">证件地址：</span>
                <input class="fl" type="text" placeholder="请输入6-8位数字密码，必填" v-model="houseHoldData.addr">
              </div>
              <div class="clf">
                <span class="fl">出生日期：</span>
                <el-date-picker
                  v-model="houseHoldData.birthday"
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
import { RequestParams, RequestDataItem,User } from "../../assets/js/entity";
import Pagination from "../Pagination";
import moment from "moment";
export default {
  data () {
    return {
      asd:false,
      searchDivShow: true,
      ifEditInfo: false,
      ifImportAuthorize: false,
      ifAddInhabitant: false,
      /* ele-ui时间插件 */
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
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
        id:null,
        project_id:null,
        courtyard:null,
        building:null,
        units:null,
        room_no:null,
        operator_id:null,
        remark:null
      },
      /**房屋住户数据 */
      houseHoldData:{
        id:null,
        project_id:null,
        house_id:null,
        household_type:null,
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
      houses:{
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
    },

    showEditHouseHolds(id){
      this.houseHoldData = this.houseHolds.dataItems[id] || {};
      this.ifAddInhabitant = true;
      this.searchHouseHlodId = this.houseData.id;
    },

    editHouses(){
      this.$api.house.editor(new RequestParams()
      .addDataItem(new RequestDataItem()
      .addAttributes(this.houseData)
      .addAttribute("project_id", User.info.project_id)
      .addAttribute("operator_id", User.info.id)
      ))
      .then(response=>{
        this.$message.success(response.message)
        this.ifEditInfo = false;
        this.loadHousesDatas();
      })
      .catch(({message}) => this.$message.error(message))
    },

    editHouseHlolds(){
      this.$api.household.editor(new RequestParams()
      .addDataItem(new RequestDataItem()
      .addAttributes(this.houseHoldData)
      .addAttribute("project_id", User.info.project_id)
      .addAttribute("house_id", this.searchHouseHlodId)
      .addAttribute("operator_id", User.info.id)
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
        this.$confirm(`确定要删除庭院[${datas.map(o=>o.courtyard)}]吗?`, '提示', {
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
        this.$confirm(`确定要删除住户[${datas.map(o=>o.full_name)}]吗?`, '提示', {
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
    top 15%
    left 30%

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



      input,
      select
        float left
        width 70%
        height 30px
        border 1px solid #999
        color #999
        padding-left 10px
        border-radius 3px

        &.w85
          width 85%


</style>
