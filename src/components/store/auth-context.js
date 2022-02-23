import React from 'react';

// this function takes a default state, ex can be a just a string. often it is an obj.
const AuthContext = React.createContext({
    isLoggedIn: false
});

export default AuthContext;
// Step 1: provide the context. All compoenets that are wrapped by AuthContext will have access to it.
// Step 2: constume it, hook into it.
// we can consume it/ listen to it in two ways: AuthContext.Consumer or a React hook(typically hook).