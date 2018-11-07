<template>
  <div class="content clf">
    <div class="search ">
      <div class="add" >
        <button class="add-department blu-button" v-on:click="addUserWindow=true">+新增</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="condition">
          <span class="conditions-text">搜索条件：</span>
          <div class="custom-input">
            <input type="text" placeholder="请输入用户名或号码" v-model="searchParam">
            <input type="submit" value="" v-on:click="searchParam&&loadUserDatas(1, {key:searchParam})">
          </div>
        </div>
      </div>
      <div class="clf bottom">
        <div class="fl">
          <button class="plechoose fl">请选择 <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl">批量删除</button>
          <div>共搜索到 <span>{{users.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button" v-on:click="searchParam&&loadUserDatas(1, {key:searchParam})">搜索</button>
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
      <div class="selected">已选 <span>{{users.dataItems.filter(o=>o.selected).length}}</span> 项数据</div>
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
              <td><input type="checkbox" v-model="user.selected"></td>
              <td><span><img v-bind:src="user.photo" alt=""></span></td>
              <td>{{user.user_name}}</td>
              <td>{{user.full_name}}</td>
              <td>{{user.tel}}</td>
              <td>{{user.create_time}}</td>
              <td>{{user.update_time}}</td>
              <td><span v-bind:class="{normal:user.status}">正常</span></td>
              <td>
                <a href="javascript:" class="edit">编辑</a>
                <a href="javascript:" class="delete" v-on:click="(delUserWindow=true,delUserindex=index)">删除</a>
                <a href="javascript:">重置密码</a>
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
              <p class="red" v-if="addErrorDesc!=''" ><i class="iconfont icon-jian-tianchong"></i>{{addErrorDesc}}</p>
              <p class="clf"><span class="fl"><span class='red-text'>*</span>用户名：</span><input v-bind:style="{'border-color': addUserData.user_name.warm?'#ff0000':'#000000'}" class="fl user" v-model="addUserData.user_name.value" name="user" type="text" placeholder="请输入编号，必填">
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>密码：</span>
                <input class="fl psw" name="psw" type="text" v-model="addUserData.password.value" placeholder="请输入6-8位数字密码，必填"  v-bind:style="{'border-color': addUserData.password.warm?'#ff0000':'#000000'}">
                <span class="pswremind remind">请输入正确信息</span>
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>确认密码：</span>
                <input class="fl ppsw" name="ppsw" type="text" v-model="addUserData.password2.value" placeholder="请输入6-8位数字密码，必填"   v-bind:style="{'border-color': addUserData.password2.warm?'#ff0000':'#000000'}">
                <span class="ppswremind remind">请输入正确信息</span>
              </p>
              <p class="clf"><span class="fl"><span class='red-text'>*</span>姓名：</span><input   v-bind:style="{'border-color': addUserData.full_name.warm?'#ff0000':'#000000'}" v-model="addUserData.full_name.value" class="fl" type="text" placeholder="请输入姓名，必填">
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>电话：</span>
                <input class="fl tel" type="text" name="tel" v-model="addUserData.tel.value"   v-bind:style="{'border-color': addUserData.tel.warm?'#ff0000':'#000000'}"  placeholder="请输入电话号码，必填">
                <span class="telremind remind">请输入正确信息</span>
              </p>
              <p class="clf upload"><span class="fl">头像：</span>

              <el-upload
                class="up fl"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="addUserData.photo.value" :src="addUserData.photo.value" class="up fl">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

              <span class="fl r-text">只能上传jpg/png文件</span>
              </p>
              <p class="bz clf"><span class="fl">备注：</span><input class="fl" type="text"  v-bind:style="{'border-color': addUserData.remark.warm?'#ff0000':'#000000'}"  v-model="addUserData.remark.value" placeholder="请输入备注" id="inp">
              </p>
            </div>
            <div class="button clf">
              <a class="acknowledgement fr" v-on:click="addUser">确定</a>
              <a class="qx fr" v-on:click="addUserWindow = false">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="delete_prompt" v-bind:style="{display:delUserWindow?'block':'none'}">
      <div class="depwd">
        <div class="text">你是否确认删除选中的记录</div>
        <div class="button clf">
          <a class="qr fr" v-on:click="delUser">确定</a>
          <a class="qx fr" v-on:click="delUserWindow = false">取消</a>
        </div>
      </div>
    </div>
    <!--弹窗-->
  </div>
</template>

<script>
import { RequestParams } from "../../assets/js/entity";
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
      delUserWindow: false,
      delUserindex:-1,
      /**新增用户的数据 */
      addUserData: {
        user_name: {
          warm: false,
          check: function(v) {
            if (this.value != "") {
              v.addUserData.user_name.warm = false;
              return true;
            }
            v.addUserData.user_name.warm = true;
            v.addErrorDesc = "用户名不能为空";
            return 0;
          },
          value: ""
        },
        full_name: {
          warm: false,
          check: function(v) {
            if (this.value != "") {
              v.addUserData.full_name.warm = false;
              return true;
            }
            v.addUserData.full_name.warm = true;
            v.addErrorDesc = "姓名不能为空";
            return 0;
          },
          value: ""
        },
        password: {
          warm: false,
          check: function(v) {
            if (this.value != "") {
              v.addUserData.password.warm = false;
              return true;
            }
            v.addUserData.password.warm = true;
            v.addErrorDesc = "密码不能为空";
            return 0;
          },
          value: ""
        },
        password2: {
          warm: false,
          check: function(v) {
            if (v.addUserData.password.value == v.addUserData.password2.value) {
              v.addUserData.password2.warm = false;
              return true;
            }
            v.addUserData.password2.warm = true;
            v.addErrorDesc = "密码不能为空";
            return 0;
          },
          value: ""
        },
        remark: {
          warm: false,
          check: function(v) {
            return true;
          },
          value: ""
        },
        status: {
          warm: false,
          check: function(v) {
            return true;
          },
          value: 1
        },
        user_type: {
          warm: false,
          check: function(v) {
            console.log(this.value)
            return  [1, 2, 3,4][this.value+1];
          },
          value: 0
        },
        photo: {
          warm: false,
          check: function(v) {
            return true;
          },
          value: ""
        },
        dept_id: {
          warm: false,
          check: function(v) {
            return true;
          },
          value: ""
        },
        tel: {
          warm: false,
          check: function(v) {
            return true;
          },
          value: ""
        },
        project_id: {
          warm: false,
          check: function(v) {
            return true;
          },
          value: ""
        }
      },
      /**用户列表的数据 */
      users: {
        attributes: {
          page_index: 1, //当前页码
          page_size: 2, //当前页数
          tatal: 10, //总条目数
          total_pages: 10 //条页数
        },
        dataItems: [
          {
            password: "bc32a292d1ca88a7147725d40602d18f",
            update_time: "2018-10-10 12:09:20",
            full_name: "东海花园2",
            user_type: 1,
            create_time: "2018-10-10 12:09:20",
            project_id: "8ea490a81b9944b1b136de598748e4d6",
            user_name: "DONGHAI2",
            tel: "18900921182",
            photo: "",
            id: "149fcc838e1d4c669d2033dc03addc12",
            status: 0,
            selected: false
          }
        ]
      }
    };
  },
  components: {
    /**分页组件 */
    Pagination
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.addUserData.photo.value = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    delUser(){
      let delid = this.users.dataItems[this.delUserindex].id;
      this.delUserWindow = false;
      this.$api.operator.delete(new RequestParams({
        attributes:{
          id:delid
        }
      })).then(response=>{

        console.log("成功", response)
        this.users.dataItems.splice(this.delUserindex, 1);
        console.log(this.users)
        this.users = this.users;

      }).catch(response => console.log("失败", response));
    },
    /**添加用户 */
    addUser() {
      this.addErrorDesc = "";
      let requestParams = new RequestParams();
      for (let key in this.addUserData) {
        let u = this.addUserData[key];
        if (!u.check(this)) {
          console.log(key, u)
          return false;
        }
        requestParams.addAttribute(key, u.value);
      }

      this.$api.operator.editor(requestParams).then(response=>{
        console.log(response)

      }).catch(response => console.log(response));
    },
    /**加载用户列表数据 */
    loadUserDatas(pageNum, params = {}) {
      this.$api.operator
        .getlist({
            attributes: $.extend({
                page_index: pageNum //当前页码
            },params)
        })
        .then(response => {
          this.users.attributes = response.attributes;
          this.users.dataItems = response.dataItems.map(o => o.attributes);
        })
        .catch(response => console.log(response));
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
