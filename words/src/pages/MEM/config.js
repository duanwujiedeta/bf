import { deepCopy } from "@/util/common";
export default {
    options: [
        {
            value: "linking",
            label: "linking",
        }
    ],
    dataObj: {
        linking: deepCopy(require("./json/linking.json"), []),
    }
}