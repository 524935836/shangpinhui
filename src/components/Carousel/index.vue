<template>
  <!--banner轮播-->
  <div class="swiper-container" ref="carousel">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in bannerList" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: 'Carousel',
  data() {
    return {
      mySwiper: null
    }
  },
  props: ['bannerList'],
  watch: {
    bannerList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.mySwiper && this.mySwiper.destroy()
          this.mySwiper = new Swiper(this.$refs.carousel, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            // 每次追加后，重新初始化swiper
            observer: true,
            observeParents: true
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
