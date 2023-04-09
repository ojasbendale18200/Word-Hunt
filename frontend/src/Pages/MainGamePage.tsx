import React, { useEffect } from 'react';
import { GameCard } from '../Components/GameCard';
import { useState } from 'react';

export const MainGamePage: React.FC = () => {
    const [countryInput, setCountryInput] = useState<string>("");
    const [nameInput, setNameInput] = useState<string>("");
    const [animalInput, setAnimalInput] = useState<string>("");
    const [score, setScore] = useState<number>(0);
    const [alertBox, setAlertBox] = useState<boolean>(false);
    const [letter, setLetter] = useState<string>("B");
    const [time, setTime] = useState<number>(50);
    const handleChange = (inp: string, inputName: string) => {
        if (inputName === "country") {
            setCountryInput(inp);
        } else if (inputName === "name") {
            setNameInput(inp);
        } else if (inputName === "animal") {
            setAnimalInput(inp);
        }
    }
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                }
                return prev - 1;
            })
        }, 1000)
        return () => {
            clearInterval(timer);
        }
    }, [])
    const handleSubmit = () => {
        type objToSend = {
            country: string,
            name: string,
            animal: string
        }
        const dataToSend: objToSend = {
            country: countryInput,
            name: nameInput,
            animal: animalInput
        }
        if (countryInput === "" || nameInput === "" || animalInput === "") {
            setAlertBox(true);
            setTimeout(() => {
                setAlertBox(false);
            }, 3000)
        } else {
            console.log(dataToSend);
        }
    }
    return (
        <div className='relative'>
            {alertBox &&
                <div className="alertWarning absolute right-[45%] transition duration-500 m-auto text-center p-4 mb-4 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 text-lg" role="alert">
                    <span className="font-medium">All fields required!</span>
                </div>
            }
            <div className=' text-white font-[cursive] flex items-center h-[700px]'>
                <GameCard handleChange={handleChange} handleSubmit={handleSubmit} score={score} letter={letter} time={time} />
            </div>
        </div>
    )
}