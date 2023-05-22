import { createStore } from "redux";

const login = (state = { isLogin: false }, action) => {
  switch (action.type) {
    case "login":
      return {
        isLogin: true,
      };
    case "logout":
      return {
        isLogin: false,
      };
    default:
      return state;
  }
};

const store = createStore(login);

export default store;
