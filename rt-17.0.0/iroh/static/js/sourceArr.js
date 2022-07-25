//call line:1080   2846
//function line:2598
function(spec) {
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
    }
//function line:2590
function() {}
//call line:2604
//function line:2379
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
//call line:2382
//call line:2387
//call line:2393
//call line:2396
//call line:2397
//function line:2364
function(Constructor, displayName) {
        Constructor.displayName = displayName
    }
//call line:2382
//call line:2387
//call line:2391
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2393
//call line:2396
//call line:2403
//call line:2382
//call line:2387
//call line:2393
//call line:2396
//call line:2403
//call line:2382
//call line:2387
//call line:2393
//call line:2396
//call line:2403
//call line:2382
//call line:2387
//call line:2391
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2393
//call line:2396
//call line:2403
//call line:2605
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//function line:2598
function(spec) {
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
    }
//function line:2590
function() {}
//call line:2604
//function line:2379
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
//call line:2382
//call line:2387
//call line:2393
//call line:2396
//call line:2397
//function line:2364
function(Constructor, displayName) {
        Constructor.displayName = displayName
    }
//call line:2382
//call line:2387
//call line:2391
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2393
//call line:2396
//call line:2403
//call line:2605
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//function line:2598
function(spec) {
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
    }
//function line:2590
function() {}
//call line:2604
//function line:2379
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
//call line:2382
//call line:2387
//call line:2393
//call line:2396
//call line:2397
//function line:2364
function(Constructor, displayName) {
        Constructor.displayName = displayName
    }
//call line:2382
//call line:2387
//call line:2391
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2393
//call line:2396
//call line:2403
//call line:2382
//call line:2387
//call line:2393
//call line:2396
//call line:2403
//call line:2382
//call line:2387
//call line:2393
//call line:2396
//call line:2403
//call line:2382
//call line:2387
//call line:2393
//call line:2396
//call line:2403
//call line:2382
//call line:2387
//call line:2393
//call line:2396
//call line:2403
//call line:2382
//call line:2387
//call line:2393
//call line:2396
//call line:2403
//call line:2382
//call line:2387
//call line:2393
//call line:2396
//call line:2403
//call line:2382
//call line:2387
//call line:2393
//call line:2396
//call line:2403
//call line:2382
//call line:2387
//call line:2391
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2393
//call line:2396
//call line:2403
//call line:2605
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//function line:2606
function(props, children) {
            return new Constructor(props, children)
        }
//function line:2599
function(initialProps, children) {
            this.construct(initialProps, children)
        }
//call line:2600
//function line:2425
function(initialProps, children) {
        ReactComponent_1.Mixin.construct.call(this, initialProps, children);
        this.state = null;
        this._pendingState = null;
        this._compositeLifeCycleState = null
    }
//call line:2426
//function line:2143
function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        }
//function line:1629
function(nextComponent, container) {
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
        ReactMount.prepareTopLevelEvents(ReactEventTopLevelCallback_1);
        var reactRootID = ReactMount.registerContainer(container);
        instanceByReactRootID[reactRootID] = nextComponent;
        nextComponent.mountComponentIntoNode(reactRootID, container);
        return nextComponent
    }
//call line:1630
//function line:1616
function getReactRootID(container) {
    return container.firstChild && container.firstChild.id
}
//call line:1630
//function line:1616
function getReactRootID(container) {
    return container.firstChild && container.firstChild.id
}
//call line:1642
//function line:1626
function(TopLevelCallbackCreator) {
        ReactEvent_1.ensureListening(ReactMount.useTouchEvents, TopLevelCallbackCreator)
    }
//call line:1627
//function line:1392
function ensureListening(touchNotMouse, TopLevelCallbackCreator) {
    invariant_1(ExecutionEnvironment_1.canUseDOM, 'ensureListening(...): Cannot toggle event listening in a Worker thread. This is likely a bug in the framework. Please report immediately.');
    if (!_isListening) {
        ReactEvent.TopLevelCallbackCreator = TopLevelCallbackCreator;
        listenAtTopLevel(touchNotMouse);
        _isListening = true
    }
}
//call line:1393
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:1396
//function line:1339
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
//call line:1340
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:1342
//function line:1323
function registerDocumentScrollListener() {
    listen(window, 'scroll', function(nativeEvent) {
        if (nativeEvent.target === window) {
            BrowserEnv_1.refreshAuthoritativeScrollValues()
        }
    })
}
//call line:1324
//function line:1276
function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1277
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1277
//function line:1240
function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    }
//call line:1242
//call line:1343
//function line:1331
function registerDocumentResizeListener() {
    listen(window, 'resize', function(nativeEvent) {
        if (nativeEvent.target === window) {
            BrowserEnv_1.refreshAuthoritativeScrollValues()
        }
    })
}
//call line:1332
//function line:1276
function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1277
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1277
//function line:1240
function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    }
//call line:1242
//call line:1344
//function line:1315
function trapBubbledEvent(topLevelType, handlerBaseName, onWhat) {
    listen(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1316
//function line:1551
function(topLevelType) {
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
//call line:1316
//function line:1276
function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1277
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1277
//function line:1240
function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    }
//call line:1242
//call line:1345
//function line:1315
function trapBubbledEvent(topLevelType, handlerBaseName, onWhat) {
    listen(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1316
//function line:1551
function(topLevelType) {
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
//call line:1316
//function line:1276
function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1277
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1277
//function line:1240
function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    }
//call line:1242
//call line:1346
//function line:1315
function trapBubbledEvent(topLevelType, handlerBaseName, onWhat) {
    listen(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1316
//function line:1551
function(topLevelType) {
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
//call line:1316
//function line:1276
function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1277
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1277
//function line:1240
function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    }
//call line:1242
//call line:1347
//function line:1315
function trapBubbledEvent(topLevelType, handlerBaseName, onWhat) {
    listen(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1316
//function line:1551
function(topLevelType) {
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
//call line:1316
//function line:1276
function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1277
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1277
//function line:1240
function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    }
//call line:1242
//call line:1348
//function line:1315
function trapBubbledEvent(topLevelType, handlerBaseName, onWhat) {
    listen(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1316
//function line:1551
function(topLevelType) {
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
//call line:1316
//function line:1276
function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1277
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1277
//function line:1240
function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    }
//call line:1242
//call line:1349
//function line:1315
function trapBubbledEvent(topLevelType, handlerBaseName, onWhat) {
    listen(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1316
//function line:1551
function(topLevelType) {
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
//call line:1316
//function line:1276
function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1277
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1277
//function line:1240
function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    }
//call line:1242
//call line:1350
//function line:1315
function trapBubbledEvent(topLevelType, handlerBaseName, onWhat) {
    listen(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1316
//function line:1551
function(topLevelType) {
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
//call line:1316
//function line:1276
function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1277
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1277
//function line:1240
function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    }
//call line:1242
//call line:1351
//function line:1315
function trapBubbledEvent(topLevelType, handlerBaseName, onWhat) {
    listen(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1316
//function line:1551
function(topLevelType) {
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
//call line:1316
//function line:1276
function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1277
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1277
//function line:1240
function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    }
//call line:1242
//call line:1358
//function line:1315
function trapBubbledEvent(topLevelType, handlerBaseName, onWhat) {
    listen(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1316
//function line:1551
function(topLevelType) {
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
//call line:1316
//function line:1276
function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1277
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1277
//function line:1240
function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    }
//call line:1242
//call line:1359
//function line:1315
function trapBubbledEvent(topLevelType, handlerBaseName, onWhat) {
    listen(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1316
//function line:1551
function(topLevelType) {
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
//call line:1316
//function line:1276
function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1277
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1277
//function line:1240
function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    }
//call line:1242
//call line:1360
//function line:1315
function trapBubbledEvent(topLevelType, handlerBaseName, onWhat) {
    listen(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1316
//function line:1551
function(topLevelType) {
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
//call line:1316
//function line:1276
function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1277
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1277
//function line:1240
function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    }
//call line:1242
//call line:1361
//function line:1315
function trapBubbledEvent(topLevelType, handlerBaseName, onWhat) {
    listen(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1316
//function line:1551
function(topLevelType) {
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
//call line:1316
//function line:1276
function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1277
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1277
//function line:1240
function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    }
//call line:1242
//call line:1362
//function line:1315
function trapBubbledEvent(topLevelType, handlerBaseName, onWhat) {
    listen(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1316
//function line:1551
function(topLevelType) {
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
//call line:1316
//function line:1276
function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1277
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1277
//function line:1240
function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    }
//call line:1242
//call line:1363
//function line:1315
function trapBubbledEvent(topLevelType, handlerBaseName, onWhat) {
    listen(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1316
//function line:1551
function(topLevelType) {
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
//call line:1316
//function line:1276
function(el, handlerBaseName, cb) {
        EventListener_1.listen(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1277
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1277
//function line:1240
function(el, handlerBaseName, cb) {
        if (el.addEventListener) {
            el.addEventListener(handlerBaseName, cb, false)
        } else if (el.attachEvent) {
            el.attachEvent('on' + handlerBaseName, cb)
        }
    }
//call line:1242
//call line:1364
//function line:1289
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
//call line:1293
//call line:1365
//function line:1319
function trapCapturedEvent(topLevelType, handlerBaseName, onWhat) {
    capture(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1320
//function line:1551
function(topLevelType) {
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
//call line:1320
//function line:1279
function(el, handlerBaseName, cb) {
        EventListener_1.capture(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1280
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1280
//function line:1247
function(el, handlerBaseName, cb) {
        if (!el.addEventListener) {
            console.error('You are attempting to use addEventlistener in a browser that does not support it support it.This likely means that you will not receive events that your application relies on (such as scroll).');
            return
        } else {
            el.addEventListener(handlerBaseName, cb, true)
        }
    }
//call line:1252
//call line:1368
//function line:1289
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
//call line:1293
//call line:1369
//function line:1319
function trapCapturedEvent(topLevelType, handlerBaseName, onWhat) {
    capture(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1320
//function line:1551
function(topLevelType) {
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
//call line:1320
//function line:1279
function(el, handlerBaseName, cb) {
        EventListener_1.capture(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1280
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1280
//function line:1247
function(el, handlerBaseName, cb) {
        if (!el.addEventListener) {
            console.error('You are attempting to use addEventlistener in a browser that does not support it support it.This likely means that you will not receive events that your application relies on (such as scroll).');
            return
        } else {
            el.addEventListener(handlerBaseName, cb, true)
        }
    }
//call line:1252
//call line:1370
//function line:1319
function trapCapturedEvent(topLevelType, handlerBaseName, onWhat) {
    capture(onWhat, handlerBaseName, ReactEvent.TopLevelCallbackCreator.createTopLevelCallback(topLevelType))
}
//call line:1320
//function line:1551
function(topLevelType) {
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
//call line:1320
//function line:1279
function(el, handlerBaseName, cb) {
        EventListener_1.capture(el, handlerBaseName, createNormalizedCallback(cb))
    }
//call line:1280
//function line:1270
function createNormalizedCallback(cb) {
    return function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
}
//call line:1280
//function line:1247
function(el, handlerBaseName, cb) {
        if (!el.addEventListener) {
            console.error('You are attempting to use addEventlistener in a browser that does not support it support it.This likely means that you will not receive events that your application relies on (such as scroll).');
            return
        } else {
            el.addEventListener(handlerBaseName, cb, true)
        }
    }
//call line:1252
//call line:1643
//function line:1659
function(container) {
        var reactRootID = getReactRootID(container);
        if (reactRootID) {
            reactRootID = ReactInstanceHandles_1.getReactRootIDFromNodeID(reactRootID)
        }
        if (!reactRootID) {
            reactRootID = ReactInstanceHandles_1.getReactRootID(globalMountPointCounter++)
        }
        containersByReactRootID[reactRootID] = container;
        return reactRootID
    }
//call line:1660
//function line:1616
function getReactRootID(container) {
    return container.firstChild && container.firstChild.id
}
//call line:1665
//function line:1504
function(mountPointCount) {
        return '.reactRoot[' + mountPointCount + ']'
    }
//call line:1645
//function line:2182
function(rootID, container) {
            var transaction = ReactComponent.ReactReconcileTransaction.getPooled();
            transaction.perform(this._mountComponentIntoNode, this, rootID, container, transaction);
            ReactComponent.ReactReconcileTransaction.release(transaction)
        }
//call line:2183
//function line:570
function(copyFieldsFrom) {
    var Klass = this;
    if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, copyFieldsFrom);
        return instance
    } else {
        return new Klass(copyFieldsFrom)
    }
}
//function line:2078
function ReactReconcileTransaction() {
    this.reinitializeTransaction();
    this.reactOnDOMReady = ReactOnDOMReady_1.getPooled(null)
}
//call line:2079
//function line:1948
function() {
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
    }
//call line:1949
//function line:2083
function() {
        if (ExecutionEnvironment_1.canUseDOM) {
            return TRANSACTION_WRAPPERS
        } else {
            return []
        }
    }
//call line:2080
//function line:570
function(copyFieldsFrom) {
    var Klass = this;
    if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, copyFieldsFrom);
        return instance
    } else {
        return new Klass(copyFieldsFrom)
    }
}
//function line:1909
function ReactOnDOMReady(initialCollection) {
    this._queue = initialCollection || null
}
//call line:2184
//function line:1974
function(method, scope, a, b, c, d, e, f) {
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
    }
//call line:1975
//function line:1971
function() {
        return !!this._isInTransaction
    }
//call line:1975
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:1976
//call line:1980
//function line:1998
function() {
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
    }
//call line:2004
//call line:2007
//function line:1791
function() {
        var focusedElem = getActiveElement();
        return {
            focusedElem: focusedElem,
            selectionRange: ReactInputSelection.hasSelectionCapabilities(focusedElem) ? ReactInputSelection.getSelection(focusedElem) : null
        }
    }
//call line:1792
//function line:1782
function getActiveElement() {
    try {
        return document.activeElement
    } catch (e) {}
}
//call line:1795
//function line:1788
function(elem) {
        return elem && ((elem.nodeName === 'INPUT' && elem.type === 'text') || elem.nodeName === 'TEXTAREA' || elem.contentEditable === 'true')
    }
//call line:2013
//call line:2004
//call line:2007
//function line:2059
function() {
        var currentlyEnabled = ReactEvent_1.isEnabled();
        ReactEvent_1.setEnabled(false);
        return currentlyEnabled
    }
//call line:2060
//function line:1388
function isEnabled() {
    return ReactEvent.TopLevelCallbackCreator.isEnabled()
}
//call line:1389
//function line:1548
function() {
        return _topLevelListenersEnabled
    }
//call line:2061
//function line:1383
function setEnabled(enabled) {
    invariant_1(ExecutionEnvironment_1.canUseDOM, 'setEnabled(...): Cannot toggle event listening in a Worker thread. This is likely a bug in the framework. Please report immediately.');
    ReactEvent.TopLevelCallbackCreator.setEnabled(enabled)
}
//call line:1384
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:1385
//function line:1545
function(enabled) {
        _topLevelListenersEnabled = !!enabled
    }
//call line:2013
//call line:2004
//call line:2007
//function line:2069
function() {
        this.reactOnDOMReady.reset()
    }
//call line:2070
//function line:1932
function() {
        this._queue = null
    }
//call line:2013
//call line:1981
//function line:2187
function(rootID, container, transaction) {
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
        }
//call line:2188
//call line:2189
//function line:2431
function(rootID, transaction) {
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
    }
//call line:2432
//function line:2151
function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        }
//call line:2152
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2441
//call line:2453
//function line:2546
function() {
        ReactCurrentOwner_1.current = this;
        var renderedComponent = this.render();
        ReactCurrentOwner_1.current = null;
        invariant_1(ReactComponent_1.isValidComponent(renderedComponent), '%s.render(): A valid ReactComponent must be returned.', this.constructor.displayName || 'ReactCompositeComponent');
        return renderedComponent
    }
//call line:2548
//function line:3000
function(props, children) {
        return new Constructor(props, children)
    }
//function line:2995
function(initialProps, children) {
        this.construct(initialProps, children)
    }
//call line:2996
//function line:2143
function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        }
//function line:3000
function(props, children) {
        return new Constructor(props, children)
    }
//function line:2995
function(initialProps, children) {
        this.construct(initialProps, children)
    }
//call line:2996
//function line:2143
function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        }
//function line:3000
function(props, children) {
        return new Constructor(props, children)
    }
//function line:2995
function(initialProps, children) {
        this.construct(initialProps, children)
    }
//call line:2996
//function line:2143
function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        }
//function line:3000
function(props, children) {
        return new Constructor(props, children)
    }
//function line:2995
function(initialProps, children) {
        this.construct(initialProps, children)
    }
//call line:2996
//function line:2143
function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        }
//function line:3000
function(props, children) {
        return new Constructor(props, children)
    }
//function line:2995
function(initialProps, children) {
        this.construct(initialProps, children)
    }
//call line:2996
//function line:2143
function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        }
//function line:3000
function(props, children) {
        return new Constructor(props, children)
    }
//function line:2995
function(initialProps, children) {
        this.construct(initialProps, children)
    }
//call line:2996
//function line:2143
function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        }
//function line:3000
function(props, children) {
        return new Constructor(props, children)
    }
//function line:2995
function(initialProps, children) {
        this.construct(initialProps, children)
    }
//call line:2996
//function line:2143
function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        }
//function line:3000
function(props, children) {
        return new Constructor(props, children)
    }
//function line:2995
function(initialProps, children) {
        this.construct(initialProps, children)
    }
//call line:2996
//function line:2143
function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        }
//function line:3000
function(props, children) {
        return new Constructor(props, children)
    }
//function line:2995
function(initialProps, children) {
        this.construct(initialProps, children)
    }
//call line:2996
//function line:2143
function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        }
//function line:3000
function(props, children) {
        return new Constructor(props, children)
    }
//function line:2995
function(initialProps, children) {
        this.construct(initialProps, children)
    }
//call line:2996
//function line:2143
function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        }
//function line:3000
function(props, children) {
        return new Constructor(props, children)
    }
//function line:2995
function(initialProps, children) {
        this.construct(initialProps, children)
    }
//call line:2996
//function line:2143
function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        }
//call line:2550
//function line:2108
function(object) {
        return !!(object && typeof object.mountComponentIntoNode === 'function' && typeof object.receiveProps === 'function')
    }
//call line:2550
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2456
//function line:2843
function(rootID, transaction) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID, transaction);
        assertValidProps(this.props);
        return (this._createOpenTagMarkup() + this._createContentMarkup(transaction) + this._tagClose)
    }
//call line:2844
//function line:2151
function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        }
//call line:2152
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2845
//function line:2826
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
//call line:2833
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2834
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2846
//function line:2848
function() {
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
    }
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2846
//function line:2876
function(transaction) {
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
    }
//call line:2888
//function line:2801
function flattenChildren(children) {
    if (children === null || children === undefined) {
        return children
    }
    var result = {};
    flattenChildrenImpl(result, children, '');
    return result
}
//call line:2806
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2774
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2774
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2888
//function line:2667
function(children, transaction) {
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
    }
//call line:2672
//call line:2673
//function line:2843
function(rootID, transaction) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID, transaction);
        assertValidProps(this.props);
        return (this._createOpenTagMarkup() + this._createContentMarkup(transaction) + this._tagClose)
    }
//call line:2844
//function line:2151
function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        }
//call line:2152
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2845
//function line:2826
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
//call line:2833
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2834
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2846
//function line:2848
function() {
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
    }
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:478
//function line:87
function(string) {
        if (cache.hasOwnProperty(string)) {
            return cache[string]
        } else {
            return cache[string] = callback.call(this, string)
        }
    }
//call line:88
//call line:91
//function line:468
function(name) {
    return escapeTextForBrowser_1(name) + '="'
}
//call line:469
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:478
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2846
//function line:2876
function(transaction) {
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
    }
//call line:2888
//function line:2801
function flattenChildren(children) {
    if (children === null || children === undefined) {
        return children
    }
    var result = {};
    flattenChildrenImpl(result, children, '');
    return result
}
//call line:2806
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2774
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2774
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2774
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2888
//function line:2667
function(children, transaction) {
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
    }
//call line:2672
//call line:2673
//function line:2843
function(rootID, transaction) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID, transaction);
        assertValidProps(this.props);
        return (this._createOpenTagMarkup() + this._createContentMarkup(transaction) + this._tagClose)
    }
//call line:2844
//function line:2151
function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        }
//call line:2152
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2845
//function line:2826
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
//call line:2833
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2834
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2846
//function line:2848
function() {
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
    }
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:478
//function line:87
function(string) {
        if (cache.hasOwnProperty(string)) {
            return cache[string]
        } else {
            return cache[string] = callback.call(this, string)
        }
    }
//call line:88
//call line:478
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2846
//function line:2876
function(transaction) {
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
    }
//call line:2888
//function line:2801
function flattenChildren(children) {
    if (children === null || children === undefined) {
        return children
    }
    var result = {};
    flattenChildrenImpl(result, children, '');
    return result
}
//call line:2806
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2774
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2774
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2888
//function line:2667
function(children, transaction) {
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
    }
//call line:2672
//call line:2673
//function line:2843
function(rootID, transaction) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID, transaction);
        assertValidProps(this.props);
        return (this._createOpenTagMarkup() + this._createContentMarkup(transaction) + this._tagClose)
    }
//call line:2844
//function line:2151
function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        }
//call line:2152
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2845
//function line:2826
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
//call line:2833
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2834
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2846
//function line:2848
function() {
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
    }
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2846
//function line:2876
function(transaction) {
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
    }
//call line:2886
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:2672
//call line:2673
//function line:2843
function(rootID, transaction) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID, transaction);
        assertValidProps(this.props);
        return (this._createOpenTagMarkup() + this._createContentMarkup(transaction) + this._tagClose)
    }
//call line:2844
//function line:2151
function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        }
//call line:2152
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2845
//function line:2826
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
//call line:2833
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2834
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2846
//function line:2848
function() {
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
    }
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:478
//function line:87
function(string) {
        if (cache.hasOwnProperty(string)) {
            return cache[string]
        } else {
            return cache[string] = callback.call(this, string)
        }
    }
//call line:88
//call line:478
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:478
//function line:87
function(string) {
        if (cache.hasOwnProperty(string)) {
            return cache[string]
        } else {
            return cache[string] = callback.call(this, string)
        }
    }
//call line:88
//call line:91
//function line:468
function(name) {
    return escapeTextForBrowser_1(name) + '="'
}
//call line:469
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:478
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2852
//call line:2860
//function line:763
function(id, registrationName, listener) {
        var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
        bankForRegistrationName[id] = listener
    }
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:478
//function line:87
function(string) {
        if (cache.hasOwnProperty(string)) {
            return cache[string]
        } else {
            return cache[string] = callback.call(this, string)
        }
    }
//call line:88
//call line:91
//function line:468
function(name) {
    return escapeTextForBrowser_1(name) + '="'
}
//call line:469
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:478
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:2852
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2846
//function line:2876
function(transaction) {
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
    }
//call line:2672
//call line:2672
//call line:2672
//call line:2673
//function line:2843
function(rootID, transaction) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID, transaction);
        assertValidProps(this.props);
        return (this._createOpenTagMarkup() + this._createContentMarkup(transaction) + this._tagClose)
    }
//call line:2844
//function line:2151
function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        }
//call line:2152
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2845
//function line:2826
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
//call line:2833
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2834
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2846
//function line:2848
function() {
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
    }
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:478
//function line:87
function(string) {
        if (cache.hasOwnProperty(string)) {
            return cache[string]
        } else {
            return cache[string] = callback.call(this, string)
        }
    }
//call line:88
//call line:478
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2846
//function line:2876
function(transaction) {
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
    }
//call line:2888
//function line:2801
function flattenChildren(children) {
    if (children === null || children === undefined) {
        return children
    }
    var result = {};
    flattenChildrenImpl(result, children, '');
    return result
}
//call line:2806
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2774
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2774
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2774
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2888
//function line:2667
function(children, transaction) {
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
    }
//call line:2672
//call line:2673
//function line:2843
function(rootID, transaction) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID, transaction);
        assertValidProps(this.props);
        return (this._createOpenTagMarkup() + this._createContentMarkup(transaction) + this._tagClose)
    }
//call line:2844
//function line:2151
function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        }
//call line:2152
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2845
//function line:2826
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
//call line:2833
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2834
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2846
//function line:2848
function() {
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
    }
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2846
//function line:2876
function(transaction) {
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
    }
//call line:2886
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:2672
//call line:2673
//function line:2843
function(rootID, transaction) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID, transaction);
        assertValidProps(this.props);
        return (this._createOpenTagMarkup() + this._createContentMarkup(transaction) + this._tagClose)
    }
//call line:2844
//function line:2151
function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        }
//call line:2152
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2845
//function line:2826
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
//call line:2833
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2834
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2846
//function line:2848
function() {
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
    }
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2846
//function line:2876
function(transaction) {
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
    }
//call line:2888
//function line:2801
function flattenChildren(children) {
    if (children === null || children === undefined) {
        return children
    }
    var result = {};
    flattenChildrenImpl(result, children, '');
    return result
}
//call line:2806
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2774
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//function line:2747
function(initialText) {
    this.construct({
        text: initialText
    })
}
//call line:2748
//function line:2143
function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        }
//call line:2774
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//function line:2747
function(initialText) {
    this.construct({
        text: initialText
    })
}
//call line:2748
//function line:2143
function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        }
//call line:2774
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2888
//function line:2667
function(children, transaction) {
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
    }
//call line:2672
//call line:2673
//function line:2754
function(rootID) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID);
        return ('<span id="' + rootID + '">' + escapeTextForBrowser_1(this.props.text) + '</span>')
    }
//call line:2755
//function line:2151
function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        }
//call line:2152
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2756
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:2672
//call line:2673
//function line:2754
function(rootID) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID);
        return ('<span id="' + rootID + '">' + escapeTextForBrowser_1(this.props.text) + '</span>')
    }
//call line:2755
//function line:2151
function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        }
//call line:2152
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2756
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:2672
//call line:2673
//function line:2843
function(rootID, transaction) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID, transaction);
        assertValidProps(this.props);
        return (this._createOpenTagMarkup() + this._createContentMarkup(transaction) + this._tagClose)
    }
//call line:2844
//function line:2151
function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        }
//call line:2152
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2845
//function line:2826
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
//call line:2833
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2834
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2846
//function line:2848
function() {
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
    }
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:478
//function line:87
function(string) {
        if (cache.hasOwnProperty(string)) {
            return cache[string]
        } else {
            return cache[string] = callback.call(this, string)
        }
    }
//call line:88
//call line:91
//function line:468
function(name) {
    return escapeTextForBrowser_1(name) + '="'
}
//call line:469
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:478
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//function line:58
function escaper(match) {
    return ESCAPE_LOOKUP[match]
}
//function line:58
function escaper(match) {
    return ESCAPE_LOOKUP[match]
}
//function line:58
function escaper(match) {
    return ESCAPE_LOOKUP[match]
}
//function line:58
function escaper(match) {
    return ESCAPE_LOOKUP[match]
}
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2846
//function line:2876
function(transaction) {
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
    }
//call line:2886
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:2672
//call line:2673
//function line:2843
function(rootID, transaction) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID, transaction);
        assertValidProps(this.props);
        return (this._createOpenTagMarkup() + this._createContentMarkup(transaction) + this._tagClose)
    }
//call line:2844
//function line:2151
function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        }
//call line:2152
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2845
//function line:2826
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
//call line:2833
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2834
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2846
//function line:2848
function() {
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
    }
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2846
//function line:2876
function(transaction) {
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
    }
//call line:2888
//function line:2801
function flattenChildren(children) {
    if (children === null || children === undefined) {
        return children
    }
    var result = {};
    flattenChildrenImpl(result, children, '');
    return result
}
//call line:2806
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2774
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//function line:2747
function(initialText) {
    this.construct({
        text: initialText
    })
}
//call line:2748
//function line:2143
function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        }
//call line:2774
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//function line:2747
function(initialText) {
    this.construct({
        text: initialText
    })
}
//call line:2748
//function line:2143
function(initialProps, children) {
            this.props = initialProps || {};
            if (typeof children !== 'undefined') {
                this.props.children = children
            }
            this.props[OWNER] = ReactCurrentOwner_1.current;
            this._lifeCycleState = ComponentLifeCycle.UNMOUNTED
        }
//call line:2774
//function line:2771
function(res, children, nameSoFar) {
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
}
//call line:2772
//call line:2888
//function line:2667
function(children, transaction) {
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
    }
//call line:2672
//call line:2673
//function line:2754
function(rootID) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID);
        return ('<span id="' + rootID + '">' + escapeTextForBrowser_1(this.props.text) + '</span>')
    }
//call line:2755
//function line:2151
function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        }
//call line:2152
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2756
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:2672
//call line:2673
//function line:2754
function(rootID) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID);
        return ('<span id="' + rootID + '">' + escapeTextForBrowser_1(this.props.text) + '</span>')
    }
//call line:2755
//function line:2151
function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        }
//call line:2152
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2756
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:2672
//call line:2673
//function line:2843
function(rootID, transaction) {
        ReactComponent_1.Mixin.mountComponent.call(this, rootID, transaction);
        assertValidProps(this.props);
        return (this._createOpenTagMarkup() + this._createContentMarkup(transaction) + this._tagClose)
    }
//call line:2844
//function line:2151
function(rootID, transaction) {
            invariant_1(this._lifeCycleState === ComponentLifeCycle.UNMOUNTED, 'mountComponent(%s, ...): Can only mount an unmounted component.', rootID);
            var props = this.props;
            if (props.ref != null) {
                ReactOwner_1.addComponentAsRefTo(this, props.ref, props[OWNER])
            }
            this._rootNodeID = rootID;
            this._lifeCycleState = ComponentLifeCycle.MOUNTED
        }
//call line:2152
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2845
//function line:2826
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
//call line:2833
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2834
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:2846
//function line:2848
function() {
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
    }
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:478
//function line:87
function(string) {
        if (cache.hasOwnProperty(string)) {
            return cache[string]
        } else {
            return cache[string] = callback.call(this, string)
        }
    }
//call line:88
//call line:478
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//function line:58
function escaper(match) {
    return ESCAPE_LOOKUP[match]
}
//function line:58
function escaper(match) {
    return ESCAPE_LOOKUP[match]
}
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2852
//call line:2868
//function line:472
function(name, value) {
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
    }
//call line:479
//call line:2846
//function line:2876
function(transaction) {
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
    }
//call line:2886
//function line:61
function(text) {
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
}
//call line:65
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:71
//call line:2190
//call line:2191
//call line:2195
//call line:2198
//call line:2205
//call line:1985
//call line:1988
//function line:2021
function() {
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
//call line:2022
//function line:1971
function() {
        return !!this._isInTransaction
    }
//call line:2022
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:2028
//call line:2032
//function line:1798
function(priorSelectionInformation) {
        var curFocusedElem = getActiveElement();
        var priorFocusedElem = priorSelectionInformation.focusedElem;
        var priorSelectionRange = priorSelectionInformation.selectionRange;
        if (curFocusedElem !== priorFocusedElem && document.getElementById(priorFocusedElem.id)) {
            if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
                ReactInputSelection.setSelection(priorFocusedElem, priorSelectionRange)
            }
            priorFocusedElem.focus()
        }
    }
//call line:1799
//function line:1782
function getActiveElement() {
    try {
        return document.activeElement
    } catch (e) {}
}
//call line:2037
//call line:2028
//call line:2032
//function line:2064
function(previouslyEnabled) {
        ReactEvent_1.setEnabled(previouslyEnabled)
    }
//call line:2065
//function line:1383
function setEnabled(enabled) {
    invariant_1(ExecutionEnvironment_1.canUseDOM, 'setEnabled(...): Cannot toggle event listening in a Worker thread. This is likely a bug in the framework. Please report immediately.');
    ReactEvent.TopLevelCallbackCreator.setEnabled(enabled)
}
//call line:1384
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:1385
//function line:1545
function(enabled) {
        _topLevelListenersEnabled = !!enabled
    }
//call line:2037
//call line:2028
//call line:2032
//function line:2072
function() {
        this.reactOnDOMReady.notifyAll()
    }
//call line:2073
//function line:1920
function() {
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
    }
//call line:2037
//call line:2185
//function line:600
function(instance) {
    var Klass = this;
    if (instance.destructor) {
        instance.destructor()
    }
    if (Klass.instancePool.length < Klass.poolSize) {
        Klass.instancePool.push(instance)
    }
}
//call line:603
//function line:2093
function() {
        ReactOnDOMReady_1.release(this.reactOnDOMReady);
        this.reactOnDOMReady = null
    }
//call line:2094
//function line:600
function(instance) {
    var Klass = this;
    if (instance.destructor) {
        instance.destructor()
    }
    if (Klass.instancePool.length < Klass.poolSize) {
        Klass.instancePool.push(instance)
    }
}
//call line:603
//function line:1935
function() {
        this.reset()
    }
//call line:1936
//function line:1932
function() {
        this._queue = null
    }
//call line:606
//call line:606
//function line:1271
function(unfixedNativeEvent) {
        cb(normalizeEvent(unfixedNativeEvent))
    }
//call line:1272
//function line:1258
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
//call line:1272
//function line:1552
function(fixedNativeEvent) {
            if (!_topLevelListenersEnabled) {
                return
            }
            var renderedTarget = ReactInstanceHandles_1.getFirstReactDOM(fixedNativeEvent.target) || ExecutionEnvironment_1.global;
            var renderedTargetID = getDOMNodeID_1(renderedTarget);
            var event = fixedNativeEvent;
            var target = renderedTarget;
            ReactEvent_1.handleTopLevel(topLevelType, event, renderedTargetID, target)
        }
//call line:1556
//function line:1466
function(node) {
        var current = node;
        while (current && current.parentNode !== current) {
            if (isRenderedByReact(current)) {
                return current
            }
            current = current.parentNode
        }
        return null
    }
//call line:1469
//function line:1436
function isRenderedByReact(node) {
    var id = getDOMNodeID_1(node);
    return id && id.charAt(0) === SEPARATOR
}
//call line:1437
//function line:1415
function getDOMNodeID(domNode) {
    if (domNode.getAttributeNode) {
        var attributeNode = domNode.getAttributeNode('id');
        return attributeNode && attributeNode.value || ''
    } else {
        return domNode.id || ''
    }
}
//call line:1417
//call line:1438
//call line:1469
//function line:1436
function isRenderedByReact(node) {
    var id = getDOMNodeID_1(node);
    return id && id.charAt(0) === SEPARATOR
}
//call line:1437
//function line:1415
function getDOMNodeID(domNode) {
    if (domNode.getAttributeNode) {
        var attributeNode = domNode.getAttributeNode('id');
        return attributeNode && attributeNode.value || ''
    } else {
        return domNode.id || ''
    }
}
//call line:1417
//call line:1469
//function line:1436
function isRenderedByReact(node) {
    var id = getDOMNodeID_1(node);
    return id && id.charAt(0) === SEPARATOR
}
//call line:1437
//function line:1415
function getDOMNodeID(domNode) {
    if (domNode.getAttributeNode) {
        var attributeNode = domNode.getAttributeNode('id');
        return attributeNode && attributeNode.value || ''
    } else {
        return domNode.id || ''
    }
}
//call line:1417
//call line:1469
//function line:1436
function isRenderedByReact(node) {
    var id = getDOMNodeID_1(node);
    return id && id.charAt(0) === SEPARATOR
}
//call line:1437
//function line:1415
function getDOMNodeID(domNode) {
    if (domNode.getAttributeNode) {
        var attributeNode = domNode.getAttributeNode('id');
        return attributeNode && attributeNode.value || ''
    } else {
        return domNode.id || ''
    }
}
//call line:1417
//call line:1469
//function line:1436
function isRenderedByReact(node) {
    var id = getDOMNodeID_1(node);
    return id && id.charAt(0) === SEPARATOR
}
//call line:1437
//function line:1415
function getDOMNodeID(domNode) {
    if (domNode.getAttributeNode) {
        var attributeNode = domNode.getAttributeNode('id');
        return attributeNode && attributeNode.value || ''
    } else {
        return domNode.id || ''
    }
}
//call line:1557
//function line:1415
function getDOMNodeID(domNode) {
    if (domNode.getAttributeNode) {
        var attributeNode = domNode.getAttributeNode('id');
        return attributeNode && attributeNode.value || ''
    } else {
        return domNode.id || ''
    }
}
//call line:1560
//function line:1377
function handleTopLevel(topLevelType, nativeEvent, renderedTargetID, renderedTarget) {
    var abstractEvents = EventPluginHub_1.extractAbstractEvents(topLevelType, nativeEvent, renderedTargetID, renderedTarget);
    EventPluginHub_1.enqueueAbstractEvents(abstractEvents);
    EventPluginHub_1.processAbstractEventQueue()
}
//call line:1378
//function line:1190
function(topLevelType, nativeEvent, renderedTargetID, renderedTarget) {
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
}
//call line:1196
//function line:3352
function(topLevelType, nativeEvent, renderedTargetID, renderedTarget) {
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
//call line:3380
//function line:590
function(a1, a2, a3, a4, a5) {
    var Klass = this;
    if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2, a3, a4, a5);
        return instance
    } else {
        return new Klass(a1, a2, a3, a4, a5)
    }
}
//function line:644
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
//call line:3381
//function line:997
function accumulateTwoPhaseDispatches(abstractEvents) {
    if (__DEV__) {
        injection$2.validate()
    }
    forEachAccumulated_1(abstractEvents, accumulateTwoPhaseDispatchesSingle)
}
//call line:999
//function line:947
function() {
        var invalid = !injection$2.InstanceHandle || !injection$2.InstanceHandle.traverseTwoPhase || !injection$2.InstanceHandle.traverseEnterLeave;
        if (invalid) {
            throw new Error('InstanceHandle not injected before use!');
        }
    }
//call line:1001
//function line:929
function(arr, cb, scope) {
    if (Array.isArray(arr)) {
        arr.forEach(cb, scope)
    } else if (arr) {
        cb.call(scope, arr)
    }
}
//call line:930
//call line:933
//function line:975
function accumulateTwoPhaseDispatchesSingle(abstractEvent) {
    if (abstractEvent && abstractEvent.type.phasedRegistrationNames) {
        injection$2.InstanceHandle.traverseTwoPhase(abstractEvent.abstractTargetID, accumulateDirectionalDispatches, abstractEvent)
    }
}
//call line:977
//function line:1520
function(targetID, cb, arg) {
        if (targetID) {
            traverseParentPath('', targetID, cb, arg, true, false);
            traverseParentPath(targetID, '', cb, arg, false, true)
        }
    }
//call line:1198
//function line:902
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
//call line:906
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:1196
//function line:3122
function(topLevelType, nativeEvent, renderedTargetID, renderedTarget) {
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
}
//call line:1379
//function line:1203
function(abstractEvents) {
    if (abstractEvents) {
        abstractEventQueue = accumulate_1(abstractEventQueue, abstractEvents)
    }
}
//call line:1205
//function line:902
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
//call line:906
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}
//call line:914
//call line:915
//call line:917
//call line:1380
//function line:1216
function() {
    var processingAbstractEventQueue = abstractEventQueue;
    abstractEventQueue = null;
    forEachAccumulated_1(processingAbstractEventQueue, executeDispatchesAndRelease);
    if (__DEV__) {
        throwIf_1(abstractEventQueue, ERRORS.DOUBLE_ENQUEUE);
    }
}
//call line:1219
//function line:929
function(arr, cb, scope) {
    if (Array.isArray(arr)) {
        arr.forEach(cb, scope)
    } else if (arr) {
        cb.call(scope, arr)
    }
}
//call line:930
//call line:931
//function line:1208
function(abstractEvent) {
    if (abstractEvent) {
        var PluginModule = getPluginModuleForAbstractEvent(abstractEvent);
        var pluginExecuteDispatch = PluginModule && PluginModule.executeDispatch;
        EventPluginUtils_1.executeDispatchesInOrder(abstractEvent, pluginExecuteDispatch || EventPluginUtils_1.executeDispatch);
        AbstractEvent_1.release(abstractEvent)
    }
}
//call line:1210
//function line:1168
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
//call line:1173
//call line:1212
//function line:841
function executeDispatchesInOrder(abstractEvent, executeDispatch) {
    forEachEventDispatch(abstractEvent, executeDispatch);
    abstractEvent._dispatchListeners = null;
    abstractEvent._dispatchIDs = null
}
//call line:842
//function line:821
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
//call line:825
//function line:810
function(abstractEvent) {
        var dispatchListeners = abstractEvent._dispatchListeners;
        var dispatchIDs = abstractEvent._dispatchIDs;
        var listenersIsArr = Array.isArray(dispatchListeners);
        var idsIsArr = Array.isArray(dispatchIDs);
        var IDsLen = idsIsArr ? dispatchIDs.length : dispatchIDs ? 1 : 0;
        var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;
        invariant_1(idsIsArr === listenersIsArr && IDsLen === listenersLen, 'EventPluginUtils: Invalid `abstractEvent`.')
    }
//call line:813
//call line:814
//call line:817
//function line:330
function(condition, format, a, b, c, d, e, f) {
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
        }
//call line:827
//call line:1213
//function line:600
function(instance) {
    var Klass = this;
    if (instance.destructor) {
        instance.destructor()
    }
    if (Klass.instancePool.length < Klass.poolSize) {
        Klass.instancePool.push(instance)
    }
}
//call line:603
//function line:656
function() {
    this.target = null;
    this._dispatchListeners = null;
    this._dispatchIDs = null
}
//call line:606
//call line:1221
//function line:39
function(condition, err) {
    if (condition) {
        throw new Error(err);
    }
}