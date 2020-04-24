import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  INACTIVE_PROGRAMITEM,
  GET_PROGRAMLIST_REQUEST,
  GET_PROGRAMLIST_SUCCESS,
  GET_PROGRAMLIST_FAILURE,
  ADD_PROGRAMITEM_REQUEST,
  ADD_PROGRAMITEM_SUCCESS,
  ADD_PROGRAMITEM_FAILURE,
  UPDATE_PROGRAMITEM_REQUEST,
  UPDATE_PROGRAMITEM_SUCCESS,
  UPDATE_PROGRAMITEM_FAILURE,
  GET_GENRELIST_REQUEST,
  GET_GENRELIST_SUCCESS,
  GET_GENRELIST_FAILURE,
  GET_DETAILGENRELIST_REQUEST,
  GET_DETAILGENRELIST_SUCCESS,
  GET_DETAILGENRELIST_FAILURE,
  GET_AGEGRADELIST_REQUEST,
  GET_AGEGRADELIST_SUCCESS,
  GET_AGEGRADELIST_FAILURE,
  GET_CHANNELLIST_REQUEST,
  GET_CHANNELLIST_SUCCESS,
  GET_CHANNELLIST_FAILURE,
  SEARCH_PROGRAMLIST_REQUEST,
  SEARCH_PROGRAMLIST_SUCCESS,
  SEARCH_PROGRAMLIST_FAILURE
} from "../reducers/program";
import {
  HIDE_ADDPROGRAMMODAL,
  HIDE_UPDATEPROGRAMMODAL
} from "../reducers/common";
import { axiosErrorHandle } from "../module/error";
import { showToast } from "../module/toast";
import { makeListQuery } from "../module/query";

function getListAPI(payload) {
  return axios
    .get(makeListQuery({ type: "program", ...payload }))
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function addItemAPI(payload) {
  const {
    title,
    description,
    selectedFile,
    prdtYear,
    genre,
    detailGenre,
    ageGrade,
    channel
  } = payload;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("product_year", prdtYear);
  formData.append("genre", genre);
  formData.append("detailgenre", detailGenre);
  formData.append("agegrade", ageGrade);
  formData.append("channel", channel);
  if (description) {
    formData.append("description", description);
  }
  if (selectedFile) {
    formData.append("file", selectedFile);
  }

  return axios
    .post("/program/add", formData, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function updateItemAPI(payload) {
  const {
    id,
    title,
    description,
    selectedFile,
    prdtYear,
    genre,
    detailGenre,
    ageGrade,
    channel
  } = payload;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("product_year", prdtYear);
  formData.append("genre", genre);
  formData.append("detailgenre", detailGenre);
  formData.append("agegrade", ageGrade);
  formData.append("channel", channel);
  if (id) {
    formData.append("id", id);
  }
  if (description) {
    formData.append("description", description);
  }
  if (selectedFile) {
    formData.append("file", selectedFile);
  }

  return axios
    .put("/program/update", formData, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function getGenreListAPI() {
  return axios
    .get("/program/genre")
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function getDetailGenreListAPI({ id }) {
  return axios
    .get(`/program/detailgenre?id=${id}`)
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function getAgeGradeListAPI() {
  return axios
    .get("/program/agegrade")
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function getChannelListAPI() {
  return axios
    .get("/program/channel")
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function* getList(action) {
  const { response, error } = yield call(getListAPI, action.payload);
  if (response) {
    yield put({
      type: GET_PROGRAMLIST_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    const { message, type } = axiosErrorHandle(error);
    yield put({
      type: GET_PROGRAMLIST_FAILURE,
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
      type: ADD_PROGRAMITEM_SUCCESS
    });
    showToast({
      type: "success",
      message: response.data.message
    });
    yield put({
      type: HIDE_ADDPROGRAMMODAL
    });
  } else if (error) {
    const { message, type, isExpired } = axiosErrorHandle(error);
    if (isExpired) {
      window.location.reload();
    } else {
      yield put({
        type: ADD_PROGRAMITEM_FAILURE,
        payload: message
      });
      showToast({
        type,
        message
      });
    }
  }
}
function* updateItem(action) {
  const { response, error } = yield call(updateItemAPI, action.payload);
  if (response) {
    yield put({
      type: UPDATE_PROGRAMITEM_SUCCESS,
      payload: response.data.data
    });
    showToast({
      type: "success",
      message: response.data.message
    });
    yield put({
      type: INACTIVE_PROGRAMITEM
    });
    yield put({
      type: HIDE_UPDATEPROGRAMMODAL
    });
  } else if (error) {
    const { message, type, isExpired } = axiosErrorHandle(error);
    if (isExpired) {
      window.location.reload();
    } else {
      yield put({
        type: UPDATE_PROGRAMITEM_FAILURE,
        payload: message
      });
      showToast({
        type,
        message
      });
    }
  }
}
function* getGenreList(action) {
  const { response, error } = yield call(getGenreListAPI);
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
function* getAgeGradeList(action) {
  const { response, error } = yield call(getAgeGradeListAPI);
  if (response) {
    yield put({
      type: GET_AGEGRADELIST_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    const { message, type } = axiosErrorHandle(error);
    yield put({
      type: GET_AGEGRADELIST_FAILURE,
      payload: message
    });
    showToast({
      type,
      message
    });
  }
}
function* getChannelList(action) {
  const { response, error } = yield call(getChannelListAPI);
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
function* searchList(action) {
  const { response, error } = yield call(getListAPI, action.payload);
  if (response) {
    yield put({
      type: SEARCH_PROGRAMLIST_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    const { message, type } = axiosErrorHandle(error);
    yield put({
      type: SEARCH_PROGRAMLIST_FAILURE,
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
  yield takeEvery(GET_PROGRAMLIST_REQUEST, getList);
}
// 등록
function* watchAddItem() {
  yield takeEvery(ADD_PROGRAMITEM_REQUEST, addItem);
}
// 수정
function* watchUpdateItem() {
  yield takeEvery(UPDATE_PROGRAMITEM_REQUEST, updateItem);
}
// 장르 목록 로드
function* watchGetGenreList() {
  yield takeEvery(GET_GENRELIST_REQUEST, getGenreList);
}
// 세부장르 목록 로드
function* watchGetDetailGenreList() {
  yield takeEvery(GET_DETAILGENRELIST_REQUEST, getDetailGenreList);
}
// 연령등급 목록 로드
function* watchGetAgeGradeList() {
  yield takeEvery(GET_AGEGRADELIST_REQUEST, getAgeGradeList);
}
// 채널 목록 로드
function* watchGetChannelList() {
  yield takeEvery(GET_CHANNELLIST_REQUEST, getChannelList);
}
// 검색 결과 로드
function* watchSearchList() {
  yield takeEvery(SEARCH_PROGRAMLIST_REQUEST, searchList);
}
export default function*() {
  yield all([
    fork(watchGetList),
    fork(watchAddItem),
    fork(watchUpdateItem),
    fork(watchGetGenreList),
    fork(watchGetDetailGenreList),
    fork(watchGetAgeGradeList),
    fork(watchGetChannelList),
    fork(watchSearchList)
  ]);
}
