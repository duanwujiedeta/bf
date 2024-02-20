import { deepCopy } from "@/util/common";
export default {
    options: [
        {
            value: "earth",
            label: "earth",
        },
    ],
    dataObj: {
        earth: deepCopy(require("./json/earth.json"), []),
    }
}