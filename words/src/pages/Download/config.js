import { deepCopy } from "@/util/common";

export default {
    dataObj: {
        tranData: deepCopy(require("./indepandie.json"), []),
        origTranData: deepCopy(require("./indepandie.json"), []),
        tiny: deepCopy(require("./tiny.json"), []),
        zuijzf: deepCopy(require("./zuijzf.json"), []),
        alats: deepCopy(require("./alats.json"), []),
        theau: deepCopy(require("./theau.json"), []),
        thusaurus: deepCopy(require("./thusaurus.json"), []),
        child: deepCopy(require("./child.json"), []),
        cld: deepCopy(require("./cld.json"), []),
        ult: deepCopy(require("./ult.json"), []),
        cook: deepCopy(require("./cook.json"), []),
        level: deepCopy(require("./level.json"), []),
        home: deepCopy(require("./home.json"), []),
        level07: deepCopy(require("./level07.json"), []),
        chd: deepCopy(require("./chd.json"), []),
        yousee: deepCopy(require("./yousee.json"), []),
        bugs: deepCopy(require("./bugs.json"), []),
        china: deepCopy(require("./china.json"), []),
        spaces: deepCopy(require("./spaces.json"), []),
        swim: deepCopy(require("./swim.json"), []),
        light: deepCopy(require("./light.json"), []),
        horses: deepCopy(require("./horses.json"), []),
        books: deepCopy(require("./books.json"), []),
        quiz: deepCopy(require("./quiz.json"), []),
        animal: deepCopy(require("./animal.json"), []),
        earth: deepCopy(require("./earth.json"), []),
    }
}