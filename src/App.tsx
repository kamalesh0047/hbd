import { useRef, useState } from "react";
import photo from "./assets/hbd.jpg";
import music from "./assets/Garden(chosic.com).mp3";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [collected, setCollected] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [message, setMessage] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const TOTAL_HEARTS = 7;

  const startGame = () => {
    setGameStarted(true);
    audioRef.current?.play().catch(() => {});
  };

  const collectHeart = () => {
    const newCount = collected + 1;
    setCollected(newCount);

    if (newCount >= TOTAL_HEARTS) {
      setTimeout(() => setShowFinal(true), 800);
    }
  };

  const sendToWhatsApp = () => {
    if (!message) {
      alert("Write something first 💛");
      return;
    }

    const phoneNumber = "91XXXXXXXXXX"; // replace with your number
    const url =
      "https://api.whatsapp.com/send?phone=" +
      phoneNumber +
      "&text=" +
      encodeURIComponent("Birthday Feedback 💛\n\n" + message);

    window.open(url, "_blank");
  };

  return (
    <div className="container">
      <audio ref={audioRef} src={music} loop />

      {!gameStarted && (
        <div className="startScreen" onClick={startGame}>
          <h2>Tap To Collect The Hearts 💛</h2>
        </div>
      )}

      {gameStarted && !showFinal && (
        <>
          <div className="counter">
            Hearts Collected: {collected}/{TOTAL_HEARTS}
          </div>

          {Array.from({ length: TOTAL_HEARTS }).map((_, i) => (
            <div
              key={i}
              className="heart"
              onClick={collectHeart}
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 70 + 15}%`,
              }}
            >
              💛
            </div>
          ))}
        </>
      )}

      {showFinal && (
        <div className="finalStage">
          <img src={photo} className="photo" />
          <h1 className="name">MEHA</h1>
          <h2 className="birthday">HAPPY BIRTHDAY</h2>
          <p className="message">
            You make life brighter,
            <br />
            laughter louder,
            <br />
            and friendship warmer 💛
          </p>

          <textarea
            placeholder="Write something sweet..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="feedbackBox"
          />

          <button onClick={sendToWhatsApp} className="whatsappBtn">
            Send via WhatsApp 💬
          </button>
        </div>
      )}

      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }

        html, body, #root {
          height:100%;
          width:100%;
          overflow:hidden;
        }

        .container {
          height:100vh;
          width:100vw;
          display:flex;
          justify-content:center;
          align-items:center;
          text-align:center;
          background: radial-gradient(circle at center, #14143c, #000);
          color:white;
          font-family: 'Segoe UI', sans-serif;
          position:relative;
        }

        .startScreen {
          font-size:24px;
          cursor:pointer;
          animation: fadeIn 2s ease forwards;
        }

        .counter {
          position:absolute;
          top:20px;
          font-size:18px;
        }

        .heart {
          position:absolute;
          font-size:40px;
          cursor:pointer;
          animation: float 4s ease-in-out infinite;
        }

        .finalStage {
          display:flex;
          flex-direction:column;
          align-items:center;
          animation: zoomIn 1.5s ease forwards;
        }

        .photo {
          width:200px;
          height:200px;
          object-fit:cover;
          border-radius:50%;
          border:4px solid gold;
          box-shadow:0 0 40px rgba(255,215,0,0.7);
          margin-bottom:25px;
        }

        .name {
          font-size:60px;
          background: linear-gradient(90deg, gold, white, gold);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }

        .birthday {
          margin-top:10px;
          letter-spacing:3px;
        }

        .message {
          margin-top:20px;
          font-size:18px;
          color:#ddd;
        }

        .feedbackBox {
          margin-top:25px;
          width:280px;
          height:80px;
          border-radius:10px;
          padding:10px;
          border:none;
          outline:none;
          font-size:14px;
        }

        .whatsappBtn {
          margin-top:15px;
          padding:10px 20px;
          border:none;
          border-radius:20px;
          background:#25D366;
          color:white;
          cursor:pointer;
          font-size:14px;
        }

        @keyframes float {
          0%,100% { transform:translateY(0); }
          50% { transform:translateY(-20px); }
        }

        @keyframes fadeIn {
          from { opacity:0; }
          to { opacity:1; }
        }

        @keyframes zoomIn {
          from { transform:scale(0.8); opacity:0; }
          to { transform:scale(1); opacity:1; }
        }

        @media (max-width:600px) {
          .name { font-size:45px; }
          .photo { width:150px; height:150px; }
        }

      `}</style>
    </div>
  );
}
