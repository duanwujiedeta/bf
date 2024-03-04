import { deepCopy } from "@/util/common";
export default {
    speedOpt: [
        {
            value: 0.5,
            label: 0.5,
        },
        {
            value: 1,
            label: 1,
        },
        {
            value: 1.5,
            label: 1.5,
        },
        {
            value: 2,
            label: 2,
        },
        {
            value: 2.5,
            label: 2.5,
        },
        {
            value: 3,
            label: 3,
        },
        {
            value: 3.5,
            label: 3.5,
        },
        {
            value: 4,
            label: 4,
        },
        {
            value: 4.5,
            label: 4.5,
        },
        {
            value: 5,
            label: 5,
        }
    ],
    options: [
        {
            value: "yuren",
            label: "yuren",
        },
        {
            value: "indepandie",
            label: "百科",
        },
        {
            value: "tiny",
            label: "tiny",
        },
        {
            value: "zuijzf",
            label: "zuijzf",
        },
        {
            value: "alats",
            label: "alats",
        },
        {
            value: "theau",
            label: "theau",
        },
        {
            value: "thusaurus",
            label: "thusaurus",
        },
        {
            value: "child",
            label: "child",
        },
        {
            value: "cld",
            label: "cld",
        },
        {
            value: "ult",
            label: "ult",
        },
        {
            value: "cook",
            label: "cook",
        },
        {
            value: "level",
            label: "level",
        },
        {
            value: "home",
            label: "home",
        },
        {
            value: "level07",
            label: "level07",
        },
        {
            value: "chd",
            label: "chd",
        },
        {
            value: "yousee",
            label: "yousee",
        },
        {
            value: "bugs",
            label: "bugs",
        },
        {
            value: "china",
            label: "china",
        },
        {
            value: "spaces",
            label: "spaces",
        },
        {
            value: "swim",
            label: "swim",
        },
        {
            value: "light",
            label: "light",
        },
        {
            value: "horses",
            label: "horses",
        },
        {
            value: "books",
            label: "books",
        },
        {
            value: "quiz",
            label: "quiz",
        },
        {
            value: "animal",
            label: "animal",
        },
        {
            value: "earth",
            label: "earth",
        },
        {
            value: "webp",
            label: "webp",
        },
        {
            value: "fenlei",
            label: "fenlei",
        },
    ],
    dataObj: {
        ult: deepCopy(require("./ult.json"), []),
        indepandie: deepCopy(require("./indepandie.json"), []),
        yuren: deepCopy(require("./yuren.json"), []),
        tiny: deepCopy(require("./tiny.json"), []),
        zuijzf: deepCopy(require("./zuijzf.json"), []),
        alats: deepCopy(require("./alats.json"), []),
        theau: deepCopy(require("./theau.json"), []),
        thusaurus: deepCopy(require("./thusaurus.json"), []),
        child: deepCopy(require("./child.json"), []),
        cld: deepCopy(require("./cld.json"), []),
        cook: deepCopy(require("./home/cook.json"), []),
        level: deepCopy(require("./home/level.json"), []),
        home: deepCopy(require("./home/home.json"), []),
        level07: deepCopy(require("./home/level07.json"), []),
        chd: deepCopy(require("./home/chd.json"), []),
        yousee: deepCopy(require("./home/yousee.json"), []),
        bugs: deepCopy(require("./home/bugs.json"), []),
        china: deepCopy(require("./home/china.json"), []),
        spaces: deepCopy(require("./home/spaces.json"), []),
        swim: deepCopy(require("./home/swim.json"), []),
        light: deepCopy(require("./home/light.json"), []),
        horses: deepCopy(require("./home/horses.json"), []),
        books: deepCopy(require("./home/books.json"), []),
        quiz: deepCopy(require("./home/quiz.json"), []),
        animal: deepCopy(require("./home/animal.json"), []),
        earth: deepCopy(require("./home/earth.json"), []),
        webp: deepCopy(require("./home/webp.json"), []),
        fenlei: deepCopy(require("./home/fenlei.json"), []),
    }
}