import styled from 'styled-components';

import { moveclouds } from '../utils/animations.js';

// Floating Clouds LOL
const Cloud = styled.div`
  width: 350px;
  height: 120px;
  background-color: #fff;
  background: linear-gradient(top, #fefefe, 100%);
  border-radius: 100px;
  position: absolute;
  margin: 120px auto 20px;
  z-index: 1;
  transition: all 1s ease;
  pointer-events: none;

  &:after,
  &:before {
    content: '';
    position: absolute;
    background: #fff;
    z-index: 3;
  }

  &:after {
    width: 100px;
    height: 100px;
    top: -50px;
    left: 50px;
    border-radius: 100px;
  }

  &:before {
    width: 180px;
    height: 180px;
    top: -90px;
    right: 50px;
    border-radius: 200px;
  }
`;

export const Cloud1a = styled(Cloud)`
  top: 30px;
  left: 100px;
  transform: scale(0.3);
  opacity: 0.6;
  animation: ${moveclouds} 15s linear infinite;
`;

export const Cloud1b = styled(Cloud)`
  top: 0px;
  left: 250px;
  transform: scale(0.3);
  opacity: 0.7;
  animation: ${moveclouds} 15s linear infinite;
`;

export const Cloud2 = styled(Cloud)`
  left: 250px;
  top: 100px;
  transform: scale(0.6);
  opacity: 0.3;
  animation: ${moveclouds} 25s linear infinite;
`;

export const Cloud3 = styled(Cloud)`
  left: 250px;
  bottom: -70px;
  transform: scale(0.6);
  opacity: 0.5;
  animation: ${moveclouds} 25s linear infinite;
`;

export const Cloud4 = styled(Cloud)`
  left: 470px;
  bottom: 50px;
  transform: scale(0.75);
  opacity: 0.45;
  animation: ${moveclouds} 18s linear infinite;
`;

export const Cloud5 = styled(Cloud)`
  left: 200px;
  top: 300px;
  transform: scale(0.5);
  opacity: 0.5;
  animation: ${moveclouds} 20s linear infinite;
`;
