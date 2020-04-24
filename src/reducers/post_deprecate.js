import produce from "immer";
// 목록 가져오기
export const GET_POSTLIST_REQUEST = "GET_POSTLIST_REQUEST";
export const GET_POSTLIST_SUCCESS = "GET_POSTLIST_SUCCESS";
export const GET_POSTLIST_FAILURE = "GET_POSTLIST_FAILURE";
// 등록
export const ADD_POSTITEM_REQUEST = "ADD_POSTITEM_REQUEST";
export const ADD_POSTITEM_SUCCESS = "ADD_POSTITEM_SUCCESS";
export const ADD_POSTITEM_FAILURE = "ADD_POSTITEM_FAILURE";
// 목록 초기화
export const INIT_POSTLIST_REQUEST = "INIT_POSTLIST_REQUEST";

export const initialState = {
  isGetListLoading: false, // 목록 가져오기 시도 중 여부
  isAddItemLoading: false, // 등록 시도 중 여부
  getListErrorReason: "", // 목록 가져오기 요청 오류 사유
  addItemErrorReason: "", // 등록 요청 오류 사유
  loadedPost: null // 가져온 목록 정보
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_POSTLIST_REQUEST: {
        draft.isGetListLoading = true;
        break;
      }
      case GET_POSTLIST_SUCCESS: {
        draft.isGetListLoading = false;
        draft.loadedPost = action.payload;
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
        break;
      }
      case ADD_POSTITEM_FAILURE: {
        draft.isAddItemLoading = false;
        draft.addItemErrorReason = action.payload;
        break;
      }
      case INIT_POSTLIST_REQUEST: {
        draft.loadedPost = null;
        break;
      }
      default:
        return state;
    }
  });
