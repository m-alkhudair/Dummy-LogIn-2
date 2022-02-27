import React, { useContext } from "react";

import AuthContext from "../store/auth-context";
import classes from "./Navigation.module.css";

// no need for props in Navigation anymore
const Navigation = () => {
  // The .Consumer function takes a child as a function
  // the ctx argument is the context data from auth-context.js
  // instead of props.isLoggedIn we put ctx.isLoggedIn


  // We can use the useContext hook insted of the consumer (more elegent):
  const ctx = useContext(AuthContext); // ctx will recieve the context value
  return (
    // <AuthContext.Consumer>
    //   {(ctx) => {
    //     return (
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={ctx.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        // );
    //   }}
    // </AuthContext.Consumer>
  );
};

export default Navigation;
