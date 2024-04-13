import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftSidebar from "./components/leftSidebar/leftSidebar";
import ConversationView from "./components/conversationViewer/conversationViewer";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<LeftSidebar />} />
          <Route path="/conversation/:id" element={<ConversationView />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
