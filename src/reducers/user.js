import produce from "immer";
// 중복 확인 요청
export const DOUBLE_CHECK_REQUEST = "DOUBLE_CHECK_REQUEST";
export const DOUBLE_CHECK_SUCCESS = "DOUBLE_CHECK_SUCCESS";
export const DOUBLE_CHECK_FAILURE = "DOUBLE_CHECK_FAILURE";
// 이메일 검증 요청
export const CHECK_EMAIL_REQUEST = "CHECK_EMAIL_REQUEST";
export const CHECK_EMAIL_SUCCESS = "CHECK_EMAIL_SUCCESS";
export const CHECK_EMAIL_FAILURE = "CHECK_EMAIL_FAILURE";
// 회원가입 요청
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
// 로그인 요청
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
// 로그아웃 요청
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";
// 사용자 정보 로드
export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";
// 팔로잉 추가
export const ADD_FOLLOWING_REQUEST = "ADD_FOLLOWING_REQUEST";
export const ADD_FOLLOWING_SUCCESS = "ADD_FOLLOWING_SUCCESS";
export const ADD_FOLLOWING_FAILURE = "ADD_FOLLOWING_FAILURE";
// 팔로잉 삭제
export const REMOVE_FOLLOWING_REQUEST = "REMOVE_FOLLOWING_REQUEST";
export const REMOVE_FOLLOWING_SUCCESS = "REMOVE_FOLLOWING_SUCCESS";
export const REMOVE_FOLLOWING_FAILURE = "REMOVE_FOLLOWING_FAILURE";
// 목록 가져오기
export const GET_USERLIST_REQUEST = "GET_USERLIST_REQUEST";
export const GET_USERLIST_SUCCESS = "GET_USERLIST_SUCCESS";
export const GET_USERLIST_FAILURE = "GET_USERLIST_FAILURE";
// 알림 삭제
export const REMOVE_ALERT_REQUEST = "REMOVE_ALERT_REQUEST";
export const REMOVE_ALERT_SUCCESS = "REMOVE_ALERT_SUCCESS";
export const REMOVE_ALERT_FAILURE = "REMOVE_ALERT_FAILURE";

export const initialState = {
  isDbCheckLoading: false, // 중복 확인 시도 중 여부
  isCheckEmailLoading: false, // 이메일 검증 시도 중 여부
  isSignUpLoading: false, // 회원가입 시도 중 여부
  isLogInLoading: false, // 로그인 시도 중 여부
  isLogOutLoading: false, // 로그아웃 시도 중 여부
  isLoadUserLoading: false, // 사용자 정보 로드 시도 중 여부
  isAddFollowingLoading: false, // 팔로잉 추가 시도 중 여부
  isRemoveFollowingLoading: false, // 팔로잉 삭제 시도 중 여부
  isGetListLoading: false, //  목록 가져오기 시도 중 여부
  isRemoveAlertLoading: false, // 알람 삭제 시도 중 여부
  confirmedId: null, // 현재 중복 확인된 아이디
  confirmedEmail: null, // 현재 검증된 이메일
  emailToken: null, // 이메일 검증 토큰
  loadedUser: null, // 가져온 목록 정보
  loadedFollower: null, // 가져온 팔로워 목록 정보
  dbCheckErrorReason: "", // 중복 확인 오류 사유
  checkEmailErrorReason: "", // 이메일 체크 오류 사유
  signUpErrorReason: "", // 회원가입 요청 오류 사유
  logInErrorReason: "", // 로그인 요청 오류 사유
  logOutErrorReason: "", // 로그아웃 요청 오류 사유
  loadUserErrorReason: "", // 사용자 정보 로드 요청 오류 사유
  addFollowingErrorReason: "", // 팔로잉 추가 요청 오류 사유
  removeFollowingErrorReason: "", // 팔로잉 삭제 요청 오류 사유
  getListErrorReason: "", // 목록 가져오기 요청 오류 사유
  removeAlertErrorReason: "", // 알람 삭제 요청 오류 사유
  userInfo: null // 로그인한 유저 정보
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DOUBLE_CHECK_REQUEST: {
        draft.isDbCheckLoading = true;
        draft.dbCheckStatus = false;
        draft.confirmedId = null;
        break;
      }
      case DOUBLE_CHECK_SUCCESS: {
        draft.isDbCheckLoading = false;
        draft.confirmedId = action.payload;
        break;
      }
      case DOUBLE_CHECK_FAILURE: {
        draft.isDbCheckLoading = false;
        draft.dbCheckErrorReason = action.payload;
        break;
      }
      case CHECK_EMAIL_REQUEST: {
        draft.isCheckEmailLoading = true;
        draft.emailToken = null;
        break;
      }
      case CHECK_EMAIL_SUCCESS: {
        draft.isCheckEmailLoading = false;
        draft.emailToken = action.payload.token;
        draft.confirmedEmail = action.payload.email;
        break;
      }
      case CHECK_EMAIL_FAILURE: {
        draft.isCheckEmailLoading = false;
        draft.checkEmailErrorReason = action.payload;
        break;
      }
      case SIGN_UP_REQUEST: {
        draft.isSignUpLoading = true;
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.isSignUpLoading = false;
        draft.emailToken = null;
        draft.confirmedId = null;
        draft.confirmEmail = null;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.isSignUpLoading = false;
        draft.signUpErrorReason = action.payload;
        break;
      }
      case LOG_IN_REQUEST: {
        draft.isLogInLoading = true;
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.isLogInLoading = false;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.isLogInLoading = false;
        draft.logInErrorReason = action.payload;
        break;
      }
      case LOG_OUT_REQUEST: {
        draft.isLogOutLoading = true;
        break;
      }
      case LOG_OUT_SUCCESS: {
        draft.isLogOutLoading = false;
        draft.userInfo = null;
        break;
      }
      case LOG_OUT_FAILURE: {
        draft.isLogOutLoading = false;
        draft.logOutErrorReason = action.payload;
        break;
      }
      case LOAD_USER_REQUEST: {
        draft.isLoadUserLoading = true;
        break;
      }
      case LOAD_USER_SUCCESS: {
        draft.isLoadUserLoading = false;
        draft.userInfo = action.payload;
        break;
      }
      case LOAD_USER_FAILURE: {
        draft.isLoadUserLoading = false;
        draft.loadUserErrorReason = action.payload;
        break;
      }
      case ADD_FOLLOWING_REQUEST: {
        draft.isAddFollowingLoading = true;
        break;
      }
      case ADD_FOLLOWING_SUCCESS: {
        draft.isAddFollowingLoading = false;

        const newState = {
          ...state.userInfo,
          Followings: [...state.userInfo.Followings, action.payload]
        };
        draft.userInfo = newState;
        break;
      }
      case ADD_FOLLOWING_FAILURE: {
        draft.isAddFollowingLoading = false;
        draft.addFollowingErrorReason = action.payload;
        break;
      }
      case REMOVE_FOLLOWING_REQUEST: {
        draft.isRemoveFollowingLoading = true;
        break;
      }
      case REMOVE_FOLLOWING_SUCCESS: {
        draft.isRemoveFollowingLoading = false;
        const newState = {
          ...state.userInfo,
          Followings: state.userInfo.Followings.filter(
            v => v.id != action.payload
          )
        };
        draft.userInfo = newState;
        break;
      }
      case REMOVE_FOLLOWING_FAILURE: {
        draft.isRemoveFollowingLoading = false;
        draft.removeFollowingErrorReason = action.payload;
        break;
      }
      case GET_USERLIST_REQUEST: {
        draft.isGetListLoading = true;
        if (action.payload.lastId === 0) draft.loadedUser = [];
        break;
      }
      case GET_USERLIST_SUCCESS: {
        draft.isGetListLoading = false;
        if (draft.loadedUser) {
          draft.loadedUser = draft.loadedUser.concat(action.payload);
        } else {
          draft.loadedUser = action.payload;
        }
        break;
      }
      case GET_USERLIST_FAILURE: {
        draft.isGetListLoading = false;
        draft.getListErrorReason = action.payload;
        break;
      }
      case REMOVE_ALERT_REQUEST: {
        draft.isRemoveAlertLoading = true;
        break;
      }
      case REMOVE_ALERT_SUCCESS: {
        draft.isRemoveAlertLoading = false;
        const newState = {
          ...state.userInfo,
          SendNews: state.userInfo.SendNews.filter(v => v.id != action.payload)
        };
        draft.userInfo = newState;
        break;
      }
      case REMOVE_ALERT_FAILURE: {
        draft.isRemoveAlertLoading = false;
        draft.removeAlertErrorReason = action.payload;
        break;
      }
      default:
        return state;
    }
  });
