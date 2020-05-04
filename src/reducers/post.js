import produce from "immer";
// 목록 가져오기
export const GET_POSTLIST_REQUEST = "GET_POSTLIST_REQUEST";
export const GET_POSTLIST_SUCCESS = "GET_POSTLIST_SUCCESS";
export const GET_POSTLIST_FAILURE = "GET_POSTLIST_FAILURE";
// 등록
export const ADD_POSTITEM_REQUEST = "ADD_POSTITEM_REQUEST";
export const ADD_POSTITEM_SUCCESS = "ADD_POSTITEM_SUCCESS";
export const ADD_POSTITEM_FAILURE = "ADD_POSTITEM_FAILURE";
// 수정
export const UPDATE_POSTITEM_REQUEST = "UPDATE_POSTITEM_REQUEST";
export const UPDATE_POSTITEM_SUCCESS = "UPDATE_POSTITEM_SUCCESS";
export const UPDATE_POSTITEM_FAILURE = "UPDATE_POSTITEM_FAILURE";
// 목록 초기화
export const INIT_POSTLIST = "INIT_POSTLIST";
// 특정 포스트 활성화
export const ACTIVE_POSTITEM = "ACTIVE_POSTITEM";
// 특정 포스트 비활성화
export const INACTIVE_POSTITEM = "INACTIVE_POSTITEM";
// 등록 초기화
export const INIT_ADDPOST = "INIT_ADDPOST";
// 좋아요
export const ADD_LIKEPOST_REQUEST = "ADD_LIKEPOST_REQUEST";
export const ADD_LIKEPOST_SUCCESS = "ADD_LIKEPOST_SUCCESS";
export const ADD_LIKEPOST_FAILURE = "ADD_LIKEPOST_FAILURE";
// 좋아요 해제
export const REMOVE_LIKEPOST_REQUEST = "REMOVE_LIKEPOST_REQUEST";
export const REMOVE_LIKEPOST_SUCCESS = "REMOVE_LIKEPOST_SUCCESS";
export const REMOVE_LIKEPOST_FAILURE = "REMOVE_LIKEPOST_FAILURE";
// 댓글 작성
export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";
// 댓글 수정
export const UPDATE_COMMENT_REQUEST = "UPDATE_COMMENT_REQUEST";
export const UPDATE_COMMENT_SUCCESS = "UPDATE_COMMENT_SUCCESS";
export const UPDATE_COMMENT_FAILURE = "UPDATE_COMMENT_FAILURE";
// 댓글 삭제
export const REMOVE_COMMENT_REQUEST = "REMOVE_COMMENT_REQUEST";
export const REMOVE_COMMENT_SUCCESS = "REMOVE_COMMENT_SUCCESS";
export const REMOVE_COMMENT_FAILURE = "REMOVE_COMMENT_FAILURE";
// 포스트 상태 업데이트
export const UPDATE_POSTSTATUS = "UPDATE_POSTSTATUS";

export const initialState = {
  isGetListLoading: false, // 목록 가져오기 시도 중 여부
  isAddItemLoading: false, // 등록 시도 중 여부
  isUpdateItemLoading: false, // 수정 시도 중 여부
  isLikeItemLoading: false, // 좋아요 시도 중 여부
  isUnLikeItemLoading: false, // 좋아요 삭제 시도 중 여부
  isAddCommentLoading: false, // 댓글 등록 시도 중 여부
  isUpdateCommentLoading: false, // 댓글 수정 시도 중 여부
  isRemoveCommentLoading: false, // 댓글 삭제 시도 중 여부
  activePost: null, // 현재 수정 중인 컨텐츠 정보
  getListErrorReason: "", // 목록 가져오기 요청 오류 사유
  addItemErrorReason: "", // 등록 요청 오류 사유
  updateItemErrorReason: "", // 수정 요청 오류 사유
  likeItemErrorReason: "", // 좋아요 요청 오류 사유
  unlikeItemErrorReason: "", // 좋아요 삭제 요청 오류 사유
  addCommentErrorReason: "", // 댓글 등록 요청 오류 사유
  updateCommentErrorReason: "", // 댓글 수정 요청 오류 사유
  removeCommentErrorReason: "", // 댓글 삭제 요청 오류 사유
  loadedPost: null, // 가져온 목록 정보
  isSuccessAddItem: false // 등록 성공 여부
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_POSTLIST_REQUEST: {
        draft.isGetListLoading = true;
        if (action.payload.lastId === 0) draft.loadedPost = [];
        break;
      }
      case GET_POSTLIST_SUCCESS: {
        draft.isGetListLoading = false;
        if (draft.loadedPost) {
          draft.loadedPost = draft.loadedPost.concat(action.payload);
        } else {
          draft.loadedPost = action.payload;
        }
        break;
      }
      case GET_POSTLIST_FAILURE: {
        draft.isGetListLoading = false;
        draft.getListErrorReason = action.payload;
        break;
      }
      case ADD_POSTITEM_REQUEST: {
        draft.isAddItemLoading = true;
        break;
      }
      case ADD_POSTITEM_SUCCESS: {
        draft.isAddItemLoading = false;
        draft.isSuccessAddItem = true;
        break;
      }
      case ADD_POSTITEM_FAILURE: {
        draft.isAddItemLoading = false;
        draft.addItemErrorReason = action.payload;
        break;
      }
      case UPDATE_POSTITEM_REQUEST: {
        draft.isUpdateItemLoading = true;
        break;
      }
      case UPDATE_POSTITEM_SUCCESS: {
        draft.isUpdateItemLoading = false;
        draft.loadedPost = draft.loadedPost.map(post => {
          if (post.id == action.payload.id) {
            return action.payload;
          }
          return post;
        });
        break;
      }
      case UPDATE_POSTITEM_FAILURE: {
        draft.isUpdateItemLoading = false;
        draft.updateItemErrorReason = action.payload;
        break;
      }
      case INIT_POSTLIST: {
        draft.loadedPost = null;
        break;
      }
      case INIT_ADDPOST: {
        draft.isSuccessAddItem = false;
        break;
      }
      case ACTIVE_POSTITEM: {
        if (draft.loadedPost && draft.loadedPost.length > 0) {
          draft.activePost = action.payload;
        }
        break;
      }
      case INACTIVE_POSTITEM: {
        draft.activePost = null;
        break;
      }
      case ADD_LIKEPOST_REQUEST: {
        draft.isLikeItemLoading = true;
        break;
      }
      case ADD_LIKEPOST_SUCCESS: {
        draft.isLikeItemLoading = false;
        break;
      }
      case ADD_LIKEPOST_FAILURE: {
        draft.isLikeItemLoading = false;
        draft.likeItemErrorReason = action.payload;
        break;
      }
      case REMOVE_LIKEPOST_REQUEST: {
        draft.isUnLikeItemLoading = true;
        break;
      }
      case REMOVE_LIKEPOST_SUCCESS: {
        draft.isUnLikeItemLoading = false;
        break;
      }
      case REMOVE_LIKEPOST_FAILURE: {
        draft.isUnLikeItemLoading = false;
        draft.unLikeItemErrorReason = action.payload;
        break;
      }
      case ADD_COMMENT_REQUEST: {
        draft.isAddCommentLoading = true;
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        draft.isAddCommentLoading = false;

        const newState = {
          ...state.activePost,
          Comments: [action.payload, ...state.activePost.Comments]
        };

        draft.activePost = newState;

        draft.loadedPost = draft.loadedPost.map(post => {
          if (post.id === newState.id) {
            return newState;
          }
          return post;
        });
        break;
      }
      case ADD_COMMENT_FAILURE: {
        draft.isAddCommentLoading = false;
        draft.addCommentErrorReason = action.payload;
        break;
      }
      case UPDATE_COMMENT_REQUEST: {
        draft.isUpdateCommentLoading = true;
        break;
      }
      case UPDATE_COMMENT_SUCCESS: {
        draft.isUpdateCommentLoading = false;

        const newState = {
          ...state.activePost,
          Comments: state.activePost.Comments.map(comment => {
            if (comment.id === action.payload.id) return action.payload;
            return comment;
          })
        };

        draft.activePost = newState;

        draft.loadedPost = draft.loadedPost.map(post => {
          if (post.id === newState.id) {
            return newState;
          }
          return post;
        });
        break;
      }
      case UPDATE_COMMENT_FAILURE: {
        draft.isUpdateCommentLoading = false;
        draft.removeCommentErrorReason = action.payload;
        break;
      }
      case REMOVE_COMMENT_REQUEST: {
        draft.isRemoveCommentLoading = true;
        break;
      }
      case REMOVE_COMMENT_SUCCESS: {
        draft.isRemoveCommentLoading = false;

        const newState = {
          ...state.activePost,
          Comments: state.activePost.Comments.filter(v => {
            return v.id != action.payload;
          })
        };

        draft.activePost = newState;

        draft.loadedPost = draft.loadedPost.map(post => {
          if (post.id === newState.id) {
            return newState;
          }
          return post;
        });
        break;
      }
      case REMOVE_COMMENT_FAILURE: {
        draft.isRemoveCommentLoading = false;
        draft.removeCommentErrorReason = action.payload;
        break;
      }
      case UPDATE_POSTSTATUS: {
        draft.loadedPost = draft.loadedPost.map(v => {
          if (v.id == action.payload) v.isUploadYt = "Y";
          return v;
        });
        break;
      }
      default:
        return state;
    }
  });
