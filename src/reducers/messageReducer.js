// messageSlice.js

import { createSlice } from "@reduxjs/toolkit";
import data from "../config/data.json";

const initialMessages = data.conversations.flatMap((conversation) =>
  conversation.messages.map((message) => ({
    ...message,
    conversationId: conversation.id,
  }))
);

const initialState = {
  messages: initialMessages,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action) {
      console.log(action.payload.message);
      state.messages.push({
        ...action.payload.message,
        conversationId: action.payload.conversationId,
      });
    },
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
