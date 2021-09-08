<template>
  <ui-link to="/">/</ui-link>
  <ui-item>
    hello
    <template #trailing>a<div>...</div>b</template>
  </ui-item>
  <ui-date-picker min="2021-08-15" /> <ui-date-picker time min="2021-08-01"/>
  <div class="three columns">
  <ui-card class="shadow-xl w-64 rounded-lg" image="http://placekitten.com/200/300" v-for="i in 3" :key="i">
    <h1>Hello</h1>
    <template #trailing>...</template>
  </ui-card>
  </div>
  <ui-button @click="handleClick" class="bg-red-500">Hello, world</ui-button>
  <ui-modal very wide title="Modal" v-model="dimmerVisible">
    <div v-for="i in 200" :key="i">이것은 테스트이다 {{ i }}</div>
  </ui-modal>
  <ui-button @click="notify('투표를 수정했습니다')">say hello</ui-button>

  <ui-calendar :month="month"></ui-calendar>
  <button @click="month += 1">+1</button>

  <br/>
  <input type="text" />
  <br>
  asdfasdf
  <br>
  asfasfsdf
  <br>
  asdfasf
  <ui-combo>
    <option value="1">one</option>
    <option value="2">two</option>
  </ui-combo>

  <select>
    <option value="1">one</option>
    <option value="2">two</option>
  </select> 
  <br>asdf
  <ui-number-input min="0" max="10" v-model="number" /> {{ number }}
  <ui-input type="number" v-model="number" />
  asdf
  <br>
  <ui-range-input output :min="0" :max="10" v-model.number="number" />
  ...

  <br />
  <ui-toggle-input />
</template>
<script setup lang="ts">
import { ref, provide } from 'vue'
import UiButton from './components/button'
import UiModal from './components/modal'
import UiItem from './components/item'
import UiLink from './components/link'
import UiCard from './components/card'
import UiCalendar from './components/calendar'
import UiDatePicker from './components/datepicker'
import UiCombo from './components/combo'
import UiInput, { UiNumberInput, UiRangeInput, UiToggleInput } from './components/input'
import { useConfirm, useNotification } from './components/dialog'

const number = ref(1)

useConfirm()
const notify = useNotification()

const dimmerVisible = ref(false)
const handleClick = () => {
  dimmerVisible.value = true
}
const month = ref(1)
provide('LC_MESSAGES', 'ko')
</script>
<style lang="postcss">
.three.columns {
  @apply flex flex-row gap-2 items-stretch my-4;
  > * {
    @apply flex-1;
  }
}
</style>