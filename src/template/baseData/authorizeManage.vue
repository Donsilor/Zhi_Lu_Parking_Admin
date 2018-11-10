<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="add-department blu-button" @click="showEditAuthorize(null)">+新增</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="condition">
          <span class="conditions-text">搜索条件：</span>
          <div class="custom-input">
            <input type="text" placeholder="请输入用户名或号码" v-model="searchParam">
            <input type="submit" value=""  @click="loadAuthorizesDatas(1, {key:searchParam})">
          </div>
        </div>
      </div>
      <div class="clf bottom">
        <div class="fl">
          <button class="plechoose fl"  @click="selectedAll">请选择 <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl"  @click="delAuthorize(null)">批量删除</button>
          <div>共搜索到 <span>{{authorizes.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button"  @click="loadAuthorizesDatas(1, {key:searchParam})">搜索</button>
          <button class="clear-button bluborder-button"  @click="searchParam = null">清除</button>
          <button class="ss transf-button" v-bind:class="{hide:searchDivShow}" v-on:click="searchDivShow=!searchDivShow">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{searchDivShow ? "收起搜索" : "展开搜索"}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="selected" v-show="selectedAthorizes.length">已选 <span>{{selectedAthorizes.length}}</span> 项数据</div>
      <div class="tab">
        <table class="usermanagement-table">
          <tr>
            <th></th>
            <th>授权名称</th>
            <th>客户</th>
            <th>电话</th>
            <th>地址</th>
            <th>创建时间</th>
            <th>更新时间</th>
            <th>操作员</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
          <tr v-for="(authorize, index) in authorizes.dataItems" v-bind:key="index">
            <td><input type="checkbox" :value="index" v-model="selectedAthorizes"></td>
            <td>{{authorize.oauth_name}}</td>
            <td>{{authorize.client_name}}</td>
            <td>{{authorize.tel}}</td>
            <td>{{authorize.addr}}</td>
            <td>{{authorize.create_time}}</td>
            <td>{{authorize.update_time}}</td>
            <td>{{authorize.tel}}</td>
            <td><span v-bind:class="{normal:authorize.status}">正常</span></td>
            <td>
              <a href="javascript:" class="edit"  @click="showEditAuthorize(index)">编辑</a>
              <a href="javascript:" class="delete"  @click="delAuthorize(index)">删除</a>
              <a href="javascript:" @click="resetPassword(authorize.id, authorize.client_name)">重置密码</a>
            </td>
          </tr>
        </table>
      </div>
      <Pagination
        :previousPage="loadAuthorizesDatas" 
        :nextPage="loadAuthorizesDatas"
        :skipPage="loadAuthorizesDatas"
        :pageIndex="authorizes.attributes.page_index"
        :totalPages="authorizes.attributes.total_pages"
        :pageSize="authorizes.attributes.page_size"
        :tatal="authorizes.attributes.tatal"
      ></Pagination>
    </div>
    <!--弹窗-->
    <div class="main" v-if="ifAuthorize">
      <div class="depwd" v-drag.cursor="'#authorize'">
        <div class="top-nav" id="authorize">
          <p class="t-text fl">授权信息</p>
          <p class="close fr" @click="ifAuthorize = false">x</p>
        </div>
        <div class="bot">
          <div class="cet">
            <div class="clf">
              <!-- <p class="red"><i class="iconfont icon-jian-tianchong"></i>错误提示的文案</p> -->
              <p class="clf"><span class="fl"><span class='red-text'>*</span>授权名称：</span><input v-model="authorizeData.oauth_name" class="fl user" name="user" type="text" placeholder="请输入编号，必填"> </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>授权KEY：</span>
                <input class="fl psw" v-model="authorizeData.oauth_key" name="psw" type="text" placeholder="请输入6-8位数字密码，必填">
                <span class="pswremind remind">请输入正确信息</span>
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>确认KEY：</span>
                <input class="fl ppsw" v-model="authorizeData.oauth_key2" name="ppsw" type="text" placeholder="请输入6-8位数字密码，必填">
                <span class="ppswremind remind">请输入正确信息</span>
              </p>
              <p class="clf"><span class="fl"><span class='red-text'>*</span>客户名称：</span><input class="fl" v-model="authorizeData.client_name" type="text" placeholder="请输入姓名，必填"> </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>电话：</span>
                <input class="fl tel" type="text" v-model="authorizeData.tel" name="tel" placeholder="请输入电话号码，必填">
                <span class="telremind remind">请输入正确信息</span>
              </p>
              <p class="clf upload"><span class="fl">地址：</span><input class="fl" v-model="authorizeData.addr" type="text" placeholder="请输入备注"> </p>
              <p class="bz clf"><span class="fl">备注：</span><input class="fl" v-model="authorizeData.remark" type="text" placeholder="请输入备注" id="inp"> </p>
            </div>
            <div class="button clf">
              <a class="acknowledgement fr" @click="editAuthorize">确定</a>
              <a class="qx fr" @click="ifAuthorize = false">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="delete_prompt" v-if="ifDel">
      <div class="depwd">
        <div class="text">你是否确认删除选中的记录</div>
        <div class="button clf">
          <a href="javascript:" class="qr fr">确定</a>
          <a href="javascript:" class="qx fr" @click="ifDel = false">取消</a>
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
    </div> -->
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
        ifAuthorize: false,
        ifDel: false,
        searchParam:"",
        selectedAthorizes:[],
        authorizeData:{
          /**ID */
          id:null,
          /**授权名称 */
          oauth_name:null,
          /**授权KEY */
          oauth_key:null,
          oauth_key2:null,
          /**客户 */
          client_name:null,
          /**电话 */
          tel:null,
          /**地址 */
          addr:null,
          /**有效期开始时间(格式：yyyy-MM-dd HH:mm:ss) */
          begin_time:null,
          /**有效期结束时间(格式：yyyy-MM-dd HH:mm:ss) */
          end_time:null,
          /**操作员ID */
          operator_id:null,
          /**备注 */
          remark:null
        },
        authorizes:{
          attributes: {
            page_index: 1, //当前页码
            page_size: 2, //当前页数
            tatal: 10, //总条目数
            total_pages: 10 //条页数
          },
          dataItems: []
        }
      };
    },
    components: {
      /**分页组件 */
      Pagination
    },
    methods: {

      selectedAll(){
        if(this.selectedAthorizes.length){
          this.selectedAthorizes = [];
        }
        else this.selectedAthorizes = this.authorizes.dataItems.map((o,i)=>i);
      },

      showEditAuthorize(id){
        this.authorizeData = this.authorizes.dataItems[id] || {};
        this.ifAuthorize = true;
      },
      
      editAuthorize(){

        this.$api.oauth.editor(new RequestParams()
        .addAttributes(this.authorizeData)
        .addAttribute("project_id", User.info.project_id))
        .then(response=>{
          this.$message.success(response.message)
          this.ifAuthorize = false;
          this.loadAuthorizesDatas();
        })
        .catch(({message}) => this.$message.error(message))
      },

      resetPassword(id, name){
        this.$confirm(`确定要重置[${name}]的密码吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => this.$api.oauth.resetpwd(new RequestParams().addAttribute("id", id)))
          .then(response=>{
            this.$message.success("重置成功");
          })
          .catch(({message}) => this.$message.error(message))
          .catch(() => {
            this.$message.info("已取消重置");
          });
      },
      
      delAuthorize(id){
          
        let datas = id != null ? [this.authorizes.dataItems[id]] : this.selectedAthorizes.map(o=>this.authorizes.dataItems[o]);
        if(datas.length){
          this.$confirm(`确定要删除[${datas.map(o=>o.oauth_name)}]吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => this.$api.oauth.delete(new RequestParams().addDataItems(datas.map(o=>new RequestDataItem().addAttribute("id", o.id)))))
          .then(response=>{
            this.$message.success("删除成功");
            this.loadAuthorizesDatas();
          })
          .catch(({message}) => this.$message.error(message))
          .catch(() => {
            this.$message.info("已取消删除");
          });
        }
        else this.$message.info("请选择要删除的授权记录");
      },

      /**加载用户列表数据 */
      loadAuthorizesDatas(pageNum = 1, params = {}) {
        this.$api.oauth
          .getlist(new RequestParams()
          .addAttributes(params)
          .addAttribute("page_index", pageNum))
          .then(response => {
            this.authorizes.attributes = response.attributes;
            this.authorizes.dataItems = response.dataItems.map(o => o.attributes)
          })
          .catch(response => this.$message.error(response.message));
      }
    },
    mounted() {
      this.loadAuthorizesDatas(1, {});
    }
  };
</script>

<style scoped>
  @import "../../assets/css/authorizeManage.css";
</style>
