import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingPresentation from "./SettingPresentation";
import {
  GET_USERLIST_REQUEST,
  INIT_USERLIST,
  GET_FOLLOWERLIST_REQUEST,
  INIT_FOLLOWERLIST
} from "../reducers/user";
import { makeSortList } from "../module/query";

const SettingContainer = () => {
  const [activeMenu, setActiveMenu] = useState(1); // 현재 선택된 메뉴

  const dispatch = useDispatch();

  const {
    userInfo,
    loadedUser,
    loadedFollower,
    isGetListLoading: isLoadingUser,
    isGetFollowerListLoading
  } = useSelector(state => state.user);

  const [userSearchKeyword, setUserSearchKeyword] = useState(""); // 사용자 검색 검색어
  const [followerSearchKeyword, setFollowerSearchKeyword] = useState(""); // 팔로워 검색어
  const [userSort, setUserSort] = useState("userId,asc"); // 사용자 검색 정렬
  const [followerSort, setFollowerSort] = useState("userId,asc"); // 팔로워 정렬
  const userSortList = useState(
    makeSortList([
      {
        text: "아이디명",
        isAsc: true
      }
    ])
  );

  // 부메뉴 클릭 (현재: 프로그램, 포스트)
  const onClickSubMenuItem = useCallback(menuNum => {
    setActiveMenu(menuNum);
  }, []);

  const onChangeUserSearchKeyword = useCallback(e => {
    setUserSearchKeyword(e.target.value);
  }, []);

  const onChangeFollowerSearchKeyword = useCallback(e => {
    setFollowerSearchKeyword(e.target.value);
  }, []);

  // 사용자 검색 버튼 검색
  const onClickUserSearchBtn = useCallback(() => {
    if (isLoadingUser) return;
    dispatch({
      type: INIT_USERLIST
    });
    dispatch({
      type: GET_USERLIST_REQUEST,
      payload: {
        lastId: 0,
        limit: 20,
        searchKeyword: userSearchKeyword,
        searchType: ["userId"]
      }
    });
    setUserSort("userId,asc");
  }, [isLoadingUser, userSearchKeyword, dispatch]);

  // 팔로워 버튼 검색
  const onClickFollowerSearchBtn = useCallback(() => {
    if (isGetFollowerListLoading) return;
    dispatch({
      type: INIT_FOLLOWERLIST
    });
    dispatch({
      type: GET_FOLLOWERLIST_REQUEST,
      payload: {
        lastId: 0,
        limit: 20,
        searchKeyword: followerSearchKeyword,
        searchType: ["userId"],
        id: userInfo.id
      }
    });
    setFollowerSort("userId,asc");
  }, [isGetFollowerListLoading, followerSearchKeyword, dispatch]);

  // 사용자 엔터 검색
  const onKeyDownUserSearchKeyword = useCallback(
    e => {
      if (isLoadingUser) return;
      if (e.key === "Enter") {
        dispatch({
          type: INIT_USERLIST
        });
        dispatch({
          type: GET_USERLIST_REQUEST,
          payload: {
            lastId: 0,
            limit: 20,
            searchKeyword: e.target.value,
            searchType: ["userId"]
          }
        });
        setUserSort("userId,asc");
      }
    },
    [isLoadingUser, dispatch]
  );

  // 팔로워 엔터 검색
  const onKeyDownFollowerSearchKeyword = useCallback(
    e => {
      if (isGetFollowerListLoading) return;
      if (e.key === "Enter") {
        dispatch({
          type: INIT_FOLLOWERLIST
        });
        dispatch({
          type: GET_FOLLOWERLIST_REQUEST,
          payload: {
            lastId: 0,
            limit: 20,
            searchKeyword: e.target.value,
            searchType: ["userId"],
            id: userInfo.id
          }
        });
        setFollowerSort("userId,asc");
      }
    },
    [isGetFollowerListLoading, dispatch]
  );

  const onChangeUserSort = useCallback(
    e => {
      if (isLoadingUser) return;
      setUserSort(e.target.value);
      dispatch({
        type: INIT_USERLIST
      });
      dispatch({
        type: GET_USERLIST_REQUEST,
        payload: {
          lastId: 0,
          limit: 20,
          searchKeyword: userSearchKeyword,
          searchType: ["userId"],
          sort: e.target.value
        }
      });
    },
    [isLoadingUser, userSearchKeyword, dispatch]
  );

  const onChangeFollowerSort = useCallback(
    e => {
      if (isGetFollowerListLoading) return;
      setFollowerSort(e.target.value);
      dispatch({
        type: INIT_FOLLOWERLIST
      });
      dispatch({
        type: GET_FOLLOWERLIST_REQUEST,
        payload: {
          lastId: 0,
          limit: 20,
          searchKeyword: followerSearchKeyword,
          searchType: ["userId"],
          sort: e.target.value,
          id: userInfo.id
        }
      });
    },
    [isGetFollowerListLoading, followerSearchKeyword, dispatch]
  );

  // 사용자 관리 스크롤 더보기
  const onScrollInUserList = useCallback(
    e => {
      const { scrollHeight, clientHeight, scrollTop } = e.target;
      if (loadedUser) {
        if (scrollHeight - scrollTop === clientHeight) {
          const { id: lastId } = loadedUser[loadedUser.length - 1];
          if (loadedUser.length % 20 === 0) {
            dispatch({
              type: GET_USERLIST_REQUEST,
              payload: {
                lastId,
                limit: 20,
                searchKeyword: userSearchKeyword,
                searchType: ["userId"],
                sort: userSort
              }
            });
          }
        }
      }
    },
    [loadedUser, userSearchKeyword, userSort, dispatch]
  );

  // 팔로워 관리 스크롤 더보기
  const onScrollInFollowerList = useCallback(
    e => {
      const { scrollHeight, clientHeight, scrollTop } = e.target;
      if (loadedFollower) {
        if (scrollHeight - scrollTop === clientHeight) {
          const { id: lastId } = loadedFollower[loadedFollower.length - 1];
          if (loadedFollower.length % 20 === 0) {
            dispatch({
              type: GET_FOLLOWERLIST_REQUEST,
              payload: {
                lastId,
                limit: 20,
                searchKeyword: followerSearchKeyword,
                searchType: ["userId"],
                sort: followerSort,
                id: userInfo.id
              }
            });
          }
        }
      }
    },
    [loadedFollower, followerSearchKeyword, followerSort, dispatch]
  );

  useEffect(() => {
    // 사용자 목록 로드
    dispatch({
      type: GET_USERLIST_REQUEST,
      payload: {
        lastId: 0,
        limit: 20,
        sort: "userId,asc"
      }
    });
    // 팔로워 목록 로드
    dispatch({
      type: GET_FOLLOWERLIST_REQUEST,
      payload: {
        lastId: 0,
        limit: 20,
        sort: "userId,asc",
        id: userInfo.id
      }
    });
  }, [dispatch]);

  return (
    <SettingPresentation
      activeMenu={activeMenu}
      userSortList={userSortList[0]}
      loadedUser={loadedUser}
      loadedFollower={loadedFollower}
      isLoadingUser={isLoadingUser}
      isGetFollowerListLoading={isGetFollowerListLoading}
      userSearchKeyword={userSearchKeyword}
      followerSearchKeyword={followerSearchKeyword}
      userSort={userSort}
      followerSort={followerSort}
      onClickSubMenuItem={onClickSubMenuItem}
      onClickUserSearchBtn={onClickUserSearchBtn}
      onClickFollowerSearchBtn={onClickFollowerSearchBtn}
      onChangeUserSearchKeyword={onChangeUserSearchKeyword}
      onChangeFollowerSearchKeyword={onChangeFollowerSearchKeyword}
      onChangeUserSort={onChangeUserSort}
      onChangeFollowerSort={onChangeFollowerSort}
      onKeyDownUserSearchKeyword={onKeyDownUserSearchKeyword}
      onKeyDownFollowerSearchKeyword={onKeyDownFollowerSearchKeyword}
      onScrollInUserList={onScrollInUserList}
      onScrollInFollowerList={onScrollInFollowerList}
    />
  );
};
export default SettingContainer;
