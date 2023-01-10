import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  @keyframes ldio-digmt7cfm5i {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .ldio-digmt7cfm5i div {
    box-sizing: border-box !important;
  }
  .ldio-digmt7cfm5i > div {
    position: absolute;
    width: 56px;
    height: 56px;
    top: 22px;
    left: 22px;
    border-radius: 50%;
    border: 2px solid #000;
    border-color: #93dbe9 transparent #93dbe9 transparent;
    animation: ldio-digmt7cfm5i 1s linear infinite;
  }

  .ldio-digmt7cfm5i > div:nth-child(2),
  .ldio-digmt7cfm5i > div:nth-child(4) {
    width: 50px;
    height: 50px;
    top: 25px;
    left: 25px;
    animation: ldio-digmt7cfm5i 1s linear infinite reverse;
  }
  .ldio-digmt7cfm5i > div:nth-child(2) {
    border-color: transparent #689cc5 transparent #689cc5;
  }
  .ldio-digmt7cfm5i > div:nth-child(3) {
    border-color: transparent;
  }
  .ldio-digmt7cfm5i > div:nth-child(3) div {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
  }
  .ldio-digmt7cfm5i > div:nth-child(3) div:before,
  .ldio-digmt7cfm5i > div:nth-child(3) div:after {
    content: '';
    display: block;
    position: absolute;
    width: 2px;
    height: 2px;
    top: -2px;
    left: 25px;
    background: #93dbe9;
    border-radius: 50%;
    box-shadow: 0 54px 0 0 #93dbe9;
  }
  .ldio-digmt7cfm5i > div:nth-child(3) div:after {
    left: -2px;
    top: 25px;
    box-shadow: 54px 0 0 0 #93dbe9;
  }

  .ldio-digmt7cfm5i > div:nth-child(4) {
    border-color: transparent;
  }
  .ldio-digmt7cfm5i > div:nth-child(4) div {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
  }
  .ldio-digmt7cfm5i > div:nth-child(4) div:before,
  .ldio-digmt7cfm5i > div:nth-child(4) div:after {
    content: '';
    display: block;
    position: absolute;
    width: 2px;
    height: 2px;
    top: -2px;
    left: 22px;
    background: #689cc5;
    border-radius: 50%;
    box-shadow: 0 48px 0 0 #689cc5;
  }
  .ldio-digmt7cfm5i > div:nth-child(4) div:after {
    left: -2px;
    top: 22px;
    box-shadow: 48px 0 0 0 #689cc5;
  }
  .loadingio-spinner-double-ring-1s3ls2q5r59 {
    width: 83px;
    height: 83px;
    display: inline-block;
    overflow: hidden;
    background: none;
  }
  .ldio-digmt7cfm5i {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(0.83);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
  }
  .ldio-digmt7cfm5i div {
    box-sizing: content-box;
  }
`
export default function Loading() {
  return (
    <Container className='loadingio-spinner-double-ring-1s3ls2q5r59'>
      <div className='ldio-digmt7cfm5i'>
        <div></div>
        <div></div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </Container>
  )
}
