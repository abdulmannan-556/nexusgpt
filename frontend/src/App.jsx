import { useState } from "react";
import ChatMessage from "./ChatMessage.jsx";
import { sendMessage } from "./api.js";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("gpt-4o-mini");

  const handleSend = async () => {
    if (!input.trim()) return;

    const history = messages.map(m => ({
      role: m.role,
      content: m.text
    }));

    setMessages([...messages, { role: "user", text: input }]);
    setInput("");

    const res = await sendMessage(input, history, model);

    setMessages(prev => [
      ...prev,
      { role: "assistant", text: res.reply }
    ]);
  };

  return (
    <div className="chat-app">
      <h1>NexusGPT</h1>

      {/* Model selector */}
      <div>
        <label>Choose model: </label>
        <select
          value={model}
          onChange={e => setModel(e.target.value)}
        >
          <option value="gpt-4o-mini">gpt-4o-mini</option>
          <option value="gpt-4o">gpt-4o</option>
          <option value="gpt-4o-research-preview">gpt-4o-research-preview</option>
        </select>
      </div>

      <div className="messages">
        {messages.map((m, i) => (
          <ChatMessage key={i} role={m.role} text={m.text} />
        ))}
      </div>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSend()}
        placeholder="Ask NexusGPT..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
