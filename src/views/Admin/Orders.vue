<template>

  <PageWrapper :getSearchItems="userSearchHandler">


    <div class="orders-wrapper p-3">

      <OrderBox v-for="(order , i) in orders" :key="`${i}-order`" :data="order" />

    </div>


    <Pagination
        :recive-data="getData"
        class="p-1"
        :key="forceRefreshNumber"
        :api="{
               route :'getOrders' ,
               args: ordersArg
            }"
    />

  </PageWrapper>

</template>

<script>
import PageWrapper from "@/components/Layout/PageWrapper.vue";
import Pagination from "../../components/Pagination.vue";
import OrderBox from "@/components/OrderBox.vue";
export default {
  name: "Orders",
  components: {OrderBox, Pagination, PageWrapper},
  data(){
    return {
      orders: [],
      ordersArg: {
        orderBy: [],
        filter: [],
        search: ''
      },
      forceRefreshNumber: 0
    }
  },
  methods: {
    getData(res){
        if(res?.data && res.data.list){
          this.orders = res.data.list;
        }
    },
    userSearchHandler(search){
      console.log(search , 'search')
      this.ordersArg.orderBy = [{[search.searchItem]: "asc"}];
      if(search.searchItem === 'orderNumber')
        this.ordersArg.search = {'order_number': search.keyword};
      else
        this.ordersArg.search = {[search.searchItem]: search.keyword};

      // توی قسمت orderBy میتونم از فیلد orderNumber استفاده کنم...
      // ولی توی فیلد search باید از order_number استفاده کنم !!

      // داستان این asc رو متوجه نشده بودم ولی انقدر درخواست دادم که فکر کنم یه چیزایی فهمیدم :)
      // این asc فکر میکنم باید به عنوان value باشه و احتمال زیاد سمت بک اند هم ازش استفاده نمیکنین فقط شیوه نگراش کد اینطوری بوده ! و فقط به key اهمیت میدین

      console.log(this.ordersArg.orderBy ,'order')
      this.forceRefreshNumber++;
    }
  }
}
</script>

<style scoped>

</style>