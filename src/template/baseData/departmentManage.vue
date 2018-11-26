<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="add-department blu-button" @click="showEditDept(null)">+新增</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="condition">
          <span class="conditions-text">搜索条件：</span>
          <div class="custom-input">
            <input type="text" placeholder="请输入编号或者名称" v-model="searchParam">
            <input type="submit" value="" @click="loadDeptsDatas()">
          </div>
        </div>
      </div>
      <div class="clf bottom">
        <div class="fl">
          <button class="plechoose fl" @click="selectedAll">全选 <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl" @click="delDept(null)">批量删除</button>
          <div>共搜索到 <span>{{depts.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button" @click="loadDeptsDatas()">搜索</button>
          <button class="clear-button bluborder-button" @click="searchParam = null">清除</button>
          <button class="ss transf-button" v-bind:class="{hide:!searchDivShow}"
                  v-on:click="searchDivShow=!searchDivShow">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{searchDivShow ? "收起搜索" : "展开搜索"}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="selected" v-show="selectedDepts.length">已选 <span>{{selectedDepts.length}}</span> 项数据</div>
      <div class="tab">
        <table class="departmentmanagement-table">
          <tr>
            <th></th>
            <th>编号</th>
            <th>名称</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
          <tr v-for="(dept, index) in depts.dataItems" v-bind:key="index">
            <td><input type="checkbox" :value="index" v-model="selectedDepts"></td>
            <td>
              <div :title="dept.dept_code">{{dept.dept_code}}</div>
            </td>
            <td>
              <div :title="dept.dept_name">{{dept.dept_name}}</div>
            </td>
            <td>
              <div :title="dept.remark">{{dept.remark}}</div>
            </td>
            <td>
              <a href="javascript:" class="edit" @click="showEditDept(index)">编辑</a>
              <a href="javascript:" class="delete" @click="delDept(index)">删除</a>
            </td>
          </tr>
        </table>
      </div>
      <Pagination
        :previousPage="loadDeptsDatas"
        :nextPage="loadDeptsDatas"
        :skipPage="loadDeptsDatas"
        :pageIndex="depts.attributes.page_index"
        :totalPages="depts.attributes.total_pages"
        :pageSize="depts.attributes.page_size"
        :tatal="depts.attributes.tatal"
      ></Pagination>
    </div>
    <!--弹窗-->
    <div class="main" v-if="ifEditDepartment">
      <div class="depwd" v-drag.cursor="'#department'">
        <div class="top-nav" id="department">
          <p class="t-text fl">部门信息</p>
          <p class="close fr" @click="ifEditDepartment = false">x</p>
        </div>
        <div class="bot">
          <div class="cet">
            <div class="clf">
              <!-- <p class="red"><i class="iconfont icon-jian-tianchong"></i>错误提示的文案</p> -->
              <p class="num">
                <span class='red-text'>*</span><span>编号：</span>
                <input type="text" v-model="deptData.temp_dept_code" placeholder="请输入编号，必填">
              </p>
              <p class="name">
                <span class='red-text'>*</span><span>名称：</span>
                <input type="text" v-model="deptData.temp_dept_name" placeholder="请输入名称，必填">
              </p>
              <p class="bz">
                <span class='red-text'>*</span><span>备注：</span>
                <textarea type="text" v-model="deptData.temp_remark" placeholder="请输入备注" id="inp"></textarea>
              </p>
            </div>
            <div class="button clf">
              <a class="qr fr" @click="editDept">确定</a>
              <a class="qx fr" @click="ifEditDepartment = false">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="delete_prompt" v-if="ifDel">
      <div class="depwd">
        <div class="text">你是否确认删除选中的记录</div>
        <div class="button clf">
          <a class="qr fr">确定</a>
          <a class="qx fr" @click="ifDel = false">取消</a>
        </div>
      </div>
    </div> -->
    <!--弹窗-->
  </div>
</template>

<script>
import { RequestParams, RequestDataItem, User } from '../../assets/js/entity'
import Pagination from '../Pagination'
import { RegExpCheck } from '../../assets/js/common'
import moment from 'moment'

export default {
  data () {
    return {
      searchDivShow: true,
      ifEditDepartment: false,
      ifDel: false,
      searchParam: '',
      selectedDepts: [],
      deptData: {
        id: null,//         	Y	String	ID
        dept_code: null,//  	Y	String	编号
        dept_name: null,//  	Y	String	名称
        remark: null, //     	N	String	备注
        temp_dept_code: null,
        temp_dept_name: null,
        temp_remark: null
      },
      depts: {
        attributes: {
          page_index: 1, //当前页码
          page_size: 2, //当前页数
          tatal: 10, //总条目数
          total_pages: 10 //条页数
        },
        dataItems: []
      }
    }
  },
  components: {
    /**分页组件 */
    Pagination
  },
  methods: {

      selectedAll(){
        if(this.selectedDepts.length){
          this.selectedDepts = [];
        }
        else this.selectedDepts = this.depts.dataItems.map((o,i)=>i);
      },

    showEditDept (id) {
      this.deptData = this.depts.dataItems[id] || {}
      this.ifEditDepartment = true
      this.deptData.temp_dept_code = this.deptData.dept_code
      this.deptData.temp_dept_name = this.deptData.dept_name
      this.deptData.temp_remark = this.deptData.remark
    },

    editDept () {

      let adopt = null
      // if (String(this.deptData.dept_code).trim() == '') adopt = '请填写部门编号'
      // if (String(this.deptData.dept_name).trim() == '') adopt = '请填写部门名称'

      if (!RegExpCheck.isNumber(String(this.deptData.temp_dept_code).trim())) adopt = '请填写正确的部门编号'
      if (!RegExpCheck.isName(String(this.deptData.temp_dept_name).trim())) adopt = '请填写正确的部门名称'

      if (adopt) return this.$message.error(adopt)

      this.deptData.dept_code = this.deptData.temp_dept_code
      this.deptData.dept_name = this.deptData.temp_dept_name
      this.deptData.remark = this.deptData.temp_remark

      this.$api.dept.editor(new RequestParams()
        .addAttributes(this.deptData)
        .addAttribute("project_id", 0)
        )
        .then(response=>{
          this.$message.success(response.message)
          this.ifEditDepartment = false;
          this.loadDeptsDatas();
        })
        .catch(({message}) => this.$message.error(message))
      },

      delDept(id){

        let datas = id != null ? [this.depts.dataItems[id]] : this.selectedDepts.map(o=>this.depts.dataItems[o]);
        if(datas.length){
          this.$confirm(`确定要删除吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => this.$api.dept.delete(new RequestParams().addDataItems(datas.map(o=>new RequestDataItem().addAttribute("id", o.id)))))
          .then(response=>{
            this.$message.success("删除成功");
            this.loadDeptsDatas();
          })
          .catch(({message}) => this.$message.error(message))
          .catch(() => {
            this.$message.info("已取消删除");
          });
        }
        else this.$message.info("请选择要删除的部门");
      },

      /**加载用户列表数据 */
      loadDeptsDatas(pageNum = 1, params = {}) {
        this.$api.dept
          .getlist(new RequestParams()
          .addAttributes(params)
          .addAttribute("key", this.searchParam && `AND dept_code = '${this.searchParam}' OR dept_name = '${this.searchParam}'`)
          .addAttribute("page_index", pageNum))
          .then(response => {
            this.depts.attributes = response.attributes;
            this.depts.dataItems = response.dataItems.map(o => o.attributes)
            this.selectedDepts = [];
          })
          .catch(response => this.$message.error(response.message));
      }
    },
    mounted() {
      this.loadDeptsDatas(1, {});
    }
  };
</script>

<style scoped>
  @import "../../assets/css/DepartmentManagement.css";
  @import "http://jqueryui.com/resources/demos/style.css";
</style>
