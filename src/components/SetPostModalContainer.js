import React, { useCallback, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SetPostModalPresentaion from "./SetPostModalPresentation";
import {
  HIDE_ADDPOSTMODAL,
  SHOW_SEARCHPROGRAMMODAL,
  HIDE_UPDATEPOSTMODAL
} from "../reducers/common";
import {
  ADD_POSTITEM_REQUEST,
  UPDATE_POSTITEM_REQUEST,
  INACTIVE_POSTITEM
} from "../reducers/post";
import { SELECT_PROGRAM, INIT_SELECTEDPROGRAM } from "../reducers/program";
import {
  SELECT_CONTENTLIST_REQUEST,
  INIT_SELECTEDCONTENT
} from "../reducers/content";

const SetPostModalContainer = () => {
  const dispatch = useDispatch();

  const { selectedProgram } = useSelector(state => state.program);
  const { selectedContent } = useSelector(state => state.content);
  const { activePost, isAddItemLoading, isUpdateItemLoading } = useSelector(
    state => state.post
  );
  const { userInfo } = useSelector(state => state.user);

  const titleEl = useRef(null);
  const descriptionEl = useRef(null);
  const thumbnailEl = useRef(null);

  const [type, setType] = useState("등록"); // 등록, 수정 구분
  const [title, setTitle] = useState(""); // 포스트 제목
  const [description, setDescription] = useState(""); // 포스트 내용
  const [tags, setTags] = useState([]); // 포스트 태그
  const [thumbnail, setThumbnail] = useState(""); // 썸네일 미리보기
  const [selectedFile, setSelectedFile] = useState(null); // 썸네일 파일 데이터
  const [contentId, setContentId] = useState(-1); // 컨텐츠 아이디
  const [frame, setFrame] = useState(""); // 편집된 영상의 프레임(start,end)

  // 모달 끄기
  const onHide = useCallback(() => {
    dispatch({
      type: HIDE_ADDPOSTMODAL
    });
    dispatch({
      type: HIDE_UPDATEPOSTMODAL
    });
    dispatch({
      type: INIT_SELECTEDPROGRAM
    });
    dispatch({
      type: INIT_SELECTEDCONTENT
    });
    dispatch({
      type: INACTIVE_POSTITEM
    });
  }, [dispatch]);

  // 영상 편집 하기
  const onClickEditVideo = useCallback(() => {
    const { epiNumber, Program, Videos } = selectedContent.filter(
      v => v.id == contentId
    )[0];
    const { src: thumb_url } = Program.Images[0];
    const { runtime, src: video_url, ContentId, framerate } = Videos[0];
    const opener = window.open(
      `../../public/nle.html?refid=${ContentId}&usernm=${
        userInfo.userId
      }&title=${encodeURIComponent(
        Program.title
      )}-${epiNumber}&thumb_url=${thumb_url}&video_url=${video_url}&runtime=${runtime}&framerate=${framerate}`,
      "nle"
    );
    opener.focus();
    const interval = setInterval(() => {
      try {
        if (!opener || opener.closed) {
          clearInterval(interval);
          setFrame(document.querySelector("#export").value);
        }
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }, [selectedContent, userInfo, contentId]);

  // 프로그램 검색 버튼
  const onClickShowPgmModal = useCallback(() => {
    dispatch({
      type: SHOW_SEARCHPROGRAMMODAL
    });
  }, [dispatch]);

  const onChangeTitle = useCallback(e => {
    setTitle(e.target.value);
  }, []);

  const onChangeDescription = useCallback(e => {
    setDescription(e.target.value);
  }, []);

  const onChangeContentId = useCallback(e => {
    console.log(e.target.value);
  }, []);

  const onClickThumbnail = useCallback(() => {
    thumbnailEl.current.click();
  }, []);

  const onChangeThumbnail = useCallback(e => {
    // 파일 선택창에서 취소 버튼을 누른 경우
    if (!e.target.value) return;
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setThumbnail(reader.result);
      setSelectedFile(file);
    };

    reader.readAsDataURL(file);
  }, []);
  // 포스트 등록
  const onSubmit = useCallback(() => {
    if (type === "등록") {
      if (contentId == -1) {
        alert("프로그램을 선택하세요.");
        return;
      }
    }

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
      type: activePost ? UPDATE_POSTITEM_REQUEST : ADD_POSTITEM_REQUEST,
      payload: {
        id: activePost ? activePost.id : null,
        contentId,
        title,
        description,
        tags,
        selectedFile,
        frame
      }
    });
  }, [
    title,
    description,
    tags,
    selectedFile,
    frame,
    selectedProgram,
    contentId,
    activePost,
    dispatch
  ]);
  // 수정 시 기본 값 설정
  useEffect(() => {
    if (activePost) {
      const { title, description, tag, Images } = activePost;
      setType("수정");
      setTitle(title);
      setDescription(description || "");
      setTags(tag.split(","));
      if (Images.length > 0) {
        setThumbnail(
          `${process.env.REACT_APP_BACKEND_HOST}/images/${Images[0].src}`
        );
      }

      dispatch({
        type: SELECT_PROGRAM,
        payload: activePost.Content.Program
      });
    }
  }, [activePost]);

  // 프로그램 선택에 따른 컨텐츠 정보 로드
  useEffect(() => {
    if (selectedProgram) {
      dispatch({
        type: SELECT_CONTENTLIST_REQUEST,
        payload: {
          programId: selectedProgram.id
        }
      });
    }
  }, [selectedProgram, dispatch]);

  // 컨텐츠 정보 로드 시 업데이트
  useEffect(() => {
    if (selectedContent) {
      // 수정모드인 경우
      if (activePost) {
        setContentId(activePost.Content.id);
      } else {
        setContentId(selectedContent[0].id);
      }
    }
  }, [selectedContent, activePost, dispatch]);

  return (
    <SetPostModalPresentaion
      type={type}
      isAddItemLoading={isAddItemLoading}
      isUpdateItemLoading={isUpdateItemLoading}
      selectedProgram={selectedProgram}
      selectedContent={selectedContent}
      title={title}
      titleEl={titleEl}
      description={description}
      descriptionEl={descriptionEl}
      contentId={contentId}
      tags={tags}
      setTags={setTags}
      thumbnail={thumbnail}
      thumbnailEl={thumbnailEl}
      onHide={onHide}
      onClickThumbnail={onClickThumbnail}
      onClickShowPgmModal={onClickShowPgmModal}
      onClickEditVideo={onClickEditVideo}
      onChangeTitle={onChangeTitle}
      onChangeDescription={onChangeDescription}
      onChangeContentId={onChangeContentId}
      onChangeThumbnail={onChangeThumbnail}
      onSubmit={onSubmit}
    />
  );
};
export default SetPostModalContainer;
