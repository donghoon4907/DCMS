import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Wrap,
  Title,
  HelpBar,
  LoadingWrap
} from "./LoginStyledComponent";
import { Account, Password } from "../assets/icons";

const LoginPresentation = ({
  id,
  idEl,
  pwd,
  pwdEl,
  isLogInLoading,
  onChangeId,
  onChangePwd,
  onSubmit,
  onClickSignUpBtn
}) => (
  <Container>
    <Wrap>
      <Title>➤ 로그인</Title>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <Account style={{ width: 24, height: 24 }} />
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="계정을 입력하세요."
          value={id}
          onChange={onChangeId}
          ref={idEl}
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <Password style={{ width: 24, height: 24 }} />
          </span>
        </div>
        <input
          type="password"
          className="form-control"
          placeholder="암호를 입력하세요."
          value={pwd}
          onChange={onChangePwd}
          ref={pwdEl}
        />
      </div>
      <LoadingWrap width={458} height={38} loading={isLogInLoading ? 1 : 0}>
        <input
          className="btn btn-outline-primary btn-block"
          style={{ position: "relative", zIndex: 1 }}
          loading={"true"}
          type="button"
          value="로그인"
          onClick={onSubmit}
        />
      </LoadingWrap>
      <br />
      <HelpBar>
        <span>계정 찾기</span>
        <span>암호 찾기</span>
        <span onClick={onClickSignUpBtn}>회원 가입</span>
      </HelpBar>
    </Wrap>
  </Container>
);

export default LoginPresentation;

LoginPresentation.propTypes = {
  id: PropTypes.string.isRequired,
  idEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object })
  ]),
  pwd: PropTypes.string.isRequired,
  pwdEl: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object })
  ]),
  isLogInLoading: PropTypes.bool.isRequired,
  onChangeId: PropTypes.func.isRequired,
  onChangePwd: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClickSignUpBtn: PropTypes.func.isRequired
};
