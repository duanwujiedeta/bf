new Vue({
    comment: true,
    el: '#app',
    template: `<div v-html="msg"></div>`,
    data: function () {
        return {
            msg: '<div>示例标题</div>'
        }
    }
});



/* 
ast

{
    "type": 1,
    "tag": "div",
    "attrsList": [
        {
            "name": "v-html",
            "value": "msg",
            "start": 5,
            "end": 17
        }
    ],
    "attrsMap": {
        "v-html": "msg"
    },
    "rawAttrsMap": {
        "v-html": {
            "name": "v-html",
            "value": "msg",
            "start": 5,
            "end": 17
        }
    },
    "children": [],
    "start": 0,
    "end": 24,
    "plain": false,
    "hasBindings": true,
    "directives": [
        {
            "name": "html",
            "rawName": "v-html",
            "value": "msg",
            "arg": null,
            "isDynamicArg": false,
            "start": 5,
            "end": 17
        }
    ],
    "static": false,
    "staticRoot": false,
    "props": [
        {
            "name": "innerHTML",
            "value": "_s(msg)",
            "start": 5,
            "end": 17
        }
    ]
}

*/


/* 
with(this){return _c('div',{domProps:{"innerHTML":_s(msg)}})}
*/