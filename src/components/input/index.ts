// import { defineComponent, h, PropType } from 'vue-demi'
export { default } from './input.vue'
import UiNumberInput from './number-input.vue'
import UiDateInput from './date-input.vue'
import UiRangeInput from './range-input.vue'
import UiToggleInput from './toggle-input.vue'

export { UiNumberInput, UiDateInput, UiRangeInput, UiToggleInput }

// export default defineComponent({
//   props: {
//     type: String as PropType<string>
//   },
//   setup(props, ctx) {
//     return () => {
//       switch (props.type) {
//         case 'number':
//           return h(UiNumberInput, {...ctx})
//         case 'range':
//           return h(UiRangeInput, {...ctx})
//         default:
//           return h('input', {...ctx})
//       }
//     }
//   }
// })
