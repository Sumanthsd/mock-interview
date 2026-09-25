const API = import.meta.env.VITE_API_BASE_URL || "";

export async function submitAttempt(payload) {
  try {
    const response = await fetch(`${API}/api/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("Submit failed");
    return await response.json();
  } catch (error) {
    console.warn("Shared Neon submission unavailable:", error.message);
    return null;
  }
}

export async function getAdminAttempts() {
  const response = await fetch(`${API}/api/attempts`);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch interview attempts");
  }
  return Array.isArray(data) ? data : [];
}
