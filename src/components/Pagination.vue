<script >
import AppApi from "../API";
//API

import {defineComponent} from "vue";

import { logoutUserHandler } from "@/shared/helper";
//Helper

export default defineComponent({
  name: "Pagination",
  props: ['api' , 'loading' , 'loadedStarter' , 'reciveData' , 'fixed' , 'noPage' , 'objectBase' , 'loadedHandler'],
  data(){
    return {
      currentPage: this.$route?.query?.page || 1,
      totalPages: 1,
      page_path: this.$route?.path
    }
  },
  methods: {
    async getData(){

      const LIMIT = "2"
      const arg = this.api.args;

      arg.limit = LIMIT;
      arg.page = `${this.currentPage}`

      const result = await AppApi[this.api.route](arg);

      this.reciveData(result)
      if(result && result.data){
        if(!this.noPage && result.data.meta)
          this.totalPages = result.data.meta.totalPage
        else
          this.totalPages = 0
      }

      if(this.currentPage === 1){
        if(!this.$route?.query?.page)
          this.$router?.push(`${this.$route?.fullPath}?page=${1}`)
      }
    },
    gotoPage(page){
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        if(!this.$route?.query?.page)
          this.$router?.push(`${this.$route?.fullPath}?page=${page}`)
        else{
          const pageText = this.$route?.fullPath.split("page=");
          if(pageText){
            this.$router?.push(`${pageText[0]}page=${page}`)
          }
        }
      }
    }
  },
  watch: {
    '$route.fullPath':{
      handler(n,o)
      {
        if(this.loadedStarter){
          this.loadedStarter()
        }
        setTimeout(() => {
          if (this.$route.path?.toLowerCase() === this.page_path?.toLowerCase())
          {
            this.getData();
          }
        } , 500)
      },deep : true,immediate : true
    },
  }
})

</script>

<template>
  <div v-if="!noPage && totalPages > 1" :class="`pagination-bar h-110 pdd-bottom ${fixed ? 'fixed' : ''}`">
    <span v-for="pageNumber in totalPages" :key="pageNumber">
      <button @click="gotoPage(pageNumber)" :class="{ active: currentPage == pageNumber }">{{ pageNumber }}</button>
    </span>
  </div>
</template>

<style lang="scss" scoped>

.fixed{
  background: #ededed !important;
  padding: 5px !important;
  padding-bottom: 70px !important;
  border-radius: 15px 15px 0px 0px !important;
  position: fixed !important;
  bottom: 0px !important;
  width: 100% !important;
}

.pagination-bar{
  right: 0 !important;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px 0 65px 0;
  background: #ededed;
  border-radius: 20px;
  overflow: hidden;
  z-index: 100;
  padding-bottom: 140px;
  span {
    button{
      background : #e7e7e7;
      padding: 5px ;
      margin: 5px;
      border-radius: 3px;
      color: #000;
      transition: 0.2s;
      outline: none;
      border: none;
      font-size: 22px;
    }
    button.active{
      background: var(--main-org-color);
      color: #fff;
    }
  }
}

@media (min-width: 992px) {
  .pagination-bar{
    position: absolute !important;
    background: whitesmoke !important;
    z-index: 10;
    padding: 6px !important;
    bottom: 0;
  }
}

</style>