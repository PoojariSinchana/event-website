import React, { useEffect, useState, useRef } from "react";
import "./RecommendedEvents.css";

export default function RecommendedEvents() {
  const [events, setEvents] = useState([]);
  const scrollRef = useRef(null);

  // ✅ Convert Google Drive share/view/download link → thumbnail image link
  const getDirectImageUrl = (url) => {
    if (!url) return "";
    // Handle formats like ".../d/FILE_ID/view", "...id=FILE_ID", etc.
    let fileId = "";

    const match1 = url.match(/\/d\/([^/]+)/); // /d/FILE_ID/
    const match2 = url.match(/id=([^&]+)/);   // id=FILE_ID

    if (match1 && match1[1]) fileId = match1[1];
    else if (match2 && match2[1]) fileId = match2[1];

    return fileId
      ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
      : url;
  };

  // ✅ Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
           `https://gg-backend-assignment.azurewebsites.net/api/Events?code=${process.env.REACT_APP_API_KEY}&type=reco`
          );
        const data = await res.json();
        console.log("API raw data:", data);

        // Normalize event data
        const formatted = (data.events || data).map((ev) => ({
          ...ev,
          imgUrl: ev.imgUrl || ev.img_url, // handle both snake_case + camelCase
        }));

        setEvents(formatted);
      } catch (err) {
        console.error("❌ Failed to fetch recommended events", err);
      }
    };

    fetchEvents();
  }, []);

  // ✅ Auto horizontal scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollStep = 1;
    const scrollInterval = setInterval(() => {
      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollStep;
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, [events]);

  return (
    <div className="recommended-container">
      <h2 className="recommended-title">Recommended Shows</h2>

      <div className="recommended-scroll" ref={scrollRef}>
        {events.map((event, idx) => {
          const imgSrc = getDirectImageUrl(event.imgUrl);
          console.log(`Event ${idx} → ${imgSrc}`);

          return (
            <div key={idx} className="event-card">
              <img
                src={imgSrc}
                alt={event.eventName}
                className="event-image"
                onError={(e) => (e.target.style.display = "none")} // hide broken imgs
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
          );
        })}
      </div>
    </div>
  );
}
