import { createApp } from 'vue'
import App from "./App";
import '@/styles/main.css'
import components from '@/components/ui'
import store from "@/store";

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})

app
    .use(store)
    .mount('#app')
