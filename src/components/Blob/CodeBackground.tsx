"use client";
import React from "react";

const symbols: string[] = [
  "{ }", "< />", "()", "if", "else", "const", "let", "=>", "function", "0xF1", "while", "for", "return", "try", "catch"
];

const CodeBackground: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-y-0 left-0 right-0 z-0 flex justify-between">
      <div className="flex flex-col gap-8 pl-2 h-full justify-center animate-float-slow">
        {symbols.slice(0, 7).map((sym, i) => (
          <span
            key={i}
            className="text-theme-font/20 text-2xl md:text-4xl font-mono opacity-20 select-none"
            style={{
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${5 + i * 1.2}s`
            }}
          >
            {sym}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-8 pr-2 h-full justify-center items-end animate-float-slow-reverse">
        {symbols.slice(7).map((sym, i) => (
          <span
            key={i}
            className="text-theme-font/20 text-2xl md:text-4xl font-mono opacity-20 select-none"
            style={{
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${5 + i * 1.2}s`
            }}
          >
            {sym}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CodeBackground; 