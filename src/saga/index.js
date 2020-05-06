import { all, call } from "redux-saga/effects";
import axios from "axios";
import user from "./user";
import program from "./program";
import content from "./content";
import post from "./post";
import cast from "./cast";
import genre from "./genre";
import channel from "./channel";
import youtube from "./youtube";
import dashboard from "./dashboard";

axios.defaults.baseURL = "http://localhost:3001/api";

export default function* () {
  yield all([
    call(user),
    call(program),
    call(content),
    call(post),
    call(cast),
    call(genre),
    call(channel),
    call(youtube),
    call(dashboard)
  ]);
}
