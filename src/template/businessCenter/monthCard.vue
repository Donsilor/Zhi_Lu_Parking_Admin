<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="registration-car blu-button" @click="ifImportAuthorize = true">导入续费</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="cominput fl">
          <span class="conditions-text">车牌号码：</span>
          <input type="text" placeholder="请输入" >
        </div>
        <div class="cominput fl">
          <span class="conditions-text">住户：</span>
          <input type="text" placeholder="请输入">
        </div>
        <div class="cominput fl">
          <span class="conditions-text">状态：</span>
          <input type="text" placeholder="请输入">
        </div>
        <div class="condition">
          <span class="conditions-text">车位：</span>
          <div class="custom-input">
            <input type="text" placeholder="请输入">
            <input type="submit" value="">
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
          <button class="plechoose fl">请选择 <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl">批量删除</button>
          <button class="greenbut fl">配置车场收费标准</button>
          <div>共搜索到 <span>{{delayDatas.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button">搜索</button>
          <button class="clear-button bluborder-button">清除</button>
          <button class="ss transf-button"  v-bind:class="{hide:!searchDivShow}"
                  v-on:click="searchDivShow=!searchDivShow">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{searchDivShow === true ? "收起搜索" : "展开搜索"}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="selected">已选 <span>{{Object.values(delayDatas.dataItems).filter(o=>o.selected).length}}</span> 项数据</div>
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
          <tr v-for="(delay, id) in delayDatas.dataItems" v-bind:key="id">
            <td><input type="checkbox" v-model="delay.selected"></td>
            <td>{{delay.car_no}}</td>
            <td>{{delay.household_name}}</td>
            <td>{{delay.room_no}}</td>
            <td>{{delay.tel}}</td>
            <td>{{/*车辆类型(通过授权确认车辆类型，此类型由数据字典提供，选择输入，不能手动录入)*/delay.car_type}}</td>
            <td>{{delay.car_place_no}}</td>
            <td>{{delay.end_time}}</td>
            <td>{{["已过期","正常"][delay.status]}}</td>
            <td>{{delay.update_time}}</td>
            <td>{{delay.user_name}}</td>
            <td>
              <a href="javascript:" class="RenewalExtension">延期续费</a>
            </td>
          </tr>
        </table>
      </div>
      <Pagination
        :previousPage="loadDelayDatas"
        :nextPage="loadDelayDatas"
        :skipPage="loadDelayDatas"
        :pageIndex="delayDatas.attributes.page_index"
        :totalPages="delayDatas.attributes.total_pages"
        :pageSize="delayDatas.attributes.page_size"
        :tatal="delayDatas.attributes.tatal"
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
          <p class="red"><i class="iconfont icon-jian-tianchong"></i>错误提示的文案<span>x</span></p>
          <div class="cet">
            <div class="clf">

              <p class="clf"><span class="fl">车牌号码：</span><span class="p-text">粤B123456</span></p>
              <p class="clf"><span class="fl">原有效期至：</span><span class="p-text">2015-09-09</span></p>
              <p class="clf"><span class="fl">新有效期至：</span><span class="p-text">2015-09-09</span></p>
              <p class="clf"><span class="fl">授权月份：</span>
                <select name="" value="">
                  <option value="">请选择,根据车辆类型及授权车位自动关联收费标准</option>
                  <option value="">选择1</option>
                </select>
              </p>
              <p class="clf"><span class="fl">收费金额：</span><input class="fl" type="text" value="请选择"></p>
              <p class="bz clf"><span class="fl">备注：</span><input class="fl" type="text" value="请输入备注" id="inp"></p>
            </div>
            <div class="button clf">
              <a class="qr fr">确定</a>
              <a class="qx fr">取消</a>
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
              <input type="file" id="ImportAuthorizeFile" hidden/>
            </div>
            <a class="fr downloadtemp" href="javascript:">下载模板</a>
            <p>支持扩展名：.xls .xlsx</p>
          </div>
          <div class="button clf">
            <a class="upload fr" href="javascript:">上传</a>
          </div>
        </div>
      </div>
    </div>
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
        ifRegister: false,
        searchTimes:[],
        searchParams:{
          
        },
        ifImportAuthorize: false,
        delayDatas:{
          attributes: {
            page_index: 1, //当前页码
            page_size: 2, //当前页数
            tatal: 10, //总条目数
            total_pages: 10 //条页数
          },
          dataItems: {

          },
        },
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
      };
    },
    components: {
      /**分页组件 */
      Pagination
    },
    methods: {

      /**加载车辆区域列表数据 */
      loadDelayDatas(pageNum = 1, params = {}) {
        let searchTimes = this.searchTimes.map(o=>moment(o).format("YYYY-MM-DD HH:mm:ss"))
        this.$api.delay
          .getlist(new RequestParams()
          .addAttributes(this.searchParams)
          .addAttributes(params)
          .addAttribute("begin_time", searchTimes[0])
          .addAttribute("end_time", searchTimes[1])
          .addAttribute("page_index", pageNum))
          .then(response => {

            this.delayDatas.attributes = response.attributes;
            this.delayDatas.dataItems = response.dataItems.map(o => o.attributes);
          })
          .catch(response => this.$message.error(response.message));
      },
    },
    mounted () {
      this.loadDelayDatas(1);
    }
  };
</script>

<style scoped>
  @import "../../assets/css/MonthCard.css";
</style>
