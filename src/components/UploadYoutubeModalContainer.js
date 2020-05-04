import React, { useCallback, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
import UploadYoutubeModalPresentation from "./UploadYoutubeModalPresentation";
import { HIDE_ADDUPLOADVIDEOMODAL } from "../reducers/common";
import { INACTIVE_POSTITEM } from "../reducers/post";
import {
  CONNECT_OAUTH_REQUEST,
  INSERT_VIDEO_REQUEST
} from "../reducers/youtube";

const UploadYoutubeModalContainer = () => {
  const dispatch = useDispatch();

  const { activePost } = useSelector(state => state.post);
  const { loadedOauthUrl, isInsertVideoLoading } = useSelector(
    state => state.youtube
  );

  const titleEl = useRef(null);
  const descriptionEl = useRef(null);

  const [title, setTitle] = useState(""); // 포스트 제목
  const [description, setDescription] = useState(""); // 포스트 내용
  const [tags, setTags] = useState([]); // 포스트 태그
  const [privacyStatus, setPrivacyStatus] = useState("public"); // 공개 설정

  // 모달 끄기
  const onHide = useCallback(() => {
    dispatch({
      type: HIDE_ADDUPLOADVIDEOMODAL
    });
    dispatch({
      type: INACTIVE_POSTITEM
    });
  }, [dispatch]);

  const onChangeTitle = useCallback(e => {
    setTitle(e.target.value);
  }, []);

  const onChangeDescription = useCallback(e => {
    setDescription(e.target.value);
  }, []);

  const onChangePrivacyStatus = useCallback(e => {
    setPrivacyStatus(e.target.value);
  });

  const onClickConnectAccount = useCallback(() => {
    const opener = window.open(loadedOauthUrl, "oauth");
    opener.focus();
  }, [loadedOauthUrl, dispatch]);

  // 업로드
  const onSubmit = useCallback(() => {
    if (!title) {
      alert("제목을 입력하세요.");
      titleEl.current.focus();
      return;
    }
    if (title.length > 200) {
      alert("제목은 200자 이내로 입력하세요.");
      titleEl.current.focus();
      return;
    }
    if (description && description.length > 500) {
      alert("내용은 500자 이내로 입력하세요.");
      descriptionEl.current.focus();
      return;
    }

    dispatch({
      type: INSERT_VIDEO_REQUEST,
      payload: {
        id: activePost.id,
        title,
        description,
        tags,
        privacyStatus
      }
    });
  }, [title, description, tags, activePost, privacyStatus, dispatch]);
  // 기본 값 설정
  useEffect(() => {
    if (activePost) {
      const { title, description, tag } = activePost;
      setTitle(title);
      setDescription(description || "");
      setTags(tag.split(","));
      dispatch({
        type: CONNECT_OAUTH_REQUEST
      });
    }
  }, [activePost, dispatch]);

  return (
    <UploadYoutubeModalPresentation
      activePost={activePost}
      isInsertVideoLoading={isInsertVideoLoading}
      title={title}
      titleEl={titleEl}
      description={description}
      descriptionEl={descriptionEl}
      tags={tags}
      setTags={setTags}
      privacyStatus={privacyStatus}
      onHide={onHide}
      onClickConnectAccount={onClickConnectAccount}
      onChangeTitle={onChangeTitle}
      onChangeDescription={onChangeDescription}
      onChangePrivacyStatus={onChangePrivacyStatus}
      onSubmit={onSubmit}
    />
  );
};
export default UploadYoutubeModalContainer;
