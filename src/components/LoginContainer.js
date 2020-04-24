import React, { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginPresentation from "./LoginPresentation";
import { SHOW_SIGNUPLAYER } from "../reducers/common";
import { LOG_IN_REQUEST } from "../reducers/user";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const { isLogInLoading } = useSelector(state => state.user);
  const idEl = useRef(null);
  const pwdEl = useRef(null);
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const onChangeId = useCallback(e => setId(e.target.value), []);

  const onChangePwd = useCallback(e => setPwd(e.target.value), []);

  const onClickSignUpBtn = useCallback(
    () =>
      dispatch({
        type: SHOW_SIGNUPLAYER
      }),
    [dispatch]
  );

  const onSubmit = useCallback(() => {
    if (!id) {
      alert("아이디를 입력하세요.");
      idEl.current.focus();
      return;
    }
    if (!pwd) {
      alert("비밀번호를 입력하세요.");
      pwdEl.current.focus();
      return;
    }
    dispatch({
      type: LOG_IN_REQUEST,
      payload: {
        id,
        pwd
      }
    });
  }, [id, pwd, dispatch]);

  return (
    <LoginPresentation
      id={id}
      idEl={idEl}
      pwd={pwd}
      pwdEl={pwdEl}
      isLogInLoading={isLogInLoading}
      onChangeId={onChangeId}
      onChangePwd={onChangePwd}
      onSubmit={onSubmit}
      onClickSignUpBtn={onClickSignUpBtn}
    />
  );
};

export default LoginContainer;
