<template>
  <input class="ui input" type="text" :value="modelValue" @input="handleInput">
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue-demi'

export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<string>,
    }
  },
  setup(props, { emit }) {
    const { modelValue } = toRefs(props)
    const handleInput = (e: Event) => {
      emit('update:modelValue', (e.target as HTMLInputElement).value)
    }
    return { modelValue, handleInput }
  },
})
</script>
<style lang="postcss">
.ui.input {
  @apply border border-solid border-gray-400 rounded p-2;
}
</style>
