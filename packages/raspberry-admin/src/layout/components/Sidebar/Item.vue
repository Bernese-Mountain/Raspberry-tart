<template>
  <span>
    <i v-if="icon && icon.includes('el-icon')" :class="[icon, 'sub-el-icon']" />
    <svg-icon v-else-if="icon" :icon-class="icon" />
    <span v-if="props.title" slot="title">{{ props.title }}</span>
  </span>
</template>

<script lang="ts" setup>

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
    required: true
  }
});
console.log('props.title', props.title);
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>