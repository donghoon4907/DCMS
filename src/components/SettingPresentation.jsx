import React from "react";
import PropTypes from "prop-types";
import { SubMenu, SubMenuItem, Article } from "./PublishStyledComponent";
import ArticleComponent from "./ArticleComponent";

const SettingPresentation = ({
  activeMenu,
  userSortList,
  loadedUser,
  loadedFollower,
  isLoadingUser,
  isGetFollowerListLoading,
  userSearchKeyword,
  followerSearchKeyword,
  userSort,
  followerSort,
  onClickSubMenuItem,
  onClickUserSearchBtn,
  onClickFollowerSearchBtn,
  onChangeUserSearchKeyword,
  onChangeFollowerSearchKeyword,
  onChangeUserSort,
  onChangeFollowerSort,
  onKeyDownUserSearchKeyword,
  onKeyDownFollowerSearchKeyword,
  onScrollInUserList,
  onScrollInFollowerList
}) => (
  <>
    <SubMenu>
      <SubMenuItem
        active={activeMenu === 1 && 1}
        onClick={() => onClickSubMenuItem(1)}
      >
        <span>사용자 검색</span>
      </SubMenuItem>
      <SubMenuItem
        active={activeMenu === 2 && 1}
        onClick={() => onClickSubMenuItem(2)}
      >
        <span>출연진 관리</span>
      </SubMenuItem>
      <SubMenuItem
        active={activeMenu === 3 && 1}
        onClick={() => onClickSubMenuItem(3)}
      >
        <span>장르 관리</span>
      </SubMenuItem>
      <SubMenuItem
        active={activeMenu === 4 && 1}
        onClick={() => onClickSubMenuItem(4)}
      >
        <span>채널 관리</span>
      </SubMenuItem>
      <SubMenuItem
        active={activeMenu === 5 && 1}
        onClick={() => onClickSubMenuItem(5)}
      >
        <span>팔로워 목록</span>
      </SubMenuItem>
      <SubMenuItem
        active={activeMenu === 6 && 1}
        onClick={() => onClickSubMenuItem(6)}
      >
        <span>팔로잉 관리</span>
      </SubMenuItem>
    </SubMenu>
    <Article>
      <ArticleComponent
        type={"사용자"}
        isActive={activeMenu === 1}
        sortList={userSortList}
        isLoadingData={isLoadingUser}
        loadedData={loadedUser}
        searchKeyword={userSearchKeyword}
        sort={userSort}
        onClickSearchBtn={onClickUserSearchBtn}
        onChangeSearchKeyword={onChangeUserSearchKeyword}
        onChangeSort={onChangeUserSort}
        onKeyDownSearchKeyword={onKeyDownUserSearchKeyword}
        onScrollInList={onScrollInUserList}
      />
      <ArticleComponent
        type={"사용자"}
        isActive={activeMenu === 5}
        sortList={userSortList}
        isLoadingData={isGetFollowerListLoading}
        loadedData={loadedFollower}
        searchKeyword={followerSearchKeyword}
        sort={followerSort}
        onClickSearchBtn={onClickFollowerSearchBtn}
        onChangeSearchKeyword={onChangeFollowerSearchKeyword}
        onChangeSort={onChangeFollowerSort}
        onKeyDownSearchKeyword={onKeyDownFollowerSearchKeyword}
        onScrollInList={onScrollInFollowerList}
      />
    </Article>
  </>
);
export default SettingPresentation;

SettingPresentation.propTypes = {};
