<template>
  <div class="left_column">
    <ul id="sideMenuUl" ref="sideMenuUl" v-if="userInfo.user_type == 3" >
      <li class='' >
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
          <router-link to="/systemConfig">系统配置</router-link>
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
    <ul id="sideMenuUl" ref="sideMenuUl" v-else>
      <li :class="{current:currentLi==index}" @click="currentLi = index" v-for="(menus, index) in resourceMenus" :key="index" v-if="menus.isshow">
        <div class="title">{{menus.resource_name}}</div>
        <div class="menu">
          <router-link v-for="(menu, index) in menus.children" :key="index" :to="menu.resource_url" v-if="menu.isshow">{{menu.resource_name}}</router-link>
        </div>
      </li>
    </ul>
    <a href="javascript:" class="toggleBtn" @click="simplifyToggle"></a>
  </div>
</template>

<script>
import { ResourceMenu, User } from "../assets/js/entity";
export default {
  data() {
    return {
      currentLi:false,
      currentMenu:0,
      resourceData:{
          id:null,
          pid:null,
          /**资源编码 */
          resource_code:null,
          /**资源名称 */
          resource_name:null,
          /**资源类型 */
          resource_type:null,
          /**资源地址 */
          resource_url:null,
          /**层级 */
          layer:null,
          /**是否显示 */
          isshow:1,
          /**资源图标 */
          resource_icon:null,
          relativepath:null,
          /**排序 */
          sorting:0,
          // 备注
          remark:null
      },
      resourceMenus:[],
      userInfo:User.info
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

    new ResourceMenu(this.$api).ins().then(resourceMenus => this.resourceMenus = resourceMenus);
    if(this.userInfo.user_type == 3){
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
  }
};

// 基础资料:/
// 资源管理:/resourceManage
// 角色管理:/roleManage
// 部门管理:/departmentManage
// 用户管理:/userManage
// 数据字典:/dataDict
// 项目管理:/projectManage
// 授权管理:/authorizeManage
// 操作日志:/handleLog
// 系统配置:/systemConfig
// 业务中心:/</div>
// 房屋管理:/houseManage
// 车辆授权:/carAccredit
// 月卡续费:/monthCard
// 车场区域:/parkArea
// 设备管理:/equipManage
// 监控中心:/</div>
// 设备监控:/equipMonitor
</script>

<style scoped>
</style>

