import { all, call } from "redux-saga/effects";
import axios from "axios";
import user from "./user";
import program from "./program";
import content from "./content";
import post from "./post";

axios.defaults.baseURL = "http://localhost:3001/api";

export default function* () {
  yield all([call(user), call(program), call(content), call(post)]);
}
