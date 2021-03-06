'use strict';
// --------------
// 开发环境的判断
var __DEV__ = true;
var canUseDOM = typeof window !== 'undefined';

// --------------
// `ExecutionEnvironment`
// 是否浏览器、this的返回、是否在Worker中
var ExecutionEnvironment = {
    canUseDOM: canUseDOM,
    canUseWorkers: typeof Worker !== 'undefined',
    isInWorker: !canUseDOM,
    global: new Function('return this;')()
};
var ExecutionEnvironment_1 = ExecutionEnvironment;

// --------------
// `ReactCurrentOwner`
// 含有一个 current 属性，默认为 null
var ReactCurrentOwner = {
    current: null
};
var ReactCurrentOwner_1 = ReactCurrentOwner;

// --------------
// `isNumber`
// 用来判断哪些那些 css 值是不用加 px的
var isNumber = {
    fillOpacity: true,
    fontWeight: true,
    opacity: true,
    orphans: true,
    textDecoration: true,
    zIndex: true,
    zoom: true
};

// --------------
// `CSSProperty`
// 含有属性 isNumber
var CSSProperty = {
    isNumber: isNumber
};
var CSSProperty_1 = CSSProperty;

// --------------
// `dangerousStyleValue`
// 传入css或属性的 v k，返回是否需要添加 px 为单位的值
function dangerousStyleValue(styleName, value) {
    if (value === null || value === false || value === true || value === '') {
        return ''
    }
    if (isNaN(value)) {
        return !value ? '' : '' + value
    }
    return CSSProperty_1.isNumber[styleName] ? '' + value : (value + 'px')
}
var dangerousStyleValue_1 = dangerousStyleValue;

// --------------
// `throwIf`
// 传入条件和message，如果条件成立，则报错吐出 message
var throwIf = function (condition, err) {
    if (condition) {
        throw new Error(err);
    }
};
var throwIf_1 = throwIf;

// --------------
// `ESCAPE_TYPE_ERR`
// 用于显示 escapeTextForBrowser 时，如果不是字符串的时候的报错信息
var ESCAPE_TYPE_ERR;
if (__DEV__) {
    ESCAPE_TYPE_ERR = 'The React core has attempted to escape content that is of a mysterious type (object etc) Escaping only works on numbers and strings'
}

// --------------
// `ESCAPE_LOOKUP`
// html转义字符的对象
var ESCAPE_LOOKUP = {
    "&": "&amp;",
    ">": "&gt;",
    "<": "&lt;",
    "\"": "&quot;",
    "'": "&#x27;",
    "/": "&#x2f;"
};

// --------------
// `escaper`
// 传入 ESCAPE_LOOKUP 的 key,返回他的 value
function escaper(match) {
    return ESCAPE_LOOKUP[match]
}

// --------------
// `escapeTextForBrowser`
// 传入字符串，把 ESCAPE_LOOKUP 对象的 key 替换为value
var escapeTextForBrowser = function (text) {
    var type = typeof text;
    var invalid = type === 'object';
    if (__DEV__) {
        throwIf_1(invalid, ESCAPE_TYPE_ERR);
    }
    if (text === '' || invalid) {
        return ''
    } else {
        if (type === 'string') {
            return text.replace(/[&><"'\/]/g, escaper)
        } else {
            return ('' + text).replace(/[&><"'\/]/g, escaper)
        }
    }
};

var escapeTextForBrowser_1 = escapeTextForBrowser;

// --------------
// `_uppercasePattern`
// 匹配大写的英文字母
var _uppercasePattern = /([A-Z])/g;

// --------------
// `hyphenate`
// 把字符串中的大写字母转为小写，并在其前面添加 - 
function hyphenate(string) {
    return string.replace(_uppercasePattern, '-$1').toLowerCase()
}
var hyphenate_1 = hyphenate;

// --------------
// `memoizeStringOnly`
// 传入一个函数，返回一个含有闭包作用域的函数，返回的函数只接收字符串做参数
function memoizeStringOnly(callback) {
    var cache = {};
    return function (string) {
        if (cache.hasOwnProperty(string)) {
            return cache[string]
        } else {
            return cache[string] = callback.call(this, string)
        }
    }
}
var memoizeStringOnly_1 = memoizeStringOnly;

// --------------
// `processStyleName`
// 把字符串转为 -$ ，然后再把ESCAPE_LOOKUP 的 key 替换为它的值
var processStyleName = memoizeStringOnly_1(function (styleName) {
    return escapeTextForBrowser_1(hyphenate_1(styleName))
});

// --------------
// `CSSPropertyOperations`
// 含有两个方法 createMarkupForStyles setValueForStyles，用于设置html的样式方法
var CSSPropertyOperations = {
    // --------------
    // `createMarkupForStyles`
    // 传入一个对象，生成 css 的行内样式，key 值用 [`processStyleName`](#section-31) ，value值使用[`dangerousStyleValue`](#section-13)来进行转化
    createMarkupForStyles: function (styles) {
        var serialized = '';
        for (var styleName in styles) {
            if (!styles.hasOwnProperty(styleName)) {
                continue
            }
            var styleValue = styles[styleName];
            if (typeof styleValue !== 'undefined') {
                serialized += processStyleName(styleName) + ':';
                serialized += dangerousStyleValue_1(styleName, styleValue) + ';'
            }
        }
        return serialized
    },
    // --------------
    // `setValueForStyles`
    // 根据node元素，取出style，再使用[`dangerousStyleValue`](#section-13)转化value后，设置为node.style对应的值
    setValueForStyles: function (node, styles) {
        var style = node.style;
        for (var styleName in styles) {
            if (!styles.hasOwnProperty(styleName)) {
                continue
            }
            var styleValue = styles[styleName];
            style[styleName] = dangerousStyleValue_1(styleName, styleValue)
        }
    }
};
var CSSPropertyOperations_1 = CSSPropertyOperations;

// --------------
// `DOM_UNSUPPORTED`，`NO_MARKUP_PARENT`，`NO_MULTI_MARKUP`
// `DOM_UNSUPPORTED`不能使用DOM的错误消息，`NO_MARKUP_PARENT`没有父级元素的错误信息，`NO_MULTI_MARKUP`没有markup时的错误信息
var DOM_UNSUPPORTED;
var NO_MARKUP_PARENT;
var NO_MULTI_MARKUP;
if (__DEV__) {
    DOM_UNSUPPORTED = 'You may not insert markup into the document while you are in a worker thread. It\'s not you, it\'s me. This is likely the fault of the framework. Please report this immediately.';
    NO_MARKUP_PARENT = 'You have attempted to inject markup without a suitable parent. This is likely the fault of the framework - please report immediately.';
    NO_MULTI_MARKUP = 'The framework has attempted to either insert zero or multiple markup roots into a single location when it should not. This is a serious error - a fault of the framework - please report immediately.'
}
var validateMarkupParams;
if (__DEV__) {

    // --------------
    // `validateMarkupParams`
    // 插入html字符串的过滤判断方法
    validateMarkupParams = function (parentNode, markup) {
        throwIf_1(!ExecutionEnvironment_1.canUseDOM, DOM_UNSUPPORTED);
        throwIf_1(!parentNode || !parentNode.tagName, NO_MARKUP_PARENT);
        throwIf_1(!markup, NO_MULTI_MARKUP);
    }
}

// --------------
// `dummies`
// 根据元素名称做存储，div的key存储的时一个元素标签名为
var dummies = {};

// --------------
// `getParentDummy`
// 根据dom元素，创建一个相同tagName的元素，如果已创建，则返回先前创建的元素
function getParentDummy(parent) {
    var parentTag = parent.tagName;
    return dummies[parentTag] || (dummies[parentTag] = document.createElement(parentTag))
}

// --------------
// `insertNodeAfterNode`
// elem、insert、after，在 elem 的子元素 after 后面插入 insert 元素
function insertNodeAfterNode(elem, insert, after) {
    if (__DEV__) {
        throwIf_1(!ExecutionEnvironment_1.canUseDOM, DOM_UNSUPPORTED);
    }
    if (after) {
        if (after.nextSibling) { // 有子元素
            return elem.insertBefore(insert, after.nextSibling)
        } else { // 作为最后一个元素
            return elem.appendChild(insert)
        }
    } else {
        return elem.insertBefore(insert, elem.firstChild)
    }
}

// --------------
// `inefficientlyInsertHTMLCollectionAfter`
// 在元素父元素`parentRootDomNode`，插入`htmlCollection`dom列表，插入的点在`after`之后
function inefficientlyInsertHTMLCollectionAfter(parentRootDomNode, htmlCollection, after) {
    if (__DEV__) {
        throwIf_1(!ExecutionEnvironment_1.canUseDOM, DOM_UNSUPPORTED);
    }
    var ret;
    var originalLength = htmlCollection.length;
    for (var i = 0; i < originalLength; i++) {
        ret = insertNodeAfterNode(parentRootDomNode, htmlCollection[0], ret || after)
    }
}

// --------------
// `dangerouslyInsertMarkupAt`
// 在`parentNode`的`index`元素后插入html字符串`markup`
function dangerouslyInsertMarkupAt(parentNode, markup, index) {
    if (__DEV__) {
        validateMarkupParams(parentNode, markup)
    }
    var parentDummy = getParentDummy(parentNode);
    parentDummy.innerHTML = markup;
    var htmlCollection = parentDummy.childNodes;
    var afterNode = index ? parentNode.childNodes[index - 1] : null;
    // --------------
    // [`inefficientlyInsertHTMLCollectionAfter`](#section-49)
    inefficientlyInsertHTMLCollectionAfter(parentNode, htmlCollection, afterNode)
}

// --------------
// `dangerouslyReplaceNodeWithMarkup`
// 用`markup`生成dom元素，替换掉`childNode`元素，注意`markup`是一个顶级的元素
function dangerouslyReplaceNodeWithMarkup(childNode, markup) {
    var parentNode = childNode.parentNode;
    if (__DEV__) {
        validateMarkupParams(parentNode, markup)
    }
    var parentDummy = getParentDummy(parentNode);
    parentDummy.innerHTML = markup;
    var htmlCollection = parentDummy.childNodes;
    if (__DEV__) {
        throwIf_1(htmlCollection.length !== 1, NO_MULTI_MARKUP);
    }
    parentNode.replaceChild(htmlCollection[0], childNode)
}

// --------------
// `Danger`
// [`dangerouslyInsertMarkupAt`](#section-51)用于把html字符串插入到元素，[`dangerouslyReplaceNodeWithMarkup`](#section-55)用于把html元素替换掉dom元素
var Danger = {
    dangerouslyInsertMarkupAt: dangerouslyInsertMarkupAt,
    dangerouslyReplaceNodeWithMarkup: dangerouslyReplaceNodeWithMarkup
};
var Danger_1 = Danger;

// --------------
// `insertNodeAt`
// 在`root`子元素中，第`atIndex`个元素前面插入`node`元素
function insertNodeAt(root, node, atIndex) {
    var childNodes = root.childNodes;
    var curAtIndex = root.childNodes[atIndex];
    if (curAtIndex === node) {
        return node
    }
    if (node.parentNode) {
        node.parentNode.removeChild(node)
    }
    if (atIndex >= childNodes.length) {
        root.appendChild(node)
    } else {
        root.insertBefore(node, childNodes[atIndex])
    }
    return node
}
var insertNodeAt_1 = insertNodeAt;

// --------------
// `keyOf`
// 拿取 `oneKeyObj`对象的第一个 key，没有则返回 null
var keyOf = function (oneKeyObj) {
    var key;
    for (key in oneKeyObj) {
        if (!oneKeyObj.hasOwnProperty(key)) {
            continue
        }
        return key
    }
    return null
};
var keyOf_1 = keyOf;

// --------------
// `NON_INCREASING_OPERATIONS`
// dom元素列表，超过索引的报错信息
var NON_INCREASING_OPERATIONS;
if (__DEV__) {
    NON_INCREASING_OPERATIONS = 'DOM child management operations must be provided in order of increasing destination index. This is likely an issue with the core framework.'
}

// --------------
// `MOVE_NODE_AT_ORIG_INDEX`
// 字符串 moveFrom ,一个dom元素对象的属性标识
var MOVE_NODE_AT_ORIG_INDEX = keyOf_1({
    moveFrom: null
});

// --------------
// `INSERT_MARKUP`
// 字符串 insertMarkup ,一个dom元素对象的属性标识
var INSERT_MARKUP = keyOf_1({
    insertMarkup: null
});

// --------------
// `REMOVE_AT`
// 字符串 removeAt ,一个dom元素对象的属性标识
var REMOVE_AT = keyOf_1({
    removeAt: null
});

// --------------
// `_getNodesByOriginalIndex`
// 提供一个dom列表`childOperations`，并遍历childOperations，取出它的每个moveFrom或者moveAt属性（也是parent子元素的索引），从`parent`取出索引后，塞入到`nodesByOriginalIndex`数组中并返回
var _getNodesByOriginalIndex = function (parent, childOperations) {
    var nodesByOriginalIndex;
    var childOperation;
    var origIndex;
    for (var i = 0; i < childOperations.length; i++) {
        childOperation = childOperations[i];
        if (MOVE_NODE_AT_ORIG_INDEX in childOperation) {
            nodesByOriginalIndex = nodesByOriginalIndex || [];
            origIndex = childOperation.moveFrom;
            nodesByOriginalIndex[origIndex] = parent.childNodes[origIndex]
        } else if (REMOVE_AT in childOperation) {
            nodesByOriginalIndex = nodesByOriginalIndex || [];
            origIndex = childOperation.removeAt;
            nodesByOriginalIndex[origIndex] = parent.childNodes[origIndex]
        }
    }
    return nodesByOriginalIndex
};

// --------------
// `_removeChildrenByOriginalIndex`
// 根据`nodesByOriginalIndex`的dom元素顺序，依次从`parent`元素中把子元素移除
var _removeChildrenByOriginalIndex = function (parent, nodesByOriginalIndex) {
    for (var j = 0; j < nodesByOriginalIndex.length; j++) {
        var nodeToRemove = nodesByOriginalIndex[j];
        if (nodeToRemove) {
            parent.removeChild(nodesByOriginalIndex[j])
        }
    }
};

// --------------
// `_placeNodesAtDestination`
// 该方法用于移动dom元素位置，遍历循环`childOperations`，如果childOperations元素列表中含有moveFrom属性，则在取出`nodesByOriginalIndex`元素中`moveFrom`索引对应的索引元素，并插入到`childOperation.finalIndex`元素的前面，或者moveAt属性，在`childOperation.finalIndex`前插入`childOperation.insertMarkup`html文本。[`insertNodeAt`](#section-59)，[`insertNodeAt`](#section-51)。
var _placeNodesAtDestination = function (parent, childOperations, nodesByOriginalIndex) {
    var origNode;
    var finalIndex;
    var lastFinalIndex = -1;
    var childOperation;
    for (var k = 0; k < childOperations.length; k++) {
        childOperation = childOperations[k];
        if (MOVE_NODE_AT_ORIG_INDEX in childOperation) {
            origNode = nodesByOriginalIndex[childOperation.moveFrom];
            finalIndex = childOperation.finalIndex;
            insertNodeAt_1(parent, origNode, finalIndex);
            if (__DEV__) {
                throwIf_1(finalIndex <= lastFinalIndex, NON_INCREASING_OPERATIONS);
                lastFinalIndex = finalIndex
            }
        } else if (REMOVE_AT in childOperation);
        else if (INSERT_MARKUP in childOperation) {
            finalIndex = childOperation.finalIndex;
            var markup = childOperation.insertMarkup;
            Danger_1.dangerouslyInsertMarkupAt(parent, markup, finalIndex);
            if (__DEV__) {
                throwIf_1(finalIndex <= lastFinalIndex, NON_INCREASING_OPERATIONS);
                lastFinalIndex = finalIndex
            }
        }
    }
};

// --------------
// `manageChildren`
// 从`parent`中取出`nodesByOriginalIndex`,并把nodesByOriginalIndex的所有子元素移除；移除完毕后，再把childOperations按照moveFrom或insertMarkup来从新定位顺序
var manageChildren = function (parent, childOperations) {
    var nodesByOriginalIndex = _getNodesByOriginalIndex(parent, childOperations);
    if (nodesByOriginalIndex) {
        _removeChildrenByOriginalIndex(parent, nodesByOriginalIndex)
    }
    _placeNodesAtDestination(parent, childOperations, nodesByOriginalIndex)
};

// --------------
// `setTextNodeValueAtIndex`
// 把`parent`元素的第`index`个子元素的文本替换为`val`
var setTextNodeValueAtIndex = function (parent, index, val) {
    parent.childNodes[index].nodeValue = val
};

// --------------
// `manageChildren`
// [`dangerouslyReplaceNodeWithMarkup`](#section-55)，[`manageChildren`](#section-77)，，[`setTextNodeValueAtIndex`](#section-79)。
var DOMChildrenOperations = {
    dangerouslyReplaceNodeWithMarkup: Danger_1.dangerouslyReplaceNodeWithMarkup,
    manageChildren: manageChildren,
    setTextNodeValueAtIndex: setTextNodeValueAtIndex
};
var DOMChildrenOperations_1 = DOMChildrenOperations;

// --------------
// `createCommonjsModule`
// 传入一个函数并执行，函数的参数分别为`module`、`module.exports`,最后返回module.exports
function createCommonjsModule(fn) {
    var module = {
        exports: {}
    };
    return fn(module, module.exports), module.exports
}

// --------------
// `invariant`
// 一个和throwIf相反的函数，如果条件为false的时候，则报错。
var invariant_1 = createCommonjsModule(function (module) {
    function invariant(condition) {
        if (!condition) {
            throw new Error('Invariant Violation');
        }
    }
    module.exports = invariant;
    if (__DEV__) {
        var invariantDev = function (condition, format, a, b, c, d, e, f) {
            if (format === undefined) {
                throw new Error('invariant requires an error message argument');
            }
            if (!condition) {
                var args = [a, b, c, d, e, f];
                var argIndex = 0;
                throw new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
                    return args[argIndex++];
                }))
            }
        };
        module.exports = invariantDev
    }
});

// --------------
// `DOMProperty`
// `isCustomAttribute`，一个函数，用于判断一个字符串是否为自定义属性。
var DOMProperty = {
    isStandardName: {},// `Properties`所有key为key，value值都为vallue
    getAttributeName: {},// `Properties`所有key为key，value优先为`DOMAttributeNames`的value，不然则是`Properties`的key
    getPropertyName: {},// `Properties`所有key为key，value优先为`DOMPropertyNames`的value，不然则是`Properties`的key
    getMutationMethod: {},// {className:}function (node, value) { node.className = value || '' }
    mustUseAttribute: {},// `Properties`所有key为key,vlue值为 0 和其他数字
    mustUseProperty: {},// `Properties`所有key为key,vlue值为 0 和其他数字
    hasBooleanValue: {},// `Properties`所有key为key,vlue值为 0 和其他数字
    hasSideEffects: {},// `Properties`所有key为key,vlue值为 0 和其他数字
    isCustomAttribute: RegExp.prototype.test.bind(/^(data|aria)-[a-z_][a-z\d_.\-]*$/)
};
var MustUseAttribute = 0x1;
var MustUseProperty = 0x2;
var HasBooleanValue = 0x4;
var HasSideEffects = 0x8;
var Properties = {
    accept: null,
    action: null,
    ajaxify: MustUseAttribute,
    allowFullScreen: MustUseAttribute | HasBooleanValue,
    alt: null,
    autoComplete: null,
    autoplay: HasBooleanValue,
    cellPadding: null,
    cellSpacing: null,
    checked: MustUseProperty | HasBooleanValue,
    className: MustUseProperty,
    colSpan: null,
    contentEditable: null,
    controls: MustUseProperty | HasBooleanValue,
    data: null,
    dir: null,
    disabled: MustUseProperty | HasBooleanValue,
    enctype: null,
    height: null,
    href: null,
    htmlFor: null,
    max: null,
    method: null,
    min: null,
    multiple: MustUseProperty | HasBooleanValue,
    name: null,
    poster: null,
    preload: null,
    placeholder: null,
    rel: null,
    required: HasBooleanValue,
    role: MustUseAttribute,
    scrollLeft: MustUseProperty,
    scrollTop: MustUseProperty,
    selected: MustUseProperty | HasBooleanValue,
    spellCheck: null,
    src: null,
    step: null,
    style: null,
    tabIndex: null,
    target: null,
    title: null,
    type: null,
    value: MustUseProperty | HasSideEffects,
    width: null,
    wmode: MustUseAttribute,
    cx: MustUseProperty,
    cy: MustUseProperty,
    d: MustUseProperty,
    fill: MustUseProperty,
    fx: MustUseProperty,
    fy: MustUseProperty,
    points: MustUseProperty,
    r: MustUseProperty,
    stroke: MustUseProperty,
    strokeLinecap: MustUseProperty,
    strokeWidth: MustUseProperty,
    transform: MustUseProperty,
    x: MustUseProperty,
    x1: MustUseProperty,
    x2: MustUseProperty,
    version: MustUseProperty,
    viewBox: MustUseProperty,
    y: MustUseProperty,
    y1: MustUseProperty,
    y2: MustUseProperty,
    spreadMethod: MustUseProperty,
    offset: MustUseProperty,
    stopColor: MustUseProperty,
    stopOpacity: MustUseProperty,
    gradientUnits: MustUseProperty,
    gradientTransform: MustUseProperty
};
var DOMAttributeNames = {
    className: 'class',
    htmlFor: 'for',
    strokeLinecap: 'stroke-linecap',
    strokeWidth: 'stroke-width',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity'
};
var DOMPropertyNames = {
    autoComplete: 'autocomplete',
    spellCheck: 'spellcheck'
};
var DOMMutationMethods = {
    className: function (node, value) {
        node.className = value || ''
    }
};
for (var propName in Properties) {
    DOMProperty.isStandardName[propName] = true;
    DOMProperty.getAttributeName[propName] = DOMAttributeNames[propName] || propName.toLowerCase();
    DOMProperty.getPropertyName[propName] = DOMPropertyNames[propName] || propName;
    var mutationMethod = DOMMutationMethods[propName];
    if (mutationMethod) {
        DOMProperty.getMutationMethod[propName] = mutationMethod
    }
    var propConfig = Properties[propName];
    DOMProperty.mustUseAttribute[propName] = propConfig & MustUseAttribute;
    DOMProperty.mustUseProperty[propName] = propConfig & MustUseProperty;
    DOMProperty.hasBooleanValue[propName] = propConfig & HasBooleanValue;
    DOMProperty.hasSideEffects[propName] = propConfig & HasSideEffects;
    invariant_1(!DOMProperty.mustUseAttribute[propName] || !DOMProperty.mustUseProperty[propName], 'DOMProperty: Cannot use require using both attribute and property: %s', propName);
    invariant_1(DOMProperty.mustUseProperty[propName] || !DOMProperty.hasSideEffects[propName], 'DOMProperty: Properties that have side effects must use property: %s', propName)
}
var DOMProperty_1 = DOMProperty;

// --------------
// `processAttributeNameAndPrefix`
// 传入字符串，去驼峰，再转义
var processAttributeNameAndPrefix = memoizeStringOnly_1(function (name) {
    return escapeTextForBrowser_1(name) + '="'
});

// --------------
// `DOMPropertyOperations`
// `createMarkupForProperty`，`setValueForProperty`都是用来设置样式
var DOMPropertyOperations = {
    // --------------
    // createMarkupForProperty
    // 传入 `name`、`value`，并生成 XXX="XXX"
    createMarkupForProperty: function (name, value) {
        if (DOMProperty_1.isStandardName[name]) {
            if (value == null || DOMProperty_1.hasBooleanValue[name] && !value) {
                return ''
            }
            var attributeName = DOMProperty_1.getAttributeName[name];
            return processAttributeNameAndPrefix(attributeName) + escapeTextForBrowser_1(value) + '"'
        } else if (DOMProperty_1.isCustomAttribute(name)) {
            if (value == null) {
                return ''
            }
            return processAttributeNameAndPrefix(name) + escapeTextForBrowser_1(value) + '"'
        } else {
            return null
        }
    },
    // --------------
    // `setValueForProperty`
    // 用于设置或者移除dom元素`node`的`name`属性
    setValueForProperty: function (node, name, value) {
        if (DOMProperty_1.isStandardName[name]) {
            var mutationMethod = DOMProperty_1.getMutationMethod[name];
            if (mutationMethod) {
                mutationMethod(node, value)
            } else if (DOMProperty_1.mustUseAttribute[name]) {
                if (DOMProperty_1.hasBooleanValue[name] && !value) {
                    node.removeAttribute(DOMProperty_1.getAttributeName[name])
                } else {
                    node.setAttribute(DOMProperty_1.getAttributeName[name], value)
                }
            } else {
                var propName = DOMProperty_1.getPropertyName[name];
                if (!DOMProperty_1.hasSideEffects[name] || node[propName] !== value) {
                    node[propName] = value
                }
            }
        } else if (DOMProperty_1.isCustomAttribute(name)) {
            node.setAttribute(name, value)
        }
    }
};
var DOMPropertyOperations_1 = DOMPropertyOperations;

// --------------
// `BrowserEnv`
// 一个对象，用于记录当前浏览器滚动的偏移量
var BrowserEnv = {
    currentScrollLeft: 0,
    currentScrollTop: 0,
    browserInfo: null,
    refreshAuthoritativeScrollValues: function () {
        BrowserEnv.currentScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
        BrowserEnv.currentScrollTop = document.body.scrollTop + document.documentElement.scrollTop
    }
};
var BrowserEnv_1 = BrowserEnv;

// --------------
// `NOT_OBJECT_ERROR`
// 不是对象的报错信息
var NOT_OBJECT_ERROR = 'NOT_OBJECT_ERROR';
if (__DEV__) {
    NOT_OBJECT_ERROR = 'keyMirror only works on objects'
}

// --------------
// `keyMirror`
// 传入一个对象，返回另一个对象(key为原对象的key，value为原对象的key)
var keyMirror = function (obj) {
    var ret = {};
    var key;
    throwIf_1(!(obj instanceof Object) || Array.isArray(obj), NOT_OBJECT_ERROR);
    for (key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue
        }
        ret[key] = key
    }
    return ret
};
var keyMirror_1 = keyMirror;

// --------------
// `PropagationPhases`
// 一个对象{bubbled:"bubbled",captured:"captured"}
var PropagationPhases$1 = keyMirror_1({
    bubbled: null,
    captured: null
});

// --------------
// `topLevelTypes`
// document元素的事件回调函数标识，都是 topXXX
var topLevelTypes$4 = keyMirror_1({
    topBlur: null,
    topChange: null,
    topClick: null,
    topDOMCharacterDataModified: null,
    topDoubleClick: null,
    topFocus: null,
    topKeyDown: null,
    topKeyPress: null,
    topKeyUp: null,
    topMouseDown: null,
    topMouseMove: null,
    topMouseOut: null,
    topMouseOver: null,
    topMouseUp: null,
    topMouseWheel: null,
    topScroll: null,
    topSubmit: null,
    topTouchCancel: null,
    topTouchEnd: null,
    topTouchMove: null,
    topTouchStart: null
});
var EventConstants = {
    topLevelTypes: topLevelTypes$4,
    PropagationPhases: PropagationPhases$1
};
var EventConstants_1 = EventConstants;

// --------------
// `oneArgumentPooler`
// 用作传入一个参数实例化
var oneArgumentPooler = function (copyFieldsFrom) {
    var Klass = this;
    if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, copyFieldsFrom);
        return instance
    } else {
        return new Klass(copyFieldsFrom)
    }
};

// --------------
// `twoArgumentPooler`
// 用作传入2个参数实例化
var twoArgumentPooler = function (a1, a2) {
    var Klass = this;
    if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2);
        return instance
    } else {
        return new Klass(a1, a2)
    }
};

// --------------
// `fiveArgumentPooler`
// 用作传入5个参数实例化
var fiveArgumentPooler = function (a1, a2, a3, a4, a5) {
    var Klass = this;
    if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2, a3, a4, a5);
        return instance
    } else {
        return new Klass(a1, a2, a3, a4, a5)
    }
};

// --------------
// `standardReleaser`
// 一般是执行完 `perform`后的资源释放方法
var standardReleaser = function (instance) {
    var Klass = this;
    if (instance.destructor) {
        instance.destructor()
    }
    if (Klass.instancePool.length < Klass.poolSize) {
        Klass.instancePool.push(instance)
    }
};
var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

// --------------
// `addPoolingTo`
// 给一个函数`CopyConstructor`设置一些静态属性初始化方法
var addPoolingTo = function (CopyConstructor, pooler) {
    var NewKlass = CopyConstructor;
    NewKlass.instancePool = [];
    NewKlass.getPooled = pooler || DEFAULT_POOLER;
    if (!NewKlass.poolSize) {
        NewKlass.poolSize = DEFAULT_POOL_SIZE
    }
    NewKlass.release = standardReleaser;
    return NewKlass
};

// --------------
// `PooledClass`
// 用于生成初始化和添加初始化函数静态属性的对象
var PooledClass = {
    addPoolingTo: addPoolingTo,
    oneArgumentPooler: oneArgumentPooler,
    twoArgumentPooler: twoArgumentPooler,
    fiveArgumentPooler: fiveArgumentPooler
};
var PooledClass_1 = PooledClass;

// --------------
// `TouchEventUtils`
// 用于解析触摸事件的对象
var TouchEventUtils = {
    extractSingleTouch: function (nativeEvent) {
        var touches = nativeEvent.touches;
        var changedTouches = nativeEvent.changedTouches;
        var hasTouches = touches && touches.length > 0;
        var hasChangedTouches = changedTouches && changedTouches.length > 0;
        return !hasTouches && hasChangedTouches ? changedTouches[0] : hasTouches ? touches[0] : nativeEvent
    }
};
var TouchEventUtils_1 = TouchEventUtils;

// --------------
// `CLONE_TYPE_ERR`
// 克隆 AbstractEvent 对象的报错信息
var CLONE_TYPE_ERR;
if (__DEV__) {
    CLONE_TYPE_ERR = 'You may only clone instances of AbstractEvent for persistent references. Check yourself.'
}
var MAX_POOL_SIZE = 20;

// --------------
// `AbstractEvent`
// `abstractEventType`是一个被加工兼容过的事件对象；`abstractTargetID`是由rt框架生成的id；`originatingTopLevelEventType`用来进一步解析事件的对象
function AbstractEvent(abstractEventType, abstractTargetID, originatingTopLevelEventType, nativeEvent, data) {
    this.type = abstractEventType;
    this.abstractTargetID = abstractTargetID || '';
    this.originatingTopLevelEventType = originatingTopLevelEventType;
    this.nativeEvent = nativeEvent;
    this.data = data;
    this.target = nativeEvent && nativeEvent.target;
    this._dispatchListeners = null;
    this._dispatchIDs = null;
    this.isPropagationStopped = false
}
AbstractEvent.poolSize = MAX_POOL_SIZE;
AbstractEvent.prototype.destructor = function () {
    this.target = null;
    this._dispatchListeners = null;
    this._dispatchIDs = null
};
PooledClass_1.addPoolingTo(AbstractEvent, PooledClass_1.fiveArgumentPooler);
AbstractEvent.prototype.stopPropagation = function () {
    this.isPropagationStopped = true;
    if (this.nativeEvent.stopPropagation) {
        this.nativeEvent.stopPropagation()
    }
    this.nativeEvent.cancelBubble = true
};
AbstractEvent.prototype.preventDefault = function () {
    AbstractEvent.preventDefaultOnNativeEvent(this.nativeEvent)
};
AbstractEvent.preventDefaultOnNativeEvent = function (nativeEvent) {
    if (nativeEvent.preventDefault) {
        nativeEvent.preventDefault()
    } else {
        nativeEvent.returnValue = false
    }
};
AbstractEvent.normalizeScrollDataFromTarget = function (target) {
    return {
        scrollTop: target.scrollTop,
        scrollLeft: target.scrollLeft,
        clientWidth: target.clientWidth,
        clientHeight: target.clientHeight,
        scrollHeight: target.scrollHeight,
        scrollWidth: target.scrollWidth
    }
};
AbstractEvent.normalizeMouseWheelData = function (nativeEvent) {
    var delta = 0;
    var deltaX = 0;
    var deltaY = 0;
    if (nativeEvent.wheelDelta) {
        delta = nativeEvent.wheelDelta / 120
    }
    if (nativeEvent.detail) {
        delta = -nativeEvent.detail / 3
    }
    deltaY = delta;
    if (nativeEvent.axis !== undefined && nativeEvent.axis === nativeEvent.HORIZONTAL_AXIS) {
        deltaY = 0;
        deltaX = -delta
    }
    if (nativeEvent.wheelDeltaY !== undefined) {
        deltaY = nativeEvent.wheelDeltaY / 120
    }
    if (nativeEvent.wheelDeltaX !== undefined) {
        deltaX = -nativeEvent.wheelDeltaX / 120
    }
    return {
        delta: delta,
        deltaX: deltaX,
        deltaY: deltaY
    }
};
AbstractEvent.isNativeClickEventRightClick = function (nativeEvent) {
    return nativeEvent.which ? nativeEvent.which === 3 : nativeEvent.button ? nativeEvent.button === 2 : false
};
AbstractEvent.normalizePointerData = function (nativeEvent) {
    return {
        globalX: AbstractEvent.eventPageX(nativeEvent),
        globalY: AbstractEvent.eventPageY(nativeEvent),
        rightMouseButton: AbstractEvent.isNativeClickEventRightClick(nativeEvent)
    }
};
AbstractEvent.normalizeDragEventData = function (nativeEvent, globalX, globalY, startX, startY) {
    return {
        globalX: globalX,
        globalY: globalY,
        startX: startX,
        startY: startY
    }
};
AbstractEvent.eventPageY = function (nativeEvent) {
    var singleTouch = TouchEventUtils_1.extractSingleTouch(nativeEvent);
    if (singleTouch) {
        return singleTouch.pageY
    } else if (typeof nativeEvent.pageY !== 'undefined') {
        return nativeEvent.pageY
    } else {
        return nativeEvent.clientY + BrowserEnv_1.currentPageScrollTop
    }
};
AbstractEvent.eventPageX = function (nativeEvent) {
    var singleTouch = TouchEventUtils_1.extractSingleTouch(nativeEvent);
    if (singleTouch) {
        return singleTouch.pageX
    } else if (typeof nativeEvent.pageX !== 'undefined') {
        return nativeEvent.pageX
    } else {
        return nativeEvent.clientX + BrowserEnv_1.currentPageScrollLeft
    }
};
AbstractEvent.persistentCloneOf = function (abstractEvent) {
    if (__DEV__) {
        throwIf_1(!(abstractEvent instanceof AbstractEvent), CLONE_TYPE_ERR);
    }
    return new AbstractEvent(abstractEvent.type, abstractEvent.abstractTargetID, abstractEvent.originatingTopLevelEventType, abstractEvent.nativeEvent, abstractEvent.data, abstractEvent.target)
};
var AbstractEvent_1 = AbstractEvent;

// --------------
// `listenerBank`
// 根据元素的事件名，id，记录一系列的回调函数
var listenerBank = {};

// --------------
// `CallbackRegistry`
// 事件的记录对象
var CallbackRegistry = {

    // --------------
    // `putListener`
    // 记录事件
    putListener: function (id, registrationName, listener) {
        var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
        bankForRegistrationName[id] = listener
    },

    // --------------
    // `getListener`
    // 获取事件
    getListener: function (id, registrationName) {
        var bankForRegistrationName = listenerBank[registrationName];
        return bankForRegistrationName && bankForRegistrationName[id]
    },

    // --------------
    // `deleteListener`
    // 删除事件
    deleteListener: function (id, registrationName) {
        var bankForRegistrationName = listenerBank[registrationName];
        if (bankForRegistrationName) {
            delete bankForRegistrationName[id]
        }
    },

    // --------------
    // `deleteListener`
    // 清除事件
    __purge: function () {
        listenerBank = {}
    }
};
var CallbackRegistry_1 = CallbackRegistry;
var topLevelTypes$3 = EventConstants_1.topLevelTypes;

// --------------
// `isEndish`
// 传入`topLevelType`，判断是否为离开屏幕的事件
function isEndish(topLevelType) {
    return topLevelType === topLevelTypes$3.topMouseUp || topLevelType === topLevelTypes$3.topTouchEnd || topLevelType === topLevelTypes$3.topTouchCancel
}

// --------------
// `isMoveish`
// 传入`topLevelType`，判断是否为在屏幕移动的事件
function isMoveish(topLevelType) {
    return topLevelType === topLevelTypes$3.topMouseMove || topLevelType === topLevelTypes$3.topTouchMove
}

// --------------
// `isStartish`
// 传入`topLevelType`，判断是否为进入屏幕的事件
function isStartish(topLevelType) {
    return topLevelType === topLevelTypes$3.topMouseDown || topLevelType === topLevelTypes$3.topTouchStart
}

// --------------
// `storePageCoordsIn`
// 获取屏幕的X、Y轴坐标给对象`obj`
function storePageCoordsIn(obj, nativeEvent) {
    var pageX = AbstractEvent_1.eventPageX(nativeEvent);
    var pageY = AbstractEvent_1.eventPageY(nativeEvent);
    obj.pageX = pageX;
    obj.pageY = pageY
}

// --------------
// `eventDistance`
// 获取`coords`、`nativeEvent`两点之间的距离
function eventDistance(coords, nativeEvent) {
    var pageX = AbstractEvent_1.eventPageX(nativeEvent);
    var pageY = AbstractEvent_1.eventPageY(nativeEvent);
    return Math.pow(Math.pow(pageX - coords.pageX, 2) + Math.pow(pageY - coords.pageY, 2), 0.5)
}

// --------------
// `validateEventDispatches`
// 传入`abstractEvent`事件，判断abstractEvent是否为 `AbstractEvent`对象
var validateEventDispatches;
if (__DEV__) {
    validateEventDispatches = function (abstractEvent) {
        var dispatchListeners = abstractEvent._dispatchListeners;
        var dispatchIDs = abstractEvent._dispatchIDs;
        var listenersIsArr = Array.isArray(dispatchListeners);
        var idsIsArr = Array.isArray(dispatchIDs);
        var IDsLen = idsIsArr ? dispatchIDs.length : dispatchIDs ? 1 : 0;
        var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;
        invariant_1(idsIsArr === listenersIsArr && IDsLen === listenersLen, 'EventPluginUtils: Invalid `abstractEvent`.')
    }
}

// --------------
// `forEachEventDispatch`
// 遍历`abstractEvent.dispatchListeners`，循环执行`cb(abstractEvent,dispatchListeners,dispatchIDs)`
function forEachEventDispatch(abstractEvent, cb) {
    var dispatchListeners = abstractEvent._dispatchListeners;
    var dispatchIDs = abstractEvent._dispatchIDs;
    if (__DEV__) {
        validateEventDispatches(abstractEvent)
    }
    if (Array.isArray(dispatchListeners)) {
        var i;
        for (i = 0; i < dispatchListeners.length && !abstractEvent.isPropagationStopped; i++) {
            cb(abstractEvent, dispatchListeners[i], dispatchIDs[i])
        }
    } else if (dispatchListeners) {
        cb(abstractEvent, dispatchListeners, dispatchIDs)
    }
}

// --------------
// `executeDispatch`
// `listener`是绑定的事件回调函数，`domID`是Rt生成的DOM的id
function executeDispatch(abstractEvent, listener, domID) {
    listener(abstractEvent, domID)
}

// --------------
// `executeDispatchesInOrder`
// 循环执行某个事件，执行完毕后再清空
function executeDispatchesInOrder(abstractEvent, executeDispatch) {
    forEachEventDispatch(abstractEvent, executeDispatch);
    abstractEvent._dispatchListeners = null;
    abstractEvent._dispatchIDs = null
}

// --------------
// `executeDispatchesInOrderStopAtTrue`
// 循环执行`abstractEvent`事件，如果回调函数返回真值，则停止循环并返回它对应的id
function executeDispatchesInOrderStopAtTrue(abstractEvent) {
    var dispatchListeners = abstractEvent._dispatchListeners;
    var dispatchIDs = abstractEvent._dispatchIDs;
    if (__DEV__) {
        validateEventDispatches(abstractEvent)
    }
    if (Array.isArray(dispatchListeners)) {
        var i;
        for (i = 0; i < dispatchListeners.length && !abstractEvent.isPropagationStopped; i++) {
            if (dispatchListeners[i](abstractEvent, dispatchIDs[i])) {
                return dispatchIDs[i]
            }
        }
    } else if (dispatchListeners) {
        if (dispatchListeners(abstractEvent, dispatchIDs)) {
            return dispatchIDs
        }
    }
    return null
}

// --------------
// `executeDirectDispatch`
// 执行`abstractEvent`（他的`_dispatchListeners`不是数组）
function executeDirectDispatch(abstractEvent) {
    if (__DEV__) {
        validateEventDispatches(abstractEvent)
    }
    var dispatchListener = abstractEvent._dispatchListeners;
    var dispatchID = abstractEvent._dispatchIDs;
    invariant_1(!Array.isArray(dispatchListener), 'executeDirectDispatch(...): Invalid `abstractEvent`.');
    var res = dispatchListener ? dispatchListener(abstractEvent, dispatchID) : null;
    abstractEvent._dispatchListeners = null;
    abstractEvent._dispatchIDs = null;
    return res
}

// --------------
// `hasDispatches`
// 判断`abstractEvent`是否含有`_dispatchListeners`
function hasDispatches(abstractEvent) {
    return !!abstractEvent._dispatchListeners
}

// --------------
// `EventPluginUtils`
// 事件的辅助类
var EventPluginUtils = {
    isEndish: isEndish,// 是否为离开（如keyup）
    isMoveish: isMoveish,// 是否为触动
    isStartish: isStartish,// 是否为进入
    storePageCoordsIn: storePageCoordsIn,// 是否为进入
    eventDistance: eventDistance,// 获得当前鼠标的 X、Y坐标
    executeDispatchesInOrder: executeDispatchesInOrder,// 循环执行某个事件，执行完毕后再清空
    executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,// 循环执行`abstractEvent`事件，如果回调函数返回真值，则停止循环并返回它对应的id
    executeDirectDispatch: executeDirectDispatch,// 执行`abstractEvent`（他的`_dispatchListeners`不是数组）
    hasDispatches: hasDispatches,// 判断`abstractEvent`是否含有`_dispatchListeners`
    executeDispatch: executeDispatch// `listener`是绑定的事件回调函数，`domID`是Rt生成的DOM的id
};
var EventPluginUtils_1 = EventPluginUtils;

// --------------
// `INVALID_ARGS`
// `accumulate`第二个参数为null时的报错信息
var INVALID_ARGS = 'INVALID_ACCUM_ARGS';
if (__DEV__) {
    INVALID_ARGS = 'accumulate requires non empty (non-null, defined) next values. All arrays accumulated must not contain any empty items.'
}

// --------------
// `accumulate`
// 把两个参数合并为一个同层的数组
function accumulate(cur, next) {
    var curValIsEmpty = cur == null;
    var nextValIsEmpty = next === null;
    if (__DEV__) {
        throwIf_1(nextValIsEmpty, INVALID_ARGS);
    }
    if (nextValIsEmpty) {
        return cur
    } else {
        if (curValIsEmpty) {
            return next
        } else {
            var curIsArray = Array.isArray(cur);
            var nextIsArray = Array.isArray(next);
            if (curIsArray) {
                return cur.concat(next)
            } else {
                if (nextIsArray) {
                    return [cur].concat(next)
                } else {
                    return [cur, next]
                }
            }
        }
    }
}
var accumulate_1 = accumulate;

// --------------
// `forEachAccumulated`
// 已scope为this，执行cb，cb的参数为 arr 的 v,k，或者直接是 arr
var forEachAccumulated = function (arr, cb, scope) {
    if (Array.isArray(arr)) {
        arr.forEach(cb, scope)
    } else if (arr) {
        cb.call(scope, arr)
    }
};
var forEachAccumulated_1 = forEachAccumulated;
var getListener = CallbackRegistry_1.getListener;
var PropagationPhases = EventConstants_1.PropagationPhases;

// --------------
// `injection$2`
// 一个用于操作Rt的dom元素ID的对象类
var injection$2 = {
    InstanceHandle: null,//ReactInstanceHandles，会被注入赋值

    // --------------
    // `injectInstanceHandle`
    // 注入`InstanceHandle`属性
    injectInstanceHandle: function (InjectedInstanceHandle) {
        injection$2.InstanceHandle = InjectedInstanceHandle;
        if (__DEV__) {
            injection$2.validate()
        }
    },

    // --------------
    // `validate`
    // 用于校验`injection$2`对象需要含有 `InstanceHandle`、`InstanceHandle.traverseTwoPhase`、`InstanceHandle.traverseEnterLeave`三个属性之一
    validate: function () {
        var invalid = !injection$2.InstanceHandle || !injection$2.InstanceHandle.traverseTwoPhase || !injection$2.InstanceHandle.traverseEnterLeave;
        if (invalid) {
            throw new Error('InstanceHandle not injected before use!');
        }
    }
};

// --------------
// `listenerAtPhase`
// 用于解析事件名，并返回事件回调函数，注意`abstractEvent.type`的结构为:{mouseDown: {phasedRegistrationNames: { bubbled: "bubbled",captured: "onMouseDownCapture" }}}
function listenerAtPhase(id, abstractEvent, propagationPhase) {
    var registrationName = abstractEvent.type.phasedRegistrationNames[propagationPhase];
    return getListener(id, registrationName)
}

// --------------
// `accumulateDirectionalDispatches`
// 根据domID和abstractEvent解析出回调函数，把回调函数塞入 `abstractEvent` 对象中
function accumulateDirectionalDispatches(domID, upwards, abstractEvent) {
    if (__DEV__) {
        if (!domID) {
            throw new Error('Dispatching id must not be null');
        }
        injection$2.validate()
    }
    var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
    var listener = listenerAtPhase(domID, abstractEvent, phase);
    if (listener) {
        abstractEvent._dispatchListeners = accumulate_1(abstractEvent._dispatchListeners, listener);
        abstractEvent._dispatchIDs = accumulate_1(abstractEvent._dispatchIDs, domID)
    }
}

// --------------
// `accumulateDirectionalDispatches`
// 传入`abstractEvent`对象，然后自下而上，或者自上而下的遍历DOM ID，把解析出来的回调函数全部塞入到abstractEvent中。
function accumulateTwoPhaseDispatchesSingle(abstractEvent) {
    if (abstractEvent && abstractEvent.type.phasedRegistrationNames) {
        injection$2.InstanceHandle.traverseTwoPhase(abstractEvent.abstractTargetID, accumulateDirectionalDispatches, abstractEvent)// 这里会执行 traverseParentPath函数
    }
}

// --------------
// `accumulateDispatches`
// 传入`id`和`abstractEvent`,把id对应的回调拿到，合并到`abstractEvent`的`_dispatchListeners`回调函数中
function accumulateDispatches(id, ignoredDirection, abstractEvent) {
    if (abstractEvent && abstractEvent.type.registrationName) {
        var listener = getListener(id, abstractEvent.type.registrationName);
        if (listener) {
            abstractEvent._dispatchListeners = accumulate_1(abstractEvent._dispatchListeners, listener);
            abstractEvent._dispatchIDs = accumulate_1(abstractEvent._dispatchIDs, id)
        }
    }
}

// --------------
// `accumulateDirectDispatchesSingle`
// 针对单个domID，把该id对应的回调函数塞入到 abstractEvent中
function accumulateDirectDispatchesSingle(abstractEvent) {
    if (abstractEvent && abstractEvent.type.registrationName) {
        accumulateDispatches(abstractEvent.abstractTargetID, null, abstractEvent)
    }
}

// --------------
// `accumulateTwoPhaseDispatches`
// 给到一个数组`abstractEvents`，遍历循环每个元素，把每个 abstractEvent的事件，自上而下、自下而上的收集进入到abstractEvent中
function accumulateTwoPhaseDispatches(abstractEvents) {
    if (__DEV__) {
        injection$2.validate()
    }
    forEachAccumulated_1(abstractEvents, accumulateTwoPhaseDispatchesSingle)
}

// --------------
// `accumulateEnterLeaveDispatches`
// 单方向(向上或向下)进行刷新 `leave`、`enter`（他们都是AbstractEvent的实例）的_dispatchListeners
function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
    if (__DEV__) {
        injection$2.validate()
    }
    injection$2.InstanceHandle.traverseEnterLeave(fromID, toID, accumulateDispatches, leave, enter)// 这里会执行 traverseParentPath函数
}

// --------------
// `accumulateDirectDispatches`
// 把`abstractEvents`中的每个abstractEvent的ID对应的事件进行刷新
function accumulateDirectDispatches(abstractEvents) {
    if (__DEV__) {
        injection$2.validate()
    }
    forEachAccumulated_1(abstractEvents, accumulateDirectDispatchesSingle)
}
var EventPropagators = {
    accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,// 给到一个数组`abstractEvents`，遍历循环每个元素，把每个 abstractEvent的事件，自上而下、自下而上的收集进入到abstractEvent中
    accumulateDirectDispatches: accumulateDirectDispatches,// 把`abstractEvents`中的每个abstractEvent的ID对应的事件进行刷新
    accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches,// 单方向(向上或向下)进行刷新 `leave`、`enter`（他们都是AbstractEvent的实例）的_dispatchListeners
    injection: injection$2// 关于Rt的ID操作的类
};
var EventPropagators_1 = EventPropagators;
var MAX_MERGE_DEPTH = 36;

// --------------
// `ERRORS$1`
// 合并对象的一个错误信息存储对象
var ERRORS$1 = keyMirror_1({
    MERGE_ARRAY_FAIL: null,// 合并数组失败的报错信息
    MERGE_CORE_FAILURE: null,// 判断不是为数组的错误信息
    MERGE_TYPE_USAGE_FAILURE: null,
    MERGE_DEEP_MAX_LEVELS: null,// 超出最深层合并的错误信息
    MERGE_DEEP_NO_ARR_STRATEGY: null// 不属于`mergeHelpers.ArrayStrategies`的错误信息
});
if (__DEV__) {
    ERRORS$1 = {
        MERGE_ARRAY_FAIL: 'Unsupported type passed to a merge function. You may have passed a structure that contains an array and the merge function does not know how to merge arrays. ',
        MERGE_CORE_FAILURE: 'Critical assumptions about the merge functions have been violated. This is the fault of the merge functions themselves, not necessarily the callers.',
        MERGE_TYPE_USAGE_FAILURE: 'Calling merge function with invalid types. You may call merge functions (non-array non-terminal) OR (null/undefined) arguments. mergeInto functions have the same requirements but with an added restriction that the first parameter must not be null/undefined.',
        MERGE_DEEP_MAX_LEVELS: 'Maximum deep merge depth exceeded. You may attempting to merge circular structures in an unsupported way.',
        MERGE_DEEP_NO_ARR_STRATEGY: 'You must provide an array strategy to deep merge functions to instruct the deep merge how to resolve merging two arrays.'
    }
}

// --------------
// `isTerminal`
// 判断是否为除了 对象 之外的其他结构
var isTerminal = function (o) {
    return typeof o !== 'object' || o === null
};
var mergeHelpers = {
    MAX_MERGE_DEPTH: MAX_MERGE_DEPTH,
    isTerminal: isTerminal,

    // --------------
    // `normalizeMergeArg`
    // 把 `null`和`undefined`转化为 {}，其他的都不变
    normalizeMergeArg: function (arg) {
        return arg === undefined || arg === null ? {} : arg
    },

    // --------------
    // `checkMergeArrayArgs`
    // 把参数`one`、`two`进行校验，如果不是数组就报错
    checkMergeArrayArgs: function (one, two) {
        throwIf_1(!Array.isArray(one) || !Array.isArray(two), ERRORS$1.MERGE_CORE_FAILURE);
    },

    // --------------
    // `checkMergeObjectArgs`
    // 把参数`one`、`two`进行校验，如果是数组或者不是对象，则报错(结果就是只能是对象)
    checkMergeObjectArgs: function (one, two) {
        mergeHelpers.checkMergeObjectArg(one);
        mergeHelpers.checkMergeObjectArg(two)
    },

    // --------------
    // `checkMergeObjectArg`
    // 把参数`arg`进行校验，如果只是对象才不报错
    checkMergeObjectArg: function (arg) {
        throwIf_1(isTerminal(arg) || Array.isArray(arg), ERRORS$1.MERGE_CORE_FAILURE);
    },

    // --------------
    // `checkMergeLevel`
    // 校验当前的层级是否超过最大层级
    checkMergeLevel: function (level) {
        throwIf_1(level >= MAX_MERGE_DEPTH, ERRORS$1.MERGE_DEEP_MAX_LEVELS);
    },

    // --------------
    // `checkArrayStrategy`
    // 判断参数`strategy`是否为`mergeHelpers.ArrayStrategies`的键
    checkArrayStrategy: function (strategy) {
        throwIf_1(strategy !== undefined && !(strategy in mergeHelpers.ArrayStrategies), ERRORS$1.MERGE_DEEP_NO_ARR_STRATEGY);
    },

    // --------------
    // `ArrayStrategies`
    // {Clobber:"Clobber",IndexByIndex:"IndexByIndex"}
    ArrayStrategies: keyMirror_1({
        Clobber: true,
        IndexByIndex: true
    }),
    ERRORS: ERRORS$1
};
var mergeHelpers_1 = mergeHelpers;
var checkMergeObjectArg = mergeHelpers_1.checkMergeObjectArg;


// --------------
// `mergeInto`
// 把two对象合并到one对象，会经过对象类型的判断
function mergeInto(one, two) {
    checkMergeObjectArg(one);
    if (two != null) {
        checkMergeObjectArg(two);
        for (var key in two) {
            if (!two.hasOwnProperty(key)) {
                continue
            }
            one[key] = two[key]
        }
    }
}
var mergeInto_1 = mergeInto;

// --------------
// `merge`
// 把`one`、`two`合并到`result`，并返回
var merge = function (one, two) {
    var result = {};
    mergeInto_1(result, one);
    mergeInto_1(result, two);
    return result
};
var merge_1 = merge;
var deleteListener = CallbackRegistry_1.deleteListener;

// --------------
// `ERRORS`
// `DOUBLE_REGISTER`不存在的事件报错信息；`DOUBLE_ENQUEUE`当abstractEventQueue运行完没释放时的报错；`DEPENDENCY_ERROR`：不存在plugin的时候的报错信息
var ERRORS = keyMirror_1({
    DOUBLE_REGISTER: null,
    DOUBLE_ENQUEUE: null,
    DEPENDENCY_ERROR: null
});
if (__DEV__) {
    ERRORS.DOUBLE_REGISTER = 'You\'ve included an event plugin that extracts an event type with the exact same or identity as an event that had previously been injected - or, one of the registration names used by an plugin has already been used.';
    ERRORS.DOUBLE_ENQUEUE = 'During the processing of events, more events were enqueued. This is strange and should not happen. Please report immediately. ';
    ERRORS.DEPENDENCY_ERROR = 'You have either attempted to load an event plugin that has no entry in EventPluginOrder, or have attempted to extract events when some critical dependencies have not yet been injected.'
}

// --------------
// `injection$1`
// 一个注入对象，框架运行结束前会调用执行
var injection$1 = {

    // --------------
    // `injectInstanceHandle`
    // 给 `EventPropagators_1.injection`注入对象 `ReactInstanceHandles`
    injectInstanceHandle: function (InjectedInstanceHandle) {
        EventPropagators_1.injection.injectInstanceHandle(InjectedInstanceHandle)
    },

    // --------------
    // `EventPluginOrder`
    // DefaultEventPluginOrder对象，有顺序的 ['ResponderEventPlugin','SimpleEventPlugin','TapEventPlugin','EnterLeaveEventPlugin','AnalyticsEventPlugin']
    EventPluginOrder: null,

    // --------------
    // `injectEventPluginOrder`
    // 注入`EventPluginOrder`
    injectEventPluginOrder: function (InjectedEventPluginOrder) {
        injection$1.EventPluginOrder = InjectedEventPluginOrder;
        injection$1._recomputePluginsList()// 第一次注入的时候没执行到逻辑
    },
    plugins: [],

    // --------------
    // `injectEventPluginsByName`
    // 注入 `pluginsByName`，结构为:{'SimpleEventPlugin','EnterLeaveEventPlugin'}
    injectEventPluginsByName: function (pluginsByName) {
        injection$1.pluginsByName = merge_1(injection$1.pluginsByName, pluginsByName);
        injection$1._recomputePluginsList()
    },

    // --------------
    // `pluginsByName`
    // 以 ['ResponderEventPlugin','SimpleEventPlugin','TapEventPlugin','EnterLeaveEventPlugin','AnalyticsEventPlugin'] 的元素为 key 的对象
    pluginsByName: {},

    // --------------
    // `_recomputePluginsList`
    // 循环每个注入的 `pluginsByName`，并为 `plugins`生成对应index的数组元素
    _recomputePluginsList: function () {
        var injectPluginByName = function (name, PluginModule) {
            var pluginIndex = injection$1.EventPluginOrder.indexOf(name);
            throwIf_1(pluginIndex === -1, ERRORS.DEPENDENCY_ERROR + name);
            if (!injection$1.plugins[pluginIndex]) {
                injection$1.plugins[pluginIndex] = PluginModule;// {'SimpleEventPlugin','EnterLeaveEventPlugin'}
                for (var eventName in PluginModule.abstractEventTypes) {
                    var eventType = PluginModule.abstractEventTypes[eventName];
                    recordAllRegistrationNames(eventType, PluginModule)
                }
            }
        };
        if (injection$1.EventPluginOrder) {// ['ResponderEventPlugin','SimpleEventPlugin','TapEventPlugin','EnterLeaveEventPlugin','AnalyticsEventPlugin']
            var injectedPluginsByName = injection$1.pluginsByName;// {'SimpleEventPlugin','EnterLeaveEventPlugin'}
            for (var name in injectedPluginsByName) {// {'SimpleEventPlugin','EnterLeaveEventPlugin'}
                injectPluginByName(name, injectedPluginsByName[name])
            }
        }
    }
};
var registrationNames$2 = {};
var registrationNamesArr = [];
var abstractEventQueue = [];

// --------------
// `recordAllRegistrationNames`
// 参数说明：`eventType`（SimpleEventPlugin.abstractEventTypes对象的元素 或 EnterLeaveEventPlugin.abstractEventTypes对象的元素） `PluginModule`({'SimpleEventPlugin','EnterLeaveEventPlugin'})；最终生成了 `registrationNames` 和 `registrationNamesArr`两个的元素
function recordAllRegistrationNames(eventType, PluginModule) {
    var phaseName;
    var phasedRegistrationNames = eventType.phasedRegistrationNames;// 结构为{bubbled:"onMouseDown",captured:"onMouseDownCapture"}
    if (phasedRegistrationNames) {
        for (phaseName in phasedRegistrationNames) {// `phaseName`为 `bubbled` `captured`等
            if (!phasedRegistrationNames.hasOwnProperty(phaseName)) {
                continue
            }
            if (__DEV__) {
                throwIf_1(registrationNames$2[phasedRegistrationNames[phaseName]], ERRORS.DOUBLE_REGISTER);
            }
            registrationNames$2[phasedRegistrationNames[phaseName]] = PluginModule;
            registrationNamesArr.push(phasedRegistrationNames[phaseName])
        }
    } else if (eventType.registrationName) {// 结构为('onMouseEnter' 或 'onMouseLeave')
        if (__DEV__) {
            throwIf_1(registrationNames$2[eventType.registrationName], ERRORS.DOUBLE_REGISTER);//重复注入则会报错
        }
        registrationNames$2[eventType.registrationName] = PluginModule;
        registrationNamesArr.push(eventType.registrationName)
    }
}

// --------------
// `getPluginModuleForAbstractEvent`
// 根据`abstractEvent`的`type`属性，返回 `SimpleEventPlugin` 或 `EnterLeaveEventPlugin`
function getPluginModuleForAbstractEvent(abstractEvent) {
    if (abstractEvent.type.registrationName) {
        return registrationNames$2[abstractEvent.type.registrationName]
    } else {
        for (var phase in abstractEvent.type.phasedRegistrationNames) {
            if (!abstractEvent.type.phasedRegistrationNames.hasOwnProperty(phase)) {
                continue
            }
            var PluginModule = registrationNames$2[abstractEvent.type.phasedRegistrationNames[phase]];
            if (PluginModule) {
                return PluginModule
            }
        }
    }
    return null
}

// --------------
// `deleteAllListeners`
// 删除 domID对应的所有事件回调
var deleteAllListeners = function (domID) {
    var ii;
    for (ii = 0; ii < registrationNamesArr.length; ii++) {
        deleteListener(domID, registrationNamesArr[ii])
    }
};

// --------------
// `extractAbstractEvents$1`
// 传入 `topLevelType` 、 `nativeEvent` 、 `renderedTargetID` 、 `renderedTarget`，然后解析，最后合并成 `abstractEvents` 返回
var extractAbstractEvents$1 = function (topLevelType, nativeEvent, renderedTargetID, renderedTarget) {
    var abstractEvents;
    var plugins = injection$1.plugins;
    var len = plugins.length;
    for (var i = 0; i < len; i++) {
        var possiblePlugin = plugins[i];
        var extractedAbstractEvents = possiblePlugin && possiblePlugin.extractAbstractEvents(topLevelType, nativeEvent, renderedTargetID, renderedTarget);
        if (extractedAbstractEvents) {
            abstractEvents = accumulate_1(abstractEvents, extractedAbstractEvents)
        }
    }
    return abstractEvents
};

// --------------
// `enqueueAbstractEvents`
// 合并`abstractEvents`到`abstractEventQueue`
var enqueueAbstractEvents = function (abstractEvents) {
    if (abstractEvents) {
        abstractEventQueue = accumulate_1(abstractEventQueue, abstractEvents)
    }
};

// --------------
// `executeDispatchesAndRelease`
// 通过`getPluginModuleForAbstractEvent`拿到`executeDispatch`，然后按顺序执行`abstractEvent`的回调函数，最后再释放
var executeDispatchesAndRelease = function (abstractEvent) {
    if (abstractEvent) {
        var PluginModule = getPluginModuleForAbstractEvent(abstractEvent);
        var pluginExecuteDispatch = PluginModule && PluginModule.executeDispatch;
        EventPluginUtils_1.executeDispatchesInOrder(abstractEvent, pluginExecuteDispatch || EventPluginUtils_1.executeDispatch);
        AbstractEvent_1.release(abstractEvent)
    }
};

// --------------
// `processAbstractEventQueue`
// 循环执行 `abstractEventQueue`，最后再释放
var processAbstractEventQueue = function () {
    var processingAbstractEventQueue = abstractEventQueue;
    abstractEventQueue = null;
    forEachAccumulated_1(processingAbstractEventQueue, executeDispatchesAndRelease);
    if (__DEV__) {
        throwIf_1(abstractEventQueue, ERRORS.DOUBLE_ENQUEUE);
    }
};
var EventPluginHub = {
    registrationNames: registrationNames$2,// 一个对象，用于存储每种事件的`PluginModule`
    registrationNamesArr: registrationNamesArr,// 一个数组，存储每个事件的名
    putListener: CallbackRegistry_1.putListener,// 针对ID 添加事件
    getListener: CallbackRegistry_1.getListener,// 针对ID 获取事件
    deleteAllListeners: deleteAllListeners,// 删除所有事件
    extractAbstractEvents: extractAbstractEvents$1,// 传入 `topLevelType` 、 `nativeEvent` 、 `renderedTargetID` 、 `renderedTarget`，然后解析，最后合并成 `abstractEvents` 返回
    enqueueAbstractEvents: enqueueAbstractEvents,// 合并`abstractEvents`到`abstractEventQueue`
    processAbstractEventQueue: processAbstractEventQueue,// 循环执行 `abstractEventQueue`，最后再释放
    injection: injection$1// 一个注入对象，框架运行结束前会调用执行
};
if (ExecutionEnvironment_1.canUseDOM) {
    window.EventPluginHub = EventPluginHub
}
var EventPluginHub_1 = EventPluginHub;

// --------------
// `EventListener`
// 用于监听事件的对象`listen`方法非捕获监听，`capture`方法捕获；handlerBaseName是事件名
var EventListener = {
    listen: function (el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    },
    capture: function (el, handlerBaseName, cb) {
        if (!el.addEventListener) {
            console.error('You are attempting to use addEventlistener in a browser that does not support it support it.This likely means that you will not receive events that your application relies on (such as scroll).');
            return
        } else {
            el.addEventListener(handlerBaseName, cb, true)
        }
    }
};
var EventListener_1 = EventListener;

// --------------
// `normalizeEvent`
// 传入原始事件，做属性兼容
function normalizeEvent(eventParam) {
    var normalized = eventParam || window.event;
    var hasTargetProperty = 'target' in normalized;
    var eventTarget = normalized.target || normalized.srcElement || window;
    var textNodeNormalizedTarget = (eventTarget.nodeType === 3) ? eventTarget.parentNode : eventTarget;
    if (!hasTargetProperty || normalized.target !== textNodeNormalizedTarget) {
        normalized = Object.create(normalized);
        normalized.target = textNodeNormalizedTarget
    }
    return normalized
}

// --------------
// `createNormalizedCallback`
// 传入回调函数，二次生成回调函数，参数事件做兼容处理
function createNormalizedCallback(cb) {
    return function (unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}

// --------------
// `NormalizedEventListener`
// 事件的监听
var NormalizedEventListener = {
    listen: function (el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    },
    capture: function (el, handlerBaseName, cb) {
        EventListener_1.capture(el, handlerBaseName, createNormalizedCallback(cb))
    }
};
var NormalizedEventListener_1 = NormalizedEventListener;
var testNode;
if (ExecutionEnvironment_1.canUseDOM) {
    testNode = document.createElement('div')
}

// --------------
// `isEventSupported`
// 传入事件名`eventNameSuffix`，最后判断是否存在该事件
function isEventSupported(eventNameSuffix, capture) {
    if (!testNode || (capture && !testNode.addEventListener)) {
        return false
    }
    var element = document.createElement('div');
    var eventName = 'on' + eventNameSuffix;
    var isSupported = eventName in element;
    if (!isSupported) {
        element.setAttribute(eventName, '');
        isSupported = typeof element[eventName] === 'function';
        if (typeof element[eventName] !== 'undefined') {
            element[eventName] = undefined
        }
        element.removeAttribute(eventName)
    }
    element = null;
    return isSupported
}
var isEventSupported_1 = isEventSupported;
var registrationNames$1 = EventPluginHub_1.registrationNames;
var topLevelTypes$2 = EventConstants_1.topLevelTypes;
var listen = NormalizedEventListener_1.listen;
var capture = NormalizedEventListener_1.capture;
var _isListening = false;
if (__DEV__);

// --------------
// `trapBubbledEvent`
// 以冒泡来进行事件监听
function trapBubbledEvent(topLevelType, handlerBaseName, onWhat) {
    listen(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}

// --------------
// `trapCapturedEvent`
// 以捕获来进行事件监听
function trapCapturedEvent(topLevelType, handlerBaseName, onWhat) {
    capture(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}

// --------------
// `registerDocumentScrollListener`
// 监听window的滚动事件
function registerDocumentScrollListener() {
    listen(window, 'scroll', function (nativeEvent) {
        if (nativeEvent.target === window) {
            BrowserEnv_1.refreshAuthoritativeScrollValues()
        }
    })
}

// --------------
// `registerDocumentResizeListener`
// 监听window的resize事件
function registerDocumentResizeListener() {
    listen(window, 'resize', function (nativeEvent) {
        if (nativeEvent.target === window) {
            BrowserEnv_1.refreshAuthoritativeScrollValues()
        }
    })
}

// --------------
// `listenAtTopLevel`
// 在最顶层设置各种事件
function listenAtTopLevel(touchNotMouse) {
    invariant_1(!_isListening, 'listenAtTopLevel(...): Cannot setup top-level listener more than once.');
    var mountAt = document;
    registerDocumentScrollListener();
    registerDocumentResizeListener();
    trapBubbledEvent(topLevelTypes$2.topMouseOver, 'mouseover', mountAt);
    trapBubbledEvent(topLevelTypes$2.topMouseDown, 'mousedown', mountAt);
    trapBubbledEvent(topLevelTypes$2.topMouseUp, 'mouseup', mountAt);
    trapBubbledEvent(topLevelTypes$2.topMouseMove, 'mousemove', mountAt);
    trapBubbledEvent(topLevelTypes$2.topMouseOut, 'mouseout', mountAt);
    trapBubbledEvent(topLevelTypes$2.topClick, 'click', mountAt);
    trapBubbledEvent(topLevelTypes$2.topDoubleClick, 'dblclick', mountAt);
    trapBubbledEvent(topLevelTypes$2.topMouseWheel, 'mousewheel', mountAt);
    if (touchNotMouse) {
        trapBubbledEvent(topLevelTypes$2.topTouchStart, 'touchstart', mountAt);
        trapBubbledEvent(topLevelTypes$2.topTouchEnd, 'touchend', mountAt);
        trapBubbledEvent(topLevelTypes$2.topTouchMove, 'touchmove', mountAt);
        trapBubbledEvent(topLevelTypes$2.topTouchCancel, 'touchcancel', mountAt)
    }
    trapBubbledEvent(topLevelTypes$2.topKeyUp, 'keyup', mountAt);
    trapBubbledEvent(topLevelTypes$2.topKeyPress, 'keypress', mountAt);
    trapBubbledEvent(topLevelTypes$2.topKeyDown, 'keydown', mountAt);
    trapBubbledEvent(topLevelTypes$2.topChange, 'change', mountAt);
    trapBubbledEvent(topLevelTypes$2.topDOMCharacterDataModified, 'DOMCharacterDataModified', mountAt);
    trapBubbledEvent(topLevelTypes$2.topMouseWheel, 'DOMMouseScroll', mountAt);
    if (isEventSupported_1('scroll', true)) {
        trapCapturedEvent(topLevelTypes$2.topScroll, 'scroll', mountAt)
    } else {
        trapBubbledEvent(topLevelTypes$2.topScroll, 'scroll', window)
    }
    if (isEventSupported_1('focus', true)) {
        trapCapturedEvent(topLevelTypes$2.topFocus, 'focus', mountAt);
        trapCapturedEvent(topLevelTypes$2.topBlur, 'blur', mountAt)
    } else if (isEventSupported_1('focusin')) {
        trapBubbledEvent(topLevelTypes$2.topFocus, 'focusin', mountAt);
        trapBubbledEvent(topLevelTypes$2.topBlur, 'focusout', mountAt)
    }
}

// --------------
// `handleTopLevel`
// 顶层的事件回调处理方法
function handleTopLevel(topLevelType, nativeEvent, renderedTargetID, renderedTarget) {
    var abstractEvents = EventPluginHub_1.extractAbstractEvents(topLevelType, nativeEvent, renderedTargetID, renderedTarget);
    EventPluginHub_1.enqueueAbstractEvents(abstractEvents);
    EventPluginHub_1.processAbstractEventQueue()
}

// --------------
// `setEnabled`
// 设置事件是否由顶层进行触发
function setEnabled(enabled) {
    invariant_1(ExecutionEnvironment_1.canUseDOM, 'setEnabled(...): Cannot toggle event listening in a Worker thread. This is likely a bug in the framework. Please report immediately.');
    ReactEvent.TopLevelCallbackCreator.setEnabled(enabled)
}

// --------------
// `isEnabled`
// 判断是否由顶层处罚
function isEnabled() {
    return ReactEvent.TopLevelCallbackCreator.isEnabled()
}

// --------------
// `ensureListening`
// 确保顶层事件的监听执行
function ensureListening(touchNotMouse, TopLevelCallbackCreator) {
    invariant_1(ExecutionEnvironment_1.canUseDOM, 'ensureListening(...): Cannot toggle event listening in a Worker thread. This is likely a bug in the framework. Please report immediately.');
    if (!_isListening) {
        ReactEvent.TopLevelCallbackCreator = TopLevelCallbackCreator;
        listenAtTopLevel(touchNotMouse);
        _isListening = true
    }
}
var ReactEvent = {
    TopLevelCallbackCreator: null,// ReactEventTopLevelCallback会被注入
    handleTopLevel: handleTopLevel,// 事件回调的处理函数
    setEnabled: setEnabled,// 设置事件是否由顶层进行触发
    isEnabled: isEnabled,// 判断是否由顶层处罚
    ensureListening: ensureListening,// 确保顶层事件的监听执行
    registrationNames: registrationNames$1,// 一个对象，用于存储每种事件的`PluginModule`
    putListener: EventPluginHub_1.putListener,// 针对ID 添加事件
    getListener: EventPluginHub_1.getListener,// 针对ID 获取事件
    deleteAllListeners: EventPluginHub_1.deleteAllListeners,// 删除所有事件
    trapBubbledEvent: trapBubbledEvent,// 以冒泡来进行事件监听
    trapCapturedEvent: trapCapturedEvent// 以捕获来进行事件监听
};
var ReactEvent_1 = ReactEvent;

// --------------
// `getDOMNodeID`
// 传入dom元素`domNode`，获取它的ID
function getDOMNodeID(domNode) {
    if (domNode.getAttributeNode) {
        var attributeNode = domNode.getAttributeNode('id');
        return attributeNode && attributeNode.value || ''
    } else {
        return domNode.id || ''
    }
}
var getDOMNodeID_1 = getDOMNodeID;
var SEPARATOR = '.';
var SEPARATOR_LENGTH = SEPARATOR.length;
var MAX_TREE_DEPTH = 100;

// --------------
// `isMarker`
// 判断字符串`id`的第`index`字符，是否为`.`，或者长度是否为`index`
function isMarker(id, index) {
    return id.charAt(index) === SEPARATOR || index === id.length
}

// --------------
// `isValidID`
// 判断`id`是否为rt的id
function isValidID(id) {
    return id === '' || (id.charAt(0) === SEPARATOR && id.charAt(id.length - 1) !== SEPARATOR)
}

// --------------
// `isRenderedByReact`
// 提供dom元素`node`，判断它是否由rt生成的
function isRenderedByReact(node) {
    var id = getDOMNodeID_1(node);
    return id && id.charAt(0) === SEPARATOR
}

// --------------
// `parentID`
// 通过`id`来获取父级的`id`
function parentID(id) {
    return id ? id.substr(0, id.lastIndexOf(SEPARATOR)) : ''
}

// --------------
// `traverseParentPath`
// 向下或者向上拿取`id`，然后通过`cb`来调用
function traverseParentPath(start, stop, cb, arg, skipFirst, skipLast) {
    start = start || '';
    stop = stop || '';
    invariant_1(start !== stop, 'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.', start);
    var ancestorID = ReactInstanceHandles.getFirstCommonAncestorID(start, stop);
    var traverseUp = ancestorID === stop;
    invariant_1(traverseUp || ancestorID === start, 'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do not have a parent path.', start, stop);
    var depth = 0;
    var traverse = traverseUp ? parentID : ReactInstanceHandles.nextDescendantID;
    for (var id = start;; id = traverse(id, stop)) {
        if ((!skipFirst || id !== start) && (!skipLast || id !== stop)) {
            cb(id, traverseUp, arg)
        }
        if (id === stop) {
            break
        }
        invariant_1(depth++ < MAX_TREE_DEPTH, 'traverseParentPath(%s, %s, ...): Detected an infinite loop while traversing the React DOM ID tree. This may be due to malformed IDs: %s', start, stop)
    }
}

// --------------
// `ReactInstanceHandles`
// 涉及到rt的`id`操作
var ReactInstanceHandles = {
    separator: SEPARATOR,

    // --------------
    // `getFirstReactDOM`
    // 获取`node`最顶部的元素的`id`
    getFirstReactDOM: function (node) {
        var current = node;
        while (current && current.parentNode !== current) {
            if (isRenderedByReact(current)) {
                return current
            }
            current = current.parentNode
        }
        return null
    },

    // --------------
    // `findComponentRoot`
    // 从`ancestorNode`及其后辈元素中寻找 id 值为 `id` 的元素
    findComponentRoot: function (ancestorNode, id) {
        var child = ancestorNode.firstChild;
        while (child) {
            if (id === child.id) {
                return child
            } else if (id.indexOf(child.id) === 0) {
                return ReactInstanceHandles.findComponentRoot(child, id)
            }
            child = child.nextSibling
        }
    },

    // --------------
    // `getFirstCommonAncestorID`
    // 获取`oneID`和`twoID`，第一层的公用的祖先元素
    getFirstCommonAncestorID: function (oneID, twoID) {
        var minLength = Math.min(oneID.length, twoID.length);
        if (minLength === 0) {
            return ''
        }
        var lastCommonMarkerIndex = 0;
        for (var i = 0; i <= minLength; i++) {
            if (isMarker(oneID, i) && isMarker(twoID, i)) {
                lastCommonMarkerIndex = i
            } else if (oneID.charAt(i) !== twoID.charAt(i)) {
                break
            }
        }
        var longestCommonID = oneID.substr(0, lastCommonMarkerIndex);
        invariant_1(isValidID(longestCommonID), 'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s', oneID, twoID, longestCommonID);
        return longestCommonID
    },

    // --------------
    // `getReactRootID`
    // 生成`root`元素的`id`
    getReactRootID: function (mountPointCount) {
        return '.reactRoot[' + mountPointCount + ']'
    },

    // --------------
    // `getReactRootIDFromNodeID`
    // 通过正则表达式，获取`id`的祖先id
    getReactRootIDFromNodeID: function (id) {
        var regexResult = /\.reactRoot\[[^\]]+\]/.exec(id);
        return regexResult && regexResult[0]
    },

    // --------------
    // `traverseEnterLeave`
    // 鼠标的进入和离开，从下到上或从上到下的执行`cb`
    traverseEnterLeave: function (leaveID, enterID, cb, upArg, downArg) {
        var longestCommonID = ReactInstanceHandles.getFirstCommonAncestorID(leaveID, enterID);
        if (longestCommonID !== leaveID) {
            traverseParentPath(leaveID, longestCommonID, cb, upArg, false, true)
        }
        if (longestCommonID !== enterID) {
            traverseParentPath(longestCommonID, enterID, cb, downArg, true, false)
        }
    },


    // --------------
    // `traverseTwoPhase`
    // 以`targetID`为基准，两端寻找`id`来触发事件
    traverseTwoPhase: function (targetID, cb, arg) {
        if (targetID) {
            traverseParentPath('', targetID, cb, arg, true, false);
            traverseParentPath(targetID, '', cb, arg, false, true)
        }
    },

    // --------------
    // `nextDescendantID`
    // `destinationID`比`ancestorID`长，获取`ancestorID`基于`destinationID`等下一个`id`
    nextDescendantID: function (ancestorID, destinationID) {
        invariant_1(isValidID(ancestorID) && isValidID(destinationID), 'nextDescendantID(%s, %s): Received an invalid React DOM ID.', ancestorID, destinationID);
        var longestCommonID = ReactInstanceHandles.getFirstCommonAncestorID(ancestorID, destinationID);
        invariant_1(longestCommonID === ancestorID, 'nextDescendantID(...): React has made an invalid assumption about the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.', ancestorID, destinationID);
        if (ancestorID === destinationID) {
            return ancestorID
        }
        var start = ancestorID.length + SEPARATOR_LENGTH;
        for (var i = start; i < destinationID.length; i++) {
            if (isMarker(destinationID, i)) {
                break
            }
        }
        return destinationID.substr(0, i)
    }
};
var ReactInstanceHandles_1 = ReactInstanceHandles;// 涉及到rt的`id`操作
var _topLevelListenersEnabled = true;

// --------------
// `ReactEventTopLevelCallback`
// 顶部事件的操作对象
var ReactEventTopLevelCallback = {
    setEnabled: function (enabled) {
        _topLevelListenersEnabled = !!enabled
    },
    isEnabled: function () {
        return _topLevelListenersEnabled
    },
    createTopLevelCallback: function (topLevelType) {
        return function (fixedNativeEvent) {
            if (!_topLevelListenersEnabled) {
                return
            }
            var renderedTarget = ReactInstanceHandles_1.getFirstReactDOM(fixedNativeEvent.target) || ExecutionEnvironment_1.global;
            var renderedTargetID = getDOMNodeID_1(renderedTarget);
            var event = fixedNativeEvent;
            var target = renderedTarget;
            ReactEvent_1.handleTopLevel(topLevelType, event, renderedTargetID, target)
        }
    }
};
var ReactEventTopLevelCallback_1 = ReactEventTopLevelCallback;

// --------------
// `ge`
// `arg`不是字符串，则直接返回`arg`；不存在`root`的时候，则直接通过`arg`作为id来获取；含有`root`的时候，去它的子元素中寻找
function ge(arg, root, tag) {
    return typeof arg != 'string' ? arg : !root ? document.getElementById(arg) : _geFromSubtree(arg, root, tag)
}

// --------------
// `_geFromSubtree`
// 从`root`及它的子元素中，寻找`tag`标签对应id为`id`的元素
function _geFromSubtree(id, root, tag) {
    var elem, children, ii;
    if (_getNodeID(root) == id) {
        return root
    } else if (root.getElementsByTagName) {
        children = root.getElementsByTagName(tag || '*');
        for (ii = 0; ii < children.length; ii++) {
            if (_getNodeID(children[ii]) == id) {
                return children[ii]
            }
        }
    } else {
        children = root.childNodes;
        for (ii = 0; ii < children.length; ii++) {
            elem = _geFromSubtree(id, children[ii]);
            if (elem) {
                return elem
            }
        }
    }
    return null
}

// --------------
// `_getNodeID`
// 获取元素`node`的id
function _getNodeID(node) {
    var id = node.getAttributeNode && node.getAttributeNode('id');
    return id ? id.value : null
}
var ge_1 = ge;

// --------------
// `$`
// 把`arg`当作id获取元素
function $(arg) {
    var element = ge_1(arg);
    if (!element) {
        if (typeof arg == 'undefined') {
            arg = 'undefined'
        } else if (arg === null) {
            arg = 'null'
        }
        throw new Error('Tried to get element "' + arg.toString() + '" but it is not present on the page.');
    }
    return element
}
var $_1 = $;

// --------------
// `globalMountPointCounter`
// 按递增的一个变量，用于生成`id`
var globalMountPointCounter = 0;

// --------------
// `instanceByReactRootID`
// 以rt的`id`作为key，`component`对象作为value的一个对象
var instanceByReactRootID = {};

// --------------
// `containersByReactRootID`
// 以根元素的`id`作为key，进行保存根组件，value值时dom元素
var containersByReactRootID = {};

// --------------
// `getReactRootID`
// 获取`container`第一个子元素的`id`
function getReactRootID(container) {
    return container.firstChild && container.firstChild.id
}

// --------------
// `ReactMount`
// 与渲染相关的对象
var ReactMount = {
    totalInstantiationTime: 0,// mountComponent方法所耗费的时间
    totalInjectionTime: 0,// mountComponent开始前，到生成html字符串，最后插入到元素的过程所用的时间
    useTouchEvents: false,// 是否启用触摸的事件方法

    // --------------
    // `scrollMonitor`
    // 用来执行一个回调函数
    scrollMonitor: function (container, renderCallback) {
        renderCallback()
    },

    // --------------
    // `prepareTopLevelEvents`
    // 确保顶部的事件监听
    prepareTopLevelEvents: function (TopLevelCallbackCreator) {
        ReactEvent_1.ensureListening(ReactMount.useTouchEvents, TopLevelCallbackCreator)
    },

    // --------------
    // `renderComponent`
    // 传入组件`nextComponent`和dom元素`container`,执行事件的准备，最后生成html，并插入到`container`中
    renderComponent: function (nextComponent, container) {
        var prevComponent = instanceByReactRootID[getReactRootID(container)];
        if (prevComponent) {
            if (prevComponent.constructor === nextComponent.constructor) {
                var nextProps = nextComponent.props;
                ReactMount.scrollMonitor(container, function () {
                    prevComponent.replaceProps(nextProps)
                });
                return prevComponent
            } else {
                ReactMount.unmountAndReleaseReactRootNode(container)
            }
        }
        ReactMount.prepareTopLevelEvents(ReactEventTopLevelCallback_1);
        var reactRootID = ReactMount.registerContainer(container);
        instanceByReactRootID[reactRootID] = nextComponent;
        nextComponent.mountComponentIntoNode(reactRootID, container);
        return nextComponent
    },

    // --------------
    // `createComponentRenderer`
    // `renderComponent`方法的二次适配，先传入`component`，后续再传入`container`
    createComponentRenderer: function (component) {
        return function (container) {
            return ReactMount.renderComponent(component, container)
        }
    },

    // --------------
    // `constructAndRenderComponent`
    // 传入component的构造函数`constructor`和属性`props`以及`container`，最终进行渲染
    constructAndRenderComponent: function (constructor, props, container) {
        return ReactMount.renderComponent(constructor(props), container)
    },

    // --------------
    // `constructAndRenderComponentByID`
    // 把`constructAndRenderComponent`的`container`适配为了`id`
    constructAndRenderComponentByID: function (constructor, props, id) {
        return ReactMount.constructAndRenderComponent(constructor, props, $_1(id))
    },

    // --------------
    // `registerContainer`
    // 把`container`缓存到`containersByReactRootID`中
    registerContainer: function (container) {
        var reactRootID = getReactRootID(container);
        if (reactRootID) {
            reactRootID = ReactInstanceHandles_1.getReactRootIDFromNodeID(reactRootID)
        }
        if (!reactRootID) {
            reactRootID = ReactInstanceHandles_1.getReactRootID(globalMountPointCounter++)
        }
        containersByReactRootID[reactRootID] = container;
        return reactRootID
    },

    // --------------
    // `unmountAndReleaseReactRootNode`
    // 提供`container`，获取到组件，再通过组件`component`释放资源，最后删除其他缓存
    unmountAndReleaseReactRootNode: function (container) {
        var reactRootID = getReactRootID(container);
        var component = instanceByReactRootID[reactRootID];
        component.unmountComponentFromNode(container);
        delete instanceByReactRootID[reactRootID];
        delete containersByReactRootID[reactRootID]
    },

    // --------------
    // `findReactContainerForID`
    // 通过当前的`id`获取到它的最顶层的`dom`元素
    findReactContainerForID: function (id) {
        var reatRootID = ReactInstanceHandles_1.getReactRootIDFromNodeID(id);
        return containersByReactRootID[reatRootID]
    },

    // --------------
    // `findReactRenderedDOMNodeSlow`
    // 删除 domID对应的所有事件回调
    findReactRenderedDOMNodeSlow: function (id) {
        var reactRoot = ReactMount.findReactContainerForID(id);
        return ReactInstanceHandles_1.findComponentRoot(reactRoot, id)
    }
};

var ReactMount_1 = ReactMount;// 与渲染相关的对象
var nodeCache = {};

// --------------
// `ReactDOMNodeCache`
// 关于dom元素node的缓存
var ReactDOMNodeCache = {

    // --------------
    // `purgeEntireCache`
    // 清空`nodeCache`对象，并返回
    purgeEntireCache: function () {
        nodeCache = {};
        return nodeCache
    },

    // --------------
    // `getCachedNodeByID`
    // 提供`id`，查找到对应的dom元素，最后缓存到`nodeCache`中
    getCachedNodeByID: function (id) {
        return nodeCache[id] || (nodeCache[id] = document.getElementById(id) || ReactMount_1.findReactRenderedDOMNodeSlow(id))
    }
};
var ReactDOMNodeCache_1 = ReactDOMNodeCache;
var contentKey = null;

// --------------
// `getTextContentAccessor`
// 获取到dom元素中的文本操作属性是`innerText`还是`textContent`
function getTextContentAccessor() {
    if (!contentKey && ExecutionEnvironment_1.canUseDOM) {
        contentKey = 'innerText' in document.createElement('div') ? 'innerText' : 'textContent'
    }
    return contentKey
}
var getTextContentAccessor_1 = getTextContentAccessor;

// --------------
// `INVALID_PROPERTY_ERRORS`
// `content`、`dangerouslySetInnerHTML`、`style`三个属性不能直接用在`DOMPropertyOperations_1.setValueForProperty`的方法中
var INVALID_PROPERTY_ERRORS = {
    content: '`content` must be set using `updateTextContentByID()`.',
    dangerouslySetInnerHTML: '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
    style: '`style` must be set using `updateStylesByID()`.'
};
var textContentAccessor = getTextContentAccessor_1() || 'NA';

// --------------
// `ReactDOMIDOperations`
// 针对dom元素的id来操作dom元素
var ReactDOMIDOperations = {

    // --------------
    // `updatePropertyByID`
    // 提供`id`，`name`属性名，`value`属性值，更新`id`对应的值
    updatePropertyByID: function (id, name, value) {
        var node = ReactDOMNodeCache_1.getCachedNodeByID(id);
        invariant_1(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name), 'updatePropertyByID(...): %s', INVALID_PROPERTY_ERRORS[name]);
        DOMPropertyOperations_1.setValueForProperty(node, name, value)
    },

    // --------------
    // `updatePropertiesByID`
    // 传入`id`及属性对象`properties`，遍历更新`id`对应的属性
    updatePropertiesByID: function (id, properties) {
        for (var name in properties) {
            if (!properties.hasOwnProperty(name)) {
                continue
            }
            ReactDOMIDOperations.updatePropertyByID(id, name, properties[name])
        }
    },

    // --------------
    // `updateStylesByID`
    // 更新`id`对应的行内样式styles
    updateStylesByID: function (id, styles) {
        var node = ReactDOMNodeCache_1.getCachedNodeByID(id);
        CSSPropertyOperations_1.setValueForStyles(node, styles)
    },

    // --------------
    // `updateInnerHTMLByID`
    // 更新`id`对应的node的html
    updateInnerHTMLByID: function (id, html) {
        var node = ReactDOMNodeCache_1.getCachedNodeByID(id);
        node.innerHTML = (html && html.__html || '').replace(/^ /g, '&nbsp;')
    },

    // --------------
    // `updateTextContentByID`
    // 更新`id`对应的node的文本为`content`
    updateTextContentByID: function (id, content) {
        var node = ReactDOMNodeCache_1.getCachedNodeByID(id);
        node[textContentAccessor] = content
    },

    // --------------
    // `dangerouslyReplaceNodeWithMarkupByID`
    // 替换`id`对应的node内部html替换为`markup`
    dangerouslyReplaceNodeWithMarkupByID: function (id, markup) {
        var node = ReactDOMNodeCache_1.getCachedNodeByID(id);
        DOMChildrenOperations_1.dangerouslyReplaceNodeWithMarkup(node, markup);
        ReactDOMNodeCache_1.purgeEntireCache()
    },

    // --------------
    // `manageChildrenByParentID`
    // 对`DOMChildrenOperations_1.manageChildren`方法进行了二次加工
    manageChildrenByParentID: function (parentID, domOperations) {
        var parent = ReactDOMNodeCache_1.getCachedNodeByID(parentID);
        DOMChildrenOperations_1.manageChildren(parent, domOperations);
        ReactDOMNodeCache_1.purgeEntireCache()
    },

    // --------------
    // `setTextNodeValueAtIndexByParentID`
    // 设置id为`parentID`的第`index`个元素的值为`value`
    setTextNodeValueAtIndexByParentID: function (parentID, index, value) {
        var parent = ReactDOMNodeCache_1.getCachedNodeByID(parentID);
        DOMChildrenOperations_1.setTextNodeValueAtIndex(parent, index, value)
    }
};
var ReactDOMIDOperations_1 = ReactDOMIDOperations;

// --------------
// `ReactOwner`
// 关于ref属性的操作
var ReactOwner = {

    // --------------
    // `isValidOwner`
    // 判断`object`是否支持ref的操作
    isValidOwner: function (object) {
        return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function')
    },

    // --------------
    // `addComponentAsRefTo`
    // 给`owner`添加`ref`属性为`component`
    addComponentAsRefTo: function (component, ref, owner) {
        invariant_1(ReactOwner.isValidOwner(owner), 'addComponentAsRefTo(...): Only a ReactOwner can have refs.');
        owner.attachRef(ref, component)
    },

    // --------------
    // `removeComponentAsRefFrom`
    // 删除掉`owner`的`ref`属性`component`
    removeComponentAsRefFrom: function (component, ref, owner) {
        invariant_1(ReactOwner.isValidOwner(owner), 'removeComponentAsRefFrom(...): Only a ReactOwner can have refs.');
        if (owner.refs[ref] === component) {
            owner.detachRef(ref)
        }
    },
    Mixin: {
        attachRef: function (ref, component) {
            invariant_1(component.isOwnedBy(this), 'attachRef(%s, ...): Only a component\'s owner can store a ref to it.', ref);
            var refs = this.refs || (this.refs = {});
            refs[ref] = component
        },
        detachRef: function (ref) {
            delete this.refs[ref]
        }
    }
};
var ReactOwner_1 = ReactOwner;

// --------------
// `getActiveElement`
// 获取当前的激活元素
function getActiveElement() {
    try {
        return document.activeElement
    } catch (e) {}
}

// --------------
// `ReactInputSelection`
// 关于文字选择和退回选择的操作类
var ReactInputSelection = {

    // --------------
    // `hasSelectionCapabilities`
    // 判断元素`elem`是否支持内容编辑
    hasSelectionCapabilities: function (elem) {
        return elem && ((elem.nodeName === 'INPUT' && elem.type === 'text') || elem.nodeName === 'TEXTAREA' || elem.contentEditable === 'true')
    },

    // --------------
    // `getSelectionInformation`
    // 获取当前激活元素的选择区域
    getSelectionInformation: function () {
        var focusedElem = getActiveElement();
        return {
            focusedElem: focusedElem,
            selectionRange: ReactInputSelection.hasSelectionCapabilities(focusedElem) ? ReactInputSelection.getSelection(focusedElem) : null
        }
    },

    // --------------
    // `restoreSelection`
    // 退回选择
    restoreSelection: function (priorSelectionInformation) {
        var curFocusedElem = getActiveElement();
        var priorFocusedElem = priorSelectionInformation.focusedElem;
        var priorSelectionRange = priorSelectionInformation.selectionRange;
        if (curFocusedElem !== priorFocusedElem && document.getElementById(priorFocusedElem.id)) {
            if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
                ReactInputSelection.setSelection(priorFocusedElem, priorSelectionRange)
            }
            priorFocusedElem.focus()
        }
    },

    // --------------
    // `getSelection`
    // 获取`input`的选择区域
    getSelection: function (input) {
        var range;
        if (input.contentEditable === 'true' && window.getSelection) {
            range = window.getSelection().getRangeAt(0);
            var commonAncestor = range.commonAncestorContainer;
            if (commonAncestor && commonAncestor.nodeType === 3) {
                commonAncestor = commonAncestor.parentNode
            }
            if (commonAncestor !== input) {
                return {
                    start: 0,
                    end: 0
                }
            } else {
                return {
                    start: range.startOffset,
                    end: range.endOffset
                }
            }
        }
        if (!document.selection) {
            return {
                start: input.selectionStart,
                end: input.selectionEnd
            }
        }
        range = document.selection.createRange();
        if (range.parentElement() !== input) {
            return {
                start: 0,
                end: 0
            }
        }
        var length = input.value.length;
        if (input.nodeName === 'INPUT') {
            return {
                start: -range.moveStart('character', -length),
                end: -range.moveEnd('character', -length)
            }
        } else {
            var range2 = range.duplicate();
            range2.moveToElementText(input);
            range2.setEndPoint('StartToEnd', range);
            var end = length - range2.text.length;
            range2.setEndPoint('StartToStart', range);
            return {
                start: length - range2.text.length,
                end: end
            }
        }
    },

    // --------------
    // `setSelection`
    // 根据`rangeObj`来设置`input`的选择区域
    setSelection: function (input, rangeObj) {
        var range;
        var start = rangeObj.start;
        var end = rangeObj.end;
        if (typeof end === 'undefined') {
            end = start
        }
        if (document.selection) {
            if (input.tagName === 'TEXTAREA') {
                var cr_before = (input.value.slice(0, start).match(/\r/g) || []).length;
                var cr_inside = (input.value.slice(start, end).match(/\r/g) || []).length;
                start -= cr_before;
                end -= cr_before + cr_inside
            }
            range = input.createTextRange();
            range.collapse(true);
            range.moveStart('character', start);
            range.moveEnd('character', end - start);
            range.select()
        } else {
            if (input.contentEditable === 'true') {
                if (input.childNodes.length === 1) {
                    range = document.createRange();
                    range.setStart(input.childNodes[0], start);
                    range.setEnd(input.childNodes[0], end);
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range)
                }
            } else {
                input.selectionStart = start;
                input.selectionEnd = Math.min(end, input.value.length);
                input.focus()
            }
        }
    }
};
var ReactInputSelection_1 = ReactInputSelection;

// --------------
// `mixInto`
// 提供对象`methodBag`,拓展`constructor`的原型链
var mixInto = function (constructor, methodBag) {
    var methodName;
    for (methodName in methodBag) {
        if (!methodBag.hasOwnProperty(methodName)) {
            continue
        }
        constructor.prototype[methodName] = methodBag[methodName]
    }
};
var mixInto_1 = mixInto;

// --------------
// `ReactOnDOMReady`
// `ReactOnDOMReady`的构造函数，提供`_queue`的初始值`initialCollection`
function ReactOnDOMReady(initialCollection) {
    this._queue = initialCollection || null
}

// --------------
// `mixInto_1(ReactOnDOMReady`
// 合并方法到`ReactOnDOMReady`的原型链
mixInto_1(ReactOnDOMReady, {

    // --------------
    // `enqueue`
    // 给实例属性`_queue`添加元素
    enqueue: function (component, callback) {
        this._queue = this._queue || [];
        this._queue.push({
            component: component,
            callback: callback
        })
    },

    // --------------
    // `notifyAll`
    // 依次循环`_queue`属性，并调用`_queue`属性中的`callback`回调函数
    notifyAll: function () {
        var queue = this._queue;
        if (queue) {
            this._queue = null;
            for (var i = 0, l = queue.length; i < l; i++) {
                var component = queue[i].component;
                var callback = queue[i].callback;
                callback.call(component, component.getDOMNode())
            }
            queue.length = 0
        }
    },

    // --------------
    // `reset`
    // 重新清空`_queue`属性
    reset: function () {
        this._queue = null
    },

    // --------------
    // `destructor`
    // 重新清空`_queue`属性
    destructor: function () {
        this.reset()
    }
});

// --------------
// `PooledClass_1.addPoolingTo(ReactOnDOMReady);`
// 给`ReactOnDOMReady`添加`instancePool`、`getPooled`、`poolSize`、`release`等静态方法
PooledClass_1.addPoolingTo(ReactOnDOMReady);
var ReactOnDOMReady_1 = ReactOnDOMReady;
var DUAL_TRANSACTION = 'DUAL_TRANSACTION';
var MISSING_TRANSACTION = 'MISSING_TRANSACTION';
if (__DEV__) {

    // --------------
    // `DUAL_TRANSACTION`
    // 二次调用`perform`的报错信息
    DUAL_TRANSACTION = 'Cannot initialize transaction when there is already an outstanding transaction. Common causes of this are trying to render a component when you are already rendering a component or attempting a state transition while in a render function. Another possibility is that you are rendering new content (or state transitioning) in a componentDidRender callback. If this is not the case, please report the issue immediately.';

    // --------------
    // `MISSING_TRANSACTION`
    // 二次调用`closeAll`的报错信息
    MISSING_TRANSACTION = 'Cannot close transaction when there is none open.'
}
var Mixin$1 = {

    // --------------
    // `reinitializeTransaction`
    // 用来初始化`perform`和`initializeAll`的一些时间统计属性
    reinitializeTransaction: function () {
        this.transactionWrappers = this.getTransactionWrappers();
        if (!this.wrapperInitData) {
            this.wrapperInitData = []
        } else {
            this.wrapperInitData.length = 0
        }
        if (!this.timingMetrics) {
            this.timingMetrics = {}
        }
        this.timingMetrics.methodInvocationTime = 0;
        if (!this.timingMetrics.wrapperInitTimes) {
            this.timingMetrics.wrapperInitTimes = []
        } else {
            this.timingMetrics.wrapperInitTimes.length = 0
        }
        if (!this.timingMetrics.wrapperCloseTimes) {
            this.timingMetrics.wrapperCloseTimes = []
        } else {
            this.timingMetrics.wrapperCloseTimes.length = 0
        }
        this._isInTransaction = false
    },
    _isInTransaction: false,
    getTransactionWrappers: null,

    // --------------
    // `isInTransaction`
    // 判断`perform`方法是否在执行中
    isInTransaction: function () {
        return !!this._isInTransaction
    },

    // --------------
    // `perform`
    // 调用`perform`方法，并执行`method`方法
    perform: function (method, scope, a, b, c, d, e, f) {
        throwIf_1(this.isInTransaction(), DUAL_TRANSACTION);
        var memberStart = Date.now();
        var err = null;
        var ret;
        try {
            this.initializeAll();
            ret = method.call(scope, a, b, c, d, e, f)
        } catch (ie_requires_catch) {
            err = ie_requires_catch
        } finally {
            var memberEnd = Date.now();
            this.methodInvocationTime += (memberEnd - memberStart);
            try {
                this.closeAll()
            } catch (closeAllErr) {
                err = err || closeAllErr
            }
        }
        if (err) {
            throw err;
        }
        return ret
    },

    // --------------
    // `initializeAll`
    // `perform`方法调用前的准备函数
    initializeAll: function () {
        this._isInTransaction = true;
        var transactionWrappers = this.transactionWrappers;
        var wrapperInitTimes = this.timingMetrics.wrapperInitTimes;
        var err = null;
        for (var i = 0; i < transactionWrappers.length; i++) {
            var initStart = Date.now();
            var wrapper = transactionWrappers[i];
            try {
                this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null
            } catch (initErr) {
                err = err || initErr;
                this.wrapperInitData[i] = Transaction.OBSERVED_ERROR
            } finally {
                var curInitTime = wrapperInitTimes[i];
                var initEnd = Date.now();
                wrapperInitTimes[i] = (curInitTime || 0) + (initEnd - initStart)
            }
        }
        if (err) {
            throw err;
        }
    },

    // --------------
    // `closeAll`
    // `perform`调用完毕后，相应的属性还原
    closeAll: function () {
        throwIf_1(!this.isInTransaction(), MISSING_TRANSACTION);
        var transactionWrappers = this.transactionWrappers;
        var wrapperCloseTimes = this.timingMetrics.wrapperCloseTimes;
        var err = null;
        for (var i = 0; i < transactionWrappers.length; i++) {
            var wrapper = transactionWrappers[i];
            var closeStart = Date.now();
            var initData = this.wrapperInitData[i];
            try {
                if (initData !== Transaction.OBSERVED_ERROR) {
                    wrapper.close && wrapper.close.call(this, initData)
                }
            } catch (closeErr) {
                err = err || closeErr
            } finally {
                var closeEnd = Date.now();
                var curCloseTime = wrapperCloseTimes[i];
                wrapperCloseTimes[i] = (curCloseTime || 0) + (closeEnd - closeStart)
            }
        }
        this.wrapperInitData.length = 0;
        this._isInTransaction = false;
        if (err) {
            throw err;
        }
    }
};

// --------------
// `Transaction`
// `Mixin`属性是`perform`等方法混入的对象
var Transaction = {
    Mixin: Mixin$1,
    OBSERVED_ERROR: {}
};
var Transaction_1 = Transaction;


var SELECTION_RESTORATION = {
    initialize: ReactInputSelection_1.getSelectionInformation,// 获取当前激活元素的选择区域
    close: ReactInputSelection_1.restoreSelection// 退回选择
};

// --------------
// `EVENT_SUPPRESSION`
// 用来操作事件的停止和启动
var EVENT_SUPPRESSION = {

    // --------------
    // `initialize`
    // 执行的时候，停用事件触发
    initialize: function () {
        var currentlyEnabled = ReactEvent_1.isEnabled();
        ReactEvent_1.setEnabled(false);
        return currentlyEnabled
    },

    // --------------
    // `close`
    // 执行完毕的时候，恢复事件触发
    close: function (previouslyEnabled) {
        ReactEvent_1.setEnabled(previouslyEnabled)
    }
};

// --------------
// `ON_DOM_READY_QUEUEING`
// 用于操作`reactOnDOMReady`属性
var ON_DOM_READY_QUEUEING = {

    // --------------
    // `initialize`
    // 重新清空`reactOnDOMReady`属性的`_queue`属性
    initialize: function () {
        this.reactOnDOMReady.reset()
    },

    // --------------
    // `close`
    // 依次循环`_queue`属性，并调用`_queue`属性中的`callback`回调函数
    close: function () {
        this.reactOnDOMReady.notifyAll()
    }
};

// --------------
// `TRANSACTION_WRAPPERS`
// 添加三个元素，都含有`initialize`、`close`属性
var TRANSACTION_WRAPPERS = [SELECTION_RESTORATION, EVENT_SUPPRESSION, ON_DOM_READY_QUEUEING];

// --------------
// `ReactReconcileTransaction`
// `ReactReconcileTransaction`的构造函数，用于插入dom的执行函数
function ReactReconcileTransaction() {
    this.reinitializeTransaction();
    this.reactOnDOMReady = ReactOnDOMReady_1.getPooled(null)// 实例化`reactOnDOMReady`属性
}
var Mixin = {

    // --------------
    // `getTransactionWrappers`
    // 获取`wrappers`
    getTransactionWrappers: function () {
        if (ExecutionEnvironment_1.canUseDOM) {
            return TRANSACTION_WRAPPERS
        } else {
            return []
        }
    },

    // --------------
    // `getReactOnDOMReady`
    // 获取对象的`reactOnDOMReady`属性
    getReactOnDOMReady: function () {
        return this.reactOnDOMReady
    },

    // --------------
    // `destructor`
    // 释放`reactOnDOMReady`属性
    destructor: function () {
        ReactOnDOMReady_1.release(this.reactOnDOMReady);
        this.reactOnDOMReady = null
    }
};
mixInto_1(ReactReconcileTransaction, Transaction_1.Mixin);// 拓展ReactReconcileTransaction，使它含有perform、closeAll等方法

mixInto_1(ReactReconcileTransaction, Mixin);// 拓展ReactReconcileTransaction，添加getTransactionWrappers、getReactOnDOMReady、destructor等方法

PooledClass_1.addPoolingTo(ReactReconcileTransaction);// 添加instancePool、getPooled、poolSize、release等静态属性
var ReactReconcileTransaction_1 = ReactReconcileTransaction;
var OWNER = '{owner}';

// --------------
// `ComponentLifeCycle`
// 生命周期的两个属性
var ComponentLifeCycle = keyMirror_1({
    MOUNTED: null,
    UNMOUNTED: null
});

// --------------
// `ReactComponent`
// 关于Rt组件的类
var ReactComponent = {

    // --------------
    // `isValidComponent`
    // 判断是否是标准的`Component`，主要是判断是否含有`mountComponentIntoNode`属性和`receiveProps`属性
    isValidComponent: function (object) {
        return !!(object && typeof object.mountComponentIntoNode === 'function' && typeof object.receiveProps === 'function')
    },

    // --------------
    // `LifeCycle`
    // 包含`MOUNTED`和`UNMOUNTED`两个属性
    LifeCycle: ComponentLifeCycle,

    // --------------
    // `DOMIDOperations`
    // 针对dom元素的id来操作dom元素
    DOMIDOperations: ReactDOMIDOperations_1,

    // --------------
    // `ReactReconcileTransaction`
    // `ReactReconcileTransaction`的构造函数，用于插入dom的执行函数
    ReactReconcileTransaction: ReactReconcileTransaction_1,

    // --------------
    // `setDOMOperations`
    // 重新设置组件的`DOMIDOperations`属性
    setDOMOperations: function (DOMIDOperations) {
        ReactComponent.DOMIDOperations = DOMIDOperations
    },

    // --------------
    // `setReactReconcileTransaction`
    // 重新设置组件的`ReactReconcileTransaction`属性
    setReactReconcileTransaction: function (ReactReconcileTransaction) {
        ReactComponent.ReactReconcileTransaction = ReactReconcileTransaction
    },
    Mixin: {

        // --------------
        // `getDOMNode`
        // 获取当前组件对应的渲染dom元素
        getDOMNode: function () {
            invariant_1(ExecutionEnvironment_1.canUseDOM, 'getDOMNode(): The DOM is not supported in the current environment.');
            invariant_1(this._lifeCycleState === ComponentLifeCycle.MOUNTED, 'getDOMNode(): A component must be mounted to have a DOM node.');
            var rootNode = this._rootNode;
            if (!rootNode) {
                rootNode = document.getElementById(this._rootNodeID);
                if (!rootNode) {
                    rootNode = ReactMount_1.findReactRenderedDOMNodeSlow(this._rootNodeID)
                }
                this._rootNode = rootNode
            }
            return rootNode
        },

        // --------------
        // `setProps`
        // 合并props，并重新渲染
        setProps: function (partialProps) {
            this.replaceProps(merge_1(this.props, partialProps))
        },

        // --------------
        // `replaceProps`
        // 接收`props`，并重新渲染组件
        replaceProps: function (props) {
            invariant_1(!this.props[OWNER], 'replaceProps(...): You called `setProps` or `replaceProps` on a component with an owner. This is an anti-pattern since props will get reactively updated when rendered. Instead, change the owner\'s `render` method to pass the correct value as props to the component where it is created.');
            var transaction = ReactComponent.ReactReconcileTransaction.getPooled();
            transaction.perform(this.receiveProps, this, props, transaction);
            ReactComponent.ReactReconcileTransaction.release(transaction)
        },

        // --------------
        // `construct`
        // 初始化组件，相当于构造函数，生成`props`、`_lifeCycleState`、`props.children`、`props[OWNER]`等属性
        construct: function (initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        },

        // --------------
        // `mountComponent`
        // 给`props[OWNER]`添加key为`props.ref`，value为`this`的ref
        mountComponent: function (rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        },

        // --------------
        // `unmountComponent`
        // 重置ref的相关属性
        unmountComponent: function () {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.MOUNTED, 'unmountComponent(): Can only unmount a mounted component.');
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.removeComponentAsRefFrom(this, props.ref, props[OWNER])
            }
            this._rootNode = null;
            this._rootNodeID = null;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        },

        // --------------
        // `receiveProps`
        // 移除`nextProps`和`props`的`ref`
        receiveProps: function (nextProps, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.MOUNTED, 'receiveProps(...): Can only update a mounted component.');
            var props = this.props;
            if (nextProps[OWNER] !== props[OWNER] || nextProps.ref !== props.ref) {
                if (props.ref != null) {
                    ReactOwner_1.removeComponentAsRefFrom(this, props.ref, props[OWNER])
                }
                if (nextProps.ref != null) {
                    ReactOwner_1.addComponentAsRefTo(this, nextProps.ref, nextProps[OWNER])
                }
            }
        },

        // --------------
        // `mountComponentIntoNode`
        // 提供`rootID`和`container`，渲染好DOM之后，再释放`transaction`
        mountComponentIntoNode: function (rootID, container) {
            var transaction = ReactComponent.ReactReconcileTransaction.getPooled();
            transaction.perform(this._mountComponentIntoNode, this, rootID, container, transaction);
            ReactComponent.ReactReconcileTransaction.release(transaction)
        },

        // --------------
        // `_mountComponentIntoNode`
        // 提供`rootID`和`container`以及`transaction`，最后生成`html`文本，并替换掉`container`的html文本
        _mountComponentIntoNode: function (rootID, container, transaction) {
            var renderStart = Date.now();
            var markup = this.mountComponent(rootID, transaction);
            ReactMount_1.totalInstantiationTime += (Date.now() - renderStart);
            var injectionStart = Date.now();
            var parent = container.parentNode;
            if (parent) {
                var next = container.nextSibling;
                parent.removeChild(container);
                container.innerHTML = markup;
                if (next) {
                    parent.insertBefore(container, next)
                } else {
                    parent.appendChild(container)
                }
            } else {
                container.innerHTML = markup
            }
            ReactMount_1.totalInjectionTime += (Date.now() - injectionStart)
        },

        // --------------
        // `unmountComponentFromNode`
        // 释放掉渲染的资源
        unmountComponentFromNode: function (container) {
            this.unmountComponent();
            while (container.lastChild) {
                container.removeChild(container.lastChild)
            }
        },

        // --------------
        // `isOwnedBy`
        // 判断`owner`是否为当前`props`的owner
        isOwnedBy: function (owner) {
            return this.props[OWNER] === owner
        }
    }
};

// --------------
// `logDeprecated`
// 控制台打印警告提示`msg`
function logDeprecated(msg) {
    if (__DEV__) {
        throw new Error(msg);
    } else {
        console && console.warn && console.warn(msg)
    }
}

// --------------
// `ReactComponent.Mixin.update`
// 废弃的方法，用`setProps`代替
ReactComponent.Mixin.update = function (props) {
    logDeprecated('this.update() is deprecated. Use this.setProps()');
    this.setProps(props)
};

// --------------
// `ReactComponent.Mixin.updateAll`
// 废弃的方法，用`replaceProps`代替
ReactComponent.Mixin.updateAll = function (props) {
    logDeprecated('this.updateAll() is deprecated. Use this.replaceProps()');
    this.replaceProps(props)
};
var ReactComponent_1 = ReactComponent;

// --------------
// `copyProperties`
// 把`a`、`b`、`c`、`d`、`e`合并到`obj`对象中
function copyProperties(obj, a, b, c, d, e, f) {
    obj = obj || {};
    if (__DEV__) {
        if (f) {
            throw new Error('Too many arguments passed to copyProperties');
        }
    }
    var args = [a, b, c, d, e];
    var ii = 0,
        v;
    while (args[ii]) {
        v = args[ii++];
        for (var k in v) {
            obj[k] = v[k]
        }
        if (v && v.hasOwnProperty && v.hasOwnProperty('toString') && (typeof v.toString != 'undefined') && (obj.toString !== v.toString)) {
            obj.toString = v.toString
        }
    }
    return obj
}
var copyProperties_1 = copyProperties;

// --------------
// `makeEmptyFunction`
// 用来创建返回参数的函数
function makeEmptyFunction(arg) {
    return function () {
        return arg
    }
}

// --------------
// `emptyFunction`
// 创建`emptyFunction`函数，并循环赋值不同属性
function emptyFunction() {}
copyProperties_1(emptyFunction, {
    thatReturns: makeEmptyFunction,
    thatReturnsFalse: makeEmptyFunction(false),// 返回 false
    thatReturnsTrue: makeEmptyFunction(true),// 返回 true
    thatReturnsNull: makeEmptyFunction(null),// 返回 null
    thatReturnsThis: function () { // 返回 this
        return this
    },
    thatReturnsArgument: function (arg) {// 返回 arg
        return arg
    },
    mustImplement: function (module, property) {
        return function () {
            if (__DEV__) {
                throw new Error(module + '.' + property + ' must be implemented!');
            }
        }
    }
});
var emptyFunction_1 = emptyFunction;

// --------------
// `joinClasses`
// 传入多个参数，并用空格连起来
function joinClasses(className) {
    if (!className) {
        className = ''
    }
    var nextClass;
    var argLength = arguments.length;
    if (argLength > 1) {
        for (var ii = 1; ii < argLength; ii++) {
            nextClass = arguments[ii];
            nextClass && (className += ' ' + nextClass)
        }
    }
    return className
}
var joinClasses_1 = joinClasses;

// --------------
// `createTransferStrategy`
// 传入回调函数，并为`props`生成对应的key-value
function createTransferStrategy(mergeStrategy) {
    return function (props, key, value) {
        if (!props.hasOwnProperty(key)) {
            props[key] = value
        } else {
            props[key] = mergeStrategy(props[key], value)
        }
    }
}

// --------------
// `TransferStrategies`
// 高阶函数的函数对象
var TransferStrategies = {
    ref: emptyFunction_1,// 创建`emptyFunction`函数，并循环赋值不同属性
    className: createTransferStrategy(joinClasses_1),// 传入回调函数，并为`props`生成对应的key-value
    style: createTransferStrategy(merge_1)// 把`one`、`two`合并到`result`，并返回
};

var ReactPropTransferer = {
    TransferStrategies: TransferStrategies,
    Mixin: {

        // --------------
        // `transferPropsTo`
        // 把`component`的属性整理后重新赋值
        transferPropsTo: function (component) {
            var props = {};
            for (var thatKey in component.props) {
                if (component.props.hasOwnProperty(thatKey)) {
                    props[thatKey] = component.props[thatKey]
                }
            }
            for (var thisKey in this.props) {
                if (!this.props.hasOwnProperty(thisKey)) {
                    continue
                }
                var transferStrategy = TransferStrategies[thisKey];
                if (transferStrategy) {
                    transferStrategy(props, thisKey, this.props[thisKey])
                } else if (!props.hasOwnProperty(thisKey)) {
                    props[thisKey] = this.props[thisKey]
                }
            }
            component.props = props;
            return component
        }
    }
};
var ReactPropTransferer_1 = ReactPropTransferer;

// --------------
// `SpecPolicy`
// `DEFINE_ONCE`、`DEFINE_MANY`、`OVERRIDE_BASE`的属性对象
var SpecPolicy = keyMirror_1({
    DEFINE_ONCE: null,
    DEFINE_MANY: null,
    OVERRIDE_BASE: null
});

// --------------
// `ReactCompositeComponentInterface`
// 用于混入`component`时的对象
var ReactCompositeComponentInterface = {
    mixins: SpecPolicy.DEFINE_MANY,
    props: SpecPolicy.DEFINE_ONCE,
    getInitialState: SpecPolicy.DEFINE_ONCE,
    render: SpecPolicy.DEFINE_ONCE,
    componentWillMount: SpecPolicy.DEFINE_MANY,
    componentDidMount: SpecPolicy.DEFINE_MANY,
    componentWillReceiveProps: SpecPolicy.DEFINE_MANY,
    shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,
    componentWillUpdate: SpecPolicy.DEFINE_MANY,
    componentDidUpdate: SpecPolicy.DEFINE_MANY,
    componentWillUnmount: SpecPolicy.DEFINE_MANY,
    updateComponent: SpecPolicy.OVERRIDE_BASE
};

// --------------
// `RESERVED_SPEC_KEYS`
// 二次处理`component`的方法
var RESERVED_SPEC_KEYS = {

    // --------------
    // `displayName`
    // `displayName`处理displayName属性
    displayName: function (Constructor, displayName) {
        Constructor.displayName = displayName
    },

    // --------------
    // `mixins`
    // 当遇到`mixins`属性的时候，需要递归
    mixins: function (Constructor, mixins) {
        if (mixins) {
            for (var i = 0; i < mixins.length; i++) {
                mixSpecIntoComponent(Constructor, mixins[i])
            }
        }
    },

    // --------------
    // `props`
    // props属性则赋值到`propDeclarations`
    props: function (Constructor, props) {
        Constructor.propDeclarations = props
    }
};

// --------------
// `mixSpecIntoComponent`
// 合并`spec`到`Constructor`中
function mixSpecIntoComponent(Constructor, spec) {
    var proto = Constructor.prototype;
    for (var name in spec) {
        if (!spec.hasOwnProperty(name)) {
            continue
        }
        var property = spec[name];
        var specPolicy = ReactCompositeComponentInterface[name];
        if (ReactCompositeComponentMixin.hasOwnProperty(name)) {
            invariant_1(specPolicy === SpecPolicy.OVERRIDE_BASE, 'ReactCompositeComponentInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name)
        }
        if (specPolicy != null) {
            invariant_1(!property || !property.__reactAutoBind, 'ReactCompositeComponentInterface: You are attempting to use `React.autoBind` on `%s`, a method that is internal to React.Internal methods are called with the component as the context.', name)
        }
        if (proto.hasOwnProperty(name)) {
            invariant_1(specPolicy === SpecPolicy.DEFINE_MANY, 'ReactCompositeComponentInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name)
        }
        if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
            RESERVED_SPEC_KEYS[name](Constructor, property)
        } else if (property && property.__reactAutoBind) {
            if (!proto.__reactAutoBindMap) {
                proto.__reactAutoBindMap = {}
            }
            proto.__reactAutoBindMap[name] = property.__reactAutoBind
        } else if (proto.hasOwnProperty(name)) {
            proto[name] = createChainedFunction(proto[name], property)
        } else {
            proto[name] = property
        }
    }
}

// --------------
// `createChainedFunction`
// 把`one`、`two`集中到一个函数处理
function createChainedFunction(one, two) {
    return function chainedFunction(a, b, c, d, e, tooMany) {
        invariant_1(typeof tooMany === 'undefined', 'Chained function can only take a maximum of 5 arguments.');
        one.call(this, a, b, c, d, e);
        two.call(this, a, b, c, d, e)
    }
}

// --------------
// `CompositeLifeCycle`
// 正在构建时的状态对象
var CompositeLifeCycle = keyMirror_1({
    MOUNTING: null,
    UNMOUNTING: null,
    RECEIVING_PROPS: null,
    RECEIVING_STATE: null
});

// --------------
// `ReactCompositeComponentMixin`
// Rt的`createClass`创建对象的一个混入类
var ReactCompositeComponentMixin = {

    // --------------
    // `construct`
    // 初始化函数
    construct: function (initialProps, children) {
        ReactComponent_1.Mixin.construct.call(this, initialProps, children);
        this.state = null;
        this._pendingState = null;
        this._compositeLifeCycleState = null
    },

    // --------------
    // `mountComponent`
    // 把rootID对应的子元素的rt组件实例化之后，再进行mount
    mountComponent: function (rootID, transaction) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID, transaction);
        this._lifeCycleState = ReactComponent_1.LifeCycle.UNMOUNTED;
        this._compositeLifeCycleState = CompositeLifeCycle.MOUNTING;
        if (this.constructor.propDeclarations) {
            this._assertValidProps(this.props)
        }
        if (this.__reactAutoBindMap) {
            this._bindAutoBindMethods()
        }
        this.state = this.getInitialState ? this.getInitialState() : null;
        this._pendingState = null;
        if (this.componentWillMount) {
            this.componentWillMount();
            if (this._pendingState) {
                this.state = this._pendingState;
                this._pendingState = null
            }
        }
        if (this.componentDidMount) {
            transaction.getReactOnDOMReady().enqueue(this, this.componentDidMount)
        }
        this._renderedComponent = this._renderValidatedComponent();
        this._compositeLifeCycleState = null;
        this._lifeCycleState = ReactComponent_1.LifeCycle.MOUNTED;
        return this._renderedComponent.mountComponent(rootID, transaction)
    },

    // --------------
    // `unmountComponent`
    // 卸载渲染
    unmountComponent: function () {
        this._compositeLifeCycleState = CompositeLifeCycle.UNMOUNTING;
        if (this.componentWillUnmount) {
            this.componentWillUnmount()
        }
        this._compositeLifeCycleState = null;
        ReactComponent_1.Mixin.unmountComponent.call(this);
        this._renderedComponent.unmountComponent();
        this._renderedComponent = null;
        if (this.refs) {
            this.refs = null
        }
    },

    // --------------
    // `receiveProps`
    // 接收`nextProps`，并重新渲染
    receiveProps: function (nextProps, transaction) {
        if (this.constructor.propDeclarations) {
            this._assertValidProps(nextProps)
        }
        ReactComponent_1.Mixin.receiveProps.call(this, nextProps, transaction);
        this._compositeLifeCycleState = CompositeLifeCycle.RECEIVING_PROPS;
        if (this.componentWillReceiveProps) {
            this.componentWillReceiveProps(nextProps, transaction)
        }
        this._compositeLifeCycleState = CompositeLifeCycle.RECEIVING_STATE;
        var nextState = this._pendingState || this.state;
        this._pendingState = null;
        this._receivePropsAndState(nextProps, nextState, transaction);
        this._compositeLifeCycleState = null
    },

    // --------------
    // `setState`
    // 接收`partialState`，并重新渲染
    setState: function (partialState) {
        this.replaceState(merge_1(this._pendingState || this.state, partialState))
    },

    // --------------
    // `replaceState`
    // 接收`completeState`，并重新渲染
    replaceState: function (completeState) {
        var compositeLifeCycleState = this._compositeLifeCycleState;
        invariant_1(this._lifeCycleState === ReactComponent_1.LifeCycle.MOUNTED || compositeLifeCycleState === CompositeLifeCycle.MOUNTING, 'replaceState(...): Can only update a mounted (or mounting) component.');
        invariant_1(compositeLifeCycleState !== CompositeLifeCycle.RECEIVING_STATE && compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING, 'replaceState(...): Cannot update while unmounting component or during an existing state transition (such as within `render`).');
        this._pendingState = completeState;
        if (compositeLifeCycleState !== CompositeLifeCycle.MOUNTING && compositeLifeCycleState !== CompositeLifeCycle.RECEIVING_PROPS) {
            this._compositeLifeCycleState = CompositeLifeCycle.RECEIVING_STATE;
            var nextState = this._pendingState;
            this._pendingState = null;
            var transaction = ReactComponent_1.ReactReconcileTransaction.getPooled();
            transaction.perform(this._receivePropsAndState, this, this.props, nextState, transaction);
            ReactComponent_1.ReactReconcileTransaction.release(transaction);
            this._compositeLifeCycleState = null
        }
    },
    _receivePropsAndState: function (nextProps, nextState, transaction) {
        if (!this.shouldComponentUpdate || this.shouldComponentUpdate(nextProps, nextState)) {
            this._performComponentUpdate(nextProps, nextState, transaction)
        } else {
            this.props = nextProps;
            this.state = nextState
        }
    },
    _performComponentUpdate: function (nextProps, nextState, transaction) {
        var prevProps = this.props;
        var prevState = this.state;
        if (this.componentWillUpdate) {
            this.componentWillUpdate(nextProps, nextState, transaction)
        }
        this.props = nextProps;
        this.state = nextState;
        this.updateComponent(transaction);
        if (this.componentDidUpdate) {
            transaction.getReactOnDOMReady().enqueue(this, this.componentDidUpdate.bind(this, prevProps, prevState))
        }
    },
    updateComponent: function (transaction) {
        var currentComponent = this._renderedComponent;
        var nextComponent = this._renderValidatedComponent();
        if (currentComponent.constructor === nextComponent.constructor) {
            if (!nextComponent.props.isStatic) {
                currentComponent.receiveProps(nextComponent.props, transaction)
            }
        } else {
            var thisID = this._rootNodeID;
            var currentComponentID = currentComponent._rootNodeID;
            currentComponent.unmountComponent();
            var nextMarkup = nextComponent.mountComponent(thisID, transaction);
            ReactComponent_1.DOMIDOperations.dangerouslyReplaceNodeWithMarkupByID(currentComponentID, nextMarkup);
            this._renderedComponent = nextComponent
        }
    },
    forceUpdate: function () {
        var transaction = ReactComponent_1.ReactReconcileTransaction.getPooled();
        transaction.perform(this._performComponentUpdate, this, this.props, this.state, transaction);
        ReactComponent_1.ReactReconcileTransaction.release(transaction)
    },
    _renderValidatedComponent: function () {
        ReactCurrentOwner_1.current = this;
        var renderedComponent = this.render();
        ReactCurrentOwner_1.current = null;
        invariant_1(ReactComponent_1.isValidComponent(renderedComponent), '%s.render(): A valid ReactComponent must be returned.', this.constructor.displayName || 'ReactCompositeComponent');
        return renderedComponent
    },
    _assertValidProps: function (props) {
        var propDeclarations = this.constructor.propDeclarations;
        var componentName = this.constructor.displayName;
        for (var propName in propDeclarations) {
            var checkProp = propDeclarations[propName];
            if (checkProp) {
                checkProp(props, propName, componentName)
            }
        }
    },
    _bindAutoBindMethods: function () {
        for (var autoBindKey in this.__reactAutoBindMap) {
            if (!this.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
                continue
            }
            var method = this.__reactAutoBindMap[autoBindKey];
            this[autoBindKey] = this._bindAutoBindMethod(method)
        }
    },

    _bindAutoBindMethod: function (method) {
        var component = this;
        var hasWarned = false;

        function autoBound(a, b, c, d, e, tooMany) {
            invariant_1(typeof tooMany === 'undefined', 'React.autoBind(...): Methods can only take a maximum of 5 arguments.');
            if (component._lifeCycleState === ReactComponent_1.LifeCycle.MOUNTED) {
                return method.call(component, a, b, c, d, e)
            } else if (!hasWarned) {
                hasWarned = true;
                if (__DEV__) {
                    console.warn('React.autoBind(...): Attempted to invoke an auto-bound method on an unmounted instance of `%s`. You either have a memory leak or an event handler that is being run after unmounting.', component.constructor.displayName || 'ReactCompositeComponent')
                }
            }
        }
        return autoBound
    }
};

// --------------
// `ReactCompositeComponentBase`
// 用于创建`Component`构造函数原型链的初始方法
var ReactCompositeComponentBase = function () {};

mixInto_1(ReactCompositeComponentBase, ReactComponent_1.Mixin);// ReactCompositeComponentBase合并ReactComponent_1.Mixin到它的原型链
mixInto_1(ReactCompositeComponentBase, ReactOwner_1.Mixin);// ReactCompositeComponentBase合并ReactOwner_1.Mixin到它的原型链
mixInto_1(ReactCompositeComponentBase, ReactPropTransferer_1.Mixin);// ReactCompositeComponentBase合并ReactPropTransferer_1.Mixin到它的原型链
mixInto_1(ReactCompositeComponentBase, ReactCompositeComponentMixin);// ReactCompositeComponentBase合并ReactCompositeComponentMixin到它的原型链
var ReactCompositeComponent = {
    LifeCycle: CompositeLifeCycle,
    Base: ReactCompositeComponentBase,

    // --------------
    // `createClass`
    // 传入属性，生成构造函数返回
    createClass: function (spec) {
        var Constructor = function (initialProps, children) {
            this.construct(initialProps, children)
        };
        Constructor.prototype = new ReactCompositeComponentBase();
        Constructor.prototype.constructor = Constructor;
        mixSpecIntoComponent(Constructor, spec);
        invariant_1(Constructor.prototype.render, 'createClass(...): Class specification must implement a `render` method.');
        var ConvenienceConstructor = function (props, children) {
            return new Constructor(props, children)
        };
        ConvenienceConstructor.componentConstructor = Constructor;
        ConvenienceConstructor.originalSpec = spec;
        return ConvenienceConstructor
    },

    // --------------
    // `autoBind`
    // 二次加工`method`函数，赋值到`unbound`的`__reactAutoBind`属性中
    autoBind: function (method) {
        function unbound() {
            invariant_1(false, 'React.autoBind(...): Attempted to invoke an auto-bound method that was not correctly defined on the class specification.')
        }
        unbound.__reactAutoBind = method;
        return unbound
    }
};
var ReactCompositeComponent_1 = ReactCompositeComponent;

function shouldManageExisting(curChild, newChild) {
    return curChild && newChild && curChild.constructor === newChild.constructor
}
var ReactMultiChildMixin = {
    enqueueMarkupAt: function (markup, insertAt) {
        this.domOperations = this.domOperations || [];
        this.domOperations.push({
            insertMarkup: markup,
            finalIndex: insertAt
        })
    },
    enqueueMove: function (originalIndex, finalIndex) {
        this.domOperations = this.domOperations || [];
        this.domOperations.push({
            moveFrom: originalIndex,
            finalIndex: finalIndex
        })
    },
    enqueueUnmountChildByName: function (name, removeChild) {
        if (ReactComponent_1.isValidComponent(removeChild)) {
            this.domOperations = this.domOperations || [];
            this.domOperations.push({
                removeAt: removeChild._domIndex
            });
            removeChild.unmountComponent && removeChild.unmountComponent();
            delete this._renderedChildren[name]
        }
    },
    processChildDOMOperationsQueue: function () {
        if (this.domOperations) {
            ReactComponent_1.DOMIDOperations.manageChildrenByParentID(this._rootNodeID, this.domOperations);
            this.domOperations = null
        }
    },
    unmountMultiChild: function () {
        var renderedChildren = this._renderedChildren;
        for (var name in renderedChildren) {
            if (renderedChildren.hasOwnProperty(name) && renderedChildren[name]) {
                var renderedChild = renderedChildren[name];
                renderedChild.unmountComponent && renderedChild.unmountComponent()
            }
        }
        this._renderedChildren = null
    },
    mountMultiChild: function (children, transaction) {
        var accum = '';
        var index = 0;
        for (var name in children) {
            var child = children[name];
            if (children.hasOwnProperty(name) && child) {
                accum += child.mountComponent(this._rootNodeID + '.' + name, transaction);
                child._domIndex = index;
                index++
            }
        }
        this._renderedChildren = children;
        this.domOperations = null;
        return accum
    },
    updateMultiChild: function (nextChildren, transaction) {
        if (!nextChildren && !this._renderedChildren) {
            return
        } else if (nextChildren && !this._renderedChildren) {
            this._renderedChildren = {}
        } else if (!nextChildren && this._renderedChildren) {
            nextChildren = {}
        }
        var rootDomIdDot = this._rootNodeID + '.';
        var markupBuffer = null;
        var numPendingInsert = 0;
        var loopDomIndex = 0;
        var curChildrenDOMIndex = 0;
        for (var name in nextChildren) {
            if (!nextChildren.hasOwnProperty(name)) {
                continue
            }
            var curChild = this._renderedChildren[name];
            var nextChild = nextChildren[name];
            if (shouldManageExisting(curChild, nextChild)) {
                if (markupBuffer) {
                    this.enqueueMarkupAt(markupBuffer, loopDomIndex - numPendingInsert);
                    markupBuffer = null
                }
                numPendingInsert = 0;
                if (curChild._domIndex < curChildrenDOMIndex) {
                    this.enqueueMove(curChild._domIndex, loopDomIndex)
                }
                curChildrenDOMIndex = Math.max(curChild._domIndex, curChildrenDOMIndex);
                !nextChild.props.isStatic && curChild.receiveProps(nextChild.props, transaction);
                curChild._domIndex = loopDomIndex
            } else {
                if (curChild) {
                    this.enqueueUnmountChildByName(name, curChild);
                    curChildrenDOMIndex = Math.max(curChild._domIndex, curChildrenDOMIndex)
                }
                if (nextChild) {
                    this._renderedChildren[name] = nextChild;
                    var nextMarkup = nextChild.mountComponent(rootDomIdDot + name, transaction);
                    markupBuffer = markupBuffer ? markupBuffer + nextMarkup : nextMarkup;
                    numPendingInsert++;
                    nextChild._domIndex = loopDomIndex
                }
            }
            loopDomIndex = nextChild ? loopDomIndex + 1 : loopDomIndex
        }
        if (markupBuffer) {
            this.enqueueMarkupAt(markupBuffer, loopDomIndex - numPendingInsert)
        }
        for (var childName in this._renderedChildren) {
            if (!this._renderedChildren.hasOwnProperty(childName)) {
                continue
            }
            var child = this._renderedChildren[childName];
            if (child && !nextChildren[childName]) {
                this.enqueueUnmountChildByName(childName, child)
            }
        }
        this.processChildDOMOperationsQueue()
    }
};
var ReactMultiChild = {
    Mixin: ReactMultiChildMixin
};
var ReactMultiChild_1 = ReactMultiChild;
var ReactTextComponent = function (initialText) {
    this.construct({
        text: initialText
    })
};
mixInto_1(ReactTextComponent, ReactComponent_1.Mixin);
mixInto_1(ReactTextComponent, {
    mountComponent: function (rootID) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID);
        return ('<span id="' + rootID + '">' + escapeTextForBrowser_1(this.props.text) + '</span>')
    },
    receiveProps: function (nextProps, transaction) {
        if (nextProps.text !== this.props.text) {
            this.props.text = nextProps.text;
            ReactComponent_1.DOMIDOperations.updateTextContentByID(this._rootNodeID, nextProps.text)
        }
    }
});
var ReactTextComponent_1 = ReactTextComponent;
var INVALID_CHILD = 'INVALID_CHILD';
if (__DEV__) {
    INVALID_CHILD = 'You may not pass a child of that type to a React component. It is a common mistake to try to pass a standard browser DOM element as a child of a React component.'
}
var ONLY_CHILD_NAME = '0';
var flattenChildrenImpl = function (res, children, nameSoFar) {
    if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
            flattenChildrenImpl(res, children[i], nameSoFar + '[' + i + ']')
        }
    } else {
        var type = typeof children;
        var isOnlyChild = nameSoFar === '';
        var storageName = isOnlyChild ? ONLY_CHILD_NAME : nameSoFar;
        if (children === null || children === undefined || type === 'boolean') {
            res[storageName] = null
        } else if (children.mountComponentIntoNode) {
            res[storageName] = children
        } else {
            if (type === 'object') {
                throwIf_1(children && children.nodeType === 1, INVALID_CHILD);
                for (var key in children) {
                    if (children.hasOwnProperty(key)) {
                        flattenChildrenImpl(res, children[key], nameSoFar + '{' + escapeTextForBrowser_1(key) + '}')
                    }
                }
            } else if (type === 'string') {
                res[storageName] = new ReactTextComponent_1(children)
            } else if (type === 'number') {
                res[storageName] = new ReactTextComponent_1('' + children)
            }
        }
    }
};

function flattenChildren(children) {
    if (children === null || children === undefined) {
        return children
    }
    var result = {};
    flattenChildrenImpl(result, children, '');
    return result
}
var flattenChildren_1 = flattenChildren;
var putListener = ReactEvent_1.putListener;
var registrationNames = ReactEvent_1.registrationNames;
var CONTENT_TYPES = {
    'string': true,
    'number': true
};
var CONTENT = keyOf_1({
    content: null
});
var DANGEROUSLY_SET_INNER_HTML = keyOf_1({
    dangerouslySetInnerHTML: null
});
var STYLE = keyOf_1({
    style: null
});

function assertValidProps(props) {
    if (!props) {
        return
    }
    var hasChildren = props.children != null ? 1 : 0;
    var hasContent = props.content != null ? 1 : 0;
    var hasInnerHTML = props.dangerouslySetInnerHTML != null ? 1 : 0;
    invariant_1(hasChildren + hasContent + hasInnerHTML <= 1, 'Can only set one of `children`, `props.content`, or `props.dangerouslySetInnerHTML`.');
    invariant_1(props.style == null || typeof props.style === 'object', 'The `style` prop expects a mapping from style properties to values, not a string.')
}

// --------------
// `ReactNativeComponent`
// Rt的Dom构造函数扩展方法，React.DOM.XXX的一个扩展
function ReactNativeComponent(tag, omitClose) {
    this._tagOpen = '<' + tag + ' ';
    this._tagClose = omitClose ? '' : '</' + tag + '>';
    this.tagName = tag.toUpperCase()
}
ReactNativeComponent.Mixin = {

    // --------------
    // `mountComponent`
    // 提供`rootID`和`transaction`，生成html字符串并返回
    mountComponent: function (rootID, transaction) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID, transaction);
        assertValidProps(this.props);
        return (this._createOpenTagMarkup() + this._createContentMarkup(transaction) + this._tagClose)
    },

    // --------------
    // `_createOpenTagMarkup`
    // 生成包含属性的开始标签html字符串
    _createOpenTagMarkup: function () {
        var props = this.props;
        var ret = this._tagOpen;
        for (var propKey in props) {
            if (!props.hasOwnProperty(propKey)) {
                continue
            }
            var propValue = props[propKey];
            if (propValue == null) {
                continue
            }
            if (registrationNames[propKey]) {
                putListener(this._rootNodeID, propKey, propValue)
            } else {
                if (propKey === STYLE) {
                    if (propValue) {
                        propValue = props.style = merge_1(props.style)
                    }
                    propValue = CSSPropertyOperations_1.createMarkupForStyles(propValue)
                }
                var markup = DOMPropertyOperations_1.createMarkupForProperty(propKey, propValue);
                if (markup) {
                    ret += ' ' + markup
                }
            }
        }
        return ret + ' id="' + this._rootNodeID + '">'
    },

    // --------------
    // `_createContentMarkup`
    // 生成子孙元素对应的html字符串
    _createContentMarkup: function (transaction) {
        var innerHTML = this.props.dangerouslySetInnerHTML;
        if (innerHTML != null) {
            if (innerHTML.__html != null) {
                return innerHTML.__html
            }
        } else {
            var contentToUse = this.props.content != null ? this.props.content : CONTENT_TYPES[typeof this.props.children] ? this.props.children : null;
            var childrenToUse = contentToUse != null ? null : this.props.children;
            if (contentToUse != null) {
                return escapeTextForBrowser_1(contentToUse)
            } else if (childrenToUse != null) {
                return this.mountMultiChild(flattenChildren_1(childrenToUse), transaction)
            }
        }
        return ''
    },
    receiveProps: function (nextProps, transaction) {
        invariant_1(this._rootNodeID, 'Trying to control a native dom element without a backing id');
        assertValidProps(nextProps);
        ReactComponent_1.Mixin.receiveProps.call(this, nextProps, transaction);
        this._updateDOMProperties(nextProps);
        this._updateDOMChildren(nextProps, transaction);
        this.props = nextProps
    },
    _updateDOMProperties: function (nextProps) {
        var lastProps = this.props;
        for (var propKey in nextProps) {
            var nextProp = nextProps[propKey];
            var lastProp = lastProps[propKey];
            if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp) {
                continue
            }
            if (propKey === STYLE) {
                if (nextProp) {
                    nextProp = nextProps.style = merge_1(nextProp)
                }
                var styleUpdates;
                for (var styleName in nextProp) {
                    if (!nextProp.hasOwnProperty(styleName)) {
                        continue
                    }
                    if (!lastProp || lastProp[styleName] !== nextProp[styleName]) {
                        if (!styleUpdates) {
                            styleUpdates = {}
                        }
                        styleUpdates[styleName] = nextProp[styleName]
                    }
                }
                if (styleUpdates) {
                    ReactComponent_1.DOMIDOperations.updateStylesByID(this._rootNodeID, styleUpdates)
                }
            } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
                var lastHtml = lastProp && lastProp.__html;
                var nextHtml = nextProp && nextProp.__html;
                if (lastHtml !== nextHtml) {
                    ReactComponent_1.DOMIDOperations.updateInnerHTMLByID(this._rootNodeID, nextProp)
                }
            } else if (propKey === CONTENT) {
                ReactComponent_1.DOMIDOperations.updateTextContentByID(this._rootNodeID, '' + nextProp)
            } else if (registrationNames[propKey]) {
                putListener(this._rootNodeID, propKey, nextProp)
            } else {
                ReactComponent_1.DOMIDOperations.updatePropertyByID(this._rootNodeID, propKey, nextProp)
            }
        }
    },
    _updateDOMChildren: function (nextProps, transaction) {
        var thisPropsContentType = typeof this.props.content;
        var thisPropsContentEmpty = this.props.content == null || thisPropsContentType === 'boolean';
        var nextPropsContentType = typeof nextProps.content;
        var nextPropsContentEmpty = nextProps.content == null || nextPropsContentType === 'boolean';
        var lastUsedContent = !thisPropsContentEmpty ? this.props.content : CONTENT_TYPES[typeof this.props.children] ? this.props.children : null;
        var contentToUse = !nextPropsContentEmpty ? nextProps.content : CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;
        var lastUsedChildren = lastUsedContent != null ? null : this.props.children;
        var childrenToUse = contentToUse != null ? null : nextProps.children;
        if (contentToUse != null) {
            var childrenRemoved = lastUsedChildren != null && childrenToUse == null;
            if (childrenRemoved) {
                this.updateMultiChild(null, transaction)
            }
            if (lastUsedContent !== contentToUse) {
                ReactComponent_1.DOMIDOperations.updateTextContentByID(this._rootNodeID, '' + contentToUse)
            }
        } else {
            var contentRemoved = lastUsedContent != null && contentToUse == null;
            if (contentRemoved) {
                ReactComponent_1.DOMIDOperations.updateTextContentByID(this._rootNodeID, '')
            }
            this.updateMultiChild(flattenChildren_1(nextProps.children), transaction)
        }
    },
    unmountComponent: function () {
        ReactComponent_1.Mixin.unmountComponent.call(this);
        this.unmountMultiChild();
        ReactEvent_1.deleteAllListeners(this._rootNodeID)
    }
};
mixInto_1(ReactNativeComponent, ReactComponent_1.Mixin);
mixInto_1(ReactNativeComponent, ReactNativeComponent.Mixin);
mixInto_1(ReactNativeComponent, ReactMultiChild_1.Mixin);
var ReactNativeComponent_1 = ReactNativeComponent;

function objMapKeyVal(obj, func, context) {
    if (!obj) {
        return null
    }
    var i = 0;
    var ret = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            ret[key] = func.call(context, key, obj[key], i++)
        }
    }
    return ret
}
var objMapKeyVal_1 = objMapKeyVal;

// --------------
// `createDOMComponentClass`
// 传入`tag`标签名和`omitClose`，来创建Rt.dom的方法
function createDOMComponentClass(tag, omitClose) {
    var Constructor = function (initialProps, children) {
        this.construct(initialProps, children)
    };
    Constructor.prototype = new ReactNativeComponent_1(tag, omitClose);
    Constructor.prototype.constructor = Constructor;
    return function (props, children) {
        return new Constructor(props, children)
    }
}

// --------------
// `ReactDOM`
// dom和svg元素对应的key，value表示是否是单闭合标签
var ReactDOM = objMapKeyVal_1({
    a: false,
    abbr: false,
    address: false,
    audio: false,
    b: false,
    body: false,
    br: true,
    button: false,
    code: false,
    col: true,
    colgroup: false,
    dd: false,
    div: false,
    section: false,
    dl: false,
    dt: false,
    em: false,
    embed: true,
    fieldset: false,
    footer: false,
    form: false,
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
    header: false,
    hr: true,
    i: false,
    iframe: false,
    img: true,
    input: true,
    label: false,
    legend: false,
    li: false,
    line: false,
    nav: false,
    object: false,
    ol: false,
    optgroup: false,
    option: false,
    p: false,
    param: true,
    pre: false,
    select: false,
    small: false,
    source: false,
    span: false,
    sub: false,
    sup: false,
    strong: false,
    table: false,
    tbody: false,
    td: false,
    textarea: false,
    tfoot: false,
    th: false,
    thead: false,
    time: false,
    title: false,
    tr: false,
    u: false,
    ul: false,
    video: false,
    wbr: false,
    circle: false,
    g: false,
    path: false,
    polyline: false,
    rect: false,
    svg: false,
    text: false
}, createDOMComponentClass);
var injection = {

    // --------------
    // `injectComponentClasses`
    // 把`componentClasses`合并到`ReactDOM`中
    injectComponentClasses: function (componentClasses) {
        mergeInto_1(ReactDOM, componentClasses)
    }
};
ReactDOM.injection = injection;
var ReactDOM_1 = ReactDOM;
var form = ReactDOM_1.form;

// --------------
// `ReactDOMForm`
// 创建了一个Rt的`component`的构造函数
var ReactDOMForm = ReactCompositeComponent_1.createClass({
    render: function () {
        return this.transferPropsTo(form(null, this.props.children))
    },
    componentDidMount: function (node) {
        ReactEvent_1.trapBubbledEvent(EventConstants_1.topLevelTypes.topSubmit, 'submit', node)
    }
});
var ReactDOMForm_1 = ReactDOMForm;

// --------------
// `deleteAllListeners`
// `injection$1.EventPluginOrder`的属性
var DefaultEventPluginOrder = [keyOf_1({
    ResponderEventPlugin: null
}), keyOf_1({
    SimpleEventPlugin: null
}), keyOf_1({
    TapEventPlugin: null
}), keyOf_1({
    EnterLeaveEventPlugin: null
}), keyOf_1({
    AnalyticsEventPlugin: null
})];
var DefaultEventPluginOrder_1 = DefaultEventPluginOrder;

// --------------
// `topLevelTypes$1`
// 顶部事件类型topXXX
var topLevelTypes$1 = EventConstants_1.topLevelTypes;
var getFirstReactDOM = ReactInstanceHandles_1.getFirstReactDOM;

// --------------
// `abstractEventTypes$1`
// 当顶部事件触发解析时，用来解析`onMouseEnter`和`onMouseLeave`的对象
var abstractEventTypes = {
    mouseEnter: {
        registrationName: keyOf_1({
            onMouseEnter: null
        })
    },
    mouseLeave: {
        registrationName: keyOf_1({
            onMouseLeave: null
        })
    }
};
var extractAbstractEvents = function (topLevelType, nativeEvent, renderedTargetID, renderedTarget) {
    if (topLevelType === topLevelTypes$1.topMouseOver && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
        return
    }
    if (topLevelType !== topLevelTypes$1.topMouseOut && topLevelType !== topLevelTypes$1.topMouseOver) {
        return null
    }
    var to, from;
    if (topLevelType === topLevelTypes$1.topMouseOut) {
        to = getFirstReactDOM(nativeEvent.relatedTarget || nativeEvent.toElement) || ExecutionEnvironment_1.global;
        from = renderedTarget
    } else {
        to = renderedTarget;
        from = ExecutionEnvironment_1.global
    }
    if (from === to) {
        return
    }
    var fromID = from ? getDOMNodeID_1(from) : '';
    var toID = to ? getDOMNodeID_1(to) : '';
    var leave = AbstractEvent_1.getPooled(abstractEventTypes.mouseLeave, fromID, topLevelType, nativeEvent);
    var enter = AbstractEvent_1.getPooled(abstractEventTypes.mouseEnter, toID, topLevelType, nativeEvent);
    EventPropagators_1.accumulateEnterLeaveDispatches(leave, enter, fromID, toID);
    return [leave, enter]
};
var EnterLeaveEventPlugin = {
    abstractEventTypes: abstractEventTypes,
    extractAbstractEvents: extractAbstractEvents
};
var EnterLeaveEventPlugin_1 = EnterLeaveEventPlugin;
var topLevelTypes = EventConstants_1.topLevelTypes;
var SimpleEventPlugin = {
    abstractEventTypes: {
        mouseDown: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onMouseDown: true
                }),
                captured: keyOf_1({
                    onMouseDownCapture: true
                })
            }
        },
        mouseUp: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onMouseUp: true
                }),
                captured: keyOf_1({
                    onMouseUpCapture: true
                })
            }
        },
        mouseMove: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onMouseMove: true
                }),
                captured: keyOf_1({
                    onMouseMoveCapture: true
                })
            }
        },
        doubleClick: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onDoubleClick: true
                }),
                captured: keyOf_1({
                    onDoubleClickCapture: true
                })
            }
        },
        click: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onClick: true
                }),
                captured: keyOf_1({
                    onClickCapture: true
                })
            }
        },
        mouseWheel: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onMouseWheel: true
                }),
                captured: keyOf_1({
                    onMouseWheelCapture: true
                })
            }
        },
        touchStart: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onTouchStart: true
                }),
                captured: keyOf_1({
                    onTouchStartCapture: true
                })
            }
        },
        touchEnd: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onTouchEnd: true
                }),
                captured: keyOf_1({
                    onTouchEndCapture: true
                })
            }
        },
        touchCancel: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onTouchCancel: true
                }),
                captured: keyOf_1({
                    onTouchCancelCapture: true
                })
            }
        },
        touchMove: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onTouchMove: true
                }),
                captured: keyOf_1({
                    onTouchMoveCapture: true
                })
            }
        },
        keyUp: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onKeyUp: true
                }),
                captured: keyOf_1({
                    onKeyUpCapture: true
                })
            }
        },
        keyPress: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onKeyPress: true
                }),
                captured: keyOf_1({
                    onKeyPressCapture: true
                })
            }
        },
        keyDown: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onKeyDown: true
                }),
                captured: keyOf_1({
                    onKeyDownCapture: true
                })
            }
        },
        focus: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onFocus: true
                }),
                captured: keyOf_1({
                    onFocusCapture: true
                })
            }
        },
        blur: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onBlur: true
                }),
                captured: keyOf_1({
                    onBlurCapture: true
                })
            }
        },
        scroll: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onScroll: true
                }),
                captured: keyOf_1({
                    onScrollCapture: true
                })
            }
        },
        change: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onChange: true
                }),
                captured: keyOf_1({
                    onChangeCapture: true
                })
            }
        },
        submit: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onSubmit: true
                }),
                captured: keyOf_1({
                    onSubmitCapture: true
                })
            }
        },
        DOMCharacterDataModified: {
            phasedRegistrationNames: {
                bubbled: keyOf_1({
                    onDOMCharacterDataModified: true
                }),
                captured: keyOf_1({
                    onDOMCharacterDataModifiedCapture: true
                })
            }
        }
    },
    executeDispatch: function (abstractEvent, listener, domID) {
        var returnValue = listener(abstractEvent, domID);
        if (returnValue === false) {
            abstractEvent.stopPropagation();
            abstractEvent.preventDefault()
        }
    },
    extractAbstractEvents: function (topLevelType, nativeEvent, renderedTargetID, renderedTarget) {
        var data;
        var abstractEventType = SimpleEventPlugin.topLevelTypesToAbstract[topLevelType];
        if (!abstractEventType) {
            return null
        }
        switch (topLevelType) {
            case topLevelTypes.topMouseWheel:
                data = AbstractEvent_1.normalizeMouseWheelData(nativeEvent);
                break;
            case topLevelTypes.topScroll:
                data = AbstractEvent_1.normalizeScrollDataFromTarget(renderedTarget);
                break;
            case topLevelTypes.topClick:
            case topLevelTypes.topDoubleClick:
            case topLevelTypes.topChange:
            case topLevelTypes.topDOMCharacterDataModified:
            case topLevelTypes.topMouseDown:
            case topLevelTypes.topMouseUp:
            case topLevelTypes.topMouseMove:
            case topLevelTypes.topTouchMove:
            case topLevelTypes.topTouchStart:
            case topLevelTypes.topTouchEnd:
                data = AbstractEvent_1.normalizePointerData(nativeEvent);
                break;
            default:
                data = null
        }
        var abstractEvent = AbstractEvent_1.getPooled(abstractEventType, renderedTargetID, topLevelType, nativeEvent, data);
        EventPropagators_1.accumulateTwoPhaseDispatches(abstractEvent);
        return abstractEvent
    }
};
SimpleEventPlugin.topLevelTypesToAbstract = {
    topMouseDown: SimpleEventPlugin.abstractEventTypes.mouseDown,
    topMouseUp: SimpleEventPlugin.abstractEventTypes.mouseUp,
    topMouseMove: SimpleEventPlugin.abstractEventTypes.mouseMove,
    topClick: SimpleEventPlugin.abstractEventTypes.click,
    topDoubleClick: SimpleEventPlugin.abstractEventTypes.doubleClick,
    topMouseWheel: SimpleEventPlugin.abstractEventTypes.mouseWheel,
    topTouchStart: SimpleEventPlugin.abstractEventTypes.touchStart,
    topTouchEnd: SimpleEventPlugin.abstractEventTypes.touchEnd,
    topTouchMove: SimpleEventPlugin.abstractEventTypes.touchMove,
    topTouchCancel: SimpleEventPlugin.abstractEventTypes.touchCancel,
    topKeyUp: SimpleEventPlugin.abstractEventTypes.keyUp,
    topKeyPress: SimpleEventPlugin.abstractEventTypes.keyPress,
    topKeyDown: SimpleEventPlugin.abstractEventTypes.keyDown,
    topFocus: SimpleEventPlugin.abstractEventTypes.focus,
    topBlur: SimpleEventPlugin.abstractEventTypes.blur,
    topScroll: SimpleEventPlugin.abstractEventTypes.scroll,
    topChange: SimpleEventPlugin.abstractEventTypes.change,
    topSubmit: SimpleEventPlugin.abstractEventTypes.submit,
    topDOMCharacterDataModified: SimpleEventPlugin.abstractEventTypes.DOMCharacterDataModified
};
var SimpleEventPlugin_1 = SimpleEventPlugin;

function inject() {
    EventPluginHub_1.injection.injectEventPluginOrder(DefaultEventPluginOrder_1);
    EventPluginHub_1.injection.injectInstanceHandle(ReactInstanceHandles_1);
    EventPluginHub_1.injection.injectEventPluginsByName({
        'SimpleEventPlugin': SimpleEventPlugin_1,
        'EnterLeaveEventPlugin': EnterLeaveEventPlugin_1
    });
    ReactDOM_1.injection.injectComponentClasses({
        form: ReactDOMForm_1
    })
}
var ReactDefaultInjection = {
    inject: inject
};
ReactDefaultInjection.inject();
var React = {
    DOM: ReactDOM_1,
    initializeTouchEvents: function (shouldUseTouch) {
        ReactMount_1.useTouchEvents = shouldUseTouch
    },
    autoBind: ReactCompositeComponent_1.autoBind,
    createClass: ReactCompositeComponent_1.createClass,
    createComponentRenderer: ReactMount_1.createComponentRenderer,
    constructAndRenderComponent: ReactMount_1.constructAndRenderComponent,
    constructAndRenderComponentByID: ReactMount_1.constructAndRenderComponentByID,
    renderComponent: ReactMount_1.renderComponent,
    unmountAndReleaseReactRootNode: ReactMount_1.unmountAndReleaseReactRootNode,
    isValidComponent: ReactComponent_1.isValidComponent
};
var React_1 = React;
window.React = React;