<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="add-department blu-button" @click="showEditDictionary(null)">+新增</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="condition">
          <span class="conditions-text">搜索条件：</span>
          <div class="custom-input">
            <input type="text" placeholder="请输入编号或者名称" v-model="searchParam">
            <input type="submit" value="" @click="loadDictionarysDatas(1,{'key':searchParam})">
          </div>
        </div>
      </div>
      <div class="clf bottom">
        <div class="fl">
          <button class="plechoose fl" @click="selectedAll" >全选 <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl" @click="delDictionary(null)">批量删除</button>
          <div>共搜索到 <span>{{dictionarys.attributes.tatal || 0}}</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button" @click="loadDictionarysDatas(1,{'key':searchParam})">搜索</button>
          <button class="clear-button bluborder-button" v-on:click="searchParam = null">清除</button>
          <button class="ss transf-button" v-bind:class="{hide:!searchDivShow}"
                  v-on:click="searchDivShow=!searchDivShow">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{searchDivShow ? "收起搜索" : "展开搜索"}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="selected" v-show="selectedDictionarys.length">已选 <span>{{selectedDictionarys.length}}</span> 项数据</div>
      <div class="tab">
        <table class="datadictionary-table">
          <tr>
            <th></th>
            <th>编号</th>
            <th>名称</th>
            <th>参数值</th>
            <th>类型</th>
            <th>描述</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
          <tr v-for="(dictionary, index) in dictionarys.dataItems" v-bind:key="index">
            <td><input type="checkbox" :value="index" v-model="selectedDictionarys"></td>
            <td><div :title="dictionary.dic_code">{{dictionary.dic_code}}</div></td>
            <td><div :title="dictionary.dic_name">{{dictionary.dic_name}}</div></td>
            <td><div :title="dictionary.dic_key">{{dictionary.dic_key}}</div></td>
            <td>{{/*参数类型(SYS：系统参数PARK：项目参数)*/{SYS:"系统参数",PARK:"项目参数"}[dictionary.dic_type]}}</td>
            <td><div :title="dictionary.depict">{{dictionary.depict}}</div></td>
            <td><div :title="dictionary.remark">{{dictionary.remark}}</div></td>
            <td>
              <a href="javascript:" class="edit" @click="showEditDictionary(dictionary)">编辑</a>
              <a href="javascript:" class="delete" @click="delDictionary(index)">删除</a>
            </td>
          </tr>
        </table>
      </div>
      <Pagination
        :previousPage="loadDictionarysDatas"
        :nextPage="loadDictionarysDatas"
        :skipPage="loadDictionarysDatas"
        :pageIndex="dictionarys.attributes.page_index"
        :totalPages="dictionarys.attributes.total_pages"
        :pageSize="dictionarys.attributes.page_size"
        :tatal="dictionarys.attributes.tatal"
      ></Pagination>
    </div>
    <!--弹窗-->
    <div class="main" v-show="ifEditDict">
      <div class="depwd" v-drag.cursor="'#editDict'">
        <div class="top-nav" id="editDict">
          <p class="t-text fl">数据字典</p>
          <p class="close fr" @click="ifEditDict = false">x</p>
        </div>
        <div class="bot">
          <div class="cet">
            <div class="clf">
              <!-- <p class="red"><i class="iconfont icon-jian-tianchong"></i>错误提示的文案</p> -->
              <p class="clf"><span class="fl"><span class='red-text'>*</span>编号：</span><input class="fl" v-model="dictionaryData.dic_code" type="text" placeholder="请输入编号，必填"></p>
              <p class="clf"><span class="fl"><span class='red-text'>*</span>名称：</span><input class="fl" v-model="dictionaryData.dic_name"  type="text" placeholder="请输入6-8位数字密码，必填"></p>
              <p class="clf"><span class="fl">参数值：</span><input class="fl" v-model="dictionaryData.dic_key"  type="text" placeholder="请输入6-8位数字密码，必填"> </p>
              <p class="clf"><span class="fl">描述：</span><input class="fl"  v-model="dictionaryData.depict" type="text" placeholder="请输入6-8位数字密码，必填"> </p>
              <p class="bz clf"><span class="fl">备注：</span><input class="fl"  v-model="dictionaryData.remark" type="text" placeholder="请输入备注" id="inp"></p>
            </div>
            <div class="button clf">
              <a class="qr fr" @click="editDictionary">确定</a>
              <a class="qx fr" @click="ifEditDict = false">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="delete_prompt">
      <div class="depwd">
        <div class="text">你是否确认删除选中的记录</div>
        <div class="button clf">
          <a class="qr fr">确定</a>
          <a class="qx fr" >取消</a>
        </div>
      </div>
    </div> -->
    <!--弹窗-->
  </div>
</template>

<script>
import { RequestParams ,RequestDataItem,User} from "../../assets/js/entity";
import Pagination from "../Pagination";
import moment from "moment";
  export default {
    data () {
      return {
        RequestParams:RequestParams,
        searchDivShow: true,
        /**搜索参数 */
        searchParam: "",
        selectedDictionarys:[],
        ifEditDict: false,
        dictionaryData:{
          id:null,//        	Y	String	ID
          dic_code:null,//  	Y	String	参数编号
          dic_name:null,//  	Y	String	参数名称
          dic_key:null,//   	Y	String	参数值
          dic_type:["PARK","PARK","PARK","SYS"][User.info.user_type],//  	Y	String	参数类型(SYS：系统参数PARK：项目参数)
          depict:null,//    	N	String	参数描述
          remark:null,//    	N	String	备注
        },
        dictionarys: {
          attributes: {
            page_index: 1, //当前页码
            page_size: 2, //当前页数
            tatal: 10, //总条目数
            total_pages: 10 //条页数
          },
          dataItems: []
        }
      };
    },
    components: {
      /**分页组件 */
      Pagination
    },
    methods: {

      selectedAll(){
        if(this.selectedDictionarys.length){
          this.selectedDictionarys = [];
        }
        else this.selectedDictionarys = this.dictionarys.dataItems.map((o,i)=>i);
      },

      showEditDictionary(data){
        this.dictionaryData.id = null;
        if(data){
          this.dictionaryData = data;
        }
        this.ifEditDict = true;
      },

      editDictionary(){
        
        let adopt = null;

        if(String(this.dictionaryData.dic_code).trim() == "") adopt = "请填写参数编码";
        if(String(this.dictionaryData.dic_name).trim() == "") adopt = "请填写参数名称";
        if(String(this.dictionaryData.dic_key).trim() == "") adopt = "请填写参数值";
        
        if(adopt) return this.$message.error(adopt);

        this.$api.dictionary.editor(new RequestParams()
        .addAttributes(this.dictionaryData)
        .addAttribute("project_id" , 0)
        )
        .then(response=>{
          this.$message.success(response.message)
          this.ifEditDict = false;
          this.loadDictionarysDatas();
        })
        .catch(({message}) => this.$message.error(message))
      },

      delDictionary(id){

        let datas = id != null ? [this.dictionarys.dataItems[id]] : this.selectedDictionarys.map(o=>this.dictionarys.dataItems[o]);
        if(datas.length){
          this.$confirm(`确定要删除吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => this.$api.dictionary.delete(new RequestParams().addDataItems(datas.map(o=>new RequestDataItem().addAttribute("id", o.id)))))
          .then(response=>{
            this.$message.success("删除成功");
            this.loadDictionarysDatas();
          })
          .catch(({message}) => this.$message.error(message))
          .catch(() => {
            this.$message.info("已取消删除");
          });
        }
        else this.$message.info("请选择要删除的字典记录");
      },
      /**加载用户列表数据 */
      loadDictionarysDatas(pageNum = 1, params = {}) {
        this.$api.dictionary
          .getlist(new RequestParams()
          .addAttributes(params)
          .addAttribute("project_id", null)
          .addAttribute("page_index", pageNum))
          .then(response => {
            this.dictionarys.attributes = response.attributes;
            this.dictionarys.dataItems = response.dataItems.map(o => o.attributes);
          })
          .catch(response => this.$message.error(response.message));
      }
    },
    mounted() {
      this.loadDictionarysDatas(1, {});
    }
  };
</script>

<style scoped>
  @import "../../assets/css/DataDictionary.css";
  @import "http://jqueryui.com/resources/demos/style.css";
</style>
