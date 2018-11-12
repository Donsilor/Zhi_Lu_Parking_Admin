<template>
  <div class="content clf">
    <div class="left clf fl">
      <div class="add">
        <a href="javascript:" @click="roleData = {}">+新增</a>
      </div>
      <div class="clf btns">
        <el-tree
          :data="roles.tree"
          :show-checkbox="true"
          :props="defaultProps"
          :node-key="'id'"
          :default-expanded-keys="[roleData.id||'']"
          default-expand-all
          @node-click="handleNodeClick"
          :expand-on-click-node="false"
          :render-content="renderRoleNodeContent">
        </el-tree>
      </div>
    </div>
    <div class="right clf fl">
      <div>
        <div class="name">父级：</div>
        <div class="role">
          <select  v-model="selectedParentIndex">
            <option  v-for="(role, index) in roles.dataItems" v-bind:key="index" :value="index">{{role.role_name}}</option>
          </select>
        </div>
      </div>
      <div>
        <div class="name">角色标识：</div>
        <div class="role"><input type="text" placeholder="请输入" v-model="roleData.role_abb"></div>
      </div>
      <div>
        <div class="name">角色名称：</div>
        <div class="role"><input type="text" placeholder="请输入" v-model="roleData.role_name"></div>
      </div>
      <div>
        <div class="name">状态：</div>
        <div class="role">
          <label for="1"><input type="radio" id="0" value="0" v-model="roleData.status" name="radio">正常</label>
          <label for="2"><input type="radio" id="1" value="1" v-model="roleData.status" name="radio">停用</label>
        </div>
      </div>
      <div>
        <div class="name">排序：</div>
        <div class="role">
          <el-slider v-model="roleData.sorting" :format-tooltip="formatTooltip"></el-slider>
        </div>
      </div>
      <div>
        <div class="name">备注：</div>
        <div class="role">
          <textarea name="" id="" cols="30" rows="10" placeholder="请输入备注" v-model="roleData.remark"></textarea>
        </div>
      </div>

      <div class="clf btn">
        <a href="javascript:" v-if="!roleData.id" @click="editRole()">新增</a>
        <a href="javascript:" v-else @click="editRole()">修改</a>
        <a href="javascript:" v-show="roleData.id" @click="ifAllotPopup = true">配置资源</a>
        <a href="javascript:" v-show="roleData.id" @click="delRole(roleData.id, roleData.role_name)">删除</a>
      </div>

    </div>
    <div class="main" v-if="ifAllotPopup">
      <div class="depwd" v-drag.cursor="'#Allot'">
        <div class="top-nav" id="Allot">
          <p class="t-text fl">分配资源</p>
          <p class="close fr" @click="ifAllotPopup = false">x</p>
        </div>
        <div class="bot">
          <div class="cet">
            <el-tree
              :data="ress.tree"
              :props="{
                children: 'children',
                label: 'resource_name'
              }"
              :ref="'tree'"
              :show-checkbox="true"
              @node-click="handleNodeClick">
            </el-tree>
            <div class="button clf">
              <a class="qr" @click="selectedRess = $refs.tree.getCheckedKeys(), assign()">确定</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RequestParams,RequestDataItem } from "../../assets/js/entity";
import { array2Descendants , User, isChildrensId} from "../../assets/js/common";
import Pagination from "../Pagination";
import moment from "moment";
export default {
  data () {
    return {
      ifAllotPopup: false,
      addRole: false,
      selectedParentIndex:-1,
      roleData:{
        id:null,
        project_id:null,
        pid:null,
        role_name:null,
        role_abb:null,
        sorting:0,
        status:0,
        remark:null,
      },
      selectedRess:[],
      ress: {
        attributes: {
          page_index: 1, //当前页码
          page_size: 2, //当前页数
          tatal: 10, //总条目数
          total_pages: 10 //条页数
        },
        tree:[],
        dataItems: []
      },
      roles:{
        attributes: {
          page_index: 1, //当前页码
          page_size: 2, //当前页数
          tatal: 10, //总条目数
          total_pages: 10 //条页数
        },
        tree:[],
        dataItems: []
      },
      defaultProps: {
        label: 'role_name',
        children: 'children'
      },
    }
  },
  methods: {

    assign(){
      if(this.selectedRess.length){
        this.$api.role
        .assign(new RequestParams()
        .addDataItems(this.selectedRess.map(o=>new RequestDataItem()
        .addAttribute("id", Math.random().toString().replace(/[.]/ig, ""))
        .addAttribute("role_id", this.roleData.id)
        .addAttribute("resource_id", o)
        )))
        .then(response=>{
          this.$message.success(response.message)
          this.ifAllotPopup = false;
        })
        .catch(({message}) => this.$message.error(message))
      }
      else this.$message.error("请选择要分配的资源")
    },

    editRole(){
      let data = this.roles.dataItems[this.selectedParentIndex];
      if(data){
        if(isChildrensId(this.roleData, data.id)){
          return this.$message.error("不能选择自己/下级元素")
        }
      }
      this.$api.role
      .editor(new RequestParams()
      .addAttributes(this.roleData)
      .addAttribute("project_id", User.info.project_id)
      .addAttribute("pid", data ? data.id : 0))
      .then(response=>{
        this.$message.success(response.message)
        this.loadRoleDatas();
      })
      .catch(({message}) => this.$message.error(message))

    },

    delRole(id, name){
      this.$confirm(`确定要删除[${name}]吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => this.$api.role.delete(new RequestParams().addDataItemAttr(0,"id", id)))
      .then(response=>{
        this.$message.success("删除成功");
        this.loadRoleDatas();
      })
      .catch(({message}) => this.$message.error(message))
      .catch(() => {
        this.$message.info("已取消删除");
      });
    },
    /**加载项目列表数据 */
    loadRoleDatas(pageNum = 1, params = {}) {
      this.$api.role
        .getlist(new RequestParams()
        .addAttributes(params)
        .addAttribute("page_index", pageNum)
        .addAttribute("page_size", 1000000)
        )
        .then(response => {
          this.roles.attributes = response.attributes;
          this.roles.tree = array2Descendants(response.dataItems.map((o,i) => (o.attributes.index = i,o.attributes)));
          this.roles.dataItems = response.dataItems.map(o => o.attributes);
        })
        .catch(({message}) => this.$message.error(message));
    },

    /**加载项目列表数据 */
    loadResDatas(pageNum = 1, params = {}) {
      this.$api.menu
        .getlist(new RequestParams()
        .addAttributes(params)
        .addAttribute("page_index", pageNum)
        .addAttribute("page_size", 1000000)
        )
        .then(response => {
          this.ress.attributes = response.attributes;
          this.ress.tree = array2Descendants(response.dataItems.map((o,i) => (o.attributes.index = i,o.attributes)));
        })
        .catch(({message}) => this.$message.error(message));
    },

    handleNodeClick (data) {
      this.roleData = data;
      this.roles.dataItems.forEach((o, i)=>{
        if(o.id == data.pid){
          this.selectedParentIndex = i;
        }
      });
    },
    formatTooltip (val) {
      return val / 100
    },

    renderRoleNodeContent (h, {node, data, store}) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span class="handleBtns">
            <a href="javascript:"><img src={require('../../assets/images/icon_10.png')} alt=""/></a>
            <a href="javascript:"><img src={require('../../assets/images/icon_11.png')} alt=""/></a>
          </span>
        </span>
      )
    }
  },
  mounted(){
    this.loadRoleDatas();
    this.loadResDatas();
  }
}
</script>

<style scoped>
@import "../../assets/css/RolemManagement.css";

</style>

