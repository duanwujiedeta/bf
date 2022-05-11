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
