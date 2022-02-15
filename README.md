# Intro useReducer() for state management:
- Similar to useState() but with more capabilities.
- Best used for more complex states: multiple states, changing in multiple ways, or dependencies to other states.
- So useReducer() is a replacement to useState(), in case we need more powerful state management.
- However, it should replace useState() all the time, because since it is more powerful it requires more set up. Typically for the majority of our state management will probably use useState().

The very first example of this is in the last commit of the previous repo (Dummy-LogIn-Advanced-React-Features)

# Understanding useReducer():
> const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn)
- state: The state snapshot used in the component re-render/re-evaluation cycle.
- dispatchFn: A function that can be used to dispatch a new action (i.e. trigger an update of the state). This will be consumed by the reducerFn.
- reducerFn: 
        ```
        (prevState, action) => newState
        ```
        A function that is **triggered automatically** once an action is **dispatched** (via dispatchFn()) - it **receives the latest state snapshot** and **should return the new, updated state**. It is kind of like the an extended virsion of the function of the useState hook.
- initialState: The initial state.
- initFn: A function to set the initial state programmatically, incase the initial state is a bit more complex for example, in the case of Http request results.
