<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { isExternal } from '@/utils/validate'
import { computed } from 'vue';

const prop = defineProps({
  to: {
    type: String,
    default: true,
  }
})
const isExternalLink = computed(() => isExternal(prop.to))

const type = computed(() => isExternalLink ? 'a' : 'router-link');

const linkProps = (to: String) => {
  if (isExternalLink) {
    return {
      href: prop.to,
      target: '_blank',
      rel: 'noopener',
    };
  } else {
    return {
      to: prop.to,
    };
  }
};
</script>

<style lang="scss" scoped>

</style>
