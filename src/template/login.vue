<template>
  <div class="bk">
    <div class="l_box">
      <div class="title">系统管理</div>
      <h6>用户登录</h6>
      <form action="">
        <div class="user">
          <input type="text" placeholder="用户名" v-model="user_name" >
          <span><img src="../assets/images/icon_14.png" alt=""></span>
        </div>
        <div class="password">
          <input type="password" placeholder="密 码" v-model="password" >
          <span><img src="../assets/images/icon_15.png" alt=""></span>
        </div>
        <div class="clf code">
          <input type="text" placeholder="验证码">
          <a href="javascript:"><img src="../assets/images/photo_2.jpg" alt=""></a>
        </div>
        <div class="btn"><input type="submit" value="登录" @click="login"></div>
      </form>
    </div>
    <router-link to="/admin/home">登录</router-link>
  </div>
</template>

<script>
import {RequestParams} from "../assets/js/entity";
import { User } from "../assets/js/common";

export default {
  data() {
    return {
      user_name:"",
      password:""
    };
  },
  methods:{
    login(){
      this.$api.operator.login(new RequestParams({
        attributes:{
          user_name:this.user_name,
          password:this.password
        }
      })).then(({dataItems})=>{
        console.log(dataItems)
        User.info = dataItems[0].attributes;
        this.$router.push(this.$route.query.redirect || "/");
      }).catch(data=>this.$message.error(data.message));
    }
  }
};
</script>

<style scoped>
@import "../assets/css/login.css";
</style>
