import produce from "immer";
// Oauth 인증
export const CONNECT_OAUTH_REQUEST = "CONNECT_OAUTH_REQUEST";
export const CONNECT_OAUTH_SUCCESS = "CONNECT_OAUTH_SUCCESS";
export const CONNECT_OAUTH_FAILURE = "CONNECT_OAUTH_FAILURE";
// 유튜브 업로드
export const INSERT_VIDEO_REQUEST = "INSERT_VIDEO_REQUEST";
export const INSERT_VIDEO_SUCCESS = "INSERT_VIDEO_SUCCESS";
export const INSERT_VIDEO_FAILURE = "INSERT_VIDEO_FAILURE";

export const initialState = {
  isConnectOauthLoading: false, // Oauth 인증 시도 중 여부
  isInsertVideoLoading: false, // 유튜브 업로드 시도 중 여부
  loadedOauthUrl: null, // Oauth 인증을 위한 url
  connectAouthErrorReason: "", // Oauth 인증 요청 오류 사유
  insertVideoErrorReason: "" // 유튜브 업로드 요청 오류 사유
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONNECT_OAUTH_REQUEST: {
        draft.isConnectOauthLoading = true;
        break;
      }
      case CONNECT_OAUTH_SUCCESS: {
        draft.isConnectOauthLoading = false;
        draft.loadedOauthUrl = action.payload;
        break;
      }
      case CONNECT_OAUTH_FAILURE: {
        draft.isConnectOauthLoading = false;
        draft.connectAouthErrorReason = action.payload;
        break;
      }
      case INSERT_VIDEO_REQUEST: {
        draft.isInsertVideoLoading = true;
        break;
      }
      case INSERT_VIDEO_SUCCESS: {
        draft.isInsertVideoLoading = false;
        break;
      }
      case INSERT_VIDEO_FAILURE: {
        draft.isInsertVideoLoading = false;
        draft.insertVideoErrorReason = action.payload;
        break;
      }
      default:
        return state;
    }
  });
