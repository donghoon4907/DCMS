import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  GET_CHANNELLIST_REQUEST,
  GET_CHANNELLIST_SUCCESS,
  GET_CHANNELLIST_FAILURE
} from "../reducers/channel";
import { axiosErrorHandle } from "../module/error";
import { showToast } from "../module/toast";
import { makeListQuery } from "../module/query";

function getListAPI(payload) {
  return axios
    .get(makeListQuery({ type: "channel", ...payload }))
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function* getList(action) {
  const { response, error } = yield call(getListAPI, action.payload);
  if (response) {
    yield put({
      type: GET_CHANNELLIST_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    const { message, type } = axiosErrorHandle(error);
    yield put({
      type: GET_CHANNELLIST_FAILURE,
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
  yield takeEvery(GET_CHANNELLIST_REQUEST, getList);
}

export default function*() {
  yield all([fork(watchGetList)]);
}
