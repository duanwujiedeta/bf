new Vue({
    comment: true,
    el: '#app',
    template: `<span v-text="msg"></span>`,
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
    "tag": "span",
    "attrsList": [
        {
            "name": "v-text",
            "value": "msg",
            "start": 6,
            "end": 18
        }
    ],
    "attrsMap": {
        "v-text": "msg"
    },
    "rawAttrsMap": {
        "v-text": {
            "name": "v-text",
            "value": "msg",
            "start": 6,
            "end": 18
        }
    },
    "children": [],
    "start": 0,
    "end": 26,
    "plain": false,
    "hasBindings": true,
    "directives": [
        {
            "name": "text",
            "rawName": "v-text",
            "value": "msg",
            "arg": null,
            "isDynamicArg": false,
            "start": 6,
            "end": 18
        }
    ],
    "static": false,
    "staticRoot": false,
    "props": [
        {
            "name": "textContent",
            "value": "_s(msg)",
            "start": 6,
            "end": 18
        }
    ]
}

*/


/* 
with(this){return _c('span',{domProps:{\"textContent\":_s(msg)}})}
*/