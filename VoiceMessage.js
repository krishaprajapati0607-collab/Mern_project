import React, { useState, useRef } from "react";

export default function VoiceMessage() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      chunks.current = [];
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      // 👉 Send blob to backend with fetch/axios if needed
    };
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>🎙️ Voice Message</h2>
      {recording ? (
        <button onClick={stopRecording}>⏹️ Stop</button>
      ) : (
        <button onClick={startRecording}>▶️ Record</button>
      )}
      {audioURL && (
        <div style={{ marginTop: "10px" }}>
          <audio src={audioURL} controls />
        </div>
      )}
    </div>
  );
}
