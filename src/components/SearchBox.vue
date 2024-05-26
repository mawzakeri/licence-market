<template>

  <div @click="() => showSearchContent = false" :class="`backdrop ${showSearchContent && 'active'}`"></div>

  <div class="position-relative">
    <div @click="showSearchContentHandler" class="search-wrapper">
      <div class="input-wrapper border-left col-6">
        <input v-model="keyword" placeholder="دنبال چه چیزی هستید ؟" class="no-border-input" type="text">
      </div>
      <div class="col-6 d-flex">
        <div class="selector-wrapper border-left">
          <div>
            <span>
              {{ selectedSearchItem.title }}
            </span>
          </div>
        </div>
        <div class="search-icon-wrapper">
          <IconBox v-if="!showSearchContent" background="var(--main-org-color)">
            <SvgIcon size="22" color="var(--main-background)" name="search" />
          </IconBox>
          <IconBox v-else @keyup.enter="searchHandler" @click.prevent="searchHandler" background="var(--green-color)">
            <SvgIcon size="22" color="var(--main-background)" name="arrow-left" />
          </IconBox>
        </div>
      </div>
    </div>
    <div :class="`search-content d-flex ${showSearchContent && 'active'}`">
      <div class="col-6 detail-wrapper">
        برای مشاهده نتایج، عبارت مورد نظرتان را وارد کرده و دسته بندی را انتخاب کنید.
      </div>
      <div class="col-6 wrapper-search-items">
        <div @click="() => selectSearchItem(item)" v-for="(item , i) in searchItems" :key="`${i}-item`" :class="`search-item ${item.value === selectedSearchItem.value && 'active'}`">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import IconBox from "@/components/Public/IconBox.vue";
import SvgIcon from "@/components/Icons/SvgIcon.vue";
//Components
import {runToast} from "@/shared/helper";
//Helper

export default {
  name: "SearchBox",
  components: {SvgIcon, IconBox},
  props: ['userSearchHandler'],
  data(){
    return {
      showSearchContent: false,
      // if false => نمایش داده نمیشه
      // else => نمایش داده میشه
      searchItems: [
        {
          title: 'شماره سفارش',
          value: 'orderNumber'
        },
        {
          title: 'نام',
          value: 'name'
        },
        {
          title: 'ایمیل',
          value: 'email'
        },
        {
          title: 'شماره همراه',
          value: 'mobile'
        },
      ],
      selectedSearchItem: { title:  'شماره سفارش' , value: 'orderNumber' },
      keyword: null
    }
  },
  methods: {
    showSearchContentHandler(){
      this.showSearchContent = true;
      // اگه search-content رو نشون میده ، hide کنه و اگه نشون نمیده نشون بده
    },
    // نمیدونم دقیقا همینطوری میخواستید یا نه ولی خب این چیزی بود که من درک کردم از عکس :)
    selectSearchItem(item){
      if(item){
        this.selectedSearchItem = item;
      }
    },
    searchHandler(){
      if(this.keyword){
        if(this.userSearchHandler){
          this.userSearchHandler({
            keyword: this.keyword,
            searchItem: this.selectedSearchItem?.value
          });
          setTimeout(() => {
            this.showSearchContent = false;
          } , 50)
          console.log(this.showSearchContent , 'show content')
          //باکس سرچ رو می بنده بعدش
        }
      }
      else {
        runToast({
          msg: "لطفا متن جستجو را وارد کنید .",
          type: "error"
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.search-item {
  padding: 8px;
  border-bottom: 1px solid var(--light-smoke);
  cursor: pointer;
}

.search-item.active {
  border-bottom: 1px solid var(--main-org-color);
  color: var(--main-org-color);
}

.backdrop {
  width: 0;
  height: 0;
  background: var(--backdrop);
  opacity: 0;
  top: 0;
  right: 0;
  position: fixed;
  transition: .5s;
  border-radius: 50% 0 0 50%;
  cursor: pointer;
}

.backdrop.active {
  width: 100vw;
  height: 100vh;
  opacity: 1;
  border-radius: 0;
}


.search-wrapper {
  background: var(--main-background);
  box-shadow: 0 0 15px var(--light-shadow);
  display: flex;
  width: 500px;
  padding: 8px;
  border-radius: 10px;

  .selector-wrapper {
    padding: 10px;
    width: calc(100% - 50px);
    color: var(--muted-color);
    font-size: var(--small-text);
    cursor: pointer;
  }

  .search-icon-wrapper{
    margin-right: 8px;
  }

}

.search-content {
  width: 100%;
  height: 0%;
  position: absolute;
  top: 61px;
  min-height: 0px;
  transition: 0s height , .5s min-height;
  background: var(--main-background);
  border: 1px solid var(--light-smoke);
  border-radius: 8px;
  overflow: hidden;

  .detail-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gray-100);
    height: 100%;
    color: var(--muted-color);
    text-align: center;
    padding: 20px;
  }


}

.search-content.active {
  height: 100%;
  min-height: 350px;
}


</style>