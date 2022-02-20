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

# useState() vs useReducer():
Generally, you'll know when you need to use useReducer(). Example: when using useState() becomes cumbersome or you're getting lots of bugs/unintended behavior. Mainly, dealing with a lot of state snapshots that are kind of independent and we need to update them together ...etc.
### useState():
- The mains state management "tool". You start off by using it and it's often all you need.
- Great for independent pieces of state/data.
- Great if state updates are easy and limited to a few kinds of updates. example: if we don't have a lot of different cases that will change the state, especially if we don't have an object as a state or anything like that.
### useReducer():
- If we do have an object as a state or a more complex state.
- Great if we need "more power". (more complex state logic where w gaurantee to work with the latest state snapshot and move that complex out of the component body into a reducer function).
- Should be considered if we have related pieces of state/date.
- Can be helpful if we have more complex state updates. and differnt cases and actions that can change a state.

Sometime we can use useState() on complex state management especially when combined with useEffect(), like in the LogIn.js code.