import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";
import {} from "../reducers/post";
import { INACTIVE_POSTITEM, UPDATE_POSTSTATUS } from "../reducers/post";
import { HIDE_ADDUPLOADVIDEOMODAL } from "../reducers/common";
import {
  CONNECT_OAUTH_REQUEST,
  CONNECT_OAUTH_SUCCESS,
  CONNECT_OAUTH_FAILURE,
  INSERT_VIDEO_REQUEST,
  INSERT_VIDEO_SUCCESS,
  INSERT_VIDEO_FAILURE
} from "../reducers/youtube";
import { axiosErrorHandle } from "../module/error";
import { showToast } from "../module/toast";

function connectOauthAPI() {
  return axios
    .get(`/youtube/oauth`, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function insertVideoAPI(payload) {
  return axios
    .post(`/youtube/video/insert`, payload, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function* connectOauth(action) {
  const { response, error } = yield call(connectOauthAPI);
  if (response) {
    yield put({
      type: CONNECT_OAUTH_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    const { message, type, isExpired } = axiosErrorHandle(error);
    if (isExpired) {
      window.location.reload();
    } else {
      yield put({
        type: CONNECT_OAUTH_FAILURE,
        payload: message
      });
      showToast({
        type,
        message
      });
    }
  }
}

function* insertVideo(action) {
  const { response, error } = yield call(insertVideoAPI, action.payload);
  if (response) {
    const { id, message } = response.data;
    yield put({
      type: INSERT_VIDEO_SUCCESS
    });
    yield put({
      type: INACTIVE_POSTITEM
    });
    yield put({
      type: UPDATE_POSTSTATUS,
      payload: id
    });
    yield put({
      type: HIDE_ADDUPLOADVIDEOMODAL
    });
    showToast({
      type: "success",
      message
    });
  } else if (error) {
    const { message, type, isExpired } = axiosErrorHandle(error);
    if (isExpired) {
      window.location.reload();
    } else {
      yield put({
        type: INSERT_VIDEO_FAILURE,
        payload: message
      });
      showToast({
        type,
        message
      });
    }
  }
}

// Oauth 인증
function* watchConnectOauth() {
  yield takeEvery(CONNECT_OAUTH_REQUEST, connectOauth);
}
// 영상 추가
function* watchInsertVideo() {
  yield takeEvery(INSERT_VIDEO_REQUEST, insertVideo);
}
export default function*() {
  yield all([fork(watchConnectOauth), fork(watchInsertVideo)]);
}
