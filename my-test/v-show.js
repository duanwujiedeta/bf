new Vue({
    comment: true,
    el: '#app',
    template: `<h1 v-show="ok">Hello!</h1>`,
    data: function () {
        return {
            ok: true
        }
    }
});



/* 
ast

{
    "type": 1,
    "tag": "h1",
    "attrsList": [
        {
            "name": "v-show",
            "value": "ok",
            "start": 4,
            "end": 15
        }
    ],
    "attrsMap": {
        "v-show": "ok"
    },
    "rawAttrsMap": {
        "v-show": {
            "name": "v-show",
            "value": "ok",
            "start": 4,
            "end": 15
        }
    },
    "children": [
        {
            "type": 3,
            "text": "Hello!",
            "start": 16,
            "end": 22,
            "static": true
        }
    ],
    "start": 0,
    "end": 27,
    "plain": false,
    "hasBindings": true,
    "directives": [
        {
            "name": "show",
            "rawName": "v-show",
            "value": "ok",
            "arg": null,
            "isDynamicArg": false,
            "start": 4,
            "end": 15
        }
    ],
    "static": false,
    "staticRoot": false
}

*/


/* 
with(this){return _c('h1',{directives:[{name:"show",rawName:"v-show",value:(ok),expression:"ok"}]},[_v("Hello!")])}
*/