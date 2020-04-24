import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardPresention from "./DashboardPresention";
import { LOG_OUT_REQUEST } from "../reducers/user";
import {
  GET_PROGRAMLIST_REQUEST,
  GET_GENRELIST_REQUEST,
  GET_AGEGRADELIST_REQUEST,
  GET_CHANNELLIST_REQUEST
} from "../reducers/program";
import { GET_CONTENTLIST_REQUEST } from "../reducers/content";
import { GET_POSTLIST_REQUEST } from "../reducers/post";
import moment from "moment";

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);
  const {
    isShowAddPgmUi,
    isShowUpdatePgmUi,
    isShowAddContentUi,
    isShowUpdateContentUi,
    isShowAddPostUi,
    isShowUpdatePostUi,
    isShowSearchPgmUi,
    isShowSearchCastUi
  } = useSelector(state => state.common);
  const [activeMenu, setActiveMenu] = useState(1);

  // 메뉴 클릭
  const onClickMenuIcon = useCallback(menuNum => {
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

  useEffect(() => {
    // 프로그램 목록을 가져옵니다.
    dispatch({
      type: GET_PROGRAMLIST_REQUEST,
      payload: {
        lastId: 0,
        limit: 20,
        startDate: moment()
          .subtract(7, "d")
          .format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD")
      }
    });
    dispatch({
      type: GET_CONTENTLIST_REQUEST,
      payload: {
        lastId: 0,
        limit: 20,
        startDate: moment()
          .subtract(7, "d")
          .format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD")
      }
    });
    // 포스트 목록을 가져옵니다.
    dispatch({
      type: GET_POSTLIST_REQUEST,
      payload: {
        lastId: 0,
        limit: 20,
        startDate: moment()
          .subtract(7, "d")
          .format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD")
      }
    });
    // 장르 목록을 가져옵니다.
    dispatch({
      type: GET_GENRELIST_REQUEST
    });
    // 연령등급 목록을 가져옵니다.
    dispatch({
      type: GET_AGEGRADELIST_REQUEST
    });
    // 채널 목록을 가져옵니다.
    dispatch({
      type: GET_CHANNELLIST_REQUEST
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
      onClickMenuIcon={onClickMenuIcon}
      onLogout={onLogout}
    />
  );
};

export default DashboardContainer;
