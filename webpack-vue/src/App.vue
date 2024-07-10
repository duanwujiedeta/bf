<template>
    <div id="app">
        <h1>Hello, Vue 2.6 with Webpack!</h1>
        <button @click="loadComponent">Load Component</button>
        <component :is="componentToShow"></component>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            componentToShow: null,
        };
    },
    methods: {
        async loadComponent() {
            if (!this.componentToShow) {
                const { default: LazyComponent } = await import('./LazyComponent.vue');
                this.componentToShow = LazyComponent;
            }
        },
    },
};
</script>

<style scoped lang="less">
#app {
    text-align: center;
    color: #42b983;

    button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }
}
</style>