import React, { useCallback, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SetContentModalPresentaion from "./SetContentModalPresentation";
import {
  SHOW_SEARCHPROGRAMMODAL,
  HIDE_ADDCONTENTMODAL,
  HIDE_UPDATECONTENTMODAL,
  SHOW_SEARCHCASTMODAL
} from "../reducers/common";
import { SELECT_PROGRAM } from "../reducers/program";
import {
  ADD_CONTENTITEM_REQUEST,
  UPDATE_CONTENTITEM_REQUEST,
  INACTIVE_CONTENTITEM,
  REMOVE_SELECTEDCAST,
  INIT_SELECTEDCAST,
  SELECT_CAST
} from "../reducers/content";
import moment from "moment";
import axios from "axios";
import { showToast } from "../module/toast";

const SetContentModalContainer = () => {
  const dispatch = useDispatch();

  const { activeContent, selectedCast } = useSelector((state) => state.content); // 선택한 콘텐츠 ( 수정 여부 판단 )}
  const { selectedProgram } = useSelector((state) => state.program); //

  const videoEl = useRef(null);
  const descriptionEl = useRef(null);
  const broadcastDateEl = useRef(null);

  const [type, setType] = useState("등록"); // 등록, 수정 구분
  const [description, setDescription] = useState(""); // 컨텐츠 내용
  const [broadcastDate, setBroadcastDate] = useState(moment().toDate()); // 방송일
  const [progress, setProgress] = useState(0); // 업로드 진행률
  const [runtime, setRuntime] = useState(-1); // 업로드된 영상재생길이
  // const [duration, setDuration] = useState(0); // 업로드된 영상 길이
  const [src, setSrc] = useState(""); // 업로드된 영상명
  const [framerate, setFramerate] = useState(-1); // 업로드된 영상 초당프레임

  // 모달 끄기
  const onHide = useCallback(() => {
    if (progress > 0 && progress < 100) {
      return alert("업로드가 진행 중입니다.");
    }
    dispatch({
      type: HIDE_ADDCONTENTMODAL
    });
    dispatch({
      type: HIDE_UPDATECONTENTMODAL
    });
    dispatch({
      type: INACTIVE_CONTENTITEM
    });
    dispatch({
      type: INIT_SELECTEDCAST
    });
  }, [progress, dispatch]);

  const onClickShowPgmModal = useCallback(() => {
    dispatch({
      type: SHOW_SEARCHPROGRAMMODAL
    });
  }, [dispatch]);

  const onClickShowCastModal = useCallback(() => {
    dispatch({
      type: SHOW_SEARCHCASTMODAL
    });
  }, [dispatch]);

  const onClickVideo = useCallback(() => {
    videoEl.current.click();
  }, []);

  const onClickRemoveSelectedCast = useCallback(
    ({ id }) => {
      dispatch({
        type: REMOVE_SELECTEDCAST,
        payload: id
      });
    },
    [dispatch]
  );

  const onCancelUpload = useCallback(() => {
    if (window.confirm("다른 영상으로 재업로드 하시겠습니까?")) {
      setProgress(0);
      setRuntime(-1);
      setFramerate(-1);
      setSrc("");
    }
  }, []);

  const onChangeVideo = useCallback(async (e) => {
    // 파일 선택창에서 취소 버튼을 누른 경우
    if (!e.target.value) return;

    const { files } = e.target;

    const formData = new FormData();
    formData.append("file", files[0]);

    const response = await axios.post("/content/upload", formData, {
      onUploadProgress: ({ lengthComputable, loaded, total }) => {
        if (lengthComputable) {
          setProgress(Math.floor((loaded / total) * 100));
        }
      },
      withCredentials: true
    });
    if (response) {
      const {
        data: { name, runtime, framerate, message }
      } = response;
      setSrc(name);
      setProgress(100);
      setRuntime(runtime);
      setFramerate(framerate);
      showToast({
        type: "info",
        message
      });
      // 영상 길이 구하기
      // const reader = new FileReader();

      // reader.onloadend = () => {
      //   const media = new Audio(reader.result);
      //   media.onloadedmetadata = () => {
      //     setDuration(Math.ceil(media.duration));
      //     showToast({
      //       type: "success",
      //       message: "후작업이 끝났습니다. 다음 작업을 진행하실 수 있습니다."
      //     });
      //   };
      // };

      // reader.readAsDataURL(files[0]);
    }
  }, []);

  const onChangeDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    if (type === "등록") {
      if (!src) {
        alert("영상을 업로드하세요.");
        return;
      }
      if (!selectedProgram) {
        alert("프로그램을 선택하세요.");
        return;
      }
    }

    if (description && description.length > 500) {
      alert("내용은 500자 이내로 입력하세요.");
      descriptionEl.current.focus();
      return;
    }
    if (!broadcastDate) {
      alert("방송일을 입력하세요.");
      broadcastDateEl.current.focus();
      return;
    }
    dispatch({
      type: activeContent
        ? UPDATE_CONTENTITEM_REQUEST
        : ADD_CONTENTITEM_REQUEST,
      payload: {
        id: activeContent ? activeContent.id : null,
        file_name: src,
        file_runtime: runtime,
        file_framerate: framerate,
        description,
        pgm_id: selectedProgram.id,
        pgm_epiNum: selectedProgram.epiNumber,
        cast: selectedCast,
        broadcast_date: moment(broadcastDate).format("YYYY-MM-DD HH:mm:ss")
      }
    });
  }, [
    type,
    src,
    runtime,
    framerate,
    selectedProgram,
    description,
    broadcastDate,
    activeContent,
    selectedCast,
    dispatch
  ]);
  // 수정 시 기본 값 설정
  useEffect(() => {
    if (activeContent) {
      const {
        description,
        Casts,
        epiNumber,
        Program,
        broadcastedAt
      } = activeContent;
      setType("수정");
      setDescription(description);
      setBroadcastDate(new Date(broadcastedAt));
      dispatch({
        type: SELECT_CAST,
        payload: Casts
      });
      dispatch({
        type: SELECT_PROGRAM,
        payload: {
          id: Program.id,
          title: Program.title,
          epiNumber: epiNumber
        }
      });
    }
  }, [activeContent, dispatch]);

  return (
    <SetContentModalPresentaion
      type={type}
      progress={progress}
      videoEl={videoEl}
      selectedProgram={selectedProgram}
      selectedCast={selectedCast}
      description={description}
      descriptionEl={descriptionEl}
      broadcastDate={broadcastDate}
      broadcastDateEl={broadcastDateEl}
      setBroadcastDate={setBroadcastDate}
      onClickVideo={onClickVideo}
      onClickRemoveSelectedCast={onClickRemoveSelectedCast}
      onClickShowPgmModal={onClickShowPgmModal}
      onClickShowCastModal={onClickShowCastModal}
      onChangeVideo={onChangeVideo}
      onChangeDescription={onChangeDescription}
      onCancelUpload={onCancelUpload}
      onHide={onHide}
      onSubmit={onSubmit}
    />
  );
};
export default SetContentModalContainer;
