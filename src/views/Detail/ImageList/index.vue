<template>
  <div class="swiper-container" ref="carousel">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(skuImage, index) in skuImageList" :key="skuImage.id">
        <img
          :src="skuImage.imgUrl"
          @click="changeCurrentIndex(index)"
          :class="{ active: currentIndex === index }"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: 'ImageList',
  data() {
    return {
      mySwiper: null,
      currentIndex: 0
    }
  },
  props: ['skuImageList'],
  watch: {
    skuImageList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.mySwiper && this.mySwiper.destroy()
          this.mySwiper = new Swiper(this.$refs.carousel, {
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            slidesPerView: 'auto',
            slidesPerGroup: 1,
            // 每次追加后，重新初始化swiper
            observer: true,
            observeParents: true
          })
        })
      }
    }
  },
  methods: {
    // 点击改变当前索引的回调
    changeCurrentIndex(index) {
      this.currentIndex = index
      // 将当前索引传给zoom组件
      this.$bus.$emit('getCurrentIndex', this.currentIndex)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
