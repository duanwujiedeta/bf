//...
export default defineComponent({
    //...
    watch: {
        'user.name': {
            handler(newValue: string, oldValue: string) {
                console.log({ newValue, oldValue })
            },
        },
    }
});