<template>
  <ui-backdrop dismissable :modelValue="modelValue">
    <transition name="grow" appear>
      <div :class="['ui modal', {very, wide}]" v-if="modelValue">
        <ui-item class="header" v-if="$slots.header || title">
          <slot name="header"></slot>
          <h1 v-if="title">{{ title }}</h1>
          <template #trailing>
            <a class="close-button" @click="dismiss">close</a>
          </template>
        </ui-item>
        <div class="body">
          <slot></slot>
        </div>
        <div class="actions" v-if="$slots.actions || !noActions">
          <slot name="actions">
            <ui-button primary @click="handleOk">{{ okLabel }}</ui-button>
            <ui-button>{{ cancelLabel }}</ui-button>
          </slot>
        </div>
      </div>
    </transition>
  </ui-backdrop>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue-demi'
import UiBackdrop from '../backdrop'
import UiButton from '../button'
import UiItem from '../item'

export default defineComponent({
  name: 'ui-modal',
  components: {
    UiBackdrop, UiButton, UiItem
  },
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: () => false
    },
    wide: {
      type: Boolean as PropType<boolean>,
      default: () => false
    },
    very: {
      type: Boolean as PropType<boolean>,
      default: () => false
    },
    noActions: {
      type: Boolean as PropType<boolean>,
      default: () => false
    },
    okLabel: {
      type: String as PropType<string>,
      default: () => 'OK'
    },
    cancelLabel: {
      type: String as PropType<string>,
      default: () => 'Cancel'
    },
    title: {
      type: String as PropType<string>
    }
  },
  setup(props, {emit}) {

    const dismiss = () => {
      emit('update:modelValue', false)
    }

    const handleOk = () => {
      emit('ok')
      dismiss()
    }

    return { handleOk, dismiss }
  },
})
</script>
<style lang="postcss">
.ui.modal {
  @apply max-w-md bg-white rounded shadow-lg flex flex-col;
  width: calc(100% - 20px);
  @screen sm {
    width: inherit;
  }
  max-height: calc(100vh - 20px);

  &.wide {
    @apply max-w-xl;
    &.very {
      @apply max-w-6xl;
    }
  }

  > .header {
    @apply p-2 border-0 border-b border-solid border-gray-300;
    h1 {
      @apply text-lg font-semibold m-0;
    }

    .close-button {
      font-family: 'Material Icons';
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      -moz-osx-font-smoothing: grayscale;
      font-feature-settings: 'liga';
      @apply p-2 cursor-pointer;
    }
  }

  > .body {
    @apply p-2 overflow-auto;
  }

  > .actions {
    @apply p-2 border-0 border-t border-solid border-gray-300 flex justify-end;
    button {
      @apply px-6 mx-2;
    }
  }
}

.grow-enter-active, .grow-leave-active {
  @apply transition-all ease-in duration-150;
}
.grow-enter-active {
  animation: grow .15s ease-out both;
}
.grow-enter-from, .grow-leave-to {
  transform: scale(.75);
}

@keyframes grow {
  0% {
    transform: scale(.75);
  }
  80% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1.0);
  }
}
</style>