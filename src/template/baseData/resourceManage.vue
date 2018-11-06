<template>
  <div class="content">
    <div class="left">
      <div class="add"><a href="javascript:" class="add_child" @click="ifAllotPopup = true">+新增</a></div>
      <div class="clf btns">
        <el-tree
          :data="data"
          :props="defaultProps"
          show-checkbox
          @node-click="handleNodeClick">
        </el-tree>
      </div>
    </div>
    <div class="right">
      <div></div>
      <div>
        <div class="name">父级：</div>
        <div class="role"><input type="text" placeholder="请选择"></div>
      </div>
      <div>
        <div class="name">编号：</div>
        <div class="role"><input type="text" placeholder="请输入"></div>
      </div>
      <div>
        <div class="name">名称：</div>
        <div class="role"><input type="text" placeholder="请输入"></div>
      </div>
      <div>
        <div class="name">类型：</div>
        <div class="role">
          <label for="1"><input type="radio" id="1" name="radio">菜单</label>
          <label for="2"><input type="radio" id="2" name="radio" checked="checked">按钮</label>
        </div>
      </div>
      <div>
        <div class="name">链接：</div>
        <div class="role"><input type="text" placeholder="请输入"></div>
      </div>
      <div>
        <div class="name">是否显示：</div>
        <div class="role">
          <label for="3"><input type="radio" id="3" name="radio1">显示</label>
          <label for="4"><input type="radio" id="4" name="radio1" checked="checked">不显示</label>
        </div>
      </div>

      <div>
        <div class="name">图标：</div>
        <div class="role-icon"><a href="javascript:">选择图标</a></div>
      </div>

      <div>
        <div class="name">排序：</div>
        <div class="role">
          <el-slider v-model="formatTooltipValue" :format-tooltip="formatTooltip"></el-slider>
        </div>
      </div>
      <div>
        <div class="name">备注：</div>
        <div class="role">
          <textarea name="" id="" cols="30" rows="10" placeholder="请输入备注"></textarea>
        </div>
      </div>

      <div class="clf btn btn_modify">
        <a href="javascript:">修改</a>
        <a href="javascript:">删除</a>
      </div>

      <div class="clf btn btn_determine">
        <a href="javascript:">确定</a>
        <a href="javascript:" class="cancel">取消</a>
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
              :data="data"
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
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        ifAllotPopup: false,
        formatTooltipValue: 0,
        data: [
          {
            label: '基础资料',
            children: [
              {label: '资源管理'},
              {label: '角色管理'},
              {label: '用户管理'},
              {label: '系统配置'},
              {label: '操作日志'}
            ]
          },
          {
            label: '业务中心',
            children: [
              {label: '房屋管理'},
              {label: '车辆授权'},
              {label: '月卡续费'}
            ]
          },
          {
            label: '监控中心',
            children: [
              {label: '设备监控'}
            ]
          },
          {
            label: '报表中心',
            children: [
              {label: '固定车辆信息统计表'},
              {label: '房屋信息统计表'},
              {label: '固定车辆收费信息统计'},
              {label: '临时车辆收费信息统计'}
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      handleCheckChange (data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      handleNodeClick (data) {
        console.log(data);
      },
      formatTooltip (val) {
        return val / 100;
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/ResourceManagement.css";
</style>
