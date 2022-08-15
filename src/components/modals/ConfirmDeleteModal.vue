<template>
  <div class="modal" v-if="$store.state.modals.deleteModalVisible" @click.stop="$store.commit('toggleDelete')">
    <div @click.stop="" class="modal-dialog">
      <div class="modal-header">
        <h2>Удалить пиццу "Пицца №1"?</h2>
        <button @click="$store.commit('toggleDelete')" class="btn-close" aria-label="Закрыть"></button>
      </div>
      <div class="modal-footer">
        <button @click="deletePizza($store.state.pizza.pizzaId)" class="btn btn-danger">Удалить</button>
        <button @click.stop="$store.commit('toggleDelete')" class="btn btn-secondary">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'confirm-delete',
  props: {
    pizzaId: {
      type: Number,
      default: 0
    }
  },
  methods: {
    ...mapActions({
      deletePizza: 'deletePizza'
    }),
  }
}
</script>

<style>

</style>
