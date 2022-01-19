<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartInfo in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked === 1"
              @change="updateCheckCartList(cartInfo, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <button
              :disabled="isDis || cartInfo.skuNum < 2"
              @click="changeSkuNum('minus', -1, cartInfo)"
              class="mins"
            >
              -
            </button>
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="changeSkuNum('change', $event.target.value * 1, cartInfo)"
            />
            <button @click="changeSkuNum('add', 1, cartInfo)" class="plus" :disabled="isDis">
              +
            </button>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="deleteCartList(cartInfo.skuId)" class="sindelet">删除</a>
            <br />
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAll"
          @change="updateAllCheckedCartList"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCartList">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import debounce from 'lodash/debounce'

export default {
  name: 'ShopCart',
  data() {
    return {
      count: 0,
      isDis: false
    }
  },
  mounted() {
    // 获取购物车列表
    this.getCartList()
  },
  computed: {
    ...mapGetters('cartList', ['cartInfoList']),
    isAll() {
      return this.cartInfoList.every((item) => item.isChecked) && this.cartInfoList.length
    },
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach((item) => {
        if (item.isChecked) {
          sum += item.skuPrice * item.skuNum
        }
      })
      return sum
    }
  },
  methods: {
    ...mapActions('cartList', [
      'getCartList',
      'deleteCart',
      'updateCheckCart',
      'deleteAllCheckedCart',
      'updateAllCheckedCart'
    ]),
    ...mapActions('detail', ['addOrUpdateShopCart']),
    // 改变商品数量
    async changeSkuNum(type, disNum, cartInfo) {
      switch (type) {
        case 'add':
          cartInfo.skuNum++
          this.count++
          disNum = this.count
          break
        case 'minus':
          if (cartInfo.skuNum > 1) {
            cartInfo.skuNum--
            this.count--
          }
          disNum = this.count
          break
        case 'change':
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            disNum = parseInt(disNum) - cartInfo.skuNum
          }
      }
      this.getChangeSkuNum(disNum, cartInfo)
    },
    // 发送改变商品数量请求
    getChangeSkuNum: debounce(async function (disNum, cartInfo) {
      this.isDis = true
      // 修改商品数量
      const res = await this.addOrUpdateShopCart({
        skuId: cartInfo.skuId,
        skuNum: disNum
      })
      if (res.code !== 200) return alert(res.message)
      // 获取购物车列表
      await this.getCartList()
      // 清空count
      this.count = 0
      // 获取购物车列表之前禁止点击
      this.isDis = false
    }, 1000),
    // 删除购物车商品
    async deleteCartList(skuId) {
      const res = await this.deleteCart(skuId)
      if (res.code !== 200) return alert(res.message)
      this.getCartList()
    },
    // 切换商品选中状态
    async updateCheckCartList(cartInfo, event) {
      const isChecked = event.target.checked ? '1' : '0'
      const res = await this.updateCheckCart({ skuId: cartInfo.skuId, isChecked })
      if (res.code !== 200) return alert(res.message)
      this.getCartList()
    },
    // 删除所有选中的商品
    async deleteAllCheckedCartList() {
      let stop = false
      const res = await this.deleteAllCheckedCart()
      // 判断数组内是否报错
      try {
        res.forEach((item) => {
          // console.log(222)
          if (item.code !== 200) {
            stop = true
            // 跳出forEach
            throw new Error(`${item.message}`)
          }
        })
      } catch (err) {
        alert(err.message)
      }
      // 报错跳出回调
      if (stop) return
      // console.log(11111)
      this.getCartList()
    },
    // 改变全部商品的状态
    async updateAllCheckedCartList(event) {
      let stop = false
      const isAllChecked = event.target.checked ? '1' : '0'
      const res = await this.updateAllCheckedCart(isAllChecked)
      // 判断数组内是否报错
      try {
        res.forEach((item) => {
          if (item.code !== 200) {
            stop = true
            // 跳出forEach
            throw new Error(`${item.message}`)
          }
        })
      } catch (err) {
        alert(err.message)
      }
      // 报错跳出回调
      if (stop) return
      this.getCartList()
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 20.8333%;

        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
            cursor: pointer;

            &:hover {
              color: red;
            }
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
        cursor: pointer;

        &:hover {
          color: red;
        }
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
