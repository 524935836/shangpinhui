<template>
  <div>
    <!-- 商品分类导航 -->
    <TypeNav></TypeNav>
    <!--列表-->
    <ListContainer></ListContainer>
    <!--今日推荐-->
    <Recommend></Recommend>
    <!-- 商品排行 -->
    <Rank></Rank>
    <!-- 猜你喜欢 -->
    <Like></Like>
    <!-- 楼层 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <!-- 商标 -->
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {}
  },
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed: {
    ...mapState('home', {
      floorList: (state) => state.floorList,
      bannerList: (state) => state.bannerList
    })
  },
  mounted() {
    // 获取轮播图数据
    this.getBannerList()
    // 获取floor数据
    this.getFloorList()
    // 获取用户信息
    this.getUserInfo()
  },
  methods: {
    ...mapActions('home', ['getBannerList', 'getFloorList']),
    ...mapActions('user', ['getUserInfo'])
  }
}
</script>

<style lang="less" scoped></style>
