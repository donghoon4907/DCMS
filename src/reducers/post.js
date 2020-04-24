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
// 특정 프로그램 활성화
export const ACTIVE_POSTITEM = "ACTIVE_POSTITEM";
// 특정 프로그램 비활성화
export const INACTIVE_POSTITEM = "INACTIVE_POSTITEM";
// 등록 초기화
export const INIT_ADDPOST = "INIT_ADDPOST";

export const initialState = {
  isGetListLoading: false, // 목록 가져오기 시도 중 여부
  isAddItemLoading: false, // 등록 시도 중 여부
  isUpdateItemLoading: false, // 수정 시도 중 여부
  activePost: null, // 현재 수정 중인 컨텐츠 정보
  getListErrorReason: "", // 목록 가져오기 요청 오류 사유
  addItemErrorReason: "", // 등록 요청 오류 사유
  updateItemErrorReason: "", // 수정 요청 오류 사유
  loadedPost: null, // 가져온 목록 정보
  isSuccessAddItem: false // 등록 성공 여부
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_POSTLIST_REQUEST: {
        draft.isGetListLoading = true;
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
        draft.loadedPost = draft.loadedPost.map((program) => {
          if (program.id === action.payload.id) {
            return action.payload;
          }
          return program;
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
      default:
        return state;
    }
  });
