import React, { useCallback, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SetPostModalPresentaion from "./SetPostModalPresentation";
import { HIDE_ADDPOSTMODAL, SHOW_SEARCHPROGRAMMODAL } from "../reducers/common";
import { ADD_POSTITEM_REQUEST } from "../reducers/post";
import { SELECT_CONTENTLIST_REQUEST } from "../reducers/content";

const SetPostModalContainer = () => {
  const dispatch = useDispatch();

  const { selectedProgram } = useSelector((state) => state.program);
  const { selectedContent } = useSelector((state) => state.content);
  const { userInfo } = useSelector((state) => state.user);

  const titleEl = useRef(null);
  const descriptionEl = useRef(null);
  const thumbnailEl = useRef(null);

  const [title, setTitle] = useState(""); // 포스트 제목
  const [description, setDescription] = useState(""); // 포스트 내용
  const [tags, setTags] = useState([]); // 포스트 태그
  const [thumbnail, setThumbnail] = useState(""); // 썸네일 미리보기
  const [selectedFile, setSelectedFile] = useState(null); // 썸네일 파일 데이터
  const [epiNumber, setEpiNumber] = useState(-1); // 해당 프로그램의 화수

  // 모달 끄기
  const onHide = useCallback(() => {
    dispatch({
      type: HIDE_ADDPOSTMODAL
    });
  }, [dispatch]);

  // 영상 편집 하기
  const onClickEditVideo = useCallback(() => {
    const { epiNumber, Program } = selectedContent[0];
    const { src: thumb_url } = Program.Images[0];
    const {
      runtime,
      src: video_url,
      ContentId,
      framerate
    } = selectedContent[0].Videos[0];
    var opener = window.open(
      `../../public/nle.html?refid=${ContentId}&usernm=${userInfo.userId}&title=${Program.title}-${epiNumber}&thumb_url=${thumb_url}&video_url=${video_url}&runtime=${runtime}&framerate=${framerate}`,
      "nle"
    );
    opener.focus();
  }, [selectedContent, userInfo]);

  // 프로그램 검색 버튼
  const onClickShowPgmModal = useCallback(() => {
    dispatch({
      type: SHOW_SEARCHPROGRAMMODAL
    });
  }, [dispatch]);

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onChangeDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  const onChangeEpiNumber = useCallback((e) => {
    setEpiNumber(e.target.value);
  }, []);

  const onClickThumbnail = useCallback(() => {
    thumbnailEl.current.click();
  }, []);

  const onChangeThumbnail = useCallback((e) => {
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
      type: ADD_POSTITEM_REQUEST,
      payload: {
        title,
        description,
        tags,
        selectedFile
      }
    });
  }, [title, description, tags, selectedFile, dispatch]);

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
      setEpiNumber(selectedContent[0].id);
      console.log(selectedContent[0].id);
    }
  }, [selectedContent, dispatch]);

  return (
    <SetPostModalPresentaion
      selectedProgram={selectedProgram}
      selectedContent={selectedContent}
      title={title}
      titleEl={titleEl}
      description={description}
      descriptionEl={descriptionEl}
      epiNumber={epiNumber}
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
      onChangeEpiNumber={onChangeEpiNumber}
      onChangeThumbnail={onChangeThumbnail}
      onSubmit={onSubmit}
    />
  );
};
export default SetPostModalContainer;
