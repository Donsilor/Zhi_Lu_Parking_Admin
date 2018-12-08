<template>
  <div class="main">
    <div class="dewp" v-drag.cursor="'#userInfo'">
      <div class="top-nav" id="userInfo">
        <p class="t-text fl">个人信息</p>
        <p class="close fr" @click="closeUserInfo"></p>
      </div>
      <div class="bot">
        <div class="cet">
          <div class="userimage"></div>
          <div class="username">
            <span>{{user.user_name}}</span>
            <span class='updata' id="userNameUpdata" @click="editUserName = true">修改</span>
          </div>
          <div class="user-inf">
            <p><span>项<span class="nbsp"></span>目：</span><span class="">东海花园</span></p>
            <p><span>部<span class="nbsp"></span>门：</span><span class="">东海花园</span></p>
            <p><span>手机号码：</span><span class="">18148957894</span></p>
          </div>
          <div class="userpsw">
            <span>密<span class="nbsp"></span>码：******</span>
            <span class="updata" id="userPswUpdata" @click="editPassword = true">修改</span>
          </div>
          <input type="button" value="确定" class="determine">
        </div>
      </div>
    </div>
    <div class="username-updata-main" v-if="editUserName">
      <div class="username-updata-dewp">
        <div class="user-name clf">
          <span class="fl">请输入用户名：</span>
          <input type="text" class="newusername fl">
        </div>
        <div class="btns clf">
          <input type="button" value="确定" class="updata-btn">
          <input type="button" value="取消" @click="editUserName = false">
        </div>
      </div>
    </div>
    <div class="userpsw-updata-main" v-if="editPassword">
      <div class="userpsw-updata-dewp">
        <div class="clf">
          <span>请输入密码：</span>
          <input type="text" class="newpsw">
        </div>
        <div class="clf">
          <span>请再次输入密码：</span>
          <input type="text" class="nnewpsw">
        </div>
        <div class="btns clf">
          <input type="button" value="确定" class="updata-btn">
          <input type="button" value="取消" @click="editPassword = false">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { RequestParams, RequestDataItem ,User} from "../assets/js/entity";
export default {
  data () {
    return {
      editUserName: false,
      editPassword: false,
      user:User.info,
      project:{}
    }
  },
  methods: {
    closeUserInfo () {this.$emit('closeUserInfo')},
    async loadDatas(){
      this.project = ((await this.$api.project.getlist(
        new RequestParams().addAttribute("key", `and id = '${User.info.project_id}'`)
      )).dataItems[0] || {}).attributes || {};
    },
  }
}
</script>

<style scoped>
@import "http://jqueryui.com/resources/demos/style.css";
@import "../assets/css/dialog.css";
</style>
