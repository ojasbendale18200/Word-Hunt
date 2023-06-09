import React from "react";
import { UList } from "../Components/UList";
import "../Styles/Universal.css";
import { AllRoutesProps } from "../utils/types";
import { User } from "../utils/types";
import { Invitation } from "../utils/types";
import { InvitationFrom } from "../utils/types";
import { useNavigate } from "react-router-dom";



const UsersList: React.FC<AllRoutesProps> = ({ socket }) => {
    const [users, setUsers] = React.useState<User[]>([]);
    const [token, setToken] = React.useState<string>("");
    //   const [invitationFrom, setInvitationFrom] =React.useState<InvitationFrom>(initialState);
    const [invitationFrom, setInvitationFrom] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const [invitedBy, setinvitedBy] = React.useState<string>("");

    const [sendResponse, setSendResponse] = React.useState<boolean>(false);
    const [invitationstatus, setInvitationStatus] = React.useState<Invitation>({
        msg: "",
    });

    const navigate = useNavigate();

    const handleInvitationResponse = (sendResponse: boolean) => {
        // setSendResponse(true);
        // console.log(sendResponse);
        // send your response
        socket.emit("invitationResponseFromOpponent", {
            responseFromOpponent: true,
            host: invitedBy,
        });
        navigate("/multiplayer");
    };

    React.useEffect(() => {
        // listen to invitations

        socket.on("invitationForYou", async ({ invitedBy, name }) => {
            // console.log(invitedBy);
            if (invitedBy._id !== "") {
                setName(name);
                setinvitedBy(invitedBy);
                setInvitationFrom(invitedBy);
                // console.log(invitationFrom);
                // display a toast saying `${name} has sent you an invitation` => Accept / Reject
                // when the user is clicking on accept redirect him to multiplayer page.
            }
        });
    }, [invitationFrom]);

    // listen to invitation response from server
    socket.on("invitationResponse", ({ msg }) => {
        // console.log(msg);
        if (msg === "Invitation Accepted") {
            navigate("/multiplayer");
        }
    });

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
            // console.log(usersData);
            setUsers(usersData);
        };
        socket.on("updatedStatusList", handleUsersList);

        return () => {
            socket.off("updatedStatusList", handleUsersList);
        };
    }, [users]);

    // Emit "inviteUser" event
    const handleInvite = (invitedUsersID: string): void => {
        socket.emit("inviteUser", invitedUsersID);
    };

    return (
        <div className="text-white relative">
            {
                name !== "" && <div
                    id="glassWA"
                    className="alertWarning right-[1%] top-[12%] w-[27%] z-10 absolute transition duration-500 m-auto text-center p-4 mb-4 rounded-lg dark:text-yellow-300 bg-[rgba(255,255,255,0.2)] text-lg"
                    role="alert"
                >
                    <span className="font-medium">
                        You have an invitation from {name}
                    </span>
                    <div className="flex justify-between px-5 mt-8">
                        <button
                            className="hover:text-white hover:animate-bounce transition duration-500 text-green-500"
                            onClick={() => handleInvitationResponse(sendResponse)}
                        >
                            Accept
                        </button>
                        <button className="hover:text-white hover:animate-ping transition duration-500 text-red-500">
                            Reject
                        </button>
                    </div>
                </div>
            }
            <h1 className="text-center text-4xl my-10">Users List</h1>
            <div
                id="glass"
                className="flex flex-col border-black border-2 w-[40%] m-auto gap-2 h-[70vh] overflow-y-auto"
            >
                {users[0] ? (
                    users.map((e) => {
                        return <UList data={e} key={e._id} invite={handleInvite} />;
                    })
                ) : (
                    <p className="text-center text-2xl mt-5">
                        No users active at the moment
                    </p>
                )}
            </div>
        </div>
    );
};

export default UsersList;
