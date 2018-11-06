<template>
  <div class="content clf">
    <div class="search ">
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="condition fl">
          <span class="conditions-text">搜索条件：</span>
          <div class="custom-input">
            <input type="text" placeholder="请输入">
            <input type="submit" value="">
          </div>
        </div>
        <div class="fr create">
          <span>创建时间：</span>
          <div>
            <div class="c-datepicker-date-editor  J-datepicker-range-day mt10">
              <el-date-picker
                v-model="value7"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="clf bottom">
        <div class="fl">
          <button class="plechoose fl">请选择 <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl">批量删除</button>
          <div>共搜索到 <span>{{logs.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button">搜索</button>
          <button class="clear-button bluborder-button">清除</button>
          <button class="ss transf-button" @click="toggleSearch">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{toggleSearchText}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="selected">已选 <span>{{Object.values(logs.dataItems).filter(o=>o.selected).length}}</span> 项数据</div>
      <div class="tab">
        <table class="operationlog-table">
          <tr>
            <th></th>
            <th>资源</th>
            <th>操作内容</th>
            <th>操作时间</th>
            <th>操作员</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item, index) of logs.dataItems" v-bind:key="index">
            <td><input type="checkbox" v-model="item.selected"></td>
            <td>{{item.resource_name}}</td>
            <td>{{item.content}}</td>
            <td>{{item.operator_time}}</td>
            <td>{{item.user_name}}</td>
            <td>
              <a href="javascript:" class="view" @click="viewPopup(item)">查看</a>
              <a href="javascript:" class="delete" @click="delPopup(item, item.id)">删除</a>
            </td>
          </tr>
        </table>
      </div>
      <Pagination
        :previousPage="loadLogDatas"
        :nextPage="loadLogDatas"
        :skipPage="loadLogDatas"
        :pageIndex="logs.attributes.page_index"
        :totalPages="logs.attributes.total_pages"
        :pageSize="logs.attributes.page_size"
        :tatal="logs.attributes.tatal"
      ></Pagination>
    </div>
    <!--弹窗-->
    <div class="main" v-show="isViewPopupShow">
      <div class="depwd" v-drag.cursor="'#handleLog'">
        <div class="top-nav" id="handleLog">
          <p class="t-text fl">操作日志</p>
          <p class="close fr" @click="viewPopupHide">x</p>
        </div>
        <div class="bot">
          <div class="cet">
            <div class="clf">
              <p class="clf"><span class="l fl">资源名称：</span><span class="fl">{{viewPopupData.resource_name}}</span></p>
              <p class="clf"><span class="l fl">操作员：</span><span class="fl">admin</span></p>
              <p class="clf"><span class="l fl">操作时间：</span><span class="fl">{{viewPopupData.operator_time}}</span></p>
              <p class="clf"><span class="l fl">操作内容：</span><span class="fl">{{viewPopupData.content}}</span></p>
            </div>
            <div class="clf">
              <span class="fl l">备注：</span>
              <p class="fl bz">{{viewPopupData.remark}}</p>
            </div>
            <div class="button clf">
              <a class="qr fr">确定</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="delete_prompt" v-show="isDelPopupShow">
      <div class="depwd">
        <div class="text">你是否确认删除选中的记录</div>
        <div class="button clf">
          <a href="javascript:" class="qr fr" @click="delLogData">确定</a>
          <a href="javascript:" class="qx fr" @click="delPopupHide">取消</a>
        </div>
      </div>
    </div>
    <!--弹窗-->
  </div>
</template>

<script>
  import {RequestParams} from "../../assets/js/entity";
  import Pagination from "../Pagination";
  export default {
    data () {
      return {
        /* 删除日志 */
        delLogDataIndex: 0,
        /* 弹窗 */
        isViewPopupShow: false,
        isDelPopupShow: false,
        /* 显示隐藏搜索框 */
        toggleSearchText: '收起搜索',
        searchDivShow: true,
        /* ele-ui时间插件 */
        pickerOptions2: {
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
        value7: '',
        logs: {
          attributes: {
            page_index: 1,
            page_size: 10,
            tatal: 0,
            total_pages: 0
          },
          dataItems: [
            {
              content: '',
              id: '',
              operator_time: '',
              remark: '',
              resource_id: '',
              resource_name: ''
            }
          ]
        },
        viewPopupData: {
          content: '',
          id: '',
          operator_time: '',
          remark: '',
          resource_id: '',
          resource_name: ''
        }
      };
    },
    components: {
      /**分页组件 */
      Pagination
    },
    methods: {
      toggleSearch () {
        this.searchDivShow = !this.searchDivShow;
        this.toggleSearchText = this.searchDivShow === true ? '收起搜索' : '展开搜索';
        if (this.searchDivShow) {
          $('.transf-button').removeClass('hide');
        } else {
          $('.transf-button').addClass('hide');
        }
      },
      viewPopup (item) {
        this.isViewPopupShow = true;
        console.log(item);
        this.viewPopupData = item;
      },
      viewPopupHide () {
        this.isViewPopupShow = false;
        this.viewPopupData = {}
      },
      delPopup (item, id) {
        this.isDelPopupShow = true;
        this.delLogDataID = id;
        console.log(id);
      },
      delPopupHide () {
        this.isDelPopupShow = false;
      },
      delLogData () {
        this.delPopupHide();
        let delid = this.logs.dataItems[this.delLogDataIndex].id;
        this.$api.log.delete(new RequestParams({
          attributes: {
            id: delid
          }
        })).then(data => {
          console.log('删除成功', data);
          this.log.dataItems.splice(this.delLogDataID, 1);
          console.log(this.logs);
          // this.logs = this.logs;
        }).catch(data => {
          console.log('删除失败', data)
        })
      },
      loadLogDatas (pageNum, params = {}) {
        this.$api.log.getlist({
          attributes: $.extend({
            page_index: pageNum, //当前页码
          }, params)
        }).then(data => {
          this.logs.attributes = data.attributes;
          this.logs.dataItems = data.dataItems.map(o => o.attributes);
          console.log("45dewa15d", data);
          console.log(this.logs.dataItems)
        }).catch(data => {console.log(data)});
      }
    },
    mounted () {
      this.loadLogDatas(1)
    }
  };
</script>

<style scoped>
  @import "../../assets/css/OperationLog.css";
</style>
