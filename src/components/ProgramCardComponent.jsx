import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  CardWrap,
  CardHeader,
  CardThumbnail,
  CardBody,
  CardFooter,
  EllipsisText
} from "./PublishStyledComponent";
import { SHOW_UPDATEPROGRAMMODAL } from "../reducers/common";
import { ACTIVE_PROGRAMITEM } from "../reducers/program";

const ProgramCardComponent = props => {
  const {
    title,
    description,
    createdAt,
    Images,
    Channel,
    Contents,
    Genre,
    DetailGenre
  } = props;

  const dispatch = useDispatch();

  // 프로그램 선택
  const onClickItem = useCallback(
    program => {
      dispatch({
        type: ACTIVE_PROGRAMITEM,
        payload: program
      });
      dispatch({
        type: SHOW_UPDATEPROGRAMMODAL
      });
    },
    [dispatch]
  );

  return (
    <CardWrap>
      <CardHeader>
        <div>
          {Channel.Images.length > 0 && (
            <img
              width={30}
              height={20}
              src={`${process.env.REACT_APP_BACKEND_HOST}/logos/${Channel.Images[0].src}`}
              alt={"logo"}
            />
          )}
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
          {Genre.genreName}, {DetailGenre.genreName}
        </div>
        <div>{Contents.length === 0 ? "방송예정" : `${Contents.length}화`}</div>
      </CardFooter>
    </CardWrap>
  );
};

export default ProgramCardComponent;
