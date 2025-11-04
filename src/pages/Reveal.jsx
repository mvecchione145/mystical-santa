import React, { useState } from "react";
import elves from "../config/elves.json";
import "./Reveal.css";

const PUBLIC_IMAGES = Object.values(
  import.meta.glob("@public/*.png", {
    eager: true,
    import: "default",
    query: "?url",
  })
).map((assetPath) => assetPath.replace("/public", ""));

const getMatchFromCode = async (code) => {
  const trimmed = code.trim();

  if (!trimmed) {
    throw new Error("Please enter your reveal code.");
  }

  if (!Array.isArray(elves) || elves.length === 0) {
    throw new Error("Matches are still being assigned. Please try later.");
  }

  let hash = 0;
  for (let i = 0; i < trimmed.length; i += 1) {
    hash = (hash << 5) - hash + trimmed.charCodeAt(i);
    hash |= 0;
  }

  const index = Math.abs(hash) % elves.length;
  return { name: elves[index] };
};

const Reveal = () => {
  const [code, setCode] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState("idle");
  const [matchName, setMatchName] = useState("");
  const [selectedImage, setSelectedImage] = useState(
    PUBLIC_IMAGES[0] ?? ""
  );
  const [errorMessage, setErrorMessage] = useState("");

  const pickRandomImage = () => {
    if (!PUBLIC_IMAGES.length) {
      return "";
    }
    const index = Math.floor(Math.random() * PUBLIC_IMAGES.length);
    return PUBLIC_IMAGES[index];
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalState("idle");
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setModalOpen(true);
    setMatchName("");
    setSelectedImage(pickRandomImage());

    if (!code.trim()) {
      setModalState("error");
      setErrorMessage("Please enter your reveal code.");
      return;
    }

    setModalState("loading");
    setErrorMessage("");

    try {
      const data = await getMatchFromCode(code);
      if (!data?.name) {
        throw new Error("No match assigned to that code yet.");
      }

      setMatchName(data.name);
      setModalState("success");
    } catch (error) {
      setErrorMessage(
        error?.message ?? "We hit a snag fetching your match."
      );
      setModalState("error");
    }
  };

  return (
    <main className="reveal-backdrop">
      <div className="reveal-content">
        <p className="reveal-title">Secret Reveal</p>
        <p className="reveal-subtitle">Enter your code to unwrap your match</p>

        <form className="reveal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="reveal-input"
            placeholder="Enter your code..."
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
            }}
          />
          <button type="submit" className="reveal-button">
            Reveal
          </button>
        </form>
      </div>

      {isModalOpen && (
        <div className="reveal-modal" role="dialog" aria-modal="true">
          <div className="reveal-modal__backdrop" onClick={closeModal} />
          <div className="reveal-modal__body">
            <button
              type="button"
              className="reveal-modal__close"
              onClick={closeModal}
              aria-label="Close reveal modal"
            >
              &times;
            </button>

            {modalState === "loading" && (
              <p className="reveal-modal__status">
                Consulting the mystic archives…
              </p>
            )}

            {modalState === "success" && (
              <>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Mystic elf helper"
                    className="reveal-modal__image"
                  />
                )}
                <p className="reveal-modal__label">Your match</p>
                <p className="reveal-modal__name">{matchName}</p>
              </>
            )}

            {modalState === "error" && (
              <p className="reveal-modal__status reveal-modal__status--error">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Reveal;
