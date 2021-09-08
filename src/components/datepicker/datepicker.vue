<template>
  <div class="ui datepicker">
    <!-- <output :value="value"></output> -->
    <span class="button">
      <output v-show="isSupported" ref="output" :value="value"></output>
      <input v-show="!isSupported" :value="value">
      <span class="icon">today</span>
      <input ref="picker" :min="min" :max="max" :type="pickerType" class="input">
    </span>
  </div>
</template>
<script lang="ts">
// inspired by https://dev.to/codeclown/styling-a-native-date-input-into-a-custom-no-library-datepicker-2in
import { defineComponent, PropType, ref, toRefs, computed, onMounted, inject } from 'vue-demi'

export default defineComponent({
  props: {
    time: Boolean as PropType<boolean>,
    min: String as PropType<string>,
    max: String as PropType<string>
  },
  setup(props, { emit }) {
    const LC_MESSAGES = inject('LC_MESSAGES', 'ko')
    const { time } = toRefs(props)
    const formatter = new Intl.DateTimeFormat(LC_MESSAGES)
    let formatOption = ref<object>({year: 'numeric', month: 'short', day: 'numeric'})
    if (time.value) {
      formatOption.value['hour'] = 'numeric'
      formatOption.value['minute'] = 'numeric'
      console.log(formatOption, formatOption.value)
    }
    const v = new Intl.DateTimeFormat(LC_MESSAGES, formatOption).format(new Date())

    const value = ref<string>(v)
    const pickerType = computed<string>(() => time.value ? 'datetime-local' : 'date')
    const picker = ref<HTMLInputElement>()
    const output = ref<HTMLOutputElement>()
    const isSupported = ref<boolean>(false)

    onMounted(() => {
      const input = document.createElement('input');
      input.type = 'date';
      input.value = 'invalid date value';
      isSupported.value= input.value !== 'invalid date value';
      if (!isSupported) {
        picker.value.style.display = 'none'
        output.value.style.display = 'none'
      }

      picker.value.addEventListener('input', (event: InputEvent) => {
        console.log(event.target.value)
        const d = new Date(event.target.value)
        value.value = formatter.format(d)    
        emit('update:value', value.value)    
      })
    })

    return {
      pickerType, picker, value, isSupported
    }
  },
})
</script>
<style lang="postcss">
.ui.datepicker {
  @apply inline-flex flex-row box-border;
  @apply rounded border border-solid border-gray-400;
  min-width: calc(164px - 2em);

  &:focus-within {
    /* @apply ring-blue-800 ring-2 border-blue-800 border-2; */
    outline: auto 2px -webkit-focus-ring-color;
  }

  > output {
    @apply p-2;
    min-width: calc(164px - 2em);
  }

  .button {
    @apply flex-grow h-8;

    display: inline-block;
    position: relative;
    /* width: 18px;
    height: 19px; */
    

    > output {
      @apply p-2;
      min-width: calc(164px - 2em);
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-image: url('data:image/svg+xml;base64,...');
    }

    .icon {
      @apply absolute right-2 py-2 text-gray-400;
      font-family: 'Material Icons';
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      -moz-osx-font-smoothing: grayscale;
      font-feature-settings: 'liga';
    }

    [type="date"], [type="datetime-local"] {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      box-sizing: border-box;

      &::-webkit-calendar-picker-indicator {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        cursor: pointer;
      }
    }
  }
}
</style>