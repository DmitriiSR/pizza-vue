<template>
  <label>
    <span><slot></slot></span>
    <select :value="modelValue" @change="changeSelect">
      <option v-for="item in arr" :key="item.id" :value="item.id">{{item.name}}</option>
    </select>
  </label>
</template>

<script>
export default {
  name: 'custom-select',
  props: {
    modelValue: [Number, String],
    arr: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeSelect() {
      this.$emit('update:modelValue', Number(event.target.value));
    }
  }
}
</script>

<style>

</style>
