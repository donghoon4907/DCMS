import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  GET_GENRELIST_REQUEST,
  GET_GENRELIST_SUCCESS,
  GET_GENRELIST_FAILURE,
  GET_DETAILGENRELIST_REQUEST,
  GET_DETAILGENRELIST_SUCCESS,
  GET_DETAILGENRELIST_FAILURE
} from "../reducers/genre";
import { axiosErrorHandle } from "../module/error";
import { showToast } from "../module/toast";
import { makeListQuery } from "../module/query";

function getListAPI(payload) {
  return axios
    .get(makeListQuery({ type: "genre", ...payload }))
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function getDetailGenreListAPI({ id }) {
  return axios
    .get(`/genre/detailgenre?id=${id}`)
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function* getList(action) {
  const { response, error } = yield call(getListAPI, action.payload);
  if (response) {
    yield put({
      type: GET_GENRELIST_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    const { message, type } = axiosErrorHandle(error);
    yield put({
      type: GET_GENRELIST_FAILURE,
      payload: message
    });
    showToast({
      type,
      message
    });
  }
}

function* getDetailGenreList(action) {
  const { response, error } = yield call(getDetailGenreListAPI, action.payload);
  if (response) {
    yield put({
      type: GET_DETAILGENRELIST_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    const { message, type } = axiosErrorHandle(error);
    yield put({
      type: GET_DETAILGENRELIST_FAILURE,
      payload: message
    });
    showToast({
      type,
      message
    });
  }
}

// 목록 로드
function* watchGetList() {
  yield takeEvery(GET_GENRELIST_REQUEST, getList);
}
// 세부장르 목록 로드
function* watchGetDetailGenreList() {
  yield takeEvery(GET_DETAILGENRELIST_REQUEST, getDetailGenreList);
}
export default function*() {
  yield all([fork(watchGetList), fork(watchGetDetailGenreList)]);
}
