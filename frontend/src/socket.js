import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // use deployed backend URL later

export default socket;
