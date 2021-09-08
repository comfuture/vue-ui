<template>
  <ui-link v-bind="attrs" :class="['ui button', {primary, secondary, outline}]">
    <slot />
  </ui-link>
</template>
<script lang="ts">
import '../../assets/base.postcss'
import { defineComponent, PropType, toRefs } from 'vue-demi'
import { Linkable } from '../link'

export default defineComponent({
  name: 'ui-button',
  mixins: [ Linkable('button') ],
  props: {
    primary: {
      type: Boolean as PropType<boolean>,
      default: () => false
    },
    secondary: {
      type: Boolean as PropType<boolean>,
      default: () => false
    },
    outline: {
      type: Boolean as PropType<boolean>,
      default: () => false
    },
    to: {
      description: 'The link target',
      type: [String, Object] as PropType<string | object>
    }
  },
  setup(props, {attrs}) {
    return { attrs, ...toRefs(props) }
  }
})
</script>
<style lang="postcss">
.ui.button {
  @apply border-0 inline-block;
  @apply bg-gray-300 px-4 py-2 rounded font-semibold cursor-pointer text-gray-900;

  color: var(--ui-default-color);
  background: var(--ui-default-bg);
  text-decoration: inherit;

  &:hover {
    @apply shadow;
  }

  &:disabled {
    @apply bg-opacity-50;
    opacity: var(--ui-disabled-opacity);
  }

  &.primary {
    background-color: var(--ui-primary-bg);
    color: var(--ui-primary-color);
  }

  &.secondary {
    background-color: var(--ui-secondary-bg);
    color: var(--ui-secondary-color);
  }

  &.outline {
    @apply bg-transparent border border-solid;
    border-color: var(--ui-default-bg);

    &.primary {
      color: var(--ui-default-color);
      border-color: var(--ui-primary-bg);
    }

    &.secondary {
      color: var(--ui-default-color);
      border-color: var(--ui-secondary-bg);
    }
  }
}
</style>
