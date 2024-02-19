(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = global || self, factory(global.React = {}))
}(this, (function (exports) {
  'use strict';
  var ReactVersion = '17.0.0';
  var REACT_ELEMENT_TYPE = 0xeac7;
  var REACT_PORTAL_TYPE = 0xeaca;
  exports.Fragment = 0xeacb;
  exports.StrictMode = 0xeacc;
  exports.Profiler = 0xead2;
  var REACT_PROVIDER_TYPE = 0xeacd;
  var REACT_CONTEXT_TYPE = 0xeace;
  var REACT_FORWARD_REF_TYPE = 0xead0;
  exports.Suspense = 0xead1;
  exports.unstable_SuspenseList = 0xead8;
  var REACT_MEMO_TYPE = 0xead3;
  var REACT_LAZY_TYPE = 0xead4;
  var REACT_BLOCK_TYPE = 0xead9;
  var REACT_SERVER_BLOCK_TYPE = 0xeada;
  var REACT_FUNDAMENTAL_TYPE = 0xead5;
  var REACT_SCOPE_TYPE = 0xead7;
  var REACT_OPAQUE_ID_TYPE = 0xeae0;
  exports.unstable_DebugTracingMode = 0xeae1;
  var REACT_OFFSCREEN_TYPE = 0xeae2;
  exports.unstable_LegacyHidden = 0xeae3;
  if (typeof Symbol === 'function' && Symbol.for) {
    var symbolFor = Symbol.for;
    REACT_ELEMENT_TYPE = symbolFor('react.element');
    REACT_PORTAL_TYPE = symbolFor('react.portal');
    exports.Fragment = symbolFor('react.fragment');
    exports.StrictMode = symbolFor('react.strict_mode');
    exports.Profiler = symbolFor('react.profiler');
    REACT_PROVIDER_TYPE = symbolFor('react.provider');
    REACT_CONTEXT_TYPE = symbolFor('react.context');
    REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
    exports.Suspense = symbolFor('react.suspense');
    exports.unstable_SuspenseList = symbolFor('react.suspense_list');
    REACT_MEMO_TYPE = symbolFor('react.memo');
    REACT_LAZY_TYPE = symbolFor('react.lazy');
    REACT_BLOCK_TYPE = symbolFor('react.block');
    REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
    REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
    REACT_SCOPE_TYPE = symbolFor('react.scope');
    REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id');
    exports.unstable_DebugTracingMode = symbolFor('react.debug_trace_mode');
    REACT_OFFSCREEN_TYPE = symbolFor('react.offscreen');
    exports.unstable_LegacyHidden = symbolFor('react.legacy_hidden')
  }
  var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  function getIteratorFn(maybeIterable) {
    if (maybeIterable === null || typeof maybeIterable !== 'object') {
      return null
    }
    var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
    if (typeof maybeIterator === 'function') {
      return maybeIterator
    }
    return null
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var _assign = function (to, from) {
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key]
      }
    }
  };
  var assign = Object.assign || function (target, sources) {
    if (target == null) {
      throw new TypeError('Object.assign target cannot be null or undefined');
    }
    var to = Object(target);
    for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
      var nextSource = arguments[nextIndex];
      if (nextSource != null) {
        _assign(to, Object(nextSource))
      }
    }
    return to
  };
  var ReactCurrentDispatcher = {
    current: null
  };
  var ReactCurrentBatchConfig = {
    transition: 0
  };
  var ReactCurrentOwner = {
    current: null
  };
  var IsSomeRendererActing = {
    current: false
  };

  function formatProdErrorMessage(code) {
    var url = 'https://reactjs.org/docs/error-decoder.html?invariant=' + code;
    for (var i = 1; i < arguments.length; i++) {
      url += '&args[]=' + encodeURIComponent(arguments[i])
    }
    return "Minified React error #" + code + "; visit " + url + " for the full message or " + 'use the non-minified dev environment for full errors and additional helpful warnings.'
  }
  var ReactNoopUpdateQueue = {
    isMounted: function (publicInstance) {
      return false
    },
    enqueueForceUpdate: function (publicInstance, callback, callerName) { },
    enqueueReplaceState: function (publicInstance, completeState, callback, callerName) { },
    enqueueSetState: function (publicInstance, partialState, callback, callerName) { }
  };
  var emptyObject = {};

  function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue
  }
  Component.prototype.isReactComponent = {};
  Component.prototype.setState = function (partialState, callback) {
    if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
      {
        throw Error(formatProdErrorMessage(85));
      }
    }
    this.updater.enqueueSetState(this, partialState, callback, 'setState')
  };
  Component.prototype.forceUpdate = function (callback) {
    this.updater.enqueueForceUpdate(this, callback, 'forceUpdate')
  };

  function ComponentDummy() { }
  ComponentDummy.prototype = Component.prototype;

  function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue
  }
  var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
  pureComponentPrototype.constructor = PureComponent;
  assign(pureComponentPrototype, Component.prototype);
  pureComponentPrototype.isPureReactComponent = true;

  function createRef() {
    var refObject = {
      current: null
    };
    return refObject
  }
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
  };

  function hasValidRef(config) {
    return config.ref !== undefined
  }

  function hasValidKey(config) {
    return config.key !== undefined
  }
  var ReactElement = function (type, key, ref, self, source, owner, props) {
    var element = {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key,
      ref: ref,
      props: props,
      _owner: owner
    };
    return element
  };

  function createElement(type, config, children) {
    var propName;
    var props = {};
    var key = null;
    var ref = null;
    var self = null;
    var source = null;
    if (config != null) {
      if (hasValidRef(config)) {
        ref = config.ref
      }
      if (hasValidKey(config)) {
        key = '' + config.key
      }
      self = config.__self === undefined ? null : config.__self;
      source = config.__source === undefined ? null : config.__source;
      for (propName in config) {
        if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          props[propName] = config[propName]
        }
      }
    }
    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = children
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2]
      }
      props.children = childArray
    }
    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;
      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName]
        }
      }
    }
    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props)
  }

  function createFactory(type) {
    var factory = createElement.bind(null, type);
    factory.type = type;
    return factory
  }

  function cloneAndReplaceKey(oldElement, newKey) {
    var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
    return newElement
  }

  function cloneElement(element, config, children) {
    if (!!(element === null || element === undefined)) {
      {
        throw Error(formatProdErrorMessage(267, element));
      }
    }
    var propName;
    var props = assign({}, element.props);
    var key = element.key;
    var ref = element.ref;
    var self = element._self;
    var source = element._source;
    var owner = element._owner;
    if (config != null) {
      if (hasValidRef(config)) {
        ref = config.ref;
        owner = ReactCurrentOwner.current
      }
      if (hasValidKey(config)) {
        key = '' + config.key
      }
      var defaultProps;
      if (element.type && element.type.defaultProps) {
        defaultProps = element.type.defaultProps
      }
      for (propName in config) {
        if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          if (config[propName] === undefined && defaultProps !== undefined) {
            props[propName] = defaultProps[propName]
          } else {
            props[propName] = config[propName]
          }
        }
      }
    }
    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = children
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2]
      }
      props.children = childArray
    }
    return ReactElement(element.type, key, ref, self, source, owner, props)
  }

  function isValidElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE
  }
  var SEPARATOR = '.';
  var SUBSEPARATOR = ':';

  function escape(key) {
    var escapeRegex = /[=:]/g;
    var escaperLookup = {
      '=': '=0',
      ':': '=2'
    };
    var escapedString = key.replace(escapeRegex, function (match) {
      return escaperLookup[match]
    });
    return '$' + escapedString
  }
  var userProvidedKeyEscapeRegex = /\/+/g;

  function escapeUserProvidedKey(text) {
    return text.replace(userProvidedKeyEscapeRegex, '$&/')
  }

  function getElementKey(element, index) {
    if (typeof element === 'object' && element !== null && element.key != null) {
      return escape('' + element.key)
    }
    return index.toString(36)
  }

  function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
    var type = typeof children;
    if (type === 'undefined' || type === 'boolean') {
      children = null
    }
    var invokeCallback = false;
    if (children === null) {
      invokeCallback = true
    } else {
      switch (type) {
        case 'string':
        case 'number':
          invokeCallback = true;
          break;
        case 'object':
          switch (children.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              invokeCallback = true
          }
      }
    } if (invokeCallback) {
      var _child = children;
      var mappedChild = callback(_child);
      var childKey = nameSoFar === '' ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
      if (Array.isArray(mappedChild)) {
        var escapedChildKey = '';
        if (childKey != null) {
          escapedChildKey = escapeUserProvidedKey(childKey) + '/'
        }
        mapIntoArray(mappedChild, array, escapedChildKey, '', function (c) {
          return c
        })
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(mappedChild, escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey('' + mappedChild.key) + '/' : '') + childKey)
        }
        array.push(mappedChild)
      }
      return 1
    }
    var child;
    var nextName;
    var subtreeCount = 0;
    var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        nextName = nextNamePrefix + getElementKey(child, i);
        subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback)
      }
    } else {
      var iteratorFn = getIteratorFn(children);
      if (typeof iteratorFn === 'function') {
        var iterableChildren = children;
        var iterator = iteratorFn.call(iterableChildren);
        var step;
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getElementKey(child, ii++);
          subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback)
        }
      } else if (type === 'object') {
        var childrenString = '' + children; {
          {
            throw Error(formatProdErrorMessage(31, childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString));
          }
        }
      }
    }
    return subtreeCount;
  }

  function mapChildren(children, func, context) {
    if (children == null) {
      return children;
    }
    var result = [];
    var count = 0;
    mapIntoArray(children, result, '', '', function (child) {
      return func.call(context, child, count++);
    });
    return result;
  }

  function countChildren(children) {
    var n = 0;
    mapChildren(children, function () {
      n++;
    });
    return n;
  }

  function forEachChildren(children, forEachFunc, forEachContext) {
    mapChildren(children, function () {
      forEachFunc.apply(this, arguments);
    }, forEachContext);
  }

  function toArray(children) {
    return mapChildren(children, function (child) {
      return child;
    }) || [];
  }

  function onlyChild(children) {
    if (!isValidElement(children)) {
      {
        throw Error(formatProdErrorMessage(143));
      }
    }
    return children;
  }

  function createContext(defaultValue, calculateChangedBits) {
    if (calculateChangedBits === undefined) {
      calculateChangedBits = null;
    }
    var context = {
      $$typeof: REACT_CONTEXT_TYPE,
      _calculateChangedBits: calculateChangedBits,
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    };
    context.Provider = {
      $$typeof: REACT_PROVIDER_TYPE,
      _context: context
    }; {
      context.Consumer = context;
    }
    return context;
  }
  var Uninitialized = -1;
  var Pending = 0;
  var Resolved = 1;
  var Rejected = 2;

  function lazyInitializer(payload) {
    if (payload._status === Uninitialized) {
      var ctor = payload._result;
      var thenable = ctor();
      var pending = payload;
      pending._status = Pending;
      pending._result = thenable;
      thenable.then(function (moduleObject) {
        if (payload._status === Pending) {
          var defaultExport = moduleObject.default;
          var resolved = payload;
          resolved._status = Resolved;
          resolved._result = defaultExport;
        }
      }, function (error) {
        if (payload._status === Pending) {
          var rejected = payload;
          rejected._status = Rejected;
          rejected._result = error;
        }
      });
    }
    if (payload._status === Resolved) {
      return payload._result;
    } else {
      throw payload._result;
    }
  }

  function lazy(ctor) {
    var payload = {
      _status: -1,
      _result: ctor
    };
    var lazyType = {
      $$typeof: REACT_LAZY_TYPE,
      _payload: payload,
      _init: lazyInitializer
    };
    return lazyType;
  }

  function forwardRef(render) {
    var elementType = {
      $$typeof: REACT_FORWARD_REF_TYPE,
      render: render
    };
    return elementType;
  }

  function memo(type, compare) {
    var elementType = {
      $$typeof: REACT_MEMO_TYPE,
      type: type,
      compare: compare === undefined ? null : compare
    };
    return elementType;
  }

  function lazyInitializer$1(payload) {
    return {
      $$typeof: REACT_BLOCK_TYPE,
      _data: payload.load.apply(null, payload.args),
      _render: payload.render
    };
  }

  function block(render, load) {
    if (load === undefined) {
      return function () {
        var blockComponent = {
          $$typeof: REACT_BLOCK_TYPE,
          _data: undefined,
          _render: render
        };
        return blockComponent;
      };
    }
    var loadFn = load;
    return function () {
      var args = arguments;
      var payload = {
        load: loadFn,
        args: args,
        render: render
      };
      var lazyType = {
        $$typeof: REACT_LAZY_TYPE,
        _payload: payload,
        _init: lazyInitializer$1
      };
      return lazyType;
    };
  }

  function resolveDispatcher() {
    var dispatcher = ReactCurrentDispatcher.current;
    if (!(dispatcher !== null)) {
      {
        throw Error(formatProdErrorMessage(321));
      }
    }
    return dispatcher;
  }

  function useContext(Context, unstable_observedBits) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useContext(Context, unstable_observedBits);
  }

  function useState(initialState) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useState(initialState);
  }

  function useReducer(reducer, initialArg, init) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useReducer(reducer, initialArg, init);
  }

  function useRef(initialValue) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useRef(initialValue);
  }

  function useEffect(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useEffect(create, deps);
  }

  function useLayoutEffect(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useLayoutEffect(create, deps);
  }

  function useCallback(callback, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useCallback(callback, deps);
  }

  function useMemo(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useMemo(create, deps);
  }

  function useImperativeHandle(ref, create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useImperativeHandle(ref, create, deps);
  }

  function useDebugValue(value, formatterFn) { }

  function useTransition() {
    var dispatcher = resolveDispatcher();
    return dispatcher.useTransition();
  }

  function useDeferredValue(value) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useDeferredValue(value);
  }

  function useOpaqueIdentifier() {
    var dispatcher = resolveDispatcher();
    return dispatcher.useOpaqueIdentifier();
  }

  function useMutableSource(source, getSnapshot, subscribe) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useMutableSource(source, getSnapshot, subscribe);
  }

  function createMutableSource(source, getVersion) {
    var mutableSource = {
      _getVersion: getVersion,
      _source: source,
      _workInProgressVersionPrimary: null,
      _workInProgressVersionSecondary: null
    };
    return mutableSource;
  }
  var enableSchedulerDebugging = false;
  var enableProfiling = false;
  var requestHostCallback;
  var requestHostTimeout;
  var cancelHostTimeout;
  var shouldYieldToHost;
  var requestPaint;
  var getCurrentTime;
  var forceFrameRate;
  var hasPerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';
  if (hasPerformanceNow) {
    var localPerformance = performance;
    getCurrentTime = function () {
      return localPerformance.now();
    };
  } else {
    var localDate = Date;
    var initialTime = localDate.now();
    getCurrentTime = function () {
      return localDate.now() - initialTime;
    };
  } if (typeof window === 'undefined' || typeof MessageChannel !== 'function') {
    var _callback = null;
    var _timeoutID = null;
    var _flushCallback = function () {
      if (_callback !== null) {
        try {
          var currentTime = getCurrentTime();
          var hasRemainingTime = true;
          _callback(hasRemainingTime, currentTime);
          _callback = null;
        } catch (e) {
          setTimeout(_flushCallback, 0);
          throw e;
        }
      }
    };
    requestHostCallback = function (cb) {
      if (_callback !== null) {
        setTimeout(requestHostCallback, 0, cb);
      } else {
        _callback = cb;
        setTimeout(_flushCallback, 0);
      }
    };
    requestHostTimeout = function (cb, ms) {
      _timeoutID = setTimeout(cb, ms);
    };
    cancelHostTimeout = function () {
      clearTimeout(_timeoutID);
    };
    shouldYieldToHost = function () {
      return false;
    };
    requestPaint = forceFrameRate = function () { };
  } else {
    var _setTimeout = window.setTimeout;
    var _clearTimeout = window.clearTimeout;
    if (typeof console !== 'undefined') {
      var requestAnimationFrame = window.requestAnimationFrame;
      var cancelAnimationFrame = window.cancelAnimationFrame;
      if (typeof requestAnimationFrame !== 'function') {
        console['error']("This browser doesn't support requestAnimationFrame. " + 'Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills');
      }
      if (typeof cancelAnimationFrame !== 'function') {
        console['error']("This browser doesn't support cancelAnimationFrame. " + 'Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills');
      }
    }
    var isMessageLoopRunning = false;
    var scheduledHostCallback = null;
    var taskTimeoutID = -1;
    var yieldInterval = 5;
    var deadline = 0; {
      shouldYieldToHost = function () {
        return getCurrentTime() >= deadline;
      };
      requestPaint = function () { };
    }
    forceFrameRate = function (fps) {
      if (fps < 0 || fps > 125) {
        console['error']('forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported');
        return;
      }
      if (fps > 0) {
        yieldInterval = Math.floor(1000 / fps);
      } else {
        yieldInterval = 5;
      }
    };
    var performWorkUntilDeadline = function () {
      if (scheduledHostCallback !== null) {
        var currentTime = getCurrentTime();
        deadline = currentTime + yieldInterval;
        var hasTimeRemaining = true;
        try {
          var hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
          if (!hasMoreWork) {
            isMessageLoopRunning = false;
            scheduledHostCallback = null;
          } else {
            port.postMessage(null);
          }
        } catch (error) {
          port.postMessage(null);
          throw error;
        }
      } else {
        isMessageLoopRunning = false;
      }
    };
    var channel = new MessageChannel();
    var port = channel.port2;
    channel.port1.onmessage = performWorkUntilDeadline;
    requestHostCallback = function (callback) {
      scheduledHostCallback = callback;
      if (!isMessageLoopRunning) {
        isMessageLoopRunning = true;
        port.postMessage(null);
      }
    };
    requestHostTimeout = function (callback, ms) {
      taskTimeoutID = _setTimeout(function () {
        callback(getCurrentTime());
      }, ms);
    };
    cancelHostTimeout = function () {
      _clearTimeout(taskTimeoutID);
      taskTimeoutID = -1;
    };
  }

  function push(heap, node) {
    var index = heap.length;
    heap.push(node);
    siftUp(heap, node, index);
  }

  function peek(heap) {
    var first = heap[0];
    return first === undefined ? null : first;
  }

  function pop(heap) {
    var first = heap[0];
    if (first !== undefined) {
      var last = heap.pop();
      if (last !== first) {
        heap[0] = last;
        siftDown(heap, last, 0);
      }
      return first;
    } else {
      return null;
    }
  }

  function siftUp(heap, node, i) {
    var index = i;
    while (true) {
      var parentIndex = index - 1 >>> 1;
      var parent = heap[parentIndex];
      if (parent !== undefined && compare(parent, node) > 0) {
        heap[parentIndex] = node;
        heap[index] = parent;
        index = parentIndex;
      } else {
        return;
      }
    }
  }

  function siftDown(heap, node, i) {
    var index = i;
    var length = heap.length;
    while (index < length) {
      var leftIndex = (index + 1) * 2 - 1;
      var left = heap[leftIndex];
      var rightIndex = leftIndex + 1;
      var right = heap[rightIndex];
      if (left !== undefined && compare(left, node) < 0) {
        if (right !== undefined && compare(right, left) < 0) {
          heap[index] = right;
          heap[rightIndex] = node;
          index = rightIndex;
        } else {
          heap[index] = left;
          heap[leftIndex] = node;
          index = leftIndex;
        }
      } else if (right !== undefined && compare(right, node) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        return;
      }
    }
  }

  function compare(a, b) {
    var diff = a.sortIndex - b.sortIndex;
    return diff !== 0 ? diff : a.id - b.id;
  }
  var ImmediatePriority = 1;
  var UserBlockingPriority = 2;
  var NormalPriority = 3;
  var LowPriority = 4;
  var IdlePriority = 5;

  function markTaskErrored(task, ms) { }
  var maxSigned31BitInt = 1073741823;
  var IMMEDIATE_PRIORITY_TIMEOUT = -1;
  var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
  var NORMAL_PRIORITY_TIMEOUT = 5000;
  var LOW_PRIORITY_TIMEOUT = 10000;
  var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt;
  var taskQueue = [];
  var timerQueue = [];
  var taskIdCounter = 1;
  var currentTask = null;
  var currentPriorityLevel = NormalPriority;
  var isPerformingWork = false;
  var isHostCallbackScheduled = false;
  var isHostTimeoutScheduled = false;

  function advanceTimers(currentTime) {
    var timer = peek(timerQueue);
    while (timer !== null) {
      if (timer.callback === null) {
        pop(timerQueue);
      } else if (timer.startTime <= currentTime) {
        pop(timerQueue);
        timer.sortIndex = timer.expirationTime;
        push(taskQueue, timer);
      } else {
        return;
      }
      timer = peek(timerQueue);
    }
  }

  function handleTimeout(currentTime) {
    isHostTimeoutScheduled = false;
    advanceTimers(currentTime);
    if (!isHostCallbackScheduled) {
      if (peek(taskQueue) !== null) {
        isHostCallbackScheduled = true;
        requestHostCallback(flushWork);
      } else {
        var firstTimer = peek(timerQueue);
        if (firstTimer !== null) {
          requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
      }
    }
  }

  function flushWork(hasTimeRemaining, initialTime) {
    isHostCallbackScheduled = false;
    if (isHostTimeoutScheduled) {
      isHostTimeoutScheduled = false;
      cancelHostTimeout();
    }
    isPerformingWork = true;
    var previousPriorityLevel = currentPriorityLevel;
    try {
      if (enableProfiling) {
        try {
          return workLoop(hasTimeRemaining, initialTime);
        } catch (error) {
          if (currentTask !== null) {
            var currentTime = getCurrentTime();
            markTaskErrored(currentTask, currentTime);
            currentTask.isQueued = false;
          }
          throw error;
        }
      } else {
        return workLoop(hasTimeRemaining, initialTime);
      }
    } finally {
      currentTask = null;
      currentPriorityLevel = previousPriorityLevel;
      isPerformingWork = false;
    }
  }

  function workLoop(hasTimeRemaining, initialTime) {
    var currentTime = initialTime;
    advanceTimers(currentTime);
    currentTask = peek(taskQueue);
    while (currentTask !== null && !(enableSchedulerDebugging)) {
      if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
        break;
      }
      var callback = currentTask.callback;
      if (typeof callback === 'function') {
        currentTask.callback = null;
        currentPriorityLevel = currentTask.priorityLevel;
        var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
        var continuationCallback = callback(didUserCallbackTimeout);
        currentTime = getCurrentTime();
        if (typeof continuationCallback === 'function') {
          currentTask.callback = continuationCallback;
        } else {
          if (currentTask === peek(taskQueue)) {
            pop(taskQueue);
          }
        }
        advanceTimers(currentTime);
      } else {
        pop(taskQueue);
      }
      currentTask = peek(taskQueue);
    }
    if (currentTask !== null) {
      return true;
    } else {
      var firstTimer = peek(timerQueue);
      if (firstTimer !== null) {
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
      }
      return false;
    }
  }

  function unstable_runWithPriority(priorityLevel, eventHandler) {
    switch (priorityLevel) {
      case ImmediatePriority:
      case UserBlockingPriority:
      case NormalPriority:
      case LowPriority:
      case IdlePriority:
        break;
      default:
        priorityLevel = NormalPriority;
    }
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;
    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  }

  function unstable_next(eventHandler) {
    var priorityLevel;
    switch (currentPriorityLevel) {
      case ImmediatePriority:
      case UserBlockingPriority:
      case NormalPriority:
        priorityLevel = NormalPriority;
        break;
      default:
        priorityLevel = currentPriorityLevel;
        break;
    }
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;
    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  }

  function unstable_wrapCallback(callback) {
    var parentPriorityLevel = currentPriorityLevel;
    return function () {
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = parentPriorityLevel;
      try {
        return callback.apply(this, arguments);
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
  }

  function unstable_scheduleCallback(priorityLevel, callback, options) {
    var currentTime = getCurrentTime();
    var startTime;
    if (typeof options === 'object' && options !== null) {
      var delay = options.delay;
      if (typeof delay === 'number' && delay > 0) {
        startTime = currentTime + delay
      } else {
        startTime = currentTime
      }
    } else {
      startTime = currentTime
    }
    var timeout;
    switch (priorityLevel) {
      case ImmediatePriority:
        timeout = IMMEDIATE_PRIORITY_TIMEOUT;
        break;
      case UserBlockingPriority:
        timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
        break;
      case IdlePriority:
        timeout = IDLE_PRIORITY_TIMEOUT;
        break;
      case LowPriority:
        timeout = LOW_PRIORITY_TIMEOUT;
        break;
      case NormalPriority:
      default:
        timeout = NORMAL_PRIORITY_TIMEOUT;
        break
    }
    var expirationTime = startTime + timeout;
    var newTask = {
      id: taskIdCounter++,
      callback: callback,
      priorityLevel: priorityLevel,
      startTime: startTime,
      expirationTime: expirationTime,
      sortIndex: -1
    };
    if (startTime > currentTime) {
      newTask.sortIndex = startTime;
      push(timerQueue, newTask);
      if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
        if (isHostTimeoutScheduled) {
          cancelHostTimeout()
        } else {
          isHostTimeoutScheduled = true
        }
        requestHostTimeout(handleTimeout, startTime - currentTime)
      }
    } else {
      newTask.sortIndex = expirationTime;
      push(taskQueue, newTask);
      if (!isHostCallbackScheduled && !isPerformingWork) {
        isHostCallbackScheduled = true;
        requestHostCallback(flushWork)
      }
    }
    return newTask
  }

  function unstable_pauseExecution() { }

  function unstable_continueExecution() {
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork)
    }
  }

  function unstable_getFirstCallbackNode() {
    return peek(taskQueue)
  }

  function unstable_cancelCallback(task) {
    task.callback = null
  }

  function unstable_getCurrentPriorityLevel() {
    return currentPriorityLevel
  }
  var unstable_requestPaint = requestPaint;
  var unstable_Profiling = null;
  var Scheduler = Object.freeze({
    __proto__: null,
    unstable_ImmediatePriority: ImmediatePriority,
    unstable_UserBlockingPriority: UserBlockingPriority,
    unstable_NormalPriority: NormalPriority,
    unstable_IdlePriority: IdlePriority,
    unstable_LowPriority: LowPriority,
    unstable_runWithPriority: unstable_runWithPriority,
    unstable_next: unstable_next,
    unstable_scheduleCallback: unstable_scheduleCallback,
    unstable_cancelCallback: unstable_cancelCallback,
    unstable_wrapCallback: unstable_wrapCallback,
    unstable_getCurrentPriorityLevel: unstable_getCurrentPriorityLevel,
    get unstable_shouldYield() {
      return shouldYieldToHost
    },
    unstable_requestPaint: unstable_requestPaint,
    unstable_continueExecution: unstable_continueExecution,
    unstable_pauseExecution: unstable_pauseExecution,
    unstable_getFirstCallbackNode: unstable_getFirstCallbackNode,
    get unstable_now() {
      return getCurrentTime
    },
    get unstable_forceFrameRate() {
      return forceFrameRate
    },
    unstable_Profiling: unstable_Profiling
  });
  var DEFAULT_THREAD_ID = 0;
  var interactionIDCounter = 0;
  var threadIDCounter = 0;
  var interactionsRef = null;
  var subscriberRef = null; {
    interactionsRef = {
      current: new Set()
    };
    subscriberRef = {
      current: null
    }
  }

  function unstable_clear(callback) {
    var prevInteractions = interactionsRef.current;
    interactionsRef.current = new Set();
    try {
      return callback()
    } finally {
      interactionsRef.current = prevInteractions
    }
  }

  function unstable_getCurrent() {
    {
      return interactionsRef.current
    }
  }

  function unstable_getThreadID() {
    return ++threadIDCounter
  }

  function unstable_trace(name, timestamp, callback) {
    var threadID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_THREAD_ID;
    var interaction = {
      __count: 1,
      id: interactionIDCounter++,
      name: name,
      timestamp: timestamp
    };
    var prevInteractions = interactionsRef.current;
    var interactions = new Set(prevInteractions);
    interactions.add(interaction);
    interactionsRef.current = interactions;
    var subscriber = subscriberRef.current;
    var returnValue;
    try {
      if (subscriber !== null) {
        subscriber.onInteractionTraced(interaction)
      }
    } finally {
      try {
        if (subscriber !== null) {
          subscriber.onWorkStarted(interactions, threadID)
        }
      } finally {
        try {
          returnValue = callback()
        } finally {
          interactionsRef.current = prevInteractions;
          try {
            if (subscriber !== null) {
              subscriber.onWorkStopped(interactions, threadID)
            }
          } finally {
            interaction.__count--;
            if (subscriber !== null && interaction.__count === 0) {
              subscriber.onInteractionScheduledWorkCompleted(interaction)
            }
          }
        }
      }
    }
    return returnValue
  }

  function unstable_wrap(callback) {
    var threadID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_THREAD_ID;
    var wrappedInteractions = interactionsRef.current;
    var subscriber = subscriberRef.current;
    if (subscriber !== null) {
      subscriber.onWorkScheduled(wrappedInteractions, threadID)
    }
    wrappedInteractions.forEach(function (interaction) {
      interaction.__count++
    });
    var hasRun = false;

    function wrapped() {
      var prevInteractions = interactionsRef.current;
      interactionsRef.current = wrappedInteractions;
      subscriber = subscriberRef.current;
      try {
        var returnValue;
        try {
          if (subscriber !== null) {
            subscriber.onWorkStarted(wrappedInteractions, threadID)
          }
        } finally {
          try {
            returnValue = callback.apply(undefined, arguments)
          } finally {
            interactionsRef.current = prevInteractions;
            if (subscriber !== null) {
              subscriber.onWorkStopped(wrappedInteractions, threadID)
            }
          }
        }
        return returnValue
      } finally {
        if (!hasRun) {
          hasRun = true;
          wrappedInteractions.forEach(function (interaction) {
            interaction.__count--;
            if (subscriber !== null && interaction.__count === 0) {
              subscriber.onInteractionScheduledWorkCompleted(interaction)
            }
          })
        }
      }
    }
    wrapped.cancel = function cancel() {
      subscriber = subscriberRef.current;
      try {
        if (subscriber !== null) {
          subscriber.onWorkCanceled(wrappedInteractions, threadID)
        }
      } finally {
        wrappedInteractions.forEach(function (interaction) {
          interaction.__count--;
          if (subscriber && interaction.__count === 0) {
            subscriber.onInteractionScheduledWorkCompleted(interaction)
          }
        })
      }
    };
    return wrapped
  }
  var subscribers = null; {
    subscribers = new Set()
  }

  function unstable_subscribe(subscriber) {
    {
      subscribers.add(subscriber);
      if (subscribers.size === 1) {
        subscriberRef.current = {
          onInteractionScheduledWorkCompleted: onInteractionScheduledWorkCompleted,
          onInteractionTraced: onInteractionTraced,
          onWorkCanceled: onWorkCanceled,
          onWorkScheduled: onWorkScheduled,
          onWorkStarted: onWorkStarted,
          onWorkStopped: onWorkStopped
        }
      }
    }
  }

  function unstable_unsubscribe(subscriber) {
    {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        subscriberRef.current = null
      }
    }
  }

  function onInteractionTraced(interaction) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onInteractionTraced(interaction)
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }

  function onInteractionScheduledWorkCompleted(interaction) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onInteractionScheduledWorkCompleted(interaction)
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkScheduled(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkScheduled(interactions, threadID)
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkStarted(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkStarted(interactions, threadID)
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkStopped(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkStopped(interactions, threadID)
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkCanceled(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkCanceled(interactions, threadID)
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }
  var SchedulerTracing = Object.freeze({
    __proto__: null,
    get __interactionsRef() {
      return interactionsRef
    },
    get __subscriberRef() {
      return subscriberRef
    },
    unstable_clear: unstable_clear,
    unstable_getCurrent: unstable_getCurrent,
    unstable_getThreadID: unstable_getThreadID,
    unstable_trace: unstable_trace,
    unstable_wrap: unstable_wrap,
    unstable_subscribe: unstable_subscribe,
    unstable_unsubscribe: unstable_unsubscribe
  });
  var ReactSharedInternals = {
    ReactCurrentDispatcher: ReactCurrentDispatcher,
    ReactCurrentOwner: ReactCurrentOwner,
    IsSomeRendererActing: IsSomeRendererActing,
    ReactCurrentBatchConfig: ReactCurrentBatchConfig,
    assign: assign,
    Scheduler: Scheduler,
    SchedulerTracing: SchedulerTracing
  };

  function startTransition(scope) {
    var prevTransition = ReactCurrentBatchConfig.transition;
    ReactCurrentBatchConfig.transition = 1;
    try {
      scope()
    } finally {
      ReactCurrentBatchConfig.transition = prevTransition
    }
  }
  var createElement$1 = createElement;
  var cloneElement$1 = cloneElement;
  var createFactory$1 = createFactory;
  var Children = {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  };
  exports.Children = Children;
  exports.Component = Component;
  exports.PureComponent = PureComponent;
  exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
  exports.cloneElement = cloneElement$1;
  exports.createContext = createContext;
  exports.createElement = createElement$1;
  exports.createFactory = createFactory$1;
  exports.createRef = createRef;
  exports.forwardRef = forwardRef;
  exports.isValidElement = isValidElement;
  exports.lazy = lazy;
  exports.memo = memo;
  exports.unstable_block = block;
  exports.unstable_createMutableSource = createMutableSource;
  exports.unstable_startTransition = startTransition;
  exports.unstable_useDeferredValue = useDeferredValue;
  exports.unstable_useMutableSource = useMutableSource;
  exports.unstable_useOpaqueIdentifier = useOpaqueIdentifier;
  exports.unstable_useTransition = useTransition;
  exports.useCallback = useCallback;
  exports.useContext = useContext;
  exports.useDebugValue = useDebugValue;
  exports.useEffect = useEffect;
  exports.useImperativeHandle = useImperativeHandle;
  exports.useLayoutEffect = useLayoutEffect;
  exports.useMemo = useMemo;
  exports.useReducer = useReducer;
  exports.useRef = useRef;
  exports.useState = useState;
  exports.version = ReactVersion
})));