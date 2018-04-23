<template>
<el-row :gutter="20">
  <el-col :span="22" offset=1>
    <div class="TablePanel">
      <div class="TableTools">

        <el-tooltip class="item" effect="dark" content="新增资源" placement="top">
          <i class="el-icon-circle-plus-outline ToolButton" @click="handleEdit()"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除资源" placement="top">
          <i class="el-icon-remove-outline ToolButton"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="批量删除" placement="top">
          <i class="el-icon-edit-outline ToolButton"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="批量删除" placement="top">
          <i class="el-icon-delete ToolButton"></i>
        </el-tooltip>
      </div>
      <!-- 表格显示 -->
      <el-table class="TableFrame" :data="tableData3" border style="width: 100%" tooltip-effect="dark" stripe size="small" highlight-current-row header-cell-style="background: #F4F4F4;">
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column prop="name" label="资源名称" width="130"></el-table-column>
        <el-table-column prop="uri" label="URI" width="350"></el-table-column>
        <el-table-column prop="level" label="等级" width="50" align="center"></el-table-column>
        <el-table-column prop="scope" label="范围" width="60" align="center"></el-table-column>
        <el-table-column prop="description" label="描述" width="364"></el-table-column>
        <el-table-column prop="create_date" label="创建日期" width="120" align="center">
          <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.create_date }}</span>
                        </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="125px" align="center">
          <template scope="scope">
                            <el-tooltip class="item" effect="dark" content="修改" placement="top">
                                <i class="el-icon-edit-outline CellToolButton"></i>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除" placement="top">
                                <i class="el-icon-delete CellToolButton"></i>
                            </el-tooltip>

                            <el-popover ref="popover1" placement="top" width="200" trigger="hover">
                                <div class="TableCellInfo" style="font-size: 12px;color: midnightblue;font-family: 'Microsoft YaHei', '微软雅黑', Arial, sans-serif">
                                    <div>创建人:<span style="margin-left: 10px">{% templatetag openvariable %}scope.row.create_by{% templatetag closevariable %}</span></div>
                                    <div>最后修改日期:<span style="margin-left: 10px">{{ scope.row.last_modified_date }}</span></div>
                                    <div>最后修改人:<span style="margin-left: 10px">{{ scope.row.last_modified_by }}</span></div>
                                </div>
                            </el-popover>
                            <i v-popover:popover1 class="el-icon-more CellToolButton"></i>
                        </template>
        </el-table-column>
      </el-table>
      <div class="TablePaginationFrame">
        <el-col :span="12" offset=8>
          <el-pagination class="TablePagination" background layout="prev, pager, next" :total="200" small>
          </el-pagination>
        </el-col>
      </div>

    </div>
    <el-dialog title="添加资源" :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" status-icon size="small" inline-message="true">
        <el-form-item label="资源名称:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="资源 URI:" prop="uri">
          <el-input v-model="ruleForm.uri"></el-input>
        </el-form-item>
        <el-form-item label="资源等级:" prop="level">
          <el-input-number size="mini" v-model="ruleForm.level" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="资源范围:" prop="scope">
          <el-input v-model="ruleForm.scope"></el-input>
        </el-form-item>
        <el-form-item label="资源描述:" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" :rows="2" placeholder="请输入资源描述...">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </el-col>
</el-row>
</template>

<script type="text/ecmascript-6">
import {mapActions} from 'vuex'

export default {
  name: 'resource',

  data () {
    return {
      ruleForm: {
        name: '',
        uri: '',
        level: '',
        scope: '',
        description: '',
        create_date: '',
        last_modified_date: '',
        create_by: '',
        last_modified_by: ''
      },

      rules: {
        name: [
          {required: true, message: '资源名称不能为空值', trigger: 'change'},
          {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'change'}],
        uri: [
          {required: true, message: '资源URI不能为空值', trigger: 'change'},
          {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'change'}],
        level: [
          {required: true, message: '资源等级不能为空值', trigger: 'change'}],
        scope: [
          {required: true, message: '资源范围不能为空值', trigger: 'change'},
          {min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'change'}],
        description: [
          {required: true, message: '资源范围不能为空值', trigger: 'change'},
          {min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'change'}]
      },

      dialogFormVisible: false,

      tableData3: [{
        create_date: '2016-05-03',
        name: '王小虎',
        uri: '/resourceManage',
        level: 1,
        scope: 'admin',
        description: 'just a test',
        last_modified_date: '2016-05-03',
        create_by: 'chris',
        last_modified_by: 'chris',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },

  methods: {
    handleEdit () {
      this.dialogFormVisible = true
    },
    ...mapActions([
      'getResourceListAction'
    ])
  },

  mounted: function () {
    this.getResourceListAction()
  }
}
</script>

<style scoped>
.TablePanel {
  border: 1px solid #E3E3E3;
  border-radius: 4px;
  background: #F7F7F7;
}

.TableFrame {
  border-left-width: 0px !important;
  border-right-width: 0px !important;
}

.TableTools {
  margin-top: 35px;
  width: 100%;
  height: 30px;
  border-top: 1px solid #efefef;
}

.ToolButton {
  margin-left: 35px;
  margin-top: 7px;
  color: #858585;
}

.ToolButton:hover {
  color: red;
}

.ToolButton.is-active,
.ToolButton:focus {
  color: royalblue;
}

.TablePaginationFrame {
  height: 45px;
}

.TablePagination {
  margin-top: 10px;
  font-weight: bold;
}

.el-input {
  width: 200px;
}

.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 12px !important;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}

.CellToolButton {
  margin-right: 5px;
  margin-top: 7px;
  color: #858585;
}

.CellToolButton:hover {
  color: red;
}

.CellToolButton.is-active,
.CellToolButton:focus {
  color: royalblue;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  font-size: 12px;
  margin-right: 0;
  margin-bottom: 0;
  width: 30%;
}

.TableRowExpand {
  width: 100%;
  margin: 0px 0px;
  background-color: antiquewhite;
  height: 40px;
  border-radius: 4px;
}
</style>
