import { defineComponent, PropType, toRefs, provide } from 'vue-demi';

export default defineComponent({
  name: 'ui-config-provider',
  props: {
    lang: {
      type: String as PropType<string>,
      default: 'en'
    }
  },
  setup(props, { slots }) {
    const { lang } = toRefs(props)
    provide('LC_MESSAGES', lang)
    return () => slots.default?.()
  }
})
