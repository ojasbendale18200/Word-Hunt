import React from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4321");

interface User {
  userID: string;
  name: string;
  email: string;
  status: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [token, setToken] = React.useState<string>("");

  // If token is present then emit "updateStatus" event
  React.useEffect(() => {
    const storedtoken = localStorage.getItem("userToken");
    setToken(storedtoken || "");
    if (token) {
      socket.emit("updateStatus", token);
    }

    return () => {
      socket.off("updateStatus");
    };
  }, [token]);

  // listen to the "statusUpdated" event
  React.useEffect(() => {
    const handleUsersList = (usersData: User[]): void => {
      console.log(usersData);
      setUsers(usersData);
    };
    socket.on("updatedStatusList", handleUsersList);

    return () => {
      socket.off("updatedStatusList", handleUsersList);
    };
  }, [users]);

  // Emit "inviteUser" event 
  const handleInvite = (invitedUsersID : string): void => {
    socket.emit("inviteUser", invitedUsersID)
  }

  return <div>
    <h1>Users List</h1>
    {/* map the users array over here... */}
  </div>;
};

export default UsersList;
