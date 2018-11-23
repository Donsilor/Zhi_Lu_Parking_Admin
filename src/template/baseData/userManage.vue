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
              <td><span><img v-bind:src="user.photo" alt=""></span></td>
              <td><div :title="user.user_name">{{user.user_name}}</div></td>
              <td><div :title="user.full_name">{{user.full_name}}</div></td>
              <td><div :title="user.tel">{{user.tel}}</div></td>
              <td><div :title="user.create_time">{{user.create_time}}</div></td>
              <td><div :title="user.update_time">{{user.update_time}}</div></td>
              <td><span v-bind:class="{normal:user.status}">正常</span></td>
              <td>
                <a href="javascript:" class="edit" @click="showEditUser(index)">编辑</a>
                <a href="javascript:" class="delete" v-on:click="delUser(index)">删除</a>
                <a href="javascript:" @click="resetPassword(user.id, user.user_name)">重置密码</a>
                <a href="javascript:" @click="userData = user,ifAssignRoles = true">角色</a>
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
                action="http://ceibs.54jj.cn/ZLParkingAdmin/server_file/file/fileUpload?folder=user"
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
              @node-click="data=>selectedRoleData=data">
            </el-tree>
            <div class="button clf">
              <a class="qx" @click="ifAssignRoles = false">取消</a>
              <a class="qr" @click="selectedRole()">确定</a>
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
import {array2Descendants, array2Object,RegExpCheck} from "../../assets/js/common";
import {  User ,RequestParams, RequestDataItem } from "../../assets/js/entity";
import Pagination from "../Pagination";

export default {
  data() {
    return {
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
      depts:[]
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
      
      let adopt = null;

      if(String(this.userData.dept_id).trim() == "") adopt = "请选择部门";
      if(String(this.userData.user_name).trim() == "") adopt = "请填写用户名";
      if(String(this.userData.full_name).trim() == "") adopt = "请填写姓名";
      if(String(this.userData.tel).trim() == "") adopt = "请填写电话号码";
      if(String(this.userData.relativepath).trim() == "") adopt = "请选择用户头像";
      if(String(this.userData.password).trim() == "") adopt = "请填写密码";
      
      if(!RegExpCheck.isTel(String(this.userData.tel).trim())) adopt = "请填写正确的客户联系电话";

      if(adopt) return this.$message.error(adopt);

      this.$api.operator.editor(new RequestParams()
      .addAttributes(this.userData)
      .addAttribute("status", 0)
      .addAttribute("photo", this.userData.relativepath)
      .addAttribute("user_type", User.info.user_type))
      .then(response=>{
        this.$message.success(response.message)
        this.addUserWindow = false;
        this.loadUserDatas();
      })
      .catch(({message}) => this.$message.error(message))
    },

    selectedRole(){
      this.$api.operator.assign(new RequestParams()
        .addDataItemAttr(0, "id", "0")
        .addDataItemAttr(0, "user_id", this.userData.id)
        .addDataItemAttr(0, "role_id", this.selectedRoleData.id)
      ).then(response=>{
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
    loadRoleDatas(pageNum = 1, params = {}) {
      this.$api.role
        .getlist(new RequestParams()
        .addAttributes(params)
        .addAttribute("page_index", pageNum)
        .addAttribute("page_size", 1000000)
        )
        .then(response => {
          this.roles.attributes = response.attributes;
          this.roles.tree = array2Descendants(response.dataItems.map((o,i) => (o.attributes.index = i,o.attributes)));
          this.roles.dataItems = response.dataItems.map(o => o.attributes);
        })
        .catch(({message}) => this.$message.error(message));
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
    },
  
    /**加载用户列表数据 */
    loadDeptsDatas(pageNum = 1, params = {}) {
      this.$api.dept
        .getlist(new RequestParams()
        .addAttributes(params)
        .addAttribute("page_index", pageNum)
        .addAttribute("page_size", 10000000))
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
