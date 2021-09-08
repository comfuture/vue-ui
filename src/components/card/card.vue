<template>
  <ui-link v-bind="attrs" :class="['ui card', {shadow}]">
    <img :src="image" v-if="image">
    <ui-item>
      <template #leading><slot name="leading"></slot></template>
      <slot></slot>
      <template #trailing><slot name="trailing"></slot></template>
    </ui-item>
  </ui-link>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue-demi'
import { Linkable } from '../link'
import UiItem from '../item'

export default defineComponent({
  name: 'ui-card',
  mixins: [ Linkable() ],
  components: {
    UiItem
  },
  props: {
    image: String as PropType<string>,
    shadow: Boolean as PropType<boolean>
  },
  setup(props, {attrs}) {
    return {attrs}
  },
})
</script>
<style lang="postcss">
.ui.card {
  @apply flex flex-col overflow-hidden border border-solid border-gray-300;

  &.shadow {
    @apply shadow-lg;
  }

  > img {
    @apply object-cover max-h-64 h-full;
  }

}
</style>
