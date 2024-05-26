<template>

  <PageWrapper :getFilterItems="userFilterHandler" :getSearchItems="userSearchHandler">


    <div v-if="loaded" class="orders-wrapper p-3">

      <OrderBox v-for="(order , i) in orders" :key="`${i}-order`" :data="order" />

      <p class="text-center" v-if="orders.length === 0">
        موردی یافت نشد !
      </p>

    </div>
    <div v-else>
      <Loading />
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
import Loading from "@/components/Public/Loading.vue";
import { stringFromObj } from "@/shared/helper";

export default {
  name: "Orders",
  components: {Loading, OrderBox, Pagination, PageWrapper},
  data(){
    return {
      orders: [],
      ordersArg: {
        orderBy: [],
        filter: [],
        search: '',
      },
      forceRefreshNumber: 0,
      loaded: false
    }
  },
  methods: {
    getData(res){
        if(res?.data && res.data.list){
          this.orders = res.data.list;
        }
        this.loaded = true;
      console.log(res , 'res')
    },
    userSearchHandler(search){

      this.ordersArg.orderBy = [{[search.searchItem]: "asc"}];
      if(search.searchItem === 'orderNumber')
        this.ordersArg.search = {'order_number': search.keyword};
      else
        this.ordersArg.search = {[search.searchItem]: search.keyword};

      // توی قسمت orderBy میتونم از فیلد orderNumber استفاده کنم...
      // ولی توی فیلد search باید از order_number استفاده کنم !!

      // داستان این asc رو متوجه نشده بودم ولی انقدر درخواست دادم که فکر کنم یه چیزایی فهمیدم :)
      // این asc فکر میکنم باید به عنوان value باشه و احتمال زیاد سمت بک اند هم ازش استفاده نمیکنین فقط شیوه نگراش کد اینطوری بوده ! و فقط به key اهمیت میدین

      this.forceRefreshNumber++;
      this.loaded = false;
    },
    userFilterHandler(filter , type){
      if(type === 'label'){
        this.ordersArg.filter = [{label: filter}];
        this.forceRefreshNumber++;
        this.loaded = false;
      }
    }
  }
}
</script>

<style scoped>

</style>