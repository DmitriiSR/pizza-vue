<template>
  <label>
    <span><slot></slot></span>
    <input
        :value="modelValue"
        @input="updateInput"
        :placeholder="placeholder"
        type="text"
    >
  </label>
</template>

<script>
export default {
  name: 'text-input',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateInput() {
        this.$emit('update:modelValue', event.target.value);
      }
    }
}
</script>

<style>

</style>
