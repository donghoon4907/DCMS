import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HIDE_POSTCOMMENTMODAL } from "../reducers/common";
import {
  INACTIVE_POSTITEM,
  ADD_LIKEPOST_REQUEST,
  REMOVE_LIKEPOST_REQUEST,
  ADD_COMMENT_REQUEST,
  REMOVE_COMMENT_REQUEST
} from "../reducers/post";
import {
  ADD_FOLLOWING_REQUEST,
  REMOVE_FOLLOWING_REQUEST
} from "../reducers/user";
import PostCommentModalPresentaion from "./PostCommentModalPresentaion";

const PostCommentModalContainer = () => {
  const dispatch = useDispatch();

  const {
    activePost,
    isAddCommentLoading,
    isUpdateCommentLoading,
    isRemoveCommentLoading
  } = useSelector(state => state.post);
  const {
    userInfo,
    isAddFollowingLoading,
    isRemoveFollowingLoading
  } = useSelector(state => state.user);

  const [comment, setComment] = useState("");
  const [isFollowing, setIsFollowing] = useState(
    userInfo.Followings.some(v => activePost.User.id === v.id)
  );
  // const [likeCount, setLikeCount] = useState(activePost.Likers.length);
  // const [isLike, setIsLike] = useState(
  //   activePost.Likers.some(v => v.userId === userInfo.userId)
  // );

  const onHide = useCallback(() => {
    dispatch({
      type: HIDE_POSTCOMMENTMODAL
    });
    dispatch({
      type: INACTIVE_POSTITEM
    });
  }, [dispatch]);

  // const onClickLikePost = useCallback(
  //   ({ id, isLike }) => {
  //     if (isLike) {
  //       dispatch({
  //         type: REMOVE_LIKEPOST_REQUEST,
  //         payload: { id }
  //       });
  //       setIsLike(false);
  //       setLikeCount(likeCount - 1);
  //     } else {
  //       dispatch({
  //         type: ADD_LIKEPOST_REQUEST,
  //         payload: { id }
  //       });
  //       setIsLike(true);
  //       setLikeCount(likeCount + 1);
  //     }
  //   },
  //   [likeCount, dispatch]
  // );

  const onChangeComment = useCallback(e => {
    setComment(e.target.value);
  }, []);

  const onClickCommentBtn = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      payload: {
        id: activePost.id,
        content: comment
      }
    });
    setComment("");
  }, [comment, dispatch]);

  const onClickDeleteCommentBtn = useCallback(
    id => {
      if (confirm("선택한 댓글을 삭제하시겠습니까?")) {
        dispatch({
          type: REMOVE_COMMENT_REQUEST,
          payload: {
            id
          }
        });
      }
    },
    [dispatch]
  );

  const onClickFollowingBtn = useCallback(
    id => {
      if (isFollowing) {
        dispatch({
          type: REMOVE_FOLLOWING_REQUEST,
          payload: { id }
        });
        setIsFollowing(false);
      } else {
        dispatch({
          type: ADD_FOLLOWING_REQUEST,
          payload: { id }
        });
        setIsFollowing(true);
      }
    },
    [isFollowing, dispatch]
  );

  return (
    <PostCommentModalPresentaion
      comment={comment}
      userInfo={userInfo}
      activePost={activePost}
      isFollowing={isFollowing}
      isAddFollowingLoading={isAddFollowingLoading}
      isRemoveFollowingLoading={isRemoveFollowingLoading}
      isAddCommentLoading={isAddCommentLoading}
      isUpdateCommentLoading={isUpdateCommentLoading}
      isRemoveCommentLoading={isRemoveCommentLoading}
      onHide={onHide}
      onChangeComment={onChangeComment}
      onClickCommentBtn={onClickCommentBtn}
      onClickDeleteCommentBtn={onClickDeleteCommentBtn}
      onClickFollowingBtn={onClickFollowingBtn}
    />
  );
};
export default PostCommentModalContainer;
