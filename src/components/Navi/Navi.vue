<template>
<el-container class="HomeContainer">
  <el-header class="HomeHeader">
    <el-row :gutter="20">
      <el-col class="HeaderGutter" :span="1">
        <el-row class="HomeDes" style="top:10px;"><span>{{sysDesUp}}</span></el-row>
        <el-row class="HomeDes"><span>{{sysDesDown}}</span></el-row>
      </el-col>
      <el-col class="HeaderGutter HomeLogo" :span="1"><img class="LogoImage" :src="sysLogo" /></el-col>

      <el-col class="HeaderGutter" :span="5"></el-col>
      <el-col class="HeaderGutter" :span="9">
        <el-menu :default-active="activeIndex" class="HomeLinkButton" background-color="#000" text-color="#FFF" active-text-color="#F78432" mode="horizontal" @select="handleSelect">
          <el-menu-item class="HomeMenu" index="1">管理中心</el-menu-item>
          <el-menu-item class="HomeMenu" index="2">业务管理</el-menu-item>
          <el-menu-item class="HomeMenu" index="3">流程管理</el-menu-item>
          <el-menu-item class="HomeMenu" index="4"><a target="_blank">数据分析</a></el-menu-item>
        </el-menu>
      </el-col>

      <el-col class="HeaderGutter" :span="4">
        <el-input class="HeaderSearch" prefix-icon="el-icon-search" size="small"></el-input>
      </el-col>

      <el-col class="HeaderGutter" :span="2">

      </el-col>
      <el-col class="HeaderGutter" :span="2">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img class="userImage" :src="sysUserAvatar" /> {{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside class="HomeAside">
      <el-menu default-active="1" class="AsideBar" @open="handleOpen" @close="handleClose" :collapse="isCollapse" @select="handleSelect">
        <el-menu-item class="AsideItem" index="1">
          <i class="el-icon-menu AsideButton"></i>
          <span slot="title">导航一</span>
        </el-menu-item>
        <el-menu-item class="AsideItem" index="2">
          <i class="el-icon-printer AsideButton"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item class="AsideItem" index="3">
          <i class="el-icon-setting AsideButton"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item class="AsideItem" index="4">
          <i class="el-icon-info AsideButton"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div style="margin-top:10px">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</el-container>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      activeIndex: '1',
      sysDesUp: 'AtomChris',
      sysDesDown: 'Platform',
      sysUserName: 'Chris',
      sysUserAvatar: '../../static/user.png',
      sysLogo: '../../static/mllogo.svg',
      isCollapse: true
    }
  },

  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },

    handleSelect (key, keyPath) {
      switch (key) {
        case '1':
          this.$router.push('/Resource')
          break
        case '2':
          this.$router.push('/final')
          break
        case '3':
          this.$router.push('/Codesource')
          break
        case '4':
          this.$router.push('/Page1')
          break
      }
    }
  }
}
</script>
<style scoped>
.HomeContainer {
  margin: -8px -8px;
  font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.HomeHeader {
  background-color: #000;
  height: 60px;
  width: 100%;
  border-bottom: 0px solid #EEE;
}

.HomeLinkButton {
  font-weight: normal;
  font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  background-color: #000;
  height: 60px;
  width: 100%;
  border-bottom: transparent;
}

.el-menu--horizontal>.el-menu-item.is-active,
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
  border-bottom: transparent;
}

.el-submenu.is-active .el-submenu__title {
  border-bottom: transparent;
}

.HomeMenu {
  border-bottom: transparent;
}

.HomeLogo {
  color: #FFF;
  height: 60px;
  font-size: 18px;
}

.HomeDes {
  color: #FFF;
  font-weight: bold;
  line-height: 25px;
  height: 25px;
  font-size: 12px;
}

.HeaderSearch .el-input__inner {
  border: 0 none;
  border-bottom: 1px solid #F78432;
  border-radius: 0px;
}

.LogoImage {
  width: 30px;
  height: 30px;
  margin-top: 15px;
}

.userImage {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0px 10px 10px;
  float: right;
}

.el-dropdown-link {
  border: 0 none;
  border-bottom: 1px solid #F78432;
  border-radius: 0px;
}

.userinfo-inner {
  cursor: pointer;
  color: #FFF;
  border: 0 none;
}

.HeaderGutter {
  border-radius: 8px;
  height: 60px;
  line-height: 60px;
}

.HeaderSearch {
  border-radius: 8px;
}

.AsideBar,
.AsideBar.is-active,
.AsideBar:not(.el-menu--collapse) {
  width: 40px;
  min-height: 400px;
  border-right: solid 0px;
  color: darksalmon;
  outline: none;
}

.AsideItem,
AsideItem:focus,
AsideItem.is-active {
  background-color: transparent;
  outline: none;
}

.AsideButton:hover,
.AsideButton:focus,
.AsideButton.is-active {
  color: darksalmon;
  background-color: transparent;
  outline: none;
}

.HomeAside {
  width: 50px !important;
}
</style>
