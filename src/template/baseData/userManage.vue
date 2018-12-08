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
            <input type="submit" value="" v-on:click="loadUserDatas()">
          </div>
        </div>
      </div>
      <div class="clf bottom">
        <div class="fl">
          <button class="plechoose fl" @click="selectedAll()">全选 <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl" @click="delUser(null)">批量删除</button>
          <div>共搜索到 <span>{{users.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button" v-on:click="loadUserDatas()">搜索</button>
          <button class="clear-button bluborder-button" v-on:click="searchParam = null">清除</button>
          <button class="ss transf-button" v-bind:class="{hide:!searchDivShow}"
                  v-on:click="searchDivShow=!searchDivShow">
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
              <td><img  :src="'http://119.29.152.124:8840/file/viewFile?relativePath='+user.photo" :title="'http://119.29.152.124:8840/file/viewFile?relativePath='+user.photo"></td>
              <td><div :title="user.user_name">{{user.user_name}}</div></td>
              <td><div :title="user.full_name">{{user.full_name}}</div></td>
              <td><div :title="user.tel">{{user.tel}}</div></td>
              <td><div :title="user.create_time">{{user.create_time}}</div></td>
              <td><div :title="user.update_time">{{user.update_time}}</div></td>
              <td><a class="button" href="javascript:" @click="userData = user,dialogUserStatus = true" v-bind:class="{normal:!user.status}">{{["正常","停用","注销"][user.status]}}</a></td>
              <td>
                <a href="javascript:" class="edit" @click="showEditUser(index)">编辑</a>
                <a href="javascript:" class="delete" v-on:click="delUser(index)">删除</a>
                <a href="javascript:" @click="resetPassword(user.id, user.user_name)">重置密码</a>
                <a href="javascript:" @click="loadRoleDatas(user.id), userData = user,ifAssignRoles = true">角色</a>
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
      <div class="depwd" v-drag.cursor="'#UserInfo'">
        <div class="top-nav" id="UserInfo">
          <p class="t-text fl">{{userData.id ? "修改用户" : "新增用户"}}</p>
          <p class="close fr" v-on:click="addUserWindow = false">x</p>
        </div>
        <div class="bot">
          <div class="cet">
            <div class="clf">
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>部门：</span>
                <el-select v-model="userData.dept_id" placeholder="请选择">
                  <el-option
                    v-for="item in this.depts"
                    :key="item.id"
                    :label="item.dept_name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </p>
              <!-- <p class="red" v-if="addErrorDesc!=''" ><i class="iconfont icon-jian-tianchong"></i>{{addErrorDesc}}</p> -->
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>用户名：</span>
                <input class="fl user" :disabled="!!userData.id" v-model="userData.temp_user_name" name="user" type="text" placeholder="请输入编号，必填">
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>密码：</span>
                <input class="fl psw" :disabled="!!userData.id" name="psw" type="password" v-model="userData.password" placeholder="请输入6-8位数字密码，必填">
                <span class="pswremind remind">请输入正确信息</span>
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>确认密码：</span>
                <input class="fl ppsw" :disabled="!!userData.id" name="ppsw" type="password" v-model="userData.password2" placeholder="请输入6-8位数字密码，必填">
                <span class="ppswremind remind">请输入正确信息</span>
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>姓名：</span>
                <input v-model="userData.temp_full_name" class="fl" type="text" placeholder="请输入姓名，必填">
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>电话：</span>
                <input class="fl tel" type="text" name="tel" v-model="userData.temp_tel" placeholder="请输入电话号码，必填">
                <span class="telremind remind">请输入正确信息</span>
              </p>
              <p class="clf upload">
                <span class="fl">头像：</span>
                <el-upload
                  class="up fl"
                  action="http://119.29.152.124:8800/file/fileUpload?folder=user"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="userData.photo" :src="userData.photo" class="up fl" alt="">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span class="fl r-text">只能上传jpg/png文件</span>
              </p>
              <p class="bz clf">
                <span class="fl">备注：</span>
                <input class="fl" type="text" v-model="userData.remark"
                                                                  placeholder="请输入备注" id="inp">
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
    <div class="assignRoles" v-if="ifAssignRoles">
      <div class="depwd" v-drag.cursor="'#AssignRoles'">
        <div class="top-nav" id="AssignRoles">
          <p class="t-text fl">分配角色</p >
          <p class="close fr" @click="ifAssignRoles = false">x</p >
        </div>
        <div class="bot">
          <div class="cet">
            <el-tree
              :data="roles.tree"
              :props="{
                children: 'children',
                label: 'role_name'
              }"
              :ref="'tree'"
              :node-key="'id'"
              @node-click="data=>selectedRoleData=data"
              @check="data=>selectedRoleData=data"
              :default-checked-keys="selectedRoles"
              show-checkbox>
            </el-tree>
            <div class="button clf">
              <a class="qx" @click="ifAssignRoles = false">取消</a>
              <a class="qr" @click="selectedRole()">确定</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="确认修改用户状态"
      :visible.sync="dialogUserStatus"
      width="20%"
      >
      <el-radio-group v-model="userData.status">
        <el-radio :label="0">正常</el-radio>
        <el-radio :label="1">停用</el-radio>
        <el-radio :label="2">注销</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button :style="{padding: '0 0'}" @click="dialogUserStatus = false">取 消</el-button>
        <el-button :style="{padding: '0 0'}" type="primary" @click="updateStatus()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {array2Descendants, array2Object,RegExpCheck} from "../../assets/js/common";
import {  User ,RequestParams, RequestDataItem } from "../../assets/js/entity";
import Pagination from "../Pagination";
import {GET_FILE_URL} from "../../assets/js/constants";

export default {
  name:"userManage",
  data() {
    return {
      GET_FILE_URL:GET_FILE_URL,
      dialogUserStatus:false,
      ifAssignRoles:false,
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
        id:null,//         	Y	String	ID
        dept_id:null,//    	Y	String	部门ID
        user_name:null,//  	Y	String	用户名
        full_name:null,//  	Y	String	姓名
        tel:null,//        	Y	String	手机号码
        photo:null,//      	N	String	照片
        relativepath:null,
        password:null,//   	Y	String	密码
        user_type:null,//  	Y	Int	账号类型((0普通账号1项目管理员2系统普通账号3系统管理员) 由系统自动生成，不能手工选择)
        status:0,//     	Y	Int	状态(0正常1停用2注销)
        remark:null,//     	N	String	备注
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
      },
      selectedRoleData:{
        id:null,//        	Y	String	ID
        pid:null,//       	Y	String	父级角色
        role_name:null,// 	Y	String	角色名称
        role_abb:null,//  	Y	String	角色标识
        sorting:null,//   	Y	Int	排序
        status:null,//    	Y	Int	状态（0：正常1：停用）
        remark:null,//    	N	String	备注
      },
      selectedRoles:[],
      roles:{
        attributes: {
          page_index: 1, //当前页码
          page_size: 2, //当前页数
          tatal: 10, //总条目数
          total_pages: 10 //条页数
        },
        tree:[],
        dataItems: []
      },
      depts: [],
      selectedDepts: [],
      showUserInfo: false
    }
  },
  components: {
    /**分页组件 */
    Pagination
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.userData.photo = URL.createObjectURL(file.raw);
      this.userData.relativepath = res.attributes.relativepath;
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
      if(this.depts.length < 0){
        return this.$confirm(`暂时没有部门，确定前往添加？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$router.push("/departmentManage");
        })
        .catch(() => {
          this.$message.info("已取消添加");
        });
      }
      this.userData = this.users.dataItems[id] || {};
      if(this.userData.photo && !this.userData.photo.indexOf("http") >= 0){
        this.userData.photo = GET_FILE_URL+this.userData.photo;
      }
      
      this.addUserWindow = true
      this.userData.temp_user_name = this.userData.user_name
      this.userData.temp_full_name = this.userData.full_name
      this.userData.temp_tel = this.userData.tel
    },

    resetPassword (id, name) {
      this.$confirm(`是否要重置选中记录的密码为6个8?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => this.$api.operator.resetpwd(new RequestParams().addAttribute('id', id)))
        .then(response => {
          this.$message.success('重置成功')
        })
        .catch(({message}) => this.$message.error(message))
        .catch(() => {
          this.$message.info("已取消重置");
        });
    },

    updateStatus(){
      this.$api.operator.updatestatus(new RequestParams()
      .addAttribute("id", this.userData.id)
      .addAttribute("status", this.userData.status))
      .then(({message}) => this.$message.success(message))
      .catch(({message}) => this.$message.error(message))
      .finally(()=>this.dialogUserStatus = false);
    },

    editUser(){

      let adopt = null;

      if (!adopt && String(this.userData.dept_id || "").trim() == null) adopt = '请选择部门'
      //      if (String(this.userData.user_name).trim() == '') adopt = '请填写用户名'
      //      if (String(this.userData.full_name).trim() == '') adopt = '请填写姓名'
      //      if (String(this.userData.tel).trim() == '') adopt = '请填写电话号码'
      if (!adopt && String(this.userData.relativepath || "").trim() == '') adopt = '请选择用户头像'
      //      if (String(this.userData.password).trim() == '') adopt = '请填写密码'

      if (!adopt && !RegExpCheck.isFullName(String(this.userData.temp_full_name || "").trim())) adopt = '请填写正确的姓名'
      if (!adopt && !RegExpCheck.isTel(String(this.userData.temp_tel || "").trim())) adopt = '请填写正确的客户联系电话'
      if(!this.userData.id){
        if (!adopt && !RegExpCheck.isUserName(String(this.userData.temp_user_name || "").trim())) adopt = '请填写正确的用户名'
        if (!adopt && !RegExpCheck.isPassword(String(this.userData.password || "").trim())) adopt = '请填写正确的密码'
        if (!adopt && RegExpCheck.isPassword(String(this.userData.password || "").trim()) &&
          this.userData.password2 !== this.userData.password || "") adopt = '请确认密码'
      }

      if (adopt) return this.$message.error(adopt)

      this.userData.user_name = this.userData.temp_user_name
      this.userData.full_name = this.userData.temp_full_name
      this.userData.tel = this.userData.temp_tel

      this.$api.operator.editor(new RequestParams()
      .addAttributes(this.userData)
      .addAttribute("status", this.userData.status || 0)
      .addAttribute("photo", this.userData.relativepath)
      .addAttribute("user_type", this.userData.user_type || 0))
      .then(response=>{
        this.$message.success(response.message)
        this.addUserWindow = false;
        this.loadUserDatas();
      })
      .catch(({message}) => this.$message.error(message))
    },

    selectedRole(){
      this.$api.operator.assign(new RequestParams().addDataItems([...this.$refs.tree.getHalfCheckedKeys() || [], ...this.$refs.tree.getCheckedKeys() || []].map(o=>new RequestDataItem()
        .addAttribute("id", "0")
        .addAttribute("user_id", this.userData.id)
        .addAttribute("role_id", o)
      )))
      .then(response=>{
        this.$message.success(response.message)
        this.ifAssignRoles = false;
      }).catch(({message}) => this.$message.error(message))
    },

    delUser(id){

      let datas = id != null ? [this.users.dataItems[id]] : this.selectedUsers.map(o=>this.users.dataItems[o]);
      if(datas.length){
        this.$confirm(`确定要删除吗?`, '提示', {
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
    /**加载项目列表数据 */
    loadRoleDatas(userid) {
      this.selectedRoles = [];
      this.$api.role
        .getlist(new RequestParams()
        .addAttribute("user_id", userid)
        .addAttribute("status", 0)
        .addAttribute("page_size", -1)
        )
        .then(response => {
          if(userid){
            this.selectedRoles = response.dataItems.map(o => o.attributes.id);
          }
          else {
            this.roles.attributes = response.attributes;
            this.roles.tree = array2Descendants(response.dataItems.map((o,i) => (o.attributes.index = i,o.attributes)));
            this.roles.dataItems = response.dataItems.map(o => o.attributes);
          }
        })
        .catch(({message}) => this.$message.error(message));
    },
    /**加载用户列表数据 */
    loadUserDatas(pageNum = 1, params = {}) {
      this.$api.operator
        .getlist(new RequestParams()
        .addAttributes(params)
        .addAttribute('key', this.searchParam && ` AND user_name like '%${this.searchParam}%' OR tel like '${this.searchParam}'`)
        .addAttribute("page_index", pageNum))
      .then(response => {
        this.users.attributes = response.attributes;
        this.users.dataItems = response.dataItems.map(o => o.attributes);
        this.selectedUsers = [];
      })
      .catch(response => this.$message.error(response.message));
    },

    /**加载用户列表数据 */
    loadDeptsDatas(pageNum = 1, params = {}) {
      this.$api.dept
        .getlist(new RequestParams()
        .addAttributes(params)
        .addAttribute("page_index", pageNum)
        .addAttribute("page_size", -1))
        .then(response => {
          this.depts = array2Object(response.dataItems.map(o => o.attributes));
        })
        .catch(response => this.$message.error(response.message));
    }
  },
  mounted() {
    this.loadUserDatas(1, {});
    this.loadRoleDatas();
    this.loadDeptsDatas();
  }
};
</script>

<style scoped>
@import "../../assets/css/UserManagement.css";
@import "http://jqueryui.com/resources/demos/style.css";
</style>
