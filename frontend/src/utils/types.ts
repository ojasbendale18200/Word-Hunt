import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export interface register {
  name: string;
  email: string;
  password: string;
}

export interface login {
  email: string;
  password: string;
}

export interface Game {
  _id: string;
  winner_socketId: string;
  winner_name: string;
  winner_score: number;
  player_1: {
    _id: string;
    name: string;
    score: number;
    socketId: string;
  };
  player_2: {
    _id: string;
    name: string;
    score: number;
    socketId: string;
  };
}

export interface AllRoutesProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  status: string;
}

export interface Invitation {
  msg: string;
}

export interface InvitationFrom {
  name: string;
  email: string;
  password: string;
  status: string;
  socketId: string;
  matchData: {
    _id: string;
    winner_socketId: string;
    winner_name: string;
    winner_score: number;
    player_1: {
      _id: string;
      name: string;
      score: number;
      socketId: string;
    };
    player_2: {
      _id: string;
      name: string;
      score: number;
      socketId: string;
    };
  }[];
  __v: number;
  _id: string;
}
