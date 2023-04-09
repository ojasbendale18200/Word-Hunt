

import React, { useState, useEffect } from "react";
import { useCountdownTimer } from "use-countdown-timer";
import { letters, countries, animals, names } from "../utils/data";
import "../Styles/Universal.css";

const SingleUserGame = () => {
  const { countdown, reset, start } = useCountdownTimer({
    timer: 1000 * 40,
    autostart: false,
  });
  const [gameOver, setGameOver] = useState(false);
  const [alertBox, setAlertBox] = useState<boolean>(false);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [bingoLetter, setBingoLetter] = useState(
    letters[Math.floor(Math.random() * letters.length)].toUpperCase()
  );

  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [animal, setAnimal] = useState("");

  const countriesUpper = countries.map((element) => {
    return element.toUpperCase();
  });
  const namesUpper = names.map((element) => {
    return element.toUpperCase();
  });
  const animalsUpper = animals.map((element) => {
    return element.toUpperCase();
  });

  const isTimeUp = (): boolean => {
    if (countdown === 0) {
      return true;
    }
    return false;
  };

  const clearFields = (): void => {
    setCountry("");
    setName("");
    setAnimal("");
  };

  const validateCountry = (country: string): boolean => {
    if (country.substring(0, 1).toUpperCase() === bingoLetter) {
      if (countriesUpper.includes(country.toUpperCase())) {
        // setScore((score) => score + 10)
        return true;
      }
    }
    return false;
  };
  const validateName = (name: string): boolean => {
    if (name.substring(0, 1).toUpperCase() === bingoLetter) {
      if (namesUpper.includes(name.toUpperCase())) {
        // setScore((score) => score + 10)
        return true;
      }
    }
    return false;
  };
  const validateAnimal = (animal: string): boolean => {
    if (animal.substring(0, 1).toUpperCase() === bingoLetter) {
      if (animalsUpper.includes(animal.toUpperCase())) {
        // setScore((score) => score + 10)
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (isTimeUp()) {
      setGameOver(true);
      setFinalScore(score);
      setScore(0);
    }
  }, [countdown]);

  const generateLetter = (): void => {
    setBingoLetter(
      letters[Math.floor(Math.random() * letters.length)].toUpperCase()
    );
  };

  const startGame = (): void => {
    setGameOver(false);
    generateLetter();
    setScore(0);
    reset();
    start();
  };

  const bingo = () => {
    reset();
    if (country === "" || name === "" || animal === "") {
      setAlertBox(true);
      setTimeout(() => {
        setAlertBox(false);
      }, 3000);
      return;
    } else {
      if (
        validateCountry(country) &&
        validateName(name) &&
        validateAnimal(animal)
      ) {
        setScore((score) => score + 30);

        clearFields();
        generateLetter();
        start();
      } else if (
        !validateCountry(country) &&
        validateName(name) &&
        validateAnimal(animal)
      ) {
        setScore((score) => score + 20);

        clearFields();
        generateLetter();
        start();
      } else if (
        validateCountry(country) &&
        !validateName(name) &&
        validateAnimal(animal)
      ) {
        setScore((score) => score + 20);

        clearFields();
        generateLetter();
        start();
      } else if (
        validateCountry(country) &&
        validateName(name) &&
        !validateAnimal(animal)
      ) {
        setScore((score) => score + 20);

        clearFields();
        generateLetter();
        start();
      } else if (
        !validateCountry(country) &&
        !validateName(name) &&
        validateAnimal(animal)
      ) {
        setScore((score) => score + 10);

        clearFields();
        generateLetter();
        start();
      } else if (
        !validateCountry(country) &&
        validateName(name) &&
        !validateAnimal(animal)
      ) {
        setScore((score) => score + 10);

        clearFields();
        generateLetter();
        start();
      } else if (
        validateCountry(country) &&
        !validateName(name) &&
        !validateAnimal(animal)
      ) {
        setScore((score) => score + 10);

        clearFields();
        generateLetter();
        start();
      } else {
        setGameOver(true);
        clearFields();
        setFinalScore(score);
        alert("Game Over");
      }
    }
  };

  return (
    <>
      {alertBox && (
        <div
          className="absolute right-[45%] top-[5%] transition duration-500 m-auto text-center p-4 mb-4 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 text-lg"
          role="alert"
        >
          <span className="font-medium">All fields required!</span>
        </div>
      )}
      <div
        id="glass"
        className="bg-[rgba(0,0,0,0.5)]  px-10 py-8 w-full max-w-5xl rounded-3xl drop-shadow-sm flex flex-col gap-8 text-white m-auto mt-16"
      >
        <div
          className={` ${
            gameOver ? "block" : "hidden"
          } absolute -top-[5rem] bg-gray-100 p-4 rounded-2xl text-purple-600`}
        >
          {gameOver ? (
            <h1 className=" text-center text-lg">
              Your Final score was -{" "}
              <span className="font-bold text-green-500">{finalScore}</span>{" "}
            </h1>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-between text-xl">
          <p className="font-bold ">
            Timer:{" "}
            <span
              className={`${
                countdown <= 10000 ? "text-red-500 animate-pulse" : ""
              }`}
            >
              {countdown / 1000} sec
            </span>
          </p>
          <p className="font-bold">
            Score: <span> {score}</span>
          </p>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <p className="">Bingo says letter</p>
          <h1 className="text-7xl font-bold">{bingoLetter}</h1>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-evenly gap-4">
          <input
            type="text"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              start();
            }}
            placeholder="Country"
            className="px-4 text-xl py-2 bg-transparent border-b-2 placeholder-white outline-none border-[#0099FF] text-white focus:shadow-2xl focus:shadow-[#0099FF]"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              start();
            }}
            placeholder="Name"
            className="px-4 text-xl py-2 bg-transparent border-b-2 placeholder-white outline-none border-[#0099FF] text-white focus:shadow-2xl focus:shadow-[#0099FF]"
          />
          <input
            type="text"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              start();
            }}
            placeholder="Animal"
            className="px-4 text-xl py-2 bg-transparent border-b-2 placeholder-white outline-none border-[#0099FF] text-white focus:shadow-2xl focus:shadow-[#0099FF]"
          />
        </div>
        <div className="flex gap-2 items-center justify-center">
          {!gameOver ? (
            <button
              className="w-[30%] block m-auto text-center text-white"
              onClick={bingo}
              disabled={gameOver}
              id="button"
            >
              <span className="italic">Bingo!</span>
              <i></i>
            </button>
          ) : (
            <button
              className="w-[30%] block m-auto text-center"
              onClick={startGame}
              id="button"
            >
              <span className="italic">Start</span>
              <i></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleUserGame;
