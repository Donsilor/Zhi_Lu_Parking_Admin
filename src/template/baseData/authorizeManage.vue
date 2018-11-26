<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="add-department blu-button" @click="showEditAuthorize(null)">+新增</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="condition">
          <span class="conditions-text">搜索条件：</span>
          <div class="custom-input">
            <input type="text" placeholder="请输入用户名或号码" v-model="searchParam">
            <input type="submit" value=""  @click="loadAuthorizesDatas()">
          </div>
        </div>
      </div>
      <div class="clf bottom">
        <div class="fl">
          <button class="plechoose fl"  @click="selectedAll">请选择 <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl"  @click="delAuthorize(null)">批量删除</button>
          <div>共搜索到 <span>{{authorizes.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button"  @click="loadAuthorizesDatas()">搜索</button>
          <button class="clear-button bluborder-button"  @click="searchParam = null">清除</button>
          <button class="ss transf-button" v-bind:class="{hide:!searchDivShow}" v-on:click="searchDivShow=!searchDivShow">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{searchDivShow ? "收起搜索" : "展开搜索"}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="selected" v-show="selectedAthorizes.length">已选 <span>{{selectedAthorizes.length}}</span> 项数据</div>
      <div class="tab">
        <table class="usermanagement-table">
          <tr>
            <th></th>
            <th>授权名称</th>
            <th>客户</th>
            <th>电话</th>
            <th>地址</th>
            <th>创建时间</th>
            <th>更新时间</th>
            <th>操作员</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
          <tr v-for="(authorize, index) in authorizes.dataItems" v-bind:key="index">
            <td><input type="checkbox" :value="index" v-model="selectedAthorizes"></td>
            <td><div :title="authorize.oauth_name">{{authorize.oauth_name}}</div></td>
            <td><div :title="authorize.client_name">{{authorize.client_name}}</div></td>
            <td><div :title="authorize.tel">{{authorize.tel}}</div></td>
            <td><div :title="authorize.addr">{{authorize.addr}}</div></td>
            <td><div :title="authorize.create_time">{{authorize.create_time}}</div></td>
            <td><div :title="authorize.update_time">{{authorize.update_time}}</div></td>
            <td><div :title="authorize.tel">{{authorize.tel}}</div></td>
            <td><span v-bind:class="{normal:authorize.status}">正常</span></td>
            <td>
              <a href="javascript:" class="edit"  @click="showEditAuthorize(index)">编辑</a>
              <a href="javascript:" class="delete"  @click="delAuthorize(index)">删除</a>
              <a href="javascript:" @click="resetPassword(authorize.id, authorize.client_name)">重置密码</a>
            </td>
          </tr>
        </table>
      </div>
      <Pagination
        :previousPage="loadAuthorizesDatas" 
        :nextPage="loadAuthorizesDatas"
        :skipPage="loadAuthorizesDatas"
        :pageIndex="authorizes.attributes.page_index"
        :totalPages="authorizes.attributes.total_pages"
        :pageSize="authorizes.attributes.page_size"
        :tatal="authorizes.attributes.tatal"
      ></Pagination>
    </div>
    <!--弹窗-->
    <div class="main" v-if="ifAuthorize">
      <div class="depwd" v-drag.cursor="'#authorize'">
        <div class="top-nav" id="authorize">
          <p class="t-text fl">授权信息</p>
          <p class="close fr" @click="ifAuthorize = false">x</p>
        </div>
        <div class="bot">
          <div class="cet">
            <div class="clf">
              <!-- <p class="red"><i class="iconfont icon-jian-tianchong"></i>错误提示的文案</p> -->
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>授权名称：</span>
                <input v-model="authorizeData.temp_oauth_name" class="fl user" name="user" type="text"
                       placeholder="请输入编号，必填">
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>授权KEY：</span>
                <input class="fl psw" v-model="authorizeData.oauth_key" name="psw" type="password" placeholder="请输入6-8位数字密码，必填">
                <span class="pswremind remind">请输入正确信息</span>
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>确认KEY：</span>
                <input class="fl ppsw" v-model="authorizeData.oauth_key2" name="ppsw" type="password" placeholder="请输入6-8位数字密码，必填">
                <span class="ppswremind remind">请输入正确信息</span>
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>授权时间：</span>
                <el-date-picker
                  class="fl"
                  v-model="authorizeTimes"
                  type="daterange"
                  align="right"
                  unlink-panels
                  value-format="yyyy-MM-DD HH:mm:ss"
                  range-separator="至"
                  start-placeholder="授权起始日期"
                  end-placeholder="授权结束日期"
                >
                </el-date-picker>
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>客户名称：</span>
                <input class="fl" v-model="authorizeData.temp_client_name" type="text" placeholder="请输入姓名，必填">
              </p>
              <p class="clf">
                <span class="fl"><span class='red-text'>*</span>电话：</span>
                <input class="fl tel" type="text" v-model="authorizeData.temp_tel" name="tel" placeholder="请输入电话号码，必填">
                <span class="telremind remind">请输入正确信息</span>
              </p>
              <p class="clf upload">
                <span class="fl">地址：</span>
                <input class="fl" v-model="authorizeData.temp_addr" type="text" placeholder="请输入备注">
              </p>
              <p class="bz clf">
                <span class="fl">备注：</span>
                <input class="fl" v-model="authorizeData.remark" type="text" placeholder="请输入备注" id="inp">
              </p>
            </div>
            <div class="button clf">
              <a class="acknowledgement fr" @click="editAuthorize">确定</a>
              <a class="qx fr" @click="ifAuthorize = false">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="delete_prompt" v-if="ifDel">
      <div class="depwd">
        <div class="text">你是否确认删除选中的记录</div>
        <div class="button clf">
          <a href="javascript:" class="qr fr">确定</a>
          <a href="javascript:" class="qx fr" @click="ifDel = false">取消</a>
        </div>
      </div>
    </div>
    <div class="resetPW" v-if="resetPW">
      <div class="depwd">
        <div class="text">密码已重新设置为888888</div>
        <div class="button clf">
          <a class="qr fr">确定</a>
          <a class="qx fr" @click="resetPW = false">取消</a>
        </div>
      </div>
    </div> -->
    <!--弹窗-->
  </div>
</template>

<script>

import { RequestParams, RequestDataItem,User } from "../../assets/js/entity";
import {RegExpCheck} from "../../assets/js/common";
import Pagination from "../Pagination";
import moment from "moment";
  export default {
    data () {
      return {
        searchDivShow: true,
        ifAuthorize: false,
        ifDel: false,
        searchParam:"",
        selectedAthorizes:[],
        authorizeTimes:[],
        authorizeData:{
          id:null,//         	Y	String	ID
          oauth_name:null,// 	Y	String	授权名称
          oauth_key:null,//  	Y	String	授权KEY
          oauth_key2:null,
          client_name:null,//	Y	String	客户
          tel:null,//        	Y	String	电话
          addr:null,//       	N	String	地址
          begin_time:null,// 	Y	String	有效期开始时间(格式：yyyy-MM-dd HH:mm:ss)
          end_time:null,//   	Y	String	有效期结束时间(格式：yyyy-MM-dd HH:mm:ss)
          remark:null,//     	N	String	备注
          temp_oauth_name:null,// 	Y	String	授权名称
          temp_client_name:null,//	Y	String	客户
          temp_tel:null,//        	Y	String	电话
          temp_addr:null //       	N	String	地址
        },
        authorizes:{
          attributes: {
            page_index: 1, //当前页码
            page_size: 2, //当前页数
            tatal: 10, //总条目数
            total_pages: 10 //条页数
          },
          dataItems: []
        },

      };
    },
    components: {
      /**分页组件 */
      Pagination
    },
    methods: {

      selectedAll(){
        if(this.selectedAthorizes.length){
          this.selectedAthorizes = [];
        }
        else this.selectedAthorizes = this.authorizes.dataItems.map((o,i)=>i);
      },

      showEditAuthorize(id){
        this.authorizeData = this.authorizes.dataItems[id] || {};
        this.ifAuthorize = true;

        this.authorizeData.temp_oauth_name = this.authorizeData.oauth_name
        this.authorizeData.temp_client_name = this.authorizeData.client_name
        this.authorizeData.temp_tel = this.authorizeData.tel
        this.authorizeData.temp_addr = this.authorizeData.addr

        this.$api.standard
          .getlist(
            new RequestParams()
              .addAttributes(this.searchStandard)
              .addAttribute("key", "")
              .addAttribute("page_size", 1000000)
          )
          .then(response => {
            this.standards.attributes = response.attributes;
            this.standards.dataItems = response.dataItems.map(o => o.attributes);
            this.standards.tree = [];
            this.chargeStandardOptions = [];
            new DataDictionary(this.$api).ins().then(datas => {
              this.searchStandards = datas;
              if(!datas.standard_type){
                this.ifConfig = false;
                return this.$message.error("请先前往配置收费标准数据字典");
              }
              let tempTree = {};
              for(let item of this.standards.dataItems){
                item.iid = item.id;
                item.depict = JSON.parse(item.standard_content);
                item.remark = datas.standard_type[item.standard_type].remark;
                item.base = {};
                if(!tempTree[item.car_type]){
                  tempTree[item.car_type] = {
                    remark:datas.car_type[item.car_type].remark,
                    children:[]
                  };
                  this.standards.tree.push(tempTree[item.car_type]);
                }
                tempTree[item.car_type].children.push(item);
              }

              for(let name in datas.car_type){
                datas.car_type[name].children = datas.car_type[name].depict.split(",").map(o=>{
                  if(typeof(datas.standard_type[o].depict) == "string"){
                    datas.standard_type[o].depict = JSON.parse(datas.standard_type[o].depict);
                    datas.standard_type[o].base = {};
                  }
                  return datas.standard_type[o]
                })
                datas.car_type[name].getChildrenKey = function(code){
                  return this.children.filter(o=>o.dic_code==code)[0];
                }
                this.chargeStandardOptions.push(datas.car_type[name])
              }
              this.chargeStandardOptions = this.chargeStandardOptions;
            })
          })
          .catch(response => this.$message.error(response.message));
      
      },
      
      editAuthorize(){

        this.authorizeData.begin_time = this.authorizeTimes[0];
        this.authorizeData.end_time = this.authorizeTimes[1];

        let adopt = null;

//        if(String(this.authorizeData.oauth_name).trim() == "") adopt = "请填写授权名称";
        if(String(this.authorizeData.oauth_key).trim() == "") adopt = "请填写授权KEY";
        if(String(this.authorizeData.oauth_key2).trim() == "") adopt = "请再次填写授权KEY";
//        if(String(this.authorizeData.client_name).trim() == "") adopt = "请填写客户名称";
        if(String(this.authorizeData.begin_time).trim() == "") adopt = "请填写授权始终时间";
//        if(String(this.authorizeData.tel).trim() == "") adopt = "请填写客户联系电话";

        if(!RegExpCheck.isTel(String(this.authorizeData.temp_tel).trim())) adopt = "请填写正确的客户联系电话";
        if(!RegExpCheck.isName(String(this.authorizeData.temp_oauth_name).trim())) adopt = "请填写正确的授权名称";
        if(!RegExpCheck.isName(String(this.authorizeData.temp_client_name).trim())) adopt = "请填写正确的客户名称";

        if(adopt) return this.$message.error(adopt);

        this.authorizeData.oauth_name = this.authorizeData.temp_oauth_name
        this.authorizeData.client_name = this.authorizeData.temp_client_name
        this.authorizeData.tel = this.authorizeData.temp_tel
        this.authorizeData.addr = this.authorizeData.temp_addr

        this.$api.oauth.editor(new RequestParams()
        .addAttributes(this.authorizeData)
        )
        .then(response=>{
          this.$message.success(response.message)
          this.ifAuthorize = false;
          this.loadAuthorizesDatas();
        })
        .catch(({message}) => this.$message.error(message))
      },

      resetPassword(id, name){
        this.$confirm(`是否要重置选中记录的密码为6个8?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => this.$api.oauth.resetpwd(new RequestParams().addAttribute("id", id)))
          .then(response=>{
            this.$message.success("重置成功");
          })
          .catch(({message}) => this.$message.error(message))
          .catch(() => {
            this.$message.info("已取消重置");
          });
      },
      
      delAuthorize(id){
          
        let datas = id != null ? [this.authorizes.dataItems[id]] : this.selectedAthorizes.map(o=>this.authorizes.dataItems[o]);
        if(datas.length){
          this.$confirm(`确定要删除吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => this.$api.oauth.delete(new RequestParams().addDataItems(datas.map(o=>new RequestDataItem().addAttribute("id", o.id)))))
          .then(response=>{
            this.$message.success("删除成功");
            this.loadAuthorizesDatas();
          })
          .catch(({message}) => this.$message.error(message))
          .catch(() => {
            this.$message.info("已取消删除");
          });
        }
        else this.$message.info("请选择要删除的授权记录");
      },

      /**加载用户列表数据 */
      loadAuthorizesDatas(pageNum = 1, params = {}) {
        this.$api.oauth
          .getlist(new RequestParams()
          .addAttributes(params)
          .addAttribute("key", this.searchParam && `AND tel like '%${this.searchParam}%' OR client_name like '%${this.searchParam}%'`)
          .addAttribute("page_index", pageNum))
          .then(response => {
            this.authorizes.attributes = response.attributes;
            this.authorizes.dataItems = response.dataItems.map(o => o.attributes)
          })
          .catch(response => this.$message.error(response.message));
      }
    },
    mounted() {
      this.loadAuthorizesDatas(1, {});
    }
  };
</script>

<style scoped>
  @import "../../assets/css/authorizeManage.css";
</style>
