import {createStore} from "vuex";
import {modalsModule} from "@/store/modalsModule";
import {pizzaModule} from "@/store/pizzaModule";

export default createStore({
    modules: {
        modals: modalsModule,
        pizza: pizzaModule
    }
})
