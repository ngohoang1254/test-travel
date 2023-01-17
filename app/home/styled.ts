import styled from "styled-components";
import { Row } from "antd";

export const Styled_MapHomeComponent_Location = styled(Row)<{
  width?: number;
  top: number;
  left: number;
  color: string;
  left_arrow?: string;
}>`
  box-sizing: border-box;
  padding: 8px;
  position: absolute;
  width: ${(props) => (props.width ? props.width + "px" : "auto")};
  height: 52px;
  left: ${(props) => props.left + "px"};
  top: ${(props) => props.top + "px"};
  background: #ffffff;
  border: 1.5px solid #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 2px -1px black;
  &.active {
    background: #ff4b5a;
    z-index: 1;
    border: 0;
    .map_title {
      color: white;
    }
    .map_location {
      visibility: hidden;
      &--wrap {
        width: 30px;
        height: 30px;
      }
    }
    .map_location--overlay {
      display: block;
    }
    :after {
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid white;
      content: " ";
      position: absolute;
      top: 100%;
      left: ${(props) => props.left_arrow};
      border-top: 10px solid #ff4b5a !important;
    }
  }
  &.island {
    background: transparent;
    color: #898989;
    border: 0px;
    box-shadow: none;
    &::after {
      display: none;
    }
  }
  .map_location {
    &--wrap {
      position: relative;
      width: 30px;
      height: 30px;
    }
    &--overlay {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      display: none;
      width: 30px;
      height: 30px;
    }
  }
  &:hover {
    background: #ff4b5a;
    z-index: 20;
    border: 0;
    .map_title {
      color: white;
    }
    .map_location--overlay {
      display: block;
    }
    :after {
      border-top: 10px solid #ff4b5a !important;
    }
  }
  .map_title {
    margin-left: 8px;
    font-size: 20px;
    font-weight: 700;
    color: ${(props) => props.color};
  }
  img {
    width: 30px;
    height: 30px;
  }
  :after {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white;
    content: " ";
    position: absolute;
    top: 100%;
    left: ${(props) => props.left_arrow};
  }
  .map_container-location {
    display: flex;
    font-size: 12px;
    align-items: center;
    font-weight: 500;
  }
  @media screen and (max-width: 1023px) {
    height: auto;
    padding: 4px;
    &.active {
      background: white;
      .map_title {
        color: black;
      }
      .map_location {
        visibility: visible;
      }
      .map_location--overlay {
        visibility: hidden;
      }
      :after {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid white;
        content: " ";
        position: absolute;
        top: 100%;
        left: ${(props) => props.left_arrow};
        border-top: 10px solid white !important;
      }
    }
    .map_location {
      height: 30px;
      width: 30px;
    }
    .map_location--overlay {
      height: 30px;
      width: 30px;
    }
    &:hover {
      background: white;
      .map_title {
        color: black;
      }
      .map_location {
        visibility: visible;
      }
      .map_location--overlay {
        visibility: hidden;
      }
      :after {
        border-top: 10px solid white !important;
      }
    }
  }
`;

export const Styled_MapHomeComponent_Container = styled(Row)`
  height: 979px;
  margin-top: 80px;
  padding-left: 100px;
  .map_left {
    padding-right: 50px;
    &--location {
      font-weight: 700;
      font-size: 20px;
      text-align: center;
      color: #898989;
    }
    &--destination {
      text-align: center;
      font-size: 52px;
      font-weight: 700;
      color: #ef4444;
      cursor: pointer;
    }
    &--pagination {
      margin-top: 40px;
    }
    &--description {
      padding: 40px 0px;
      font-size: 18px;
      font-weight: 400;
      text-align: left;
      color: #565656;
    }
    .map_left--slide {
      margin-top: 50px;
      .swiper-slide {
        width: auto;
        border-radius: 15px;
      }
      &_img {
        width: 500px;
        height: 250px;
        img {
          border-radius: 10px;
          object-fit: cover;
        }
      }
      &_title {
        position: absolute;
        bottom: 0;
        left: 0px;
        font-size: 20px;
        font-weight: 700;
        color: white;
        padding: 20px;
      }
    }
    .swiper-button-next {
      right: 100px;
      &::after {
        content: url("/images/arrow-right-grey.png");
      }
    }
    .swiper-button-prev {
      left: 100px;
      &::after {
        content: url("/images/arrow-left-grey.png");
      }
    }
    .swiper-pagination {
      position: relative;
      width: auto;
      margin-top: 20px;
      &-bullet {
        height: 16px;
        width: 16px;
        background: #e3e3e3;
        opacity: 1;
        &-active {
          background: #ff4b5a;
          border-radius: 100px;
          width: 40px;
        }
      }
    }
  }

  .map_right {
    position: relative;
    background: url("/images/map.png") no-repeat;
    width: 100%;
    height: 100%;
    /* &--img-maps{
      width: 100%;
    } */
  }
  /* @media screen and (max-width: 1023px) {
    padding-left: 0px;
    .map_title {
      font-size: 14px;
    }
  } */
  @media screen and (max-width: 1023px) {
    padding-left: 0px;
    overflow: hidden;
    margin-top: 30px;
    padding-top: 10px;
    height: 575px;
    .map_title {
      font-size: 14px;
    }
    .map_right {
      position: relative;
      background: url("/images/map-mobile.png") no-repeat;
      margin-left: 20px;
      width: 100%;
      height: 100%;
      /* &--img-maps{
      width: 100%;
    } */
    }
  }
`;
