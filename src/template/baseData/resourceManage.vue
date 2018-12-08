<template>
  <div class="content">
    <div class="left">
      <div class="add"><a href="javascript:" class="add_child" @click="resData = {},selectedParentIndex =-1">+新增</a></div>
      <div class="clf btns">
        <el-tree
          :data="ress.tree"
          :props="defaultProps"
          :node-key="'id'"
          :ref="'tree'"
          :default-expanded-keys="[resData.id||'']"
          :highlight-current="true"
          @node-click="handleNodeClick">
        </el-tree>
      </div>
    </div>
    <div class="right">
      <div></div>
      <div>
        <div class="name">父级：</div>
        <div class="role">
          <!-- <select v-model="selectedParentIndex" v-bind:disabled="!!resData.id">
            <option :value="0">请选择</option>
            <option  v-for="(res, index) in ress.dataItems.filter(o=>resData.id != o.id && !childrens(resData.id ? resData.children : []).some(oo=>oo.id==o.id))" v-bind:key="index" :value="res.id">{{res.resource_name}}</option>
          </select> -->
          <select-tree :datas="ress.tree" v-model="selectedParentIndex"></select-tree>
        </div>
      </div>
      <div >
        <div class="name">编号：</div>
        <div class="role"><input type="text" v-bind:disabled="!!resData.id" placeholder="请输入" v-model="resData.resource_code"></div>
      </div>
      <div>
        <div class="name">名称：</div>
        <div class="role"><input type="text" placeholder="请输入" v-model="resData.temp_resource_name"></div>
      </div>
      <div>
        <div class="name">类型：</div>
        <div class="role noBorder">
          <label for="menu"><input type="radio" id="menu"  value="menu" v-model="resData.resource_type" name="radio">菜单</label>
          <label for="button"><input type="radio" id="button"  value="button" v-model="resData.resource_type" name="radio" checked="checked">按钮</label>
        </div>
      </div>
      <div>
        <div class="name">链接：</div>
        <div class="role"><input type="text" placeholder="请输入" v-model="resData.resource_url"></div>
      </div>
      <div>
        <div class="name">是否显示：</div>
        <div class="role noBorder">
          <label for="3"><input type="radio" value="1" v-model="resData.isshow" id="3" name="radio1">显示</label>
          <label for="4"><input type="radio" id="4"  value="0" v-model="resData.isshow" name="radio1" checked="checked">不显示</label>
        </div>
      </div>

      <div>
        <div class="name">图标：</div>
        <div class="role-icon">
          <el-upload
            class="up fl"
            action="http://119.29.152.124:8800/file/fileUpload?folder=resource_ico"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="resData.resource_icon" :src="resData.resource_icon" class="up fl">
            <i v-else class="el-icon-plus avatar-uploader-icon">{{resData.resource_icon}}</i>
          </el-upload>

          <span class="fl r-text">只能上传jpg/png文件</span>
        </div>
      </div>
      <div>
        <div class="name">排序：</div>
        <div class="role noBorder">
          <el-slider v-model="resData.sorting" :min="1"></el-slider>
        </div>
      </div>
      <div>
        <div class="name">备注：</div>
        <div class="role noBorder">
          <textarea name="" id="" cols="30" rows="10" placeholder="请输入备注" v-model="resData.remark"></textarea>
        </div>
      </div>

      <div class="clf btn btn_modify">
        <a href="javascript:" @click="editRes()"> {{resData.id ? '修改' : '新增'}}</a>
        <a href="javascript:" @click="delRes(resData.id,resData.resource_name)" v-if="resData.id">删除</a>
      </div>

      <div class="clf btn btn_determine">
        <a href="javascript:">确定</a>
        <a href="javascript:" class="cancel">取消</a>
      </div>

    </div>
    <!-- <div class="main" v-if="ifAllotPopup">
      <div class="depwd" v-drag.cursor="'#Allot'">
        <div class="top-nav" id="Allot">
          <p class="t-text fl">分配资源</p>
          <p class="close fr" @click="ifAllotPopup = false">x</p>
        </div>
        <div class="bot">
          <div class="cet">
            <el-tree
              :data="ress.dataItems"
              :props="defaultProps"
              show-checkbox
              @node-click="handleNodeClick">
            </el-tree>

            <div class="button clf">
              <a class="qr">确定</a>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { RequestParams, RequestDataItem, User } from '../../assets/js/entity'
import { array2Descendants, isChildrensId, RegExpCheck } from '../../assets/js/common'
import Pagination from '../Pagination'
import moment from 'moment'
import {GET_FILE_URL} from "../../assets/js/constants";
import SelectTree from '../../components/SelectTree'

export default {
  name:"resourceManage",
  data() {
    return {
      GET_FILE_URL:GET_FILE_URL,
      ifAllotPopup: false,
      resData: {
        id: null, //           	Y	string	ID
        pid: null, //          	Y	string	父ID
        resource_code: null, //	Y	string	资源编号
        resource_name: null, //	Y	string	资源名称
        resource_type: null, //	Y	int	功能类型(menu：菜单 button：按钮)
        resource_url: null, // 	Y	String	链接地址
        layer: null, //        	Y	Int	层级
        isshow: null, //       	Y	Int	是否显示（0：不显示1显示）
        resource_icon: null, //	Y	String	图标
        sorting: null, //      	Y	Int	排序
        remark: null, //       	N	string	备注
        relativepath: null,
        temp_resource_name: null //         String  资源名称副本
      },
      selectedParentIndex: 0,
      ress: {
        attributes: {
          page_index: 1, //当前页码
          page_size: 2, //当前页数
          tatal: 10, //总条目数
          total_pages: 10 //条页数
        },
        tree: [],
        dataItems: []
      },
      defaultProps: {
        children: "children",
        label: "resource_name"
      }
    };
  },
  components: {
    SelectTree
  },
  methods: {

    log(data){
      console.log(data)
    },

    childrens(objs, list = []){
      for(let o of objs){
        if(o.children.length){
          list = list.concat(this.childrens(o.children, list));
        }
        list.push(o)
      }
      return list;
    },

    editRes () {
      let adopt = null
      if (String(this.resData.relativepath).trim() == '') adopt = '请选择资源图标'
      // if (String(this.resData.resource_code).trim() == '') adopt = '请填写资源编码'
      // if (String(this.resData.resource_name).trim() == '') adopt = '请填写资源名称'
      if (String(this.resData.resource_type).trim() == '') adopt = '请选择资源类型'
      if (String(this.resData.resource_url).trim() == '') adopt = '请填写资源链接'
      if (String(this.resData.isshow).trim() == '') adopt = '请选择资源是否显示'
      if (String(this.resData.sorting).trim() == '') adopt = '请设置资源序号'

      if (!RegExpCheck.isNumber(String(this.resData.resource_code).trim())) adopt = '请填写正确的资源编号'
      if (!RegExpCheck.isName(String(this.resData.temp_resource_name).trim())) adopt = '请填写正确的资源名称'

      if (adopt) return this.$message.error(adopt)

      this.resData.resource_name = this.resData.temp_resource_name
      this.$api.menu
        .editor(new RequestParams()
          .addAttributes(this.resData)
          .addAttribute('pid', this.selectedParentIndex || 0)
          .addAttribute('resource_icon', this.resData.relativepath || this.resData.resource_icon)
        )
        .then(response => {
          this.$message.success(response.message)
          this.loadResDatas()
        })
        .catch(({ message }) => this.$message.error(message));
    },

    delRes(id, name) {
      this.$confirm(`确定要删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {this.$api.menu.delete(new RequestParams().addAttribute('id', id))
        .then(response => {
          this.$message.success("删除成功");
          this.loadResDatas();
          this.resData = {};
        })
        .catch(({ message }) => this.$message.error(message))})
        .catch(() => {
          this.$message.info("已取消删除");
        })
    },

    /**加载项目列表数据 */
    loadResDatas(pageNum = 1, params = {}) {
      this.$api.menu
        .getlist(
          new RequestParams()
            .addAttributes(params)
            .addAttribute("user_id", null)
            .addAttribute("page_index", pageNum)
            .addAttribute("page_size", -1)
        )
        .then(response => {
          this.ress.attributes = response.attributes;
          this.ress.tree = array2Descendants(
            response.dataItems.map(
              (o, i) => ((o.attributes.index = i), o.attributes)
            )
          );
          this.ress.dataItems = response.dataItems.map(o => o.attributes);
        })
        .catch(({ message }) => this.$message.error(message));
    },
    /**点击节点 */
    handleNodeClick (data) {
      this.resData = data
      this.resData.temp_resource_name = this.resData.resource_name
      this.selectedParentIndex = data.pid;

      if(this.resData.resource_icon && !this.resData.resource_icon.indexOf("http") >= 0){
        this.resData.resource_icon = GET_FILE_URL+this.resData.resource_icon;
      }
      this.loadResDatas();
    },
    handleAvatarSuccess(res, file) {
      this.resData.resource_icon = URL.createObjectURL(file.raw);
      this.resData.relativepath = res.attributes.relativepath;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  mounted() {
    this.loadResDatas(1, {});
  }
};
</script>

<style scoped>
@import "../../assets/css/ResourceManagement.css";
</style>
