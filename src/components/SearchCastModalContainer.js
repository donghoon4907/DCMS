import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchCastModalPresentation from "./SearchCastModalPresentation";
import { HIDE_SEARCHCASTMODAL } from "../reducers/common";
import {
  SEARCH_CASTLIST_REQUEST,
  SELECT_CAST,
  INIT_SEARCHEDCAST
} from "../reducers/content";

const SearchCastModalContainer = () => {
  const dispatch = useDispatch();

  const { isSearchCastListLoading, searchedCast, selectedCast } = useSelector(
    state => state.content
  );

  const searchKeywordEl = useRef(null);

  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어

  // 모달 끄기
  const onHide = useCallback(() => {
    dispatch({
      type: HIDE_SEARCHCASTMODAL
    });
    dispatch({
      type: INIT_SEARCHEDCAST
    });
  }, [dispatch]);

  const onChangeSearchKeyword = useCallback(e => {
    setSearchKeyword(e.target.value);
  }, []);

  // 프로그램 엔터 검색
  const onKeyDownSearchKeyword = useCallback(
    e => {
      if (isSearchCastListLoading) return;
      if (e.key === "Enter") {
        dispatch({
          type: SEARCH_CASTLIST_REQUEST,
          payload: {
            lastId: 0,
            searchKeyword: e.target.value
          }
        });
      }
    },
    [isSearchCastListLoading, dispatch]
  );

  const onClickSearchBtn = useCallback(() => {
    if (isSearchCastListLoading) return;
    dispatch({
      type: SEARCH_CASTLIST_REQUEST,
      payload: {
        lastId: 0,
        searchKeyword
      }
    });
  }, [isSearchCastListLoading, searchKeyword, dispatch]);

  const onSubmit = useCallback(() => {
    // 검색 결과 중 체크된 것이 있는지 검사
    const isChecked = Array.from(
      document.querySelectorAll("[name=castCheck]")
    ).some(v => {
      if (v.checked) {
        // 선택된 출연진 중 중복된 것이 있는지 검사
        if (selectedCast && selectedCast.length > 0) {
          const isDuplicate = selectedCast.some(v2 => {
            if (v.value === v2.id) {
              alert("이미 선택한 출연진 입니다.");
              return true;
            }
            return false;
          });
          // 중복된 것이 있는 경우
          if (isDuplicate) return true;
        }
        dispatch({
          type: SELECT_CAST,
          payload: {
            id: v.value,
            name: v.dataset.nm,
            real_name: v.dataset.realnm
          }
        });
        onHide();

        return true;
      }
      return false;
    });

    if (!isChecked) {
      alert("출연진을 선택하세요.");
    }
  }, [selectedCast, onHide, dispatch]);

  return (
    <SearchCastModalPresentation
      isSearchCastListLoading={isSearchCastListLoading}
      searchKeyword={searchKeyword}
      searchKeywordEl={searchKeywordEl}
      searchedCast={searchedCast}
      onChangeSearchKeyword={onChangeSearchKeyword}
      onKeyDownSearchKeyword={onKeyDownSearchKeyword}
      onClickSearchBtn={onClickSearchBtn}
      onHide={onHide}
      onSubmit={onSubmit}
    />
  );
};
export default SearchCastModalContainer;
