import React from 'react';
import { GameCard } from '../Components/GameCard';
import { useState } from 'react';

export const MainGamePage: React.FC = () => {
    const [countryInput, setCountryInput] = useState<string>("");
    const [nameInput, setNameInput] = useState<string>("");
    const [animalInput, setAnimalInput] = useState<string>("");
    console.log()
    const handleChange = (inp: string, inputName: string) => {
        if (inputName === "country") {
            setCountryInput(inp);
        } else if (inputName === "name") {
            setNameInput(inp);
        } else if (inputName === "animal") {
            setAnimalInput(inp);
        }
    }
    return (
        <div className='text-white font-[cursive] flex items-center h-3/4 border'>
            <GameCard handleChange={handleChange} />
        </div>
    )
}