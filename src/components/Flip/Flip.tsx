"use client";

import React, { useState, KeyboardEvent } from "react";
import Image from "next/image";

const IMG_FRONT_PATH = "/images/frente.jpeg";
const IMG_BACK_PATH = "/images/verso.jpeg";

interface FlipCardProps {
  front: string;
  back: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") handleFlip();
  };

  return (
    <div
      className="relative mx-auto perspective-[1200px] select-none group cursor-pointer"
      style={{
        width: "min(90vw, 260px)",
        height: "min(90vw, 340px)",
        maxWidth: 260,
        maxHeight: 340,
      }}
      onClick={handleFlip}
      tabIndex={0}
      aria-label="Virar cartão"
      onKeyDown={handleKeyDown}
      role="button"
    >
      <div
        className={`w-full h-full relative transition-transform duration-700 ease-in-out`}
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute w-full h-full rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 border-4 border-theme-accent-dark/30 bg-theme-background"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            MozBackfaceVisibility: "hidden"
          }}
        >
          <Image
            src={front}
            alt="Foto de perfil frente"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-2xl"
          />
        </div>
        <div
          className="absolute w-full h-full rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 border-4 border-theme-accent-dark/30 bg-theme-background"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            MozBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <Image
            src={back}
            alt="Foto de perfil verso"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

const CardContainer: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <FlipCard front={IMG_FRONT_PATH} back={IMG_BACK_PATH} />
    </div>
  );
};

export default CardContainer; 