// conversationReducer.js

import { createSlice } from "@reduxjs/toolkit";
import data from "../config/data.json";

const initialState = {
  conversations: data.conversations,
};

const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation(state, action) {
      console.log(action.payload);
      state.conversations.push(action.payload);
    },
    updateLastMessage(state, action) {
      const { conversationId, lastMessage } = action.payload;
      const conversation = state.conversations.find(
        (conv) => conv.id === conversationId
      );
      if (conversation) {
        conversation.lastMessage = lastMessage;
      }
    },
  },
});

export const { addConversation, updateLastMessage } = conversationSlice.actions;
export default conversationSlice.reducer;
