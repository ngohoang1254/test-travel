import styled from "styled-components";

export const Styled_DataPackageComponent_WrapperPackage = styled.div`
  width: 1080px;
  height: 520px;
  background: #ffffff;
  border-radius: 26px;
  margin: auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  margin-top: 107px;
  line-height: 24px;
  padding-bottom: 0px;
  .active {
    /* package red */
    border-radius: 30px;
    background: url("/images/background-package.png") center;
    transform: scale(1.02) translateY(-70px);
    h1 {
      color: white;
    }
    h3 {
      color: white;
    }
    .data-package_price {
      color: white;
      &--title {
        color: white;
      }
    }
    .data-package_description {
      color: white;
      font-size: 16px;
      font-weight: 400;
    }
    .data-package_column--wrapper {
      /* position: absolute; */
      bottom: 20px;
      width: 100%;
      padding: 0 20px;
      line-height: 120%;
    }
    &.data-package_column {
      /* height: 470px; */
      padding: 80px 0px 0px 0px;
    }
    .data-package_price--wrapper {
      margin-top: 46px;
      margin-bottom: 91px;
    }
    .data-package_button {
      bottom: 40px;
      cursor: pointer;
      button {
        cursor: pointer;
        color: black;
        padding: 20px 0px;
      }
    }
    /* end package red */
  }
  /* package normal */
  h1 {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 0px;
  }
  h3 {
    font-weight: 700;
    font-size: 24px;
  }
  .data-package_description {
    font-weight: 400;
    font-size: 16px;
    color: #898989;
    display: flex;
    padding-top: 20px;
    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
  .data-package_price {
    font-weight: 700;
    font-size: 24px;
    &--title {
      font-weight: 400;
      font-size: 16px;
      color: #898989;
    }
  }
  .data-package_button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ef4444;
    position: absolute;
    width: 90%;
    bottom: 100px;
    cursor: pointer;
    button {
      cursor: pointer;
      padding: 12px 0px;
      border-radius: 30px;
      border: 2px solid #ef4444;
      background-color: white;
      font-size: 18px;
      width: 100%;
    }
  }
  .data-package_price--wrapper {
    margin: 21px 0px;
  }
  .data-package--most-popular {
    font-weight: 500;
    color: white;
    background: #2F2F2F;
    text-align: center;
    border-radius: 30px;
    position: absolute;
    top: 20px;
    right: 15px;
    padding: 7px 20px;
    font-size: 12px;
  }
  .data-package_column {
    padding: 30px 20px 0px 20px;
  }
  /* end package normal */
`;

export const Styled_DataPackageComponent_Info_Package = styled.div`
  margin: 0px 20px 0px 20px;
  .data-package_info-title {
    font-size: 64px;
    font-weight: 700;
    text-align: center;
  }
  .data-package_info-sub-title {
    font-size: 20px;
    font-weight: 400;
    text-align: center;
  }
  @media screen and (max-width: 1023px) {
    .data-package_info-title {
      font-style: normal;
      font-weight: 700;
      font-size: 32px;
      margin-bottom: 10px;
    }
    .data-package_info-sub-title {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
    }
  }
`;

export const Styled_DataPackageComponent_WrapperMobile = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  height: 570px;
  .active {
    /* package red */
    border-radius: 30px;
    background: url("/images/background-package.png");
    background-position: center center;
    background-size: 550px;
    h1 {
      color: white;
      margin-top: 50px;
    }
    h3 {
      color: white;
    }
    .data-package_price {
      color: white;
      &--title {
        color: white;
      }
    }
    .data-package_description {
      color: white;
      font-size: 16px;
      font-weight: 400;
    }
    .data-package_column--wrapper {
      /* position: absolute; */
      bottom: 20px;
      width: 100%;
      padding: 0 20px;
    }
    &.data-package_column {
    }
    .data-package_price--wrapper {
    }
    .data-package_button {
      color: black;
      margin-bottom: 10px;
      cursor: pointer;
    }
    /* end package red */
  }
  /* package normal */
  h1 {
    font-size: 40px;
    font-weight: 700;
  }
  h3 {
    font-weight: 700;
    font-size: 24px;
  }
  .data-package_description {
    font-weight: 400;
    font-size: 16px;
    color: #898989;
    display: flex;
    padding-top: 20px;
    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
  .data-package_price {
    font-weight: 700;
    font-size: 24px;
    &--title {
      font-weight: 400;
      font-size: 16px;
      color: #898989;
    }
  }
  .data-package_button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ef4444;
    cursor: pointer;

    button {
      padding: 12px 0px;
      border-radius: 30px;
      border: 2px solid #ef4444;
      background-color: white;
      font-size: 18px;
      width: 100%;
    }
  }
  .data-package_price--wrapper {
    margin: 21px 0px;
  }
  .data-package--most-popular {
    font-weight: 500;
    color: white;
    background: #2F2F2F;
    text-align: center;
    border-radius: 30px;
    position: absolute;
    top: 20px;
    right: 15px;
    padding: 7px 20px;
    font-size: 12px;
  }
  .data-package_column {
    height: 95%;
    border-radius: 20px;

    &.normal {
      background: white;
      border-radius: 20px;
      padding: 20px;
      margin-right: 40px;

      .data-package_button {
        position: absolute;
        width: 90%;
        bottom: 20px;
        cursor: pointer;
      }
    }
  }
  .swiper{
    position: relative;
  }
  .swiper-slide {
    /* &-prev{
      transform: none;
    }
    &-next{
      transform: none;
    } */
    .normal {
      background-color: white;
      padding: 20px;
      border-radius: 30px;
    }
  }
  .swiper-pagination {
    position: absolute;
    width: auto;
    bottom: 0px !important;
    text-align: center;
    width: 100%;
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
  .swiper-slide-shadow-left {
    border-radius: 20px;
  }
  .swiper-slide-shadow-right {
    border-radius: 20px;
  }
  /* end package normal */
`;
