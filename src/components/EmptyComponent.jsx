import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 30px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

export default ({ comment }) => <Container>{comment}</Container>;
