<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Loading"
})
</script>

<template>

  <div class="loader"></div>

</template>

<style scoped>

.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  margin: 30px auto;
  background:
      radial-gradient(farthest-side,var(--main-org-color) 94%,var(--main-org-color)) top/8px 8px no-repeat,
      conic-gradient(#0000 30%,var(--main-org-color));
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
  animation: l13 1s infinite linear;
}
@keyframes l13{
  100%{transform: rotate(1turn)}
}
</style>