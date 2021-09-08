import { Meta, Story } from '@storybook/vue3'
import { defineComponent, ref } from 'vue'
import UiModal from '../components/modal'
import UiButton from '../components/button'

export default {
  title: 'Components/Modal',
  component: UiModal,
  argTypes: {
    title: {
      control: 'text',
      description: 'Modal header',
      defaultValue: 'Modal'
    },
    content: {
      control: 'text',
      description: 'Modal content...',
      defaultValue: 'Modal content...'
    }
  }
} as Meta

export const Modal: Story = args => defineComponent({
  components: { UiModal, UiButton },
  setup() {
    const modalVisible = ref(false)
    return { modalVisible, args }
  },
  template: `
    <ui-button @click="modalVisible = true">Launch modal</ui-button>
    <ui-modal v-model="modalVisible" :title="args.title">
      <p>{{ args.content }}</p>
    </ui-modal>
  `,
})
