<template>

  <div class="order-box flex-wrap align-items-center my-3">

    <!--
      شماره سفارش
      نام
      لیبل ها
      وضعیت سفارش
      زمان ثبت سفارش
      اوپراتور ها

      dueTime
      email
      mobile
      name
      orderNumber
      orderTime
      status
      Label
    -->

    <div class="col-12 col-lg-6">
      <div>
        <p>
          <span v-if="data.mobile">
            {{ data.mobile }}
          </span>
          <span v-else>
            شماره ثبت نشده
          </span>
          <span class="mx-2">
            /
          </span>
          <span class="text-muted" v-if="data.name">
            {{ data.name }}
          </span>
          <span class="text-muted" v-else>
            کاربر لایسنس مارکت
          </span>
        </p>
      </div>
      <div class="d-flex flex-wrap">
        <SvgIcon class="ml-3" name="tag" />
        <span v-for="(label , i) in data.Label" :key="`${i}-label`">
          <SvgIcon class="d-inline-block" :color="getColor(label.color)" name="label" />
          {{ label.name }}
        </span>
      </div>
    </div>
    <div class="col-12 col-lg-6 mt-4 my-lg-0 flex-wrap d-flex justify-content-between">
      <div class="px-2" v-if="data?.status">
        <span :class="`label ${statusHandler(data.status).class}`">
          {{ statusHandler(data.status).title }}
        </span>
      </div>
      <div class="text-muted item-wrapper" v-if="data?.orderTime">
        <span>
          ({{ convertTime(data.orderTime) }})
        </span>
        {{ convertDate(data.orderTime) }}
      </div>
      <div class="px-2 d-flex item-wrapper justify-content-end" v-if="data?.assignedTo && data.assignedTo?.username">
        <span class="mx-2">
          {{ data.assignedTo.username }}
        </span>
        <SvgIcon class="d-inline-block" name="admin" />
      </div>
    </div>


  </div>

</template>

<script>

import SvgIcon from "@/components/Icons/SvgIcon.vue";
import Pagination from "@/components/Pagination.vue";
//Components
import { convertDate , convertTime } from "@/shared/helper";
//Helper

export default {
  name: "OrderBox",
  components: {Pagination, SvgIcon},
  props: ['data'],
  methods: {
    getColor(color){
      if(color){
        if(color === 'dark')
          return '#474747'
        else if(color === 'blue')
          return '#0e7bf1'
        else if(color === 'yellow')
          return '#e6e31b'

      }
    },
    statusHandler(status){
      if(status === 'PENDING'){
        return {title: 'درحال انتظار' , class: 'bg-warning'}
      }
      else if(status === 'COMPLETE'){
        return {title: 'ثبت شده' , class: 'bg-success'}
      }
      else if(status === 'REJECT'){
        return {title: 'ثبت شده' , class: 'bg-danger'}
      }//اینو همینطوری گذاشتم چون لیست status هارو نداشتم
      else {
        return {title: '' , class: ''}
      }
    },
    convertDate,
    convertTime
  },
}

</script>

<style lang="scss">

.item-wrapper {
  width: 150px;
  display: flex;
  align-items: center;
}

.label {
  color: #fff;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: var(--smallest-text);
  width: 100px;
  display: flex;
  justify-content: center;
}

.order-box {
  box-shadow: 0 0 15px var(--light-shadow);
  padding: 10px;
  border-radius: 8px;
  background: var(--main-background);
  display: flex;
}

</style>