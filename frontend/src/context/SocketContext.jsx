import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { BASE_URL } from "../constants/url";

const SocketContext = createContext();

export const useSocket = () => {
	return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const newSocket = io(BASE_URL);
		setSocket(newSocket);

		return () => {
			if (newSocket) newSocket.close();
		};
	}, []);

	const value = {
		socket,
	};

	return (
		<SocketContext.Provider value={value}>{children}</SocketContext.Provider>
	);
};
