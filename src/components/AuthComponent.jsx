import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginContainer from "./LoginContainer";
import SignUpContainer from "./SignUpContainer";
import DashboardContainer from "./DashboardContainer";
import LoadingComponent from "./LoadingComponent";
import { LOAD_USER_REQUEST } from "../reducers/user";

const AuthComponent = () => {
  const dispatch = useDispatch();
  const { isShowLoginUi, isShowSignUpUi } = useSelector(state => state.common);
  const { userInfo } = useSelector(state => state.user);
  useEffect(() => {
    setTimeout(() => {
      // 로그인한 사용자의 세션 정보를 가져옴.
      dispatch({
        type: LOAD_USER_REQUEST
      });
    }, 1000);
  }, [dispatch]);
  return isShowLoginUi ? (
    <LoginContainer />
  ) : userInfo ? (
    <DashboardContainer />
  ) : isShowSignUpUi ? (
    <SignUpContainer />
  ) : (
    <LoadingComponent />
  );
};

export default AuthComponent;
