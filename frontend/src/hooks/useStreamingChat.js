import { useState, useRef } from "react";

export default function useStreamingChat() {

  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);

  const controllerRef = useRef(null);

  const sendMessage = async (input) => {

    setError(null);

    const newMessages = [
      ...messages,
      { role: "user", content: input },
      { role: "assistant", content: "" }
    ];

    setMessages(newMessages);
    setIsStreaming(true);

    controllerRef.current = new AbortController();

    try {

      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        body: JSON.stringify({ message: input }),
        signal: controllerRef.current.signal
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let done = false;

      while (!done) {

        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        const chunk = decoder.decode(value);

        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].content += chunk;
          return updated;
        });
      }

    } catch (err) {

      if (err.name !== "AbortError") {
        setError("Streaming failed");
      }

    } finally {
      setIsStreaming(false);
    }
  };

  const cancel = () => {
    controllerRef.current?.abort();
    setIsStreaming(false);
  };

  return {
    messages,
    isStreaming,
    error,
    sendMessage,
    cancel
  };
}
