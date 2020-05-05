import React from "react";
import PropTypes from "prop-types";
import { InputGroup, FormControl, Form } from "react-bootstrap";
import {
  WorkWrap,
  SearchBar,
  Field,
  ListWrap,
  StyledDatePicker,
  StyledButton
} from "./PublishStyledComponent";
import EmptyComponent from "./EmptyComponent";
import LoadingComponent from "./LoadingComponent";
import ProgramCardComponent from "./ProgramCardComponent";
import ContentCardComponent from "./ContentCardComponent";
import PostCardComponent from "./PostCardComponent";
import UserCardComponent from "./UserCardComponent";

const ArticleComponent = ({
  type,
  sortList,
  onlyFollower,
  onlyFollowing,
  isLoadingData,
  loadedData,
  loadedChannel,
  isActive,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  searchKeyword,
  sort,
  channel,
  onClickAddBtn,
  onClickSearchBtn,
  onChangeSearchKeyword,
  onChangeSort,
  onChangeChannel,
  onChangeOnlyFollower,
  onChangeOnlyFollowing,
  onKeyDownSearchKeyword,
  onScrollInList
}) => (
  <WorkWrap active={isActive && 1}>
    <SearchBar>
      <Field flex={3}>
        {startDate && endDate && (
          <>
            <div className="mr-3 d-flex align-items-center">등록일</div>
            <div>
              <StyledDatePicker
                className="form-control"
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                isClearable
                startDate={startDate}
                endDate={endDate}
                placeholderText="입력하세요."
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div className="d-flex align-items-center ml-2 mr-2">~</div>
            <div>
              <StyledDatePicker
                className="form-control"
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                isClearable
                startDate={startDate}
                endDate={endDate}
                placeholderText="입력하세요."
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </>
        )}
      </Field>
      <Field flex={1}>
        <InputGroup>
          <FormControl
            placeholder="검색어를 입력하세요."
            value={searchKeyword}
            onChange={onChangeSearchKeyword}
            onKeyDown={onKeyDownSearchKeyword}
            disabled={isLoadingData}
          />
          <InputGroup.Prepend>
            <InputGroup.Text
              style={{
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5
              }}
            >
              <span onClick={onClickSearchBtn}>검색</span>
            </InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>
      </Field>
    </SearchBar>
    <SearchBar>
      <Field flex={3}>
        {onClickAddBtn && (
          <StyledButton onClick={onClickAddBtn}>{type} 등록</StyledButton>
        )}
        {type === "사용자" && (
          <>
            <Form.Check
              type="switch"
              id="follower"
              label="팔로워 보기"
              checked={onlyFollower}
              onChange={onChangeOnlyFollower}
            />
            <Form.Check
              type="switch"
              id="following"
              label="팔로잉 보기"
              checked={onlyFollowing}
              onChange={onChangeOnlyFollowing}
              style={{ marginLeft: 10 }}
            />
          </>
        )}
      </Field>
      <Field flex={1}>
        {typeof channel !== "undefined" && (
          <Form.Control
            as="select"
            value={channel}
            onChange={onChangeChannel}
            placeholder={"채널을 선택하세요."}
          >
            <option value="">채널 선택</option>
            {loadedChannel &&
              loadedChannel.map(({ id, channelName }, idx) => {
                return (
                  <option value={id} key={idx}>
                    {channelName}
                  </option>
                );
              })}
          </Form.Control>
        )}

        <Form.Control as="select" value={sort} onChange={onChangeSort}>
          {sortList.map((v, idx) => (
            <option value={v.value} key={idx}>
              {v.text}
            </option>
          ))}
        </Form.Control>
      </Field>
    </SearchBar>
    <ListWrap className="p-3" onScroll={onScrollInList}>
      {loadedData && loadedData.length > 0 ? (
        loadedData.map(data => {
          if (type === "프로그램") {
            return <ProgramCardComponent key={`pgm${data.id}`} {...data} />;
          } else if (type === "콘텐츠") {
            return <ContentCardComponent key={`content${data.id}`} {...data} />;
          } else if (type === "포스트") {
            return <PostCardComponent key={`post${data.id}`} {...data} />;
          } else if (type === "사용자") {
            return <UserCardComponent key={`list${data.id}`} {...data} />;
          }
        })
      ) : isLoadingData ? (
        <LoadingComponent height={30} />
      ) : (
        <EmptyComponent comment={"검색 결과가 없습니다."} />
      )}
    </ListWrap>
  </WorkWrap>
);
export default ArticleComponent;

ArticleComponent.propTypes = {
  sortList: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  isLoadingData: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  setStartDate: PropTypes.func,
  setEndDate: PropTypes.func,
  searchKeyword: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  onChangeSearchKeyword: PropTypes.func.isRequired,
  onChangeSort: PropTypes.func.isRequired,
  onClickAddBtn: PropTypes.func,
  onKeyDownSearchKeyword: PropTypes.func.isRequired,
  onClickSearchBtn: PropTypes.func.isRequired,
  onScrollInList: PropTypes.func.isRequired
};
