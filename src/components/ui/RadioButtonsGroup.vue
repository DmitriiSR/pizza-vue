<template>

  <div class="radio-group">
    <span><slot></slot></span>
    <div class="radio-group-inner">
      <label v-for="item in arr" :key="item.value">
        <input @change="updateRadio" :checked="modelValue === item.value" :value="item.value" type="radio" :name="item.name">
        <span>{{item.text}}</span>
      </label>
    </div>
  </div>

</template>

<script>
export default {
  name: 'radio-buttons-group',
  props: {
    modelValue: [Number, String],
    arr: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    updateRadio() {
      if(!isNaN(Number(event.target.value))) {
        this.$emit('update:modelValue', Number(event.target.value));
      } else {
        this.$emit('update:modelValue', event.target.value);
      }
    }
  }
}
</script>

<style>
.radio-group {
  padding-bottom: 15px;
}

.radio-group-inner {
  height: 30px;
  margin-top: 8px;
  padding-bottom: 15px;
  width: fit-content;
  display: flex;
  background: #F2F2F2;
  border-radius: 4px;
}

.radio-group-inner label {
  padding: 0;
  height: 30px;
  cursor: pointer;
}

.radio-group > span {
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  color: #737D8A;
}

.radio-group-inner span {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  color: #3F3F3F;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  background-color: transparent;
  border-radius: 2px;
}

.radio-group-inner input[type="radio"] {
  width: 0;
  height: 0;
  clip: rect(0px, 0px, 0px, 0px);
  opacity: 0;
}

.radio-group-inner input:checked ~ span {
  color: #ffffff;
  background-color: #00704B;
}

</style>
