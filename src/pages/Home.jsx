import React from "react";
import "./Home.css";

const LAUNCHED = false;
const MYSTIC_EMOJIS = Array(6).fill("❄️").concat("🍕");
const pickEmoji = () =>
  MYSTIC_EMOJIS[Math.floor(Math.random() * MYSTIC_EMOJIS.length)];

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  delay: `${-1 * (Math.random() * 8).toFixed(2)}s`,
  duration: `${(8 + Math.random() * 8).toFixed(2)}s`,
  size: `${(1.25 + Math.random() * 1.5).toFixed(2)}rem`,
  drift: `${(Math.random() * 12 - 6).toFixed(2)}vw`,
  emoji: pickEmoji(),
}));

const Home = () => {
  return (
    <main className="home-backdrop">
      <div className="pizza-snow" aria-hidden="true">
        {particles.map((emoji) => (
          <span
            key={emoji.id}
            className="pizza"
            style={{
              "--x-position": emoji.left,
              "--pizza-delay": emoji.delay,
              "--pizza-duration": emoji.duration,
              "--pizza-size": emoji.size,
              "--pizza-drift": emoji.drift,
            }}
          >
            {emoji.emoji}
          </span>
        ))}
      </div>

      <div className="home-content">
        <p className="home-title">mystic christmas</p>
        {LAUNCHED ? <button className="home-subtitle" onClick={() => window.location.href="/reveal"}>reveal</button> : <p className="home-subtitle">coming soon</p> }
      </div>
    </main>
  );
};

export default Home;
