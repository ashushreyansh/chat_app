// ConversationView.jsx

import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../../reducers/messageReducer";
import { updateLastMessage } from "../../reducers/conversationReducer";
import { v4 as uuidv4 } from "uuid";
import "./conversationViewer.css";

function ConversationView() {
  const { id } = useParams();
  const [messageInput, setMessageInput] = useState("");
  const [notification, setNotification] = useState(null);
  const allMessages = useSelector((state) => state.messages.messages);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const messages = useMemo(() => {
    return allMessages.filter(
      (message) => message.conversationId === parseInt(id)
    );
  }, [allMessages, id]);

  const handleMessageChange = (event) => {
    setMessageInput(event.target.value);
  };

  const sendMessage = () => {
    if (messageInput.trim() === "") {
      setNotification("Please enter a message.");
      return;
    }

    const newMessage = {
      id: uuidv4(),
      text: messageInput,
      timestamp: new Date().toISOString(),
      conversationId: parseInt(id),
    };

    dispatch(addMessage({ conversationId: parseInt(id), message: newMessage }));
    dispatch(
      updateLastMessage({
        conversationId: parseInt(id),
        lastMessage: newMessage.text,
      })
    );

    setMessageInput("");
    setNotification("Message sent successfully.");
  };

  const goBack = () => {
    navigate(-1); // Navigate back to previous page
  };

  return (
    <div className="conversation-view">
      <div className="conversation-header">
        <h2>Conversation</h2>
        <button className="back-button" onClick={goBack}>
          Back
        </button>
      </div>
      <div className="message-container">
        <ul className="message-list">
          {messages.map((message) => (
            <li key={message.id} className="message-bubble">
              {message.text}
            </li>
          ))}
        </ul>
        <div className="message-input-container">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageInput}
            onChange={handleMessageChange}
            className="message-input"
          />
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        </div>
        {notification && <p className="notification">{notification}</p>}
      </div>
    </div>
  );
}

export default ConversationView;
