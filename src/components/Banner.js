import React from "react";
import "./Banner.css";
import bannerImg from "./banner.svg"; // imported properly

export default function Banner({
  title = "Discover Exciting Events Happening Near You - stay Tuned for Updates!",
  para = "Dorem ipsum dolor sit amet, consectetur adipiscing elit, Nunc vulputate libero et velit interdum ac aliquet odio...",
}) {
  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${bannerImg})` }} // 👈 use imported image
    >
      <div className="banner-overlay">
        <h1>{title}</h1>
        <p>{para}</p>
      </div>
    </div>
  );
}
