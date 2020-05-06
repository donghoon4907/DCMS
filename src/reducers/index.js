import { combineReducers } from "redux";
import common from "./common";
import user from "./user";
import program from "./program";
import content from "./content";
import post from "./post";
import cast from "./cast";
import genre from "./genre";
import channel from "./channel";
import youtube from "./youtube";
import dashboard from "./dashboard";

export default combineReducers({
  common,
  user,
  post,
  program,
  content,
  cast,
  genre,
  channel,
  youtube,
  dashboard
});
