<script lang="ts">
import {defineComponent} from 'vue'
import SvgIcon from "@/components/Icons/SvgIcon.vue";
import { getOperators , getLabels } from '@/API';
import Loading from "@/components/Public/Loading.vue";

export default defineComponent({
  name: "FilterBox",
  components: {Loading, SvgIcon},
  data(){
    return {
      filterContent: false,
      filterItems: [
        {
          title: 'فیلتر بر اساس لیبل',
          value: 'label'
        },
        {
          title: 'فیلتر بر اساس اوپراتور',
          value: 'operators'
        },
        {
          title: 'بازه زمانی ثبت سفارش',
          value: 'order-date'
        }
      ],
      isActive: false,
      openFilterModal: false,
      modalContent: '',
      operators: [],
      labels: [],
      modalLoaded: false
    }
  },
  methods: {
    showFilterContent(){
      this.filterContent = true;
    },
    selectItemHandler(value){
      if(value === 'label'){
        console.log('salam')
        this.getLabels();
        this.openFilterModal = true;
        this.modalContent = 'label';
      }
      else if (value === 'operators'){
        console.log('salam')
        this.openFilterModal = true;
        this.modalContent = 'operators';
        this.getOperators();
      }
      else if (value === 'order-date'){
        console.log('salam')
        this.openFilterModal = true;
        this.modalContent = 'order-date';
      }
    },
    async getOperators(){
      const res = await getOperators();
      if(res){
        this.operators = res.data;
      }
      this.modalLoaded = true;
    },
    selectOperator(operator){
      console.log(operator)
    },
    async getLabels(){
      const res = await getLabels();
      if(res){
        this.labels = res.data;
      }
      this.modalLoaded = true;
    },
    selectLabels(label){
      console.log(label)
    },
  }
})
</script>

<template>

  <div class="position-relative wrapper-filter-box">
    <div @click="showFilterContent" class="filter-box mx-3">
      <SvgIcon name="plus" size="22" />
      <span class="mx-3">
        فیلتر جدید
      </span>
    </div>
    <div :class="`filter-content`">
      <div @click="() => selectItemHandler(item.value)" v-for="(item , i) in filterItems" :key="`${i}-filter-item`" class="filter-item">
        {{ item.title }}
      </div>
    </div>
  </div>

  <Teleport to="body">
    <div @click="() => openFilterModal = false" :class="`backdrop ${openFilterModal && 'active'}`"></div>
    <div v-if="openFilterModal" class="custom-modal">
      <div v-if="modalContent === 'label'">
        <p>
          بر اساس لیبل
        </p>
        <div v-if="modalLoaded">
          <div @click="() => selectLabels(item.id)" class="operator-box" v-for="(item , i) in labels" :key="`${i}-item-operator`">
            <span>
              {{ item?.name }}
            </span>
          </div>
        </div>
        <div v-else>
          <Loading />
        </div>
      </div>
      <div v-if="modalContent === 'operators'">
        <p>
          بر اساس اپراتور ها
        </p>
        <span>
          اپراتور مورد نظر خود را انتخاب کنید
        </span>
        <div v-if="modalLoaded">
          <div @click="() => selectOperator(item.username)" class="operator-box" v-for="(item , i) in operators" :key="`${i}-item-operator`">
            <span>
              {{ item?.username }}
            </span>
          </div>
        </div>
        <div v-else>
          <Loading />
        </div>
      </div>
      <div v-if="modalContent === 'order-date'">
        <p>
          بر اساس زمان ثبت سفارش
        </p>
      </div>
    </div>
  </Teleport>

</template>

<style lang="scss" scoped>

.operator-box {
  box-shadow: 0 0 15px var(--light-shadow);
  border-radius: 8px;
  padding: 8px 15px;
  margin: 15px 0;
  border-right: 5px solid var(--main-org-color);
  cursor: pointer;
  transition: .2s;

  &:hover {
    color: var(--main-org-color);
  }

}

.custom-modal {
  position: fixed;
  z-index: 1000;
  width: 300px;
  height: 300px;
  top: 20%;
  background: #fff;
  left: calc(50% - 150px);
  padding: 20px;
  box-shadow: 0 0 15px var(--light-shadow);
  border-radius: 10px;
  border: 1px solid #e8e8e8;
}

.filter-box {
  background: var(--main-background);
  box-shadow: 0 0 15px var(--light-shadow);
  border-radius: 8px;
  padding: 8px 12px;
  width: max-content;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: .2s;

  &:hover {
    opacity: 0.8;
  }

}

.filter-content {
  position: absolute;
  top: 0;
  width: 100%;
  height: 0;
  min-height: 0;
  right: 15px;
  background: var(--main-background);
  box-shadow: 0 0 15px var(--light-shadow);
  padding: 0;
  transition: .2s;
  border-radius: 10px;
  overflow: auto;
  max-height: 60vh;

  .filter-item {
    padding: 8px;
    transition: .2s;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      color: var(--main-org-color);
    }

  }
}

.wrapper-filter-box:hover .filter-content {
  min-height: 150px;
  padding: 10px;
  top: 42px;
  min-width: 240px;
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
  border-radius: 150px 0 0 150px;
  cursor: pointer;
}

.backdrop.active {
  width: 100vw;
  height: 100vh;
  opacity: 1;
  border-radius: 0;
}

</style>