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
      let i = 1;
      let start = 1;
      let end = 10;
      let list = [];

      start = this.currentPage > 5 ? this.currentPage : 5;
      if (this.currentPage + 5 >= this.totalPages) start = this.totalPages - 5;

      for (i = 1; i < 5; i++) list.unshift(start--);
      if (start > 1) list.unshift("...");
      list.unshift(1);

      start = this.currentPage > 5 ? this.currentPage : 5;
      if (this.currentPage + 5 >= this.totalPages) start = this.totalPages - 5;

      for (i = 1; i < 5; i++) list.push(++start);
      if (start < this.totalPages-1) list.push("...");
      list.push(this.totalPages);

      return list;
    }
  },
  methods: {
    __previousPage() {
      if (this.currentPage <= 1) return;
      this.$props.previousPage(--this.currentPage);
    },
    __nextPage() {
      if (this.currentPage >= this.totalPages) return;
      this.$props.nextPage(++this.currentPage);
    },
    __skipPage(v) {
      if (v < 1) v = 1;
      if (v >= this.totalPages) v = this.totalPages;
      this.$props.nextPage((this.currentPage = v));
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
