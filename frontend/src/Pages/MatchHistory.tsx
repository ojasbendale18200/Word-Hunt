import React from "react";
import "../Styles/Universal.css";
import { AllRoutesProps } from "../utils/types";
import { InvitationFrom } from "../utils/types";

const initialState = {
    name: "",
    email: "",
    password: "",
    status: "",
    socketId: "",
    matchData: [
        {
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
        },
    ],
    __v: 0,
    _id: "",
};

export const MatchHistory: React.FC<AllRoutesProps> = ({ socket }) => {
    const [data, setData] = React.useState<InvitationFrom>(initialState);
    const userName: string = localStorage.getItem("userName") || "";

    React.useEffect(() => {
        socket.on("getUsersData", async (user) => {
            setData((e) => (e = user));
            // console.log(user);
        });
    }, [socket]);
    React.useEffect(() => {
        socket.emit("getMatchHistory");
    }, []);
    return (
        <div
            id="glass"
            className="flex flex-col hover:cursor-default text-white md:w-[60%] m-auto mt-10 border-solid gap-3 border-2 h-[75vh]"
        >
            <p className="text-center text-xl md:text-3xl my-4">Match History</p>
            <div className="grid grid-cols-2 text-center md:text-2xl">
                <div className="grid md:grid-cols-1 border-r-2">
                    <p>Your score</p>
                </div>
                <div className="grid grid-cols-2">
                    <p className="border-r-2">Opponent's Name</p>
                    <p>Opponent's Score</p>
                </div>
            </div>
            <div className="flex flex-col gap-5 overflow-x-auto">
                {data ? (
                    data.matchData.reverse().map((e, i) => {
                        if (i % 2 === 0) {
                            return (
                                <div
                                    className="grid grid-cols-2 text-center md:text-xl"
                                    key={i}
                                >
                                    <div className="grid grid-cols-1">
                                        <p>
                                            {" "}
                                            {e.player_1.name === userName
                                                ? `${`${e.player_1.score}` +
                                                `${e.player_1.score === e.winner_score ? "🥳" : ""
                                                }`
                                                }`
                                                : `${`${e.player_2.score}` +
                                                `${e.player_2.score === e.winner_score ? "🥳" : ""
                                                }`
                                                }`}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <p>
                                            {e.player_1.name === userName
                                                ? e.player_2.name
                                                : e.player_1.name}{" "}
                                        </p>
                                        <p>
                                            {" "}
                                            {e.player_1.name === userName
                                                ? `${`${e.player_2.score}` +
                                                `${e.player_2.score === e.winner_score ? "🥳" : ""
                                                }`
                                                }`
                                                : `${`${e.player_1.score}` +
                                                `${e.player_1.score === e.winner_score ? "🥳" : ""
                                                }`
                                                }`}
                                        </p>
                                    </div>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })
                ) : (
                    <p className="text-center md:text-xl">Not matches played</p>
                )}
            </div>
        </div>
    );
};
