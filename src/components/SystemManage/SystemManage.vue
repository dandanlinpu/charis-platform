<template>
  <el-container style="margin-left: -19px;">
    <el-aside class="AsideGutter" style="width:55px !important;" width="200px">
      <el-menu default-active="3-1" class="AsideBar" text-color="#FFF" active-text-color="#F78432" @select="handleSelect">
        <el-menu-item index="3-1">
          <el-tooltip class="item" effect="dark" content="部门管理" placement="right">
            <icon class="AsideIcon" name="group" scale="1" ></icon>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="3-2">
          <el-tooltip class="item" effect="dark" content="角色管理" placement="right">
            <icon class="AsideIcon" name="retweet" scale="1" ></icon>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="3-3">
          <el-tooltip class="item" effect="dark" content="权限管理" placement="right">
            <icon class="AsideIcon" name="adjust" scale="1" ></icon>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="3-4">
          <el-tooltip class="item" effect="dark" content="资源管理" placement="right">
            <icon class="AsideIcon" name="puzzle-piece" scale="1" ></icon>
          </el-tooltip>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div>
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>

</template>

<script type="text/ecmascript-6">
export default {
  name: 'system-manage',
  data () {
    return {
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
        case '3-1':
          this.$router.push('/SystemManage/Department')
          break
        case '3-2':
          this.$router.push('/SystemManage/Role')
          break
        case '3-3':
          this.$router.push('/SystemManage/Privilege')
          break
        case '3-4':
          this.$router.push('/SystemManage/Resource')
          break
      }
    }
  }
}
</script>

<style scoped>
  .AsideBar, .AsideBar:hover {
    background-color: transparent;
    border: 0px;
    border: transparent;
    outline: none;
  }
  .el-menu--vertical .el-menu-item,
  .el-menu--vertical>.el-menu-item.is-active,
  .el-menu--vertical>.el-submenu.is-active .el-submenu__title {
    border-right: transparent;
    background-color: transparent;
    font-size: 10px;
    outline: none;
  }
  .menu-item:hover, .el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    background-color: transparent;
    outline: none;
  }
  .AsideIcon {
    outline: none;
  }
  .AsideGutter {
    margin-top: 150px;
    height: 230px;
    background-color: #545454;
    border-radius: 6px;
    /*border: 1px solid #B4B4B4;*/
  }
</style>
