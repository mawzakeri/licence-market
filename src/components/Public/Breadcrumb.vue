<template>

  <div>
    <RouterLink to="" v-for="(item , i) in breadcrumbItems" :key="`${i}-item-breadcrumb`" >
      <span>
        {{ item.title }}
        <span v-if="i !== (breadcrumbItems.length - 1)" class="mx-2">
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
      breadcrumbItems: []
    }
  },
  methods: {
    breadcrumbHandler(){
      this.breadcrumbItems = [];
      this.breadcrumbItems.push({title: 'خانه' , link: '/'})
      if(this.$route.name === 'home'){
        this.breadcrumbItems.push({title: 'سفارشات' , link: '/'})
      }
    }
  },
  mounted()
  {
    this.breadcrumbHandler();
  }
}
</script>

<style scoped>

.active{
  color: red;
}

</style>