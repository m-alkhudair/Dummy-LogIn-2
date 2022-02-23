import React from "react";

import AuthContext from "../store/auth-context";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  // The .Consumer function takes a child as a function
  // the ctx argument is the context data from auth-context.js
  // instead of props.isLoggedIn we put ctx.isLoggedIn
  return (
    <AuthContext.Consumer>
      {(ctx) => {
        return (
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
                  <button onClick={props.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navigation;
