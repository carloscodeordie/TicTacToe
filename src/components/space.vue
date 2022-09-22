<style>
.space {
  background-color: gray;
  width: 100px;
  height: 100px;
  border: 1px solid rgb(127, 255, 212);
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<template>
  <div class="space" @click="$emit('click')">
    <span v-if="value !== ''">{{ value }}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  }
};
</script>
