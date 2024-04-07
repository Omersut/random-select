"use client"
import { cevaplar } from "@/data";
import { useState } from "react";

export default function Home() {
  const [showDescription, setShowDescription] = useState(false);
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [infoVisibility, setInfoVisibility] = useState(true);
  const [xCordinate, setXCordinate] = useState(45)
  const [yCordinate, setYCordinate] = useState(50)

  const getRandomNumber = () => {
    const random = Math.floor(Math.random() * cevaplar.length);
    setRandomNumber(random);
  };

  const getRandomNumberForBtn = () => {
    const randomx = Math.floor(Math.random() * 81) + 10;
    const randomy = Math.floor(Math.random() * 81) + 10;
    setYCordinate(randomy);
    setXCordinate(randomx);
  };


  const handleButtonClick = () => {
    playClickSound(); // Ses efekti fonksiyonunu çağır
    setInfoVisibility(false);
    getRandomNumber();
    getRandomNumberForBtn();
    setShowDescription(true);
    setTimeout(() => {
      setShowDescription(false);
    }, 6000);
  };
  const playClickSound = () => {
    const randomNum = Math.random(); // 0 ile 1 arasında rastgele bir sayı üretir

    if (randomNum < 0.5) {
      const spaceSound = new Audio("/space.mp3");
      spaceSound.volume = 0.1;
      spaceSound.play();
    } else {
      const bellSound = new Audio("/bell.mp3");
      bellSound.volume = 0.1;
      bellSound.play();
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Mobil İçerik */}
      <div className="max-w-5xl w-full items-center justify-between text-sm lg:flex">
        {infoVisibility && (
          <>
            <p className="fixed info left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              &nbsp;

              <code>
                Bir soru sor... butona Tıkla! Ve buna bir döngü şeklinde devam et.
              </code>
            </p>
            <div className="mobile-only fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              <a
                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <b><em>By / Ö</em></b>
              </a>
            </div>
          </>
        )}

      </div>

      {/* Rastgele Tavsiye */}
      <div className="centered-container-text">
        <h2 className={showDescription ? "description animated" : "description"}>
          {cevaplar[randomNumber]?.toUpperCase()}
        </h2>
      </div>

      {/* Buton */}
      <div className="centered-container kalp">
        <button disabled={showDescription} className="random-btn" onClick={handleButtonClick}></button>
      </div>

      {/* Stiller */}
      <style>{`
        .main {
         position: relative;
         overflow: hidden
        }
        .body {
          position: relative;
          overflow: hidden
         }

        .centered-container {
          position: absolute;
          top: ${xCordinate}%;
          left: ${yCordinate}%;
          transform: translate(-50%, -50%);
          text-align: center;
          height: 200px;
        }

        .centered-container-text {
          position: absolute;
          top: 48%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          height: 200px;
        }

        .description {
          font-size: 2em;
          opacity: 0;
          top: 0;
          transition: opacity 0.6s ease-in-out;
        }

        .description.animated {
          opacity: 1;
        }

        .random-btn {
          width: 150px;
          height: 150px;
          padding: 10px 20px;
          font-size: 1.5em;
          border: 1px solid white;
          color: white;
          bottom: 0;
          border-radius: 50%;
          cursor: pointer;
          background-color: white;
          opacity: 1;
          transition: background-color 0.8s, transform 0.8s, opacity 0.8s;
        }

        .random-btn:hover {
          animation: spin 4s linear infinite;
        }

        .random-btn:active {
          transform: scale(0.95);
        }

        @keyframes spin {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }

        .random-btn:disabled {
          opacity: 0.1;
          cursor: not-allowed;
          transform: scale(1.0);
        }

        .random-btn:active {
          transform: scale(0.9);
          animation: none;
        }

        @media only screen and (max-width: 600px) {
          .mobile-only {
          }
          .info {
            text-align: center;
          }
          .pc-only {
            display: none !important;
          }

          .description {
            font-size: 1.3em;
          }
          .centered-container {
            width: 100%;
            padding: 10px;
          }
        }

        @media only screen and (min-width: 601px) {
          .mobile-only {
            display: none !important;
          }

          .pc-only {
            display: block !important;
          }
        }
      `}</style>
    </main>
  );
}