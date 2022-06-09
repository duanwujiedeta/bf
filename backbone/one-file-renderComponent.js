'use strict';
var __DEV__ = true;
var canUseDOM = typeof window !== 'undefined';
var ExecutionEnvironment = {
    canUseDOM: canUseDOM,
    canUseWorkers: typeof Worker !== 'undefined',
    isInWorker: !canUseDOM,
    global: new Function('return this;')()
};
var ExecutionEnvironment_1 = ExecutionEnvironment;
var ReactCurrentOwner = {
    current: null
};
var ReactCurrentOwner_1 = ReactCurrentOwner;
var isNumber = {
    fillOpacity: true,
    fontWeight: true,
    opacity: true,
    orphans: true,
    textDecoration: true,
    zIndex: true,
    zoom: true
};
var CSSProperty = {
    isNumber: isNumber
};
var CSSProperty_1 = CSSProperty;

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
var throwIf = function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
};
var throwIf_1 = throwIf;
var ESCAPE_TYPE_ERR;
if (__DEV__) {
    ESCAPE_TYPE_ERR = 'The React core has attempted to escape content that is of a mysterious type (object etc) Escaping only works on numbers and strings'
}
var ESCAPE_LOOKUP = {
    "&": "&amp;",
    ">": "&gt;",
    "<": "&lt;",
    "\"": "&quot;",
    "'": "&#x27;",
    "/": "&#x2f;"
};

function escaper(match) {
    return ESCAPE_LOOKUP[match]
}
var escapeTextForBrowser = function(text) {
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
var _uppercasePattern = /([A-Z])/g;

function hyphenate(string) {
    return string.replace(_uppercasePattern, '-$1').toLowerCase()
}
var hyphenate_1 = hyphenate;

function memoizeStringOnly(callback) {
    var cache = {};
    return function(string) {
        if (cache.hasOwnProperty(string)) {
            return cache[string]
        } else {
            return cache[string] = callback.call(this, string)
        }
    }
}
var memoizeStringOnly_1 = memoizeStringOnly;
var processStyleName = memoizeStringOnly_1(function(styleName) {
    return escapeTextForBrowser_1(hyphenate_1(styleName))
});
var CSSPropertyOperations = {
    createMarkupForStyles: function(styles) {
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
    setValueForStyles: function(node, styles) {
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
    validateMarkupParams = function(parentNode, markup) {
        throwIf_1(!ExecutionEnvironment_1.canUseDOM, DOM_UNSUPPORTED);
        throwIf_1(!parentNode || !parentNode.tagName, NO_MARKUP_PARENT);
        throwIf_1(!markup, NO_MULTI_MARKUP);
    }
}
var dummies = {};

function getParentDummy(parent) {
    var parentTag = parent.tagName;
    return dummies[parentTag] || (dummies[parentTag] = document.createElement(parentTag))
}

function insertNodeAfterNode(elem, insert, after) {
    if (__DEV__) {
        throwIf_1(!ExecutionEnvironment_1.canUseDOM, DOM_UNSUPPORTED);
    }
    if (after) {
        if (after.nextSibling) {
            return elem.insertBefore(insert, after.nextSibling)
        } else {
            return elem.appendChild(insert)
        }
    } else {
        return elem.insertBefore(insert, elem.firstChild)
    }
}

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

function dangerouslyInsertMarkupAt(parentNode, markup, index) {
    if (__DEV__) {
        validateMarkupParams(parentNode, markup)
    }
    var parentDummy = getParentDummy(parentNode);
    parentDummy.innerHTML = markup;
    var htmlCollection = parentDummy.childNodes;
    var afterNode = index ? parentNode.childNodes[index - 1] : null;
    inefficientlyInsertHTMLCollectionAfter(parentNode, htmlCollection, afterNode)
}

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
var Danger = {
    dangerouslyInsertMarkupAt: dangerouslyInsertMarkupAt,
    dangerouslyReplaceNodeWithMarkup: dangerouslyReplaceNodeWithMarkup
};
var Danger_1 = Danger;

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
var keyOf = function(oneKeyObj) {
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
var NON_INCREASING_OPERATIONS;
if (__DEV__) {
    NON_INCREASING_OPERATIONS = 'DOM child management operations must be provided in order of increasing destination index. This is likely an issue with the core framework.'
}
var MOVE_NODE_AT_ORIG_INDEX = keyOf_1({
    moveFrom: null
});
var INSERT_MARKUP = keyOf_1({
    insertMarkup: null
});
var REMOVE_AT = keyOf_1({
    removeAt: null
});
var _getNodesByOriginalIndex = function(parent, childOperations) {
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
var _removeChildrenByOriginalIndex = function(parent, nodesByOriginalIndex) {
    for (var j = 0; j < nodesByOriginalIndex.length; j++) {
        var nodeToRemove = nodesByOriginalIndex[j];
        if (nodeToRemove) {
            parent.removeChild(nodesByOriginalIndex[j])
        }
    }
};
var _placeNodesAtDestination = function(parent, childOperations, nodesByOriginalIndex) {
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
var manageChildren = function(parent, childOperations) {
    var nodesByOriginalIndex = _getNodesByOriginalIndex(parent, childOperations);
    if (nodesByOriginalIndex) {
        _removeChildrenByOriginalIndex(parent, nodesByOriginalIndex)
    }
    _placeNodesAtDestination(parent, childOperations, nodesByOriginalIndex)
};
var setTextNodeValueAtIndex = function(parent, index, val) {
    parent.childNodes[index].nodeValue = val
};
var DOMChildrenOperations = {
    dangerouslyReplaceNodeWithMarkup: Danger_1.dangerouslyReplaceNodeWithMarkup,
    manageChildren: manageChildren,
    setTextNodeValueAtIndex: setTextNodeValueAtIndex
};
var DOMChildrenOperations_1 = DOMChildrenOperations;

function createCommonjsModule(fn) {
    var module = {
        exports: {}
    };
    return fn(module, module.exports), module.exports
}
var invariant_1 = createCommonjsModule(function(module) {
    function invariant(condition) {
        if (!condition) {
            throw new Error('Invariant Violation');
        }
    }
    module.exports = invariant;
    if (__DEV__) {
        var invariantDev = function(condition, format, a, b, c, d, e, f) {
            if (format === undefined) {
                throw new Error('invariant requires an error message argument');
            }
            if (!condition) {
                var args = [a, b, c, d, e, f];
                var argIndex = 0;
                throw new Error('Invariant Violation: ' + format.replace(/%s/g, function() {
                    return args[argIndex++];
                }))
            }
        };
        module.exports = invariantDev
    }
});
var DOMProperty = {
    isStandardName: {},
    getAttributeName: {},
    getPropertyName: {},
    getMutationMethod: {},
    mustUseAttribute: {},
    mustUseProperty: {},
    hasBooleanValue: {},
    hasSideEffects: {},
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
    className: function(node, value) {
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
var processAttributeNameAndPrefix = memoizeStringOnly_1(function(name) {
    return escapeTextForBrowser_1(name) + '="'
});
var DOMPropertyOperations = {
    createMarkupForProperty: function(name, value) {
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
    setValueForProperty: function(node, name, value) {
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
var BrowserEnv = {
    currentScrollLeft: 0,
    currentScrollTop: 0,
    browserInfo: null,
    refreshAuthoritativeScrollValues: function() {
        BrowserEnv.currentScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
        BrowserEnv.currentScrollTop = document.body.scrollTop + document.documentElement.scrollTop
    }
};
var BrowserEnv_1 = BrowserEnv;
var NOT_OBJECT_ERROR = 'NOT_OBJECT_ERROR';
if (__DEV__) {
    NOT_OBJECT_ERROR = 'keyMirror only works on objects'
}
var keyMirror = function(obj) {
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
var PropagationPhases$1 = keyMirror_1({
    bubbled: null,
    captured: null
});
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
var oneArgumentPooler = function(copyFieldsFrom) {
    var Klass = this;
    if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, copyFieldsFrom);
        return instance
    } else {
        return new Klass(copyFieldsFrom)
    }
};
var twoArgumentPooler = function(a1, a2) {
    var Klass = this;
    if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2);
        return instance
    } else {
        return new Klass(a1, a2)
    }
};
var fiveArgumentPooler = function(a1, a2, a3, a4, a5) {
    var Klass = this;
    if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2, a3, a4, a5);
        return instance
    } else {
        return new Klass(a1, a2, a3, a4, a5)
    }
};
var standardReleaser = function(instance) {
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
var addPoolingTo = function(CopyConstructor, pooler) {
    var NewKlass = CopyConstructor;
    NewKlass.instancePool = [];
    NewKlass.getPooled = pooler || DEFAULT_POOLER;
    if (!NewKlass.poolSize) {
        NewKlass.poolSize = DEFAULT_POOL_SIZE
    }
    NewKlass.release = standardReleaser;
    return NewKlass
};
var PooledClass = {
    addPoolingTo: addPoolingTo,
    oneArgumentPooler: oneArgumentPooler,
    twoArgumentPooler: twoArgumentPooler,
    fiveArgumentPooler: fiveArgumentPooler
};
var PooledClass_1 = PooledClass;
var TouchEventUtils = {
    extractSingleTouch: function(nativeEvent) {
        var touches = nativeEvent.touches;
        var changedTouches = nativeEvent.changedTouches;
        var hasTouches = touches && touches.length > 0;
        var hasChangedTouches = changedTouches && changedTouches.length > 0;
        return !hasTouches && hasChangedTouches ? changedTouches[0] : hasTouches ? touches[0] : nativeEvent
    }
};
var TouchEventUtils_1 = TouchEventUtils;
var CLONE_TYPE_ERR;
if (__DEV__) {
    CLONE_TYPE_ERR = 'You may only clone instances of AbstractEvent for persistent references. Check yourself.'
}
var MAX_POOL_SIZE = 20;

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
AbstractEvent.prototype.destructor = function() {
    this.target = null;
    this._dispatchListeners = null;
    this._dispatchIDs = null
};
PooledClass_1.addPoolingTo(AbstractEvent, PooledClass_1.fiveArgumentPooler);
AbstractEvent.prototype.stopPropagation = function() {
    this.isPropagationStopped = true;
    if (this.nativeEvent.stopPropagation) {
        this.nativeEvent.stopPropagation()
    }
    this.nativeEvent.cancelBubble = true
};
AbstractEvent.prototype.preventDefault = function() {
    AbstractEvent.preventDefaultOnNativeEvent(this.nativeEvent)
};
AbstractEvent.preventDefaultOnNativeEvent = function(nativeEvent) {
    if (nativeEvent.preventDefault) {
        nativeEvent.preventDefault()
    } else {
        nativeEvent.returnValue = false
    }
};
AbstractEvent.normalizeScrollDataFromTarget = function(target) {
    return {
        scrollTop: target.scrollTop,
        scrollLeft: target.scrollLeft,
        clientWidth: target.clientWidth,
        clientHeight: target.clientHeight,
        scrollHeight: target.scrollHeight,
        scrollWidth: target.scrollWidth
    }
};
AbstractEvent.normalizeMouseWheelData = function(nativeEvent) {
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
AbstractEvent.isNativeClickEventRightClick = function(nativeEvent) {
    return nativeEvent.which ? nativeEvent.which === 3 : nativeEvent.button ? nativeEvent.button === 2 : false
};
AbstractEvent.normalizePointerData = function(nativeEvent) {
    return {
        globalX: AbstractEvent.eventPageX(nativeEvent),
        globalY: AbstractEvent.eventPageY(nativeEvent),
        rightMouseButton: AbstractEvent.isNativeClickEventRightClick(nativeEvent)
    }
};
AbstractEvent.normalizeDragEventData = function(nativeEvent, globalX, globalY, startX, startY) {
    return {
        globalX: globalX,
        globalY: globalY,
        startX: startX,
        startY: startY
    }
};
AbstractEvent.eventPageY = function(nativeEvent) {
    var singleTouch = TouchEventUtils_1.extractSingleTouch(nativeEvent);
    if (singleTouch) {
        return singleTouch.pageY
    } else if (typeof nativeEvent.pageY !== 'undefined') {
        return nativeEvent.pageY
    } else {
        return nativeEvent.clientY + BrowserEnv_1.currentPageScrollTop
    }
};
AbstractEvent.eventPageX = function(nativeEvent) {
    var singleTouch = TouchEventUtils_1.extractSingleTouch(nativeEvent);
    if (singleTouch) {
        return singleTouch.pageX
    } else if (typeof nativeEvent.pageX !== 'undefined') {
        return nativeEvent.pageX
    } else {
        return nativeEvent.clientX + BrowserEnv_1.currentPageScrollLeft
    }
};
AbstractEvent.persistentCloneOf = function(abstractEvent) {
    if (__DEV__) {
        throwIf_1(!(abstractEvent instanceof AbstractEvent), CLONE_TYPE_ERR);
    }
    return new AbstractEvent(abstractEvent.type, abstractEvent.abstractTargetID, abstractEvent.originatingTopLevelEventType, abstractEvent.nativeEvent, abstractEvent.data, abstractEvent.target)
};
var AbstractEvent_1 = AbstractEvent;
var listenerBank = {};
var CallbackRegistry = {
    putListener: function(id, registrationName, listener) {
        var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
        bankForRegistrationName[id] = listener
    },
    getListener: function(id, registrationName) {
        var bankForRegistrationName = listenerBank[registrationName];
        return bankForRegistrationName && bankForRegistrationName[id]
    },
    deleteListener: function(id, registrationName) {
        var bankForRegistrationName = listenerBank[registrationName];
        if (bankForRegistrationName) {
            delete bankForRegistrationName[id]
        }
    },
    __purge: function() {
        listenerBank = {}
    }
};
var CallbackRegistry_1 = CallbackRegistry;
var topLevelTypes$3 = EventConstants_1.topLevelTypes;

function isEndish(topLevelType) {
    return topLevelType === topLevelTypes$3.topMouseUp || topLevelType === topLevelTypes$3.topTouchEnd || topLevelType === topLevelTypes$3.topTouchCancel
}

function isMoveish(topLevelType) {
    return topLevelType === topLevelTypes$3.topMouseMove || topLevelType === topLevelTypes$3.topTouchMove
}

function isStartish(topLevelType) {
    return topLevelType === topLevelTypes$3.topMouseDown || topLevelType === topLevelTypes$3.topTouchStart
}

function storePageCoordsIn(obj, nativeEvent) {
    var pageX = AbstractEvent_1.eventPageX(nativeEvent);
    var pageY = AbstractEvent_1.eventPageY(nativeEvent);
    obj.pageX = pageX;
    obj.pageY = pageY
}

function eventDistance(coords, nativeEvent) {
    var pageX = AbstractEvent_1.eventPageX(nativeEvent);
    var pageY = AbstractEvent_1.eventPageY(nativeEvent);
    return Math.pow(Math.pow(pageX - coords.pageX, 2) + Math.pow(pageY - coords.pageY, 2), 0.5)
}
var validateEventDispatches;
if (__DEV__) {
    validateEventDispatches = function(abstractEvent) {
        var dispatchListeners = abstractEvent._dispatchListeners;
        var dispatchIDs = abstractEvent._dispatchIDs;
        var listenersIsArr = Array.isArray(dispatchListeners);
        var idsIsArr = Array.isArray(dispatchIDs);
        var IDsLen = idsIsArr ? dispatchIDs.length : dispatchIDs ? 1 : 0;
        var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;
        invariant_1(idsIsArr === listenersIsArr && IDsLen === listenersLen, 'EventPluginUtils: Invalid `abstractEvent`.')
    }
}

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

function executeDispatch(abstractEvent, listener, domID) {
    listener(abstractEvent, domID)
}

function executeDispatchesInOrder(abstractEvent, executeDispatch) {
    forEachEventDispatch(abstractEvent, executeDispatch);
    abstractEvent._dispatchListeners = null;
    abstractEvent._dispatchIDs = null
}

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

function hasDispatches(abstractEvent) {
    return !!abstractEvent._dispatchListeners
}
var EventPluginUtils = {
    isEndish: isEndish,
    isMoveish: isMoveish,
    isStartish: isStartish,
    storePageCoordsIn: storePageCoordsIn,
    eventDistance: eventDistance,
    executeDispatchesInOrder: executeDispatchesInOrder,
    executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
    executeDirectDispatch: executeDirectDispatch,
    hasDispatches: hasDispatches,
    executeDispatch: executeDispatch
};
var EventPluginUtils_1 = EventPluginUtils;
var INVALID_ARGS = 'INVALID_ACCUM_ARGS';
if (__DEV__) {
    INVALID_ARGS = 'accumulate requires non empty (non-null, defined) next values. All arrays accumulated must not contain any empty items.'
}

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
var forEachAccumulated = function(arr, cb, scope) {
    if (Array.isArray(arr)) {
        arr.forEach(cb, scope)
    } else if (arr) {
        cb.call(scope, arr)
    }
};
var forEachAccumulated_1 = forEachAccumulated;
var getListener = CallbackRegistry_1.getListener;
var PropagationPhases = EventConstants_1.PropagationPhases;
var injection$2 = {
    InstanceHandle: null,
    injectInstanceHandle: function(InjectedInstanceHandle) {
        injection$2.InstanceHandle = InjectedInstanceHandle;
        if (__DEV__) {
            injection$2.validate()
        }
    },
    validate: function() {
        var invalid = !injection$2.InstanceHandle || !injection$2.InstanceHandle.traverseTwoPhase || !injection$2.InstanceHandle.traverseEnterLeave;
        if (invalid) {
            throw new Error('InstanceHandle not injected before use!');
        }
    }
};

function listenerAtPhase(id, abstractEvent, propagationPhase) {
    var registrationName = abstractEvent.type.phasedRegistrationNames[propagationPhase];
    return getListener(id, registrationName)
}

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

function accumulateTwoPhaseDispatchesSingle(abstractEvent) {
    if (abstractEvent && abstractEvent.type.phasedRegistrationNames) {
        injection$2.InstanceHandle.traverseTwoPhase(abstractEvent.abstractTargetID, accumulateDirectionalDispatches, abstractEvent)
    }
}

function accumulateDispatches(id, ignoredDirection, abstractEvent) {
    if (abstractEvent && abstractEvent.type.registrationName) {
        var listener = getListener(id, abstractEvent.type.registrationName);
        if (listener) {
            abstractEvent._dispatchListeners = accumulate_1(abstractEvent._dispatchListeners, listener);
            abstractEvent._dispatchIDs = accumulate_1(abstractEvent._dispatchIDs, id)
        }
    }
}

function accumulateDirectDispatchesSingle(abstractEvent) {
    if (abstractEvent && abstractEvent.type.registrationName) {
        accumulateDispatches(abstractEvent.abstractTargetID, null, abstractEvent)
    }
}

function accumulateTwoPhaseDispatches(abstractEvents) {
    if (__DEV__) {
        injection$2.validate()
    }
    forEachAccumulated_1(abstractEvents, accumulateTwoPhaseDispatchesSingle)
}

function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
    if (__DEV__) {
        injection$2.validate()
    }
    injection$2.InstanceHandle.traverseEnterLeave(fromID, toID, accumulateDispatches, leave, enter)
}

function accumulateDirectDispatches(abstractEvents) {
    if (__DEV__) {
        injection$2.validate()
    }
    forEachAccumulated_1(abstractEvents, accumulateDirectDispatchesSingle)
}
var EventPropagators = {
    accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
    accumulateDirectDispatches: accumulateDirectDispatches,
    accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches,
    injection: injection$2
};
var EventPropagators_1 = EventPropagators;
var MAX_MERGE_DEPTH = 36;
var ERRORS$1 = keyMirror_1({
    MERGE_ARRAY_FAIL: null,
    MERGE_CORE_FAILURE: null,
    MERGE_TYPE_USAGE_FAILURE: null,
    MERGE_DEEP_MAX_LEVELS: null,
    MERGE_DEEP_NO_ARR_STRATEGY: null
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
var isTerminal = function(o) {
    return typeof o !== 'object' || o === null
};
var mergeHelpers = {
    MAX_MERGE_DEPTH: MAX_MERGE_DEPTH,
    isTerminal: isTerminal,
    normalizeMergeArg: function(arg) {
        return arg === undefined || arg === null ? {} : arg
    },
    checkMergeArrayArgs: function(one, two) {
        throwIf_1(!Array.isArray(one) || !Array.isArray(two), ERRORS$1.MERGE_CORE_FAILURE);
    },
    checkMergeObjectArgs: function(one, two) {
        mergeHelpers.checkMergeObjectArg(one);
        mergeHelpers.checkMergeObjectArg(two)
    },
    checkMergeObjectArg: function(arg) {
        throwIf_1(isTerminal(arg) || Array.isArray(arg), ERRORS$1.MERGE_CORE_FAILURE);
    },
    checkMergeLevel: function(level) {
        throwIf_1(level >= MAX_MERGE_DEPTH, ERRORS$1.MERGE_DEEP_MAX_LEVELS);
    },
    checkArrayStrategy: function(strategy) {
        throwIf_1(strategy !== undefined && !(strategy in mergeHelpers.ArrayStrategies), ERRORS$1.MERGE_DEEP_NO_ARR_STRATEGY);
    },
    ArrayStrategies: keyMirror_1({
        Clobber: true,
        IndexByIndex: true
    }),
    ERRORS: ERRORS$1
};
var mergeHelpers_1 = mergeHelpers;
var checkMergeObjectArg = mergeHelpers_1.checkMergeObjectArg;

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
var merge = function(one, two) {
    var result = {};
    mergeInto_1(result, one);
    mergeInto_1(result, two);
    return result
};
var merge_1 = merge;
var deleteListener = CallbackRegistry_1.deleteListener;
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
var injection$1 = {
    injectInstanceHandle: function(InjectedInstanceHandle) {
        EventPropagators_1.injection.injectInstanceHandle(InjectedInstanceHandle)
    },
    EventPluginOrder: null,
    injectEventPluginOrder: function(InjectedEventPluginOrder) {
        injection$1.EventPluginOrder = InjectedEventPluginOrder;
        injection$1._recomputePluginsList()
    },
    plugins: [],
    injectEventPluginsByName: function(pluginsByName) {
        injection$1.pluginsByName = merge_1(injection$1.pluginsByName, pluginsByName);
        injection$1._recomputePluginsList()
    },
    pluginsByName: {},
    _recomputePluginsList: function() {
        var injectPluginByName = function(name, PluginModule) {
            var pluginIndex = injection$1.EventPluginOrder.indexOf(name);
            throwIf_1(pluginIndex === -1, ERRORS.DEPENDENCY_ERROR + name);
            if (!injection$1.plugins[pluginIndex]) {
                injection$1.plugins[pluginIndex] = PluginModule;
                for (var eventName in PluginModule.abstractEventTypes) {
                    var eventType = PluginModule.abstractEventTypes[eventName];
                    recordAllRegistrationNames(eventType, PluginModule)
                }
            }
        };
        if (injection$1.EventPluginOrder) {
            var injectedPluginsByName = injection$1.pluginsByName;
            for (var name in injectedPluginsByName) {
                injectPluginByName(name, injectedPluginsByName[name])
            }
        }
    }
};
var registrationNames$2 = {};
var registrationNamesArr = [];
var abstractEventQueue = [];

function recordAllRegistrationNames(eventType, PluginModule) {
    var phaseName;
    var phasedRegistrationNames = eventType.phasedRegistrationNames;
    if (phasedRegistrationNames) {
        for (phaseName in phasedRegistrationNames) {
            if (!phasedRegistrationNames.hasOwnProperty(phaseName)) {
                continue
            }
            if (__DEV__) {
                throwIf_1(registrationNames$2[phasedRegistrationNames[phaseName]], ERRORS.DOUBLE_REGISTER);
            }
            registrationNames$2[phasedRegistrationNames[phaseName]] = PluginModule;
            registrationNamesArr.push(phasedRegistrationNames[phaseName])
        }
    } else if (eventType.registrationName) {
        if (__DEV__) {
            throwIf_1(registrationNames$2[eventType.registrationName], ERRORS.DOUBLE_REGISTER);
        }
        registrationNames$2[eventType.registrationName] = PluginModule;
        registrationNamesArr.push(eventType.registrationName)
    }
}

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
var deleteAllListeners = function(domID) {
    var ii;
    for (ii = 0; ii < registrationNamesArr.length; ii++) {
        deleteListener(domID, registrationNamesArr[ii])
    }
};
var extractAbstractEvents$1 = function(topLevelType, nativeEvent, renderedTargetID, renderedTarget) {
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
var enqueueAbstractEvents = function(abstractEvents) {
    if (abstractEvents) {
        abstractEventQueue = accumulate_1(abstractEventQueue, abstractEvents)
    }
};
var executeDispatchesAndRelease = function(abstractEvent) {
    if (abstractEvent) {
        var PluginModule = getPluginModuleForAbstractEvent(abstractEvent);
        var pluginExecuteDispatch = PluginModule && PluginModule.executeDispatch;
        EventPluginUtils_1.executeDispatchesInOrder(abstractEvent, pluginExecuteDispatch || EventPluginUtils_1.executeDispatch);
        AbstractEvent_1.release(abstractEvent)
    }
};
var processAbstractEventQueue = function() {
    var processingAbstractEventQueue = abstractEventQueue;
    abstractEventQueue = null;
    forEachAccumulated_1(processingAbstractEventQueue, executeDispatchesAndRelease);
    if (__DEV__) {
        throwIf_1(abstractEventQueue, ERRORS.DOUBLE_ENQUEUE);
    }
};
var EventPluginHub = {
    registrationNames: registrationNames$2,
    registrationNamesArr: registrationNamesArr,
    putListener: CallbackRegistry_1.putListener,
    getListener: CallbackRegistry_1.getListener,
    deleteAllListeners: deleteAllListeners,
    extractAbstractEvents: extractAbstractEvents$1,
    enqueueAbstractEvents: enqueueAbstractEvents,
    processAbstractEventQueue: processAbstractEventQueue,
    injection: injection$1
};
if (ExecutionEnvironment_1.canUseDOM) {
    window.EventPluginHub = EventPluginHub
}
var EventPluginHub_1 = EventPluginHub;
var EventListener = {
    listen: function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    },
    capture: function(el, handlerBaseName, cb) {
        if (!el.addEventListener) {
            console.error('You are attempting to use addEventlistener in a browser that does not support it support it.This likely means that you will not receive events that your application relies on (such as scroll).');
            return
        } else {
            el.addEventListener(handlerBaseName, cb, true)
        }
    }
};
var EventListener_1 = EventListener;

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

function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
var NormalizedEventListener = {
    listen: function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    },
    capture: function(el, handlerBaseName, cb) {
        EventListener_1.capture(el, handlerBaseName, createNormalizedCallback(cb))
    }
};
var NormalizedEventListener_1 = NormalizedEventListener;
var testNode;
if (ExecutionEnvironment_1.canUseDOM) {
    testNode = document.createElement('div')
}

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
// `渲染dom时触发`，以冒泡的方式来进行事件监听
function trapBubbledEvent(topLevelType, handlerBaseName, onWhat) {
    listen(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}

function trapCapturedEvent(topLevelType, handlerBaseName, onWhat) {
    capture(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}

// --------------
// `registerDocumentScrollListener`
// `渲染dom时触发`，实时记录滚动信息
function registerDocumentScrollListener() {
    listen(window, 'scroll', function(nativeEvent) {
        if (nativeEvent.target === window) {
            BrowserEnv_1.refreshAuthoritativeScrollValues()
        }
    })
}

// --------------
// `registerDocumentScrollListener`
// `渲染dom时触发`，实时记录`window窗口`的尺寸
function registerDocumentResizeListener() {
    listen(window, 'resize', function(nativeEvent) {
        if (nativeEvent.target === window) {
            BrowserEnv_1.refreshAuthoritativeScrollValues()
        }
    })
}

// --------------
// `listenAtTopLevel`
// `渲染dom时触发`，从顶部对整个`document`进行监听
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
    } if (isEventSupported_1('focus', true)) {
        trapCapturedEvent(topLevelTypes$2.topFocus, 'focus', mountAt);
        trapCapturedEvent(topLevelTypes$2.topBlur, 'blur', mountAt)
    } else if (isEventSupported_1('focusin')) {
        trapBubbledEvent(topLevelTypes$2.topFocus, 'focusin', mountAt);
        trapBubbledEvent(topLevelTypes$2.topBlur, 'focusout', mountAt)
    }
}

function handleTopLevel(topLevelType, nativeEvent, renderedTargetID, renderedTarget) {
    var abstractEvents = EventPluginHub_1.extractAbstractEvents(topLevelType, nativeEvent, renderedTargetID, renderedTarget);
    EventPluginHub_1.enqueueAbstractEvents(abstractEvents);
    EventPluginHub_1.processAbstractEventQueue()
}

function setEnabled(enabled) {
    invariant_1(ExecutionEnvironment_1.canUseDOM, 'setEnabled(...): Cannot toggle event listening in a Worker thread. This is likely a bug in the framework. Please report immediately.');
    ReactEvent.TopLevelCallbackCreator.setEnabled(enabled)
}

function isEnabled() {
    return ReactEvent.TopLevelCallbackCreator.isEnabled()
}

// --------------
// `renderComponent`
// `渲染dom时触发`，确保顶部的事件监听到位
function ensureListening(touchNotMouse, TopLevelCallbackCreator) {//ReactEventTopLevelCallback
    invariant_1(ExecutionEnvironment_1.canUseDOM, 'ensureListening(...): Cannot toggle event listening in a Worker thread. This is likely a bug in the framework. Please report immediately.');
    if (!_isListening) {// 监听过之后就不监听了
        ReactEvent.TopLevelCallbackCreator = TopLevelCallbackCreator;
        listenAtTopLevel(touchNotMouse);
        _isListening = true
    }
}
var ReactEvent = {
    TopLevelCallbackCreator: null,
    handleTopLevel: handleTopLevel,
    setEnabled: setEnabled,
    isEnabled: isEnabled,
    ensureListening: ensureListening,
    registrationNames: registrationNames$1,
    putListener: EventPluginHub_1.putListener,
    getListener: EventPluginHub_1.getListener,
    deleteAllListeners: EventPluginHub_1.deleteAllListeners,
    trapBubbledEvent: trapBubbledEvent,
    trapCapturedEvent: trapCapturedEvent
};
var ReactEvent_1 = ReactEvent;

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

function isMarker(id, index) {
    return id.charAt(index) === SEPARATOR || index === id.length
}

function isValidID(id) {
    return id === '' || (id.charAt(0) === SEPARATOR && id.charAt(id.length - 1) !== SEPARATOR)
}

function isRenderedByReact(node) {
    var id = getDOMNodeID_1(node);
    return id && id.charAt(0) === SEPARATOR
}

function parentID(id) {
    return id ? id.substr(0, id.lastIndexOf(SEPARATOR)) : ''
}

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
var ReactInstanceHandles = {
    separator: SEPARATOR,
    getFirstReactDOM: function(node) {
        var current = node;
        while (current && current.parentNode !== current) {
            if (isRenderedByReact(current)) {
                return current
            }
            current = current.parentNode
        }
        return null
    },
    findComponentRoot: function(ancestorNode, id) {
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
    getFirstCommonAncestorID: function(oneID, twoID) {
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
    // `渲染dom时触发`，传入数字生成rt渲染的`dom`的`id`
    getReactRootID: function(mountPointCount) {
        return '.reactRoot[' + mountPointCount + ']'
    },
    getReactRootIDFromNodeID: function(id) {
        var regexResult = /\.reactRoot\[[^\]]+\]/.exec(id);
        return regexResult && regexResult[0]
    },
    traverseEnterLeave: function(leaveID, enterID, cb, upArg, downArg) {
        var longestCommonID = ReactInstanceHandles.getFirstCommonAncestorID(leaveID, enterID);
        if (longestCommonID !== leaveID) {
            traverseParentPath(leaveID, longestCommonID, cb, upArg, false, true)
        }
        if (longestCommonID !== enterID) {
            traverseParentPath(longestCommonID, enterID, cb, downArg, true, false)
        }
    },
    traverseTwoPhase: function(targetID, cb, arg) {
        if (targetID) {
            traverseParentPath('', targetID, cb, arg, true, false);
            traverseParentPath(targetID, '', cb, arg, false, true)
        }
    },
    nextDescendantID: function(ancestorID, destinationID) {
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
var ReactInstanceHandles_1 = ReactInstanceHandles;
var _topLevelListenersEnabled = true;
var ReactEventTopLevelCallback = {
    setEnabled: function(enabled) {
        _topLevelListenersEnabled = !!enabled
    },
    isEnabled: function() {
        return _topLevelListenersEnabled
    },
    createTopLevelCallback: function(topLevelType) {
        return function(fixedNativeEvent) {
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

function ge(arg, root, tag) {
    return typeof arg != 'string' ? arg : !root ? document.getElementById(arg) : _geFromSubtree(arg, root, tag)
}

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

function _getNodeID(node) {
    var id = node.getAttributeNode && node.getAttributeNode('id');
    return id ? id.value : null
}
var ge_1 = ge;

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
var globalMountPointCounter = 0;

// --------------
// `instanceByReactRootID`
// `渲染dom时触发`，根据`id`为key，value为对应的`component`组件
var instanceByReactRootID = {};

// --------------
// `containersByReactRootID`
// `渲染dom时触发`，用于存储要被挂载的`dom`元素
var containersByReactRootID = {};

// --------------
// `getReactRootID`
// `渲染dom时触发`，
function getReactRootID(container) {
    return container.firstChild && container.firstChild.id
}
var ReactMount = {
    totalInstantiationTime: 0,
    totalInjectionTime: 0,
    useTouchEvents: false,
    scrollMonitor: function(container, renderCallback) {
        renderCallback()
    },

    // --------------
    // `prepareTopLevelEvents`
    // `渲染dom时触发`，传入`ReactEventTopLevelCallback`
    prepareTopLevelEvents: function(TopLevelCallbackCreator) {//ReactEventTopLevelCallback
        ReactEvent_1.ensureListening(ReactMount.useTouchEvents, TopLevelCallbackCreator)
    },

    // --------------
    // `renderComponent`
    // `渲染dom时触发`，传入实例化后的组件和`dom`的元素
    renderComponent: function(nextComponent, container) {
        var prevComponent = instanceByReactRootID[getReactRootID(container)];
        if (prevComponent) {
            if (prevComponent.constructor === nextComponent.constructor) {
                var nextProps = nextComponent.props;
                ReactMount.scrollMonitor(container, function() {
                    prevComponent.replaceProps(nextProps)
                });
                return prevComponent
            } else {
                ReactMount.unmountAndReleaseReactRootNode(container)
            }
        }
        ReactMount.prepareTopLevelEvents(ReactEventTopLevelCallback_1);// 顶部的监听的确保
        var reactRootID = ReactMount.registerContainer(container);
        instanceByReactRootID[reactRootID] = nextComponent;
        nextComponent.mountComponentIntoNode(reactRootID, container);
        return nextComponent
    },
    createComponentRenderer: function(component) {
        return function(container) {
            return ReactMount.renderComponent(component, container)
        }
    },
    constructAndRenderComponent: function(constructor, props, container) {
        return ReactMount.renderComponent(constructor(props), container)
    },
    constructAndRenderComponentByID: function(constructor, props, id) {
        return ReactMount.constructAndRenderComponent(constructor, props, $_1(id))
    },

    // --------------
    // `registerContainer`
    // `渲染dom时触发`，返回或生成`id`
    registerContainer: function(container) {
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
    unmountAndReleaseReactRootNode: function(container) {
        var reactRootID = getReactRootID(container);
        var component = instanceByReactRootID[reactRootID];
        component.unmountComponentFromNode(container);
        delete instanceByReactRootID[reactRootID];
        delete containersByReactRootID[reactRootID]
    },
    findReactContainerForID: function(id) {
        var reatRootID = ReactInstanceHandles_1.getReactRootIDFromNodeID(id);
        return containersByReactRootID[reatRootID]
    },
    findReactRenderedDOMNodeSlow: function(id) {
        var reactRoot = ReactMount.findReactContainerForID(id);
        return ReactInstanceHandles_1.findComponentRoot(reactRoot, id)
    }
};
var ReactMount_1 = ReactMount;
var nodeCache = {};
var ReactDOMNodeCache = {
    purgeEntireCache: function() {
        nodeCache = {};
        return nodeCache
    },
    getCachedNodeByID: function(id) {
        return nodeCache[id] || (nodeCache[id] = document.getElementById(id) || ReactMount_1.findReactRenderedDOMNodeSlow(id))
    }
};
var ReactDOMNodeCache_1 = ReactDOMNodeCache;
var contentKey = null;

function getTextContentAccessor() {
    if (!contentKey && ExecutionEnvironment_1.canUseDOM) {
        contentKey = 'innerText' in document.createElement('div') ? 'innerText' : 'textContent'
    }
    return contentKey
}
var getTextContentAccessor_1 = getTextContentAccessor;
var INVALID_PROPERTY_ERRORS = {
    content: '`content` must be set using `updateTextContentByID()`.',
    dangerouslySetInnerHTML: '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
    style: '`style` must be set using `updateStylesByID()`.'
};
var textContentAccessor = getTextContentAccessor_1() || 'NA';
var ReactDOMIDOperations = {
    updatePropertyByID: function(id, name, value) {
        var node = ReactDOMNodeCache_1.getCachedNodeByID(id);
        invariant_1(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name), 'updatePropertyByID(...): %s', INVALID_PROPERTY_ERRORS[name]);
        DOMPropertyOperations_1.setValueForProperty(node, name, value)
    },
    updatePropertiesByID: function(id, properties) {
        for (var name in properties) {
            if (!properties.hasOwnProperty(name)) {
                continue
            }
            ReactDOMIDOperations.updatePropertiesByID(id, name, properties[name])
        }
    },
    updateStylesByID: function(id, styles) {
        var node = ReactDOMNodeCache_1.getCachedNodeByID(id);
        CSSPropertyOperations_1.setValueForStyles(node, styles)
    },
    updateInnerHTMLByID: function(id, html) {
        var node = ReactDOMNodeCache_1.getCachedNodeByID(id);
        node.innerHTML = (html && html.__html || '').replace(/^ /g, '&nbsp;')
    },
    updateTextContentByID: function(id, content) {
        var node = ReactDOMNodeCache_1.getCachedNodeByID(id);
        node[textContentAccessor] = content
    },
    dangerouslyReplaceNodeWithMarkupByID: function(id, markup) {
        var node = ReactDOMNodeCache_1.getCachedNodeByID(id);
        DOMChildrenOperations_1.dangerouslyReplaceNodeWithMarkup(node, markup);
        ReactDOMNodeCache_1.purgeEntireCache()
    },
    manageChildrenByParentID: function(parentID, domOperations) {
        var parent = ReactDOMNodeCache_1.getCachedNodeByID(parentID);
        DOMChildrenOperations_1.manageChildren(parent, domOperations);
        ReactDOMNodeCache_1.purgeEntireCache()
    },
    setTextNodeValueAtIndexByParentID: function(parentID, index, value) {
        var parent = ReactDOMNodeCache_1.getCachedNodeByID(parentID);
        DOMChildrenOperations_1.setTextNodeValueAtIndex(parent, index, value)
    }
};
var ReactDOMIDOperations_1 = ReactDOMIDOperations;
var ReactOwner = {
    isValidOwner: function(object) {
        return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function')
    },
    addComponentAsRefTo: function(component, ref, owner) {
        invariant_1(ReactOwner.isValidOwner(owner), 'addComponentAsRefTo(...): Only a ReactOwner can have refs.');
        owner.attachRef(ref, component)
    },
    removeComponentAsRefFrom: function(component, ref, owner) {
        invariant_1(ReactOwner.isValidOwner(owner), 'removeComponentAsRefFrom(...): Only a ReactOwner can have refs.');
        if (owner.refs[ref] === component) {
            owner.detachRef(ref)
        }
    },
    Mixin: {
        attachRef: function(ref, component) {
            invariant_1(component.isOwnedBy(this), 'attachRef(%s, ...): Only a component\'s owner can store a ref to it.', ref);
            var refs = this.refs || (this.refs = {});
            refs[ref] = component
        },
        detachRef: function(ref) {
            delete this.refs[ref]
        }
    }
};
var ReactOwner_1 = ReactOwner;

function getActiveElement() {
    try {
        return document.activeElement
    } catch (e) {}
}
var ReactInputSelection = {
    hasSelectionCapabilities: function(elem) {
        return elem && ((elem.nodeName === 'INPUT' && elem.type === 'text') || elem.nodeName === 'TEXTAREA' || elem.contentEditable === 'true')
    },
    getSelectionInformation: function() {
        var focusedElem = getActiveElement();
        return {
            focusedElem: focusedElem,
            selectionRange: ReactInputSelection.hasSelectionCapabilities(focusedElem) ? ReactInputSelection.getSelection(focusedElem) : null
        }
    },
    restoreSelection: function(priorSelectionInformation) {
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
    getSelection: function(input) {
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
    setSelection: function(input, rangeObj) {
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
var mixInto = function(constructor, methodBag) {
    var methodName;
    for (methodName in methodBag) {
        if (!methodBag.hasOwnProperty(methodName)) {
            continue
        }
        constructor.prototype[methodName] = methodBag[methodName]
    }
};
var mixInto_1 = mixInto;

function ReactOnDOMReady(initialCollection) {
    this._queue = initialCollection || null
}
mixInto_1(ReactOnDOMReady, {
    enqueue: function(component, callback) {
        this._queue = this._queue || [];
        this._queue.push({
            component: component,
            callback: callback
        })
    },
    notifyAll: function() {
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
    reset: function() {
        this._queue = null
    },
    destructor: function() {
        this.reset()
    }
});
PooledClass_1.addPoolingTo(ReactOnDOMReady);
var ReactOnDOMReady_1 = ReactOnDOMReady;
var DUAL_TRANSACTION = 'DUAL_TRANSACTION';
var MISSING_TRANSACTION = 'MISSING_TRANSACTION';
if (__DEV__) {
    DUAL_TRANSACTION = 'Cannot initialize transaction when there is already an outstanding transaction. Common causes of this are trying to render a component when you are already rendering a component or attempting a state transition while in a render function. Another possibility is that you are rendering new content (or state transitioning) in a componentDidRender callback. If this is not the case, please report the issue immediately.';
    MISSING_TRANSACTION = 'Cannot close transaction when there is none open.'
}
var Mixin$1 = {
    reinitializeTransaction: function() {
        this.transactionWrappers = this.getTransactionWrappers();
        if (!this.wrapperInitData) {
            this.wrapperInitData = []
        } else {
            this.wrapperInitData.length = 0
        } if (!this.timingMetrics) {
            this.timingMetrics = {}
        }
        this.timingMetrics.methodInvocationTime = 0;
        if (!this.timingMetrics.wrapperInitTimes) {
            this.timingMetrics.wrapperInitTimes = []
        } else {
            this.timingMetrics.wrapperInitTimes.length = 0
        } if (!this.timingMetrics.wrapperCloseTimes) {
            this.timingMetrics.wrapperCloseTimes = []
        } else {
            this.timingMetrics.wrapperCloseTimes.length = 0
        }
        this._isInTransaction = false
    },
    _isInTransaction: false,
    getTransactionWrappers: null,
    isInTransaction: function() {
        return !!this._isInTransaction
    },
    perform: function(method, scope, a, b, c, d, e, f) {
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
    initializeAll: function() {
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
    closeAll: function() {
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
var Transaction = {
    Mixin: Mixin$1,
    OBSERVED_ERROR: {}
};
var Transaction_1 = Transaction;
var SELECTION_RESTORATION = {
    initialize: ReactInputSelection_1.getSelectionInformation,
    close: ReactInputSelection_1.restoreSelection
};
var EVENT_SUPPRESSION = {
    initialize: function() {
        var currentlyEnabled = ReactEvent_1.isEnabled();
        ReactEvent_1.setEnabled(false);
        return currentlyEnabled
    },
    close: function(previouslyEnabled) {
        ReactEvent_1.setEnabled(previouslyEnabled)
    }
};
var ON_DOM_READY_QUEUEING = {
    initialize: function() {
        this.reactOnDOMReady.reset()
    },
    close: function() {
        this.reactOnDOMReady.notifyAll()
    }
};
var TRANSACTION_WRAPPERS = [SELECTION_RESTORATION, EVENT_SUPPRESSION, ON_DOM_READY_QUEUEING];

function ReactReconcileTransaction() {
    this.reinitializeTransaction();
    this.reactOnDOMReady = ReactOnDOMReady_1.getPooled(null)
}
var Mixin = {
    getTransactionWrappers: function() {
        if (ExecutionEnvironment_1.canUseDOM) {
            return TRANSACTION_WRAPPERS
        } else {
            return []
        }
    },
    getReactOnDOMReady: function() {
        return this.reactOnDOMReady
    },
    destructor: function() {
        ReactOnDOMReady_1.release(this.reactOnDOMReady);
        this.reactOnDOMReady = null
    }
};
mixInto_1(ReactReconcileTransaction, Transaction_1.Mixin);
mixInto_1(ReactReconcileTransaction, Mixin);
PooledClass_1.addPoolingTo(ReactReconcileTransaction);
var ReactReconcileTransaction_1 = ReactReconcileTransaction;
var OWNER = '{owner}';
var ComponentLifeCycle = keyMirror_1({
    MOUNTED: null,
    UNMOUNTED: null
});
var ReactComponent = {
    isValidComponent: function(object) {
        return !!(object && typeof object.mountComponentIntoNode === 'function' && typeof object.receiveProps === 'function')
    },
    LifeCycle: ComponentLifeCycle,
    DOMIDOperations: ReactDOMIDOperations_1,
    ReactReconcileTransaction: ReactReconcileTransaction_1,
    setDOMOperations: function(DOMIDOperations) {
        ReactComponent.DOMIDOperations = DOMIDOperations
    },
    setReactReconcileTransaction: function(ReactReconcileTransaction) {
        ReactComponent.ReactReconcileTransaction = ReactReconcileTransaction
    },
    Mixin: {
        getDOMNode: function() {
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
        setProps: function(partialProps) {
            this.replaceProps(merge_1(this.props, partialProps))
        },
        replaceProps: function(props) {
            invariant_1(!this.props[OWNER], 'replaceProps(...): You called `setProps` or `replaceProps` on a component with an owner. This is an anti-pattern since props will get reactively updated when rendered. Instead, change the owner\'s `render` method to pass the correct value as props to the component where it is created.');
            var transaction = ReactComponent.ReactReconcileTransaction.getPooled();
            transaction.perform(this.receiveProps, this, props, transaction);
            ReactComponent.ReactReconcileTransaction.release(transaction)
        },
        construct: function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        },
        mountComponent: function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        },
        unmountComponent: function() {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.MOUNTED, 'unmountComponent(): Can only unmount a mounted component.');
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.removeComponentAsRefFrom(this, props.ref, props[OWNER])
            }
            this._rootNode = null;
            this._rootNodeID = null;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        },
        receiveProps: function(nextProps, transaction) {
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
        // `渲染dom时触发`，`rootID`是被挂载的`container`的首位元素的id;`container`是被挂载的`dom`
        mountComponentIntoNode: function(rootID, container) {
            var transaction = ReactComponent.ReactReconcileTransaction.getPooled();
            transaction.perform(this._mountComponentIntoNode, this, rootID, container, transaction);
            ReactComponent.ReactReconcileTransaction.release(transaction)
        },
        _mountComponentIntoNode: function(rootID, container, transaction) {
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
        unmountComponentFromNode: function(container) {
            this.unmountComponent();
            while (container.lastChild) {
                container.removeChild(container.lastChild)
            }
        },
        isOwnedBy: function(owner) {
            return this.props[OWNER] === owner
        }
    }
};

function logDeprecated(msg) {
    if (__DEV__) {
        throw new Error(msg);
    } else {
        console && console.warn && console.warn(msg)
    }
}
ReactComponent.Mixin.update = function(props) {
    logDeprecated('this.update() is deprecated. Use this.setProps()');
    this.setProps(props)
};
ReactComponent.Mixin.updateAll = function(props) {
    logDeprecated('this.updateAll() is deprecated. Use this.replaceProps()');
    this.replaceProps(props)
};
var ReactComponent_1 = ReactComponent;

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

function makeEmptyFunction(arg) {
    return function() {
        return arg
    }
}

function emptyFunction() {}
copyProperties_1(emptyFunction, {
    thatReturns: makeEmptyFunction,
    thatReturnsFalse: makeEmptyFunction(false),
    thatReturnsTrue: makeEmptyFunction(true),
    thatReturnsNull: makeEmptyFunction(null),
    thatReturnsThis: function() {
        return this
    },
    thatReturnsArgument: function(arg) {
        return arg
    },
    mustImplement: function(module, property) {
        return function() {
            if (__DEV__) {
                throw new Error(module + '.' + property + ' must be implemented!');
            }
        }
    }
});
var emptyFunction_1 = emptyFunction;

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

function createTransferStrategy(mergeStrategy) {
    return function(props, key, value) {
        if (!props.hasOwnProperty(key)) {
            props[key] = value
        } else {
            props[key] = mergeStrategy(props[key], value)
        }
    }
}
var TransferStrategies = {
    ref: emptyFunction_1,
    className: createTransferStrategy(joinClasses_1),
    style: createTransferStrategy(merge_1)
};
var ReactPropTransferer = {
    TransferStrategies: TransferStrategies,
    Mixin: {
        transferPropsTo: function(component) {
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
var SpecPolicy = keyMirror_1({
    DEFINE_ONCE: null,
    DEFINE_MANY: null,
    OVERRIDE_BASE: null
});
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
var RESERVED_SPEC_KEYS = {
    displayName: function(Constructor, displayName) {
        Constructor.displayName = displayName
    },
    mixins: function(Constructor, mixins) {
        if (mixins) {
            for (var i = 0; i < mixins.length; i++) {
                mixSpecIntoComponent(Constructor, mixins[i])
            }
        }
    },
    props: function(Constructor, props) {
        Constructor.propDeclarations = props
    }
};

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

function createChainedFunction(one, two) {
    return function chainedFunction(a, b, c, d, e, tooMany) {
        invariant_1(typeof tooMany === 'undefined', 'Chained function can only take a maximum of 5 arguments.');
        one.call(this, a, b, c, d, e);
        two.call(this, a, b, c, d, e)
    }
}
var CompositeLifeCycle = keyMirror_1({
    MOUNTING: null,
    UNMOUNTING: null,
    RECEIVING_PROPS: null,
    RECEIVING_STATE: null
});
var ReactCompositeComponentMixin = {
    construct: function(initialProps, children) {
        ReactComponent_1.Mixin.construct.call(this, initialProps, children);
        this.state = null;
        this._pendingState = null;
        this._compositeLifeCycleState = null
    },
    mountComponent: function(rootID, transaction) {
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
    unmountComponent: function() {
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
    receiveProps: function(nextProps, transaction) {
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
    setState: function(partialState) {
        this.replaceState(merge_1(this._pendingState || this.state, partialState))
    },
    replaceState: function(completeState) {
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
    _receivePropsAndState: function(nextProps, nextState, transaction) {
        if (!this.shouldComponentUpdate || this.shouldComponentUpdate(nextProps, nextState)) {
            this._performComponentUpdate(nextProps, nextState, transaction)
        } else {
            this.props = nextProps;
            this.state = nextState
        }
    },
    _performComponentUpdate: function(nextProps, nextState, transaction) {
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
    updateComponent: function(transaction) {
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
    forceUpdate: function() {
        var transaction = ReactComponent_1.ReactReconcileTransaction.getPooled();
        transaction.perform(this._performComponentUpdate, this, this.props, this.state, transaction);
        ReactComponent_1.ReactReconcileTransaction.release(transaction)
    },
    _renderValidatedComponent: function() {
        ReactCurrentOwner_1.current = this;
        var renderedComponent = this.render();
        ReactCurrentOwner_1.current = null;
        invariant_1(ReactComponent_1.isValidComponent(renderedComponent), '%s.render(): A valid ReactComponent must be returned.', this.constructor.displayName || 'ReactCompositeComponent');
        return renderedComponent
    },
    _assertValidProps: function(props) {
        var propDeclarations = this.constructor.propDeclarations;
        var componentName = this.constructor.displayName;
        for (var propName in propDeclarations) {
            var checkProp = propDeclarations[propName];
            if (checkProp) {
                checkProp(props, propName, componentName)
            }
        }
    },
    _bindAutoBindMethods: function() {
        for (var autoBindKey in this.__reactAutoBindMap) {
            if (!this.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
                continue
            }
            var method = this.__reactAutoBindMap[autoBindKey];
            this[autoBindKey] = this._bindAutoBindMethod(method)
        }
    },
    _bindAutoBindMethod: function(method) {
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
var ReactCompositeComponentBase = function() {};
mixInto_1(ReactCompositeComponentBase, ReactComponent_1.Mixin);
mixInto_1(ReactCompositeComponentBase, ReactOwner_1.Mixin);
mixInto_1(ReactCompositeComponentBase, ReactPropTransferer_1.Mixin);
mixInto_1(ReactCompositeComponentBase, ReactCompositeComponentMixin);
var ReactCompositeComponent = {
    LifeCycle: CompositeLifeCycle,
    Base: ReactCompositeComponentBase,
    createClass: function(spec) {
        var Constructor = function(initialProps, children) {
            this.construct(initialProps, children)
        };
        Constructor.prototype = new ReactCompositeComponentBase();
        Constructor.prototype.constructor = Constructor;
        mixSpecIntoComponent(Constructor, spec);
        invariant_1(Constructor.prototype.render, 'createClass(...): Class specification must implement a `render` method.');
        var ConvenienceConstructor = function(props, children) {
            return new Constructor(props, children)
        };
        ConvenienceConstructor.componentConstructor = Constructor;
        ConvenienceConstructor.originalSpec = spec;
        return ConvenienceConstructor
    },
    autoBind: function(method) {
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
    enqueueMarkupAt: function(markup, insertAt) {
        this.domOperations = this.domOperations || [];
        this.domOperations.push({
            insertMarkup: markup,
            finalIndex: insertAt
        })
    },
    enqueueMove: function(originalIndex, finalIndex) {
        this.domOperations = this.domOperations || [];
        this.domOperations.push({
            moveFrom: originalIndex,
            finalIndex: finalIndex
        })
    },
    enqueueUnmountChildByName: function(name, removeChild) {
        if (ReactComponent_1.isValidComponent(removeChild)) {
            this.domOperations = this.domOperations || [];
            this.domOperations.push({
                removeAt: removeChild._domIndex
            });
            removeChild.unmountComponent && removeChild.unmountComponent();
            delete this._renderedChildren[name]
        }
    },
    processChildDOMOperationsQueue: function() {
        if (this.domOperations) {
            ReactComponent_1.DOMIDOperations.manageChildrenByParentID(this._rootNodeID, this.domOperations);
            this.domOperations = null
        }
    },
    unmountMultiChild: function() {
        var renderedChildren = this._renderedChildren;
        for (var name in renderedChildren) {
            if (renderedChildren.hasOwnProperty(name) && renderedChildren[name]) {
                var renderedChild = renderedChildren[name];
                renderedChild.unmountComponent && renderedChild.unmountComponent()
            }
        }
        this._renderedChildren = null
    },
    mountMultiChild: function(children, transaction) {
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
    updateMultiChild: function(nextChildren, transaction) {
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
var ReactTextComponent = function(initialText) {
    this.construct({
        text: initialText
    })
};
mixInto_1(ReactTextComponent, ReactComponent_1.Mixin);
mixInto_1(ReactTextComponent, {
    mountComponent: function(rootID) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID);
        return ('<span id="' + rootID + '">' + escapeTextForBrowser_1(this.props.text) + '</span>')
    },
    receiveProps: function(nextProps, transaction) {
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
var flattenChildrenImpl = function(res, children, nameSoFar) {
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

function ReactNativeComponent(tag, omitClose) {
    this._tagOpen = '<' + tag + ' ';
    this._tagClose = omitClose ? '' : '</' + tag + '>';
    this.tagName = tag.toUpperCase()
}
ReactNativeComponent.Mixin = {
    mountComponent: function(rootID, transaction) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID, transaction);
        assertValidProps(this.props);
        return (this._createOpenTagMarkup() + this._createContentMarkup(transaction) + this._tagClose)
    },
    _createOpenTagMarkup: function() {
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
    _createContentMarkup: function(transaction) {
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
    receiveProps: function(nextProps, transaction) {
        invariant_1(this._rootNodeID, 'Trying to control a native dom element without a backing id');
        assertValidProps(nextProps);
        ReactComponent_1.Mixin.receiveProps.call(this, nextProps, transaction);
        this._updateDOMProperties(nextProps);
        this._updateDOMChildren(nextProps, transaction);
        this.props = nextProps
    },
    _updateDOMProperties: function(nextProps) {
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
    _updateDOMChildren: function(nextProps, transaction) {
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
    unmountComponent: function() {
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

function createDOMComponentClass(tag, omitClose) {
    var Constructor = function(initialProps, children) {
        this.construct(initialProps, children)
    };
    Constructor.prototype = new ReactNativeComponent_1(tag, omitClose);
    Constructor.prototype.constructor = Constructor;
    return function(props, children) {
        return new Constructor(props, children)
    }
}
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
    injectComponentClasses: function(componentClasses) {
        mergeInto_1(ReactDOM, componentClasses)
    }
};
ReactDOM.injection = injection;
var ReactDOM_1 = ReactDOM;
var form = ReactDOM_1.form;
var ReactDOMForm = ReactCompositeComponent_1.createClass({
    render: function() {
        return this.transferPropsTo(form(null, this.props.children))
    },
    componentDidMount: function(node) {
        ReactEvent_1.trapBubbledEvent(EventConstants_1.topLevelTypes.topSubmit, 'submit', node)
    }
});
var ReactDOMForm_1 = ReactDOMForm;
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
var topLevelTypes$1 = EventConstants_1.topLevelTypes;
var getFirstReactDOM = ReactInstanceHandles_1.getFirstReactDOM;
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
var extractAbstractEvents = function(topLevelType, nativeEvent, renderedTargetID, renderedTarget) {
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
    } if (from === to) {
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
    executeDispatch: function(abstractEvent, listener, domID) {
        var returnValue = listener(abstractEvent, domID);
        if (returnValue === false) {
            abstractEvent.stopPropagation();
            abstractEvent.preventDefault()
        }
    },
    extractAbstractEvents: function(topLevelType, nativeEvent, renderedTargetID, renderedTarget) {
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
    initializeTouchEvents: function(shouldUseTouch) {
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