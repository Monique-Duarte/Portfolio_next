import React from "react";

interface DownloadButtonProps {
  filePath: string;
  fileName: string;
  buttonText: string;
  variant?: "primary" | "secondary";
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  filePath,
  fileName,
  buttonText,
  variant = "primary"
}) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(filePath, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error('Arquivo não encontrado');
      }

      const a = document.createElement("a");
      a.href = filePath;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao baixar arquivo:', error);
      alert('Erro ao baixar o arquivo. Tente novamente.');
    }
  };

  const baseClasses = "transition-all duration-300 rounded-lg shadow-md font-semibold text-lg flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 px-4 py-2 min-w-[200px]";
  
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-400 border-2 border-blue-600 hover:border-blue-700",
    secondary: "bg-transparent hover:bg-white text-white hover:text-gray-800 focus:ring-blue-400 border-2 border-white"
  };

  return (
    <button
      onClick={handleDownload}
      className={`${baseClasses} ${variantClasses[variant]}`}
      aria-label={buttonText}
    >
      {buttonText}
    </button>
  );
};

export default DownloadButton;