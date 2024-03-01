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
            value: "vue",
            label: "vue",
        },
        {
            value: "yuren3",
            label: "yuren3",
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
        yuren3: deepCopy(require("./json/yuren3.json"), []),
    }
}