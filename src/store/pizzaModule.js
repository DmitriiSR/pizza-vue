import axios from "axios";

export const pizzaModule = {
    state: () => ({
        pizzas: [],
        loading: false,
        loadingPizza: false,
        cucumbers: {},
        pizzaId: 0,
        pizza: {
            author_phone: '',
            comment: '',
            size: 23,
            thickness: 'THICK',
            spicy: false,
            cucumber_type_id: 1,
            weight: 0,
            name: ''
        },
        thicknessForPrice: {
            "THIN": 2,
            "THICK": 1,
            "ULTRA_THIN": 3,
        },
    }),
    getters: {

    },
    mutations: {
        setLoading(state, bool) {
            state.loading = bool
        },
        setLoadingPizza(state, bool) {
            state.loadingPizza = bool
        },
        setPizzas(state, pizzas) {
            state.pizzas = pizzas
        },
        setPizzaComment(state, str) {
            state.pizza.comment = str
        },
        setPizzaWeight(state, num) {
            state.pizza.weight = num
        },
        setPizzaSize(state, num) {
            state.pizza.size = num
        },
        setPizzaThickness(state, str) {
            state.pizza.thickness = str
        },
        setPizzaPhone(state, str) {
            state.pizza.author_phone = str
        },
        setPizzaCucumbers(state, id) {
            state.pizza.cucumber_type_id = id
        },
        setPizzaSpicy(state, bool) {
            state.pizza.spicy = bool
        },
        setPizzaName(state, str) {
            state.pizza.name = str
        },
        setPizzaId(state, id) {
            state.pizzaId = id
        },
        setPushPizza(state, pizza) {
            state.pizzas.push(pizza)
        },
        setDeletePizza(state, pizzaId) {
            state.pizzas = state.pizzas.filter(e => e.id !== pizzaId);
        },
        setClearPizza(state) {
            for (let key in state.pizza) {
               switch (key) {
                   case 'cucumber_type_id':
                       state.pizza[key] = 1
                       break
                   case 'size':
                       state.pizza[key] = 23
                       break
                   case 'weight':
                       state.pizza[key] = 0
                       break
                   case 'spicy':
                       state.pizza[key] = false
                       break
                   case 'thickness':
                       state.pizza[key] = "THICK"
                       break
                   default:
                       state.pizza[key] = ""
               }
            }
        },
        setPizzaToEdit(state, pizza) {
            for (let key in state.pizza) {
                switch (key) {
                    case 'cucumber_type_id':
                        state.pizza[key] = pizza.cucumber.id
                        break
                    case 'size':
                        state.pizza[key] = Number(pizza.size.slice(5))
                        break
                    default:
                        state.pizza[key] = pizza[key]
                }
            }
        },
        setReplacePizza(state, pizza) {
            state.pizzas.forEach(e => {
                if (e.id === pizza.id) {
                    for (let key in e) {
                        if (key !== 'cucumber') {
                            e[key] = pizza[key]
                        } else {
                            for (let i in e.cucumber) {
                                e.cucumber[i] = pizza.cucumber[i];
                            }
                        }
                    }
                }
            })
        }
    },
    actions: {
        async fetchPizzas({commit}) {
            try {
                commit('setLoading', true)
                const responce = await axios({
                    method: "POST",
                    mode: 'no-cors',
                    url: process.env.VUE_APP_PROXY + process.env.VUE_APP_API_URL,
                    headers: {BEARER: process.env.VUE_APP_BEARER},
                    data: {
                        query: `
                                {
                                  pizza_list {
                                    items(limit: 10, offset: 0) {
                                      author_phone
                                      comment
                                      size
                                      thickness
                                      spicy
                                      cucumber {
                                        pupirki
                                        id
                                        name
                                        create_time
                                        change_time
                                      }
                                      weight
                                      id
                                      name
                                      create_time
                                      change_time
                                    }
                                    count
                                  }
                                }
                                `
                    }
                });
                commit('setPizzas', responce.data.data.pizza_list.items);
            } catch (e) {
                console.log(e)
            } finally {
                commit('setLoading', false);
            }
        },
        async getCucumbers({state}) {
            try {
                const responce = await axios({
                    method: "POST",
                    mode: 'no-cors',
                    url: process.env.VUE_APP_PROXY + process.env.VUE_APP_API_URL,
                    headers: {BEARER: process.env.VUE_APP_BEARER},
                    data: {
                        query: `
            {
              cucumber_list {
                items(limit: 5, offset: 0) {
                  pupirki
                  id
                  name
                  create_time
                  change_time
                }
                count
              }
            }
           `
                    }
                });
                state.cucumbers = [...responce.data.data.cucumber_list.items];
            } catch (e) {
                console.log(e)
            }
        },
        async createPizza({state, dispatch, commit}) {
            commit('toggleCreate');
            commit('setLoadingPizza', true);
            try {
                const responce = await axios({
                    method: "POST",
                    mode: 'no-cors',
                    url: process.env.VUE_APP_PROXY + process.env.VUE_APP_API_URL,
                    headers: {BEARER: process.env.VUE_APP_BEARER},
                    data: {
                        query: `
                              mutation ($size: PizzaSizeEnum, $thickness: PizzaThicknessEnum){
                                create_pizza(input: {
                                  name: "${state.pizza.name}",
                                  phone: "${state.pizza.author_phone}",
                                  comment: "${state.pizza.comment}",
                                  size: $size,
                                  thickness: $thickness,
                                  spicy: ${state.pizza.spicy},
                                  weight: ${state.pizza.weight},
                                  cucumber_type_id: ${state.pizza.cucumber_type_id}
                                })
                              }
                           `,
                        variables: {
                            "size": 'SIZE_' + state.pizza.size,
                            "thickness": state.pizza.thickness
                        }
                    }
                });
                commit('setClearPizza');
                dispatch('getPizza', responce.data.data.create_pizza);
            } catch (e) {
                console.log(e)
            }
        },
        async getPizza({state, commit},id) {
            try {
                const responce = await axios({
                    method: "POST",
                    mode: 'no-cors',
                    url: process.env.VUE_APP_PROXY + process.env.VUE_APP_API_URL,
                    headers: {BEARER: process.env.VUE_APP_BEARER},
                    data: {
                        query: `
                          {
                            pizza(id: "${id}") {
                              author_phone
                              comment
                              size
                              thickness
                              spicy
                              cucumber {
                                pupirki
                                id
                                name
                                create_time
                                change_time
                              }
                              weight
                              id
                              name
                              create_time
                              change_time
                            }
                          }
                       `
                    }
                });
                   if (state.pizzas.filter(e => e.id === id).length > 0) {
                       commit('setReplacePizza', responce.data.data.pizza);
                   } else {
                       commit('setPushPizza', responce.data.data.pizza);
                       commit('setLoadingPizza', false);
                   }
                    return responce
            } catch (e) {
                console.log(e)
            }
        },
        async deletePizza({state, commit}) {
            try {
                commit('setDeletePizza', state.pizzaId);
                commit('toggleDelete');
                const responce = await axios({
                    method: "POST",
                    mode: 'no-cors',
                    url: process.env.VUE_APP_PROXY + process.env.VUE_APP_API_URL,
                    headers: {BEARER: process.env.VUE_APP_BEARER},
                    data: {
                        query: `
                          mutation {
                            delete_pizza(id: ${state.pizzaId})
                          }
                       `
                    }
                });
                return responce
            } catch (e) {
                console.log(e)
            }
        },
        async updatePizza({state, commit, dispatch}) {
            commit('toggleConfirm');
            commit('toggleEdit');
            try {
                const responce = await axios({
                    method: "POST",
                    mode: 'no-cors',
                    url: process.env.VUE_APP_PROXY + process.env.VUE_APP_API_URL,
                    headers: {BEARER: process.env.VUE_APP_BEARER},
                    data: {
                        query: `
              mutation ($size: PizzaSizeEnum, $thickness: PizzaThicknessEnum){
                edit_pizza(input: {
                  name: "${state.pizza.name}",
                  phone: "${state.pizza.author_phone}",
                  comment: "${state.pizza.comment}",
                  size: $size,
                  thickness: $thickness,
                  spicy: ${state.pizza.spicy},
                  weight: ${state.pizza.weight},
                  cucumber_type_id: ${state.pizza.cucumber_type_id}
                }, id: "${state.pizzaId}")
              }
           `,
                        variables: {
                            "size": 'SIZE_' + state.pizza.size,
                            "thickness": state.pizza.thickness
                        }
                    }
                });
                dispatch('getPizza', state.pizzaId);

                return responce
            } catch (e) {
                console.log(e)
            }
        },
        showEditPizza({commit, state}, pizza) {
            commit('setPizzaToEdit', pizza);
            commit('toggleEdit');
           if (state.isEdit) {
               commit('setClearPizza');
           }
        }
    },
}
