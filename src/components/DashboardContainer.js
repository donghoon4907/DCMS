import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardPresention from "./DashboardPresention";
import { LOG_OUT_REQUEST, REMOVE_ALERT_REQUEST } from "../reducers/user";
import {
  LOAD_WEEKFOLLOWCOUNT_REQUEST,
  LOAD_WEEKPOSTCOUNT_REQUEST
} from "../reducers/dashboard";

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const {
    isShowAddPgmUi,
    isShowUpdatePgmUi,
    isShowAddContentUi,
    isShowUpdateContentUi,
    isShowAddPostUi,
    isShowUpdatePostUi,
    isShowSearchPgmUi,
    isShowSearchCastUi,
    isShowPostCommentUi,
    isShowYoutubeUploadUi
  } = useSelector((state) => state.common);
  const [activeMenu, setActiveMenu] = useState(1);

  // 메뉴 클릭
  const onClickMenuIcon = useCallback((menuNum) => {
    setActiveMenu(menuNum);
  }, []);

  // 로그아웃
  const onLogout = useCallback(() => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      dispatch({
        type: LOG_OUT_REQUEST
      });
    }
  }, [dispatch]);

  // 알림 클릭
  const onClickAlertItem = useCallback((userId, logId) => {
    dispatch({
      type: REMOVE_ALERT_REQUEST,
      payload: {
        userId,
        logId
      }
    });
  }, []);

  useEffect(() => {
    // 주간 등록한 포스트 수 가져오기
    dispatch({
      type: LOAD_WEEKPOSTCOUNT_REQUEST
    });
    // 주간 추가된 팔로워 수 가져오기
    dispatch({
      type: LOAD_WEEKFOLLOWCOUNT_REQUEST
    });
  }, [dispatch]);

  return (
    <DashboardPresention
      userInfo={userInfo}
      activeMenu={activeMenu}
      isShowAddPgmUi={isShowAddPgmUi}
      isShowUpdatePgmUi={isShowUpdatePgmUi}
      isShowAddContentUi={isShowAddContentUi}
      isShowUpdateContentUi={isShowUpdateContentUi}
      isShowAddPostUi={isShowAddPostUi}
      isShowUpdatePostUi={isShowUpdatePostUi}
      isShowSearchPgmUi={isShowSearchPgmUi}
      isShowSearchCastUi={isShowSearchCastUi}
      isShowPostCommentUi={isShowPostCommentUi}
      isShowYoutubeUploadUi={isShowYoutubeUploadUi}
      onClickMenuIcon={onClickMenuIcon}
      onClickAlertItem={onClickAlertItem}
      onLogout={onLogout}
    />
  );
};

export default DashboardContainer;
