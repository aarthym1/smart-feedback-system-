import React from "react";

function FeedbackList({ feedbacks }) {
  if (!feedbacks.length) return <p>No feedback submitted yet.</p>;

  return (
    <div style={styles.list}>
      {feedbacks.map((fb) => (
        <div key={fb._id || fb.id} style={styles.card}>
          <h3 style={styles.name}>{fb.name}</h3>
          <p><strong>Email:</strong> {fb.email}</p>
          <p><strong>Rating:</strong> {fb.rating} / 5</p>
          <p><strong>Message:</strong></p>
          <p style={styles.message}>{fb.message}</p>
        </div>
      ))}
    </div>
  );
}

export default FeedbackList;

const styles = {
  list: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    border: "1px solid #ddd",
  },
  name: {
    marginBottom: "8px",
    color: "#333",
  },
  message: {
    marginTop: "5px",
    whiteSpace: "pre-wrap", // preserves line breaks if any
    color: "#555",
  }
};
