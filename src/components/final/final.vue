<template>
  <div>
    <h2>{{msg}}</h2>
    <hr/>
    <h3>{{$store.state.final.count}}</h3>
    <div>
      <button @click="$store.commit('add')">+</button>
      <button @click="$store.commit('reduce')">-</button>
    </div>
    <div id="WebGL-output">

    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default{
  data () {
    return {
      msg: 'Hello Vuex'
    }
  },

  computed: mapState({
    count: state => state.count
  }),

  methods: {
    ...mapActions({
      drawScene: 'drawScene'
    })
  },

  mounted () {
    this.drawScene()
  }
}
</script>
<style>
  #WebGL-output {
    width: 700px;
    height:500px;
    border: 1px solid black;
  }
</style>
