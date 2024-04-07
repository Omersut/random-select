"use client"
import Image from "next/image";
import { cevaplar } from "@/data";
import { useState } from "react";

export default function Home() {
  const [showDescription, setShowDescription] = useState(false);
  const [randomNumber, setRandomNumber] = useState<number>(0);

  const getRandomNumber = () => {
    const random = Math.floor(Math.random() * (cevaplar.length - 1));
    setRandomNumber(random);
  };

  const handleButtonClick = () => {
    getRandomNumber();
    setShowDescription(true);
    setTimeout(() => {
      setShowDescription(false);
    }, 5000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Mobil İçerik */}
      <div className="z-10 max-w-5xl w-full items-center justify-between  text-sm lg:flex ">
        <p className="fixed info left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          &nbsp;
          <code className="">
            Bazen harekete geçmene yardımcı olan şey rastgele bir tavsiyedir!
            Kim bilir, belki de bir &quot;Mıyım?&quot; sorusu sorulmuş ve cevabı bulunması gerekiyor.
            &quot;İstifa etmeli miyim?&quot; 🤔 ya da belki de &quot;Yolculuk yapmalı mıyım?&quot; 🌍
            Aklındaki soruyu belirle, düşün, düşün.. ve şimdi, büyük ve gizemli butona Tıkla!
          </code>
        </p>
        <div className="mobile-only fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >

            <b><em>By{" "}/{" "}Ö</em></b>
          </a>
        </div>
      </div>

      {/* Rastgele Tavsiye */}
      <div className="centered-container">
        <h2 className={showDescription ? 'description animated' : 'description'}>
          {cevaplar.at(randomNumber)?.toUpperCase()}
        </h2>
      </div>

      {/* Buton */}
      <div className="centered-container kalp">
        <button disabled={showDescription} className="random-btn" onClick={handleButtonClick}></button>
      </div>

      {/* Stiller */}
      <style>{`
        .info {
         
        }

        .centered-container {
          position: absolute;
          top: 55%;
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
          background-color: red;
          opacity: 1;
          transition: background-color 0.8s, transform 0.8s, opacity 0.8s;
        }

        .random-btn:hover {
          animation: spin 2.5s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(0.95);
          }
        }

        .random-btn:disabled {
          opacity: 0.1;
          cursor: not-allowed;
          transform: scale(1.0);
        }

        .random-btn:active {
          transform: scale(0.9);
        }

        @media only screen and (max-width: 600px) {
          .mobile-only {
          }
          .info {
            text-align: center
          }
          .pc-only {
            display: none !important;
          }

          .description {
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
