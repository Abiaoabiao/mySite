<template>
  <transition-group tag="ul" name="todo" class="data-list-container">
    <li v-for="item in list" :key="item.id">
      <Avatar :url="item.avatar" :size="44" />
      <div class="data">
        <div class="nickname">{{ item.nickname }}</div>
        <div class="content">{{ item.content }}</div>
        <div class="time">{{ formatDate(item.createDate, true) }}</div>
      </div>
    </li>
  </transition-group>
</template>

<script>
import Avatar from "@/components/Avatar";
import { formatDate } from "@/utils";
export default {
  components: {
    Avatar,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.data-list-container {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  display: flex;
  border-bottom: 1px solid lighten(@gray, 20%);
  padding: 15px 0;
}
.avatar-container {
  margin-right: 15px;
}
.nickname {
  color: darken(@success, 10%);
  margin-bottom: 10px;
}
.content {
  font-size: 14px;
}
.data {
  flex: 1 1 auto;
  position: relative;
}
.time {
  position: absolute;
  right: 0;
  top: 5px;
  font-size: 12px;
  color: @gray;
}
.todo-enter {
  opacity: 0;
  transform: translateX(-100%);
}
.todo-enter-active,
.todo-leave-active,
.todo-move {
  transition: 0.5s;
}
.todo-enter-active:nth-child(1) {
  transition-delay: 0s;
}
.todo-enter-active:nth-child(2) {
  transition-delay: 0.15s;
}
.todo-enter-active:nth-child(3) {
  transition-delay: 0.3s;
}
.todo-enter-active:nth-child(4) {
  transition-delay: 0.45s;
}
.todo-enter-active:nth-child(5) {
  transition-delay: 0.6s;
}
.todo-enter-active:nth-child(6) {
  transition-delay: 0.75s;
}
.todo-enter-active:nth-child(7) {
  transition-delay: 0.9s;
}
.todo-enter-active:nth-child(8) {
  transition-delay: 1.05s;
}
.todo-enter-active:nth-child(9) {
  transition-delay: 1.2s;
}
.todo-enter-active:nth-child(10) {
  transition-delay: 1.35s;
}
</style>
