const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://kaasibackendapi.globalrefrigeration.co.in/api/public"
).replace(/\/+$/, "");

async function request(path, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.success === false) {
      throw new Error(result.message || `Request failed with status ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error("API request failed:", {
      url: `${API_BASE_URL}${path}`,
      message: error.message,
    });

    throw new Error(
      error.message === "Failed to fetch"
        ? "Backend API is not reachable from this browser. Check DNS, Cloudflare record, SSL, and local DNS cache."
        : error.message
    );
  }
}

export const publicApi = {
  pricing: () => request("/pricing"),
  services: () => request("/services"),
  purposes: () => request("/purposes"),

  availability: ({ start_time, end_time }) => {
    const params = new URLSearchParams({ start_time, end_time });
    return request(`/availability?${params.toString()}`);
  },

  createBooking: (payload) =>
    request("/bookings", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};