<template>
  <div class="ui calendar">
    <slot name="header" :year="year" :month="month">
      <header>
        <h1>{{ displayMonth }}</h1>
      </header>
    </slot>
    <div class="weekdays">
      <div class="weekday" v-for="weekday in weekdays" :key="weekday">{{ weekday }}</div>
    </div>
    <div class="days">
      <div class="empty" v-for="_ in firstDay" :key="_"></div>
      <div :class="['day', {today: isToday(day)}]"
        @click="handleClickDay(day)"
        v-for="day in days" :key="day">{{ day }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs, ref, computed, inject } from 'vue-demi'

export default defineComponent({
  name: 'ui-calendar',
  props: {
    year: {
      type: Number as PropType<number>,
      default: () => new Date().getFullYear()
    },
    /** month (1 based) */
    month: {
      type: Number as PropType<number>,
      default: () => new Date().getMonth() + 1 // month is not zero-based in realworld at all
    },
    today: {
      type: Object as PropType<Date>,
      default: () => new Date()
    }
  },
  setup(props, { emit }) {
    // process.env.NODE_ENV !== 'production'
    const lang = inject('LC_MESSAGES', ref(window?.navigator?.language
      || process.env.LANG
      || 'ko')) // get it from locale provider
    const { year, month, today } = toRefs(props)
    const yearMonth = computed<Date>(() => new Date(year.value, month.value - 1, 1))
    const firstDay = computed<number>(() => yearMonth.value.getDay())
    const numDays = computed<number>(() => new Date(year.value, month.value, 0).getDate())
    const days = computed<number[]>(() => Array(numDays.value).fill(0).map((_, i) => i + 1))
    const weekdays = computed(() => {
      const weekdayFormatter = new Intl.DateTimeFormat(lang.value, {
        weekday: 'short'
      })
      return Array(7).fill(0).map((_, i) => {
        const d = new Date(2021, 7, i + 1)
        return weekdayFormatter.format(d)
      })
    })
    const displayMonth = computed(() => new Intl.DateTimeFormat(lang.value, {
      year: 'numeric', month: 'short'
    }).format(yearMonth.value))
    const isToday = (d: number): boolean => {
      return month.value - 1 === today.value.getMonth() && d === today.value.getDate()
    }
    const handleClickDay = (d: number) => {
      emit('click:day', new Date(year.value, month.value - 1, d))
    }

    return {
      year, month, firstDay, days, today, yearMonth, displayMonth,
      isToday, weekdays, handleClickDay, numDays, lang
    }
  },
})
</script>
<style lang="postcss">
.ui.calendar {
  @apply inline-block border border-solid border-gray-300 rounded-lg p-2;

  > header {
    @apply flex flex-row justify-center;
    h1 {
      @apply text-base font-semibold my-1;
    }
  }

  .weekdays {
    @apply flex flex-row;

    .weekday {
      @apply flex-1 text-center text-gray-500;
    }
  }

  .days {
    @apply grid grid-cols-7;

    .day {
      @apply h-8 px-2 text-right font-mono proportional-nums;
      @apply flex flex-col justify-center rounded;

      &:hover {
        background-color: var(--ui-selection-color);
      }

      &.today {
        @apply font-semibold;
        color: var(--ui-primary-bg);
      }
    }

  }
}
</style>