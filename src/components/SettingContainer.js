import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingPresentation from "./SettingPresentation";
import { GET_USERLIST_REQUEST } from "../reducers/user";
import { makeSortList } from "../module/query";

const SettingContainer = () => {
  const [activeMenu, setActiveMenu] = useState(1); // 현재 선택된 메뉴

  const dispatch = useDispatch();

  const { loadedUser, isGetListLoading: isLoadingUser } = useSelector(
    state => state.user
  );

  const [userSearchKeyword, setUserSearchKeyword] = useState(""); // 사용자 검색 검색어
  const [userSort, setUserSort] = useState("userId,asc"); // 사용자 검색 정렬
  const [onlyFollower, setOnlyFollower] = useState(false); // 팔로워 보기
  const [onlyFollowing, setOnlyFollowing] = useState(false); // 팔로잉 보기
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

  const onChangeOnlyFollower = useCallback(
    e => {
      dispatch({
        type: GET_USERLIST_REQUEST,
        payload: {
          lastId: 0,
          limit: 20,
          searchKeyword: userSearchKeyword,
          searchType: ["userId"],
          onlyFollower: e.target.checked,
          sort: userSort
        }
      });
      setOnlyFollower(e.target.checked);
      if (onlyFollowing) {
        setOnlyFollowing(false);
      }
    },
    [userSearchKeyword, userSort, onlyFollowing, dispatch]
  );

  const onChangeOnlyFollowing = useCallback(
    e => {
      dispatch({
        type: GET_USERLIST_REQUEST,
        payload: {
          lastId: 0,
          limit: 20,
          searchKeyword: userSearchKeyword,
          searchType: ["userId"],
          onlyFollowing: e.target.checked,
          sort: userSort
        }
      });
      setOnlyFollowing(e.target.checked);
      if (onlyFollower) {
        setOnlyFollower(false);
      }
    },
    [userSearchKeyword, userSort, onlyFollower, dispatch]
  );

  // 사용자 검색 버튼 검색
  const onClickUserSearchBtn = useCallback(() => {
    if (isLoadingUser) return;
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
    setOnlyFollowing(false);
    setOnlyFollower(false);
  }, [isLoadingUser, userSearchKeyword, dispatch]);

  // 사용자 엔터 검색
  const onKeyDownUserSearchKeyword = useCallback(
    e => {
      if (isLoadingUser) return;
      if (e.key === "Enter") {
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
        setOnlyFollowing(false);
        setOnlyFollower(false);
      }
    },
    [isLoadingUser, dispatch]
  );

  const onChangeUserSort = useCallback(
    e => {
      if (isLoadingUser) return;
      setUserSort(e.target.value);
      dispatch({
        type: GET_USERLIST_REQUEST,
        payload: {
          lastId: 0,
          limit: 20,
          searchKeyword: userSearchKeyword,
          searchType: ["userId"],
          sort: e.target.value,
          onlyFollower,
          onlyFollowing
        }
      });
    },
    [isLoadingUser, userSearchKeyword, onlyFollower, onlyFollowing, dispatch]
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
                sort: userSort,
                onlyFollower,
                onlyFollowing
              }
            });
          }
        }
      }
    },
    [
      loadedUser,
      userSearchKeyword,
      userSort,
      onlyFollower,
      onlyFollowing,
      dispatch
    ]
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
  }, [dispatch]);

  return (
    <SettingPresentation
      activeMenu={activeMenu}
      userSortList={userSortList[0]}
      onlyFollower={onlyFollower}
      onlyFollowing={onlyFollowing}
      loadedUser={loadedUser}
      isLoadingUser={isLoadingUser}
      userSearchKeyword={userSearchKeyword}
      userSort={userSort}
      onClickSubMenuItem={onClickSubMenuItem}
      onClickUserSearchBtn={onClickUserSearchBtn}
      onChangeUserSearchKeyword={onChangeUserSearchKeyword}
      onChangeUserSort={onChangeUserSort}
      onChangeOnlyFollower={onChangeOnlyFollower}
      onChangeOnlyFollowing={onChangeOnlyFollowing}
      onKeyDownUserSearchKeyword={onKeyDownUserSearchKeyword}
      onScrollInUserList={onScrollInUserList}
    />
  );
};
export default SettingContainer;
