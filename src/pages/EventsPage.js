import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import RecommendedEvents from "../components/Events/RecommendedEvents";
import UpcomingEvents from "../components/Events/UpcomingEvents";

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Banner Section */}
      <div className="relative">
        <Banner title="Your personalized events" />
      </div>

      {/* Content Sections */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Recommended Events */}
        <section>
          <RecommendedEvents />
        </section>

        {/* Upcoming Events */}
        <section>
          <UpcomingEvents />
        </section>
      </main>
    </div>
  );
}
