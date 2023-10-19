<template>
  <div v-if="External" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$attrs" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate'

const props = defineProps({
  iconClass: {
      type: String,
      default: '',
      required: true
    },
    className: {
      type: String,
      default: ''
    },
  });
  const External = isExternal(props.iconClass);
  const iconName = `#icon-${props.iconClass}`;
  const svgClass = () => {
    if (props.className) {
      return 'svg-icon ' + props.className
    } else {
      return 'svg-icon'
    }
  };
  const styleExternalIcon = () => {
    return {
      mask: `url(${props.iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
    }
  };
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
