<template>
  <label>
    <span><slot></slot></span>
    <textarea
        @input="changeInput"
        :value="modelValue"
        rows="3"
        placeholder="Ваше сообщение"
    ></textarea>
  </label>
</template>

<script>
export default {
  name: 'text-field',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    changeInput() {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style>

</style>
