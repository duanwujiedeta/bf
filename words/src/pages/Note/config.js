import { deepCopy } from "@/util/common";
export default {
    options: [
        {
            value: "earth",
            label: "earth",
        },
        {
            value: "dizzy",
            label: "dizzy",
        },
        {
            value: "ssex",
            label: "ssex",
        },
        {
            value: "webpack",
            label: "webpack",
        },
        {
            value: "webp",
            label: "webp",
        },
        {
            value: "webpf",
            label: "webpf",
        },
        {
            value: "yuren",
            label: "yuren",
        },
        {
            value: "yuren1",
            label: "yuren1",
        },
        {
            value: "yuren3",
            label: "yuren3",
        },
        {
            value: "fenlei",
            label: "fenlei",
        },
        {
            value: "fenlei1",
            label: "fenlei1",
        },
        {
            value: "vue",
            label: "vue",
        },
        {
            value: "vue1",
            label: "vue1",
        },
        {
            value: "vue2",
            label: "vue2",
        },
        {
            value: "go",
            label: "go",
        },
    ],
    dataObj: {
        earth: deepCopy(require("./json/earth.json"), []),
        dizzy: deepCopy(require("./json/dizzy.json"), []),
        ssex: deepCopy(require("./json/ssex.json"), []),
        webpack: deepCopy(require("./json/webpack.json"), []),
        webp: deepCopy(require("./json/webp.json"), []),
        webpf: deepCopy(require("./json/webpf.json"), []),
        yuren: deepCopy(require("./json/yuren.json"), []),
        yuren1: deepCopy(require("./json/yuren1.json"), []),
        vue: deepCopy(require("./json/vue.json"), []),
        vue1: deepCopy(require("./json/vue1.json"), []),
        vue2: deepCopy(require("./json/vue2.json"), []),
        go: deepCopy(require("./json/go.json"), []),
        yuren3: deepCopy(require("./json/yuren3.json"), []),
        fenlei: deepCopy(require("./json/fenlei.json"), []),
        fenlei1: deepCopy(require("./json/fenlei1.json"), []),
    }
}