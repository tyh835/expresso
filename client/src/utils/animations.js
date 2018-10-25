import { keyframes } from 'styled-components';

export const shake = keyframes`
  20% {
    transform: translateX(2px) rotate(1.5deg);
  }
  40% {
    transform: translateX(-2px) rotate(-1.5deg);
  }
  60% {
    transform: translateX(1.5px) rotate(0.75deg);
  }
  80% {
    transform: translateX(-1.5px) rotate(-0.75deg);
  }
  100% {
    transform: translateX(1px) rotate(0);
  }
`;


export const moveclouds = keyframes`
  0% {
    margin-left: 1000px;
  }
  100% {
    margin-left: -1000px;
  }
`;
