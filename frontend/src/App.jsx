import useStreamingChat from "./hooks/useStreamingChat";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

function App() {

  const {
    messages,
    isStreaming,
    error,
    sendMessage,
    cancel
  } = useStreamingChat();

  return (

    <div style={{
      width: "600px",
      margin: "auto",
      marginTop: "50px",
      fontFamily: "Arial"
    }}>

      <h2>Autonomous Frontend Studio</h2>

      <ChatWindow
        messages={messages}
        isStreaming={isStreaming}
      />

      {error && (
        <div style={{ color: "red" }}>
          {error}
        </div>
      )}

      <ChatInput
        onSend={sendMessage}
        onCancel={cancel}
        isStreaming={isStreaming}
      />

    </div>

  );
}

export default App;
