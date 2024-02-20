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
    ],
    dataObj: {
        earth: deepCopy(require("./json/earth.json"), []),
        dizzy: deepCopy(require("./json/dizzy.json"), []),
    }
}