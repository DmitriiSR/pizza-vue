<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th></th>
      <th>Название</th>
      <th>Огурцы</th>
      <th>Тесто</th>
      <th class="is-text-center">Размер</th>
      <th class="is-text-center">Острая пицца</th>
      <th class="is-text-center">Цена</th>
      <th>Дата создания шедевра</th>
    </tr>
    </thead>
    <tbody v-for="(pizza, index) in pizzas" :key="pizza.id">
      <tr>
        <td>{{index + 1}}</td>
        <td>
          <div class="buttons-group">
            <button
                @click.stop="showEditPizza(pizza); $store.commit('setPizzaId', pizza.id)"
                class="button-edit"
            ></button>
            <button
                @click.stop="$store.commit('toggleDelete'); $store.commit('setPizzaId', pizza.id)"
                class="button-delete"></button>
          </div>
        </td>
        <td  @click="$store.commit('toggleInfo'); $store.commit('setPizzaId', pizza.id)" class="is-clickable">{{pizza.name}}</td>
        <td>{{pizza.cucumber.name}}</td>
        <td>{{this.formatThickness(pizza.thickness)}}</td>
        <td class="is-text-center">{{pizza.size.slice(5)}}</td>
        <td class="is-text-center">{{pizza.spicy ? 'Да' : 'Нет'}}</td>
        <td class="is-text-center">{{getPrice(pizza.weight, pizza.cucumber.pupirki, pizza.thickness)}} ₽</td>
        <td>{{this.formatDate(pizza.create_time)}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: {
    pizzas: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatDate(str) {
     let monthArr = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сенятбря', 'Октября', 'Ноября', 'Декабря'];
     str = str.slice(0, -9).split('-');
     str[1] = monthArr[Number(str[1]) - 1]

     return str.reverse().join(' ')
    },
    formatThickness(str) {
      switch (str) {
        case 'THIN':
            return 'Тонкое'
        case 'THICK':
          return 'Традиционное'
        case 'ULTRA_THIN':
          return 'Ультратонкое'
      }
    },
    getPrice(weight, p_cur, thickness) {
      switch (thickness) {
        case 'THIN':
          thickness = 2;
          break
        case 'THICK':
          thickness = 1;
          break
        case 'ULTRA_THIN':
          thickness = 3;
          break
        default:
          thickness = 3;
      }
      return weight * thickness + p_cur * 3
    },
    ...mapActions({
      showEditPizza: 'showEditPizza'
    })
  },
}
</script>

<style>
.buttons-group {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.is-clickable {
  font-weight: 600;
  color: #00704B;
  cursor: pointer;
}
</style>
