<template>
  <input class="ui input" type="text" inputmode="decimal"
    :value="formattedValue"
    @input="handleInput"
    @keydown="handleKeyDown">
</template>
<script lang="ts">
import { computed, inject, defineComponent, PropType, toRefs, ref } from 'vue-demi'

export default defineComponent({
  props: {
    modelValue: {
      type: [Number, String] as PropType<number | string>,
      default: 0
    },
    format: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    currency: {
      type: String as PropType<string>,
    }
  },
  setup(props, { emit }) {
    const { modelValue, format: needFormat, currency } = toRefs(props)
    const lang = inject('LC_MESSAGES', ref(window?.navigator?.language
      || process.env.LANG
      || 'ko'))
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key)
    }
    const handleInput = (e: InputEvent) => {
      emit('update:modelValue', 
      parseLocaleNumber((e.target as HTMLInputElement).value))
    }

    /**
     * Parse a localized number to a float.
     * @param {string} value - the localized number
     */
    const parseLocaleNumber = (value: string) => {
      const options = currency.value ? {
        style: 'currency', currency: currency.value!.toUpperCase()
      } : {}
      const currencySymbol = Intl.NumberFormat(lang.value, options)
        .formatToParts(1)
        .filter(({type}) => type === 'currency')[0]?.value
      const thousandSeparator = Intl.NumberFormat(lang.value).format(11111).replace(/\p{Number}/gu, '');
      const decimalSeparator = Intl.NumberFormat(lang.value).format(1.1).replace(/\p{Number}/gu, '');

      return parseFloat(value
          .replace(/\s/, '')
          .replace(new RegExp('\\' + currencySymbol, 'g'), '')
          .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
          .replace(new RegExp('\\' + decimalSeparator), '.'))
    }

    const formattedValue = computed(() => {
      if (needFormat.value) {
        const options = currency.value ? {
          style: 'currency', currency: currency.value!.toUpperCase()
        } : {}
        const formatter = new Intl.NumberFormat(lang.value, options)
        return formatter.format(+(modelValue.value || 0))
      }
      return modelValue.value
    })
    return { formattedValue, handleInput }
  },
})
</script>
<style lang="postcss">
.ui.input {
  @apply border border-solid border-gray-400 rounded p-2;

  &::-webkit-inner-spin-button {
    display: none;
  }
}
</style>