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

const SearchProgramModalPresentation = ({
  isSearchListLoading,
  searchKeyword,
  searchKeywordEl,
  searchedProgram,
  onChangeSearchKeyword,
  onKeyDownSearchKeyword,
  onClickSearchBtn,
  onHide,
  onSubmit
}) => (
  <Modal show={true} onHide={onHide} animation={true} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>프로그램 검색</Modal.Title>
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
          disabled={isSearchListLoading}
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
            <th>프로그램명</th>
            <th>채널</th>
            <th>제작년도</th>
            <th>등록자</th>
          </tr>
        </thead>
        <tbody>
          {searchedProgram ? (
            searchedProgram.length === 0 ? (
              <tr>
                <td colSpan={5}>검색 결과가 없습니다.</td>
              </tr>
            ) : (
              searchedProgram.map(
                ({ id, title, product_year, User, Channel, Contents }) => (
                  <tr key={id}>
                    <td>
                      <Form.Check
                        name={"pgmCheck"}
                        value={id}
                        type={"radio"}
                        data-title={title}
                        data-epinum={Contents.length + 1}
                      />
                    </td>
                    <td>{title}</td>
                    <td>{Channel.name}</td>
                    <td>{product_year}</td>
                    <td>{User.userId}</td>
                  </tr>
                )
              )
            )
          ) : (
            <tr>
              <td colSpan={5}>프로그램을 검색하세요.</td>
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
export default SearchProgramModalPresentation;

SearchProgramModalPresentation.propTypes = {
  isSearchListLoading: PropTypes.bool.isRequired,
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
