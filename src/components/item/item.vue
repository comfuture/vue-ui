<template>
  <ui-link v-bind="attrs" class="ui item">
    <div class="leading" v-if="hasLeading"><slot name="leading"></slot></div>
    <!-- {{ hasLeading }} / {{ hasTrailing }} -->
    <div class="description"><slot></slot></div>
    <div class="trailing" v-if="hasTrailing"><slot name="trailing"></slot></div>
  </ui-link>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue-demi'
import { Linkable } from '../link'
import { hasSlotContent } from '../../util/slot'

export default defineComponent({
  mixins: [ Linkable() ],
  setup(props, {slots, attrs}) {
    const hasLeading = computed(() => hasSlotContent(slots.leading))
    const hasTrailing = computed(() => hasSlotContent(slots.trailing))
    return {slots, attrs, hasLeading, hasTrailing}
  }
})
</script>
<style lang="postcss">
.ui.item {
  @apply flex flex-row;

  .leading {
    @apply pr-2;
  }

  .trailing {
    @apply pl-2;
  }

  .description {
    @apply flex-grow;

    h1 {
      @apply text-xl font-semibold my-0;
    }

    h2 {
      @apply text-lg my-0;
    }
  }
}
</style>