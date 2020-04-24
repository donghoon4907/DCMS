import styled from "styled-components";
import { steam } from "../theme/animation";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: radial-gradient(
    ellipse farthest-corner at center top,
    #9ab1c7 0%,
    #1a242f 100%
  );
`;

export const Wrap = styled.div`
  width: 500px;
  height: auto;
  border: 1px solid lightgray;
  border-radius: 5%;
  padding: 20px;
  box-sizing: border-box;
  background: #f8f9fa;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
  overflow: hidden;
`;

export const HelpBar = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & span {
    cursor: pointer;
  }
`;

export const LoadingWrap = styled.div`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;

  &:before,
  &:after {
    display: ${props => (props.loading === 1 ? "block" : "none")};
    content: "";
    position: absolute;
    border-radius: 5px;
    left: 0;
    top: 0;
    background: linear-gradient(90deg, white, #3a7fff);
    background-size: 400%;
    width: 100%;
    height: 100%;
    z-index: 0;
    animation: ${steam()} 3s linear infinite;
  }
`;

export const ThumbnailWrap = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: ${props => props.height}px;
  border: ${props => props.theme.borderColor};
  cursor: pointer;
  border-radius: 5px;
`;
