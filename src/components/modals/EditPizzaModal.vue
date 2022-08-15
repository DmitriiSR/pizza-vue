<template>
  <div class="modal"
       v-if="$store.state.modals.createModalVisible"
       @click.stop="toggleEditModal"
  >
    <div @click.stop="" class="modal-dialog is-secondary">
      <div class="modal-header header-secondary">
        <h3>Создать пиццу</h3>
        <button
            @click.stop="toggleEditModal"
            class="btn-close is-for-secondary"
            aria-label="Закрыть
        "></button>
      </div>
      <div class="modal-body is-for-secondary">
        <text-input
            :model-value="pizza.name"
            @update:model-value="setPizzaName"
        >Название пиццы</text-input>
        <text-field
            :model-value="pizza.comment"
            @update:model-value="setPizzaComment"
        >Описание вкуса</text-field>
        <div class="row">
          <radio-buttons-group
              :arr="sizes"
              :model-value="pizza.size"
              @update:model-value="setPizzaSize"
          >Размер пиццы</radio-buttons-group>
          <div class="row is-center">
            <number-input
                :model-value="pizza.weight"
                @update:model-value="setPizzaWeight"
            >Масса</number-input>
          </div>
        </div>
        <radio-buttons-group
            :arr="thicknessArr"
            :model-value="pizza.thickness"
            @update:model-value="setPizzaThickness"
        >Тесто</radio-buttons-group>
        <custom-select
            :arr="cucumbers"
            :model-value="pizza.cucumber_type_id"
            @update:model-value="setPizzaCucumbers"
        >Огурцы</custom-select>
        <custom-checkbox
            :model-value="pizza.spicy"
            @update:model-value="setPizzaSpicy"
        >Острая</custom-checkbox>
        <text-input
            :model-value="pizza.author_phone"
            @update:model-value="setPizzaPhone"
            :placeholder="phonePlaceholder"
        >Телефон автора</text-input>
        <div class="final-price">
          <span>Итоговая цена пиццы</span>
          <span class="price">{{pizza.weight * $store.state.pizza.thicknessForPrice[pizza.thickness] + this.cucumbers[pizza.cucumber_type_id - 1].pupirki * 3 }} ₽</span>
        </div>
      </div>
      <div class="modal-footer">
        <button @click.stop="toggleEditModal" class="btn btn-secondary">Отмена</button>
        <button
            v-if="!$store.state.modals.isEdit"
            @click.stop="createPizza"
            class="btn btn-primary"
        >Создать пиццу</button>
        <button
            v-if="$store.state.modals.isEdit"
            @click.stop="$store.commit('toggleConfirm')"
            class="btn btn-primary"
        >Сохранить</button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex'

export default {
  data() {
    return {
      notEditYet: false,
      phonePlaceholder: '+7 (___) ___-__-__',
      sizes: [{name: 'size', text: '23 см', value: 23}, {name: 'size', text: '25 см', value: 25}, {name: 'size', text: '30 см', value: 30}],
      thicknessArr: [{name: 'thickness', text: 'Тонкое', value: 'THIN'}, {name: 'thickness', text: 'Традиционное', value: 'THICK'}, {name: 'thickness', text: 'Ультратонкое', value: 'ULTRA_THIN'}],
    }
  },
  props: {
    pizzaToEdit: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions({
      createPizza: 'createPizza',
      getCucumbers: 'getCucumbers',
      toggleEditModal: 'toggleEditModal'
    }),
    ...mapMutations({
      setPizzaName: 'setPizzaName',
      setPizzaPhone: 'setPizzaPhone',
      setPizzaComment: 'setPizzaComment',
      setPizzaWeight: 'setPizzaWeight',
      setPizzaSize: 'setPizzaSize',
      setPizzaSpicy: 'setPizzaSpicy',
      setPizzaCucumbers: 'setPizzaCucumbers',
      setPizzaThickness: 'setPizzaThickness'
    }),
  },
  mounted() {
    this.getCucumbers()
  },
  computed: {
    ...mapState({
      pizza: state => state.pizza.pizza,
      cucumbers: state => state.pizza.cucumbers
    })
  },
}
</script>

<style>
  .header-secondary {
    height: 48px;
    display: flex;
    align-items: center;
    margin: 0 -24px;
    padding: 0 24px;
    background-color: #EDEDED;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
  }
  .modal-dialog.is-secondary {
    padding-top: 0;
  }
  .modal-body.is-for-secondary {
    padding-bottom: 25px;
    border-bottom: 1px solid #F2F2F2;
  }
  .btn-close.is-for-secondary {
    right: 12px!important;
    top: 12px!important;
  }
  .final-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    padding: 16px;
    background: #F2F2F2;
    border-radius: 4px;
  }
  .final-price span:first-child {
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
  }

  .final-price .price {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }

</style>
