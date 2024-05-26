<template>

  <div class="input-wrapper">
    <label v-if="label" :for="generatedID">
      {{ label }}
    </label>
    <input ref="inputElem" v-model="value" :name="name" :id="generatedID" :type="type || 'text'">
  </div>

</template>

<script>
export default {
  name: "CustomInput",
  props:  ['modelValue' , 'name' , 'label' , 'type' , 'validation'],
  data(){
    return {
      generatedID: ''
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    },
  },
  watch: {
    value(){
      console.log(this.$refs.inputElem)
      if(this.validation == "email" && this.$refs.inputElem){
        if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.value)){
          this.$refs.inputElem.classList.remove('danger-border');
          this.$refs.inputElem.classList.add('success-border');
        }
        else{
          this.$refs.inputElem.classList.remove('success-border');
          this.$refs.inputElem.classList.add('danger-border');
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.input-wrapper {

  width: 100%;
  margin: 5px 0;

  label {
    width: 100%;
    text-align: center;
    margin: 5px 0;
  }

  input {
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid var(--light-smoke);
    outline: none;
    box-shadow: 0 0 15px transparent;
    transition: .2s;
    padding: 8px;
    font-size: var(--small-text);
    direction: ltr;

    &:focus {
      border: none;
      outline: none;
      box-shadow: 0 0 15px var(--light-shadow);
    }

  }

}

</style>