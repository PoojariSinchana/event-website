import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const Home = () => {
  const recommended = [
    {
      id: 1,
      title: "Make Agree",
      date: "March 23, 2024",
      location: "West Douglas",
      temp: "Snowy, 26°C",
      distance: "42 Km",
      image:
        "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Make Agree",
      date: "March 23, 2024",
      location: "West Douglas",
      temp: "Snowy, 26°C",
      distance: "42 Km",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Make Agree",
      date: "March 23, 2024",
      location: "West Douglas",
      temp: "Snowy, 26°C",
      distance: "42 Km",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const upcoming = [
    {
      id: 4,
      title: "After note nearly",
      date: "March 23, 2024",
      location: "West Douglas",
      temp: "Snowy, 26°C",
      distance: "42 Km",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "After note nearly",
      date: "March 23, 2024",
      location: "West Douglas",
      temp: "Snowy, 26°C",
      distance: "42 Km",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="homepage">
      {/* 🔹 Navbar */}
      <nav className="navbar">
        <h2 className="logo">🎟️ Eventify</h2>
        <div className="nav-links">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/signup" className="btn signup">Sign Up</Link>
        </div>
      </nav>

      {/* 🔹 Hero Banner */}
      <div className="hero">
        <img
          src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80"
          alt="banner"
          className="hero-img"
        />
        <div className="hero-overlay">
          <h1>
            Discover Exciting Events Happening Near You – Stay Tuned for Updates!
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum.
          </p>
        </div>
      </div>

      {/* 🔹 Recommended Shows */}
      <section className="section">
        <div className="section-header">
          <h2>Recommended Shows</h2>
          <a href="/">See all →</a>
        </div>
        <div className="recommended-list">
          {recommended.map((event) => (
            <div key={event.id} className="card">
              <img src={event.image} alt={event.title} />
              <div className="card-details">
                <p className="date">{event.date}</p>
                <h3>{event.title}</h3>
                <p className="info">📍 {event.location}</p>
                <p className="info">
                  {event.temp} | {event.distance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Upcoming Events */}
      <section className="section">
        <div className="section-header">
          <h2>Upcoming Events</h2>
          <a href="/">See all →</a>
        </div>
        <div className="upcoming-list">
          {upcoming.map((event) => (
            <div key={event.id} className="card">
              <img src={event.image} alt={event.title} />
              <div className="card-details">
                <p className="date">{event.date}</p>
                <h3>{event.title}</h3>
                <p className="info">📍 {event.location}</p>
                <p className="info">
                  {event.temp} | {event.distance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
