<template>
  <header class="header"></header>
  <main class="main">
    <h1>Список пицц</h1>
    <pizza-list-header
        :totalPizza="this.pizzas.length"
    />
    <h1 v-if="loading" class="loading">Загружаем-с</h1>
    <pizza-list
        v-if="!loading"
        :pizzas="pizzas"
        @editPizza="editPizza"
        @slicePizza="slicePizza"
    />
    <h1 v-if="loadingPizza" class="loading" style="padding: 0">Тут сейчас появится пицца</h1>
  </main>
  <confirm-delete-modal/>
  <save-changes-modal/>
  <edit-pizza-modal
      v-model:pizzaToEdit="pizzaToEdit"
      @replacePizza="replacePizza"
      @pushPizza="pushPizza"
      v-model:isEdit="isEdit"
      v-model:pizzas="pizzas"/>
  <pizza-info-modal/>
</template>

<script>
import PizzaListHeader from '@/components/PizzaListHeader'
import PizzaList from '@/components/PizzaList'
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal'
import SaveChangesModal from '@/components/modals/SaveChangesModal'
import PizzaInfoModal from '@/components/modals/PizzaInfoModal'
import EditPizzaModal from '@/components/modals/EditPizzaModal'
import {mapActions, mapState} from 'vuex'

export default {
  components: {
    PizzaListHeader,
    PizzaList,
    ConfirmDeleteModal, SaveChangesModal, PizzaInfoModal, EditPizzaModal
  },
  data() {
    return {
      isEdit: false,
      notEditYet: false,
      pizzaToEdit: {},
    }
  },
  methods: {
    ...mapActions({
      fetchPizzas: 'fetchPizzas'
    }),
    editPizza(pizza) {
      this.pizzaToEdit = pizza
      this.isEdit = true;
    },
    pushPizza(pizza) {
      this.pizzas.push(pizza);
    },
    slicePizza(pizza) {
      this.pizzas = this.pizzas.filter(e => e.id !== pizza.id);
    },
    replacePizza(pizza) {
      let obj = this.pizzas.find(e => e.id === pizza.id);
      obj.id = pizza.id;
      obj.author_phone = pizza.author_phone;
      obj.comment = pizza.comment;
      obj.size = pizza.size;
      obj.thickness = pizza.thickness;
      obj.spicy = pizza.spicy;
      obj.weight = pizza.weight;
      obj.create_time = pizza.create_time;
      obj.name = pizza.name;
      obj.change_time = pizza.change_time;
      obj.cucumber.change_time = pizza.cucumber.change_time;
      obj.cucumber.create_time = pizza.cucumber.create_time;
      obj.cucumber.id = pizza.cucumber.id;
      obj.cucumber.name = pizza.cucumber.name;
      obj.cucumber.pupirki = pizza.cucumber.pupirki;
    },
  },
  computed: {
    ...mapState({
      pizzas: state => state.pizza.pizzas,
      loading: state => state.pizza.loading,
      loadingPizza: state => state.pizza.loadingPizza
    })
  },
  mounted() {
    this.fetchPizzas();
  }
}
</script>

<style>

</style>
