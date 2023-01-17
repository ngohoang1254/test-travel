import { Row } from "antd";
import styled from "styled-components";

export const Styled_GeneralInformation_Wrapper = styled(Row)`
  padding: 70px;
  line-height: 35px;
  .general-information--common_hover--arrow {
    display: flex;
    align-items: center;
    a {
      color: black;
    }
    .red {
      display: none;
    }
    &:hover {
      .black {
        display: none;
      }
      a {
        color: #ef4444;
      }
      .red {
        display: inline-block;
      }
    }
  }
  .general-information--common_title {
    color: #565656;
    font-weight: 700;
    font-size: 32px;
  }
  .general-information--common_title-1 {
    color: #565656;
    font-weight: 700;
    font-size: 24px;
  }
  .general-information--common_des {
    font-weight: 400;
    font-size: 20px;
    color: #565656;
    display: -webkit-box;
    white-space: pre-wrap;
    // -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .general-information--common_icon {
    img {
      width: 30px;
    }
  }
  .general-information--common_icon-text {
  }
  .general-information--information-menu-img {
    min-height: 300px;
    max-height: 300px;
    border-radius: 15px;
    object-fit: cover;
  }
  .general-information--information--left {
    padding: 0px 40px 0px 0px;
  }
  .general-information--information_wrapper-box-1 {
    align-items: center;
    margin-top: 20px;
  }
  .general-information--information_icon {
    margin-right: 20px;
    img {
      width: 30px;
    }
  }
  .general-information--common_wrapper {
    margin-top: 50px;
  }
  .general-information--menu {
    margin-top: 10px;
  }
  /* right */
  .general-information--ticket {
    background-color: white;
    padding: 20px;
    box-shadow: 0px 0px 15px -5px grey;
    border-radius: 15px;
  }

  .general-information--ticket_icon {
    margin-right: 20px;
    a {
      color: black;
    }
  }

  .general-information--map-img {
    width: 100%;
    object-fit: cover;
  }

  /* swiper */
  .general-information--information-carousel--swiper {
    img {
      width: 100%;
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
  .general-information--arrow-carousel {
    img {
      width: auto;
    }
  }
  /* modal */
  .general-information--modal {
    .swiper-pagination-bullet {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      &-active {
        border: 2px solid black;
      }
    }
    .banner-carousel--img {
      height: calc(100vh - 200px);
      object-fit: cover;
    }
    .ant-modal {
      text-align: center;
      width: auto !important;
    }
    .ant-modal-content {
      background: transparent;
      box-shadow: none;
    }
  }
  @media screen and (max-width: 1023px) {
    padding: 10px;
    line-height: unset;
    .general-information--common_hover--arrow {
      &.map {
        /* display: none; */
      }
    }
    .general-information--information--left {
      padding: 0;
    }
    .general-information--common_icon-text {
      flex: 1;
    }
    .general-information--common_title {
      font-size: 24px;
      font-weight: 600;
    }
    .general-information--common_des {
      font-size: 14px;
      font-weight: 400;
      color: #2f2f2f;
    }
    .general-information--information_icon {
      img {
        height: 20px;
        width: 20px;
      }
    }
    .general-information--common_title-1 {
      font-size: 16px;
      font-weight: 600;
    }
    .general-information--common_des {
      font-size: 14px;
      font-weight: 400;
    }
    .general-wrapper-directional {
      justify-content: center;
      .general-wrapper-arrow {
        display: none;
      }
    }
    .general-information--modal {
      .banner-carousel--img {
        width: 100%;
      }
    }
    .general-information--ticket {
      padding: 0;
      margin-top: 20px;
      box-shadow: 0px 0px 15px -5px grey;
      border-radius: 15px;
      padding: 10px;
      background: transparent;
      box-shadow: none;
    }
    .general-information--common_wrapper {
      margin-top: 20px;
    }
    .swiper-pagination {
      position: relative;
      width: auto;
      margin-top: 20px;
      &-bullet {
        height: 10px;
        width: 10px;
        background: #e3e3e3;
        opacity: 1;
        &-active {
          background: #ff4b5a;
          border-radius: 100px;
          width: 30px;
        }
      }
    }
  }
`;
