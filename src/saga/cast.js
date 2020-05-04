import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  SEARCH_CASTLIST_REQUEST,
  SEARCH_CASTLIST_SUCCESS,
  SEARCH_CASTLIST_FAILURE
} from "../reducers/cast";

import { axiosErrorHandle } from "../module/error";
import { showToast } from "../module/toast";
import { makeListQuery } from "../module/query";

function getCastListAPI(payload) {
  return axios
    .get(makeListQuery({ type: "cast", ...payload }))
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function* searchCastList(action) {
  const { response, error } = yield call(getCastListAPI, action.payload);
  if (response) {
    yield put({
      type: SEARCH_CASTLIST_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    const { message, type } = axiosErrorHandle(error);
    yield put({
      type: SEARCH_CASTLIST_FAILURE,
      payload: message
    });
    showToast({
      type,
      message
    });
  }
}

// 출연진 검색 결과 로드
function* watchCastSearchList() {
  yield takeEvery(SEARCH_CASTLIST_REQUEST, searchCastList);
}
export default function*() {
  yield all([fork(watchCastSearchList)]);
}
