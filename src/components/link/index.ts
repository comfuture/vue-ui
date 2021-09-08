import { ComponentOptionsMixin, DefineComponent, defineComponent,
         PropType, reactive, ref, toRefs, h } from 'vue-demi'

import { RouterLink } from 'vue-router'

interface LinkAttrs {
  href?: string,
  to?: string | object
}

export const Linkable = (defaultTag: string = 'div'): ComponentOptionsMixin => ({
  props: {
    href: String as PropType<string>,
    to: String as PropType<string | object>,
    defaultTag: {
      type: String as PropType<string>,
      default: () => defaultTag
    }
  },
  components: {
    'ui-link': makeComponent(defaultTag)
  }
})

export const makeComponent = (defaultTag: string): DefineComponent => defineComponent({
  props: {
    href: String as PropType<string>,
    to: String as PropType<string | object>,
    defaultTag: {
      type: String as PropType<string>,
      default: defaultTag
    }
  },
  setup({href, to, defaultTag}, {attrs, slots}) {
    if (href) {
      return () => h('a', {...attrs, href}, slots)
    } else if (to) {
      return () => h(RouterLink, {...attrs, to}, slots)
    }
    return () => h(defaultTag, {...attrs}, slots)
  },
}) as DefineComponent

export default makeComponent('div')
