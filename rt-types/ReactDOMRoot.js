/*   ReactDOMLegacy  or  ReactDOMRoot */

type isValidContainer = (Element) = > boolean;
type container = {
    type: 1 | 9 | 11
}
type container = {
    type: 8,
    nodeValue: " react-mount-point-unstable "
}


type isContainerMarkedAsRoot = (Element) = > boolean;
type container<T> = {
    '__reactContainer$' + randomKey: T
}


type isModernRoot = boolean;
// isModernRoot 成立的条件需要达成下面的对象判断
type container<T, C> = {
    '__reactContainer$' + randomKey: T,
    _reactRootContainer: C
}



/*   ReactDOMLegacy */
type topLevelUpdateWarnings = (Element) = > void;
// ReactDOMLegacy让控制台打印警告的对象
type container<C, F, D> = {
    _reactRootContainer: C,
    nodeType: !8, // not equal 8
}
type container1 = {
    firstChild: {
        internalInstanceKey?: {
            tag: 5 | 6 | 13 | 3
        },
        internalContainerInstanceKey?: {
            tag: 5 | 6 | 13 | 3
        }
    },
}
type container2 = {
    nodeType: 1,
    tagName: 'body' | "BODY"
}


type warnOnInvalidCallback = (callback: mixed, callerName: string): void => {
    if (callback !== undefined && callback != null && typeof callback != "function") {
        do
    }
};

type shouldHydrateDueToLegacyHeuristic = (Element) => boolean;
type container = {
    nodeType: 1,
    "data-reactroot",
}

type getReactRootElementInContainer = (Element) => Element;
type container = document | { firstChild }

type _reactRootContainer;
type root = _reactRootContainer = {
    _internalRoot: FiberRootNode,
        render,
        unmount
}