// reducers/index.js
import { combineReducers } from "redux";
import conversationReducer from "./conversationReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
  conversations: conversationReducer,
  messages: messageReducer,
});

export default rootReducer;
