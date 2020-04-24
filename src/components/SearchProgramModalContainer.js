import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchProgramModalPresentation from "./SearchProgramModalPresentation";
import { HIDE_SEARCHPROGRAMMODAL } from "../reducers/common";
import {
  SEARCH_PROGRAMLIST_REQUEST,
  SELECT_PROGRAM,
  INIT_SEARCHEDPROGRAM
} from "../reducers/program";

const SearchProgramModalContainer = () => {
  const dispatch = useDispatch();

  const { isSearchListLoading, searchedProgram } = useSelector(
    state => state.program
  );

  const searchKeywordEl = useRef(null);

  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어

  // 모달 끄기
  const onHide = useCallback(() => {
    dispatch({
      type: HIDE_SEARCHPROGRAMMODAL
    });
    dispatch({
      type: INIT_SEARCHEDPROGRAM
    });
  }, [dispatch]);

  const onChangeSearchKeyword = useCallback(e => {
    setSearchKeyword(e.target.value);
  }, []);

  // 프로그램 엔터 검색
  const onKeyDownSearchKeyword = useCallback(
    e => {
      if (isSearchListLoading) return;
      if (e.key === "Enter") {
        dispatch({
          type: SEARCH_PROGRAMLIST_REQUEST,
          payload: {
            lastId: 0,
            searchKeyword: e.target.value
          }
        });
      }
    },
    [isSearchListLoading, dispatch]
  );

  const onClickSearchBtn = useCallback(() => {
    if (isSearchListLoading) return;
    dispatch({
      type: SEARCH_PROGRAMLIST_REQUEST,
      payload: {
        lastId: 0,
        searchKeyword
      }
    });
  }, [isSearchListLoading, searchKeyword, dispatch]);

  const onSubmit = useCallback(() => {
    const isChecked = Array.from(
      document.querySelectorAll("[name=pgmCheck]")
    ).some(v => {
      if (v.checked) {
        dispatch({
          type: SELECT_PROGRAM,
          payload: {
            id: v.value,
            title: v.dataset.title,
            epiNumber: v.dataset.epinum
          }
        });
        onHide();
        return true;
      }
      return false;
    });

    if (!isChecked) {
      alert("프로그램을 선택하세요.");
    }
  }, [onHide, dispatch]);

  return (
    <SearchProgramModalPresentation
      isSearchListLoading={isSearchListLoading}
      searchKeyword={searchKeyword}
      searchKeywordEl={searchKeywordEl}
      searchedProgram={searchedProgram}
      onChangeSearchKeyword={onChangeSearchKeyword}
      onKeyDownSearchKeyword={onKeyDownSearchKeyword}
      onClickSearchBtn={onClickSearchBtn}
      onHide={onHide}
      onSubmit={onSubmit}
    />
  );
};
export default SearchProgramModalContainer;
