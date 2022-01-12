<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 获取商品三级分类列表数据
    this.getCategoryList()
    // 获取轮播图数据
    this.getBannerList()
    // 获取floor数据
    this.getFloorList()
  },
  methods: {
    ...mapActions('home', ['getCategoryList']),
    ...mapActions('home', ['getBannerList']),
    ...mapActions('home', ['getFloorList'])
  }
}
</script>

<style lang="less"></style>
