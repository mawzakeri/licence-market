<template>

  <div class="py-3">
    <RouterLink v-for="(item , i) in menuItems" :key="`${i}-menu-item`" :to="item.link">
      <div class="d-flex menu-item">
        <SvgIcon class="mx-2" :name="item.icon" />
        <span>
          {{ item.text }}
        </span>
      </div>
    </RouterLink>
  </div>

</template>

<script>
import SvgIcon from "@/components/Icons/SvgIcon.vue";
export default {
  name: "MenuItems",
  components: {SvgIcon},
  data(){
    return {
      menuItems: [
        {
          text: 'سفارشات',
          link: '/admin/orders',
          icon: 'admin'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.router-link-active {
  .menu-item {
    &::before {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      background: var(--main-org-color);
    }

  }
}

.menu-item {

  position: relative;
  padding: 10px 20px;
  color: var(--black);

  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    background: var(--light-smoke);
    width: 7px;
    height: 100%;
    border-radius: 10px 0 0 10px;
  }

}

</style>