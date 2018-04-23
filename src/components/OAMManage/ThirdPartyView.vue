<template>
  <el-row :gutter="20">
    <el-col :span="1">
      <div class="ToolPanel" style="height: 645px;width: 55px;">
        <el-menu default-active="7-1" class="ToolBar" text-color="#82878E" active-text-color="#C556B4" @select="toolBarSelect">
          <el-menu-item index="7-1">
            <el-tooltip class="item" effect="dark" content="选择器" placement="right">
              <icon class="ToolIcon" name="arrows" scale="1" ></icon>
            </el-tooltip>
          </el-menu-item>
          <el-menu-item index="7-2">
            <el-tooltip class="item" effect="dark" content="创建路径" placement="right">
              <icon class="ToolIcon" name="share-alt" scale="1" ></icon>
            </el-tooltip>
          </el-menu-item>
          <el-menu-item index="7-3">
            <el-tooltip class="item" effect="dark" content="房间管理" placement="right">
              <icon class="ToolIcon" name="home" scale="1" ></icon>
            </el-tooltip>
          </el-menu-item>
          <el-menu-item index="7-4">
            <el-tooltip class="item" effect="dark" content="交换机管理" placement="right">
              <icon class="ToolIcon" name="hdd-o" scale="1" ></icon>
            </el-tooltip>
          </el-menu-item>
          <el-menu-item index="7-5">
            <el-tooltip class="item" effect="dark" content="配线架管理" placement="right">
              <icon class="ToolIcon" name="tasks" scale="1" ></icon>
            </el-tooltip>
          </el-menu-item>
          <el-menu-item index="7-6">
            <el-tooltip class="item" effect="dark" content="信息点管理" placement="right">
              <icon class="ToolIcon" name="pause-circle" scale="1" ></icon>
            </el-tooltip>
          </el-menu-item>
          <el-menu-item index="7-7">
            <el-tooltip class="item" effect="dark" content="信息点管理" placement="right">
              <icon class="ToolIcon" name="pause-circle" scale="1" ></icon>
            </el-tooltip>
          </el-menu-item>
        </el-menu>
      </div>
    </el-col>
    <el-col :span="5">
      <div class="OperatePanel" style="height: 645px;">
        <div style="font-size: 12px;margin-left: 10px;margin-top: 10px;color: #999999">操作数据</div>
        <div class="ContentPanel" style="height:566px;margin-top: 10px;overflow-x:hidden;">
          <table v-for="(o, key) in pathPoints" :key="key" class="text item" style="color: #666;">
            <td style="width: 60px;"><el-button type="text" style="white-space: pre;height:30px;font-size: 10px;color: #CC9E8D;">  锚点{{key + 1}}</el-button></td>
            <td style="width: 90px;"><el-tag type="info">{{'x: ' + o.x.toFixed(2)}}</el-tag></td>
            <td style="width: 90px;"><el-tag type="info">{{'y: ' + o.y}}</el-tag></td>
          </table>
        </div>
        <div style="height: 125px">
        </div>
      </div>
    </el-col>
    <el-col :span="18" >
      <div class="canvasPanel" style="height: 645px;">
        <el-button style="padding-top: 13px;margin-left: 15px;color: #999;" type="text" size="mini">画布</el-button>
        <el-button style="padding-top: 13px;float: right;margin-right: 20px" type="text" size="mini" @click="buildPathHandler">
          <icon class="ToolIcon" name="object-ungroup" scale="0.9"></icon> 构建路径
        </el-button>
        <el-button style="padding-top: 13px;float: right;" type="text" size="mini" @click="cleanCanvas">
          <icon class="ToolIcon" name="eraser" scale="0.7" ></icon> 清除画布
        </el-button>
        <div class="ContentPanel" style="height:580px;margin-top: 2px;">
          <canvas id="c" width="985px" height="580" ></canvas>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
//import {fabric} from 'fabric'

export default {
  data () {
    return {
      myCanvas: null,
      /*
       * 当前鼠标位置
       */
      currentPosX: 0,
      currentPosY: 0,
      /*
       * 工具栏图标激活标识
       */
      isObtainObject: true,
      isDrawPath: false,
      /*
       * 画路径相关变量
       */
      lastPointX: 0,
      lastPointY: 0,
      pathPoints: [],
      pathPointsObject: [],

      tableHeaderStyle: {
        height: '0px'
      }
    }
  },

  watch: {
    isDrawPath: function () {
      console.log('路径：' + this.isDrawPath)
      if (this.isDrawPath !== true) {
        // 取消canvas的mousedown监听事件
        this.myCanvas.__eventListeners['mouse:down'] = []
      }
    },
    isObtainObject: function () {
      console.log('抓取：' + this.isObtainObject)
      if (this.isObtainObject !== true) {
        this.myCanvas.__eventListeners['object:moving'] = []
      }
    }
  },

  methods: {
    /*
     * 重置工具栏按钮激活状态
     */
    resetToolBar () {
      this.isObtainObject = false
      this.isDrawPath = false
    },
    /*
     * 工具栏按钮选择
     */
    toolBarSelect (key) {
      switch (key) {
        case '7-1':
          this.resetToolBar()
          this.isObtainObject = true
          this.myCanvas.on('object:moving', this.moveObjectHandler)
          this.setObjectSelection()
          break
        case '7-2':
          this.resetToolBar()
          this.isDrawPath = true
          this.myCanvas.on('mouse:down', this.drawPathHandler)
          this.setObjectSelection()
          break
        case '7-3':
          break
        case '7-4':
          break
        case '7-5':
          break
        case '7-6':
          break
        case '7-7':
          break
      }
    },
    setObjectSelection () {
      if (this.isObtainObject !== true) {
        this.myCanvas.forEachObject(function (o) {
          o.selectable = false
        })
      } else {
        this.myCanvas.forEachObject(function (o) {
          if (o.get('type') !== 'line') {
            o.selectable = true
          } else {
            o.selectable = false
          }
        })
      }
    },
    /*
     * 移动object处理函数
     */
    moveObjectHandler (event) {
      var self = this
      var p = event.target
      p.line1 && p.line1.set({ 'x2': p.left + 5, 'y2': p.top + 5 })
      p.line2 && p.line2.set({ 'x1': p.left + 5, 'y1': p.top + 5 })
      p.line3 && p.line3.set({ 'x1': p.left + 5, 'y1': p.top + 5 })
      p.line4 && p.line4.set({ 'x1': p.left + 5, 'y1': p.top + 5 })
      self.pathPoints[self.pathPointsObject.indexOf(p)].x = p.left
      self.pathPoints[self.pathPointsObject.indexOf(p)].y = p.top
      self.myCanvas.renderAll()
    },
    /*
     * 画布鼠标点击处理事件
     */
    drawPathHandler (event) {
      var self = this
      var pointer = self.myCanvas.getPointer(event.e)
      var drawCircle = self.makeCircle(pointer.x, pointer.y)
      drawCircle.selectable = false
      if (self.pathPoints.length === 0) {
        self.pathPointsObject.push(drawCircle)
        self.pathPoints.push(pointer)
        self.myCanvas.add(drawCircle)
      } else {
        var lastPoint = self.pathPoints[self.pathPoints.length - 1]
        var coords = []
        coords.push(lastPoint.x + 5)
        coords.push(lastPoint.y + 5)
        coords.push(pointer.x + 5)
        coords.push(pointer.y + 5)
        var line = self.makeLine(coords)
        self.pathPointsObject[self.pathPointsObject.length - 1].line2 = line
        drawCircle.line1 = line
        self.pathPointsObject.push(drawCircle)
        self.pathPoints.push(pointer)
        self.myCanvas.add(line, drawCircle)
      }
      self.myCanvas.renderAll()
    },
    /*
     * 画路径中的点
     */
    makeCircle (left, top, line1, line2, line3, line4) {
      var c = new fabric.Circle({
        left: left,
        top: top,
        strokeWidth: 1,
        radius: 5,
        fill: '#515151',
        stroke: '#515151'
      })
      c.hasControls = c.hasBorders = false
      c.line1 = line1
      c.line2 = line2
      c.line3 = line3
      c.line4 = line4
      return c
    },
    makeLine (coords) {
      return new fabric.Line(coords, {
        fill: '#515151',
        stroke: '#515151',
        strokeWidth: 1,
        selectable: false
      })
    },
    /*
     * 构建path图形
     */
    buildPathHandler (event) {
      var self = this
      self.myCanvas.__eventListeners['mouse:down'] = []
      self.myCanvas.clear()
      var pathString = 'M '
      self.pathPoints.forEach((item) => {
        pathString += item.x + ' ' + item.y + ' '
      })
      pathString += 'Z'
      var path = new fabric.Path(pathString)
      path.set({
        left: self.pathPoints[0].x,
        top: self.pathPoints[0].y,
        fill: '#A7ADB3'
      })
      self.myCanvas.add(path)
      self.setObjectSelection()
    },
    /*
     * 清除画布
     */
    cleanCanvas () {
      var self = this
      self.myCanvas.clear()
      self.pathPoints.splice(0, self.pathPoints.length)
      self.pathPointsObject.splice(0, self.pathPointsObject.length)
    }
  },

  mounted: function () {
    var canvas = this.myCanvas = new fabric.Canvas('c')

    var self = this
    /*
     * 实时获取鼠标在canvas中的坐标
     */
    canvas.on('mouse:move', function (event) {
      var pointer = canvas.getPointer(event.e)
      self.currentPosX = pointer.x
      self.currentPosY = pointer.y
    })

    canvas.on('mouse:over', function (event) {
      if (event.target !== null) {
        event.target.set('fill', 'red')
        canvas.renderAll()
      }
    })

    canvas.on('mouse:out', function (e) {
      if (e.target !== null) {
        e.target.set('fill', '#515151')
        canvas.renderAll()
      }
    })
  }
}
</script>
<style>
  .canvasPanel {
    border: 1px solid #E3E3E3;
    background: #F5F5F5;
    margin-top: -20px;
    border-radius: 4px;
    z-index: 1000;
  }
  .ToolPanel {
    border: 1px solid #E3E3E3;
    border-bottom-right-radius: 0px;
    border-top-right-radius: 0px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    background: #F5F5F5;
    margin-top: -20px;
    z-index: 999;
  }
  .OperatePanel {
    border: 1px solid #E3E3E3;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    background: #F5F5F5;
    margin-top: -20px;
    z-index: 998;
  }
  .ContentPanel {
    border-top: 1px solid #EDEDED;
    border-bottom: 1px solid #EDEDED;
    background: #f7f7f7;
  }
  .ToolBar, .ToolBar:hover {
    width: 55px;
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
  .ToolIcon {
    outline: none;
  }
  .AsideGutter {
    margin-top: 150px;
    height: 340px;
    background-color: #545454;
    border-radius: 6px;
    /*border: 1px solid #B4B4B4;*/
  }
</style>
