import React, { useCallback, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SetProgramModalPresentaion from "./SetProgramModalPresentation";
import {
  HIDE_ADDPROGRAMMODAL,
  HIDE_UPDATEPROGRAMMODAL
} from "../reducers/common";
import {
  ADD_PROGRAMITEM_REQUEST,
  GET_DETAILGENRELIST_REQUEST,
  UPDATE_PROGRAMITEM_REQUEST,
  INACTIVE_PROGRAMITEM
} from "../reducers/program";
import moment from "moment";

const SetProgramModalContainer = () => {
  const dispatch = useDispatch();
  const {
    loadedGenre, // 불러온 전체 장르 목록
    loadedAgeGrade, // 불러온 전체 연령 등급 목록
    loadedDetailGenre, // 불러온 세부 장르 목록
    loadedChannel, // 불러온 전체 채널 목록
    isGetDetailGernreListLoading, // 세부 장르 로드중 여부
    activeProgram // 선택된 프로그램 ( 수정 여부 판단 )
  } = useSelector(state => state.program);

  const titleEl = useRef(null);
  const descriptionEl = useRef(null);
  const thumbnailEl = useRef(null);
  const prdtYearEl = useRef(null);
  const genreEl = useRef(null);
  const detailGenreEl = useRef(null);
  const ageGradeEl = useRef(null);
  const channelEl = useRef(null);

  const [type, setType] = useState("등록");
  const [title, setTitle] = useState(""); // 프로그램명
  const [description, setDescription] = useState(""); // 프로그램 내용
  const [thumbnail, setThumbnail] = useState(""); // 썸네일 미리보기
  const [selectedFile, setSelectedFile] = useState(null); // 썸네일 파일 데이터
  const [prdtYear, setPrdtYear] = useState(moment().format("YYYY")); // 제작 년도
  const [genre, setGenre] = useState(loadedGenre && loadedGenre[0].id); // 대표 장르
  const [detailGenre, setDetailGenre] = useState(""); // 세부 장르
  const [ageGrade, setAgeGrade] = useState(
    loadedAgeGrade && loadedAgeGrade[0].id
  ); // 연령 등급
  const [channel, setChannel] = useState(loadedChannel && loadedChannel[0].id); //채널

  // 모달 끄기
  const onHide = useCallback(() => {
    dispatch({
      type: HIDE_ADDPROGRAMMODAL
    });
    dispatch({
      type: HIDE_UPDATEPROGRAMMODAL
    });
    dispatch({
      type: INACTIVE_PROGRAMITEM
    });
  }, [dispatch]);

  const onChangeTitle = useCallback(e => {
    setTitle(e.target.value);
  }, []);

  const onChangeDescription = useCallback(e => {
    setDescription(e.target.value);
  }, []);

  const onChangeChannel = useCallback(e => {
    setChannel(e.target.value);
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

  const onChangePrdtYear = useCallback(e => {
    setPrdtYear(e.target.value);
  }, []);

  const onChangeGenre = useCallback(
    e => {
      setGenre(e.target.value);
      dispatch({
        type: GET_DETAILGENRELIST_REQUEST,
        payload: {
          id: e.target.value
        }
      });
    },
    [dispatch]
  );

  const onChangeDetailGenre = useCallback(e => {
    setDetailGenre(e.target.value);
  }, []);

  const onChangeAgeGrade = useCallback(e => {
    setAgeGrade(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    if (!title) {
      alert("프로그램명을 입력하세요.");
      titleEl.current.focus();
      return;
    }
    if (title.length > 200) {
      alert("프로그램명은 200자 이내로 입력하세요.");
      titleEl.current.focus();
      return;
    }
    if (description && description.length > 500) {
      alert("내용은 500자 이내로 입력하세요.");
      descriptionEl.current.focus();
      return;
    }
    if (!thumbnail) {
      alert("썸네일을 등록해주세요.");
      return;
    }
    if (!prdtYear) {
      alert("제작년도를 선택하세요.");
      prdtYearEl.current.focus();
      return;
    }
    if (!genre) {
      alert("장르를 선택하세요.");
      genreEl.current.focus();
      return;
    }
    if (!detailGenre) {
      alert("세부장르를 선택하세요.");
      detailGenreEl.current.focus();
      return;
    }
    if (!ageGrade) {
      alert("연령등급을 선택하세요.");
      ageGradeEl.current.focus();
      return;
    }
    if (!channel) {
      alert("채널을 선택하세요.");
      channelEl.current.focus();
      return;
    }

    dispatch({
      type: activeProgram
        ? UPDATE_PROGRAMITEM_REQUEST
        : ADD_PROGRAMITEM_REQUEST,
      payload: {
        id: activeProgram ? activeProgram.id : null,
        title,
        description,
        selectedFile,
        prdtYear,
        genre,
        detailGenre,
        ageGrade,
        channel
      }
    });
  }, [
    title,
    description,
    thumbnail,
    selectedFile,
    prdtYear,
    genre,
    detailGenre,
    ageGrade,
    channel,
    activeProgram,
    dispatch
  ]);
  // 세부장르 기본값 설정 수정 시에는 비호출
  useEffect(() => {
    if (!activeProgram) {
      dispatch({
        type: GET_DETAILGENRELIST_REQUEST,
        payload: {
          id: loadedGenre && loadedGenre[0].id
        }
      });
    }
  }, [dispatch, loadedGenre, activeProgram]);
  // 대표장르에 따른 세부장르 변경 대응
  useEffect(() => {
    if (loadedDetailGenre) {
      // 수정시 다르게 설정
      if (activeProgram) {
        setDetailGenre(activeProgram.DetailGenre.id);
      } else {
        setDetailGenre(loadedDetailGenre.DetailGenres[0].id);
      }
    }
  }, [loadedDetailGenre, activeProgram]);
  // 수정 시 기본 값 설정
  useEffect(() => {
    if (activeProgram) {
      const {
        title,
        description,
        Images,
        product_year,
        Genre,
        Agegrade,
        Channel
      } = activeProgram;
      setType("수정");
      setTitle(title);
      setDescription(description);
      setThumbnail(
        `${process.env.REACT_APP_BACKEND_HOST}/images/${Images[0].src}`
      );
      setPrdtYear(product_year);
      setAgeGrade(Agegrade.id);
      setChannel(Channel.id);
      setGenre(Genre.id);
      dispatch({
        type: GET_DETAILGENRELIST_REQUEST,
        payload: {
          id: Genre.id
        }
      });
    }
  }, [activeProgram, dispatch]);
  return (
    <SetProgramModalPresentaion
      type={type}
      title={title}
      titleEl={titleEl}
      description={description}
      descriptionEl={descriptionEl}
      thumbnail={thumbnail}
      thumbnailEl={thumbnailEl}
      prdtYear={prdtYear}
      prdtYearEl={prdtYearEl}
      genre={genre}
      genreEl={genreEl}
      detailGenre={detailGenre}
      detailGenreEl={detailGenreEl}
      ageGrade={ageGrade}
      ageGradeEl={ageGradeEl}
      channel={channel}
      channelEl={channelEl}
      loadedGenre={loadedGenre}
      loadedDetailGenre={loadedDetailGenre}
      loadedAgeGrade={loadedAgeGrade}
      loadedChannel={loadedChannel}
      onHide={onHide}
      onClickThumbnail={onClickThumbnail}
      onChangeTitle={onChangeTitle}
      onChangeDescription={onChangeDescription}
      onChangeThumbnail={onChangeThumbnail}
      onChangePrdtYear={onChangePrdtYear}
      onChangeGenre={onChangeGenre}
      onChangeDetailGenre={onChangeDetailGenre}
      onChangeAgeGrade={onChangeAgeGrade}
      onChangeChannel={onChangeChannel}
      onSubmit={onSubmit}
      isGetDetailGernreListLoading={isGetDetailGernreListLoading}
    />
  );
};
export default SetProgramModalContainer;
