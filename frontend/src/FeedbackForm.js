import axios from "axios";
import { useState } from "react";

function FeedbackForm({ onNewFeedback }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: ""
  });

  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/feedback",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      // Backend must return the saved feedback object for this to work
      if (onNewFeedback && res.data) {
        onNewFeedback(res.data);
      }

      setStatus("✅ Feedback submitted successfully!");

      setForm({
        name: "",
        email: "",
        message: "",
        rating: ""
      });

    } catch (error) {
      console.error("Axios error:", error.response || error.message);
      let errorMsg = "❌ Unable to submit feedback";
      if (error.response && error.response.data && error.response.data.message) {
        errorMsg += `: ${error.response.data.message}`;
      }
      setStatus(errorMsg);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Smart Feedback System</h2>

        <form onSubmit={submit}>
          <div style={styles.field}>
            <label>Name</label>
            <input
              style={styles.input}
              value={form.name}
              required
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div style={styles.field}>
            <label>Email</label>
            <input
              type="email"
              style={styles.input}
              value={form.email}
              required
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div style={styles.field}>
            <label>Message</label>
            <textarea
              style={styles.textarea}
              value={form.message}
              required
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />
          </div>

          <div style={styles.field}>
            <label>Rating (1–5)</label>
            <input
              type="number"
              min="1"
              max="5"
              style={styles.input}
              value={form.rating}
              required
              onChange={(e) =>
                setForm({ ...form, rating: e.target.value })
              }
            />
          </div>

          <button style={styles.button} type="submit">
            Submit Feedback
          </button>
        </form>

        {status && <p style={styles.status}>{status}</p>}
      </div>
    </div>
  );
}

export default FeedbackForm;

/* ---------- STYLES ---------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "#fff",
    padding: "30px",
    width: "360px",
    borderRadius: "14px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "none"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  },
  status: {
    marginTop: "15px",
    textAlign: "center",
    fontWeight: "bold"
  }
};
