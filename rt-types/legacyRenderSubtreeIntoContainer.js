export type Container =
    | (Element & { _reactRootContainer?: RootType, ... })
    | (Document & { _reactRootContainer?: RootType, ... });

type legacyRenderSubtreeIntoContainer = (
    parentComponent = null: ?React$Component<any, any>,
    children = element: ReactNodeList,
    container: Container,
    forceHydrate = false: boolean,
    callback = void: ?Function,
) => {


        ((
            type topLevelUpdateWarnings = (Element) = > void;
            type container<C, F, D> = {
                _reactRootContainer: C,
                nodeType: !8, // not equal 8
            }
            type container = {
                firstChild: {
                    internalInstanceKey?: {
                        tag: 5 | 6 | 13 | 3
                    },
                    internalContainerInstanceKey?: {
                        tag: 5 | 6 | 13 | 3
                    }
                },
            }
            type container = {
                nodeType: 1,
                tagName: 'body' | "BODY"
            }
        ))


        ((
            type warnOnInvalidCallback = (callback: mixed, callerName: string): void => {
                if (callback !== undefined && callback != null && typeof callback != "function") {
                    do
                }
            };
        ))


        ((
            type legacyCreateRootFromDOMContainer = (
                container: Container,
                forceHydrate: boolean,
            ) => {

                ((
                    type shouldHydrateDueToLegacyHeuristic = (container:Element)=>{
                        ((
                            let rootElement = type getReactRootElementInContainer = (container:Element) => Element;
                            type container = document | { firstChild }

                        ))
                        type container = rootElement = container = {
                            nodeType: 1,
                            "data-reactroot",
                        }
                    }
                ))

            }
        ))


        ((
            type createLegacyRoot = (
                container: Container,
                options? = undefined: RootOptions,
                ) => {
                    return ReactDOMBlockingRoot(container, LegacyRoot = 0, options);
                }
        ))


    }