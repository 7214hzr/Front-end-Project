import { useState } from "react";

export default function ChatInput({
  onSend,
  onCancel,
  isStreaming
}) {

  const [input, setInput] = useState("");

  const handleSend = () => {

    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (

    <div style={{ marginTop: "10px" }}>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "70%", padding: "8px" }}
      />

      <button
        onClick={handleSend}
        disabled={isStreaming}
      >
        Send
      </button>

      {isStreaming && (
        <button onClick={onCancel}>
          Cancel
        </button>
      )}

    </div>

  );
}
