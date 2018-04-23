<template>
  <el-row :gutter="20">
    <el-col :span="5">
      <div class="TablePanel" style="height: 618px;">
        <div class="TreeTools">
          <el-tooltip class="item" effect="dark" content="新增部门" placement="top">
            <i class="el-icon-circle-plus-outline ToolButton"  @click="addNewDepartment('addDepartmentForm')"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除资源" placement="top">
            <i class="el-icon-remove-outline ToolButton" @click="dialogVisible = true"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="修改部门" placement="top">
            <i class="el-icon-edit-outline ToolButton" @click="updateDepartment()"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="部门详细信息" placement="top">
            <i class="el-icon-info ToolButton" @click="showDepartmentInfo('departmentInfo')"></i>
          </el-tooltip>
        </div>
        <el-tree id="departmentTree" ref="departmentTree" :data="$store.state.department.departmentTree" show-checkbox node-key="id" :highlight-current=true default-expand-all :expand-on-click-node="false"
                 :props="treeProps" @node-click="handleNodeClick" style="height: 518px;"></el-tree>
        <div class="TreePaginationFrame">
        </div>
      </div>
    </el-col>

    <el-col :span="19">
      <div class="TablePanel">
        <div class="TableTools">
          <el-tooltip class="item" effect="dark" content="新增用户" placement="top">
            <i class="el-icon-circle-plus-outline ToolButton" @click="departmentAddUser()"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="批量删除" placement="top">
            <i class="el-icon-delete ToolButton" @click="departmentBatchDeleteUser()"></i>
          </el-tooltip>
        </div>
        <el-table class="TableFrame" :data="$store.state.department.departmentUserList" @selection-change="handleSelectionChange"
                  border style="width: 100%" tooltip-effect="dark" stripe size="small" highlight-current-row :header-cell-style="tableHeaderStyle">
          <el-table-column type="selection" width="35"></el-table-column>
          <el-table-column prop="username" label="域账户" width="112" align="center">
            <template slot-scope="scope">{{scope.row.username}}</template>
          </el-table-column>
          <el-table-column prop="cnName" label="姓名" width="100" align="center">
            <template slot-scope="scope">{{scope.row.cnName}}</template>
          </el-table-column>
          <el-table-column prop="phone" label="联系方式" width="150" align="center">
            <template slot-scope="scope">{{scope.row.phone}}</template>
          </el-table-column>
          <el-table-column prop="login_status" label="登录状态" width="100" align="center">
            <template slot-scope="scope">{{scope.row.loginStatus}}</template>
          </el-table-column>
          <el-table-column prop="last_login_date" label="最后登录时间" width="210" align="center">
            <template slot-scope="scope"><i class="el-icon-time"></i><span style="margin-left: 10px">{{ scope.row.lastLoginDate }}</span></template>
          </el-table-column>
          <el-table-column prop="modifiedDate" label="最后修改时间" width="210" align="center">
            <template slot-scope="scope"><i class="el-icon-time"></i><span style="margin-left: 10px">{{ scope.row.modifiedDate }}</span></template>
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="125px" align="center">
            <template slot-scope="scope">
                <i class="el-icon-edit-outline CellToolButton" @click="updateResource(scope.row)"></i>
                <i class="el-icon-delete CellToolButton" @click="deleteDepartmentUser(scope.row)"></i>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <div slot="content">
                  <div>创建人:<span style="margin-left: 10px">{{scope.row.loginStatus}}</span></div>
                  <div>最后修改日期:<span style="margin-left: 10px">{{ scope.row.lastModifiedDate }}</span></div>
                  <div>最后修改人:<span style="margin-left: 10px">{{ scope.row.lastLoginDate }}</span></div>
                </div>
                <i class="el-icon-more CellToolButton"></i>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="TablePaginationFrame">
          <el-col :span="12">
            <el-pagination class="TablePagination" @current-change="currentPageChangeHandle"
                           layout="prev, pager, next, total" :total="$store.state.department.duPageTotal" :page-size="$store.state.department.pageSize">
            </el-pagination>
          </el-col>
        </div>
      </div>
      <!-- 添加用户对话框 -->
      <el-dialog title="添加用户" :visible.sync="addUserFormVisible" :modal=true :modal-append-to-body=false :close-on-click-modal=false width="400px" top="30px">
        <el-form :model="addUserForm" :rules="addUserFormRules" ref="addUserForm" label-width="100px" class="demo-ruleForm" status-icon size="small" :inline-message="true">
          <el-form-item label="域账户:" prop="username">
            <el-input v-model="addUserForm.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名(中文):" prop="cnName">
            <el-input v-model="addUserForm.cnName"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input type="password" v-model="addUserForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码确认:" prop="checkPassword">
            <el-input type="password" v-model="addUserForm.checkPassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式:" prop="phone">
            <el-input v-model="addUserForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetAddForm('addUserForm')" size="mini">取 消</el-button>
          <el-button type="primary" @click="submitAddForm ('addUserForm')" size="mini">添 加</el-button>
        </div>
      </el-dialog>
      <!-- 添加部门对话框 -->
      <el-dialog title="新增部门" :visible.sync=addDepartmentFormVisible :modal=true :modal-append-to-body=false :close-on-click-modal=false width="600px" top="30px">
        <el-form :model="addDepartmentForm" :rules="addDepartmentFormRules" ref="addDepartmentForm" label-width="100px" class="demo-ruleForm" status-icon size="small" :inline-message="true"
                 @close="closeAddDepartmentDialog('addDepartmentForm')">
          <el-form-item label="部门名称:" prop="name">
            <el-input v-model="addDepartmentForm.name"></el-input>
          </el-form-item>
          <el-form-item label="上级部门:" prop="parentName">
            <el-input v-model="addDepartmentForm.parentName" :disabled=true></el-input>
          </el-form-item>
        </el-form>
        <el-transfer v-model="checkedRole" :data="$store.state.department.departmentRoleList" :titles="['角色列表', '已选角色']"></el-transfer>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeAddDepartmentDialog('addDepartmentForm')" size="mini">取消</el-button>
          <el-button type="primary" @click="addDepartmentSubmit('addDepartmentForm')" size="mini">提交</el-button>
        </div>
      </el-dialog>
      <!-- 修改部门对话框 -->
      <el-dialog title="修改部门" :visible.sync=updateDepartmentFormVisible :modal=true :modal-append-to-body=false :close-on-click-modal=false width="600px" top="30px">
        <el-form :model="addDepartmentForm" :rules="addDepartmentFormRules" ref="updateREF" label-width="100px" class="demo-ruleForm" status-icon size="small" :inline-message="true">
          <el-form-item label="部门名称:" prop="name">
            <el-input v-model="addDepartmentForm.name"></el-input>
          </el-form-item>
        </el-form>
        <el-transfer v-model="updateCheckedRole" :data="$store.state.department.departmentRoleList" :titles="['角色列表', '已选角色']"></el-transfer>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetUpdateDepartment('updateREF')" size="mini">取消</el-button>
          <el-button type="primary" @click="updateDepartmentSubmit('updateREF')" size="mini">修改</el-button>
        </div>
      </el-dialog>
      <!-- 查看部门详细信息 -->
      <el-dialog title="部门信息" :visible.sync=departmentInfoVisible :modal=true :modal-append-to-body=false
                 @close="closeDepartmentInfoDialog('departmentInfo')" :close-on-click-modal=false width="400px" top="30px">
        <el-form :model="departmentInfo" ref="departmentInfo" label-width="100px" status-icon size="small" :inline-message="true">
          <el-form-item label="部门名称:" prop="name">
            <div class="InfoStyle">{{this.departmentInfo.name}}</div>
          </el-form-item>
          <el-form-item label="部门等级:" prop="level">
            <div class="InfoStyle">{{this.departmentInfo.level}}</div>
          </el-form-item>
          <el-form-item label="部门创建时间:" prop="createDate">
            <div class="InfoStyle">{{this.departmentInfo.createDate}}</div>
          </el-form-item>
          <el-form-item label="部门修改时间:" prop="modifiedDate">
            <div class="InfoStyle">{{this.departmentInfo.modifiedDate}}</div>
          </el-form-item>
          <el-form-item label="部门角色:" prop="roles">
            <el-tag :key="tag" v-for="tag in departmentInfo.roles" :disable-transitions="false">{{tag}}</el-tag>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDepartmentInfoDialog('departmentInfo')" size="mini">关闭</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
import {mapState, mapActions} from 'vuex'

export default {
  name: 'system-department',

  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.addUserForm.checkPassword !== '') {
          this.$refs.addUserForm.validateField('checkPassword')
        }
        callback()
      }
    }

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addUserForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      addUserForm: {
        id: '',
        username: '',
        cnName: '',
        password: '',
        checkPassword: '',
        phone: '',
        loginStatus: ''
      },
      addDepartmentForm: {
        id: '',
        parentName: '',
        name: '',
        level: '',
        pid: '',
        createDate: '',
        modifiedDate: ''
      },
      departmentInfo: {
        id: '',
        name: '',
        level: '',
        pid: '',
        createDate: '',
        modifiedDate: '',
        roles: []
      },

      addDepartmentFormRules: {
        name: [
          {required: true, message: '部门名称不能为空值', trigger: ['change', 'blur']},
          {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: ['change', 'blur']}]
      },

      addUserFormRules: {
        username: [
          {required: true, message: '域账号不能为空值', trigger: ['change']},
          {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: ['change', 'blur']}],
        cnName: [
          {required: true, message: '姓名不能为空值', trigger: ['change']},
          {min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: ['change', 'blur']}],
        password: [
          { validator: validatePass, trigger: ['change', 'blur'] },
          {required: true, message: '请输入密码', trigger: 'change'},
          {min: 8, max: 12, message: '长度在 8 到 12 个字符', trigger: ['change', 'blur']}],
        checkPassword: [
          { validator: validatePass2, trigger: ['change', 'blur'] },
          {required: true, message: '请再次输入密码', trigger: 'change'},
          {min: 8, max: 12, message: '长度在 8 到 12 个字符', trigger: ['change', 'blur']}],
        phone: [
          {required: true, message: '联系方式不能为空值', trigger: ['change']},
          {min: 7, max: 11, message: '长度在 7 到 11 个字符', trigger: ['change', 'blur']}]
      },

      treeProps: {
        label: 'name',
        children: 'childrenList'
      },
      /*
       * 添加用户对话框是否显示
       */
      addUserFormVisible: false,

      contextMenuTrigger: false,

      departmentUserTableSelection: [],

      contextMenuNodeID: 0,

      addDepartmentFormVisible: false,

      updateDepartmentFormVisible: false,

      departmentInfoVisible: false,

      checkedRole: [],

      updateCheckedRole: [],

      tableHeaderStyle: {
        backgroundColor: '#F4F4F4'
      }
    }
  },

  computed: {
    ...mapState([
      'departmentTree', 'departmentTotal'
    ])
  },

  methods: {
    handleNodeClick (data, node) {
      this.$store.state.department.duCurrentDepartmentItem = data
      this.$store.state.department.duIsClickNode = true
      this.getDepartmentUserListAction(1)
    },
    currentPageChangeHandle (val) {
      this.getDepartmentUserListAction(val).then(v => {
        if (v !== 'success') {
          this.$notify({
            title: '错误',
            message: '请求数据错误！',
            type: 'error'
          })
        }
      })
    },
    handleSelectionChange (val) {
      this.departmentUserTableSelection = val
    },
    handleAddUser () {
      this.addUserFormVisible = true
    },
    /*
     * 部门详细信息显示
     */
    showDepartmentInfo (formName) {
      if (this.$store.state.department.duCurrentDepartmentItem === null) {
        this.$message({
          message: '请先选择部门！',
          type: 'warning'
        })
      } else {
        this.departmentInfoVisible = true
        this.$nextTick(() => {
          this.$refs[formName].resetFields()
          this.departmentInfo.id = this.$store.state.department.duCurrentDepartmentItem.id
          this.departmentInfo.name = this.$store.state.department.duCurrentDepartmentItem.name
          this.departmentInfo.level = this.$store.state.department.duCurrentDepartmentItem.level
          this.departmentInfo.createDate = this.$store.state.department.duCurrentDepartmentItem.createDate
          this.departmentInfo.modifiedDate = this.$store.state.department.duCurrentDepartmentItem.modifiedDate
          this.getDepartmentRoles(this.departmentInfo.id).then(v => {
            if (v.msg === 'success') {
              this.departmentInfo.roles = []
              v.list.forEach((item) => {
                this.departmentInfo.roles.push(item.name)
              })
            }
          })
        })
      }
    },
    /*
     *
     */
    closeDepartmentInfoDialog (formName) {
      this.$refs[formName].resetFields()
      this.departmentInfoVisible = false
    },
    /*
     * 弹出更新部门对话框
     */
    updateDepartment (formName) {
      if (this.$store.state.department.duCurrentDepartmentItem === null) {
        this.$message({
          message: '请先选择部门！',
          type: 'warning'
        })
      } else {
        this.updateDepartmentFormVisible = true
        this.addDepartmentForm.id = this.$store.state.department.duCurrentDepartmentItem.id
        this.addDepartmentForm.name = this.$store.state.department.duCurrentDepartmentItem.name
        this.addDepartmentForm.level = this.$store.state.department.duCurrentDepartmentItem.level
        this.addDepartmentForm.pid = this.$store.state.department.duCurrentDepartmentItem.pid
        this.getRoleListKVAction()
        this.departmentHadRoleAction(this.addDepartmentForm).then(v => {
          if (v.msg === 'success') {
            this.updateCheckedRole = []
            v.list.forEach((item) => {
              this.updateCheckedRole.push(item)
            })
          }
        })
      }
    },
    /*
     * 提交部门修改方法
     */
    updateDepartmentSubmit (formName) {
      let request = {
        ids: this.updateCheckedRole,
        modelObject: this.addDepartmentForm
      }
      this.updateDepartmentAction(request).then(v => {
        if (v === 'success') {
          this.$refs[formName].resetFields()
          this.updateDepartmentFormVisible = false
          this.getDepartmentTreeAction()
          this.$notify({
            title: '成功',
            message: '成功修改部门！',
            type: 'success'
          })
        } else {
          this.$refs[formName].resetFields()
          this.updateDepartmentFormVisible = false
          this.$notify({
            title: '错误',
            message: '发生错误！',
            type: 'error'
          })
        }
      })
    },
    /*
     *  关闭更新表单
     */
    resetUpdateDepartment (formName) {
      this.$refs[formName].resetFields()
      this.updateDepartmentFormVisible = false
    },
    /*
     * 提交部门添加方法
     */
    addDepartmentSubmit (formName) {
      this.addDepartmentForm.level = this.$store.state.department.duCurrentDepartmentItem.level + 1
      this.addDepartmentForm.pid = this.$store.state.department.duCurrentDepartmentItem.id
      let request = {
        ids: this.checkedRole,
        modelObject: this.addDepartmentForm
      }
      this.addDepartmentAction(request).then(v => {
        if (v.msg === 'success') {
          this.$refs[formName].resetFields()
          this.addDepartmentFormVisible = false
          this.getDepartmentTreeAction()
          this.$notify({
            title: '成功',
            message: '成功添加部门！',
            type: 'success'
          })
        } else {
          this.$refs[formName].resetFields()
          this.addDepartmentFormVisible = false
          this.$notify({
            title: '错误',
            message: '发生错误！',
            type: 'error'
          })
        }
      })
    },
    /*
     * 新增部门的方法
     */
    addNewDepartment (formName) {
      if (this.$store.state.department.duCurrentDepartmentItem === null) {
        this.$message({
          message: '请先选择部门！',
          type: 'warning'
        })
      } else {
        this.addDepartmentFormVisible = true
        this.$nextTick(() => {
          this.$refs[formName].resetFields()
        })
        // 设置form的parentName为当前树节点的name
        this.addDepartmentForm.parentName = this.$store.state.department.duCurrentDepartmentItem.name
        console.log(this.addDepartmentForm.parentName)
        this.addDepartmentForm.pid = this.$store.state.department.duCurrentDepartmentItem.id
        this.getRoleListKVAction()
        this.departmentHadRoleAction(this.addDepartmentForm).then(v => {
          if (v.msg === 'success') {
            this.checkedRole = []
            v.list.forEach((item) => {
              this.checkedRole.push(item)
            })
          }
        })
      }
    },
    closeAddDepartmentDialog (formName) {
      this.$refs[formName].resetFields()
      this.addDepartmentFormVisible = false
    },
    /*
     * 部门增加用户方法
     */
    departmentAddUser () {
      if (this.$store.state.department.duCurrentDepartmentItem === null) {
        this.$message({
          message: '请先点击部门！',
          type: 'warning'
        })
      } else {
        this.addUserFormVisible = true
      }
    },
    /*
     * 部门删除用户方法
     */
    deleteDepartmentUser (row) {
      this.$confirm('确认删除 "' + row.username + '" 的用户信息?')
        .then(_ => {
          this.deleteDepartmentUserAction(row.id).then(v => {
            if (v === 'success') {
              // 删除资源后刷新该页面
              this.$notify({
                title: '成功',
                message: '成功删除用户！',
                type: 'success'
              })
            } else {
              // this.getDepartmentUserListAction(this.$store.state.department.duCurrentPage)
              this.$notify({
                title: '错误',
                message: '删除用户发生错误！',
                type: 'error'
              })
            }
            this.getDepartmentUserListAction(this.$store.state.department.duCurrentPage)
          })
        })
        .catch(_ => {})
    },
    /*
     * 批量删除部门用户的方法
     */
    departmentBatchDeleteUser () {
      let ids = []
      this.departmentUserTableSelection.map((item) => {
        ids.push(item.id)
      })
      if (ids.length === 0) {
        this.$message({
          message: '请选择要删除的用户！',
          type: 'warning'
        })
      } else {
        this.$confirm('确认删除选择的用户?')
          .then(_ => {
            this.batchDeleteDepartmentUserAction(ids).then(v => {
              if (v === 'success') {
                this.getDepartmentUserListAction(this.$store.state.department.duCurrentPage)
                this.$notify({
                  title: '成功',
                  message: '成功删除部门用户！',
                  type: 'success'
                })
              } else {
                this.$notify({
                  title: '错误',
                  message: '删除部门用户发生错误！',
                  type: 'error'
                })
              }
            })
          }).catch(() => {})
      }
    },
    // 部门树添加用户提交方法
    submitAddForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addUserForm.id = this.$store.state.department.duCurrentDepartmentItem.id
          // this.addUserForm.loginStatus = this.$store.state.department.duCurrentDepartmentItem.level
          this.addUserByDepartmentIdAction(this.addUserForm).then(v => {
            if (v.msg === 'success') {
              this.pushDepartmentUserListAction(v.list)
              this.$refs[formName].resetFields()
              this.addUserFormVisible = false
              this.$notify({
                title: '成功',
                message: '成功新建用户！',
                type: 'success'
              })
            } else {
              this.$refs[formName].resetFields()
              this.addUserFormVisible = false
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
    resetAddForm (formName) {
      this.$refs[formName].resetFields()
      this.addUserFormVisible = false
    },
    ...mapActions({
      getDepartmentTreeAction: 'getDepartmentTreeAction',
      getDepartmentUserListAction: 'getDepartmentUserListAction',
      addUserByDepartmentIdAction: 'addUserByDepartmentIdAction',
      pushDepartmentUserListAction: 'pushDepartmentUserListAction',
      deleteDepartmentUserAction: 'deleteDepartmentUserAction',
      batchDeleteDepartmentUserAction: 'batchDeleteDepartmentUserAction',
      getAllUserListAction: 'getAllUserListAction',
      getRoleListKVAction: 'getRoleListKVAction',
      addDepartmentAction: 'addDepartmentAction',
      departmentHadRoleAction: 'departmentHadRoleAction',
      updateDepartmentAction: 'updateDepartmentAction',
      getDepartmentRoles: 'getDepartmentRoles'
    })
  },

  mounted () {
    this.getDepartmentTreeAction()
    this.getDepartmentUserListAction(1)
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
    border-bottom: 0px solid #efefef;
  }
  .TreeTools {
    margin-top: 35px;
    width: 100%;
    height: 30px;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
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
    border-top: 0px solid #efefef;
  }

  .TreePaginationFrame {
    height: 45px;
    background-color: transparent;
    border-top: 1px solid #efefef;
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
  .custom-tree-node {
    color: midnightblue;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .el-tag {
    margin-left: 5px;
    margin-bottom: 5px;
    background-color: gainsboro;
  }
  .InfoStyle {
    font-size: 12px;
    color: #BF6730;
    padding-left: 6px;
  }
</style>
