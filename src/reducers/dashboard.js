import produce from "immer";
// 주간 추가한 포스트 수 가져오기
export const LOAD_WEEKPOSTCOUNT_REQUEST = "LOAD_WEEKPOSTCOUNT_REQUEST";
export const LOAD_WEEKPOSTCOUNT_SUCCESS = "LOAD_WEEKPOSTCOUNT_SUCCESS";
export const LOAD_WEEKPOSTCOUNT_FAILURE = "LOAD_WEEKPOSTCOUNT_FAILURE";
// 주간 추가된 팔로워 수 가져오기
export const LOAD_WEEKFOLLOWCOUNT_REQUEST = "LOAD_WEEKFOLLOWCOUNT_REQUEST";
export const LOAD_WEEKFOLLOWCOUNT_SUCCESS = "LOAD_WEEKFOLLOWCOUNT_SUCCESS";
export const LOAD_WEEKFOLLOWCOUNT_FAILURE = "LOAD_WEEKFOLLOWCOUNT_FAILURE";

export const initialState = {
  isLoadPostCountLoading: false, // 포스트 수 가져오기 시도 중 여부
  isLoadFollowCountLoading: false, // 팔로워 수 가져오기 시도 중 여부
  loadedWeekPostCount: null, // 가져온 포스트 수 정보
  loadedFollowCount: null, // 가져온 팔로워 수 정보
  loadedPostCountErrorReason: "", // 목록 가져오기 요청 오류 사유
  loadedFollowCountErrorReason: "" // 등록 요청 오류 사유
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_WEEKPOSTCOUNT_REQUEST: {
        draft.isLoadPostCountLoading = true;
        break;
      }
      case LOAD_WEEKPOSTCOUNT_SUCCESS: {
        draft.isLoadPostCountLoading = false;
        draft.loadedWeekPostCount = action.payload;
        break;
      }
      case LOAD_WEEKPOSTCOUNT_FAILURE: {
        draft.isLoadPostCountLoading = false;
        draft.getListErrorReason = action.payload;
        break;
      }
      case LOAD_WEEKFOLLOWCOUNT_REQUEST: {
        draft.isLoadFollowCountLoading = true;
        break;
      }
      case LOAD_WEEKFOLLOWCOUNT_SUCCESS: {
        draft.isLoadFollowCountLoading = false;
        draft.loadedFollowCount = action.payload;
        break;
      }
      case LOAD_WEEKFOLLOWCOUNT_FAILURE: {
        draft.isLoadFollowCountLoading = false;
        draft.getDetailGenreListErrorReason = action.payload;
        break;
      }
      default:
        return state;
    }
  });
