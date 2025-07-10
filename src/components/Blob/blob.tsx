import React from "react";

const CV = "/cv.pdf";

const BaixarCurriculo: React.FC = () => {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = CV;
    a.download = "cv.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <h3
      className="btn border-white text-white p-2"
      onClick={handleDownload}
      style={{ cursor: "pointer", flexWrap: "wrap" }}
    >
      Baixar Curriculo
    </h3>
  );
};

export default BaixarCurriculo; 