export default function Message({ role, content }) {

  const isUser = role === "user";

  return (

    <div style={{
      textAlign: isUser ? "right" : "left",
      margin: "8px"
    }}>

      <span style={{
        padding: "8px",
        background: isUser ? "#007bff" : "#e5e5ea",
        color: isUser ? "white" : "black",
        borderRadius: "8px",
        display: "inline-block"
      }}>
        {content}
      </span>

    </div>

  );
}
