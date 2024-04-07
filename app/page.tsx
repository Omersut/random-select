"use client"
import React, { useState, useEffect } from "react";
import { cevaplar } from "@/data";

export default function Home() {
  const [showDescription, setShowDescription] = useState(false);
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [infoVisibility, setInfoVisibility] = useState(true);
  const [xCordinate, setXCordinate] = useState(45);
  const [yCordinate, setYCordinate] = useState(50);

  useEffect(() => {
    // Yatay (X) kaydırmayı engelle
    function preventXScroll() {
      window.scrollTo(0, window.pageYOffset);
    }

    // Dikey (Y) kaydırma kontrolü
    function keepYScroll() {
      // Yatay (X) kaydırma olmadan mevcut X pozisyonunu koru
      if (window.pageXOffset !== 0) {
        window.scrollTo(window.pageXOffset, window.pageYOffset);
      }
    }

    // Event listener'ları ekle
    window.addEventListener("scroll", preventXScroll);
    window.addEventListener("scroll", keepYScroll);

    // Sayfa boyutları için body'ye max-width ve max-height tanımla
    if (window) {
      document.body.style.maxHeight = Math.min(
        window.screen.availWidth,
        window.screen.availHeight
      ) + "px";

      document.body.style.maxWidth = Math.min(
        window.screen.availWidth,
        window.screen.availHeight
      ) + "px";
    }

    // Cleanup: Event listener'ları kaldır
    return () => {
      window.removeEventListener("scroll", preventXScroll);
      window.removeEventListener("scroll", keepYScroll);
    };
  }, []);

  const getRandomNumber = () => {
    const random = Math.floor(Math.random() * cevaplar.length);
    setRandomNumber(random);
  };

  const getRandomNumberForBtn = () => {
    const randomX = Math.floor(Math.random() * 81) + 10;
    const randomY = Math.floor(Math.random() * 81) + 10;
    setYCordinate(randomY);
    setXCordinate(randomX);
    setTimeout(() => {
      const randomX = Math.floor(Math.random() * 81) + 10;
      const randomY = Math.floor(Math.random() * 81) + 10;
      setYCordinate(randomY);
      setXCordinate(randomX);
      setTimeout(() => {
        const randomX = Math.floor(Math.random() * 81) + 10;
        const randomY = Math.floor(Math.random() * 81) + 10;
        setYCordinate(randomY);
        setXCordinate(randomX);
      }, 500);
    }, 1000);
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
      const spaceSound = new Audio("/432.mp3");
      spaceSound.volume = 0.03;
      spaceSound.play();
    } else {
      const bellSound = new Audio("/fire.mp3");
      bellSound.volume = 0.03;
      bellSound.play();
    }
    // if (randomNum < 0.2) {
    //   const spaceSound = new Audio("/space.mp3");
    //   spaceSound.volume = 0.01;
    //   spaceSound.play();
    // } else if (randomNum < 0.4) {
    //   const bellSound = new Audio("/432.mp3");
    //   bellSound.volume = 0.03;
    //   bellSound.play();
    // } else if (randomNum < 0.6) {
    //   const bellSound = new Audio("/fire.mp3");
    //   bellSound.volume = 0.03;
    //   bellSound.play();
    // } else if (randomNum < 0.8) {
    //   const bellSound = new Audio("/ikigai.mp3");
    //   bellSound.volume = 0.02;
    //   bellSound.play();
    // } else {
    //   const bellSound = new Audio("/focus.mp3");
    //   bellSound.volume = 0.02;
    //   bellSound.play();
    // }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="area"></div>

      {/* Mobil İçerik */}
      <div className="max-w-5xl w-full items-center justify-between text-sm lg:flex">
        {infoVisibility && (
          <>
            <p className="fixed code info left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              &nbsp;
              <code>
                Bir soru sor... butona Tıkla! Ve buna bir döngü şeklinde devam et...
              </code>
            </p>

          </>
        )}
      </div>

      {/* Rastgele Tavsiye */}
      <div className="centered-container-text">
        <h2 className={showDescription ? "description animated" : "description"}>
          {showDescription && cevaplar[randomNumber]?.toUpperCase()}
        </h2>
      </div>

      {/* Buton */}
      <div className="centered-container kalp">
        <button disabled={showDescription} className="random-btn" onClick={handleButtonClick}></button>
      </div>

      <style jsx>{`
        .area {
          border: 5px solid white;
          position: absolute;
          top: 15px;
          bottom: 15px;
          left: 15px;
          right: 15px;
          z-index: 99;
        }

        body {
          position: relative;
          overflow: hidden;
        }

        .centered-container {
          position: absolute;
          top: ${xCordinate}%;
          left: ${yCordinate}%;
          transform: translate(-50%, -50%);
          text-align: center;
          height: 200px;
          transition: top 2s, left 2s;
          z-index: 999
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
          width: 130px;
          height: 130px;
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
          position: relative;
          overflow: hidden;
        }

        .random-btn::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-left: 30px solid transparent;
          border-right: 30px solid transparent;
          border-bottom: 50px solid black;
          transform: translate(-50%, -50%);
          transition: transform 0.8s;
        }

        .random-btn:hover {
          animation: spin 4s linear infinite;
        }

        .random-btn:active {
          transform: scale(0.95);
        }

        @keyframes spin {
          0% {
            transform: scale(1) rotate(0deg);
          }
          75% {
            transform: scale(1.1) rotate(120000deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
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
            display: block;
          }
          .info {
            text-align: center;
          }
          .area{
            display: none;
          }
          .code {
            padding: 40px;
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