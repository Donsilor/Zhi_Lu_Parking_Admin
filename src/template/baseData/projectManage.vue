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
          <button class="plechoose fl" @click="selectedAll">全选 <img src="../../assets/images/icon_9.png" alt="">
          </button>
          <button class="batchdel fl" @click="delProject(null)">批量删除</button>
          <div>共搜索到 <span>{{projects.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button" v-on:click="loadProjectDatas(1, {key:searchParam})">搜索</button>
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
          <tr v-for="(project, index) in projects.dataItems" v-bind:key="index">
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
              <a class="bj" href="javascript:" @click="showEditProject(index)">编辑</a>
              <a href="javascript:" class="delete" v-on:click="delProject(index)">删除</a>
              <a href="javascript:" @click="resetPW = true">重置密码</a>
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
              <!-- <p class="red" ><i class="iconfont icon-jian-tianchong"></i>错误提示的文案</p> -->
              <p class="clf"><span class="fl"><span class='red-text'>*</span>项目编号：</span><input class="fl"
                                                                                                v-model="projectData.project_code"
                                                                                                placeholder="请输入编号，必填"
                                                                                                type="text"></p>
              <p class="clf"><span class="fl"><span class='red-text'>*</span>项目名称：</span><input class="fl"
                                                                                                v-model="projectData.project_name"
                                                                                                type="text"
                                                                                                placeholder="请输入6-8位数字密码，必填">
              </p>
              <p class="clf"><span class="fl">地址：</span><input class="fl" type="text" v-model="projectData.addr"
                                                               placeholder="请输入6-8位数字密码，必填"></p>
              <p class="clf"><span class="fl">联系人：</span><input class="fl" type="text" v-model="projectData.linkman"
                                                                placeholder="请输入6-8位数字密码，必填"></p>
              <p class="clf"><span class="fl">联系电话：</span><input class="fl" type="text" v-model="projectData.tel"
                                                                 placeholder="请输入编号，必填"></p>
              <p class="clf"><span class="fl">车位总数：</span><input class="fl" type="text"
                                                                 v-model="projectData.total_place"
                                                                 placeholder="请输入编号，必填"></p>
              <p class="bz clf"><span class="fl">备注：</span><input class="fl" type="text" v-model="projectData.remark"
                                                                  placeholder="请输入备注" id="inp"></p>
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
  </div>
</template>

<script>
import { RequestParams, RequestDataItem } from '../../assets/js/entity'
import { array2Object, User } from '../../assets/js/common'
import Pagination from '../Pagination'
import moment from 'moment'

export default {
  data () {
    return {
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
        /**ID */
        id: null,
        /**项目编号 */
        project_code: null,
        /**项目名称 */
        project_name: null,
        /**项目地址 */
        addr: null,
        /**联系人 */
        linkman: null,
        /**联系电话 */
        tel: null,
        /**总车位数 */
        total_place: null,
        /**操作员ID */
        operator_id: User.info.id,
        /**备注 */
        remark: null,
        resetPW: false
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
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  components: {
    /**分页组件 */
    Pagination
  },
  filters: {},
  methods: {

    selectedAll () {
      if (this.selectedProjects.length) {
        this.selectedProjects = []
      }
      else this.selectedProjects = this.projects.dataItems.map((o, i) => i)
    },

    showEditProject (id) {
      this.projectData = this.projects.dataItems[id] || {}
      this.ifEditInfo = true
    },

    editProject () {

      // if(this.projectData.id){

      // }
      // else if(this.projectData.project_code){

      // }
      // else if(this.projectData.project_name){

      // }
      // else if(this.projectData.addr){

      // }
      // else if(this.projectData.linkman){

      // }
      // else if(this.projectData.tel){

      // }
      // else if(this.projectData.operator_id){

      // }
      // else if(this.projectData.remark){

      // }

      this.$api.project.editor(new RequestParams().addAttributes(this.projectData).addAttribute('operator_id', User.info.id))
      .then(response => {
        this.$message.error(response.message)
        this.ifEditInfo = false
        this.loadProjectDatas()
      })
      .catch(({message}) => this.$message.error(message))
    },

    delProject (id) {

      let datas = id != null ? [this.projects.dataItems[id]] : this.selectedProjects.map(o => this.projects.dataItems[o])
      console.log(datas)
      if (datas.length) {
        this.$confirm(`确定要删除[${datas.map(o => o.project_name)}]吗?`, '提示', {
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
      let searchTimes = this.searchTimes.map(o => moment(o).format('YYYY-MM-DD HH:mm:ss'))
      this.$api.project
      .getlist(new RequestParams()
      .addAttributes(params)
      .addAttribute('page_index', pageNum)
      .addAttribute('begin_time', searchTimes[0])
      .addAttribute('end_time', searchTimes[1]))
      .then(response => {
        this.projects.attributes = response.attributes
        this.projects.dataItems = response.dataItems.map(o => o.attributes)
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
