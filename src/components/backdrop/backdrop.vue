<template>
  <teleport to="body">
    <transition name="dimmer" appear>
      <div v-show="modelValue" class="ui backdrop" @click="dismiss">
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue-demi'

export default defineComponent({
  name: 'ui-backdrop',
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: () => false
    },
    dismissable: {
      type: Boolean as PropType<boolean>,
      default: () => false
    }
  },
  setup(props, {emit}) {
    const dismiss = (event: any) => {
      const isBox = event?.target.closest('.box')?.classList
      if (isBox) {
        return
      }
      if (props.dismissable) {
        emit('update:modelValue', false)
      }
    }

    return { dismiss }
  }
})
</script>
<style lang="postcss">
.ui.backdrop {
  @apply fixed w-screen top-0 left-0 h-full bg-black bg-opacity-30;
  @apply flex flex-col items-center justify-center;

  z-index: 9999;
}

.dimmer-enter-active, .dimmer-leave-active {
  @apply transition-all ease-in duration-150;
}
.dimmer-enter-from, .dimmer-leave-to {
  @apply opacity-0;
}
</style>