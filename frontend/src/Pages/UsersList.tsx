import React from "react";
import { UList } from "../Components/UList";
import "../Styles/Universal.css"
import { AllRoutesProps } from "../utils/types";
import { User } from "../utils/types";


const UsersList: React.FC<AllRoutesProps> = ({socket}) => {
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
    const handleInvite = (invitedUsersID: string): void => {
        socket.emit("inviteUser", invitedUsersID)
    }

    return <div className="text-white">
        <h1 className="text-center text-4xl my-10">Users List</h1>
        <div id="glass" className="flex flex-col border-black border-2 w-[40%] m-auto gap-2 h-[70vh] overflow-y-auto">
            {users[0] ?
                users.map(e => {
                    return (<UList data={e} key={e.userID} invite={handleInvite} />)
                })
                :
                <p className="text-center text-2xl mt-5">
                    No users active at the moment
                </p>
            }
        </div>
    </div>;
};

export default UsersList;
