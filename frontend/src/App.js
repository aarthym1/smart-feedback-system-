import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedback on load
  useEffect(() => {
    axios.get("http://localhost:5000/api/feedback")
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error("Failed to fetch feedback", err));
  }, []);

  // Add new feedback locally after submit
  const handleNewFeedback = (newFb) => {
    setFeedbacks(prev => [newFb, ...prev]);
  };

  return (
    <div style={{ padding: 20 }}>
      <FeedbackForm onNewFeedback={handleNewFeedback} />
      <FeedbackList feedbacks={feedbacks} />
    </div>
  );
}

export default App;
