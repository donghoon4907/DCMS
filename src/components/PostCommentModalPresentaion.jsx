import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Dropdown } from "react-bootstrap";
import TextareaAutosize from "react-autosize-textarea";
import { EllipsisText } from "./PublishStyledComponent";
import { LoadingWrap } from "./LoginStyledComponent";
import { FillHeart, EmptyHeart, More } from "../assets/icons";

const PostCommentModalPresentaion = ({
  comment,
  userInfo,
  activePost,
  isFollowing,
  isAddFollowingLoading,
  isRemoveFollowingLoading,
  isAddCommentLoading,
  isUpdateCommentLoading,
  isRemoveCommentLoading,
  onHide,
  onChangeComment,
  onClickCommentBtn,
  onClickDeleteCommentBtn,
  onClickFollowingBtn
}) => (
  <Modal show={true} onHide={onHide} animation={true} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>포스트 정보</Modal.Title>
    </Modal.Header>
    <Modal.Body
      style={{
        maxHeight: window.innerHeight - 130,
        overflowY: "auto"
      }}
    >
      <div className="d-flex justify-content-center align-item-center">
        <video
          src={`${process.env.REACT_APP_BACKEND_HOST}/videos/${activePost.Videos[0].src}`}
          controls
          style={{
            width: "100%",
            height: "20%",
            borderRadius: 5
          }}
        />
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 10,
          marginTop: 10
        }}
      >
        <EllipsisText style={{ cursor: "default" }} title={activePost.title}>
          {activePost.title}
        </EllipsisText>
      </div>
      <div
        style={{ fontSize: 20, marginBottom: 10 }}
        title={activePost.description}
      >
        <EllipsisText style={{ cursor: "default" }}>
          {activePost.description}
        </EllipsisText>
      </div>
      <div>{activePost.tag}</div>
      {/* <div>
          <span>
            {isLike ? (
              <FillHeart
                style={{ width: 20, height: 20, fill: "red" }}
                onClick={() =>
                  onClickLikePost({ id: activePost.id, isLike: true })
                }
              />
            ) : (
              <EmptyHeart
                style={{ width: 20, height: 20, fill: "black" }}
                onClick={() =>
                  onClickLikePost({ id: activePost.id, isLike: false })
                }
              />
            )}
          </span>
          <span className="ml-1 mr-2">{likeCount}</span>
        </div> */}
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <img
            src={`${process.env.REACT_APP_BACKEND_HOST}/images/${
              activePost.Images.length > 0
                ? activePost.User.Images[0].src
                : process.env.REACT_APP_DEFAULT_THUMBNAIL
            }`}
            width={50}
            height={50}
            style={{
              borderRadius: "50%"
            }}
            alt={"thumbnail"}
          />
          <span style={{ marginLeft: 10, fontSize: 20, fontWeight: "bold" }}>
            {activePost.User.userId}
          </span>
        </div>
        {userInfo.userId !== activePost.User.userId && (
          <LoadingWrap
            loading={isAddFollowingLoading || isRemoveFollowingLoading ? 1 : 0}
          >
            <Button
              variant="outline-primary"
              style={{ position: "relative", zIndex: 1 }}
              onClick={() => onClickFollowingBtn(activePost.User.id)}
            >
              {isFollowing ? "언팔로우" : "팔로우"}
            </Button>
          </LoadingWrap>
        )}
      </div>
      <hr />
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div>댓글 {activePost.Comments.length}개</div>
          <LoadingWrap loading={isAddCommentLoading ? 1 : 0}>
            <Button
              variant="outline-primary"
              onClick={onClickCommentBtn}
              style={{ position: "relative", zIndex: 1 }}
              disabled={isAddCommentLoading}
            >
              댓글쓰기
            </Button>
          </LoadingWrap>
        </div>
        <div style={{ marginBottom: 10, marginTop: 10 }}>
          <TextareaAutosize
            className="form-control"
            placeholder="댓글을 입력하세요."
            value={comment}
            onChange={onChangeComment}
          />
        </div>
        <div>
          {activePost.Comments.length > 0 &&
            activePost.Comments.map((v, idx) => (
              <div
                style={{ display: "flex", height: 50 }}
                key={`comment${idx}`}
              >
                <div
                  style={{ flex: 1 }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <img
                    src={`${process.env.REACT_APP_BACKEND_HOST}/images/${
                      v.User.Images.length > 0
                        ? v.User.Images[0].src
                        : process.env.REACT_APP_DEFAULT_THUMBNAIL
                    }`}
                    width={30}
                    height={30}
                    style={{
                      borderRadius: "50%"
                    }}
                    alt={"thumbnail"}
                  />
                </div>
                <div style={{ flex: 10, overflow: "hidden" }}>
                  <div>
                    <span>{v.User.userId}</span>
                    <span
                      style={{ color: "gray", marginLeft: 10, fontSize: 10 }}
                    >
                      {v.createdAt}
                    </span>
                  </div>
                  <div style={{ fontSize: 12 }}>
                    <EllipsisText style={{ cursor: "default" }}>
                      {v.content}
                    </EllipsisText>
                  </div>
                </div>
                {userInfo.userId === v.User.userId && (
                  <div
                    style={{ flex: 1 }}
                    className="d-flex justify-content-end align-items-center"
                  >
                    <Dropdown>
                      <Dropdown.Toggle
                        style={{
                          background: "white",
                          border: "none",
                          padding: 0
                        }}
                      >
                        <More style={{ width: 20, height: 20, fill: "gray" }} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          disabled={isRemoveCommentLoading}
                          onClick={() => onClickDeleteCommentBtn(v.id)}
                        >
                          삭제
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </Modal.Body>
  </Modal>
);

export default PostCommentModalPresentaion;

PostCommentModalPresentaion.propTypes = {
  comment: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isAddFollowingLoading: PropTypes.bool.isRequired,
  isRemoveFollowingLoading: PropTypes.bool.isRequired,
  isAddCommentLoading: PropTypes.bool.isRequired,
  isUpdateCommentLoading: PropTypes.bool.isRequired,
  isRemoveCommentLoading: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onChangeComment: PropTypes.func.isRequired,
  onClickCommentBtn: PropTypes.func.isRequired,
  onClickDeleteCommentBtn: PropTypes.func.isRequired,
  onClickFollowingBtn: PropTypes.func.isRequired
};
