import styled from "styled-components";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";

export const StyledDatePicker = styled(DatePicker)`
  width: 130px;
`;

export const StyledButton = styled(Button)`
  background: #3ea9f1;
`;

export const SubMenu = styled.div`
  position: fixed;
  display: flex;
  top: 50px;
  left: ${props => props.theme.asideMenuWidth}px;
  width: ${props => window.screen.width - props.theme.asideMenuWidth}px;
  height: 50px;
  border-bottom: 1px solid #20242b;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
`;
export const SubMenuItem = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  background-color: ${props => props.active === 1 && props.theme.menuFontColor};
  cursor: pointer;
`;
export const Article = styled.div`
  position: fixed;
  padding: 10px;
  box-sizing: border-box;
  top: 100px;
  left: ${props => props.theme.asideMenuWidth}px;
  width: ${props => window.screen.width - props.theme.asideMenuWidth}px;
  height: calc(100vh - 100px);
`;
export const WorkWrap = styled.div`
  display: ${props => props.active !== 1 && "none"};
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;
export const SearchBar = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${props => props.theme.cardBorderColor};
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

export const Field = styled.div`
  flex: ${props => props.flex};
  display: flex;
  justify-content: start;
  padding-left: 10px;
  padding-right: 10px;

  & select {
    margin-left: 10px;
  }
  & select:first-of-type {
    margin-left: 0;
  }
`;

export const ListWrap = styled.div`
  width: 100%;
  height: calc(100vh - 220px);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  overflow-y: auto;
`;

export const CardWrap = styled.div`
  width: ${props =>
    (window.screen.width - props.theme.asideMenuWidth) / 5 -
    props.theme.betweenCardMargin -
    10}px;
  height: 240px;
  overflow: hidden;
  position: relative;
  border: 1px solid ${props => props.theme.cardBorderColor};
  margin-right: ${props => props.theme.betweenCardMargin}px;
  margin-bottom: ${props => props.theme.betweenCardMargin}px;
  font-size: 12px;
  background: #2a3241;

  & ~ & {
    margin-right: ${props => props.theme.betweenCardMargin}px;
    margin-bottom: ${props => props.theme.betweenCardMargin}px;
  }

  &:nth-child(5n) {
    margin-right: 0;
  }
`;

const CardItem = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 0;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.cardBorderColor};
  overflow: hidden;
`;

export const CardHeader = styled(CardItem)`
  justify-content: space-between;
  top: 0;
  height: 30px;
  padding-right: 5px;
  padding-left: 5px;
`;
export const CardThumbnail = styled(CardItem)`
  top: 30px;
  height: 120px;
`;
export const CardBody = styled(CardItem)`
  top: 150px;
  height: 60px;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;
export const CardFooter = styled(CardItem)`
  top: 210px;
  height: 30px;
  padding-right: 5px;
  padding-left: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const EllipsisText = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 30px;
  cursor: pointer;
`;
