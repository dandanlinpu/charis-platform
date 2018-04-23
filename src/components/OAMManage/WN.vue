<template>
<el-row :gutter="20">
  <el-col :span="24" :offset=0>
    <div class="TablePanel">
      <div class="TableTools">
        <el-tooltip class="item" effect="dark" content="新增信息点" placement="top">
          <i class="el-icon-circle-plus-outline ToolButton" @click="handleEdit()"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除信息点" placement="top">
          <i class="el-icon-remove-outline ToolButton" @click="dialogVisible = true"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="批量删除" placement="top">
          <i class="el-icon-delete ToolButton" @click="batchDelete()"></i>
        </el-tooltip>
      </div>
      <!-- 表格显示 -->
      <el-table class="TableFrame" :data="$store.state.resource.resourceList" @selection-change="handleSelectionChange"
        border style="width: 100%" tooltip-effect="dark" stripe size="small" highlight-current-row :header-cell-style="tableHeaderStyle">
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column prop="name" label="信息点编号" width="150">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column prop="uri" label="使用状态" width="80" align="center">
          <template slot-scope="scope">{{scope.row.uri}}</template>
        </el-table-column>
        <el-table-column prop="level" label="衰减率" width="100" align="center">
          <template slot-scope="scope">{{scope.row.level}}</template>
        </el-table-column>
        <el-table-column prop="scope" label="当前用户" width="100" align="center">
          <template slot-scope="scope">{{scope.row.scope}}</template>
        </el-table-column>
        <el-table-column prop="description" label="修改日期" width="210" align="center">
          <template slot-scope="scope"><i class="el-icon-time"></i><span style="margin-left: 10px">{{scope.row.description}}</span></template>
        </el-table-column>
        <el-table-column prop="create_date" label="创建日期" width="210" align="center">
          <template slot-scope="scope"><i class="el-icon-time"></i><span style="margin-left: 10px">{{ scope.row.createDate }}</span></template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="90px" align="center">
          <template scope="scope">
            <i class="el-icon-edit-outline CellToolButton" @click="updateResource(scope.row)"></i>
            <i class="el-icon-delete CellToolButton" @click="deleteResource(scope.row)"></i>
            </template>
        </el-table-column>
      </el-table>
      <div class="TablePaginationFrame">
        <el-col :span="12">
          <el-pagination class="TablePagination" @current-change="currentPageChangeHandle"
          layout="prev, pager, next, total" :total="$store.state.resource.pageTotal" :page-size="$store.state.resource.pageSize">
          </el-pagination>
        </el-col>
      </div>
    </div>
    <!-- 添加资源对对话框 -->
    <el-dialog title="添加资源" :visible.sync="dialogFormVisible" :modal=true :modal-append-to-body=false :close-on-click-modal=false width="400px" top="0px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" status-icon size="small" :inline-message="true">
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
        <el-button @click="resetAddForm('ruleForm')" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitAddForm ('ruleForm')" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改资源对对话框 -->
    <el-dialog title="修改资源" :visible.sync="updateFormVisible" :modal=true :modal-append-to-body=false :close-on-click-modal=false width="400px" top="0px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" status-icon size="small" :inline-message="true">
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
        <el-button @click="resetupdateForm('ruleForm')" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitUpdateForm ('ruleForm')" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </el-col>
</el-row>
</template>

<script type="text/ecmascript-6">
import {mapState, mapActions} from 'vuex'

export default {
  name: 'system-resource',

  data () {
    return {
      ruleForm: {
        id: '',
        name: '',
        uri: '',
        level: '',
        scope: '',
        description: ''
      },

      rules: {
        name: [
          {required: true, message: '资源名称不能为空值', trigger: 'change'},
          {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'change'}],
        uri: [
          {required: true, message: '资源URI不能为空值', trigger: 'change'},
          {min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'change'}],
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
      updateFormVisible: false,
      tableSelection: [],
      tableHeaderStyle: {
        backgroundColor: '#F4F4F4'
      }
    }
  },

  computed: {
    ...mapState([
      'resourceList', 'pageSize', 'currentPage', 'pageTotal'
    ])
  },
  methods: {
    updateResource (row) {
      this.updateFormVisible = true
      this.ruleForm = {
        id: row.id,
        name: row.name,
        uri: row.uri,
        level: row.level,
        scope: row.scope,
        description: row.description
      }
    },
    handleSelectionChange (val) {
      this.tableSelection = val
    },
    deleteResource (row) {
      this.$confirm('确认删除资源名为: "' + row.name + '" 的资源?')
        .then(_ => {
          this.deleteResourceAction(row.id).then(v => {
            if (v === 'success') {
              // 删除资源后刷新该页面
              this.getResourceListAction(this.$store.state.resource.currentPage)
              this.$notify({
                title: '成功',
                message: '成功删除资源！',
                type: 'success'
              })
            } else {
              this.$notify({
                title: '错误',
                message: '删除资源发生错误！',
                type: 'error'
              })
            }
          })
        })
        .catch(_ => {})
    },
    batchDelete () {
      let ids = []
      this.tableSelection.map((item) => {
        ids.push(item.id)
      })
      if (ids.length === 0) {
        this.$message({
          message: '请选择要删除的资源！',
          type: 'warning'
        })
      } else {
        this.$confirm('确认删除选择的资源?')
          .then(_ => {
            this.batchDeleteResourceAction(ids).then(v => {
              if (v === 'success') {
                this.getResourceListAction(this.$store.state.resource.currentPage)
                this.$notify({
                  title: '成功',
                  message: '成功删除资源！',
                  type: 'success'
                })
              } else {
                this.$notify({
                  title: '错误',
                  message: '删除资源发生错误！',
                  type: 'error'
                })
              }
            })
          }).catch(() => {})
      }
    },
    handleEdit () {
      this.dialogFormVisible = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    currentPageChangeHandle (val) {
      this.getResourceListAction(val).then(v => {
        if (v !== 'success') {
          this.$notify({
            title: '错误',
            message: '请求数据错误！',
            type: 'error'
          })
        }
      })
    },
    submitAddForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addResourceAction(this.ruleForm).then(v => {
            if (v.msg === 'success') {
              this.pushResourceListAction(v.list)
              this.$refs[formName].resetFields()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '成功添加资源！',
                type: 'success'
              })
            } else {
              this.$refs[formName].resetFields()
              this.dialogFormVisible = false
              this.$notify({
                title: '错误',
                message: '发生错误！',
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    resetAddForm (formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
    },
    resetupdateForm (formName) {
      this.$refs[formName].resetFields()
      this.updateFormVisible = false
    },
    submitUpdateForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateResourceAction(this.ruleForm).then(v => {
            console.log(v)
            if (v === 'success') {
              this.getResourceListAction(this.$store.state.resource.currentPage)
              this.$refs[formName].resetFields()
              this.updateFormVisible = false
              this.$notify({
                title: '成功',
                message: '成功修改资源！',
                type: 'success'
              })
            } else {
              this.$refs[formName].resetFields()
              this.updateFormVisible = false
              this.$notify({
                title: '错误',
                message: '发生错误！',
                type: 'error'
              })
            }
          })
        }
      })
    },
    ...mapActions({
      getResourceListAction: 'getResourceListAction',
      addResourceAction: 'addResourceAction',
      deleteResourceAction: 'deleteResourceAction',
      pushResourceListAction: 'pushResourceListAction',
      updateResourceAction: 'updateResourceAction',
      batchDeleteResourceAction: 'batchDeleteResourceAction'
    })
  },

  mounted () {
    this.getResourceListAction(1).then(v => {
      if (v !== 'success') {
        console.log(v)
        this.$notify({
          title: '错误',
          message: '请求数据错误！',
          type: 'error'
        })
      }
    })
  }
}
</script>

<style scoped>
.TablePanel {
  border: 1px solid #E3E3E3;
  border-radius: 4px;
  background: #f5f5f5;
  margin-top: -20px;
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
  outline: none;
}

.ToolButton:hover {
  color: red;
  outline: none;
}

.ToolButton.is-active,
.ToolButton:focus {
  color: royalblue;
  outline: none;
}

.TablePaginationFrame {
  height: 45px;
  background-color: transparent;
}
.TablePagination {
  margin-top: 10px;
  font-weight: normal;
  background-color: transparent;
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
  outline: none;
}

.CellToolButton:hover {
  color: red;
  outline: none;
}

.CellToolButton.is-active,
.CellToolButton:focus {
  color: royalblue;
  outline: none;
}
.tableHeaderStyle {
  background-color: #F4F4F4;
}
</style>
