import axios from "axios";
import { User } from "../interfaces/User";

const api: string = `${process.env.REACT_APP_API}/Users`;

export function checkUser(user: User): Promise<any> {
  return axios.get(`${api}?email=${user.email}`);
}

export function addUser(user: User): Promise<any> {
  // user.id = String(Math.floor(Math.random() * 1000));
  return axios.post(api, user);
}
