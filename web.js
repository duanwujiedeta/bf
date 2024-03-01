const App = {
    template: `
    <button @click.stop="printMessage">Click me</button>
    `,
    methods: {
        printMessage() {
            console.log("Button is clicked!")
        }
    },
}