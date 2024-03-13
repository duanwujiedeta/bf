import { createVue } from 'vue'
const App = {
    template: `
<div><div v-if="isVisible">I'm the text in toggle</div>
<div>Visibility: {{isVisible}}</div>
</div>
`,
    data() {
        return {
            isVisible: false
        }
    }
}
const app = createApp(App)
app.mount('#app')