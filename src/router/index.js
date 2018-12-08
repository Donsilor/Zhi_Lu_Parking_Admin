import Vue from 'vue';
import Router from 'vue-router';

import login from '../template/login';

import admin from '../template/admin';

import home from '../template/home';

import departmentManage from '../template/baseData/departmentManage';
import handleLog from '../template/baseData/handleLog';
import dataDict from '../template/baseData/dataDict';
import authorizeManage from '../template/baseData/authorizeManage';
import userManage from '../template/baseData/userManage';
import roleManage from '../template/baseData/roleManage';
import resourceManage from '../template/baseData/resourceManage';
import projectManage from '../template/baseData/projectManage';
import systemConfig from '../template/baseData/systemConfig';

import parkArea from '../template/businessCenter/parkArea';
import carAccredit from '../template/businessCenter/carAccredit';
import houseManage from '../template/businessCenter/houseManage';
import equipManage from '../template/businessCenter/equipManage';
import monthCard from '../template/businessCenter/monthCard';

import equipMonitor from '../template/monitorCenter/equipMonitor';

import statisticsTable from '../template/reportCenter/statisticsTable';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      component: login,
      name: '登录',
      meta: {title: 'admin登录界面', requireAuth:false}
    },
    {
      path: '/',
      component: admin,
      name: '停车场后台管理系统',
      redirect: {path: "/home"},
      meta: {title: '停车场后台管理系统', requireAuth:true},
      children: [
        {path: '/home', name:"home", component: home, meta: {title: '停车场后台管理系统', requireAuth:true}},
        {path: '/departmentManage', name:"departmentManage", component: departmentManage, meta: {title: '基础资料 - 部门管理', requireAuth:true}},
        {path: '/handleLog', name:"handleLog", component: handleLog, meta: {title: '基础资料 - 操作日志', requireAuth:true}},
        {path: '/dataDict', name:"dataDict", component: dataDict, meta: {title: '基础资料 - 数据字典', requireAuth:true}},
        {path: '/authorizeManage', name:"authorizeManage", component: authorizeManage, meta: {title: '基础资料 - 授权管理', requireAuth:true}},
        {path: '/userManage', name:"userManage", component: userManage, meta: {title: '基础资料 - 用户管理', requireAuth:true}},
        {path: '/roleManage', name:"roleManage", component: roleManage, meta: {title: '基础资料 - 角色管理', requireAuth:true}},
        {path: '/resourceManage', name:"resourceManage", component: resourceManage, meta: {title: '基础资料 - 资源管理', requireAuth:true}},
        {path: '/projectManage', name:"projectManage", component: projectManage, meta: {title: '基础资料 - 项目管理', requireAuth:true}},
        {path: '/systemConfig', name:"systemConfig", component: systemConfig, meta: {title: '基础资料 - 系统配置', requireAuth:true}},
        {path: '/parkArea', name:"parkArea", component: parkArea, meta: {title: '业务中心 - 车场区域', requireAuth:true}},
        {path: '/carAccredit', name:"carAccredit", component: carAccredit, meta: {title: '业务中心 - 车辆授权', requireAuth:true}},
        {path: '/houseManage', name:"houseManage", component: houseManage, meta: {title: '业务中心 - 房屋管理', requireAuth:true}},
        {path: '/equipManage', name:"equipManage", component: equipManage, meta: {title: '业务中心 - 设备管理', requireAuth:true}},
        {path: '/monthCard', name:"monthCard", component: monthCard, meta: {title: '业务中心 - 月卡续费', requireAuth:true}},
        {path: '/equipMonitor', name:"equipMonitor", component: equipMonitor, meta: {title: '监控中心 - 设备监控', requireAuth:true}},
        {path: '/statisticsTable', name:"statisticsTable", component: statisticsTable, meta: {title: '报表中心 - 固定车辆信息统计表', requireAuth:true}}
      ]
    },
  ]
});
