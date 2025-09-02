import React, { useEffect, useState, useRef, useCallback } from "react";
import "./UpcomingEvents.css";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  // ✅ Convert Google Drive share link to inline thumbnail (not download)
  const convertGoogleDriveUrl = (url) => {
    if (!url) return "";
    const match = url.match(/\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/thumbnail?id=${match[1]}`;
    }
    return url;
  };

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://gg-backend-assignment.azurewebsites.net/api/Events?code=${process.env.REACT_APP_API_KEY}&page=${page}&type=upcoming`
    );
      const data = await res.json();

      // ✅ Ensure proper camelCase mapping
      const formatted = (data.events || data).map((ev) => ({
        ...ev,
        imgUrl: ev.imgUrl || ev.img_url, // support both formats
      }));

      setEvents((prev) => [...prev, ...formatted]);
    } catch (err) {
      console.error("Failed to fetch upcoming events", err);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="upcoming-container">
      <h2 className="upcoming-title">Upcoming Events</h2>
      <div className="upcoming-list">
        {events.map((event, idx) => (
          <div key={idx} className="event-card">
            <img
              src={convertGoogleDriveUrl(event.imgUrl)}
              alt={event.eventName}
              className="event-image"
              onError={(e) => (e.target.style.display = "none")}
            />
            <div className="event-details">
              <h3 className="event-name">{event.eventName}</h3>
              <p className="event-location">
                📍 {event.cityName} •{" "}
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="event-extra">
                🌤️ {event.weather} | 🚗 {Math.round(event.distanceKm)} km away
              </p>
            </div>
          </div>
        ))}
        <div ref={loaderRef} className="loading">
          {loading && <p>Loading more events...</p>}
        </div>
      </div>
    </div>
  );
}
