export default {
    input: 'src/main.js',
    output: {
        file: './build/bundle.js',
        format: 'cjs'
    },
    // external: "./test1"// 不参与打包的选项，import test1 from "./test1" 与 from 后面的值保持一致
    /*  external: (id) => {
        console.log(id);
        console.log(111111111111);
        return false;
    } */
    /* external函数打印的值分别为：
    ./test
    111111111111
    ./test1
    111111111111
    E:\my\bf\my-rollup\src\test.js
    111111111111
    E:\my\bf\my-rollup\src\test1.js
    111111111111
    */
};