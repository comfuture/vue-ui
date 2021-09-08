import { Meta, Story } from '@storybook/vue3'
import { defineComponent, provide } from 'vue'
import UiCalendar from '../components/calendar'

export default {
  title: 'Components/Calendar',
  component: UiCalendar,
  argTypes: {
    label: {
      control: 'text',
      description: 'Slot content',
      defaultValue: 'Button'
    },
    LC_MESSAGES: {
      control: { type: 'select' },
      options: ['en', 'es', 'fr', 'de', 'ko', 'ja', 'zh'],
      defaultValue: 'en',
      description: 'i18n language code'
    }
  }
} as Meta

export const Calendar: Story = args => defineComponent({
  components: { UiCalendar },
  setup() {
    provide('LC_MESSAGES', args.LC_MESSAGES)
  },
  template: `
    <ui-calendar v-bind="args">{{ args.label }}</ui-calendar>
  `,
})

export const I18n = Calendar.bind({})
I18n.args = {
  LC_MESSAGES: 'ko'
}
