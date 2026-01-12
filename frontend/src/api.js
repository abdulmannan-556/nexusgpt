const WORKER_URL = "https://nexusgpt-worker.abdulmmm556.workers.dev/";
const WORKER_SECRET = "nexusgpt_worker_secret_x9A7QmP2Z!2026";

export async function sendMessage(message, history, model = "gpt-4o-mini") {
  const res = await fetch(WORKER_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${WORKER_SECRET}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message, history, model })
  });
  return res.json();
}
