<template>
  <el-row :gutter="20" >
    <el-col :span="8" :offset=8>
      <div class="LoginPanel" style="height: 325px;margin-top: 100px;">
        <div style="font-size: 12px;margin-left: 15px;margin-top: 10px;color: #999999">用户登录</div>
        <div class="ContentPanel" style="height:250px;margin-top: 10px;background-color: white;">
          <el-form :model="userForm" label-width="100px" style="margin-top: 50px">
            <el-form-item label="域账号:">
              <el-input v-model="userForm.username" auto-complete="off">
                <icon slot="suffix" name="user" class="LoginUserIcon" ></icon>
              </el-input>
            </el-form-item>
            <el-form-item label="密码:">
              <el-input  type="password" v-model="userForm.password" auto-complete="off">
                <icon slot="suffix" name="keyboard-o" class="LoginPassIcon" ></icon>
              </el-input>
            </el-form-item>
            <el-button size="small" style="width: 80px;margin-left: 130px;margin-top: 15px;">申请账号</el-button>
            <el-button size="small" type="danger" style="width: 80px;margin-left: 50px;">登录</el-button>
          </el-form>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'system-login',

  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped>
  .LoginPanel {
    border: 1px solid #E3E3E3;
    border-radius: 4px;
    background: #F5F5F5;
    margin-top: -20px;
    z-index: 1000;
  }
  .ContentPanel {
    border-top: 1px solid #EDEDED;
    border-bottom: 1px solid #EDEDED;
    background: snow;
  }
  .el-input {
    width: 300px;
  }
  .LoginUserIcon {
    padding-top:13px;
    padding-right: 10px;
  }

  .LoginPassIcon {
    padding-top:13px;
    padding-right: 8px;
  }
</style>
