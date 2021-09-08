<template>
  <ui-link v-bind="attrs" class="ui hello">Hello {{ name }}</ui-link>
</template>
<script lang="ts">
// import { defineComponent, PropType } from 'vue-demi'
import { defineComponent, PropType, toRefs } from 'vue-demi'
import { Linkable } from '../link'

export default defineComponent({
  name: 'ui-hello',
  mixins: [ Linkable('button') ],
  props: {
    primary: {
      type: Boolean as PropType<boolean>,
      default: () => false
    },
    name: {
      type: String as PropType<string>,
      default: () => 'World'
    }
  },
  setup(props, { attrs }) {
    const { primary } = toRefs(props)
    return {attrs, primary}
  },
})
</script>
<style lang="postcss">
.ui {
  &.hello {
    @apply border-0 inline-block;
    @apply bg-gray-300 px-4 py-2 rounded font-semibold cursor-pointer text-gray-900;

    text-decoration: inherit;

    &:hover {
      @apply shadow;
    }

    &:disabled {
      @apply bg-opacity-50;
    }

    &.primary {
      background-color: var(--ui-color-primary);
    }
  }
}
</style>