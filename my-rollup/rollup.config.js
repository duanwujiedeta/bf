export default {
    // input: ["src/main.js","src/main1.js"], // 以数组字符串作为 input 选项
    // input:{"s1":"src/main.js","s2":"src/main1.js"}, //
    // input:{"main":"src/main.js","a/index":"src/folder-a/a.js"}, // 以 a/index 作为 key，则在生成的目录中产生了子目录文件夹  a  。
    // preserveModules: true,
    input: "src/main.js", //以字符串作为入口参数
    /* treeshake: {
        moduleSideEffects: ["external-a"],// 该选项会保留 external-a 模块，默认为 true （保存），false 的时候，会自动去除
    }, */
    output: {
        // esModule: true,
        dir: './build', //如果有多个入口，则需要指定该选项
        // format: 'iife',// iife 选项的时候不支持多个入口，只能单入口对应单出口,以至于某些就需要用代码控制，或者多配置文件控制
        // entryFileNames: 'entry-[name].js', //用于控制输出文件名
        // sourcemap: true //添加来源指引
    },


    //treeshake
    /* treeshake: {
        pureExternalModules: false
    }, */


    // external: "./test1"// 不参与打包的选项，import test1 from "./test1" 与 from 后面的值保持一致。  创建 iife 或 umd 格式的 bundle 时，你需要通过 output.globals 选项来提供全局变量名称，以替换外部引入。
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


    // onwarn
    /*
    onwarn (warning, warn) { // 当cli中添加 --silent 选项的时候，该方法只会通知到警告的，比如一些过期的API   treeshake.pureExternalModules
        console.log("warning message in config file.");
        // skip certain warnings
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;

        // throw on others
        if (warning.code === 'NON_EXISTENT_EXPORT') throw new Error(warning.message);
        // Use default for everything else
        warn(warning);
    } */
    /* onwarn({
        loc,
        frame,
        message
    }) { // 用于定位行号 文件名  报错信息
        if (loc) {
            console.warn(`${loc.file} (${loc.line}:${loc.column}) ${message}`);
            if (frame) console.warn(frame);
        } else {
            console.warn(message);
        }
    } */
};