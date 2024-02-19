/* warnForMissingKey(child,returnFiber) */
// 第一个 if 条件：
var child = null;
var child = 123;
var child = "123";
var child = function () { }

// 过了第一个 if 条件后，接下来的数据中，child 就是一个 object 对象了
// 第二个 if 条件：
var child = {

}
var child = {
    _store: 0 | null | false | undefined
}
var child = {
    _store: {
        validated: true
    }
}
var child = {
    key: !null
}

// 过了第二个 if 条件之后，如果 child._store 不是对象，则会抛出异常

// 过了抛出异常之后，child._store 则确保是一个对象，并且 validated、key 两个属性都不存在

// 第三个 if 条件
// 如果抛出过错误，则成立



//------********************---------------------------**********************-------------------
/* coerceRef(returnFiber, current, element) */
// 第一个 if 条件
var element = {
    ref: 123
}
var element = {
    ref: "123"
}
var element = {
    ref: undefined
}

// 进入第一个 if 条件过后，element.ref 对象就不是 object 和 function 对象
    // 1-1 if 条件，line:121 ，
    var returnFiber = {
        mode: 1
    }
    // ---------------------------,element 有几种清空
    var element = {
        _self:false(boolean),
    }
    var element = {
        _owner:false(boolean),
    }
    var element = {
        _owner{
            stateNode:element._self
        },
        _self:{}
    }
    // 进入1-1条件后，element 就是一个含有 _self、_owner属性，或者含有之一，或者都没有的一个对象


// 第一个 if 条件过后，element 就是一个 object 或者 function 对象

// 第二个 if 条件  line:159
var element = {
    _owner:!false,
}

// 进入第二个 if 条件后，element._owner就是一个对象了
    //2-1 if 条件，line：164
    var element = {
        _owner:{
            tag:!1
        }
    }

    //2-2 if 条件，line：173
    var element = {
        _owner:{
            stateNode:false
        }
    }

    //2-3 if 条件，line：181
    var function name(){}
    name._stringRef = "abc";
    var element = {
        ref:"abc"
    }
    var current = {
        ref:name
    }

    // 如果 element.ref 的值和 current.ref._stringRef不相等的情况下，则进入了创建 ref 的阶段了

    

// 第三个 else 条件，直接报错  line：203
var element = {
    _owner:false
}



//------********************---------------------------**********************-------------------
/* throwOnInvalidObjectType(returnFiber, newChild) */
// 第一个 if 条件
var returnFiber = {
    type:!'textarea'
}



//------********************---------------------------**********************-------------------
/* warnOnFunctionType(returnFiber, newChild) */
// 直接报错


//------********************---------------------------**********************-------------------
/* resolveLazyType(LazyComponent) */  // line：256
var = LazyComponent = {
    _payload:{},
    init:function(_payload){xxxx}
}


//------********************---------------------------**********************-------------------
/* ChildReconciler(shouldTrackSideEffects) */  // line：274，这是一个很长的函数，会生成一个大闭包
var shouldTrackSideEffects = true;



//------********************---------------------------**********************-------------------
/* deleteChild(returnFiber,childToDelete) */  // line：274
var returnFiber = {
    deletions:null
}
var returnFiber = {
    deletions:[xxx]
}
// 执行过后，returnFiber.deletions 初始化为 数组


//------********************---------------------------**********************-------------------
/* deleteRemainingChildren(returnFiber,currentFirstChild) */  // line：289
var returnFiber = {
    deletions:null
}
var currentFirstChild = {
    sibling:{}|currentFirstChild
}
// 相当于提供一个数组，循环递归添加


//------********************---------------------------**********************-------------------
/* mapRemainingChildren(returnFiber,currentFirstChild) */  // line：308
var currentFirstChild = {
    key:?!null,
    index:any,
    sibling:{}|currentFirstChild
}


//------********************---------------------------**********************-------------------
/* useFiber(fiber,pendingProps) */  // line：329
//创建一个 fiber 的副本


//------********************---------------------------**********************-------------------
/* placeChild(newFiber,lastPlacedIndex,newIndex) */  // line：338
var newFiber = {
    alternate:{},
    index:number,
    flags:2:
}
// 对比新的 lastPlacedIndex 和 newFiber.alternate.index，然后更新 newFiber 的 flag ，后续根据 flags 来处理是插入，还是删除，或者不变{{ 主要针对循环时候，元素对应的列表 }}


//------********************---------------------------**********************-------------------
/* placeSingleChild(newFiber) */  // line：366
var newFiber = {
    alternate:null
}
// 只有一个子元素的处理方法，如果没有生成 newFiber.alternate ，则添加 flags 的标识



