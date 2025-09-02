// API base URL
export const API_BASE =
  `https://gg-backend-assignment.azurewebsites.net/api/Events?code=${process.env.REACT_APP_API_KEY}`;

// Endpoints
export const endpoints = {
  reco: (page = 1) => `${API_BASE}&page=${page}&type=reco`,
  upcoming: (page = 1) => `${API_BASE}&page=${page}&type=upcoming`,
};

// Utility: Format Event
export function formatEvent(e) {
  if (!e) return null;

  // Date formatting
  const d = e.date ? new Date(e.date) : null;
  const dateStr = d
    ? d.toLocaleDateString(undefined, { day: "2-digit", month: "short" })
    : "";

  // Distance formatting
  const distance = Number(e.distanceKm) || 0;
  const km =
    distance >= 1000
      ? `${(distance / 1000).toFixed(1)}k km`
      : `${distance.toFixed(0)} km`;

  return {
    id: e.eventId || e.id || Math.random().toString(36).slice(2), // fallback ID
    title: e.eventName || "Untitled Event",
    city: e.cityName || "Unknown city",
    when: dateStr,
    weather: e.weather || "N/A",
    dist: km,
    img: e.img_url || e.imgUrl || "https://via.placeholder.com/400x200?text=No+Image",
  };
}


