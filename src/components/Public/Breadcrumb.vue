<template>

  <div v-if="loaded">
    <RouterLink :to="item.link" v-for="(item , i) in breadcrumbItems" :key="`${i}-item-breadcrumb`" >
      <span class="breadcrumb-item text-muted">
        {{ item.title }}
        <span v-if="i !== (breadcrumbItems.length - 1)" class="mx-2 text-muted">
          /
        </span>
      </span>
    </RouterLink>
  </div>

</template>

<script>
export default {
  name: "Breadcrumb",
  data(){
    return {
      breadcrumbItems: [],
      loaded: false
    }
  },
  methods: {
    breadcrumbHandler(){
      this.breadcrumbItems = [];
      this.breadcrumbItems.push({title: 'خانه' , link: '/'})
      if(this.$route.name === 'Orders'){
        this.breadcrumbItems.push({title: 'سفارشات' , link: '/admin/orders'})
      }
    }
  },
  mounted()
  {
    this.breadcrumbHandler();
    this.loaded = true;
  }
}
</script>

<style scoped>

.router-link-active .breadcrumb-item{
  color: var(--main-org-color) !important;
}

</style>