<template>
  <label class="checkbox-label">
    <input :checked="modelValue" @change="changeCheckbox" type="checkbox">
    <span><slot></slot></span>
  </label>
</template>

<script>
export default {
  name: 'custom-checkbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeCheckbox() {
      this.$emit('update:modelValue', event.target.checked);
    }
  }
}
</script>

<style>
  .checkbox-label {
    display: flex;
    align-items: center;
    width: fit-content;
    justify-content: flex-start;
    cursor: pointer;
  }

  input[type="checkbox"] {
    width: 0;
    height: 0;
    clip: rect(0px, 0px, 0px, 0px);
    opacity: 0;
  }

  .checkbox-label span {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #3F3F3F;
  }

  .checkbox-label span::before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    background: #FFFFFF;
    border: 1px solid #DCDCDC;
  }

  input[type="checkbox"]:checked ~ span:before {
    content: 'V';
    color: #FFFFFF;
    text-align: center;
    background: #008155;
    border: 1px solid #008155;
  }
</style>
