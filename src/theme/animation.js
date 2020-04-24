import { keyframes } from "styled-components";

export const rotate = ({ from, to }) => keyframes`
  from {
    transform: rotate(${from}deg);
  }
  to {
    transform: rotate(${to}deg);
  }
`;

export const steam = () => keyframes`
  0% {
    background-position: 400% 0;
  }
  25% {
    background-position: 300% 0;
  }
  50% {
    background-position: 200% 0;
  }
  75% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;

  }
`;
