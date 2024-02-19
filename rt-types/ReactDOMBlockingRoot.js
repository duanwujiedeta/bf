type RootOptions = {
    hydrate?: boolean,
    hydrationOptions?: {
        onHydrated?: (suspenseNode: Comment) => void,
        onDeleted?: (suspenseNode: Comment) => void,
        mutableSources?: Array<MutableSource<any>>,
      ...
    },
    ...
};
type FiberRoot = {
    ...BaseFiberRootProperties,
    ...ProfilingOnlyFiberRootProperties,
    ...SuspenseCallbackOnlyFiberRootProperties,
    ...
};
type ReactDOMBlockingRoot = (
    container: Container,
    tag: RootTag = 1 | 2 | 3,
    options: void | RootOptions,
) => {


    ((
        type _internalRoot = type createRootImpl = (
            container: Container,
            tag: RootTag,
            options: void | RootOptions
        ) => {

            ((
                type OpaqueRoot = _internalRoot = createContainer = (
                    containerInfo: Container,
                    tag: RootTag,
                    hydrate: boolean,
                    hydrationCallbacks: null | SuspenseHydrationCallbacks,
                ) => {

                    ((

                        type createFiberRoot = (
                            containerInfo: any,
                            tag: RootTag,
                            hydrate: boolean,
                            hydrationCallbacks: null | SuspenseHydrationCallbacks,
                        ) => {

                            type root = FiberRoot
                            ((
                                root = new FiberRootNode = {
                                    current:createHostRootFiber = (tag) => FiberRoot
                                };
                            ))

                        }

                    ))

                }
            ))
    
            };
    ))

        type RootType = {
            render,
            unmount,
            _internalRoot = OpaqueRoot: root
        }
        return RootType;


    }