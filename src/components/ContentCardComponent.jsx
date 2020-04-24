import React from "react";
import {
  CardWrap,
  CardHeader,
  CardThumbnail,
  CardBody,
  CardFooter,
  EllipsisText
} from "./PublishStyledComponent";
import { Add } from "../assets/icons";

const ContentCardComponent = (props) => {
  const {
    id,
    description,
    createdAt,
    epiNumber,
    Program: { title, Channel, Images },
    onClickItem,
    Posts
  } = props;
  return (
    <CardWrap key={id}>
      <CardHeader>
        <div>
          <img
            width={50}
            height={20}
            src={`${process.env.REACT_APP_BACKEND_HOST}/images/${Channel.Images[0].src}`}
            alt={"logo"}
          />
        </div>
        <div title={createdAt}>{createdAt.substring(0, 10)}</div>
      </CardHeader>
      <CardThumbnail>
        <img
          src={`${process.env.REACT_APP_BACKEND_HOST}/images/${Images[0].src}`}
          width={"100%"}
          height={"100%"}
          alt={"thumbnail"}
        />
      </CardThumbnail>
      <CardBody>
        <EllipsisText onClick={() => onClickItem(props)}>
          {title}-{epiNumber}화
        </EllipsisText>
        <EllipsisText onClick={() => onClickItem(props)}>
          {description}
        </EllipsisText>
      </CardBody>
      <CardFooter>
        <div></div>
        <div className="d-flex justify-content-center align-items-center">
          <span>포스트 : {Posts.length}개 목록</span>
          <Add
            style={{
              width: 15,
              height: 15,
              verticalAlign: "middle",
              marginLeft: 5,
              fill: "white"
            }}
          />
        </div>
      </CardFooter>
    </CardWrap>
  );
};

export default ContentCardComponent;
