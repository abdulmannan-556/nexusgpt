export default function ChatMessage({ role, text }) {
  return (
    <div className={`msg ${role}`}>
      <strong>{role === "user" ? "You" : "NexusGPT"}:</strong> {text}
    </div>
  );
}
