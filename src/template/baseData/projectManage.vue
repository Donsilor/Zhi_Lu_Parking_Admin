<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="add-department blu-button" @click="ifEditInfo = true">+新增</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="condition fl">
          <span class="conditions-text">资源名称：</span>
          <div class="custom-input">
            <input type="text" v-model="searchParam" placeholder="请输入编号或者名称">
            <input type="submit" value="" v-on:click="loadProjectDatas(1, {key:searchParam})">
          </div>
        </div>
        <div class="fr create">
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
          <button class="plechoose fl" @click="selectedAll" >全选 <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl" @click="delProject(null)">批量删除</button>
          <div>共搜索到 <span>{{projects.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button" v-on:click="loadProjectDatas(1, {key:searchParam})">搜索</button>
          <button class="clear-button bluborder-button" v-on:click="searchParam = null">清除</button>
          <button class="ss transf-button" v-bind:class="{hide:searchDivShow}" v-on:click="searchDivShow=!searchDivShow">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{searchDivShow === true ? "收起搜索" : "展开搜索"}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="selected">已选 <span>{{selectedProjects.length}}</span> 项数据</div>
      <div class="tab">
        <table class="project-table">
            <thead>
              <tr>
                <th></th>
                <th>编号</th>
                <th>名称</th>
                <th>地址</th>
                <th>联系人</th>
                <th>电话</th>
                <th>总车位</th>
                <th>创建时间</th>
                <th>更新时间</th>
                <th>操作员</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
          <tbody>
            <tr  v-for="(project, index) in projects.dataItems" v-bind:key="index">
              <td><input type="checkbox" :value="index" v-model="selectedProjects"></td>
              <td>{{project.project_code}}</td>
              <td>{{project.project_name}}</td>
              <td>{{project.addr}}</td>
              <td>{{project.linkman}}</td>
              <td>{{project.tel}}</td>
              <td>{{project.total_place}}</td>
              <td>{{project.create_time}}</td>
              <td>{{project.update_time}}</td>
              <td>{{project.user_name}}</td>
              <td><span v-bind:class="{normal:project.status}">正常</span></td>
              <td>
                <a class="bj" href="javascript:" @click="ifEditInfo = true">编辑</a>
                <a href="javascript:" class="delete" v-on:click="delProject(index)">删除</a>
                <a href="javascript:">重置密码</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        :previousPage="loadProjectDatas"
        :nextPage="loadProjectDatas"
        :skipPage="loadProjectDatas"
        :pageIndex="projects.attributes.page_index"
        :totalPages="projects.attributes.total_pages"
        :pageSize="projects.attributes.page_size"
        :tatal="projects.attributes.tatal"
      ></Pagination>
    </div>
    <!--弹窗-->
    <div class="main" v-if="ifEditInfo">
      <div class="depwd" v-drag.cursor="'#editDict'">
        <div class="top-nav" id="editDict">
          <p class="t-text fl">项目信息</p>
          <p class="close fr" @click="ifEditInfo = false">x</p>
        </div>
        <div class="bot">
          <div class="cet">
            <div class="clf">
              <p class="red"><i class="iconfont icon-jian-tianchong"></i>错误提示的文案</p>
              <p class="clf"><span class="fl"><span class='red-text'>*</span>项目编号：</span><input class="fl"
                                                                                                type="text"
                                                                                                value="请输入编号，必填"></p>
              <p class="clf"><span class="fl"><span class='red-text'>*</span>项目名称：</span><input class="fl"
                                                                                                type="text"
                                                                                                value="请输入6-8位数字密码，必填">
              </p>
              <p class="clf"><span class="fl">地址：</span><input class="fl" type="text" value="请输入6-8位数字密码，必填"></p>
              <p class="clf"><span class="fl">联系人：</span><input class="fl" type="text" value="请输入6-8位数字密码，必填"></p>
              <p class="clf"><span class="fl">联系电话：</span><input class="fl" type="text" value="请输入编号，必填"></p>
              <p class="clf"><span class="fl">车位总数：</span><input class="fl" type="text" value="请输入编号，必填"></p>
              <p class="bz clf"><span class="fl">备注：</span><input class="fl" type="text" value="请输入备注" id="inp"></p>
            </div>
            <div class="button clf">
              <a class="qr fr">确定</a>
              <a class="qx fr" @click="ifEditInfo = false">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--弹窗-->
  </div>
</template>

<script>
import { RequestParams,RequestDataItem } from "../../assets/js/entity";
import { array2Object } from "../../assets/js/common";
import Pagination from "../Pagination";
import moment from "moment";
export default {
  data() {
    return {
      ifEditInfo: false,
      /**是否显示搜索输入框 */
      searchDivShow: true,
      /**搜索参数 */
      searchParam: "",
      searchTimes:[],
      selectedProjects:[],
      /**项目列表的数据 */
      projectData:{
        "create_time":"2018-10-10 12:09:20",
        "operator_id":"7581147280a4405698cea3b2eb30d3b0",
        "user_name":"弗兰克",
        "project_code":"DONGHAI2",
        "remark":"东海花园",
        "total_place":18,
        "project_name":"东海花园2",
        "linkman":"李小华",
        "update_time":"2018-10-10 12:09:20",
        "tel":"18900921182",
        "id":"8ea490a81b9944b1b136de598748e4d6",
        "addr":"中国广东省深圳市福田区香林路28号",
        "status":0,
        selected: false
      },
      projects: {
        attributes: {
          page_index: 1, //当前页码
          page_size: 2, //当前页数
          tatal: 10, //总条目数
          total_pages: 10 //条页数
        },
        dataItems: []
      },
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
      }
    };
  },
  components: {
    /**分页组件 */
    Pagination
  },
  filters:{
  },
  methods: {

    selectedAll(){
      if(this.selectedProjects.length){
        this.selectedProjects = [];
      }
      else this.selectedProjects = this.projects.dataItems.map((o,i)=>i);
    },

    editProject(){
      
    },

    delProject(id){

      let datas = id != null ? [this.projects.dataItems[id]] : this.selectedProjects.map(o=>this.projects.dataItems[o]);
      console.log(datas)
      if(datas.length){
        this.$confirm(`确定要删除[${datas.map(o=>o.project_name)}]吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => this.$api.project.delete(new RequestParams().addDataItems(datas.map(o=>new RequestDataItem().addAttribute("id", o.id)))))
        .then(response=>{
          this.$message.success("删除成功");
          this.projects.dataItems.splice(this.delProjectindex, 1);
          this.projects = this.projects;

        })
        .catch(({message}) => this.$message.error(message))
        .catch(() => {
          this.$message.info("已取消删除");
        });
      }
      else this.$message.info("请选择要删除的项目");
    },

    /**加载项目列表数据 */
    loadProjectDatas(pageNum, params = {}) {
      let searchTimes = this.searchTimes.map(o=>moment().format("yyyy-MM-dd HH:mm:ss"))
      this.$api.project
        .getlist({
          attributes: $.extend({
              page_index: pageNum ,//当前页码,
            },
            new RequestParams(params).addAttribute("begin_time", searchTimes[0]).addAttribute("end_time", searchTimes[1])
          )
        })
        .then(response => {
          this.projects.attributes = response.attributes;
          this.projects.dataItems = response.dataItems.map(o => o.attributes);
        })
        .catch(({message}) => this.$message.error(message));
    },
  },
  mounted() {
    this.loadProjectDatas(1, {});
  }
};
</script>

<style scoped>
@import "../../assets/css/ProjectManagement.css";
@import "../../assets/css/datepicker.css";
</style>
