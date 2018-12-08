<template>
  <div class="clf top_column">
    <div class="fl">
      <h6>管理系统</h6></div>
    <div class="fr">
      <a href="javascript:" @click="clickUserInfo"  ><span>{{user_name}}</span> 欢迎您！</a>
      <a href="javascript:" @click="refresh">刷新页面</a>
      <a href="javascript:" @click="outLogin">安全退出</a>
    </div>
  </div>
</template>

<script>
import { User,CentralInterface} from "../assets/js/entity";
  export default {
    data () {
      return {
        User:User,
        user_name:User.info.user_name || ""
      }
    },
  methods: {
    refresh () {
      location.reload()
    },
    outLogin () {
      User.empty()
      this.$router.push('/login')
    },
    clickUserInfo () {
      this.$emit('clickUserInfo')
    }
  },
  mounted () {
    CentralInterface.$on("refreshUser", v =>{
      console.log("refreshUser", v)
      this.user_name = User.info.user_name
    })
  }
}
</script>

<style scoped>

</style>
