import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  GET_POSTLIST_REQUEST,
  GET_POSTLIST_SUCCESS,
  GET_POSTLIST_FAILURE,
  ADD_POSTITEM_REQUEST,
  ADD_POSTITEM_SUCCESS,
  ADD_POSTITEM_FAILURE,
  UPDATE_POSTITEM_REQUEST,
  UPDATE_POSTITEM_SUCCESS,
  UPDATE_POSTITEM_FAILURE,
  ADD_LIKEPOST_REQUEST,
  ADD_LIKEPOST_SUCCESS,
  ADD_LIKEPOST_FAILURE,
  REMOVE_LIKEPOST_REQUEST,
  REMOVE_LIKEPOST_SUCCESS,
  REMOVE_LIKEPOST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE
} from "../reducers/post";
import { INIT_SELECTEDPROGRAM } from "../reducers/program";
import { INIT_SELECTEDCONTENT } from "../reducers/content";
import { HIDE_ADDPOSTMODAL, HIDE_UPDATEPOSTMODAL } from "../reducers/common";
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
  const { title, description, tags, selectedFile, contentId, frame } = payload;

  const formData = new FormData();
  formData.append("contentId", contentId);
  if (frame) {
    formData.append("frame", frame);
  }
  formData.append("title", title);
  if (description) {
    formData.append("description", description);
  }
  if (tags.length > 0) {
    formData.append("tags", tags.join(","));
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
function updateItemAPI(payload) {
  const { id, title, description, tags, selectedFile } = payload;

  const formData = new FormData();
  formData.append("title", title);
  if (description) {
    formData.append("description", description);
  }
  if (tags.length > 0) {
    formData.append("tags", tags.join(","));
  }
  if (selectedFile) {
    formData.append("file", selectedFile);
  }

  return axios
    .put(`/post/${id}`, formData, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function likeAPI({ id }) {
  return axios
    .post(
      `/post/${id}/like`,
      {},
      {
        withCredentials: true
      }
    )
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function unLikeAPI({ id }) {
  return axios
    .delete(`/post/${id}/like`, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function addCommentAPI({ id, content }) {
  return axios
    .post(
      `/post/${id}/comment`,
      {
        content
      },
      {
        withCredentials: true
      }
    )
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function updateCommentAPI({ id, content }) {
  return axios
    .put(
      `/post/${id}/comment`,
      {
        content
      },
      {
        withCredentials: true
      }
    )
    .then(response => ({ response }))
    .catch(error => ({ error }));
}
function removeCommentAPI({ id }) {
  return axios
    .delete(`/post/${id}/comment`, {
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
      type: ADD_POSTITEM_SUCCESS
    });
    showToast({
      type: "success",
      message: response.data.message
    });
    yield put({
      type: HIDE_ADDPOSTMODAL
    });
    yield put({
      type: INIT_SELECTEDPROGRAM
    });
    yield put({
      type: INIT_SELECTEDCONTENT
    });
  } else if (error) {
    const { message, type, isExpired } = axiosErrorHandle(error);
    if (isExpired) {
      window.location.reload();
    } else {
      yield put({
        type: ADD_POSTITEM_FAILURE,
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
      type: UPDATE_POSTITEM_SUCCESS,
      payload: response.data.data
    });
    showToast({
      type: "success",
      message: response.data.message
    });
    yield put({
      type: HIDE_UPDATEPOSTMODAL
    });
    yield put({
      type: INIT_SELECTEDPROGRAM
    });
    yield put({
      type: INIT_SELECTEDCONTENT
    });
    yield put({
      type: INACTIVE_POSTITEM
    });
  } else if (error) {
    const { message, type, isExpired } = axiosErrorHandle(error);
    if (isExpired) {
      window.location.reload();
    } else {
      yield put({
        type: UPDATE_POSTITEM_FAILURE,
        payload: message
      });
      showToast({
        type,
        message
      });
    }
  }
}
function* likeItem(action) {
  const { response, error } = yield call(likeAPI, action.payload);
  if (response) {
    yield put({
      type: ADD_LIKEPOST_SUCCESS
    });
    showToast({
      type: "info",
      message: response.data.message
    });
  } else if (error) {
    const { message, type, isExpired } = axiosErrorHandle(error);
    if (isExpired) {
      window.location.reload();
    } else {
      yield put({
        type: ADD_LIKEPOST_FAILURE,
        payload: message
      });
      showToast({
        type,
        message
      });
    }
  }
}
function* unlikeItem(action) {
  const { response, error } = yield call(unLikeAPI, action.payload);
  if (response) {
    yield put({
      type: REMOVE_LIKEPOST_SUCCESS
    });
    showToast({
      type: "info",
      message: response.data.message
    });
  } else if (error) {
    const { message, type, isExpired } = axiosErrorHandle(error);
    if (isExpired) {
      window.location.reload();
    } else {
      yield put({
        type: REMOVE_LIKEPOST_FAILURE,
        payload: message
      });
      showToast({
        type,
        message
      });
    }
  }
}
function* addComment(action) {
  const { response, error } = yield call(addCommentAPI, action.payload);
  if (response) {
    yield put({
      type: ADD_COMMENT_SUCCESS,
      payload: response.data.comment
    });
    showToast({
      type: "info",
      message: response.data.message
    });
  } else if (error) {
    const { message, type, isExpired } = axiosErrorHandle(error);
    if (isExpired) {
      window.location.reload();
    } else {
      yield put({
        type: ADD_COMMENT_FAILURE,
        payload: message
      });
      showToast({
        type,
        message
      });
    }
  }
}
function* updateComment(action) {
  const { response, error } = yield call(updateCommentAPI, action.payload);
  if (response) {
    yield put({
      type: UPDATE_COMMENT_SUCCESS,
      payload: response.data.comment
    });
    showToast({
      type: "success",
      message: response.data.message
    });
  } else if (error) {
    const { message, type, isExpired } = axiosErrorHandle(error);
    if (isExpired) {
      window.location.reload();
    } else {
      yield put({
        type: UPDATE_COMMENT_FAILURE,
        payload: message
      });
      showToast({
        type,
        message
      });
    }
  }
}
function* removeComment(action) {
  const { response, error } = yield call(removeCommentAPI, action.payload);
  if (response) {
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      payload: response.data.id
    });
    showToast({
      type: "success",
      message: response.data.message
    });
  } else if (error) {
    const { message, type, isExpired } = axiosErrorHandle(error);
    if (isExpired) {
      window.location.reload();
    } else {
      yield put({
        type: REMOVE_COMMENT_FAILURE,
        payload: message
      });
      showToast({
        type,
        message
      });
    }
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
// 수정
function* watchUpdateItem() {
  yield takeEvery(UPDATE_POSTITEM_REQUEST, updateItem);
}
// 좋아요
function* watchLikeItem() {
  yield takeEvery(ADD_LIKEPOST_REQUEST, likeItem);
}
// 좋아요 해제
function* watchUnLikeItem() {
  yield takeEvery(REMOVE_LIKEPOST_REQUEST, unlikeItem);
}
// 댓글 작성
function* watchAddComment() {
  yield takeEvery(ADD_COMMENT_REQUEST, addComment);
}
// 댓글 수정
function* watchUpdateComment() {
  yield takeEvery(UPDATE_COMMENT_REQUEST, updateComment);
}
// 댓글 삭제
function* watchRemoveComment() {
  yield takeEvery(REMOVE_COMMENT_REQUEST, removeComment);
}
export default function*() {
  yield all([
    fork(watchGetList),
    fork(watchAddItem),
    fork(watchUpdateItem),
    fork(watchLikeItem),
    fork(watchUnLikeItem),
    fork(watchAddComment),
    fork(watchUpdateComment),
    fork(watchRemoveComment)
  ]);
}
