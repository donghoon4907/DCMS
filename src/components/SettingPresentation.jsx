import React from "react";
import PropTypes from "prop-types";
import { SubMenu, SubMenuItem, Article } from "./PublishStyledComponent";
import ArticleComponent from "./ArticleComponent";

const SettingPresentation = ({
  activeMenu,
  userSortList,
  onlyFollower,
  onlyFollowing,
  loadedUser,
  isLoadingUser,
  userSearchKeyword,
  userSort,
  onClickSubMenuItem,
  onClickUserSearchBtn,
  onChangeUserSearchKeyword,
  onChangeUserSort,
  onChangeOnlyFollower,
  onChangeOnlyFollowing,
  onKeyDownUserSearchKeyword,
  onScrollInUserList
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
    </SubMenu>
    <Article>
      <ArticleComponent
        type={"사용자"}
        isActive={activeMenu === 1}
        sortList={userSortList}
        onlyFollower={onlyFollower}
        onlyFollowing={onlyFollowing}
        isLoadingData={isLoadingUser}
        loadedData={loadedUser}
        searchKeyword={userSearchKeyword}
        sort={userSort}
        onClickSearchBtn={onClickUserSearchBtn}
        onChangeSearchKeyword={onChangeUserSearchKeyword}
        onChangeSort={onChangeUserSort}
        onChangeOnlyFollower={onChangeOnlyFollower}
        onChangeOnlyFollowing={onChangeOnlyFollowing}
        onKeyDownSearchKeyword={onKeyDownUserSearchKeyword}
        onScrollInList={onScrollInUserList}
      />
    </Article>
  </>
);
export default SettingPresentation;

SettingPresentation.propTypes = {};
