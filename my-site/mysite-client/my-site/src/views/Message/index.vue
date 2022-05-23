<template>
  <div class="message-container" ref="messageContainer">
    <div class="background">
      <div class="divider-horizontal divider">
        <div class="divider__textis-center divider__text">
          <span class="message">留言板</span>
        </div>
      </div>
      <div data-v-0a3f17e0="" class="title">
        <p
          data-v-0a3f17e0=""
          data-aos="fade-right"
          class="aos-init aos-animate"
        >
          推心置腹的谈话就是心灵的展示！
        </p>
      </div>
      <MessageArea
        title="留言板"
        :subTitle="`(${data.total})`"
        :isListLoading="isLoading"
        :list="data.rows"
        @submit="handleSubmit"
      />
      <div v-if="!hasMore" class="bottom">
      已经到底了...😂
    </div>
    </div>
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import * as msgApi from "@/api/message.js";
import mainScroll from "@/mixins/mainScroll.js";
export default {
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("messageContainer")],
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    async fetchData() {
      return msgApi.getMessages(this.page, this.limit);
    },
    handleScroll(dom) {
      if (this.isLoading || !dom) {
        // 目前正在加载更多
        return;
      }
      const range = 100; // 顶一个可接受的范围，在这个范围内都算达到了底部
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        this.fetchMore();
      }
    },
    // 加载下一页
    async fetchMore() {
      if (!this.hasMore) {
        // 没有更多啦
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async handleSubmit(data, callback) {
      const resp = await msgApi.postMessage(data);
      callback("感谢您的留言");
      this.data.rows.unshift(resp);
    },
  },
};
</script>

<style scoped>
.divider-horizontal {
  display: block;
  height: 1px;
  width: 700px;
  margin: 24px auto;
}
.divider {
  background-color: #b4b8bc;
  position: relative;
}
.divider__textis-center {
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
.title {
  font-size: 2.1em;
  text-align: center;
  padding-top: 10px;
}
p {
  line-height: 1.75;
  font-family: STXingkai, STXinwei, STKaiti, STLiti, Xingkai SC, KaiTi,
    Microsoft Yahei, SimSun;
}
.background{
  width: 700px;
  margin: 0 auto;
  box-shadow: rgb(212,227,240 / 5%) 0px 0px 10px 15px;
  background-color:transparent;
      
}

.divider__text {
  position: absolute;
  padding: 0 20px;
  color: #303133;
  font-weight: 500;
  font-size: 14px;
}
.message {
  font-size: 3.2em;
  font-weight: 700;
  background: transparent;
  font-family:STXingkai;
}

.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
  background: url(~@/assets/background3.jpg) center center no-repeat no-repeat
    fixed #6a6b6f;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
  margin-top: 50px;
}
.bottom{
  display: flex;
  padding:20px;
  color:red;
  font-size: 20px;
  font-family: 	STXinwei;
  justify-content: center;
}
</style>
