<template>
  <div class="modal"
       v-if="$store.state.modals.infoModalVisible"
       @click.stop="$store.commit('toggleInfo')"
  >
    <div @click.stop="" class="modal-dialog">
      <div class="modal-header">
        <button class="btn-close" aria-label="Закрыть" @click.stop="$store.commit('toggleInfo')"></button>
      </div>
      <div v-for="pizza in $store.state.pizza.pizzas.filter(e => e.id === $store.state.pizza.pizzaId)" :key="pizza.id" class="modal-body">
        <h1>{{pizza.name}}</h1>
        <div class="info-header">
          <div class="params">
            <span class="weight">{{pizza.weight}} г.</span>
            <span class="diameter">{{pizza.size.slice(5)}} см. </span>
          </div>
          <span class="price">{{pizza.weight * $store.state.pizza.thicknessForPrice[pizza.thickness] + pizza.cucumber.pupirki * 3 }} ₽ </span>
        </div>
        <div class="details">
          <div class="details-item">
            <span class="details-text is-text-secondary">Огурцы</span>
            <div class="dash-line"></div>
            <span class="details-text">{{pizza.cucumber.name}} <span class="is-text-secondary">({{pizza.cucumber.pupirki}} пупырок)</span></span>
          </div>
          <div class="details-item">
            <span class="details-text is-text-secondary">Острая</span>
            <div class="dash-line"></div>
            <span class="details-text">{{pizza.spicy ? 'Да' : 'Нет'}}</span>
          </div>
          <div class="details-item">
            <span class="details-text is-text-secondary">Тесто</span>
            <div class="dash-line"></div>
            <span class="details-text">Ультратонкое</span>
          </div>
        </div>
        <p>{{pizza.comment}}</p>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 25px;
}
.params {
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
}
.params span {
  display: flex;
  align-items: center;
  margin-right: 15px;
}
.weight::before {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background-color: transparent;
  background-image: url("../../assets/images/icons/weight.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 14px;
}
.diameter::before {
  content: '';
  display: block;
  margin-right: 5px;
  width: 20px;
  height: 20px;
  background-color: transparent;
  background-image: url("../../assets/images/icons/diameter.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 15px;
}
.price {
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  color: #008155;
}
.details {
  padding: 25px 0;
}
.details-item {
  display: flex;
  align-items: center;
}
.details-item:nth-child(n+2) {
  margin-top: 10px;
}
.dash-line {
  flex-grow: 2;
  height: 12px;
  margin: 0 2px;
  border-bottom: 1px dashed #F2F2F2;
}
.details-text {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
}
</style>
