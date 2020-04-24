import React from "react";
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
  Table,
  Form
} from "react-bootstrap";
import PropTypes from "prop-types";

const SearchCastModalPresentation = ({
  isSearchCastListLoading,
  searchKeyword,
  searchKeywordEl,
  searchedCast,
  onChangeSearchKeyword,
  onKeyDownSearchKeyword,
  onClickSearchBtn,
  onHide,
  onSubmit
}) => (
  <Modal show={true} onHide={onHide} animation={true} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>출연진 검색</Modal.Title>
    </Modal.Header>
    <Modal.Body
      style={{ maxHeight: window.innerHeight - 200, overflowY: "auto" }}
    >
      <InputGroup>
        <FormControl
          placeholder="검색어를 입력하세요."
          value={searchKeyword}
          onChange={onChangeSearchKeyword}
          onKeyDown={onKeyDownSearchKeyword}
          disabled={isSearchCastListLoading}
          ref={searchKeywordEl}
        />
        <InputGroup.Prepend>
          <InputGroup.Text
            style={{
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              cursor: "pointer"
            }}
          >
            <span onClick={onClickSearchBtn}>검색</span>
          </InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>
      <hr />
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>선택</th>
            <th>출연자명</th>
            <th>본명</th>
            {/* <th>역할명</th> */}
          </tr>
        </thead>
        <tbody>
          {searchedCast ? (
            searchedCast.length === 0 ? (
              <tr>
                <td colSpan={3}>검색 결과가 없습니다.</td>
              </tr>
            ) : (
              searchedCast.map(({ id, name, real_name }, idx) => (
                <tr key={id}>
                  <td>
                    <Form.Check
                      name={"castCheck"}
                      value={id}
                      type={"radio"}
                      data-nm={name}
                      data-realnm={real_name}
                    />
                  </td>
                  <td>{name}</td>
                  <td>{real_name}</td>
                  {/* <td>
                    <FormControl
                      placeholder="역할명을 입력하세요."
                      style={{ height: 25 }}
                      data-id={id}
                      ref={el => (roleEl.current[idx] = el)}
                    />
                  </td> */}
                </tr>
              ))
            )
          ) : (
            <tr>
              <td colSpan={3}>출연진을 검색하세요.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-primary" onClick={onSubmit}>
        적용
      </Button>
    </Modal.Footer>
  </Modal>
);
export default SearchCastModalPresentation;

SearchCastModalPresentation.propTypes = {
  isSearchCastListLoading: PropTypes.bool.isRequired,
  searchKeyword: PropTypes.string.isRequired,
  searchKeywordEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object })
  ]),
  onChangeSearchKeyword: PropTypes.func.isRequired,
  onKeyDownSearchKeyword: PropTypes.func.isRequired,
  onClickSearchBtn: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
