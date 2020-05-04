import React from "react";
import {
  Button,
  Modal,
  Form,
  InputGroup,
  FormControl,
  ProgressBar,
  Table
} from "react-bootstrap";
import PropTypes from "prop-types";
import { Video, Search, Remove } from "../assets/icons";
import DatePicker from "react-datepicker";

const SetContentModalPresentaion = ({
  type,
  progress,
  videoEl,
  selectedProgram,
  selectedCast,
  description,
  descriptionEl,
  broadcastDate,
  broadcastDateEl,
  setBroadcastDate,
  onClickVideo,
  onClickRemoveSelectedCast,
  onClickShowPgmModal,
  onClickShowCastModal,
  onChangeVideo,
  onChangeDescription,
  onCancelUpload,
  onHide,
  onSubmit
}) => (
  <Modal show={true} onHide={onHide} animation={true} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>컨텐츠 {type}</Modal.Title>
    </Modal.Header>
    <Modal.Body
      style={{ maxHeight: window.innerHeight - 200, overflowY: "auto" }}
    >
      <Form>
        {type === "등록" && (
          <Form.Group>
            <Form.Label>영상</Form.Label>
            <br />
            {progress > 0 ? (
              progress === 100 ? (
                <div className="d-flex justify-content-between">
                  <div>업로드 완료되었습니다.</div>
                  <div>
                    <Button
                      variant="outline-secondary"
                      onClick={onCancelUpload}
                    >
                      재업로드
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="d-flex justify-content-between">
                    <div>업로드 중입니다.</div>
                    <div></div>
                  </div>
                  <br />
                  <ProgressBar animated now={progress} />
                </div>
              )
            ) : (
              <Video
                onClick={onClickVideo}
                style={{
                  width: "100%",
                  height: 200,
                  border: "1px solid #DEE2E6",
                  borderRadius: 5
                }}
              />
            )}

            <input
              type="file"
              hidden
              accept="video/mp4"
              onChange={onChangeVideo}
              ref={videoEl}
            />
          </Form.Group>
        )}

        <Form.Group>
          <Form.Label>프로그램</Form.Label>
          <InputGroup>
            <FormControl
              placeholder="프로그램을 선택하세요."
              value={selectedProgram ? selectedProgram.title : ""}
              readOnly
            />
            {type === "등록" && (
              <InputGroup.Prepend>
                <InputGroup.Text
                  onClick={onClickShowPgmModal}
                  style={{
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5
                  }}
                >
                  <Search style={{ width: 15, height: 15 }} />
                </InputGroup.Text>
              </InputGroup.Prepend>
            )}
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>화수</Form.Label>
          <FormControl
            placeholder="프로그램을 선택하세요."
            value={selectedProgram ? selectedProgram.epiNumber : ""}
            readOnly
          />
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
          <Form.Label>출연진</Form.Label>
          <InputGroup>
            <FormControl placeholder="출연진을 선택하세요." readOnly />
            <InputGroup.Prepend>
              <InputGroup.Text
                onClick={onClickShowCastModal}
                style={{
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5
                }}
              >
                <Search style={{ width: 15, height: 15 }} />
              </InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
        </Form.Group>
        <hr />
        <Form.Group>
          <Form.Label>선택한 출연진</Form.Label>
          <br />
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>출연자명</th>
                <th>본명</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {(!selectedCast || selectedCast.length === 0) && (
                <tr>
                  <td colSpan={3}>출연진을 선택하세요.</td>
                </tr>
              )}
              {selectedCast &&
                selectedCast.map(({ id, castName, realName }) => (
                  <tr key={`selectedCast${id}`}>
                    <td>{castName}</td>
                    <td>{realName}</td>
                    <td>
                      <Remove
                        style={{ width: 20, height: 20 }}
                        onClick={() => onClickRemoveSelectedCast({ id })}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ marginRight: 20 }}>방송일</Form.Label>
          <DatePicker
            style={{ width: 150 }}
            className="form-control"
            selected={broadcastDate}
            onChange={date => setBroadcastDate(date)}
            isClearable
            placeholderText="입력하세요."
            timeFormat="HH:mm"
            timeIntervals={5}
            timeCaption="time"
            dateFormat="yyyy-MM-dd HH:mm"
            showTimeSelect
            ref={broadcastDateEl}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-secondary" onClick={onHide}>
        취소
      </Button>
      <Button variant="outline-primary" onClick={onSubmit}>
        {type}
      </Button>
    </Modal.Footer>
  </Modal>
);
export default SetContentModalPresentaion;

SetContentModalPresentaion.propTypes = {
  type: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  videoEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object })
  ]),
  description: PropTypes.string.isRequired,
  descriptionEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object })
  ]),
  broadcastDate: PropTypes.object.isRequired,
  broadcastDateEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object })
  ]),
  setBroadcastDate: PropTypes.func.isRequired,
  onClickVideo: PropTypes.func.isRequired,
  onClickRemoveSelectedCast: PropTypes.func.isRequired,
  onClickShowPgmModal: PropTypes.func.isRequired,
  onClickShowCastModal: PropTypes.func.isRequired,
  onChangeVideo: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onCancelUpload: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
