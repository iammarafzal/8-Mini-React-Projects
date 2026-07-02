import { useEffect, useState } from "react";

function RandomColor() {
  const [colorType, setColorType] = useState("hex");
  const [color, setColor] = useState("#000000");

  const randomNumberGeneratorUtility = (length) => {
    return Math.floor(Math.random() * length);
  };

  const handleColorGenerator = () => {
    if (colorType === 'hex') handleHexColor();
    else handleRgbColor();
  };

  const handleRgbColor = () => {
    const r = randomNumberGeneratorUtility(256);
    const g = randomNumberGeneratorUtility(256);
    const b = randomNumberGeneratorUtility(256);

    const newColor = `rgba(${r}, ${g}, ${b})`;
    setColor(newColor);
  }

  const handleHexColor = () => {
    const hex = [
      "0", "1", "2", "3", "4", "5",
      "6", "7", "8", "9", "A", "B",
      "C", "D", "E", "F"
    ];

    let newColor = "#";

    for (let i = 0; i < 6; i++) {
      newColor += hex[randomNumberGeneratorUtility(hex.length)];
    }
    setColor(newColor);
  };

  useEffect(() => {
    handleColorGenerator()
  }, [colorType]);

  return (
    <div
    style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: color,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "20px",
    }}
    >
        <div style={{ marginTop: "10px", gap: "30px", display: "flex"}}>
            <div className="container-buttons" style={{ 
                display: "flex"
            }}>
                <button className={ colorType === 'hex' ? "active-button" : ""} onClick={() => setColorType('hex')}>HEX</button>
                <button className={ colorType === 'rgb' ? "active-button" : ""} onClick={() => setColorType('rgb')}>RGB</button>
            </div>
            <button onClick={handleColorGenerator}>Generate Color</button>
        </div>
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            flexGrow: 1,
            color: "#fff",
            textAlign: "center"
        }}>
            <h2>{colorType === 'hex' ? "HEX" : "RGB"}</h2>
            <h1>{color}</h1>
        </div>
    </div>


  );
}

export default RandomColor;