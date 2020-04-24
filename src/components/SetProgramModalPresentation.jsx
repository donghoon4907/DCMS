import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { Image } from "../assets/icons";
import { Thumbnail } from "./LoginStyledComponent";
import moment from "moment";

const SetProgramModalPresentaion = ({
  type,
  title,
  titleEl,
  description,
  descriptionEl,
  thumbnail,
  thumbnailEl,
  prdtYear,
  prdtYearEl,
  genre,
  genreEl,
  detailGenre,
  detailGenreEl,
  ageGrade,
  ageGradeEl,
  channel,
  channelEl,
  loadedGenre,
  loadedDetailGenre,
  loadedAgeGrade,
  loadedChannel,
  onHide,
  onClickThumbnail,
  onChangeTitle,
  onChangeDescription,
  onChangeThumbnail,
  onChangePrdtYear,
  onChangeGenre,
  onChangeDetailGenre,
  onChangeAgeGrade,
  onChangeChannel,
  onSubmit,
  isGetDetailGernreListLoading
}) => (
  <Modal show={true} onHide={onHide} animation={true} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>프로그램 {type}</Modal.Title>
    </Modal.Header>
    <Modal.Body
      style={{ maxHeight: window.innerHeight - 200, overflowY: "auto" }}
    >
      <Form>
        <Form.Group>
          <Form.Label>썸네일</Form.Label>
          <br />
          {thumbnail ? (
            <Thumbnail
              src={thumbnail}
              height={200}
              onClick={onClickThumbnail}
              alt={"thumbnail"}
            />
          ) : (
            <Image
              style={{
                width: "100%",
                height: 200,
                border: "1px solid #DEE2E6",
                borderRadius: 5
              }}
              onClick={onClickThumbnail}
            />
          )}
          <input
            type="file"
            onChange={onChangeThumbnail}
            ref={thumbnailEl}
            hidden
            accept="image/jpg, image/jpeg, image/png"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>채널</Form.Label>
          <Form.Control
            as="select"
            value={channel}
            onChange={onChangeChannel}
            ref={channelEl}
          >
            {loadedChannel &&
              loadedChannel.map(({ id, name }, idx) => {
                return (
                  <option value={id} key={idx}>
                    {name}
                  </option>
                );
              })}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>프로그램명</Form.Label>
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
          <Form.Label>제작 년도</Form.Label>
          <Form.Control
            as="select"
            value={prdtYear}
            onChange={onChangePrdtYear}
            ref={prdtYearEl}
          >
            {Array.from({ length: 10 }).map((v, idx) => {
              const year = moment().format("YYYY") - idx;
              return (
                <option value={year} key={idx}>
                  {year}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>대표 장르</Form.Label>
          <Form.Control
            as="select"
            value={genre}
            onChange={onChangeGenre}
            ref={genreEl}
          >
            {loadedGenre &&
              loadedGenre.map(({ id, name }, idx) => {
                return (
                  <option value={id} key={idx}>
                    {name}
                  </option>
                );
              })}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>세부 장르</Form.Label>
          <Form.Control
            as="select"
            value={detailGenre}
            onChange={onChangeDetailGenre}
            ref={detailGenreEl}
            disabled={isGetDetailGernreListLoading}
          >
            {loadedDetailGenre &&
              loadedDetailGenre.DetailGenres.map(({ id, name }, idx) => (
                <option value={id} key={idx}>
                  {name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>연령 등급</Form.Label>
          <Form.Control
            as="select"
            value={ageGrade}
            onChange={onChangeAgeGrade}
            ref={ageGradeEl}
          >
            {loadedAgeGrade &&
              loadedAgeGrade.map(({ id, name }, idx) => (
                <option value={id} key={idx}>
                  {name}
                </option>
              ))}
          </Form.Control>
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
export default SetProgramModalPresentaion;

SetProgramModalPresentaion.propTypes = {
  type: PropTypes.string.isRequired,
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
  thumbnail: PropTypes.string,
  thumbnailEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object })
  ]),
  prdtYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prdtYearEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object })
  ]),
  genre: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  genreEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object })
  ]),
  detailGenre: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  detailGenreEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object })
  ]),
  ageGrade: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ageGradeEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object })
  ]),
  channel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  channelEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object })
  ]),
  loadedGenre: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  loadedDetailGenre: PropTypes.shape({
    DetailGenres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      })
    )
  }),
  loadedAgeGrade: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  loadedChannel: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  onHide: PropTypes.func.isRequired,
  onClickThumbnail: PropTypes.func.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onChangeThumbnail: PropTypes.func.isRequired,
  onChangePrdtYear: PropTypes.func.isRequired,
  onChangeGenre: PropTypes.func.isRequired,
  onChangeDetailGenre: PropTypes.func.isRequired,
  onChangeAgeGrade: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isGetDetailGernreListLoading: PropTypes.bool.isRequired
};
