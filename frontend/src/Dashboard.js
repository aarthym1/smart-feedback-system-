import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/feedback")
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Feedback Dashboard</h2>
      {feedbacks.map((f, i) => (
        <div key={i}>
          <p><b>{f.name}</b>: {f.message}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
