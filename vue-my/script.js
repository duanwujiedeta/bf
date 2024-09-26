const vm = new Vue({
    // 基本选项
    data: {
        message: 'Hello Vue!'
    },
    computed: {
        reversedMessage() {
            return this.message.split('').reverse().join('');
        }
    },
    methods: {
        greet() {
            alert(this.message);
        }
    },
    watch: {
        message(newVal, oldVal) {
            console.log(`Message changed from ${oldVal} to ${newVal}`);
        }
    },
    created() {
        console.log('Vue instance created!');
    },
    mounted() {
        console.log('Vue instance mounted!');
    },
    destroyed() {
        console.log('Vue instance destroyed!');
    },
    components: {
        // 注册局部组件
        MyComponent: {
            template: '<div>A custom component!</div>'
        }
    },
    directives: {
        // 自定义指令
        myDirective: {
            bind(el, binding) {
                el.textContent = binding.value;
            }
        }
    },
    filters: {
        // 自定义过滤器
        uppercase(value) {
            return value.toUpperCase();
        }
    },
    provide: {
        // 注入依赖
        myData: 'some data'
    },
    inject: {
        'myData': {
            default: "test"
        }
    }, // 注入依赖
});

// vm.$children 属性是一个数组，用来存储需要使用 Vue 来进行初始化的组件对象
