import React, { useEffect } from "react";
import { GameCard } from "../Components/GameCard";
import { useState } from "react";
import { AllRoutesProps, Game } from "../utils/types";


const gameStateInitial = {
  _id: "",
  winner_socketId: "",
  winner_name: "",
  winner_score: 0,
  player_1: {
    _id: "",
    name: "",
    score: 0,
    socketId: "",
  },
  player_2: {
    _id: "",
    name: "",
    score: 0,
    socketId: "",
  },
};

export const MainGamePage: React.FC<AllRoutesProps> = ({ socket }) => {
  const [countryInput, setCountryInput] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [animalInput, setAnimalInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [alertBox, setAlertBox] = useState<boolean>(false);
  const [letter, setLetter] = useState<string>("B");
  const [timer, setTimer] = React.useState<number>(60);
  const [game, setGame] = React.useState<Game>(gameStateInitial);
  const [opponentsName, setOpponentsName] = React.useState<string>("");
  const [opponentsScore, setOpponentsScore] = React.useState<number>(0);

  const handleChange = (inp: string, inputName: string) => {
    if (inputName === "country") {
      setCountryInput(inp);
    } else if (inputName === "name") {
      setNameInput(inp);
    } else if (inputName === "animal") {
      setAnimalInput(inp);
    }
  };

  const handleSubmit = () => {
    type objToSend = {
      country: string;
      name: string;
      animal: string;
    };
    const dataToSend: objToSend = {
      country: countryInput,
      name: nameInput,
      animal: animalInput,
    };
    if (countryInput === "" || nameInput === "" || animalInput === "") {
      setAlertBox(true);
      setTimeout(() => {
        setAlertBox(false);
      }, 3000);
    } else {
      console.log(dataToSend);
    }
  };

  // listen to game created event
  socket.on("gameCreated", (game: Game) => {
    setGame(game);
    // get opponents name and score
    if (game.player_1.socketId === socket.id) {
      setOpponentsName(game.player_2.name);
      setOpponentsScore(game.player_2.score);
    } else {
      setOpponentsName(game.player_1.name);
      setOpponentsScore(game.player_1.score);
    }
  });

  // emit event to start the timer on the server.
  React.useEffect(() => {
    socket.emit("startTimer", game._id);
  }, []);

  // to update the score of the user on the server
  React.useEffect(() => {
    socket.emit("scoreUpdate", {
      score,
      socketId: socket.id,
      gameId: game._id,
    });

    return () => {
      socket.off("scoreUpdate");
    };
  }, [score]);

  return (
    <div className="relative">
      {alertBox && (
        <div
          className="absolute right-[45%] transition duration-500 m-auto text-center p-4 mb-4 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 text-lg"
          role="alert"
        >
          <span className="font-medium">All fields required!</span>
        </div>
      )}
      <div className=" text-white font-[cursive] flex items-center h-[700px]">
        <GameCard
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          score={score}
          letter={letter}
        />
      </div>
    </div>
  );
};
