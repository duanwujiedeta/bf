new Vue({
    comment: true,
    el: '#app',
    template: `<div><div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>Not A/B/C</div></div>`,
    data: function () {
        return {
            type: "A"
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
with(this){return _c('div',[(type === 'A')?_c('div',[_v(\"A\")]):(type === 'B')?_c('div',[_v(\"B\")]):(type === 'C')?_c('div',[_v(\"C\")]):_c('div',[_v(\"Not A/B/C\")])])}
*/