const API = import.meta.env.VITE_API_BASE_URL || "";

export async function submitAttempt(payload) {
  try {
    const response = await fetch(`${API}/api/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Submit failed");
    return data;
  } catch (error) {
    console.warn("Shared Neon submission unavailable:", error.message);
    return null;
  }
}

export async function getAdminAttempts() {
  const response = await fetch(`${API}/api/attempts`);
  const responseText = await response.text();
  let data = {};
  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch {
    data = { detail: responseText.slice(0, 200) };
  }
  if (!response.ok) {
    throw new Error([data.error, data.detail, `HTTP ${response.status}`].filter(Boolean).join(": ") || "Failed to fetch interview attempts");
  }
  return Array.isArray(data) ? data : [];
}
