import React from "react";
import PropTypes from "prop-types";
import { SubMenu, SubMenuItem, Article } from "./PublishStyledComponent";
import ArticleComponent from "./ArticleComponent";

const PublishPresentaion = ({
  sortList,
  isLoadingPgm,
  isLoadingContent,
  isLoadingPost,
  loadedProgram,
  loadedContent,
  loadedPost,
  loadedChannel,
  activeMenu,
  pgmStartDate,
  contentStartDate,
  postStartDate,
  pgmEndDate,
  contentEndDate,
  postEndDate,
  setPgmStartDate,
  setContentStartDate,
  setPostStartDate,
  setPgmEndDate,
  setContentEndDate,
  setPostEndDate,
  pgmSearchKeyword,
  contentSearchKeyword,
  postSearchKeyword,
  pgmSort,
  contentSort,
  postSort,
  pgmChannel,
  onChangePgmSearchKeyword,
  onChangeContentSearchKeyword,
  onChangePostSearchKeyword,
  onChangePgmSort,
  onChangeContentSort,
  onChangePostSort,
  onChangePgmChannel,
  onClickSubMenuItem,
  onClickAddProgramBtn,
  onClickAddContentBtn,
  onClickAddPostBtn,
  onKeyDownPgmSearchKeyword,
  onKeyDownContentSearchKeyword,
  onKeyDownPostSearchKeyword,
  onClickPgmSearchBtn,
  onClickContentSearchBtn,
  onClickPostSearchBtn,
  onScrollInPgmList,
  onScrollInContentList,
  onScrollInPostList
}) => (
  <>
    <SubMenu>
      <SubMenuItem
        active={activeMenu === 1 && 1}
        onClick={() => onClickSubMenuItem(1)}
      >
        <span>프로그램</span>
      </SubMenuItem>
      <SubMenuItem
        active={activeMenu === 2 && 1}
        onClick={() => onClickSubMenuItem(2)}
      >
        <span>컨텐츠</span>
      </SubMenuItem>
      <SubMenuItem
        active={activeMenu === 3 && 1}
        onClick={() => onClickSubMenuItem(3)}
      >
        <span>포스트</span>
      </SubMenuItem>
    </SubMenu>
    <Article>
      <ArticleComponent
        type={"프로그램"}
        isActive={activeMenu === 1}
        sortList={sortList}
        isLoadingData={isLoadingPgm}
        loadedData={loadedProgram}
        loadedChannel={loadedChannel}
        startDate={pgmStartDate}
        endDate={pgmEndDate}
        setStartDate={setPgmStartDate}
        setEndDate={setPgmEndDate}
        searchKeyword={pgmSearchKeyword}
        sort={pgmSort}
        channel={pgmChannel}
        onChangeSearchKeyword={onChangePgmSearchKeyword}
        onChangeSort={onChangePgmSort}
        onChangeChannel={onChangePgmChannel}
        onClickAddBtn={onClickAddProgramBtn}
        onKeyDownSearchKeyword={onKeyDownPgmSearchKeyword}
        onClickSearchBtn={onClickPgmSearchBtn}
        onScrollInList={onScrollInPgmList}
      />
      <ArticleComponent
        type={"콘텐츠"}
        isActive={activeMenu === 2}
        sortList={sortList}
        isLoadingData={isLoadingContent}
        loadedData={loadedContent}
        startDate={contentStartDate}
        endDate={contentEndDate}
        setStartDate={setContentStartDate}
        setEndDate={setContentEndDate}
        searchKeyword={contentSearchKeyword}
        sort={contentSort}
        onChangeSearchKeyword={onChangeContentSearchKeyword}
        onChangeSort={onChangeContentSort}
        onClickAddBtn={onClickAddContentBtn}
        onKeyDownSearchKeyword={onKeyDownContentSearchKeyword}
        onClickSearchBtn={onClickContentSearchBtn}
        onScrollInList={onScrollInContentList}
      />
      <ArticleComponent
        type={"포스트"}
        isActive={activeMenu === 3}
        sortList={sortList}
        isLoadingData={isLoadingPost}
        loadedData={loadedPost}
        startDate={postStartDate}
        endDate={postEndDate}
        setStartDate={setPostStartDate}
        setEndDate={setPostEndDate}
        searchKeyword={postSearchKeyword}
        sort={postSort}
        onChangeSearchKeyword={onChangePostSearchKeyword}
        onChangeSort={onChangePostSort}
        onClickAddBtn={onClickAddPostBtn}
        onKeyDownSearchKeyword={onKeyDownPostSearchKeyword}
        onClickSearchBtn={onClickPostSearchBtn}
        onScrollInList={onScrollInPostList}
      />
    </Article>
  </>
);
export default PublishPresentaion;

PublishPresentaion.propTypes = {
  sortList: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  isLoadingPgm: PropTypes.bool.isRequired,
  isLoadingContent: PropTypes.bool.isRequired,
  isLoadingPost: PropTypes.bool.isRequired,
  activeMenu: PropTypes.number.isRequired,
  pgmStartDate: PropTypes.object.isRequired,
  contentStartDate: PropTypes.object.isRequired,
  postStartDate: PropTypes.object.isRequired,
  pgmEndDate: PropTypes.object.isRequired,
  contentEndDate: PropTypes.object.isRequired,
  postEndDate: PropTypes.object.isRequired,
  setPgmStartDate: PropTypes.func.isRequired,
  setContentStartDate: PropTypes.func.isRequired,
  setPostStartDate: PropTypes.func.isRequired,
  setPgmEndDate: PropTypes.func.isRequired,
  setContentEndDate: PropTypes.func.isRequired,
  setPostEndDate: PropTypes.func.isRequired,
  pgmSearchKeyword: PropTypes.string.isRequired,
  contentSearchKeyword: PropTypes.string.isRequired,
  postSearchKeyword: PropTypes.string.isRequired,
  pgmSort: PropTypes.string.isRequired,
  contentSort: PropTypes.string.isRequired,
  postSort: PropTypes.string.isRequired,
  onChangePgmSearchKeyword: PropTypes.func.isRequired,
  onChangeContentSearchKeyword: PropTypes.func.isRequired,
  onChangePostSearchKeyword: PropTypes.func.isRequired,
  onChangePgmSort: PropTypes.func.isRequired,
  onChangeContentSort: PropTypes.func.isRequired,
  onChangePostSort: PropTypes.func.isRequired,
  onChangePgmChannel: PropTypes.func.isRequired,
  onClickSubMenuItem: PropTypes.func.isRequired,
  onClickAddProgramBtn: PropTypes.func.isRequired,
  onClickAddContentBtn: PropTypes.func.isRequired,
  onClickAddPostBtn: PropTypes.func.isRequired,
  onKeyDownPgmSearchKeyword: PropTypes.func.isRequired,
  onKeyDownContentSearchKeyword: PropTypes.func.isRequired,
  onKeyDownPostSearchKeyword: PropTypes.func.isRequired,
  onClickPgmSearchBtn: PropTypes.func.isRequired,
  onClickContentSearchBtn: PropTypes.func.isRequired,
  onClickPostSearchBtn: PropTypes.func.isRequired,
  onScrollInPgmList: PropTypes.func.isRequired,
  onScrollInContentList: PropTypes.func.isRequired,
  onScrollInPostList: PropTypes.func.isRequired
};
