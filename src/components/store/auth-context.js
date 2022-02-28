import React, { useState, useEffect } from "react";

// this function takes a default state, ex can be a just a string. often it is an obj.
const AuthContext = React.createContext({
  isLoggedIn: false,
  // adding this make better IED autocmpletion
  onLogout: () => {},
  onLogin: (email, password) => {}
});

// The last code in the sequence, to refactor the authentication logic and context mgt and pull it out of the App.js:
// this will be a named export
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
// Step 1: provide the context. All compoenets that are wrapped by AuthContext will have access to it.
// Step 2: constume it, hook into it.
// we can consume it/ listen to it in two ways: AuthContext.Consumer or a React hook(typically hook).