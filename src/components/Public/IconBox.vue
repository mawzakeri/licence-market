<template>

  <div :style="{background}" class="icon-box">
    <slot />
  </div>

</template>

<script>
export default {
  name: "IconBox",
  props: {
    background: {
      default: 'var(--main-background)'
    }
  }
}
</script>

<style lang="scss" scoped>

.icon-box {
  border-radius: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--main-background);
  cursor: pointer;
  box-shadow: 0 0 15px var(--light-shadow);
}

</style>