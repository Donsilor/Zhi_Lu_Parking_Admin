<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="add-department blu-button" @click="ifEditDepartment = true">+新增</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="condition">
          <span class="conditions-text">搜索条件：</span>
          <div class="custom-input">
            <input type="text" placeholder="请输入">
            <input type="submit" value="">
          </div>
        </div>
      </div>
      <div class="clf bottom">
        <div class="fl">
          <button class="plechoose fl">请选择 <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl">批量删除</button>
          <div>共搜索到 <span>922</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button">搜索</button>
          <button class="clear-button bluborder-button">清除</button>
          <button class="ss transf-button" v-bind:class="{hide:searchDivShow}" v-on:click="searchDivShow=!searchDivShow">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{searchDivShow ? "收起搜索" : "展开搜索"}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="selected">已选 <span>5</span> 项数据</div>
      <div class="tab">
        <table class="departmentmanagement-table">
          <tr>
            <th><input type="checkbox" name="checkbox"></th>
            <th>编号</th>
            <th>名称</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
          <tr v-for="(dept, id) in depts.dataItems" v-bind:key="id">
            <td><input type="checkbox" v-model="dept.selected"></td>
            <td>{{dept.dept_code}}</td>
            <td>{{dept.dept_name}}</td>
            <td>{{dept.remark}}</td>
            <td>
              <a href="javascript:" class="edit" @click="ifEditDepartment = true">编辑</a>
              <a href="javascript:" class="delete" @click="ifDel = true">删除</a>
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
              <p class="red"><i class="iconfont icon-jian-tianchong"></i>错误提示的文案</p>
              <p class="num"><span class='red-text'>*</span><span>编号：</span><input type="text" placeholder="请输入编号，必填">
              </p>
              <p class="name"><span class='red-text'>*</span><span>名称：</span><input type="text" placeholder="请输入名称，必填">
              </p>
              <p class="bz"><span class='red-text'>*</span><span>备注：</span><input type="text" placeholder="请输入备注"
                                                                                  id="inp"></p>
            </div>
            <div class="button clf">
              <a class="qr fr">确定</a>
              <a class="qx fr" @click="ifEditDepartment = false">取消</a>
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
        searchDivShow: true,
        ifEditDepartment: false,
        ifDel: false,
        depts: {
          attributes: {
            page_index: 1, //当前页码
            page_size: 2, //当前页数
            tatal: 10, //总条目数
            total_pages: 10 //条页数
          },
          dataItems: {
          }
        }
      };
    },
    components: {
      /**分页组件 */
      Pagination
    },
    methods: {
      /**加载用户列表数据 */
      loadDeptsDatas(pageNum, params = {}) {
        this.$api.dept
          .getlist({
              attributes: $.extend({
                  page_index: pageNum //当前页码
              },params)
          })
          .then(response => {
            this.depts.attributes = response.attributes;
            this.depts.dataItems = array2Object(response.dataItems.map(o => o.attributes), "id");
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
