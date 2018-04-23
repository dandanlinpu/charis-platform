<template>
  <div>
    <h2>{{msg}}</h2>
    <hr/>
    <h3>{{$store.state.codesource.resourceList}}</h3>
    <div>
      <!--<button @click="$store.commit('add')">+</button>-->
      <!--<button @click="$store.commit('reduce')">-</button>-->
      <a @click.prevent="doSomething">123</a>
      <button v-on:click="warn('Form cannot be submitted yet.', $event)">
        Submit
      </button>
      <a v-on:click.stop.prevent="doThat">prevent</a>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
  data () {
    return {
      msg: 'Hello Vuex'
    }
  },

  computed: mapState({
  }),

  methods: {
    doSomething: function () {
      alert('Hello')
    },
    warn: function (message, event) {
      // 现在我们可以访问原生事件对象
      if (event) event.preventDefault()
      alert(message)
    },
    doThat: function () {
      alert('hello')
    },
    ...mapActions({
      getList: 'setResourceListAction'
    })
  },

  mounted () {
    this.getList()
  }
}
</script>
