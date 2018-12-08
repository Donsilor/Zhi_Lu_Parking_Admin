<template>
  <div class="content clf">
    <div class="search ">
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="condition fl">
          <span class="conditions-text">搜索条件：</span>
          <div class="custom-input">
            <input type="text" placeholder="请输入" v-model="searchParam">
            <input type="submit" value="" @click="loadLogDatas()">
          </div>
        </div>
        <div class="fr create">
          <span>创建时间：</span>
          <div>
            <div class="c-datepicker-date-editor  J-datepicker-range-day mt10">
              <el-date-picker
                v-model="createTime"
                type="daterange"
                align="right"
                unlink-panels
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
          <button class="plechoose fl" @click="selectedAll">请选择 <img src="../../assets/images/icon_9.png" alt="">
          </button>
          <button class="batchdel fl" @click="delLog(null)">批量删除</button>
          <button class="blu-button fl" @click="exportExcel()">导出Excel</button>
          <div>共搜索到 <span>{{logs.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button" @click="loadLogDatas()">搜索</button>
          <button class="clear-button bluborder-button" @click="searchParam = null, createTime = []">清除</button>
          <button class="ss transf-button" :class="{hide:!searchDivShow}" @click="searchDivShow=!searchDivShow">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{searchDivShow === true ? '收起搜索' : '展开搜索'}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="selected" v-show="selectedLogs.length">已选 <span>{{selectedLogs.length}}</span> 项数据
      </div>
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
          <tr v-for="(item, index) of logs.dataItems" :key="index">
            <td><input type="checkbox" :value="index" v-model="selectedLogs"></td>
            <td><div :title="item.resource_name">{{item.resource_name}}</div></td>
            <td><div :title="item.content">{{item.content}}</div></td>
            <td><div :title="item.operator_time">{{item.operator_time}}</div></td>
            <td><div :title="item.user_name">{{item.user_name}}</div></td>
            <td>
              <a href="javascript:" class="view" @click="viewPopup(item)">查看</a>
              <a href="javascript:" class="delete" @click="delLog(item)">删除</a>
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
              <p class="clf" v-show="false">
                <span class="l fl">资源名称：</span>
                <span class="fl" :title="logData.resource_name">{{logData.resource_name}}</span>
              </p>
              <p class="clf">
                <span class="l fl">操作员：</span>
                <span class="fl">admin</span>
              </p>
              <p class="clf">
                <span class="l fl">操作时间：</span>
                <span class="fl" :title="logData.operator_time">{{logData.operator_time}}</span>
              </p>
              <p class="clf">
                <span class="l fl">操作内容：</span>
                <span class="fl" :title="logData.content">{{logData.content}}</span>
              </p>
            </div>
            <div class="clf">
              <span class="fl l">备注：</span>
              <p class="fl bz">{{logData.remark}}</p>
            </div>
            <!-- <div class="button clf">
              <a class="qr fr">确定</a>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <!--
        <div class="delete_prompt" v-show="isDelPopupShow">
          <div class="depwd">
            <div class="text">你是否确认删除选中的记录</div>
            <div class="button clf">
              <a href="javascript:" class="qr fr" @click="delLogData">确定</a>
              <a href="javascript:" class="qx fr" @click="delPopupHide">取消</a>
            </div>
          </div>
        </div>
    -->
    <!--弹窗-->
  </div>
</template>

<script>
import { RequestParams, RequestDataItem,ExcelSheets } from '../../assets/js/entity'
import Pagination from '../Pagination'
import moment from "moment"
export default {
  name:"handleLog", 
  data () {
    return {
      /**是否显示搜索输入框 */
      searchDivShow: true,

      /* 删除日志 */
      delLogDataIndex: 0,

      /* 弹窗 */
      isViewPopupShow: false,
      //      isDelPopupShow: false,

      /* ele-ui时间插件 */
      createTime: '',

      /**日志列表的数据 */
      logs: {
        attributes: {
          page_index: 1,
          page_size: 10,
          tatal: 0,
          total_pages: 0
        },
        dataItems: []
      },
      logData: {
        content: '',
        id: '',
        operator_time: '',
        remark: '',
        resource_id: '',
        resource_name: ''
      },

      /**搜索参数 */
      searchParam: '',
      selectedLogs: []
    }
  },
  components: {
    /**分页组件 */
    Pagination
  },
  methods: {
    exportExcel(){
      this.$confirm(`确定要导出数据到[Excel]吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(()=>{
        let loading = this.$loading({
          lock: true,
          text: '正在导出...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$api.log
        .getlist(new RequestParams()
        .addAttribute("page_size", -1))
        .then(({dataItems})=>{
          let excelSheets = new ExcelSheets();
          excelSheets.setSheetHeader("日志管理",Object.keys(ExcelSheets.dictionary.日志管理))
          excelSheets.addRow("日志管理", ExcelSheets.dictionary.日志管理);
          excelSheets.addRows("日志管理", dataItems.map(o=>o.attributes))
          excelSheets.exportExcel("系统日志列表");
        })
        .catch(({message}) => this.$message.error(message))
        .finally(()=>loading.close());
      })
      .catch(() => { this.$message.info('已取消导出') })
    },
    selectedAll () {
      if (this.selectedLogs.length) {
        this.selectedLogs = []
      }
      else this.selectedLogs = this.logs.dataItems.map((o, i) => i)
    },

    viewPopup (item) {
      this.isViewPopupShow = true
      this.logData = item
    },

    viewPopupHide () {
      this.isViewPopupShow = false
      this.logData = {}
    },

    delLog (data) {
      let datas = data != null ? [data] : this.selectedLogs.map(o => this.logs.dataItems[o])
      if (datas.length) {
        this.$confirm(`确定要删除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => this.$api.log.delete(new RequestParams().addDataItems(datas.map(o => new RequestDataItem().addAttribute('id', o.id)))))
        .then(response => {
          this.$message.success('删除成功')
          this.loadLogDatas()
        })
        .catch(({message}) => this.$message.error(message))
        .catch(() => { this.$message.info('已取消删除') })
      }
      else this.$message.info('请选择要删除的日志')
    },

    delPopupHide () {
      this.isDelPopupShow = false
    },

    loadLogDatas (pageNum = 1, params = {}) {

      this.$api.log
      .getlist(new RequestParams()
      .addAttributes(params)
      .addAttribute("resource_name", this.searchParam)
      .addAttribute("begin_time", this.createTime[0] && moment(this.createTime[0]).format("YYYY-MM-DD"))
      .addAttribute("end_time", this.createTime[1] && moment(this.createTime[1]).format("YYYY-MM-DD"))
      .addAttribute("page_index",pageNum))
      .then(data => {
        this.logs.attributes = data.attributes
        this.logs.dataItems = data.dataItems.map(o => o.attributes)
        this.selectedLogs = [];
      })
      .catch(({message}) => this.$message.error(message))
    }
  },
  mounted () {
    this.loadLogDatas(1)
  }
}
</script>

<style scoped>
@import '../../assets/css/OperationLog.css';
</style>
