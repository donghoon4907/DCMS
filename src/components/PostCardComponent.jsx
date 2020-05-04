import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CardWrap,
  CardHeader,
  CardThumbnail,
  CardBody,
  CardFooter,
  EllipsisText
} from "./PublishStyledComponent";
import {
  SHOW_POSTCOMMENTMODAL,
  SHOW_UPDATEPOSTMODAL,
  SHOW_ADDUPLOADVIDEOMODAL
} from "../reducers/common";
import {
  ADD_LIKEPOST_REQUEST,
  REMOVE_LIKEPOST_REQUEST,
  ACTIVE_POSTITEM,
  UPLOAD_VIDEO_REQUEST
} from "../reducers/post";
import { EmptyHeart, FillHeart, Comment, Youtube } from "../assets/icons";

const PostCardComponent = props => {
  const {
    id,
    title,
    description,
    createdAt,
    Images,
    Likers,
    Comments,
    isUploadYt
  } = props;

  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.user);

  const [likeCount, setLikeCount] = useState(Likers.length);
  const [isLike, setIsLike] = useState(
    Likers.some(v => v.userId === userInfo.userId)
  );

  // 포스트 선택
  const onClickItem = useCallback(
    post => {
      dispatch({
        type: ACTIVE_POSTITEM,
        payload: post
      });
      dispatch({
        type: SHOW_UPDATEPOSTMODAL
      });
    },
    [dispatch]
  );

  // 댓글
  const onClickComment = useCallback(() => {
    dispatch({
      type: ACTIVE_POSTITEM,
      payload: props
    });
    dispatch({
      type: SHOW_POSTCOMMENTMODAL
    });
  }, [dispatch]);

  // 유튜브 업로드
  const onClickUploadVideo = useCallback(() => {
    if (isUploadYt === "N") {
      dispatch({
        type: ACTIVE_POSTITEM,
        payload: props
      });
      dispatch({
        type: SHOW_ADDUPLOADVIDEOMODAL
      });
    }
  }, [dispatch, isUploadYt]);

  // 포스트 좋아요 / 좋아요 삭제
  const onClickLikePost = useCallback(
    ({ id, isLike }) => {
      if (isLike) {
        dispatch({
          type: REMOVE_LIKEPOST_REQUEST,
          payload: { id }
        });
        setIsLike(false);
        setLikeCount(likeCount - 1);
      } else {
        dispatch({
          type: ADD_LIKEPOST_REQUEST,
          payload: { id }
        });
        setIsLike(true);
        setLikeCount(likeCount + 1);
      }
    },
    [likeCount, dispatch]
  );

  return (
    <CardWrap key={`postCard${id}`}>
      <CardHeader>
        <div>
          <span
            title={
              isUploadYt === "Y"
                ? "이미 Youtube에 업로드 되었습니다."
                : "Youtube에 업로드할 수 있습니다."
            }
          >
            <Youtube
              onClick={onClickUploadVideo}
              style={{
                width: 20,
                height: 20,
                fill: isUploadYt === "Y" ? "red" : "lightgray",
                cursor: isUploadYt === "Y" ? "default" : "cursor"
              }}
            />
          </span>
        </div>
        <div title={createdAt}>{createdAt.substring(0, 10)}</div>
      </CardHeader>
      <CardThumbnail>
        <img
          src={`${process.env.REACT_APP_BACKEND_HOST}/images/${Images[0].src}`}
          width={"100%"}
          height={"100%"}
          alt={"thumbnail"}
        />
      </CardThumbnail>
      <CardBody>
        <EllipsisText onClick={() => onClickItem(props)}>{title}</EllipsisText>
        <EllipsisText onClick={() => onClickItem(props)}>
          {description}
        </EllipsisText>
      </CardBody>
      <CardFooter>
        <div>
          <span>
            {isLike ? (
              <FillHeart
                style={{ width: 20, height: 20, fill: "red" }}
                onClick={() => onClickLikePost({ id, isLike: true })}
              />
            ) : (
              <EmptyHeart
                style={{ width: 20, height: 20, fill: "white" }}
                onClick={() => onClickLikePost({ id, isLike: false })}
              />
            )}
          </span>
          <span className="ml-1 mr-2">{likeCount}</span>
          <span>
            <Comment
              style={{ width: 20, height: 20, fill: "white" }}
              onClick={onClickComment}
            />
          </span>
          <span className="ml-1 mr-2">{Comments.length}</span>
        </div>
        <div className="d-flex justify-content-center align-items-center"></div>
      </CardFooter>
    </CardWrap>
  );
};

export default PostCardComponent;
