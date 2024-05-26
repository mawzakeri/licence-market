<template>

  <div v-if="userStore.loginStatus" class="page-wrapper">

    <div :class="`side-menu-wrapper ${sideMenuStatus && 'active'}`">
      <div class="p-4">
        <span class="cursor-pointer" @click="() => sideMenuStatus = false">
          بستن
        </span>
      </div>
      <div class="side-menu-logo-wrapper">
        <img src="@/assets/images/logo.webp" alt="">
      </div>
      <MenuItems />
    </div>
    <div class="content-wrapper">
      <header class="d-flex flex-wrap justify-content-between">

        <div class="d-flex flex-column col-12 col-lg-6">
          <div class="d-flex align-items-center pb-4">
            <div class="side-menu-icon">
              <SvgIcon @click="sideMenuHandler" name="bars" />
            </div>
            <Breadcrumb class="mx-4" />
          </div>
          <div class="d-flex flex-column flex-lg-row align-items-lg-center">
            <div class="col-12 my-3 my-lg-0">
              <SearchBox :userSearchHandler="userSearchHandler" />
            </div>
            <div>
              <FilterBox :userFilterHandler="userFilterHandler" />
            </div>
          </div>
        </div>

        <div class="d-flex py-2">
          <div class="px-1">
            <IconBox>
              <SvgIcon size="22" color="var(--light-gray)" name="bell" />
            </IconBox>
          </div>
          <div class="px-1">
            <IconBox>
              <SvgIcon size="22" color="var(--light-gray)" name="moon" />
            </IconBox>
          </div>
          <div class="px-1">
            <IconBox>
              <SvgIcon size="22" color="var(--light-gray)" name="profile" />
            </IconBox>
          </div>
        </div>

      </header>
      <div class="content">
        <slot />
      </div>
    </div>

  </div>
  <div v-else class="page-wrapper login-page">
    <div class="login-wrapper">
      <div class="logo-wrapper my-4">
        <img src="@/assets/images/logo.webp" alt="">
      </div>
      <div class="d-flex flex-column align-items-center">
        <CustomInput label="ایمیل" validation="email" name="email" v-model="email" />
        <CustomInput label="رمزعبور" name="password" v-model="password" />
        <button @click="loginHandler" class="main-btn my-3 w-100">
          <div class="d-flex" v-if="!loading">
            <SvgIcon class="mx-2" color="var(--main-background)" name="login" />
            <span>
              ورود
            </span>
          </div>
          <div v-else class="spinner-border mx-2" role="status"></div>
        </button>
      </div>
    </div>
  </div>

</template>

<script>

import SvgIcon from "@/components/Icons/SvgIcon.vue";
import Breadcrumb from "@/components/Public/Breadcrumb.vue";
import IconBox from "@/components/Public/IconBox.vue";
import SearchBox from "@/components/SearchBox.vue";
import CustomInput from "@/components/Form/CustomInput.vue";
//Components

import { loginOperators } from "../../API"
//API

import {runToast} from "@/shared/helper";
//HELPER

import { userAuth } from "../../store"
import {mapActions} from "pinia";
import MenuItems from "@/components/Layout/MenuItems.vue";
import FilterBox from "@/components/FilterBox.vue";

export default {
  name: "PageWrapper",
  components: {FilterBox, MenuItems, CustomInput, SearchBox, IconBox, Breadcrumb, SvgIcon},
  data(){
    return {
      sideMenuStatus: false,
      email: '',
      password: '',
      userStore: userAuth(),
      loading: false
    }
  },
  methods: {
    sideMenuHandler(){
      this.sideMenuStatus = !this.sideMenuStatus
    },
    async loginHandler(){
      const data = {
        password: this.password,
        email: this.email
      }
      if(data.password){
        if(data.email){
          this.loading = true;
          const res = await loginOperators(data);
          if(res && res?.status === 'success'){
            if(this.userStore && this.userStore.loginUser){
              this.userStore.loginUser(res.data);
              runToast({msg: 'به پنل ادمین خوش آمدید' , type: 'success'});
              this.$router.replace('/admin/orders')
            }
          }
          else {
            if(res.errors?.message)
              runToast({msg: res.errors.message , type: 'danger'})
          }
          this.loading = false;
        }
        else {
          runToast({msg: 'لطفا ایمیل را وارد کنید' , type: 'danger'})
        }
      }
      else {
        runToast({msg: 'لطفا رمزعبور را وارد کنید' , type: 'danger'})
      }
    },
    userSearchHandler(value){
      if(this.getSearchItems){
        this.getSearchItems(value);
        //فرستادن پارامتر هایی که کاربر میخواسته سرچ کنه به سمت صفحه اصلی که دیتا گرفته میشه
      }
    },
    userFilterHandler(filter: any , type){
      if(this.getFilterItems){
        this.getFilterItems(filter , type);
      }
    }
  },
  props:['getSearchItems' , 'getFilterItems']
}

</script>

<style scoped>

.side-menu-wrapper {
  overflow: hidden;
}

.side-menu-logo-wrapper {
  max-width: 100%;
  padding: 40px 10px;
  border-bottom: 1px solid var(--light-smoke);
}

.page-wrapper {
  display: flex;
}

.login-wrapper {
  display: flex;
  flex-direction: column;
}

header{
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: var(--main-background);
}

.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: 100dvh;
  background: var(--main-org-color);
}

.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px var(--light-shadow);
  border-radius: 10px;
  padding: 50px 10px;
  width: 650px;
  max-width: 100%;
  background: var(--main-background);
}

.side-menu-wrapper{
  width: 0%;
  background: var(--main-background);
  height: 100dvh;
  transition: .2s;
  position: relative;
  box-shadow: 0 0 25px var(--light-shadow);
}

.side-menu-wrapper.active {
  width: 250px;
}

.side-menu-wrapper.active ~ .content-wrapper {
  width: calc(100% - 250px);
}

.content-wrapper{
  width: 100%;
  background: var(--smoke-background);
  transition: .2s;
  height: 100dvh;
}

@media (max-width: 992px) {
  .side-menu-wrapper.active {
    width: 250px;
    position: fixed;
    z-index: 1001;
  }

  .side-menu-wrapper.active ~ .content-wrapper {
    width: 100%;
  }
}

</style>