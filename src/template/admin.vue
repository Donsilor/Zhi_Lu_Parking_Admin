<template>
  <div id="admin">
    <commonHeader @clickUserInfo="clickUserInfo"></commonHeader>
    <commonSideMenu></commonSideMenu>
    <div class="box">
      <div class="boxtop-nav">
        <ul class="clf">
          <li><router-link to="/home">首页</router-link></li>
          <li><router-link to="/departmentManage">部门管理</router-link></li>
          <li><router-link to="/handleLog">操作日志</router-link></li>
          <li><router-link to="/dataDict">数据字典</router-link></li>
          <li><router-link to="/systemConfig">系统配置</router-link></li>
          <li><router-link to="/userManage">用户管理</router-link></li>
          <li><router-link to="/roleManage">角色管理</router-link></li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
    <user-info-dialog
      v-if="showUserInfo"
      @closeUserInfo="closeUserInfo"
    ></user-info-dialog>
  </div>
</template>

<script>
import commonHeader from '../components/commonHeader'
import commonSideMenu from '../components/commonSideMenu'
import userInfoDialog from '../components/userInfoDialog'

export default {
  data () {
    return {
      showUserInfo: false
    }
  },
  components: {
    commonHeader,
    commonSideMenu,
    userInfoDialog
  },
  methods: {
    clickUserInfo () {this.showUserInfo = true},
    closeUserInfo () {this.showUserInfo = false}
  }
}
</script>

<style>

</style>
