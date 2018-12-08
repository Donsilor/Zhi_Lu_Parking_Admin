<template>
  <div class="bk">
    <div class="l_box">
      <div class="title">停车管理系统</div>
      <h6>用户登录</h6>
      <div >
        <div class="user">
          <input type="text" placeholder="用户名" v-model="user_name" >
          <span><img src="../assets/images/icon_14.png" alt=""></span>
        </div>
        <div class="password">
          <input type="password" placeholder="密 码" v-model="password" >
          <span><img src="../assets/images/icon_15.png" alt=""></span>
        </div>
        <div class="clf code">
          <input type="text" placeholder="验证码" v-model="code">
          <a href="javascript:"><img :src="image" alt="" @click="refreshValidationCode()"></a>
        </div>
        <div class="btn"><input type="submit" value="登录" @click="login"></div>
      </div>
    </div>
    <!-- <router-link to="/home">登录</router-link> -->
  </div>
</template>

<script>
import {RequestParams,User} from "../assets/js/entity";
import {HOST} from "../assets/js/constants";
import {isBlank} from "../assets/js/common";
import Vue from 'vue';
export default {
  data() {
    return {
      user_name:User.info.user_name || "",
      password:"",
      image:'',
      randomStr:"",
      code:""
    };
  },
  methods:{
    refreshValidationCode(){
      this.image = `${HOST}/oauth/code/${this.randomStr = new Date().getTime()+String(Math.random()).substr(2)}`;
    },
    login(){
      if(isBlank(this.user_name)){
        
      }
      this.$api.operator
      .login(new RequestParams()
      .addAttribute("user_name", this.user_name)
      .addAttribute("randomStr", this.randomStr)
      .addAttribute("code", this.code)
      .addAttribute("password", this.password))
      .then(({dataItems})=>{
        let token = dataItems[0].attributes.token;
        token.expires_in = new Date().getTime() + (token.expires_in*1000)
        localStorage.setItem("token", JSON.stringify(token))
        User.info = dataItems[0].attributes;
        this.$router.push(this.$route.query.redirect || "/");
      })
      .catch(data=>{
        this.refreshValidationCode()
        this.$message.error(data.message)
      });
    },
    keydownEnter({code}){
      if(code == "Enter" || code == "NumpadEnter"){
        this.login();
      }
    }
  },
  mounted(){
    window.addEventListener("keydown", this.keydownEnter, false);
    this.refreshValidationCode();
  },
  destroyed(){
    window.removeEventListener("keydown", this.keydownEnter, false)
  }
};
</script>

<style scoped>
@import "../assets/css/login.css";
</style>
