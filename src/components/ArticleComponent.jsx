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

const ArticleComponent = ({
  type,
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
  onChangeSearchKeyword,
  onChangeSort,
  onChangeChannel,
  onClickAddBtn,
  onClickItem,
  onKeyDownSearchKeyword,
  onClickSearchBtn,
  onScrollInList
}) => (
  <WorkWrap active={isActive && 1}>
    <SearchBar>
      <Field flex={3}>
        <div className="mr-3 d-flex align-items-center">등록일</div>
        <div>
          <StyledDatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
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
            onChange={(date) => setEndDate(date)}
            selectsEnd
            isClearable
            startDate={startDate}
            endDate={endDate}
            placeholderText="입력하세요."
            dateFormat="yyyy-MM-dd"
          />
        </div>
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
        <StyledButton onClick={onClickAddBtn}>{type} 등록</StyledButton>
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
              loadedChannel.map(({ id, name }, idx) => {
                return (
                  <option value={id} key={idx}>
                    {name}
                  </option>
                );
              })}
          </Form.Control>
        )}

        <Form.Control as="select" value={sort} onChange={onChangeSort}>
          <option value="createdAt,DESC">등록일 순</option>
          <option value="createdAt,ASC">등록일 역순</option>
          <option value="updatedAt,DESC">수정일 순</option>
          <option value="updatedAt,ASC">수정일 역순</option>
        </Form.Control>
      </Field>
    </SearchBar>
    <ListWrap className="p-3" onScroll={onScrollInList}>
      {loadedData && loadedData.length > 0 ? (
        loadedData.map((data) => {
          if (type === "프로그램") {
            return (
              <ProgramCardComponent
                key={data.id}
                {...data}
                onClickItem={onClickItem}
              />
            );
          } else if (type === "콘텐츠") {
            return (
              <ContentCardComponent
                key={data.id}
                {...data}
                onClickItem={onClickItem}
              />
            );
          }
          // else if (type === "포스트") {
          //   return <PostCardComponent {...data} onClickItem={onClickItem} />
          // }
          else {
            return null;
          }
        })
      ) : isLoadingData ? (
        <LoadingComponent />
      ) : (
        <EmptyComponent comment={"검색 결과가 없습니다."} />
      )}
    </ListWrap>
  </WorkWrap>
);
export default ArticleComponent;

ArticleComponent.propTypes = {
  isLoadingData: PropTypes.bool.isRequired,
  loadedData: PropTypes.arrayOf(PropTypes.object),
  isActive: PropTypes.bool.isRequired,
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  searchKeyword: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  onChangeSearchKeyword: PropTypes.func.isRequired,
  onChangeSort: PropTypes.func.isRequired,
  onClickAddBtn: PropTypes.func.isRequired,
  onClickItem: PropTypes.func.isRequired,
  onKeyDownSearchKeyword: PropTypes.func.isRequired,
  onClickSearchBtn: PropTypes.func.isRequired
};
