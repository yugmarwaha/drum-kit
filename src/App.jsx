import { useState, useEffect, useCallback, memo } from "react";
import PropTypes from "prop-types";
import "./App.css";

// Drum data configuration
const DRUMS = Object.freeze([
  { key: "w", sound: "/sounds/tom-1.mp3", label: "Tom 1", type: "tom" },
  { key: "a", sound: "/sounds/tom-2.mp3", label: "Tom 2", type: "tom" },
  { key: "s", sound: "/sounds/tom-3.mp3", label: "Tom 3", type: "tom" },
  { key: "d", sound: "/sounds/tom-4.mp3", label: "Tom 4", type: "tom" },
  { key: "j", sound: "/sounds/snare.mp3", label: "Snare", type: "snare" },
  { key: "k", sound: "/sounds/crash.mp3", label: "Crash", type: "crash" },
  { key: "l", sound: "/sounds/kick-bass.mp3", label: "Kick Bass", type: "kick" },
]);

// Create a map for O(1) lookup
const DRUM_MAP = Object.freeze(
  DRUMS.reduce((acc, drum) => {
    acc[drum.key] = drum;
    return acc;
  }, {})
);

// DrumButton Component - Memoized to prevent unnecessary re-renders
const DrumButton = memo(function DrumButton({
  drumKey,
  label,
  isPressed,
  onPlay,
}) {
  const handleClick = () => {
    onPlay(drumKey);
  };

  return (
    <button
      type="button"
      className={`${drumKey} drum ${isPressed ? "pressed" : ""}`}
      onClick={handleClick}
      aria-label={`Play ${label} drum`}
      aria-pressed={isPressed}
    >
      <span className="key">{drumKey}</span>
      <span className="label">{label}</span>
    </button>
  );
});

DrumButton.propTypes = {
  drumKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isPressed: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
};

// Main App Component
function App() {
  const [pressedKey, setPressedKey] = useState(null);

  const playSound = useCallback((key) => {
    const drum = DRUM_MAP[key];
    if (!drum) return;

    const audio = new Audio(drum.sound);
    audio.currentTime = 0;
    audio.play();

    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 150);
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ignore if user is typing in an input field
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
      ) {
        return;
      }

      const drum = DRUM_MAP[event.key.toLowerCase()];
      if (drum) {
        playSound(drum.key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [playSound]);

  return (
    <main>
      <h1 id="title">
        Drum <span className="emoji">🥁</span> Kit
      </h1>
      <p className="subtitle">Press a key or click to play</p>
      <div className="set" role="group" aria-label="Drum kit buttons">
        {DRUMS.map((drum) => (
          <DrumButton
            key={drum.key}
            drumKey={drum.key}
            label={drum.label}
            isPressed={pressedKey === drum.key}
            onPlay={playSound}
          />
        ))}
      </div>
      <p className="footer-hint">
        {DRUMS.map((drum) => (
          <kbd
            key={drum.key}
            className={pressedKey === drum.key ? "active" : ""}
          >
            {drum.key.toUpperCase()}
          </kbd>
        ))}
      </p>
    </main>
  );
}

export default App;
