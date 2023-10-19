<template>
  <div v-if="!props.item.hidden">
    <template v-if="hasOneShowingChild(props.item.children,props.item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!props.item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(props.item.meta&&props.item.meta.icon)" :title="onlyOneChild.meta.name" />
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(props.item.path)" teleported>
      <template slot="title">
        <item v-if="props.item.name" :icon="props.item.meta && props.item.meta.icon" :title="props.item.name" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import { isExternal } from '@/utils/validate'
import Item from './Item.vue'
import AppLink from './Link.vue'
import { ref } from 'vue'
import path from 'path-browserify'


const props = defineProps({
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    });
console.log(props.item.name);
    interface Item {
      hidden: boolean
      component: Object;
      meta: {
        name: string;
      };
      name: string;
      path: string;
    }
  let onlyOneChild = ref({
      children: [],
      meta: {
        icon: '',
        name: ''
      },
      path: '',
      noShowingChildren: false,
    });
  const hasOneShowingChild =  (children = [], parent: any) => {
      const showingChildren = children.filter((item: Item) => {
        if (item?.hidden) {
          return false
        } else {
          Object.assign(onlyOneChild.value, item)
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    };

const resolvePath = (routePath: string) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      return path.resolve(props.basePath, routePath)
    }

    //修复iOS点击不收起的bug，暂时不用

    // const store = useAppStore();
    // const device = computed(() => store.$state.device);
    // const subMenu = ref(null);
    // const fixBugIniOS = () => {
    //   const $subMenu: any = null;
    //   $subMenu.value = subMenu
    //   if ($subMenu) {
    //     const handleMouseleave = $subMenu.handleMouseleave
    //     $subMenu.handleMouseleave = (e: Event) => {
    //       if (device.value === 'mobile') {
    //         return
    //       }
    //       handleMouseleave(e)
    //     }
    //   }
    // }

    // onMounted(() => {
    //   fixBugIniOS()
    // })
</script>
