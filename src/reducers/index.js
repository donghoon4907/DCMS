import { combineReducers } from "redux";
import common from "./common";
import user from "./user";
import program from "./program";
import content from "./content";
import post from "./post";

export default combineReducers({ common, user, post, program, content });

/**
 * Immer pattern
 *
 * 1. concat => single data: push / multiple datas: forEach and push
 * 2. filter => filter or splice
 */
