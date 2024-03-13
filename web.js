import { createVue } from 'vue'

const App = {
    template: `
<img :src="imageSrc" />`,
    data() {
        return {
            imageSrc: "https://res.cloudinary.com/mayashavin/image/upload/TheCute%20Cat"
        }
    }
}

const app = createApp(App)
app.mount('#app')


import { createVue } from 'vue'

const App = {
    template: `
<img v-bind="image" />
`,
    data() {
        return {
            image: {
                src: "https://res.cloudinary.com/mayashavin/image/upload/TheCute%20Cat",
                alt: "A random cute cate image"
            }
        }
    }
}

const app = createApp(App)
app.mount('#app')