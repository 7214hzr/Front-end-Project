import Message from "./Message";

export default function ChatWindow({ messages, isStreaming }) {

  return (

    <div style={{
      border: "1px solid #ccc",
      height: "400px",
      overflowY: "auto",
      padding: "10px"
    }}>

      {messages.map((msg, index) => (
        <Message
          key={index}
          role={msg.role}
          content={msg.content}
        />
      ))}

      {isStreaming && (
        <div>Streaming...</div>
      )}

    </div>

  );
}
