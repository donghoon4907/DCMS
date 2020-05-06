import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_WEEKPOSTCOUNT_REQUEST,
  LOAD_WEEKPOSTCOUNT_SUCCESS,
  LOAD_WEEKPOSTCOUNT_FAILURE,
  LOAD_WEEKFOLLOWCOUNT_REQUEST,
  LOAD_WEEKFOLLOWCOUNT_SUCCESS,
  LOAD_WEEKFOLLOWCOUNT_FAILURE
} from "../reducers/dashboard";
import { axiosErrorHandle } from "../module/error";
import { showToast } from "../module/toast";

function loadWeekPostCountAPI(_) {
  return axios
    .post(
      "/dashboard/week-post-count",
      {},
      {
        withCredentials: true
      }
    )
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

function loadWeekFollowCountAPI(_) {
  return axios
    .post(
      "/dashboard/week-follower-count",
      {},
      {
        withCredentials: true
      }
    )
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

function* loadWeekPostCount(action) {
  const { response, error } = yield call(loadWeekPostCountAPI);
  if (response) {
    yield put({
      type: LOAD_WEEKPOSTCOUNT_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    const { message, type } = axiosErrorHandle(error);
    yield put({
      type: LOAD_WEEKPOSTCOUNT_FAILURE,
      payload: message
    });
    showToast({
      type,
      message
    });
  }
}

function* loadWeekFollowCount(action) {
  const { response, error } = yield call(loadWeekFollowCountAPI);
  if (response) {
    yield put({
      type: LOAD_WEEKFOLLOWCOUNT_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    const { message, type } = axiosErrorHandle(error);
    yield put({
      type: LOAD_WEEKFOLLOWCOUNT_FAILURE,
      payload: message
    });
    showToast({
      type,
      message
    });
  }
}

// 주간 추가한 포스트 수 가져오기
function* watchLoadWeekPostCount() {
  yield takeEvery(LOAD_WEEKPOSTCOUNT_REQUEST, loadWeekPostCount);
}
// 주간 추가된 팔로워 수 가져오기
function* watchLoadWeekFollowCount() {
  yield takeEvery(LOAD_WEEKFOLLOWCOUNT_REQUEST, loadWeekFollowCount);
}
export default function* () {
  yield all([fork(watchLoadWeekPostCount), fork(watchLoadWeekFollowCount)]);
}
