// LeftSidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addConversation } from "../../reducers/conversationReducer";
import data from "../../config/data.json";
import { RiCloseCircleLine } from "react-icons/ri"; // Importing close icon from react-icons
import "./leftsidebar.css";

function LeftSidebar() {
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const conversations = useSelector(
    (state) => state.conversations.conversations
  );

  const handleContactClick = (contactId, contactName) => {
    const existingConversation = conversations.find(
      (conv) => conv.contactId === contactId
    );

    if (!existingConversation) {
      const newConversation = {
        id: conversations.length + 1,
        contactId: contactId,
        contactName: contactName,
        lastMessage: "",
        messages: [],
      };

      dispatch(addConversation(newConversation));
    }
  };

  const handleCreateConversation = () => {
    setShowModal(true); // Show the modal when "Create Conversation" button is clicked
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.contactName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="left-sidebar">
      <div className="search-container">
        <h2 className="conversations-heading">Conversations</h2>
        <input
          type="text"
          className="search-bar"
          placeholder="Search contact..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="conversation-cards">
        {filteredConversations.map((conversation) => (
          <div className="conversation-card" key={conversation.id}>
            <Link to={`/conversation/${conversation.id}`}>
              <h3>{conversation.contactName}</h3>
              <p>{conversation.lastMessage}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className={`modal ${showModal ? "show" : ""}`}>
        <div className="modal-content">
          <span className="close" onClick={() => setShowModal(false)}>
            <RiCloseCircleLine />
          </span>
          <h2>Contacts</h2>
          <ul>
            {data.contacts.map((contact) => (
              <li
                key={contact.id}
                onClick={() => handleContactClick(contact.id, contact.name)}
              >
                {contact.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        className="create-conversation"
        onClick={handleCreateConversation}
      >
        Create Conversation
      </button>
    </div>
  );
}

export default LeftSidebar;
