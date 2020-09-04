<template>
    <my-login/>
</template>
<script>
import MyLogin from '../components/MyLogin'
// import bus from '../event-bus'
export default {
  name: 'Login',
  components: {
    MyLogin
  },
  data () {
    return {

    }
  },
  methods: {

  },
  created () {
    // bus.$on('', this.)
  }
}
</script>
