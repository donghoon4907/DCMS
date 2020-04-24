import React from "react";
import {
  CardWrap,
  CardHeader,
  CardThumbnail,
  CardBody,
  CardFooter,
  EllipsisText
} from "./PublishStyledComponent";

const ProgramCardComponent = props => {
  const {
    title,
    description,
    createdAt,
    Images,
    Channel,
    Contents,
    Genre,
    DetailGenre,
    onClickItem
  } = props;
  return (
    <CardWrap>
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
        <EllipsisText onClick={() => onClickItem(props)}>{title}</EllipsisText>
        <EllipsisText onClick={() => onClickItem(props)}>
          {description}
        </EllipsisText>
      </CardBody>
      <CardFooter>
        <div>
          {Genre.name}, {DetailGenre.name}
        </div>
        <div>{Contents.length === 0 ? "방송예정" : `${Contents.length}화`}</div>
      </CardFooter>
    </CardWrap>
  );
};

export default ProgramCardComponent;
