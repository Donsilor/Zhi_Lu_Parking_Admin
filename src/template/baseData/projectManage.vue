<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="add-department blu-button" @click="showEditProject">+新增</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="condition fl">
          <span class="conditions-text">资源名称：</span>
          <div class="custom-input">
            <input type="text" v-model="searchParam" placeholder="请输入编号或者名称">
            <input type="submit" value="" v-on:click="loadProjectDatas()">
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
          <button class="plechoose fl" @click="selectedAll">全选 <img src="../../assets/images/icon_9.png" alt="">
          </button>
          <button class="batchdel fl" @click="delProject(null)">批量删除</button>
          <div>共搜索到 <span>{{projects.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button" v-on:click="loadProjectDatas()">搜索</button>
          <button class="clear-button bluborder-button" v-on:click="searchParam = null, searchTimes = []">清除</button>
          <button class="ss transf-button" v-bind:class="{hide:!searchDivShow}"
                  v-on:click="searchDivShow=!searchDivShow">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{searchDivShow === true ? '收起搜索' : '展开搜索'}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="selected" v-show="selectedProjects.length">已选 <span>{{selectedProjects.length}}</span> 项数据</div>
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
              <td><div :title="project.project_code">{{project.project_code}}</div></td>
              <td><div :title="project.project_name">{{project.project_name}}</div></td>
              <td><div :title="project.addr">{{project.addr}}</div></td>
              <td><div :title="project.linkman">{{project.linkman}}</div></td>
              <td><div :title="project.tel">{{project.tel}}</div></td>
              <td><div :title="project.total_place">{{project.total_place}}</div></td>
              <td><div :title="project.create_time">{{project.create_time}}</div></td>
              <td><div :title="project.update_time">{{project.update_time}}</div></td>
              <td><div :title="project.user_name">{{project.user_name}}</div></td>
              <td><a href="javascript:" class="buttion" @click="projectData = project,dialogProjectStatus = true" v-bind:class="{normal:project.status}">{{["正常","停用","注销"][project.status]}}</a></td>
              <td>
                <a class="bj" href="javascript:" @click="showEditProject(index)">编辑</a>
                <a href="javascript:" class="delete" v-on:click="delProject(index)">删除</a>
                <a href="javascript:" @click="resetPassword(project.id, project.project_name, project.project_code)">重置密码</a>
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
          <p class="t-text fl">{{projectData.id ? "修改项目" : "新增项目"}}</p>
          <p class="close fr" @click="ifEditInfo = false">x</p>
        </div>
        <div class="bot">
          <div class="cet">
            <div class="clf">
              <!-- <p class="red" ><i class="iconfont icon-jian-tianchong"></i>错误提示的文案</p> -->
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>项目编号：</span>
                <input class="fl" v-bind:disabled="!!projectData.id" v-model="projectData.temp_project_code" placeholder="请输入编号，必填" type="text">
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>项目名称：</span>
                <input class="fl" v-model="projectData.temp_project_name" type="text" placeholder="请输入6-8位数字密码，必填">
              </p>
              <p class="clf">
                <span class="fl">地址：</span>
                <input class="fl" type="text" v-model="projectData.temp_addr" placeholder="请输入6-8位数字密码，必填">
              </p>
              <p class="clf">
                <span class="fl">联系人：</span>
                <input class="fl" type="text" v-model="projectData.temp_linkman" placeholder="请输入6-8位数字密码，必填">
              </p>
              <p class="clf">
                <span class="fl">联系电话：</span>
                <input class="fl" type="text" v-model="projectData.temp_tel" placeholder="请输入编号，必填">
              </p>
              <p class="clf">
                <span class="fl">车位总数：</span>
                <input class="fl" type="text" v-model="projectData.temp_total_place" placeholder="请输入编号，必填">
              </p>
              <p class="bz clf">
                <span class="fl">备注：</span>
                <input class="fl" type="text" v-model="projectData.temp_remark" placeholder="请输入备注" id="inp">
              </p>
            </div>
            <div class="button clf">
              <a class="qr fr" @click="editProject">确定</a>
              <a class="qx fr" @click="ifEditInfo = false">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="resetPW" v-if="resetPW">
      <div class="depwd">
        <div class="text">密码已重新设置为888888</div>
        <div class="button clf">
          <a class="qr fr">确定</a>
          <a class="qx fr" @click="resetPW = false">取消</a>
        </div>
      </div>
    </div>
    <!--弹窗-->
    <el-dialog
      title="确认修改项目状态"
      :visible.sync="dialogProjectStatus"
      width="20%"
      >
      <el-radio-group v-model="projectData.status">
        <el-radio :label="0">正常</el-radio>
        <el-radio :label="1">停用</el-radio>
        <el-radio :label="2">注销</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button :style="{padding: '0 0'}" @click="dialogProjectStatus = false">取 消</el-button>
        <el-button :style="{padding: '0 0'}" type="primary" @click="updateStatus()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { RequestParams, RequestDataItem, User } from '../../assets/js/entity'
import {RegExpCheck} from "../../assets/js/common";
import Pagination from '../Pagination'
import moment from 'moment'

export default {
  name:"projectManage",
  data () {
    return {
      dialogProjectStatus:false,
      ifEditInfo: false,
      resetPW: false,
      /**是否显示搜索输入框 */
      searchDivShow: true,
      /**搜索参数 */
      searchParam: '',
      searchTimes: [],
      selectedProjects: [],
      /**项目列表的数据 */
      projectData: {
        id: null,//          	Y	String	ID
        project_code: null,//	Y	String	项目编号
        project_name: null,//	Y	String	项目名称
        addr: null,//        	N	String	项目地址
        linkman: null,//     	Y	String	联系人
        tel: null,//         	Y	String	联系电话
        total_place: null,// 	Y	Int	总车位数
        remark: null,//      	N	String	备注
        resetPW: false,
        temp_project_code: null,//	Y	String	项目编号副本
        temp_project_name: null,//	Y	String	项目名称副本
        temp_addr: null,//        	N	String	项目地址副本
        temp_linkman: null,//     	Y	String	联系人副本
        temp_tel: null,//         	Y	String	联系电话副本
        temp_total_place: null,// 	Y	Int     总车位数副本
        temp_remark: null,//      	N	String	备注副本
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
    }
  },
  components: {
    /**分页组件 */
    Pagination
  },
  filters: {},
  methods: {

    updateStatus(){
      this.$api.project.updatestatus(new RequestParams()
      .addAttribute("id", this.projectData.id)
      .addAttribute("status", this.projectData.status))
      .then(({message}) => this.$message.success(message))
      .catch(({message}) => this.$message.error(message))
      .finally(()=>this.dialogProjectStatus = false);
    },

    selectedAll () {
      if (this.selectedProjects.length) {
        this.selectedProjects = []
      }
      else this.selectedProjects = this.projects.dataItems.map((o, i) => i)
    },

    showEditProject (id) {
      this.projectData = this.projects.dataItems[id] || {}
      this.ifEditInfo = true
      this.projectData.temp_project_code = this.projectData.project_code
      this.projectData.temp_project_name = this.projectData.project_name
      this.projectData.temp_addr = this.projectData.addr
      this.projectData.temp_linkman = this.projectData.linkman
      this.projectData.temp_tel = this.projectData.tel
      this.projectData.temp_total_place = this.projectData.total_place
      this.projectData.temp_remark = this.projectData.remark
    },

    editProject () {

      let adopt = null;
//      if(String(this.projectData.project_code).trim() == "") adopt = "请填写项目编号";
//      if(String(this.projectData.project_name).trim() == "") adopt = "请填写项目名称";
//      if(String(this.projectData.linkman).trim() == "") adopt = "请填写联系人";
//      if(String(this.projectData.tel).trim() == "") adopt = "请填写联系方式";
//      if(String(this.projectData.total_place).trim() == "") adopt = "请填写总车位数";

      if(!RegExpCheck.isInteger(String(this.projectData.temp_total_place).trim())) adopt = "请填写正确的总车位数";
      if(!RegExpCheck.isTel(String(this.projectData.temp_tel).trim())) adopt = "请填写正确的联系方式";
      if(!RegExpCheck.isFullName(String(this.projectData.temp_linkman).trim())) adopt = "请填写正确的联系人";
      if(!RegExpCheck.isAddr(String(this.projectData.temp_addr).trim())) adopt = "请填写正确的地址";
      if(!RegExpCheck.isName(String(this.projectData.temp_project_name).trim())) adopt = "请填写正确的项目名称";
      if(!RegExpCheck.isNumber(String(this.projectData.temp_project_code).trim())) adopt = "请填写正确的项目编号";

      if(adopt) return this.$message.error(adopt);

      this.projectData.project_code = this.projectData.temp_project_code
      this.projectData.project_name = this.projectData.temp_project_name
      this.projectData.addr = this.projectData.temp_addr
      this.projectData.linkman = this.projectData.temp_linkman
      this.projectData.tel = this.projectData.temp_tel
      this.projectData.total_place = this.projectData.temp_total_place
      this.projectData.remark = this.projectData.temp_remark

      this.$api.project.editor(new RequestParams().addAttributes(this.projectData))
      .then(response=>{
        this.$message.success(response.message)
        this.ifEditInfo = false
        this.loadProjectDatas()
      })
      .catch(({message}) => this.$message.error(message))
    },

    resetPassword(id, project_code, name){
      this.$confirm(`确定要重置[${name}]的密码吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => this.$api.project.resetpwd(new RequestParams().addAttribute("id", id).addAttribute("project_code", project_code)))
        .then(response=>{
          this.$message.success("重置成功");
        })
        .catch(({message}) => this.$message.error(message))
        .catch(() => {
          this.$message.info("已取消重置");
        });
    },

    delProject(id){

      let datas = id != null ? [this.projects.dataItems[id]] : this.selectedProjects.map(o => this.projects.dataItems[o])
      console.log(datas)
      if (datas.length) {
        this.$confirm(`确定要删除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => this.$api.project.delete(new RequestParams().addDataItems(datas.map(o => new RequestDataItem().addAttribute('id', o.id)))))
        .then(response => {
          this.$message.success('删除成功')
          this.loadProjectDatas()
        })
        .catch(({message}) => this.$message.error(message))
        .catch(() => {
          this.$message.info('已取消删除')
        })
      }
      else this.$message.info('请选择要删除的项目')
    },

    /**加载项目列表数据 */
    loadProjectDatas (pageNum = 1, params = {}) {

      this.$api.project
      .getlist(new RequestParams()
      .addAttributes(params)
      .addAttribute('key', this.searchParam && ` AND project_code like '%${this.searchParam}%' OR project_name like '${this.searchParam}'`)
      .addAttribute('page_index', pageNum)
      .addAttribute('begin_time', this.searchTimes[0] && moment(this.searchTimes[0]).format("YYYY-MM-DD"))
      .addAttribute('end_time', this.searchTimes[1] && moment(this.searchTimes[1]).format("YYYY-MM-DD")))
      .then(response => {
        this.projects.attributes = response.attributes
        this.projects.dataItems = response.dataItems.map(o => o.attributes)
        this.selectedProjects = []
      })
      .catch(({message}) => this.$message.error(message))
    }
  },
  mounted () {
    this.loadProjectDatas(1, {})
  }
}
</script>

<style scoped>
@import "../../assets/css/ProjectManagement.css";
@import "../../assets/css/datepicker.css";
</style>
