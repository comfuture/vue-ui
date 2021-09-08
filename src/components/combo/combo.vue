<template>
  <div class="ui combo" @click="fillValue">
    <input ref="input" autocomplete="off" role="combobox" list=""
      @focus="dropdownVisible = true" @blur="dropdownVisible = false"
      @input="handleInput"
      :value="value" :placeholder="placeholder">
    <datalist :class="{visible: dropdownVisible}" ref="dropdown" role="listbox"
      @click="fillValue">
      <slot></slot>
    </datalist>
  </div>
</template>
<script lang="ts">
// inspred by https://dev.to/siddev/customise-datalist-45p0
import { defineComponent, ref, onMounted, PropType } from 'vue-demi'
import { makeId } from '../../util'

export default defineComponent({
  props: {
    value: {
      type: [String, Object] as PropType<string | any>
    },
    placeholder: String as PropType<string>
  },
  setup(props, { emit }) {
    const value = ref(props.value)
    const dropdownVisible = ref<boolean>(false)
    const input = ref<HTMLInputElement>()
    const dropdown = ref<HTMLDataListElement>()

    const fillValue = (e: PointerEvent) => {
      const option = (e?.target as HTMLElement)?.closest('option')
      const tagName: string = (e?.target as HTMLElement)?.tagName
      if (tagName !== 'option') {
        return
      }
      value.value = option?.value
      emit('update:value', value.value)
    }

    const handleInput = (e: InputEvent) => {
      const target = e.target as HTMLInputElement
      const text = target.value as string
      const menu = dropdown.value as HTMLDataListElement
      // ignore: Type 'HTMLCollectionOf<HTMLOptionElement>' must have a '[Symbol.iterator]()' method that returns an iterator.Vetur(2488)
      for (let option of menu.options) {
        const matched = [option.value.toString(), option.text].some(t => t.indexOf(text) > -1)
        if (matched) {
          option.style.display = 'block'
        } else {
          option.style.display = 'none'
        }
      }
    }

    onMounted(() => {
      // console.log(dropdown.value)
      // (dropdown.value as HTMLDataListElement).addEventListener('click', fillValue)

      // input.oninput = function() {
      //   currentFocus = -1;
      //   var text = input.value.toUpperCase();
      //   for (let option of browsers.options) {
      //     if(option.value.toUpperCase().indexOf(text) > -1){
      //       option.style.display = "block";
      //   }else{
      //     option.style.display = "none";
      //     }
      //   };
      // }
      // var currentFocus = -1;
      // input.onkeydown = function(e) {
      //   if(e.keyCode == 40){
      //     currentFocus++
      //   addActive(browsers.options);
      //   }
      //   else if(e.keyCode == 38){
      //     currentFocus--
      //   addActive(browsers.options);
      //   }
      //   else if(e.keyCode == 13){
      //     e.preventDefault();
      //         if (currentFocus > -1) {
      //           /*and simulate a click on the "active" item:*/
      //           if (browsers.options) browsers.options[currentFocus].click();
      //         }
      //   }
      // }

      // function addActive(x) {
      //     if (!x) return false;
      //     removeActive(x);
      //     if (currentFocus >= x.length) currentFocus = 0;
      //     if (currentFocus < 0) currentFocus = (x.length - 1);
      //     x[currentFocus].classList.add("active");
      //   }
      //   function removeActive(x) {
      //     for (var i = 0; i < x.length; i++) {
      //       x[i].classList.remove("active");
      //     }
      //   }
    })

    return {
      value, dropdownVisible, fillValue, dropdown, input,
      handleInput
    }
  },
})
</script>
<style lang="postcss">
.ui.combo {
  min-width: 12em;
  /* @apply inline-flex flex-col; */


  &:focus-within {
    @apply border border-solid border-blue-900;
  }

  > input {
    @apply p-2 border border-gray-400 rounded outline-none;

    &:focus {
      @apply rounded-t-sm rounded-b-none;
    }
  }

  > datalist {
    @apply w-full border border-solid border-gray-400;
    @apply absolute;
    top: 100%;
    /* position: absolute; */
    /* background-color: white; */
    /* border: 1px solid blue; */
    border-radius: 0 0 5px 5px;
    border-top: none;
    font-family: sans-serif;
    padding: 5px;
    max-height: 10rem;
    overflow-y: auto;

    &.visible {
      @apply block;
    }

    option {
      background-color: white;
      /* padding: 4px;
      color: blue;
      margin-bottom: 1px;
      font-size: 18px; */
      cursor: pointer;

      &:hover, &.active {
        @apply bg-blue-300;
      }
    }

  }

}
</style>