import { createStore } from "redux";

const loginStore = (state = { user: {}, isLogin: false }, action) => {
  switch (action.type) {
    case "login":
      return {
        user: { ...action.payload },
        isLogin: true,
      };
    case "logout":
      return {
        user: {},
        isLogin: false,
      };
    default:
      return state;
  }
};

const store = createStore(loginStore);

export default store;
