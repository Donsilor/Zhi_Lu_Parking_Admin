<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="add-department blu-button" @click="ifRenew = true">+新增</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="cominput fl">
          <span class="conditions-text">搜索条件：</span>
          <input type="text" placeholder="请输入">
        </div>
        <div class="cominput fl">
          <span class="conditions-text">搜索条件：</span>
          <input type="text" placeholder="请输入">
        </div>
        <div class="cominput fl normargin">
          <span class="conditions-text">搜索条件：</span>
          <input type="text" placeholder="请输入">
        </div>
        <div class="cominput fl">
          <span class="conditions-text">搜索条件：</span>
          <input type="text" placeholder="请输入">
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
          <button class="plechoose fl">请选择 <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl">批量删除</button>
          <button class="greenbut fl">配置车场收费标准</button>
          <div>共搜索到 <span>{{areas.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button">搜索</button>
          <button class="clear-button bluborder-button">清除</button>
          <button class="ss transf-button" v-bind:class="{hide:searchDivShow}" v-on:click="searchDivShow=!searchDivShow">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{searchDivShow === true ? "收起搜索" : "展开搜索"}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="selected">已选 <span>{{Object.values(areas.dataItems).filter(o=>o.selected).length}}</span> 项数据</div>
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
          <tr v-for="(area, id) in areas.dataItems" v-bind:key="id">
            <td><input type="checkbox" v-model="area.selected"></td>
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
              <a href="javascript:" class="bj">编辑</a>
              <a href="javascript:" class='delete'>删除</a>
              <a href="javascript:">管理车位</a>
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
    <!--弹窗-->
    <div class="main" v-if="ifRenew">
      <div class="depwd" v-drag.cursor="'#Renew'">
        <div class="top-nav" id="Renew">
          <p class="t-text fl">延期续费</p>
          <p class="close fr" @click="ifRenew = false">x</p>
        </div>
        <div class="bot">
          <p class="red"><i class="iconfont icon-jian-tianchong"></i>错误提示的文案<span>x</span></p>
          <div class="cet">
            <div class="clf">
              <p class="clf"><span class="fl">编号：</span><input class="fl" type="text" value="请输入编号，必填"></p>
              <p class="clf"><span class="fl">名称：</span><input class="fl" type="text" value="请输入"></p>
              <p class="clf"><span class="fl">车场类型：</span><input class="fl" type="text" value="普通车场"></p>
              <p class="clf"><span class="fl">区域类型：</span>
                <select name="" value="">
                  <option value="">地下车库</option>
                  <option value="">选择1</option>
                </select>
              </p>
              <p class="clf"><span class="fl">区域车位数：</span><input class="fl" type="text" value="请选择"></p>
              <p class="clf"><span class="fl">是否限制临时车：</span>
                <span class="p-text">
							<span class="flase fl ckb"><input class="rad" type="radio" id="deo1" name="radio" value="1"><label
                for="deo1"></label></span>
								<span class="rad-text fl">否</span>
								<span class="true fl ckb"><input class="rad" type="radio" id="deo2" name="radio" value="1"><label
                  for="deo2"></label></span>
								<span class="rad-text fl">是</span>
								</span>
              </p>
              <p class="clf"><span class="fl">进入限制时长：</span>
                <input class="minute" type="text" value="5">分钟
              </p>
              <p class="bz clf"><span class="fl">备注：</span><input class="fl" type="text" value="请输入备注" id="inp"></p>
            </div>
            <div class="button clf">
              <a class="qr fr">确定</a>
              <a class="qx fr" @click="ifRenew = false">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { array2Object } from "../../assets/js/common";
import { RequestParams } from "../../assets/js/entity";
import Pagination from "../Pagination";
import moment from "moment";
  export default {
    data () {
      return {
        toggleSearchText: '收起搜索',
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
        ifRenew: false,
        ifConfig: false,
        ifDel: false,
        areas: {
          attributes: {
            page_index: 1, //当前页码
            page_size: 2, //当前页数
            tatal: 10, //总条目数
            total_pages: 10 //条页数
          },
          dataItems: {
          }
        },
      };
    },
    components: {
      /**分页组件 */
      Pagination
    },
    methods: {

      /**加载车辆区域列表数据 */
      loadAreasDatas(pageNum, params = {}) {
      let searchTimes = this.searchTimes.map(o=>moment().format("yyyy-MM-dd HH:mm:ss"))
        this.$api.area
          .getlist({
            attributes: $.extend({
                page_index: pageNum ,//当前页码,
              },
              new RequestParams(params).addAttribute("begin_time", searchTimes[0]).addAttribute("end_time", searchTimes[1])
            )
          })
          .then(response => {
            
            this.areas.attributes = response.attributes;
            this.areas.dataItems = array2Object(response.dataItems.map(o => o.attributes), "id");
            console.log(this.areas.dataItems)
          })
          .catch(response => console.log(response));
      },
    },
    mounted () {
      this.loadAreasDatas(1);
    }
  };
</script>

<style scoped>
  @import "../../assets/css/YardArea.css";
</style>
