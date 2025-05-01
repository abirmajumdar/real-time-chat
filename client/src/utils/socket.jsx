import { BASE_URL } from "./utils";
import io from "socket.io-client";

export const socket = io(BASE_URL, { transports: ["websocket"] });