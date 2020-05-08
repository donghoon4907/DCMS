import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import {
  CardWrap,
  CardThumbnail,
  CardBody,
  CardFooter
} from "./SettingStyledComponent";
import {
  ADD_FOLLOWING_REQUEST,
  REMOVE_FOLLOWING_REQUEST
} from "../reducers/user";

const UserCardComponent = (props) => {
  const dispatch = useDispatch();
  const { id, Images, userId, email, Posts, Followers, Followings } = props;

  const { userInfo } = useSelector((state) => state.user);

  const [isFollowing, setIsFollowing] = useState(
    userInfo.Followings.some((v) => v.id == id)
  );
  const [followerCount, setFollowerCount] = useState(Followers.length);

  const onClickFollowingBtn = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: REMOVE_FOLLOWING_REQUEST,
        payload: { id }
      });
      setIsFollowing(false);
      setFollowerCount(followerCount - 1);
    } else {
      dispatch({
        type: ADD_FOLLOWING_REQUEST,
        payload: { id }
      });
      setIsFollowing(true);
      setFollowerCount(followerCount + 1);
    }
  }, [isFollowing, dispatch]);

  return (
    <CardWrap key={`userCard${id}`}>
      <CardThumbnail>
        <img
          src={`${process.env.REACT_APP_BACKEND_HOST}/images/${
            Images.length > 0
              ? Images[0].src
              : process.env.REACT_APP_DEFAULT_THUMBNAIL
          }`}
          width={"100%"}
          height={"100%"}
          alt={"thumbnail"}
        />
      </CardThumbnail>
      <CardBody>
        <h3>ID: {userId.toUpperCase()}</h3>
        <h5>{email}</h5>
        <div>
          {userInfo.id !== id && (
            <Button onClick={onClickFollowingBtn}>
              {isFollowing ? "언팔로우" : "팔로우"}
            </Button>
          )}
        </div>
      </CardBody>
      <CardFooter>
        <div>포스트 수 : {Posts.length}</div>
        <div>팔로워 수 : {followerCount}</div>
        <div>팔로잉 수 : {Followings.length}</div>
      </CardFooter>
    </CardWrap>
  );
};

export default UserCardComponent;
