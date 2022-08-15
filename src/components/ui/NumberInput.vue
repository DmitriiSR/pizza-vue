<template>
  <label class="number-label-sm">
    <span><slot></slot></span>
    <span class="number-input">
      <input :value="Number(modelValue)" @input="changeInput" type="number">
    </span>
  </label>
</template>

<script>
export default {
  name: 'number-input',
  props: {
    modelValue: {
      type: Number,
      default: 0
    }
  },
  methods: {
    changeInput() {
      this.$emit('update:modelValue', Number(event.target.value))
    }
  }
}
</script>

<style>
.number-label-sm {
  max-width: 125px;
}
.number-label-sm input[type="number"] {
  display: flex;
  align-items: center;
  max-width: 86px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.number-input {
  display: flex;
}
.number-input::after {
  content: 'г.';
  display: block;
  margin-top: 8px;
  padding: 5px 8px;
  background: #FFFFFF;
  border: 1px solid #CCCCCC;
  outline: none;
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
