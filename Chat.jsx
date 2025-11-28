import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    socket.emit("sendMessage", { message });
    setMessage("");
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center" }}>💬 Consult a Doctor (Chat)</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={msg.sender === "You" ? styles.userMsg : styles.docMsg}
          >
            <strong>{msg.sender}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <div style={styles.inputBox}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fff",
    padding: "15px",
  },
  chatBox: {
    height: "400px",
    overflowY: "auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
  },
  inputBox: { display: "flex", gap: "10px" },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "10px 15px",
    cursor: "pointer",
  },
  userMsg: {
    backgroundColor: "#DCF8C6",
    margin: "5px 0",
    padding: "8px",
    borderRadius: "8px",
    textAlign: "right",
  },
  docMsg: {
    backgroundColor: "#E9E9EB",
    margin: "5px 0",
    padding: "8px",
    borderRadius: "8px",
    textAlign: "left",
  },
};
