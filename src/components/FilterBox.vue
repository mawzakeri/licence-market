<script lang="ts">
import {defineComponent} from 'vue'
import SvgIcon from "@/components/Icons/SvgIcon.vue";

export default defineComponent({
  name: "FilterBox",
  components: {SvgIcon},
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
      open: true
    }
  },
  methods: {
    showFilterContent(){
      this.filterContent = true;
    },
    selectItemHandler(value){
      if(value === 'label'){
        console.log('salam')
      }
      else if (value === 'operators'){
        console.log('salam')
      }
      else if (value === 'order-date'){
        console.log('salam')
      }
    },
  }
})
</script>

<template>

  <div class="position-relative">
    <div @click="showFilterContent" class="filter-box mx-3">
      <SvgIcon name="plus" size="22" />
      <span class="mx-3">
        فیلتر جدید
      </span>
    </div>
    <div :class="`filter-content ${filterContent && 'active'}`">
      <div @click="() => selectItemHandler(item.value)" v-for="(item , i) in filterItems" :key="`${i}-filter-item`" class="filter-item">
        {{ item.title }}
      </div>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="open" class="custom-modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>

</template>

<style lang="scss" scoped>

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
  overflow: hidden;

  .filter-item {
    padding: 8px;
    transition: .2s;
    cursor: pointer;

    &:hover {
      color: var(--main-org-color);
    }

  }
}

.filter-content.active {
  min-height: 150px;
  padding: 10px;
  top: 42px;
  min-width: 240px;
}

</style>