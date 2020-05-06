import React from "react";
import PropTypes from "prop-types";
import { Button, OverlayTrigger, Popover, Badge } from "react-bootstrap";
import {
  Container,
  AsideMenu,
  ContentMenu,
  IconWrap,
  TopMenu,
  Article
} from "./DashboardStyledComponent";
import { Publish, Home, Setting } from "../assets/icons";
import SetProgramModal from "./SetProgramModalContainer";
import SetContentModal from "./SetContentModalContainer";
import SetPostModal from "./SetPostModalContainer";
import SearchProgramModal from "./SearchProgramModalContainer";
import SearchCastModal from "./SearchCastModalContainer";
import PublishContainer from "./PublishContainer";
import PostCommentModal from "./PostCommentModalContainer";
import SettingContainer from "./SettingContainer";
import UploadYoutubeModal from "./UploadYoutubeModalContainer";
import LineChart from "./LineChart";

const DashboardPresentation = ({
  userInfo,
  activeMenu,
  isShowAddPgmUi,
  isShowUpdatePgmUi,
  isShowAddContentUi,
  isShowUpdateContentUi,
  isShowAddPostUi,
  isShowUpdatePostUi,
  isShowSearchPgmUi,
  isShowSearchCastUi,
  isShowPostCommentUi,
  isShowYoutubeUploadUi,
  onClickMenuIcon,
  onClickAlertItem,
  onLogout
}) => (
  <Container>
    <AsideMenu>
      <IconWrap
        active={activeMenu === 1 && 1}
        onClick={() => onClickMenuIcon(1)}
      >
        <Home style={{ width: 18, height: 18, fill: "white" }} />
      </IconWrap>
      <IconWrap
        active={activeMenu === 2 && 1}
        onClick={() => onClickMenuIcon(2)}
      >
        <Publish style={{ width: 18, height: 18, fill: "white" }} />
      </IconWrap>
      <IconWrap
        active={activeMenu === 3 && 1}
        onClick={() => onClickMenuIcon(3)}
      >
        <Setting style={{ width: 18, height: 18, fill: "white" }} />
      </IconWrap>
      <IconWrap isProfile={1}>
        <img
          src={`${process.env.REACT_APP_BACKEND_HOST}/images/${
            userInfo && userInfo.Images.length > 0
              ? userInfo.Images[0].src
              : process.env.REACT_APP_DEFAULT_THUMBNAIL
          }`}
          width={30}
          height={30}
          style={{
            borderRadius: "50%",
            border: "2px solid gray"
          }}
          alt={"thumbnail"}
        />
      </IconWrap>
    </AsideMenu>
    <ContentMenu>
      <TopMenu>
        <div style={{ paddingLeft: 20 }}>
          {/* <InputGroup>
            <FormControl placeholder="검색어를 입력하세요." />
            <InputGroup.Prepend>
              <InputGroup.Text
                style={{
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5
                }}
              >
                <Search style={{ width: 15, height: 15, cursor: "pointer" }} />
              </InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup> */}
        </div>
        <div
          style={{
            paddingRight: 20
          }}
        >
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover>
                {userInfo && userInfo.SendNews.length > 0 ? (
                  userInfo.SendNews.filter(
                    (v) => v.PostId && v.type === "regdate"
                  ).map((v, idx) => (
                    <Popover.Content
                      key={`alert${idx}`}
                      onClick={() => onClickAlertItem(v.User.id, v.id)}
                      style={{ cursor: "pointer", width: 200 }}
                    >
                      {v.User.userId}님이
                      <br />
                      새로운 포스트를 게시했습니다.
                    </Popover.Content>
                  ))
                ) : (
                  <Popover.Content style={{ width: 200 }}>
                    알림이 없습니다.
                  </Popover.Content>
                )}
              </Popover>
            }
          >
            <Button style={{ width: 80 }} variant="info">
              알림
              <Badge variant="warning" style={{ marginLeft: 5 }}>
                {userInfo &&
                  userInfo.SendNews.filter(
                    (v) => v.PostId && v.type === "regdate"
                  ).length}
              </Badge>
            </Button>
          </OverlayTrigger>

          <Button
            style={{ background: "#3EA9F1", marginLeft: 10 }}
            onClick={onLogout}
          >
            로그아웃
          </Button>
        </div>
      </TopMenu>
      {activeMenu === 1 && (
        <Article>
          <LineChart />
        </Article>
      )}
      {activeMenu === 2 && <PublishContainer />}
      {activeMenu === 3 && <SettingContainer />}
    </ContentMenu>
    {(isShowAddPgmUi || isShowUpdatePgmUi) && <SetProgramModal />}
    {(isShowAddContentUi || isShowUpdateContentUi) && <SetContentModal />}
    {(isShowAddPostUi || isShowUpdatePostUi) && <SetPostModal />}
    {isShowSearchPgmUi && <SearchProgramModal />}
    {isShowSearchPgmUi && <SearchProgramModal />}
    {isShowSearchCastUi && <SearchCastModal />}
    {isShowPostCommentUi && <PostCommentModal />}
    {isShowYoutubeUploadUi && <UploadYoutubeModal />}
  </Container>
);

export default DashboardPresentation;

DashboardPresentation.propTypes = {
  activeMenu: PropTypes.number.isRequired,
  isShowAddPostUi: PropTypes.bool.isRequired,
  isShowAddPgmUi: PropTypes.bool.isRequired,
  isShowUpdatePgmUi: PropTypes.bool.isRequired,
  isShowSearchPgmUi: PropTypes.bool.isRequired,
  isShowSearchCastUi: PropTypes.bool.isRequired,
  isShowPostCommentUi: PropTypes.bool.isRequired,
  isShowYoutubeUploadUi: PropTypes.bool.isRequired,
  onClickMenuIcon: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
};
