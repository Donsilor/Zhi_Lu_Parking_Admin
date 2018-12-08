<template xmlns:v-contextmenu="http://www.w3.org/1999/xhtml">
  <div id="admin">
    <commonHeader @clickUserInfo="showUserInfo = true"></commonHeader>
    <commonSideMenu></commonSideMenu>
    <div class="box">
      <div class="boxtop-nav">
        <ul class="clf" ref="tabItems">
          <li v-for="(item, index) in tabs" :key="index" @contextmenu="contextMenu($event, index)" v-contextmenu:contextmenu>
            <!--@contextmenu="showMenu(index)"-->
            <router-link :to="item.path">{{item.title}}</router-link>
            <a href="JavaScript:void(0)" class="closeBtn" @click="closeTab(index)"></a>

          </li>
        </ul>
      </div>
      <!-- 这个方法可以做页签 -->
      <keep-alive :include="tabs.map(o=>o.name).join(',')">
        <router-view></router-view>
      </keep-alive>
    </div>
    <user-info-dialog
      v-if="showUserInfo"
      @closeUserInfo="showUserInfo = false"
    ></user-info-dialog>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="closeOther">关闭其他</v-contextmenu-item>
      <v-contextmenu-item @click="closeAll">关闭全部</v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>

<script>
import commonHeader from '../components/commonHeader'
import commonSideMenu from '../components/commonSideMenu'
import userInfoDialog from '../components/userInfoDialog'
import { User,CentralInterface} from "../assets/js/entity";

export default {
  data () {
    return {
      showUserInfo: false,
      tabs:[],

      clickThisTabs: 0,
      clickThisTabsPath: 0
    }
  },
  components: {
    commonHeader,
    commonSideMenu,
    userInfoDialog
  },
  methods: {
    closeTab(index){
      let tab = this.tabs.splice(index, 1)[0];
      if(tab && this.$route.path == tab.path){
        this.$router.push(this.tabs.length?this.tabs[!index?0:index-1].path:"/");
      }
    },
    contextMenu(e, index){
      this.clickThisTabs = index
      console.log(e.target, this.clickThisTabs)
      this.clickThisTabsPath = this.tabs[this.clickThisTabs].path
      // let thisTabs = this.$route
      // console.log(thisTabs)
      // this.tabs = this.tabs.splice(index, 1)
    },
    closeOther () {
      this.tabs = this.tabs.splice(this.clickThisTabs, 1)
      // console.log(this.$route.path, this.tabs[this.clickThisTabs].path)
      this.$router.push(String(this.clickThisTabsPath))
    },
    closeAll () {
      this.tabs = []
      this.$router.push("/")
    }
  },
  mounted(){
    CentralInterface.$on("addTab", (title, name, path)=>{
      if(!this.tabs.some(o=>o.path == path)){
        this.tabs.push({title, name, path})
      }
    })
  }
}
</script>

<style>

</style>
