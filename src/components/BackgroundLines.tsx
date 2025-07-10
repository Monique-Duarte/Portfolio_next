const BackgroundLines = () => (
  <svg
    className="background-lines-svg"
    width="100%"
    height="100%"
    viewBox="0 0 1920 1080"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#888"
    strokeWidth="1"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
    }}
  >
    {/* Linhas horizontais */}
    <line x1="120" y1="180" x2="1800" y2="180" />
    <line x1="240" y1="360" x2="1680" y2="360" />
    <line x1="360" y1="540" x2="1560" y2="540" />
    <line x1="480" y1="720" x2="1440" y2="720" />
    {/* Linhas verticais intercaladas */}
    <line x1="240" y1="90" x2="240" y2="990" />
    <line x1="480" y1="180" x2="480" y2="900" />
    <line x1="720" y1="270" x2="720" y2="810" />
    <line x1="960" y1="360" x2="960" y2="720" />
    <line x1="1200" y1="270" x2="1200" y2="810" />
    <line x1="1440" y1="180" x2="1440" y2="900" />
  </svg>
);

export default BackgroundLines; 