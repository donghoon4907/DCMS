import produce from "immer";
// 목록 가져오기
export const GET_GENRELIST_REQUEST = "GET_GENRELIST_REQUEST";
export const GET_GENRELIST_SUCCESS = "GET_GENRELIST_SUCCESS";
export const GET_GENRELIST_FAILURE = "GET_GENRELIST_FAILURE";
// 세부 장르 입수
export const GET_DETAILGENRELIST_REQUEST = "GET_DETAILGENRELIST_REQUEST";
export const GET_DETAILGENRELIST_SUCCESS = "GET_DETAILGENRELIST_SUCCESS";
export const GET_DETAILGENRELIST_FAILURE = "GET_DETAILGENRELIST_FAILURE";

export const initialState = {
  isGetListLoading: false, // 목록 가져오기 시도 중 여부
  isAddItemLoading: false, // 등록 시도 중 여부
  isUpdateItemLoading: false, // 수정 시도 중 여부
  isGetDetailGenreListLoading: false, // 세부 장르 가져오기 시도 중 여부
  isSuccessAddItem: false, // 등록 성공 여부
  loadedGenre: null, // 가져온 장르 정보
  loadedDetailGenre: null, // 최근 가져온 세부장르 정보
  getListErrorReason: "", // 목록 가져오기 요청 오류 사유
  addItemErrorReason: "", // 등록 요청 오류 사유
  updateItemErrorReason: "", // 수정 요청 오류 사유
  getDetailGenreListErrorReason: "" // 세부 장르 가져오기 요청 오류 사유
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_GENRELIST_REQUEST: {
        draft.isGetListLoading = true;
        break;
      }
      case GET_GENRELIST_SUCCESS: {
        draft.isGetListLoading = false;
        draft.loadedGenre = action.payload;
        break;
      }
      case GET_GENRELIST_FAILURE: {
        draft.isGetListLoading = false;
        draft.getListErrorReason = action.payload;
        break;
      }
      case GET_DETAILGENRELIST_REQUEST: {
        draft.isGetDetailGenreListLoading = true;
        break;
      }
      case GET_DETAILGENRELIST_SUCCESS: {
        draft.isGetDetailGenreListLoading = false;
        draft.loadedDetailGenre = action.payload;
        break;
      }
      case GET_DETAILGENRELIST_FAILURE: {
        draft.isGetDetailGenreListLoading = false;
        draft.getDetailGenreListErrorReason = action.payload;
        break;
      }
      default:
        return state;
    }
  });
