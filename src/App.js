import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./components/store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    // Becaue we want AuthContext to be accesses everywhere we'll wrap the app component with it. if we wanted it in only one component down the tree it will be there instead. note the syntax. we dont really need fragment anymore.
    // <React.Fragment>
    // technically you dont need .Provider if you have a default value stored in AuthContext, but this pattern should memorized.
    // The value prop is built-in, must be used in the case of a default value or else it will crash.
    // Also now we are able to change the object through state in the app component and it will be passed to every consuming component.
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler
      }}
      // Note: we are only using context in specific situation, like in the case of props being forwarded through a component that doesn't use it. In most other cases we use props.
    >
      <MainHeader 
      // isAuthenticated={isLoggedIn} we dont need anymore since we have AuthContext, no need to pass props for this purpose
      onLogout={logoutHandler} 
      />
      <main>
        {/* Here we don't use contex because we directly use these props in the Login and Home compoenents */}
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
    // </React.Fragment>
  );
}

export default App;
