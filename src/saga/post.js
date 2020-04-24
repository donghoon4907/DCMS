import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  GET_POSTLIST_REQUEST,
  GET_POSTLIST_SUCCESS,
  GET_POSTLIST_FAILURE,
  ADD_POSTITEM_REQUEST,
  ADD_POSTITEM_SUCCESS,
  ADD_POSTITEM_FAILURE
} from "../reducers/post";
import { SHOW_LOGINLAYER, HIDE_ADDPOSTMODAL } from "../reducers/common";
import { LOG_OUT_SUCCESS } from "../reducers/user";
import { axiosErrorHandle } from "../module/error";
import { showToast } from "../module/toast";
import { makeListQuery } from "../module/query";

function getListAPI(payload) {
  return axios
    .get(makeListQuery({ type: "post", ...payload }))
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function addItemAPI(payload) {
  const { title, description, tags, selectedFile } = payload;

  const formData = new FormData();
  formData.append("title", title);
  if (description) {
    formData.append("description", description);
  }
  if (tags.length > 0) {
    formData.append("tags", tags);
  }
  if (selectedFile) {
    formData.append("file", selectedFile);
  }

  return axios
    .post("/post/add", formData, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function* getList(action) {
  const { response, error } = yield call(getListAPI, action.payload);
  if (response) {
    yield put({
      type: GET_POSTLIST_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    const { message, type } = axiosErrorHandle(error);
    yield put({
      type: GET_POSTLIST_FAILURE,
      payload: message
    });
    showToast({
      type,
      message
    });
  }
}
function* addItem(action) {
  const { response, error } = yield call(addItemAPI, action.payload);
  if (response) {
    yield put({
      type: ADD_POSTITEM_SUCCESS,
      payload: response.data
    });
    showToast({
      type: "success",
      message: response.data.message
    });
    yield put({
      type: GET_POSTLIST_REQUEST,
      payload: {
        lastId: 0,
        limit: 20
      }
    });
    yield put({
      type: HIDE_ADDPOSTMODAL
    });
  } else if (error) {
    const { message, type, isExpired } = axiosErrorHandle(error);
    if (isExpired) {
      yield put({
        type: LOG_OUT_SUCCESS
      });
      yield put({
        type: HIDE_ADDPOSTMODAL
      });
      yield put({
        type: SHOW_LOGINLAYER
      });
    } else {
      yield put({
        type: ADD_POSTITEM_FAILURE,
        payload: message
      });
    }
    showToast({
      type,
      message
    });
  }
}

// 목록 로드
function* watchGetList() {
  yield takeEvery(GET_POSTLIST_REQUEST, getList);
}
// 등록
function* watchAddItem() {
  yield takeEvery(ADD_POSTITEM_REQUEST, addItem);
}
export default function*() {
  yield all([fork(watchGetList), fork(watchAddItem)]);
}
