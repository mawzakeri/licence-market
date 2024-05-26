import {storageHandler} from "@/shared/helper";

import { defineStore } from "pinia";

export const userAuth = defineStore( 'user' , {
    state: () => ({
        token: "",
        loginStatus: false
    }),
    actions: {
        async loginUser(response:any)
        {
            await storageHandler("token" , response.access_token);
            //ذخیره کردن توکن توی localstorage

            const authResultData = { token: response.access_token }
            this.token = response.access_token
            this.loginStatus = true
            // برای دسترسی کاربر به بخش هایی که نیاز به لاگین دارن

            return authResultData;
        },
        changeLoginStatus(status: boolean){
            if(status)
                this.loginStatus = status
        }
    },
    getters: {
        getLoginStatus(state:any)
        {
            return state.loginStatus;
        }
    },
})