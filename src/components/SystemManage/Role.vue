<template>
<el-row :gutter="20">
  <el-col :span="24">
    <div class="TablePanel">
      <div class="TableTools">
        <el-tooltip class="item" effect="dark" content="新增角色" placement="top">
          <i class="el-icon-circle-plus-outline ToolButton" @click="addRoleBtn('ruleForm')"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="批量删除" placement="top">
          <i class="el-icon-delete ToolButton" @click="batchDelete()"></i>
        </el-tooltip>
      </div>
      <!-- 表格显示 -->
      <el-table class="TableFrame" ref="multipleTable" :data="$store.state.role.roleList" @selection-change="handleSelectionChange"
        border style="width: 100%" tooltip-effect="dark" stripe size="small" highlight-current-row :header-cell-style="tableHeaderStyle">
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column prop="name" label="角色名称" width="170">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column prop="scope" label="标识" width="90" align="center">
          <template slot-scope="scope">{{scope.row.scope}}</template>
        </el-table-column>
        <el-table-column prop="description" label="描述" width="292">
          <template slot-scope="scope">{{scope.row.description}}</template>
        </el-table-column>
        <el-table-column prop="create_date" label="创建日期" width="210" align="center">
          <template slot-scope="scope"><i class="el-icon-time"></i><span style="margin-left: 10px">{{ scope.row.createDate }}</span></template>
        </el-table-column>
        <el-table-column prop="create_by" label="创建人" width="100" align="center">
          <template slot-scope="scope"><span style="margin-left: 0px">{{ scope.row.createBy }}</span></template>
        </el-table-column>
        <el-table-column prop="last_modified_date" label="最后修改时间" width="210" align="center">
          <template slot-scope="scope"><i class="el-icon-time"></i><span style="margin-left: 10px">{{ scope.row.lastModifiedDate }}</span></template>
        </el-table-column>
        <el-table-column prop="last_modified_by" label="最后修改" width="100" align="center">
          <template slot-scope="scope"><span style="margin-left: 0px">{{ scope.row.lastModifiedBy }}</span></template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="115px" align="center">
          <template scope="scope">
            <i class="el-icon-edit-outline CellToolButton" @click="updateRole(scope.row)"></i>
            <i class="el-icon-delete CellToolButton" @click="deleteRole(scope.row)"></i>
            <el-tooltip class="item" effect="dark" content="更多" placement="top">
              <div slot="content">
                <div>创建人:<span style="margin-left: 10px">{{scope.row.createBy}}</span></div>
                <div>最后修改日期:<span style="margin-left: 10px">{{ scope.row.lastModifiedDate }}</span></div>
                <div>最后修改人:<span style="margin-left: 10px">{{ scope.row.lastModifiedBy }}</span></div>
              </div>
              <i class="el-icon-more CellToolButton"></i>
            </el-tooltip>
            </template>
        </el-table-column>
      </el-table>
      <div class="TablePaginationFrame">
        <el-col :span="12">
          <el-pagination class="TablePagination" @current-change="currentPageChangeHandle"
          layout="prev, pager, next, total" :total="$store.state.role.pageTotal" :page-size="$store.state.role.pageSize">
          </el-pagination>
        </el-col>
      </div>
    </div>
    <!-- 添加权限对对话框 -->
    <el-dialog title="添加角色" :visible.sync=dialogFormVisible :modal=true :modal-append-to-body=false :close-on-click-modal=false width="600px" top="0px">
      <el-steps :active="addFormActive" finish-status="success" :align-center=true style="margin-top: -20px;margin-bottom: 30px;" @open="addDialogShow()">
        <el-step title="角色信息"></el-step>
        <el-step title="分配权限"></el-step>
        <el-step title="确认提交"></el-step>
      </el-steps>
      <el-form v-if="whatStep === 1" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" status-icon size="small" :inline-message="true">
        <el-form-item label="角色名称:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色范围:" prop="scope">
          <el-input v-model="ruleForm.scope"></el-input>
        </el-form-item>
        <el-form-item label="角色描述:" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" :rows="2" placeholder="请输入角色描述...">
          </el-input>
        </el-form-item>
      </el-form>
      <el-transfer v-if="whatStep === 2" v-model="checkedPrivilege" :data="$store.state.role.rolePrivilegeList" :titles="['权限列表', '已选权限']"></el-transfer>
      <el-row v-if="whatStep === 3" :gutter="20">
        <el-col :span="12"><span style="font-size: 14px;color: #787878">角色名称 : {{this.ruleForm.name}}</span></el-col>
      </el-row>
      <el-row v-if="whatStep === 3" :gutter="20">
        <el-col :span="12"><span style="font-size: 14px;color: #787878">角色范围 : {{this.ruleForm.scope}}</span></el-col>
      </el-row>
      <el-row v-if="whatStep === 3" :gutter="20">
        <el-col :span="24"><span style="font-size: 14px;color: #787878">角色描述 : {{this.ruleForm.description}}</span></el-col>
      </el-row>
      <el-row v-if="whatStep === 3" :gutter="20">
        <el-col :span="24"><span style="font-size: 14px;color: #787878">分配权限 : </span></el-col>
        <el-tag :key="tag" v-for="tag in checkedPrivilegeName" :disable-transitions="false">{{tag}}</el-tag>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormLastStep('ruleForm')" size="mini">{{addLeftBtn}}</el-button>
        <el-button type="primary" @click="addFormNextStep('ruleForm')" size="mini">{{addRightBtn}}</el-button>
      </div>
    </el-dialog>
    <!-- 修改角色对对话框 -->
    <el-dialog title="修改角色" :visible.sync="updateFormVisible" :modal=true :modal-append-to-body=false :close-on-click-modal=false width="600px" top="0px">
      <el-steps :active="updateFormActive" finish-status="success" :align-center=true style="margin-top: -20px;margin-bottom: 30px;">
        <el-step title="角色信息"></el-step>
        <el-step title="分配权限"></el-step>
        <el-step title="确认提交"></el-step>
      </el-steps>
      <el-form v-if="updateStep === 1" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" status-icon size="small" :inline-message="true">
        <el-form-item label="角色名称:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色范围:" prop="scope">
          <el-input v-model="ruleForm.scope"></el-input>
        </el-form-item>
        <el-form-item label="角色描述:" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" :rows="2" placeholder="请输入权限描述...">
          </el-input>
        </el-form-item>
      </el-form>
      <el-transfer v-if="updateStep === 2" v-model="updateCheckedPrivilege" :data="$store.state.role.rolePrivilegeList" :titles="['权限列表', '已选权限']"></el-transfer>
      <el-row v-if="updateStep === 3" :gutter="20">
        <el-col :span="12"><span style="font-size: 14px;color: #787878">角色名称 : {{this.ruleForm.name}}</span></el-col>
      </el-row>
      <el-row v-if="updateStep === 3" :gutter="20">
        <el-col :span="12"><span style="font-size: 14px;color: #787878">角色范围 : {{this.ruleForm.scope}}</span></el-col>
      </el-row>
      <el-row v-if="updateStep === 3" :gutter="20">
        <el-col :span="24"><span style="font-size: 14px;color: #787878">角色描述 : {{this.ruleForm.description}}</span></el-col>
      </el-row>
      <el-row v-if="updateStep === 3" :gutter="20">
        <el-col :span="24"><span style="font-size: 14px;color: #787878">分配权限 : </span></el-col>
        <el-tag :key="tag" v-for="tag in updateCheckedPrivilegeName" :disable-transitions="false">{{tag}}</el-tag>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormLastStep('ruleForm')" size="mini">{{updateLeftBtn}}</el-button>
        <el-button type="primary" @click="updateFormNextStep('ruleForm')" size="mini">{{updateRightBtn}}</el-button>
      </div>
    </el-dialog>
  </el-col>
</el-row>
</template>

<script type="text/ecmascript-6">
import {mapState, mapActions} from 'vuex'

export default {
  name: 'system-privilege',

  data () {
    return {
      ruleForm: {
        id: '',
        name: '',
        scope: '',
        description: ''
      },

      rules: {
        name: [
          {required: true, message: '角色名称不能为空值', trigger: 'change'},
          {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'change'}],
        scope: [
          {required: true, message: '角色范围不能为空值', trigger: 'change'},
          {min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'change'}],
        description: [
          {required: true, message: '角色范围不能为空值', trigger: 'change'},
          {min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'change'}]
      },
      tableSelection: [],
      // 添加角色对话框显示
      dialogFormVisible: false,
      // 更新角色对话框显示
      updateFormVisible: false,
      // 添加角色框进行步骤
      whatStep: 1,
      updateStep: 1,
      // 添加角色框上一步按钮显示内容
      addLeftBtn: '取 消',
      updateLeftBtn: '取消',
      // 添加角色框下一步按钮显示内容
      addRightBtn: '下一步',
      updateRightBtn: '下一步',
      // 添加角色框激活步骤
      addFormActive: 0,
      updateFormActive: 0,
      // 已选权限的列表
      checkedPrivilege: [],
      updateCheckedPrivilege: [],
      checkedPrivilegeName: [],
      updateCheckedPrivilegeName: [],
      tableHeaderStyle: {
        backgroundColor: '#F4F4F4'
      }
    }
  },

  computed: {
    ...mapState([
      'roleList', 'pageSize', 'currentPage', 'pageTotal'
    ])
  },
  methods: {
    addDialogShow () {
      this.$refs[this.ruleForm].clearValidate()
      this.$refs[this.ruleForm].resetFields()
    },
    handleSelectionChange (val) {
      this.tableSelection = val
    },
    batchDelete () {
      let ids = []
      this.tableSelection.map((item) => {
        ids.push(item.id)
      })
      if (ids.length === 0) {
        this.$message({
          message: '请选择要删除的角色！',
          type: 'warning'
        })
      } else {
        this.$confirm('确认删除选择的角色?')
          .then(_ => {
            this.batchDeleteRoleAction(ids).then(v => {
              if (v === 'success') {
                this.getRoleListAction(this.$store.state.role.currentPage)
                this.$notify({
                  title: '成功',
                  message: '成功删除角色！',
                  type: 'success'
                })
              } else {
                this.$notify({
                  title: '错误',
                  message: '删除角色发生错误！',
                  type: 'error'
                })
              }
            })
          }).catch(() => {})
      }
    },
    updateRole (row) {
      this.updateFormVisible = true
      this.updateStep = 1
      this.updateFormActive = 0
      this.updateLeftBtn = '取消'
      this.updateRightBtn = '下一步'
      this.ruleForm = {
        id: row.id,
        name: row.name,
        scope: row.scope,
        description: row.description
      }
    },
    deleteRole (row) {
      this.$confirm('确认删除角色名为: "' + row.name + '" 的角色?')
        .then(_ => {
          this.deleteRoleAction(row.id).then(v => {
            if (v === 'success') {
              // 删除角色后刷新该页面
              this.getRoleListAction(this.$store.state.role.currentPage)
              this.$notify({
                title: '成功',
                message: '成功删除角色！',
                type: 'success'
              })
            } else {
              this.$notify({
                title: '错误',
                message: '删除角色发生错误！',
                type: 'error'
              })
            }
          })
        })
        .catch(_ => {})
    },
    addRoleBtn (formName) {
      // this.ruleForm.id = ''
      // this.ruleForm.name = ''
      // this.ruleForm.scope = ''
      // this.ruleForm.description = ''
      this.dialogFormVisible = true
      this.whatStep = 1
      this.addFormActive = 0
      // this.$refs[formName].resetFields()
      // this.$refs[formName].clearValidate()
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    currentPageChangeHandle (val) {
      this.getRoleListAction(val).then(v => {
        if (v !== 'success') {
          this.$notify({
            title: '错误',
            message: '请求数据错误！',
            type: 'error'
          })
        }
      })
    },
    submitAddForm () {
      let request = {
        ids: this.checkedPrivilege,
        modelObject: this.ruleForm
      }
      this.addRoleAction(request).then(v => {
        if (v.msg === 'success') {
          this.pushRoleListAction(v.list)
          // this.$refs[formName].resetFields()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '成功添加角色！',
            type: 'success'
          })
        } else {
          // this.$refs[formName].resetFields()
          this.dialogFormVisible = false
          this.$notify({
            title: '错误',
            message: '发生错误！',
            type: 'error'
          })
        }
      })
    },
    addFormLastStep (formName) {
      // 如果是添加权限信息时，左边按钮绑定的是取消操作，点击关闭dialog，并清除fields的值
      if (this.whatStep === 1) {
        this.$refs[formName].resetFields()
        this.dialogFormVisible = false
        this.addFormActive = 0
      // 如果是分配权限时，左边按钮绑定的是上一步操作，点击返回上一步
      } else if (this.whatStep === 2) {
        this.whatStep = 1
        this.addFormActive--
        this.addLeftBtn = '取 消'
      } else {
        this.whatStep = 2
        this.addFormActive--
        this.addLeftBtn = '上一步'
        this.addRightBtn = '下一步'
      }
    },
    addFormNextStep (formName) {
      if (this.whatStep === 1) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addFormActive++
            this.whatStep++
            this.addLeftBtn = '上一步'
            /******
             ****** 添加角色时获取的权限列表 ******
             ******/
            this.getPrivilegeListKVAction()
          }
        })
      } else if (this.whatStep === 2) {
        this.addFormActive++
        this.whatStep++
        this.addRightBtn = '提交'
        this.showAddFormDetails(this.checkedPrivilege)
      } else {
        this.addFormActive = 0
        this.whatStep = 1
        this.addRightBtn = '下一步'
        this.addLeftBtn = '取消'
        this.submitAddForm()
      }
    },
    showAddFormDetails (value) {
      this.getPrivilegeNameAction(value).then(v => { this.checkedPrivilegeName = v })
    },
    updateFormLastStep (formName) {
      // 如果是修改角色信息时，左边按钮绑定的是取消操作，点击关闭dialog，并清除fields的值
      if (this.updateStep === 1) {
        this.$refs[formName].resetFields()
        this.updateFormVisible = false
        this.updateFormActive = 0
        // 如果是分配权限时，左边按钮绑定的是上一步操作，点击返回上一步
      } else if (this.updateStep === 2) {
        this.updateStep = 1
        this.updateFormActive--
        this.updateLeftBtn = '取 消'
      } else {
        this.updateStep = 2
        this.updateFormActive--
        this.updateLeftBtn = '上一步'
        this.updateRightBtn = '下一步'
      }
    },
    updateFormNextStep (formName) {
      if (this.updateStep === 1) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateFormActive++
            this.updateStep++
            this.updateLeftBtn = '上一步'
            /******
             ****** 修改角色时获取的权限列表 ******
             ******/
            this.getPrivilegeListKVAction()
            /******
             ****** 修改角色时获取角色已选择的权限 ******
             ******/
            this.updateRoleHadPrivilegeAction(this.ruleForm.id).then(v => {
              if (v.msg === 'success') {
                this.updateCheckedPrivilege = []
                v.list.forEach((item) => {
                  this.updateCheckedPrivilege.push(item.privilegeId)
                })
              }
            })
          }
        })
      } else if (this.updateStep === 2) {
        this.updateFormActive++
        this.updateStep++
        this.updateRightBtn = '修改'
        this.showUpdateFormDetails(this.updateCheckedPrivilege)
      } else {
        this.updateFormActive = 0
        this.updateStep = 1
        this.updateRightBtn = '下一步'
        this.updateLeftBtn = '取消'
        this.submitUpdateForm()
      }
    },
    showUpdateFormDetails (value) {
      this.getPrivilegeNameAction(value).then(v => { this.updateCheckedPrivilegeName = v })
    },
    resetUpdateForm (formName) {
      this.$refs[formName].resetFields()
      this.updateFormVisible = false
    },
    submitUpdateForm () {
      let request = {
        ids: this.updateCheckedPrivilege,
        modelObject: this.ruleForm
      }
      this.updateRoleAction(request).then(v => {
        if (v === 'success') {
          this.updateFormVisible = false
          this.getRoleListAction(this.$store.state.role.currentPage)
          this.$notify({
            title: '成功',
            message: '成功添加角色！',
            type: 'success'
          })
        } else {
          this.updateFormVisible = false
          this.$notify({
            title: '错误',
            message: '发生错误！',
            type: 'error'
          })
        }
      })
    },
    ...mapActions({
      getRoleListAction: 'getRoleListAction',
      addRoleAction: 'addRoleAction',
      deleteRoleAction: 'deleteRoleAction',
      pushRoleListAction: 'pushRoleListAction',
      updateRoleAction: 'updateRoleAction',
      getPrivilegeListKVAction: 'getPrivilegeListKVAction',
      getPrivilegeNameAction: 'getPrivilegeNameAction',
      updateRoleHadPrivilegeAction: 'updateRoleHadPrivilegeAction',
      batchDeleteRoleAction: 'batchDeleteRoleAction'
    })
  },

  mounted () {
    this.getRoleListAction(1).then(v => {
      if (v !== 'success') {
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
  width: 300px;
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
.el-tag {
  margin-left: 5px;
  margin-top: 5px;
  background-color: gainsboro;
}
</style>
