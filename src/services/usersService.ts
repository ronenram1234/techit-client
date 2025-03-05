import axios from "axios";
import { User } from "../interfaces/User";
import { jwtDecode } from "jwt-decode";

const api: string = `${process.env.REACT_APP_API}/users`;

// login
export function checkUser(user: User) {
  return axios.post(`${api}/login`, user);
}

// register
export function addUser(user: User) {
  return axios.post(api, user);
}

// profile
export function getUserById() {
  return axios.get(`${api}/profile`, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token") as string),
    },
  });
}

// get payload
export function getPayloadFromToken() {
  let token: string = localStorage.getItem("token") as string;
  return jwtDecode<TokenPayload>(token);
}

interface TokenPayload {
  _id: string;
  isAdmin: boolean;
}


