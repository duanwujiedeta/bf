export type Container =
  | (Element & {_reactRootContainer?: RootType, ...})
  | (Document & {_reactRootContainer?: RootType, ...});
  
type render = (element: React$Element<any>, container: Container, callback: ?Function) => {

    ((
        type isValidContainer = (container) => boolean;
        type container = {
            type: 1 | 9 | 11
        }
        type container = {
            type: 8,
            nodeValue: " react-mount-point-unstable "
        }
    ))


    ((
        type isContainerMarkedAsRoot = (Element) = > boolean;
        type container<T> = {
            '__reactContainer$' + randomKey: T
        }
    ))


    ((
        type isModernRoot = boolean;
        type container = {
        '__reactContainer$' + randomKey: T | isContainerMarkedAsRoot(container),
        _reactRootContainer: C
        }
    ))


    ((
        legacyRenderSubtreeIntoContainer = (
            parentComponent: ?React$Component<any, any>,
            children: ReactNodeList,
            container: Container,
            forceHydrate: boolean,
            callback: ?Function,
          ) => {

          }
    ))

}