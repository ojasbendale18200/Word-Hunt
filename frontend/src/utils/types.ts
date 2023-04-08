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
  _id : string,
  winner_socketId : string;
  winner_name : string;
  winner_score : number;
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