import { createRouter, createWebHistory } from 'vue-router'
//Vue router
import index from '@/views/index.vue'
import Orders from '@/views/Admin/Orders.vue'
//Views
import {userAuth} from "@/store";
//Store
import { getToken } from "@/shared/helper";
//Helper

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: index,
      redirect: '/admin/orders'
    },
    {
      path: '/admin/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: "/:catchAll(.*)",
      name: 'Orders',
      component: Orders,
    },
  ]
})

router.beforeEach((to, from, next) =>
{

  const userStore = userAuth();
  if(userStore?.changeLoginStatus){
    if (getToken())
    {
      userStore.changeLoginStatus(true)
    }
    else {
      userStore.changeLoginStatus(false);
    }
    next();
  }

});

export default router
