<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <button
      :class="{ cur: pageNo === 1 }"
      v-if="startAndEnd.start > 1"
      @click="$emit('getPageNo', 1)"
    >
      1
    </button>
    <button v-if="startAndEnd.start > 2">···</button>

    <button
      v-for="(page, index) in startAndEnd.end - startAndEnd.start + 1"
      :key="index"
      @click="$emit('getPageNo', continuesPage(page))"
      :class="{ cur: pageNo === continuesPage(page) }"
    >
      {{ continuesPage(page) }}
    </button>

    <button v-if="startAndEnd.end < totalPage - 1">···</button>
    <button
      v-if="startAndEnd.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ cur: pageNo === totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo === totalPage" @click="$emit('getPageNo', pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ this.total }} 条</button>
    <!-- <h2>{{ startAndEnd }}</h2> -->
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {}
  },
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    startAndEnd() {
      let start = 0
      let end = 0
      const { pageNo, totalPage, continues } = this
      // 总页数小于连续的页数
      if (totalPage < continues) {
        start = 1
        end = totalPage
      } else {
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        if (start < 1) {
          start = 1
          end = continues
        }
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    },
    continuesPage() {
      return (page) => {
        return page + this.startAndEnd.start - 1
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &.cur {
      color: white;
      background-color: #e1251b;
      cursor: not-allowed;
    }

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    // &.active {
    //   cursor: not-allowed;
    //   background-color: #409eff;
    //   color: #fff;
    // }
  }
}
</style>
