<template>
    <div class="page">
        <a href="javascript:" v-on:click="__previousPage" ><img src="../assets/images/icon_l_arrow.png" alt=""></a>
        <a href="javascript:" v-on:click="n!='...'?__skipPage(n):''" v-for="(n, i) in pagesCount"  v-bind:key="i" v-bind:class="{active:n==currentPage}" >{{n}}</a>
        <a href="javascript:" v-on:click="__nextPage" ><img src="../assets/images/icon_r_arrow.png" alt=""></a>
        <span>10条/页</span>
        <span>跳至<input type="text" v-model="skipPageNumber">页</span>
        <button class="go" v-on:click="__skipPage(skipPageNumber)" >Go</button>
      </div>
</template>
<script>
export default {
  data() {
    return {
      /**当前条目数 */
      currentMeshNumber: 10,
      currentPage: this.$props.pageIndex,
      skipPageNumber: 10
    };
  },
  computed: {
    pagesCount() {
      let start = this.currentPage;
      let end = this.currentMeshNumber;
      let list = [];
      if (start > end / 2) {
        start = start - end / 2 + 1;
      }
      else {
        start = 1;
      }
      if (start > end - 7) {
        list.push("...");
      }
      for (let i = 0; start < this.totalPages && i < end - 1; i++) {
        list.push(start++);
      }
      list.push(start < this.totalPages - 7 ? "..." : start);
      return list;
    }
  },
  methods: {
    __previousPage() {
      if (this.currentPage <= 1) return;
      this.$props.previousPage(--this.currentPage, this.currentMeshNumber);
    },
    __nextPage() {
      if (this.currentPage >= this.$props.totalPages) return;
      this.$props.nextPage(++this.currentPage, this.currentMeshNumber);
    },
    __skipPage(v) {
      if (this.currentPage <= 1) return;
      if (this.currentPage >= this.$props.totalPages) return;
      this.$props.nextPage((this.currentPage = v, this.currentMeshNumber));
    }
  },
  props: {
    currentMeshNumbers: {
      type: Array,
      default: function() {
        return [5, 10, 15, 20, 40, 60, 100, 150, 200];
      }
    },
    pageIndex: {
      //当前页码
      type: Number,
      default: 5
    },
    pageSize: {
      //当前页数
      type: Number,
      default: 1
    },
    tatal: {
      //总条目数
      type: Number,
      default: 0
    },
    totalPages: {
      //条页数
      type: Number,
      default: 200
    },
    previousPage: {
      type: Function,
      default: function(v) {}
    },
    nextPage: {
      type: Function,
      default: function(v) {}
    },
    skipPage: {
      type: Function,
      default: function(v) {}
    },
    loadPageDatas: {
      type: Function,
      default: function(v) {}
    }
  }
};
</script>
