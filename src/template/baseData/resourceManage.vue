<template>
  <div class="content">
    <div class="left">
      <div class="add"><a href="javascript:" class="add_child" @click="resData = {}">+新增</a></div>
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
          <select v-model="selectedParentIndex">
            <option  v-for="(res, index) in ress.dataItems" v-bind:key="index" :value="index">{{res.resource_name}}</option>
          </select>
        </div>
      </div>
      <div>
        <div class="name">编号：</div>
        <div class="role"><input type="text" placeholder="请输入" v-model="resData.resource_code"></div>
      </div>
      <div>
        <div class="name">名称：</div>
        <div class="role"><input type="text" placeholder="请输入" v-model="resData.resource_name"></div>
      </div>
      <div>
        <div class="name">类型：</div>
        <div class="role">
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
        <div class="role">
          <label for="3"><input type="radio" value="1" v-model="resData.isshow" id="3" name="radio1">显示</label>
          <label for="4"><input type="radio" id="4"  value="0" v-model="resData.isshow" name="radio1" checked="checked">不显示</label>
        </div>
      </div>

      <div>
        <div class="name">图标：</div>
        <div class="role-icon">
          <el-upload
            class="up fl"
            action="http://localhost:8080/server_file/file/fileUpload?folder=resource_ico"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="resData.resource_icon" :src="resData.resource_icon" class="up fl">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <span class="fl r-text">只能上传jpg/png文件</span>
        </div>
      </div>
      <div>
        <div class="name">排序：</div>
        <div class="role">
          <el-slider v-model="resData.sorting" :format-tooltip="formatTooltip"></el-slider>
        </div>
      </div>
      <div>
        <div class="name">备注：</div>
        <div class="role">
          <textarea name="" id="" cols="30" rows="10" placeholder="请输入备注" v-model="resData.remark"></textarea>
        </div>
      </div>

      <div class="clf btn btn_modify">
        <a href="javascript:" @click="editRes()">修改</a>
        <a href="javascript:" @click="delRes(resData.id,resData.resource_name)">删除</a>
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
import { RequestParams,RequestDataItem, User } from "../../assets/js/entity";
import { array2Descendants , isChildrensId} from "../../assets/js/common";
import Pagination from "../Pagination";
import moment from "moment";
  export default {
    data () {
      return {
        ifAllotPopup: false,
        resData:{
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
        selectedParentIndex:-1,
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
        defaultProps: {
          children: 'children',
          label: 'resource_name'
        }
      }
    },
    methods: {

      editRes(){
        let data = this.ress.dataItems[this.selectedParentIndex];
        if(data){
          if(isChildrensId(this.resData, data.id)){
            return this.$message.error("不能选择自己/下级元素")
          }
        }
        this.$api.menu
        .editor(new RequestParams()
        .addAttributes(this.resData)
        .addAttribute("pid", data ? data.id : 0)
        .addAttribute("resource_icon", this.resData.relativepath))
        .then(response=>{
          this.$message.success(response.message)
          this.loadResDatas();
        })
        .catch(({message}) => this.$message.error(message))
      },

      delRes(id, name){
        this.$confirm(`确定要删除[${name}]吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => this.$api.menu.delete(new RequestParams().addDataItemAttr(0,"id", id)))
        .then(response=>{
          this.$message.success("删除成功");
          this.loadResDatas();
        })
        .catch(({message}) => this.$message.error(message))
        .catch(() => {
          this.$message.info("已取消删除");
        });
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
          this.ress.dataItems = response.dataItems.map(o => o.attributes);
        })
        .catch(({message}) => this.$message.error(message));
      },
      /**点击节点 */
      handleNodeClick (data) {
        this.resData = data;
        this.ress.dataItems.forEach((o, i)=>{
          if(o.id == data.pid){
            this.selectedParentIndex = i;
          }
        });
      },
      formatTooltip (val) {
        return val / 100;
      },
      handleAvatarSuccess(res, file) {
        this.resData.resource_icon = URL.createObjectURL(file.raw);
        this.resData.relativepath = res.relativepath;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    },
    mounted() {
      this.loadResDatas(1, {});
    }
  }
</script>

<style scoped>
  @import "../../assets/css/ResourceManagement.css";
</style>
