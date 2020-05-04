import styled from "styled-components";

export const CardWrap = styled.div`
  width: ${props =>
    (window.screen.width - props.theme.asideMenuWidth) / 2 -
    props.theme.betweenCardMargin -
    20}px;
  height: 200px;
  overflow: hidden;
  position: relative;
  border: 1px solid ${props => props.theme.cardBorderColor};
  margin-right: ${props => props.theme.betweenCardMargin}px;
  margin-bottom: ${props => props.theme.betweenCardMargin}px;
  font-size: 12px;
  background: ${props => props.theme.cardBgColor};

  & ~ & {
    margin-right: ${props => props.theme.betweenCardMargin}px;
    margin-bottom: ${props => props.theme.betweenCardMargin}px;
  }

  &:nth-child(2n) {
    margin-right: 0;
  }
`;

export const CardThumbnail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;

  & img {
    border-radius: 50%;
    border: 2px solid lightgray;
  }
`;

export const CardBody = styled.div`
  position: absolute;
  top: 0;
  left: 200px;
  height: 100%;
  padding: 10px;
`;

export const CardFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 200px;
  height: 50px;
  padding: 10px;
  display: flex;
  justfiy-content: space-between;
  align-items: center;
  font-size: 18px;

  & div {
    margin-right: 10px;
  }
`;
