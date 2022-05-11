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
