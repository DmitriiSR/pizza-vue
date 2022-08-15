<template>
  <div class="modal modal-sm is-cover" v-if="$store.state.modals.confirmModalVisible">
    <div class="modal-dialog">
      <div class="modal-header">
        <h2>Сохранить изменения?</h2>
        <button @click.stop="$store.commit('toggleConfirm')" class="btn-close" aria-label="Закрыть"></button>
      </div>
      <div class="modal-body">
        <p>Вы не сохранили изменения. Уверены, что хотите закрыть?</p>
      </div>
      <div class="modal-footer">
        <button @click.stop="updatePizza" class="btn btn-primary">Создать и закрыть</button>
        <button @click.stop="$store.commit('toggleConfirm'); $store.commit('toggleEdit')" class="btn btn-secondary">Выйти без сохранения</button>
      </div>
    </div>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions({
      updatePizza: 'updatePizza'
    })
  }
}
</script>

<style>
.modal.is-cover {
  z-index: 999999;
  background: transparent;
}

.modal-sm .modal-dialog {
  width: 500px;
}

.modal.is-cover .modal-dialog{
  box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
}
</style>
