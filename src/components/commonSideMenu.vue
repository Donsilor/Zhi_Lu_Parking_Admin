<template>
  <div class="left_column">
    <ul id="sideMenuUl" ref="sideMenuUl">
      <li class=''>
        <div class="title">基础资料</div>
        <div class="menu">
          <router-link to="/resourceManage">资源管理</router-link>
          <router-link to="/roleManage">角色管理</router-link>
          <router-link to="/departmentManage">部门管理</router-link>
          <router-link to="/userManage">用户管理</router-link>
          <router-link to="/dataDict">数据字典</router-link>
          <router-link to="/projectManage">项目管理</router-link>
          <router-link to="/authorizeManage">授权管理</router-link>
          <router-link to="/handleLog">操作日志</router-link>
        </div>
      </li>
      <li>
        <div class="title">业务中心</div>
        <div class="menu">
          <router-link to="/houseManage">房屋管理</router-link>
          <router-link to="/carAccredit">车辆授权</router-link>
          <router-link to="/monthCard">月卡续费</router-link>
          <router-link to="/parkArea">车场区域</router-link>
          <router-link to="/equipManage">设备管理</router-link>
        </div>
      </li>
      <li>
        <div class="title">监控中心</div>
        <div class="menu">
          <router-link to="/equipMonitor">设备监控</router-link>
        </div>
      </li>
      <li>
        <div class="title">报表中心</div>
        <div class="menu">
          <router-link to="/statisticsTable">固定车辆信息统计表</router-link>
        </div>
      </li>
    </ul>
    <a href="javascript:" class="toggleBtn" @click="simplifyToggle"></a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentMenu:0
    };
  },
  methods: {
    simplifyToggle() {
      let $sideMenu = $(".left_column");
      $sideMenu.toggleClass("simplify");
    }
  },
  mounted() {
    this.currentMenu = localStorage.getItem("currentMenu")
      ? localStorage.getItem("currentMenu")
      : 0;

    this.currentMenu
      ? $(".router-link-active")
          .parents("li")
          .addClass("current")
      : $(this.$refs.sideMenuUl.children[0]).addClass("current");

    function initSideMenuTab(id) {
      let ul = document.getElementById(id);
      let lis = ul.children;
      for (let i = 0; i < lis.length; i++) {
        lis[i].onclick = function() {
          for (let i = 0; i < lis.length; i++) {
            lis[i].className = "";
          }
          this.className = "current";
          localStorage.setItem('currentMenu', i)
        };
      }
    }

    initSideMenuTab("sideMenuUl");
  }
};
</script>

<style scoped>
</style>
