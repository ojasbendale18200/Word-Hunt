/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useCountdownTimer } from "use-countdown-timer";
import { letters, countries, animals, names } from "../utils/data";
import "../Styles/Universal.css";
interface propsTypes {
  handleChange: Function;
  handleSubmit: Function;
  score: number;
  letter: string;
  timer: number;
  setCountryInput: Function;
  setNameInput: Function;
  setAnimalInput: Function;
  country: string;
  name: string;
  animal: string;
  setScore: Function;
  handleScore: Function;
  opponentsScore: number;
  opponentsName: string;
}
export const GameCard: React.FC<propsTypes> = ({
  handleChange,
  handleSubmit,
  score,
  setScore,
  letter,
  timer,
  setCountryInput,
  setNameInput,
  setAnimalInput,
  country,
  name,
  animal,
  handleScore,
  opponentsScore,
  opponentsName,
}) => {
  const [gameOver, setGameOver] = useState(false);
  const [alertBox, setAlertBox] = useState<boolean>(false);
  const [goAlert, setGoAlert] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState(0);

  const countriesUpper = countries.map((element) => {
    return element.toUpperCase();
  });
  const namesUpper = names.map((element) => {
    return element.toUpperCase();
  });
  const animalsUpper = animals.map((element) => {
    return element.toUpperCase();
  });

  const clearFields = (): void => {
    setCountryInput("");
    setNameInput("");
    setAnimalInput("");
  };

  const validateCountry = (country: string): boolean => {
    if (country.substring(0, 1).toUpperCase() === letter) {
      if (countriesUpper.includes(country.toUpperCase())) {
        return true;
      }
    }
    setCountryInput("");
    return false;
  };
  const validateName = (name: string): boolean => {
    if (name.substring(0, 1).toUpperCase() === letter) {
      if (namesUpper.includes(name.toUpperCase())) {
        return true;
      }
    }
    setNameInput("");
    return false;
  };
  const validateAnimal = (animal: string): boolean => {
    if (animal.substring(0, 1).toUpperCase() === letter) {
      if (animalsUpper.includes(animal.toUpperCase())) {
        return true;
      }
    }
    setAnimalInput("");
    return false;
  };

  const Bing = (setFinalScore: Function) => {
    // if (country === "" || name === "" || animal === "") {
    //   setAlertBox(true);
    //   setTimeout(() => {
    //     setAlertBox(false);
    //   }, 3000);
    //   return;
    // }
    if (validateCountry(country)) {
      setFinalScore(finalScore + 10);
    }
    if (validateName(name)) {
      setFinalScore(finalScore + 10);
    }
    if (validateAnimal(animal)) {
      setFinalScore(finalScore + 10);
    }
    clearFields();
  };

  return (
    <div id="glass" className={"lg:w-[60vw] border m-auto p-10 rounded-3xl"}>
        <div className={"flex"} >
            <p>{opponentsName} : </p>
            <p> {opponentsScore} </p>
        </div>
      <div className="hover:cursor-default grid sm:grid-cols-3 grid-cols-2">
        <p className={"mb-10 sm:text-2xl components"}>Timer - {timer}</p>
        <div className="flex flex-col justify-center items-center">
          <p className="">Bingo says letter</p>
          <h1 className="text-7xl font-bold">{letter}</h1>
        </div>
        <p className={"mb-10 sm:text-2xl components"}>Your Score - {finalScore}</p>
      </div>
      <div className="mb-10 grid sm:grid-cols-3 gap-10">
        <input
          className="px-4 placeholder:text-[rgba(201,234,255,0.3)] text-xl py-2 bg-transparent border-b-2 placeholder-white outline-none border-[#0099FF] text-white focus:shadow-2xl focus:shadow-[#0099FF]"
          type="text"
          placeholder="Country"
          onChange={(e) => {
            handleChange(e.target.value, "country");
          }}
        />
        <input
          className="px-4 placeholder:text-[rgba(201,234,255,0.3)] text-xl py-2 bg-transparent border-b-2 placeholder-white outline-none border-[#0099FF] text-white focus:shadow-2xl focus:shadow-[#0099FF]"
          type="text"
          placeholder="Name"
          onChange={(e) => {
            handleChange(e.target.value, "name");
          }}
        />
        <input
          className="px-4 placeholder:text-[rgba(201,234,255,0.3)] text-xl py-2 bg-transparent border-b-2 placeholder-white outline-none border-[#0099FF] text-white focus:shadow-2xl focus:shadow-[#0099FF]"
          type="text"
          placeholder="Animal"
          onChange={(e) => {
            handleChange(e.target.value, "animal");
          }}
        />
      </div>
      <a
        id="button"
        onClick={() => {
          Bing(setFinalScore);
          handleScore(finalScore);
        }}
        className="sm:w-[40%] block m-auto text-center"
      >
        <span>Submit</span>
        <i></i>
      </a>
    </div>
  );
};
