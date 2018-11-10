<template>
  <div class="content clf">
    <div class="search ">
      <div class="add" >
        <button class="add-department blu-button" v-on:click="showEditUser(null)">+新增</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="condition">
          <span class="conditions-text">搜索条件：</span>
          <div class="custom-input">
            <input type="text" placeholder="请输入用户名或号码" v-model="searchParam">
            <input type="submit" value="" v-on:click="loadUserDatas(1, {key:searchParam})">
          </div>
        </div>
      </div>
      <div class="clf bottom">
        <div class="fl">
          <button class="plechoose fl" @click="selectedAll">全选 <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl" @click="delUser(null)">批量删除</button>
          <div>共搜索到 <span>{{users.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button" v-on:click="loadUserDatas(1, {key:searchParam})">搜索</button>
          <button class="clear-button bluborder-button" v-on:click="searchParam = null">清除</button>
          <button class="ss transf-button" v-bind:class="{hide:searchDivShow}" v-on:click="searchDivShow=!searchDivShow">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{searchDivShow === true ? "收起搜索" : "展开搜索"}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="selected" v-show="selectedUsers.length">已选 <span>{{selectedUsers.length}}</span> 项数据</div>
      <div class="tab">
        <table class="usermanagement-table">
          <thead>
            <tr>
              <th></th>
              <th>照片</th>
              <th>用户名</th>
              <th>姓名</th>
              <th>电话</th>
              <th>创建时间</th>
              <th>更新时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users.dataItems" v-bind:key="index">
              <td><input type="checkbox" :value="index" v-model="selectedUsers"></td>
              <td><span><img v-bind:src="user.photo" alt=""></span></td>
              <td>{{user.user_name}}</td>
              <td>{{user.full_name}}</td>
              <td>{{user.tel}}</td>
              <td>{{user.create_time}}</td>
              <td>{{user.update_time}}</td>
              <td><span v-bind:class="{normal:user.status}">正常</span></td>
              <td>
                <a href="javascript:" class="edit" @click="showEditUser(index)">编辑</a>
                <a href="javascript:" class="delete" v-on:click="delUser(index)">删除</a>
                <a href="javascript:" @click="resetPassword(user.id, user.user_name)">重置密码</a>
                <a href="javascript:">角色</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        :previousPage="loadUserDatas" 
        :nextPage="loadUserDatas"
        :skipPage="loadUserDatas"
        :pageIndex="users.attributes.page_index"
        :totalPages="users.attributes.total_pages"
        :pageSize="users.attributes.page_size"
        :tatal="users.attributes.tatal"
      ></Pagination>
    </div>
    <!--弹窗-->
    <div class="main" v-bind:style="{display:addUserWindow?'block':'none'}">
      <div class="depwd">
        <div class="top-nav">
          <p class="t-text fl">用户信息</p>
          <p class="close fr" v-on:click="addUserWindow = false">x</p>
        </div>
        <div class="bot">
          <div class="cet">
            <div class="clf">
              <!-- <p class="red" v-if="addErrorDesc!=''" ><i class="iconfont icon-jian-tianchong"></i>{{addErrorDesc}}</p> -->
              <p class="clf"><span class="fl"><span class='red-text'>*</span>用户名：</span><input class="fl user" v-model="userData.user_name" name="user" type="text" placeholder="请输入编号，必填">
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>密码：</span>
                <input class="fl psw" name="psw" type="text" v-model="userData.password" placeholder="请输入6-8位数字密码，必填" >
                <span class="pswremind remind">请输入正确信息</span>
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>确认密码：</span>
                <input class="fl ppsw" name="ppsw" type="text" v-model="userData.password2" placeholder="请输入6-8位数字密码，必填" >
                <span class="ppswremind remind">请输入正确信息</span>
              </p>
              <p class="clf"><span class="fl"><span class='red-text'>*</span>姓名：</span><input v-model="userData.full_name" class="fl" type="text" placeholder="请输入姓名，必填">
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>电话：</span>
                <input class="fl tel" type="text" name="tel" v-model="userData.tel"   placeholder="请输入电话号码，必填">
                <span class="telremind remind">请输入正确信息</span>
              </p>
              <p class="clf upload"><span class="fl">头像：</span>
              
              <el-upload
                class="up fl"
                action="http://localhost:8080/server_file/file/fileUpload?folder=user"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="userData.photo" :src="userData.photo" class="up fl">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              
              <span class="fl r-text">只能上传jpg/png文件</span>
              </p>
              <p class="bz clf"><span class="fl">备注：</span><input class="fl" type="text"  v-model="userData.remark" placeholder="请输入备注" id="inp">
              </p>
            </div>
            <div class="button clf">
              <a class="acknowledgement fr" v-on:click="editUser">确定</a>
              <a class="qx fr" v-on:click="addUserWindow = false">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="delete_prompt" v-bind:style="{display:delUserWindow?'block':'none'}">
      <div class="depwd">
        <div class="text">你是否确认删除选中的记录</div>
        <div class="button clf">
          <a class="qr fr" v-on:click="delUser">确定</a>
          <a class="qx fr" v-on:click="delUserWindow = false">取消</a>
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

export default {
  data() {
    return {
      /**是否显示搜索输入框 */
      searchDivShow: true,
      /**搜索参数 */
      searchParam: "",
      /**添加用户的弹窗 */
      addUserWindow: false,
      /**添加用户的错误提醒 */
      addErrorDesc: "",
      /**删除用户的弹窗 */
      selectedUsers:[],
      /**新增用户的数据 */
      userData: {
        user_name: null,
        full_name: null,
        password: null,
        password2:null,
        remark: null,
        status: 1,
        user_type: null,
        photo: null,
        relativepath:null,
        dept_id: null,
        tel: null,
        project_id: null
      },
      /**用户列表的数据 */
      users: {
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
    handleAvatarSuccess(res, file) {
      this.userData.photo = URL.createObjectURL(file.raw);
      this.userData.relativepath = res.relativepath;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    selectedAll(){
      if(this.selectedUsers.length){
        this.selectedUsers = [];
      }
      else this.selectedUsers = this.users.dataItems.map((o,i)=>i);
    },

    showEditUser(id){
      this.userData = this.users.dataItems[id] || {};
      this.addUserWindow = true;
    },

    resetPassword(id, name){
      this.$confirm(`确定要重置[${name}]的密码吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => this.$api.operator.resetpwd(new RequestParams().addAttribute("id", id)))
        .then(response=>{
          this.$message.success("重置成功");
        })
        .catch(({message}) => this.$message.error(message))
        .catch(() => {
          this.$message.info("已取消重置");
        });
    },
    
    editUser(){
      this.$api.operator.editor(new RequestParams()
      .addAttributes(this.userData)
      .addAttribute("photo", this.userData.relativepath)
      .addAttribute("status", 1)
      .addAttribute("user_type", User.info.user_type)
      .addAttribute("project_id", this.userData.project_id || User.info.project_id)
      .addAttribute("dept_id", "0"))
      .then(response=>{
        this.$message.success(response.message)
        this.addUserWindow = false;
        this.loadUserDatas();
      })
      .catch(({message}) => this.$message.error(message))
    },

    delUser(id){
        
      let datas = id != null ? [this.users.dataItems[id]] : this.selectedUsers.map(o=>this.users.dataItems[o]);
      if(datas.length){
        this.$confirm(`确定要删除[${datas.map(o=>o.user_name)}]吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => this.$api.operator.delete(new RequestParams().addDataItems(datas.map(o=>new RequestDataItem().addAttribute("id", o.id)))))
        .then(response=>{
          this.$message.success("删除成功");
          this.loadUserDatas();
        })
        .catch(({message}) => this.$message.error(message))
        .catch(() => {
          this.$message.info("已取消删除");
        });
      }
      else this.$message.info("请选择要删除的用户");
    },
    /**加载用户列表数据 */
    loadUserDatas(pageNum = 1, params = {}) {
      this.$api.operator
        .getlist(new RequestParams()
        .addAttributes(params)
        .addAttribute("page_index", pageNum))
      .then(response => {
        this.users.attributes = response.attributes;
        this.users.dataItems = response.dataItems.map(o => o.attributes);
      })
      .catch(response => this.$message.error(response.message));
    }
  },
  mounted() {
    this.loadUserDatas(1, {});
  }
};
</script>

<style scoped>
@import "../../assets/css/UserManagement.css";
@import "http://jqueryui.com/resources/demos/style.css";
</style>
