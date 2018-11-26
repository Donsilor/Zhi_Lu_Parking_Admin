<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="registration-car blu-button" @click="ifImportAuthorize = true">导入续费</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="cominput fl">
          <span class="conditions-text" >车牌号码：</span>
          <input type="text" placeholder="请输入" v-model="searchParams.car_no" >
        </div>
        <div class="cominput fl">
          <span class="conditions-text">住户：</span>
          <input type="text" placeholder="请输入" v-model="searchParams.household_name" >
        </div>
        <div class="cominput fl">
          <span class="conditions-text">状态：</span>
          <input type="number" min="0" max="1" placeholder="请输入" v-model="searchParams.status" >
        </div>
        <div class="cominput fl">
          <span class="conditions-text">车位：</span>
          <div class="custom-input">
            <input type="text" placeholder="请输入" v-model="searchParams.car_place_no" >
          </div>
        </div>
        <div class="fl create">
          <span>有效期：</span>
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
          <!--<button class="plechoose fl" @click="selectedAll()">请选择 <img src="../../assets/images/icon_9.png" alt=""></button>-->
          <!--<button class="batchdel fl">批量删除</button>-->
          <!--<button class="greenbut fl">配置车场收费标准</button>-->
          <div>共搜索到 <span>{{carDelays.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button">搜索</button>
          <button class="clear-button bluborder-button">清除</button>
          <button class="ss transf-button"  v-bind:class="{hide:!searchDivShow}" v-on:click="searchDivShow=!searchDivShow">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{searchDivShow === true ? "收起搜索" : "展开搜索"}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="selected" v-show="selectedDelays.length">已选 <span>{{selectedDelays.length}}</span> 项数据</div>
      <div class="tab">
        <table class="monthcard-table">
          <tr>
            <th></th>
            <th>车牌号码</th>
            <th>住户</th>
            <th>房号</th>
            <th>电话号码</th>
            <th>车辆类型</th>
            <th>车位</th>
            <th>有效期至</th>
            <th>状态</th>
            <th>最后延期时间</th>
            <th>操作员</th>
            <th>操作</th>
          </tr>
          <tr v-for="(car, index) in carDelays.dataItems" v-bind:key="index">
            <td><input type="checkbox" :value="index" v-model="selectedDelays"></td>
            <td><div :title="car.car_no">{{car.car_no}}</div></td>
            <td><div :title="car.household_name">{{car.household_name}}</div></td>
            <td><div :title="car.room_no">{{car.room_no}}</div></td>
            <td><div :title="car.tel">{{car.tel}}</div></td>
            <td><div :title="car.car_type">{{/*车辆类型(通过授权确认车辆类型，此类型由数据字典提供，选择输入，不能手动录入)*/car.car_type}}</div></td>
            <td><div :title="car.car_place_no">{{car.car_place_no}}</div></td>
            <td><div :title="car.end_time">{{car.end_time}}</div></td>
            <td><div :title="car.status">{{['正常','已过期'][car.status]}}</div></td>
            <td><div :title="car.update_time">{{car.update_time}}</div></td>
            <td><div :title="car.user_name">{{car.user_name}}</div></td>
            <td>
              <a href="javascript:" class="RenewalExtension" @click="showPostponedRenewal(car)">延期续费</a>
            </td>
          </tr>
        </table>
      </div>
      <Pagination
        :previousPage="loadCarDelaysDatas"
        :nextPage="loadCarDelaysDatas"
        :skipPage="loadCarDelaysDatas"
        :pageIndex="carDelays.attributes.page_index"
        :totalPages="carDelays.attributes.total_pages"
        :pageSize="carDelays.attributes.page_size"
        :tatal="carDelays.attributes.tatal"
      ></Pagination>
    </div>
    <!--弹窗-->
    <div class="main" v-if="ifRegister">
      <div class="depwd" v-drag.cursor="'#Register'">
        <div class="top-nav" id="Register">
          <p class="t-text fl">延期续费</p>
          <p class="close fr" @click="ifRegister = false">x</p>
        </div>

        <div class="bot">
          <p class="red" hidden><i class="iconfont icon-jian-tianchong"></i>错误提示的文案<span>x</span></p>
          <div class="cet">
            <div class="clf">

              <p class="clf"><span class="fl">车牌号码：</span><span class="p-text" :asdasd="delayData.car_auth_id = carDelayData.id">{{carDelayData.car_no}}</span></p>
              <p class="clf"><span class="fl">授权月份：</span>
                <select v-model="standardData.amountData" @change="delayData.amount = standardData.amountData.fee">
                  <option v-for="(item, index) in standardData.standard_content" :value="item" :key="index">{{item.count}}</option>
                </select>
              </p>
              <p class="clf"><span class="fl">支付方式：</span>
                <select v-model="delayData.pay_mode">
                  <option value="0" selected>现金</option>
                  <option value="1">微信公众号支付</option>
                  <option value="2">微信刷卡支付</option>
                  <option value="3">支付宝网页支付</option>
                  <option value="4">支付宝刷卡支付</option>
                </select>
              </p>
              <p class="clf"><span class="fl">原有效期至：</span><span class="p-text">{{delayData.old_end_time = carDelayData.end_time}}</span></p>
              <p class="clf"><span class="fl">新有效期至：</span><span class="p-text">{{get_new_end_time}}</span></p>
              <p class="clf"><span class="fl">收费金额：</span><input class="fl" disabled type="text" v-model="delayData.amount"></p>
              <p class="bz clf"><span class="fl">备注：</span><input class="fl" type="text" v-model="delayData.remark" id="inp"></p>
            </div>
            <div class="button clf">
              <a class="qr fr" @click="postponedRenewal()">确定</a>
              <a class="qx fr" @click="ifRegister = false">取消</a>
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
            <div class="fl choose-file">
              选择文件
              <input type="file" @change="selectImportExcelFile" />
            </div>
            <a class="fr downloadtemp" href="javascript:">下载模板</a>
            <p>{{importExcelFile.name}}支持扩展名：.xls .xlsx</p>
          </div>
          <div class="button clf">
            <a class="upload fr" href="javascript:" @click="importExcel()">上传</a>
          </div>
        </div>
      </div>
    </div>
    
    <!--弹窗-->
  </div>
</template>

<script>
import { RequestParams, RequestDataItem,User, ExcelSheets, DataDictionary } from "../../assets/js/entity";
import {array2Object} from "../../assets/js/common";
import Pagination from "../Pagination";
import moment from "moment";
  export default {
    data () {
      return {
        searchDivShow: true,
        ifRegister: false,
        searchTimes:[],
        searchParams:{
          household_name:null,
          car_no:null,
          car_place_no:null,
        },
        ifImportAuthorize: false,
        selectedDelays:[],
        delayData:{
          car_auth_id:null,//	Y	String	授权ID
          car_id:null,//	Y	String	车辆ID
          amount:null,//	Y	decimal(10,2)	收费金额
          pay_mode:null,//	Y	int	支付方式(0：现金1：微信公众号支付2：微信刷卡支付3：支付宝网页支付4：支付宝刷卡支付)
          old_end_time:null,//	Y	String	旧有效期至(格式：yyyy-MM-dd HH:mm:ss)
          new_end_time:null,//	Y	String	新有效期至(格式：yyyy-MM-dd HH:mm:ss)
          source:null,//	Y	String	来源：cloud(平台)、app(移动端)
          remark:null,//	N	String	备注
        },
        carDelayData:{
          id:null,//        	Y	String	ID
          household_id:null,//	Y	String	住户ID
          household_name:null,//	N	String	住户姓名
          room_no:null,//	N	String	房号（房屋信息内的庭院、楼栋、单元、房号组合返回）
          tel:null,//	N	String	电话
          car_no:null,//      	Y	String	车牌号码
          car_type:null,//	Y	String	车辆类型(通过授权确认车辆类型，此类型由数据字典提供，选择输入，不能手动录入)
          car_place_no:null,//	Y	string	车位号或车位组编号
          end_time:null,//	Y	String	有效期至(格式：yyyy-MM-dd HH:mm:ss)
          status:null,//	Y	String	状态（正常、已过期，通过有效期判断）
          update_time:null,//	Y	String	最后延期时间(格式：yyyy-MM-dd HH:mm:ss)
          user_name:null,//	Y	String	操作员
        },
        carDelays:{
          attributes: {
            page_index: 1, //当前页码
            page_size: 2, //当前页数
            tatal: 10, //总条目数
            total_pages: 10 //条页数
          },
          dataItems: {

          },
        },
        standardData:{},
        dataDictionary:{},
        importExcelFile:{}
      };
    },
    components: {
      /**分页组件 */
      Pagination
    },
    computed:{
      get_new_end_time(value){
        if(!this.standardData.amountData) return "";
        return this.delayData.new_end_time = moment(this.delayData.old_end_time).add(this.standardData.amountData.count, 'months').format("YYYY-MM-DD HH:mm:ss")
      }
    },
    methods: {
      selectImportExcelFile({target}){
        this.importExcelFile = target.files[0];
      },

      importExcel(){
        // this.$confirm(`确定要导入[${this.importExcelFile.name}]吗?`, '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        // })
        // .then(()=>{
        //   let excelSheets = new ExcelSheets();
        //   for(let name in ExcelSheets.dictionary){
        //     excelSheets.setSheetHeader(name, Object.keys(ExcelSheets.dictionary[name]));
        //   }
        //   return excelSheets.importExcel(this.importExcelFile).then(async ({月卡续费})=>{
        //     月卡续费 = 月卡续费.map(o=>new RequestDataItem().addAttributes(o));
        //     for(let o of 月卡续费){
        //       let car = await this.$api.car.getlist(new RequestParams().addAttribute("car_no", o.attributes.car_no));
        //       let delay = await this.$api.delay.getlist(new RequestParams().addAttribute("key", `and car_no = '${o.attributes.car_no}'`));
        //       console.log(car, delay)
        //       if(!delay.dataItems[0]){
        //         return this.$message.error(`无法导入，请先为车辆[${o.attributes.car_no}]授权`);
        //       }
        //       if(!car.dataItems[0]){
        //         return this.$message.error(`无法导入，请先添加车辆[${o.attributes.car_no}]`);
        //       }
        //       o.addAttribute("car_auth_id", delay.dataItems[0].attributes.id)
        //       .addAttribute("car_id", car.dataItems[0].attributes.id)
        //     }
        //     return this.$api.delay.charge(new RequestParams().addDataItems(月卡续费))
        //   })
        //   .then(response => {
        //     this.loadCarDelaysDatas();
        //     this.$message.success(response.message)
        //   })
        //   .catch(response => this.$message.error(response.message));;
        // })
        // .catch((error) => (this.$message.info("文件不正确，导入失败") ,console.log(error)))
        // .catch(() => this.$message.info("已取消删除"))
        // .finally(()=>this.ifImportAuthorize = false);
      },

      selectedAll(){
        if(this.selectedDelays.length){
          this.selectedDelays = [];
        }
        else this.selectedDelays = this.carDelays.dataItems.map((o,i)=>i);
      },

      showPostponedRenewal(data){
        if(data){
          this.carDelayData = data;
          this.$api.car.getlist(new RequestParams().addAttribute("car_no", data.car_no)).then(response=>{
            console.log()
            this.delayData.car_id = response.dataItems.map(o => o.attributes)[0].id;
            this.delayData.source = "cloud";
            return  this.$api.standard.getlist( new RequestParams().addAttribute("key", `and car_type = '${data.car_type}'`))
          })
          .then(response => {
            this.standardData = response.dataItems.map(o => o.attributes)[0];
            this.standardData.standard_content = JSON.parse(this.standardData.standard_content);
          })
          .catch(response => this.$message.error(response.message));
          ;
        }
        this.ifRegister = true;
      },

      postponedRenewal(){
        this.$api.delay.charge(new RequestParams()
          .addDataItem(new RequestDataItem()
          .addAttributes(this.delayData)
          .addAttribute("household_id", this.carDelayData.household_id)
          ))
          .then(response=>{
            this.$message.success(response.message)
            this.ifRegister = false;
            this.loadCarDelaysDatas();
          })
          .catch(({message}) => this.$message.error(message))
      },

      /**加载车辆区域列表数据 */
      loadCarDelaysDatas(pageNum = 1, params = {}) {

        let key = "and 1 = 1 ";
        
        for(let item in this.searchParams){
          if(this.searchParams[item]){
            key += `and ${item} like '%${this.searchParams[item]}%'`;
          }
        }

        this.$api.delay
          .getlist(new RequestParams()
          .addAttributes(this.searchParams)
          .addAttributes(params)
          .addAttribute("key", key)
          .addAttribute("begin_time", this.searchTimes[0])
          .addAttribute("end_time", this.searchTimes[1])
          .addAttribute("page_index", this.pageNum))
          .then(response => {

            this.carDelays.attributes = response.attributes;
            this.carDelays.dataItems = response.dataItems.map(o => o.attributes);
            this.selectedDelays = [];
          })
          .catch(response => this.$message.error(response.message));
      },
    },
    mounted () {
      this.loadCarDelaysDatas(1);
    }
  };
</script>

<style scoped>
  @import "../../assets/css/MonthCard.css";
</style>
