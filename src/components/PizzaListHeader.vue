<template>
  <div class="pizza-list-header">
    <h3>Найдено {{ this.totalPizza }} супер-пицц</h3>
    <button @click="$store.commit('toggleCreate')" class="btn btn-primary">Добавить пиццу</button>
  </div>
</template>

<script>
  export default {
    props: {
      totalPizza: {
        type: Number,
        default: 0
      }
    },
    methods: {
      showCreate() {
        this.$emit('showCreate', true)
      }
    }
  }
</script>

<style>
.pizza-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 0 15px 0;
}
</style>
