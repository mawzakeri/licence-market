<template>

  <div v-if="checkingIsNotEmptyArray(props.options)" class="selector-wrapper">
    <select class="selector" v-model="selectorValue">
      <option v-for="(item , i) in props.options" :key="`${i}-item`" :value="item.value">
        {{ item.title }}
      </option>
    </select>
  </div>

</template>

<script setup>

import { checkingIsNotEmptyArray } from "@/shared/helper";
//Helper
import {ref} from "vue";
//Vue

const props = defineProps({
  options: {
    default: []
  }
});

const selectorValue = ref(null);

if(checkingIsNotEmptyArray(props.options)){
  selectorValue.value = props.options[0].value;
}

</script>

<style scoped>

.selector {
  width: 100%;
  border: none !important;
  outline: none !important;
  padding: 8px;
  min-width: 150px;
}

.selector-wrapper {
  padding-left: 8px;
}

</style>