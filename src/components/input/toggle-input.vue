<template>
  <div class="ui toggle input">
    <label :for="id">Toggle me</label>
    <input type="checkbox" :id="id" />
    <span></span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue-demi'
import { makeId } from '../../util'

export default defineComponent({
  setup() {
    const id = makeId()
    return { id }
  },
})
</script>
<style lang="postcss">
.ui.toggle.input {
  --blue: #159ce4;
  --black: #32383c;

  @apply relative block text-center w-full;

  input[type="checkbox"] {
    @apply absolute top-0 left-0 z-10 w-full align-middle cursor-pointer opacity-0 h-8;

    &:checked {
      ~ span:before {
        @apply bg-blue-400;;
        /* background-color: var(--blue); */
      }

      ~ span:after {
        top: 1px;
        /* left: 21px; */
        @apply left-6;
      }
    }

    &:hover ~ span:before {
      background-color: #3db5eb;
    }

    &:not(:checked):hover ~ span:before {
      background-color: #afbec9;
    }

    &:focus ~ span:before {
      outline: none;
      box-shadow: 0 0 0 4px rgba(21, 156, 228, 0.4);
    }
  }

  /* label {
    padding-right: 8px;
    font-family: sans-serif;
    font-size: 16px;
    line-height: 28px;
    color: var(--black);
  } */

  span {
    @apply relative inline-block align-middle cursor-pointer;

    &:before {
      @apply block rounded-full w-12 h-8;
      /* width: 50px;
      height: 30px; */
      content: "";
      background-color: #8296a4;
      transition: background-color 0.3s ease;
    }

    &:after {
      position: absolute;
      top: 1px;
      left: 1px;
      display: block;
      width: 28px;
      height: 28px;
      visibility: visible;
      content: "";
      background-color: #fff;
      border-radius: 28px;
      transition: left 0.3s ease;
    }
  }
}

</style>