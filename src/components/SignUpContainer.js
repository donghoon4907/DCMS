import React, { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignUpPresentation from "./SignUpPresentation";
import { SHOW_LOGINLAYER } from "../reducers/common";
import {
  DOUBLE_CHECK_REQUEST,
  CHECK_EMAIL_REQUEST,
  SIGN_UP_REQUEST
} from "../reducers/user";
import { validateText } from "../module/validate";

const SignUpContainer = () => {
  const dispatch = useDispatch();
  const idEl = useRef(null);
  const pwdEl = useRef(null);
  const confirmPwdEl = useRef(null);
  const nameEl = useRef(null);
  const emailEl = useRef(null);
  const tokenEl = useRef(null);
  const thumbnailEl = useRef(null);
  const {
    isDbCheckLoading,
    isCheckEmailLoading,
    isSignUpLoading,
    confirmedId,
    emailToken,
    confirmedEmail
  } = useSelector(state => state.user);
  const [id, setId] = useState(""); // 아이디
  const [pwd, setPwd] = useState(""); // 암호
  const [confirmPwd, setConfirmPwd] = useState(""); // 암호 확인
  const [name, setName] = useState(""); // 닉네임
  const [email, setEmail] = useState(""); // 이메일
  const [validateEmail, setValidateEmail] = useState(true); // 이메일 형식 정합 유무
  const [confirmEmailToken, setConfirmEmailToken] = useState(""); // 이메일 인증번호
  const [thumbnail, setThumbnail] = useState(""); // 미리보기
  const [selectedFile, setSelectedFile] = useState(null); // 파일 데이터

  const onChangeId = useCallback(e => {
    const isValidate = validateText(e.target.value, {
      isNotAllowBlank: true,
      isNotAllowSpecial: true,
      isNotAllowKorean: true
    });
    if (!isValidate) {
      setId(e.target.value);
    }
  }, []);

  const onChangePwd = useCallback(e => setPwd(e.target.value), []);

  const onChangeConfirmPwd = useCallback(
    e => setConfirmPwd(e.target.value),
    []
  );

  const onChangeName = useCallback(e => setName(e.target.value), []);

  const onChangeEmail = useCallback(e => {
    setEmail(e.target.value);
    const isValidate = validateText(e.target.value, {
      isEmail: true
    });
    if (!isValidate) {
      setValidateEmail(true);
    } else {
      setValidateEmail(false);
    }
  }, []);

  const onChangeConfirmEmailToken = useCallback(e => {
    setConfirmEmailToken(e.target.value);
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

  const onClickThumbnail = useCallback(() => {
    thumbnailEl.current.click();
  }, []);

  const onDoubleCheck = useCallback(() => {
    if (!id) {
      alert("먼저 아이디를 입력하세요.");
      idEl.current.focus();
      return;
    } else {
      dispatch({
        type: DOUBLE_CHECK_REQUEST,
        payload: {
          id
        }
      });
    }
  }, [id, dispatch]);

  const onCheckEmail = useCallback(() => {
    if (!email) {
      alert("이메일을 입력하세요.");
      emailEl.current.focus();
      return;
    }
    if (!validateEmail) {
      alert("이메일을 형식에 맞지 않습니다.");
      emailEl.current.focus();
      return;
    } else {
      dispatch({
        type: CHECK_EMAIL_REQUEST,
        payload: {
          email
        }
      });
    }
  }, [email, validateEmail, dispatch]);
  const onCancel = useCallback(() => {
    if (window.confirm("로그인 화면으로 돌아가시겠습니까?")) {
      dispatch({
        type: SHOW_LOGINLAYER
      });
    }
  }, [dispatch]);

  const onSubmit = useCallback(() => {
    if (id !== confirmedId) {
      alert("먼저 중복확인을 해주세요.");
      idEl.current.focus();
      return;
    }
    if (!pwd) {
      alert("비밀번호를 입력하세요.");
      pwdEl.current.focus();
      return;
    }
    if (!confirmPwd) {
      alert("비밀번호를 입력하세요.");
      confirmPwdEl.current.focus();
      return;
    }
    if (pwd !== confirmPwd) {
      alert("비밀번호가 일치하지 않습니다.");
      pwdEl.current.focus();
      return;
    }
    if (!name) {
      alert("이름을 입력하세요.");
      return;
    }
    if (!email) {
      alert("이메일을 입력하세요.");
      emailEl.current.focus();
      return;
    }
    if (!emailToken) {
      alert("이메일을 검증하세요.");
      return;
    }
    if (emailToken !== confirmEmailToken) {
      alert("인증번호를 확인하세요.");
      tokenEl.current.focus();
      return;
    }
    if (confirmedEmail !== email) {
      alert("검증된 이메일이 아닙니다.");
      emailEl.current.focus();
      return;
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      payload: {
        id,
        pwd,
        name,
        email,
        selectedFile
      }
    });
  }, [
    id,
    confirmedId,
    pwd,
    confirmPwd,
    name,
    email,
    emailToken,
    confirmEmailToken,
    confirmedEmail,
    selectedFile,
    dispatch
  ]);

  return (
    <SignUpPresentation
      id={id}
      idEl={idEl}
      pwd={pwd}
      pwdEl={pwdEl}
      confirmPwd={confirmPwd}
      confirmPwdEl={confirmPwdEl}
      name={name}
      nameEl={nameEl}
      email={email}
      emailEl={emailEl}
      validateEmail={validateEmail}
      emailToken={emailToken}
      tokenEl={tokenEl}
      confirmEmailToken={confirmEmailToken}
      thumbnail={thumbnail}
      thumbnailEl={thumbnailEl}
      isDbCheckLoading={isDbCheckLoading}
      isCheckEmailLoading={isCheckEmailLoading}
      isSignUpLoading={isSignUpLoading}
      onChangeId={onChangeId}
      onChangePwd={onChangePwd}
      onChangeConfirmPwd={onChangeConfirmPwd}
      onChangeName={onChangeName}
      onChangeEmail={onChangeEmail}
      onChangeConfirmEmailToken={onChangeConfirmEmailToken}
      onChangeThumbnail={onChangeThumbnail}
      onClickThumbnail={onClickThumbnail}
      onDoubleCheck={onDoubleCheck}
      onCheckEmail={onCheckEmail}
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  );
};

export default SignUpContainer;
