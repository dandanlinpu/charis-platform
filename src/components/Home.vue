<template>
  <el-container class="HomeContainer">
    <el-header class="HomeHeader">
      <el-row :gutter="20">
        <el-col class="HeaderGutter" :span="1">
          <img class="LogoImage" :src="sysLogo" />
        </el-col>
        <el-col class="HeaderGutter" :span="2">
          <el-row class="HomeDes" style="top:10px;"><span>{{sysDesUp}}</span></el-row>
          <el-row class="HomeDes"><span>{{sysDesDown}}</span></el-row>
        </el-col>
        <el-col class="HeaderGutter" :span="6">
        </el-col>
        <el-col class="HeaderGutter" :span="7">
          <div class="HomeLinkButton">
            <el-menu :default-active="activeIndex" class="HomeMenu" text-color="#5C5C5C" active-text-color="#F78432" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1"><icon class="HomeIcon" name="home" scale="1" ></icon><span>   主页</span></el-menu-item>
              <el-menu-item index="2"><icon class="HomeIcon" name="rocket" scale="0.9" ></icon><span>   应用</span></el-menu-item>
              <el-menu-item index="3"><icon class="HomeIcon" name="map" scale="0.8" ></icon><span>   运维</span></el-menu-item>
              <el-menu-item index="4"><icon class="HomeIcon" name="area-chart" scale="0.9" ></icon><span>   分析</span></el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <el-col class="HeaderGutter" :span="4">
          <el-input class="HeaderSearch" prefix-icon="el-icon-search" size="small"></el-input>
        </el-col>
        <el-col class="HeaderGutter" :span="1">
        </el-col>
        <el-col class="HeaderGutter" :span="3">
          <el-dropdown class="HomeUser" style="margin-left: 20px;" trigger="hover">
            <span class="el-dropdown-link">
              <icon name="user-circle" class="HomeIcon" scale="1" ></icon>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="HomeUserItem" @click.native="login">登录</el-dropdown-item>
              <el-dropdown-item class="HomeUserItem">我的消息</el-dropdown-item>
              <el-dropdown-item class="HomeUserItem">设置</el-dropdown-item>
              <el-dropdown-item class="HomeUserItem" @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-tooltip class="item" effect="dark" content="设置" placement="bottom">
            <icon name="cogs" class="HomeIcon" style="margin-left: 20px;"  scale="1" ></icon>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-header>
    <el-dialog title="用户登录" :visible.sync="loginFormVisible" :modal=true :modal-append-to-body=false :close-on-click-modal=false
               :inline-message="true" status-icon size="small" width="400px">
      <el-form :model="userForm" label-width="100px">
        <el-form-item label="域账号:">
          <el-input v-model="userForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input  type="password" v-model="userForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="text" style="font-size: 12px;margin-left: 26px" @click="forgetPassword">忘记密码？</el-button>
          <el-button type="text" style="font-size: 12px;margin-left: 45px" @click="forgetPassword">无可用账号?</el-button>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="loginFormVisible = false" >取 消</el-button>
        <el-button type="primary" @click="loginFormVisible = false" >确 定</el-button>
      </div>
    </el-dialog>
    <el-container>
      <el-main>
        <div style="margin-top:0px;">
          <router-view></router-view>
        </div>
      </el-main>
      <el-footer>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'home',
  data () {
    return {
      activeIndex: '1',
      sysLogo: '../../static/image/mllogo.svg',
      sysDesUp: 'AtomChris',
      sysDesDown: 'Platform',

      loginFormVisible: false,

      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleOpen (key, keyPath) { //未使用
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {  //未使用
      console.log(key, keyPath)
    },

    handleSelect (key, keyPath) {
      switch (key) {
        case '1':
          this.$router.push('/SystemManage')
          break
        case '2':
          this.$router.push('/LoginManage/Login')
          break
        case '3':
          this.$router.push('/OAMManage')
          break
        case '4':
          this.$router.push('/Page1')
          break
      }
    },

    login () {
      this.loginFormVisible = true
    },

    forgetPassword () {
    }
  }
}
</script>

<style scoped>
  .HomeContainer {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #F7F7F7;
    margin: -8px -8px;
    font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .HeaderSearch {
    margin-top: 13px;
    border: 0 none;
    border-bottom: 0px solid #F78432;
  }
  .HomeHeader {
    background-color: #F7F7F7;
    height: 60px;
    width: 100%;
    border-bottom: 0px solid #EEE;
  }
  .HomeLinkButton {
    color: #5C5C5C;
    background-color: #F7F7F7;
    font-size: small;
  }
  .HomeMenu, .HomeMenu:hover {
    background-color: #F7F7F7;
    border-bottom: 0px;
    border-bottom: transparent;
  }
  .el-menu--horizontal .el-menu-item,
  .el-menu--horizontal>.el-menu-item.is-active,
  .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
    border-bottom: transparent;
    background-color: transparent;
    font-size: 10px;
  }
  .HomeUser, .HomeIcon, .el-dropdown-link {
    outline: none;
  }
  .HomeIcon:hover {
    color: #CC5ABB;
    outline: none;
  }
  .HomeIcon:visited {
    color: midnightblue;
    outline: none;
  }
  .HomeUser {
    margin-top: 22px;
  }
  .HomeUserItem:hover {
    background-color: transparent;
  }
  .LogoImage {
    width: 30px;
    height: 30px;
    margin-top: 15px;
    margin-left: 18px;
    outline: none;
  }
  .HomeDes {
    color: #4D4D4D;
    font-weight: bold;
    line-height: 25px;
    height: 25px;
    font-size: 12px;
  }
  .HeaderGutter {
    min-height: 60px;
  }

  .el-input {
    width: 200px;
  }
</style>
