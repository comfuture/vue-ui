<template>
  <div class="ui range input">
    <span class="label">{{ min }}</span>
    <input type="range" :min="min" :max="max" :value="modelValue" @input="handleInput">
    <span class="label">{{ max }}</span>
    <output ref="bubble" :value="modelValue" v-if="output"></output>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs, ref } from 'vue-demi'

export default defineComponent({
  name: 'ui-range-input',
  props: {
    modelValue: {
      type: Number as PropType<number>,
    },
    min: {
      type: Number as PropType<number>,
      default: () => 0
    },
    max: {
      type: Number as PropType<number>,
      default: () => 100
    },
    output: {
      type: Boolean as PropType<boolean>
    }
  },
  setup(props, { emit }) {
    const { modelValue, min, max } = toRefs(props)
    const bubble = ref<HTMLOutputElement>()
    const handleInput = (e: Event) => {
      const newValue: number = +(e.target as HTMLInputElement).value
      emit('update:modelValue', newValue)
      bubble.value!.style.left = `calc(${newValue}% + (${8 - newValue * 0.15}px))`;
    }
    return { modelValue, handleInput, min, max, bubble }
  },
})
</script>
<style lang="postcss">
.ui.range.input {
  @apply border-0 inline-flex flex-row items-center relative;
  input[type="range"] {
    @apply flex-grow;
    -webkit-appearance: none;
    margin: 20px 0;
    /* width: 100%; */

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      cursor: pointer;
      animate: 0.2s;
      /* background: #03a9f4; */
      background: var(--ui-color-primary);
      border-radius: 25px;
    }

    &::-webkit-slider-thumb {
      @apply w-5 h-5 rounded-full bg-white cursor-pointer -mt-2;
      -webkit-appearance: none;
      box-shadow: 0 0 4px 0 rgba(0,0,0, 1);
    }
  }

  span.label {
    @apply text-gray-600 text-sm;
  }

  output {
    @apply border border-blue-500 rounded p-1 px-2 bg-blue-200 text-sm absolute;
    top: -50%;
  }
}
</style>