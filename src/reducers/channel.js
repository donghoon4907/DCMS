import produce from "immer";
// 목록 가져오기
export const GET_CHANNELLIST_REQUEST = "GET_CHANNELLIST_REQUEST";
export const GET_CHANNELLIST_SUCCESS = "GET_CHANNELLIST_SUCCESS";
export const GET_CHANNELLIST_FAILURE = "GET_CHANNELLIST_FAILURE";

export const initialState = {
  isGetListLoading: false, // 목록 가져오기 시도 중 여부
  isAddItemLoading: false, // 등록 시도 중 여부
  isUpdateItemLoading: false, // 수정 시도 중 여부
  isSuccessAddItem: false, // 등록 성공 여부
  loadedChannel: null, // 가져온 채널 등급 정보
  getListErrorReason: "", // 목록 가져오기 요청 오류 사유
  addItemErrorReason: "", // 등록 요청 오류 사유
  updateItemErrorReason: "" // 수정 요청 오류 사유
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_CHANNELLIST_REQUEST: {
        draft.isChannelListLoading = true;
        break;
      }
      case GET_CHANNELLIST_SUCCESS: {
        draft.isChannelListLoading = false;
        draft.loadedChannel = action.payload;
        break;
      }
      case GET_CHANNELLIST_FAILURE: {
        draft.isChannelListLoading = false;
        draft.getChannelListErrorReason = action.payload;
        break;
      }
      default:
        return state;
    }
  });
