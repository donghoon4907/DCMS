import produce from "immer";
// 로그인 화면 보이기
export const SHOW_LOGINLAYER = "SHOW_LOGINLAYER";
// 대쉬보드 화면 보이기
export const SHOW_DASHBOARD = "SHOW_DASHBOARD";
// 회원가입 화면 보이기
export const SHOW_SIGNUPLAYER = "SHOW_SIGNUPLAYER";
// 프로그램 추가 모달 보이기
export const SHOW_ADDPROGRAMMODAL = "SHOW_ADDPROGRAMMODAL";
// 프로그램 추가 모달 숨기기
export const HIDE_ADDPROGRAMMODAL = "HIDE_ADDPROGRAMMODAL";
// 프로그램 수정 모달 보이기
export const SHOW_UPDATEPROGRAMMODAL = "SHOW_UPDATEPROGRAMMODAL";
// 프로그램 수정 모달 숨기기
export const HIDE_UPDATEPROGRAMMODAL = "HIDE_UPDATEPROGRAMMODAL";
// 콘텐츠 추가 모달 보이기
export const SHOW_ADDCONTENTMODAL = "SHOW_ADDCONTENTMODAL";
// 콘텐츠 추가 모달 숨기기
export const HIDE_ADDCONTENTMODAL = "HIDE_ADDCONTENTMODAL";
// 콘텐츠 수정 모달 보이기
export const SHOW_UPDATECONTENTMODAL = "SHOW_UPDATECONTENTMODAL";
// 콘텐츠 수정 모달 숨기기
export const HIDE_UPDATECONTENTMODAL = "HIDE_UPDATECONTENTMODAL";
// 포스트 추가 모달 보이기
export const SHOW_ADDPOSTMODAL = "SHOW_ADDPOSTMODAL";
// 포스트 추가 모달 숨기기
export const HIDE_ADDPOSTMODAL = "HIDE_ADDPOSTMODAL";
// 포스트 수정 모달 보이기
export const SHOW_UPDATEPOSTMODAL = "SHOW_UPDATEPOSTMODAL";
// 포스트 수정 모달 숨기기
export const HIDE_UPDATEPOSTMODAL = "HIDE_UPDATEPOSTMODAL";
// 프로그램 검색 모달 보이기
export const SHOW_SEARCHPROGRAMMODAL = "SHOW_SEARCHPROGRAMMODAL";
// 프로그램 검색 모달 숨기기
export const HIDE_SEARCHPROGRAMMODAL = "HIDE_SEARCHPROGRAMMODAL";
// 출연진 검색 모달 보이기
export const SHOW_SEARCHCASTMODAL = "SHOW_SEARCHCASTMODAL";
// 출연진 검색 모달 숨기기
export const HIDE_SEARCHCASTMODAL = "HIDE_SEARCHCASTMODAL";
// 포스트 댓글 모달 보이기
export const SHOW_POSTCOMMENTMODAL = "SHOW_POSTCOMMENTMODAL";
// 포스트 댓글 모달 숨기기
export const HIDE_POSTCOMMENTMODAL = "HIDE_POSTCOMMENTMODAL";
// 유튜브 업로드 모달 보이기
export const SHOW_ADDUPLOADVIDEOMODAL = "SHOW_ADDUPLOADVIDEOMODAL";
// 유튜브 업로드 모달 숨기기
export const HIDE_ADDUPLOADVIDEOMODAL = "HIDE_ADDUPLOADVIDEOMODAL";

export const initialState = {
  isShowLoginUi: false, // 로그인 화면 보이기 유무
  isShowSignUpUi: false, // 회원가입 화면 보이기 유무
  isShowAddPgmUi: false, // 프로그램 추가 화면 보이기 유무
  isShowUpdatePgmUi: false, // 프로그램 수정 화면 보이기 유무
  isShowAddContentUi: false, // 컨텐츠 추가 화면 보이기 유무
  isShowUpdateContentUi: false, // 컨텐츠 수정 화면 보이기 유무
  isShowAddPostUi: false, // 포스트 추가 화면 보이기 유무
  isShowUpdatePostUi: false, // 포스트 수정 화면 보이기 유무
  isShowSearchPgmUi: false, // 프로그램 검색 화면 보이기 유무
  isShowSearchCastUi: false, // 출연진 검색 화면 보이기 유무
  isShowPostCommentUi: false, // 포스트 댓글 팝업 화면 보이기 유무
  isShowYoutubeUploadUi: false // 유튜브 업로드 팝업 화면 보이기 유무
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHOW_LOGINLAYER: {
        draft.isShowLoginUi = true;
        draft.isShowSignUpUi = false;
        break;
      }
      case SHOW_SIGNUPLAYER: {
        draft.isShowLoginUi = false;
        draft.isShowSignUpUi = true;
        break;
      }
      case SHOW_DASHBOARD: {
        draft.isShowLoginUi = false;
        draft.isShowSignUpUi = false;
        break;
      }
      case SHOW_ADDPROGRAMMODAL: {
        draft.isShowAddPgmUi = true;
        break;
      }
      case HIDE_ADDPROGRAMMODAL: {
        draft.isShowAddPgmUi = false;
        break;
      }
      case SHOW_UPDATEPROGRAMMODAL: {
        draft.isShowUpdatePgmUi = true;
        break;
      }
      case HIDE_UPDATEPROGRAMMODAL: {
        draft.isShowUpdatePgmUi = false;
        break;
      }
      case SHOW_ADDCONTENTMODAL: {
        draft.isShowAddContentUi = true;
        break;
      }
      case HIDE_ADDCONTENTMODAL: {
        draft.isShowAddContentUi = false;
        break;
      }
      case SHOW_UPDATECONTENTMODAL: {
        draft.isShowUpdateContentUi = true;
        break;
      }
      case HIDE_UPDATECONTENTMODAL: {
        draft.isShowUpdateContentUi = false;
        break;
      }
      case SHOW_ADDPOSTMODAL: {
        draft.isShowAddPostUi = true;
        break;
      }
      case HIDE_ADDPOSTMODAL: {
        draft.isShowAddPostUi = false;
        break;
      }
      case SHOW_UPDATEPOSTMODAL: {
        draft.isShowUpdatePostUi = true;
        break;
      }
      case HIDE_UPDATEPOSTMODAL: {
        draft.isShowUpdatePostUi = false;
        break;
      }
      case SHOW_SEARCHPROGRAMMODAL: {
        draft.isShowSearchPgmUi = true;
        break;
      }
      case HIDE_SEARCHPROGRAMMODAL: {
        draft.isShowSearchPgmUi = false;
        break;
      }
      case SHOW_SEARCHCASTMODAL: {
        draft.isShowSearchCastUi = true;
        break;
      }
      case HIDE_SEARCHCASTMODAL: {
        draft.isShowSearchCastUi = false;
        break;
      }
      case SHOW_POSTCOMMENTMODAL: {
        draft.isShowPostCommentUi = true;
        break;
      }
      case HIDE_POSTCOMMENTMODAL: {
        draft.isShowPostCommentUi = false;
        break;
      }
      case SHOW_ADDUPLOADVIDEOMODAL: {
        draft.isShowYoutubeUploadUi = true;
        break;
      }
      case HIDE_ADDUPLOADVIDEOMODAL: {
        draft.isShowYoutubeUploadUi = false;
        break;
      }
      default:
        return state;
    }
  });
