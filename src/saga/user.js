import {
  all,
  fork,
  takeEvery,
  takeLatest,
  call,
  put
} from "redux-saga/effects";
import axios from "axios";
import {
  DOUBLE_CHECK_REQUEST,
  DOUBLE_CHECK_SUCCESS,
  DOUBLE_CHECK_FAILURE,
  CHECK_EMAIL_REQUEST,
  CHECK_EMAIL_SUCCESS,
  CHECK_EMAIL_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE
} from "../reducers/user";
import { SHOW_LOGINLAYER, SHOW_DASHBOARD } from "../reducers/common";
import { axiosErrorHandle } from "../module/error";
import { showToast } from "../module/toast";

function dbcheckAPI(payload) {
  return axios
    .post("/user/check", payload)
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function checkEmailAPI(payload) {
  return axios
    .post("/user/email", payload)
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function signUpAPI(payload) {
  const { id, pwd, name, email, selectedFile } = payload;

  const formData = new FormData();
  formData.append("id", id);
  formData.append("pwd", pwd);
  formData.append("name", name);
  formData.append("email", email);
  if (selectedFile) {
    formData.append("file", selectedFile);
  }

  return axios
    .post("/user/add", formData)
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function logInAPI(payload) {
  return axios
    .post("/user/login", payload, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function logOutAPI() {
  return axios
    .post(
      "/user/logout",
      {},
      {
        withCredentials: true
      }
    )
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function loadUserAPI() {
  return axios
    .post(
      "/user/loadUser",
      {},
      {
        withCredentials: true
      }
    )
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function* dbcheck(action) {
  const { response, error } = yield call(dbcheckAPI, action.payload);
  if (response) {
    yield put({
      type: DOUBLE_CHECK_SUCCESS,
      payload: action.payload.id
    });
    showToast({ type: "success", message: response.data.message });
  } else if (error) {
    const { message, type } = axiosErrorHandle(error);
    yield put({
      type: DOUBLE_CHECK_FAILURE,
      payload: message
    });
    showToast({
      type,
      message
    });
  }
}
function* emailCheck(action) {
  const { response, error } = yield call(checkEmailAPI, action.payload);
  if (response) {
    const { token, message } = response.data;
    yield put({
      type: CHECK_EMAIL_SUCCESS,
      payload: { token, email: action.payload.email }
    });
    showToast({ type: "success", message });
  } else if (error) {
    const { message, type } = axiosErrorHandle(error);
    yield put({
      type: CHECK_EMAIL_FAILURE,
      payload: message
    });
    showToast({
      type,
      message
    });
  }
}
function* signUp(action) {
  const { response, error } = yield call(signUpAPI, action.payload);
  if (response) {
    yield put({
      type: SIGN_UP_SUCCESS
    });
    showToast({ type: "success", message: response.data.message });
    yield put({
      type: SHOW_LOGINLAYER
    });
  } else if (error) {
    const { message, type } = axiosErrorHandle(error);
    yield put({
      type: SIGN_UP_FAILURE,
      payload: message
    });
    showToast({
      type,
      message
    });
  }
}
function* logIn(action) {
  const { response, error } = yield call(logInAPI, action.payload);
  if (response) {
    yield put({
      type: LOG_IN_SUCCESS,
      payload: response.data
    });
    yield put({
      type: SHOW_DASHBOARD
    });
    showToast({
      type: "success",
      message: `${response.data.userId}님 반갑습니다.`
    });
  } else if (error) {
    const { message, type } = axiosErrorHandle(error);
    yield put({
      type: LOG_IN_FAILURE,
      payload: message
    });
    showToast({
      type,
      message
    });
  }
}
function* logOut(action) {
  const { response, error } = yield call(logOutAPI);
  if (response) {
    yield put({
      type: LOG_OUT_SUCCESS
    });
    yield put({
      type: SHOW_LOGINLAYER
    });
  } else if (error) {
    const { message, type } = axiosErrorHandle(error);
    yield put({
      type: LOG_OUT_FAILURE,
      payload: message
    });
    yield put({
      type: SHOW_LOGINLAYER
    });
    showToast({
      type,
      message
    });
  }
}
function* loadUser(action) {
  const { response, error } = yield call(loadUserAPI);
  if (response) {
    yield put({
      type: LOAD_USER_SUCCESS,
      payload: response.data
    });
    yield put({
      type: SHOW_DASHBOARD
    });
    showToast({
      type: "success",
      message: `${response.data.userId}님 반갑습니다.`
    });
  } else if (error) {
    const { message, type } = axiosErrorHandle(error);
    yield put({
      type: LOAD_USER_FAILURE,
      payload: message
    });
    yield put({
      type: SHOW_LOGINLAYER
    });
    showToast({
      type,
      message
    });
  }
}
// 중복 확인
function* watchDbCheck() {
  yield takeEvery(DOUBLE_CHECK_REQUEST, dbcheck);
}
// 이메일 체크
function* watchCheckEmail() {
  yield takeEvery(CHECK_EMAIL_REQUEST, emailCheck);
}
// 회원가입
function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}
// 로그인
function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}
// 로그아웃
function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}
// 사용자 정보 로드
function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}
export default function*() {
  yield all([
    fork(watchDbCheck),
    fork(watchCheckEmail),
    fork(watchSignUp),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchLoadUser)
  ]);
}
