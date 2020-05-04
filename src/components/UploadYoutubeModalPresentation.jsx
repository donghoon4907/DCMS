import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import HashTagComponent from "./HashTagComponent";
import { LoadingWrap } from "./LoginStyledComponent";

const UploadYoutubeModalPresentaion = ({
  isInsertVideoLoading,
  title,
  titleEl,
  description,
  descriptionEl,
  tags,
  setTags,
  privacyStatus,
  onHide,
  onClickConnectAccount,
  onChangeTitle,
  onChangeDescription,
  onChangePrivacyStatus,
  onSubmit
}) => (
  <Modal show={true} onHide={onHide} animation={true} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>유튜브 업로드</Modal.Title>
    </Modal.Header>
    <Modal.Body
      style={{ maxHeight: window.innerHeight - 200, overflowY: "auto" }}
    >
      <Form>
        <Form.Group>
          <Form.Label>계정 연결</Form.Label>
          <Button
            variant="outline-secondary"
            onClick={onClickConnectAccount}
            style={{ float: "right" }}
          >
            연결
          </Button>
        </Form.Group>
        <Form.Group>
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={onChangeTitle}
            isInvalid={title.length > 200}
            ref={titleEl}
          />
          <Form.Text>{title.length} / 200</Form.Text>
          <Form.Control.Feedback type="invalid">
            제목은 200자 이내로 작성하세요.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            placeholder="내용을 입력하세요."
            value={description}
            onChange={onChangeDescription}
            isInvalid={description.length > 500}
            ref={descriptionEl}
          />
          <Form.Text>{description.length} / 500</Form.Text>
          <Form.Control.Feedback type="invalid">
            내용은 500자 이내로 작성하세요.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>태그</Form.Label>
          <HashTagComponent tags={tags} setTags={setTags} />
        </Form.Group>
        <Form.Group>
          <Form.Label>공개 설정</Form.Label>
          <Form.Control
            as="select"
            value={privacyStatus}
            onChange={onChangePrivacyStatus}
          >
            <option value="public">공개</option>
            <option value="private">비공개</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-secondary" onClick={onHide}>
        취소
      </Button>
      <LoadingWrap loading={isInsertVideoLoading ? 1 : 0}>
        <Button
          variant="outline-primary"
          onClick={onSubmit}
          style={{ position: "relative", zIndex: 1 }}
        >
          등록
        </Button>
      </LoadingWrap>
    </Modal.Footer>
  </Modal>
);
export default UploadYoutubeModalPresentaion;

UploadYoutubeModalPresentaion.propTypes = {
  title: PropTypes.string.isRequired,
  titleEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object })
  ]),
  description: PropTypes.string.isRequired,
  descriptionEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object })
  ]),
  tags: PropTypes.array.isRequired,
  setTags: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
