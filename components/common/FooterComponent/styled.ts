import styled from "styled-components";

export const Styled_FooterComponent_Wrapper = styled.footer`
  /* margin-top: 80px; */

  background-color: #293754;
  color: white;
  padding: 60px 150px 32px 150px;
  position: relative;
  a {
    color: white;
  }
  .footer_component {
    &--social {
      position: absolute;
      top: -35px;
      right: 10px;
    }
    &--logo {
      margin-bottom: 45px;
    }
    &--about {
      &-download {
        &--title {
          margin-bottom: 6px;
        }
        &--wrap {
          padding: 7px;
          background-color: black;
          display: inline-block;
          margin-right: 10px;
          border-radius: 5px;
        }
      }
      &-social {
        padding-right: 200px;
        padding-bottom: 70px;
        &--title {
          margin-bottom: 6px;
        }
      }
    }
    &--info {
      margin-top: 24px;
      &-company {
        &--wrapper-1 {
          line-height: 2;
        }
        &--wrapper-2 {
          line-height: 2;
        }
        &--title {
          font-weight: 700;
          font-size: 16px;
          &.company {
            padding: 16px 0px;
          }
        }
        &--text {
          font-weight: 500;
          font-size: 14px;
        }
      }
      &-hotline {
        line-height: 2;
        &--title {
          font-weight: 700;
          font-size: 16px;
        }
        &--text {
          font-weight: 500;
          font-size: 12px;
        }
      }
      &-verified {
        margin-left: 20px;
      }
      .footer_component--info-certificate {
        font-weight: 500;
        font-size: 12px;
        &--first {
          margin-bottom: 20px;
        }
      }
    }
    hr {
      border: 1px solid #516285;
    }
  }
  /* responsive */
  @media screen and (max-width: 1023px) {
    padding: 0px;
    padding: 20px;
    .footer_component--about-social {
      margin-top: 20px;
    }
    .footer_component--info-company--wrapper-1 {
      margin-top: 20px;
    }
    .footer_component--info-company--title {
      font-size: 16px;
      font-weight: 700;
      &.company {
        margin-top: 20px;
      }
    }
    .footer_component--info-company--text {
      font-size: 12px;
      font-weight: 500;
    }
    .footer_component--info-hotline {
      margin-top: 20px;
    }
    .footer_component--info-certificate {
      margin-top: 20px;
    }
    .footer_component--info-verified {
      margin-top: 20px;
      margin-left: 0px;
    }
  }
`;

export const Styled_FooterComponent_CopyRight = styled.footer`
  background: #f93649;
  color: white;
  left: 0;
  right: 0;
  height: 35px;
  display: flex;
  align-items: center;
  padding-left: 150px;
  font-size: 12px;
  font-weight: 400;
  @media screen and (max-width: 1023px) {
    padding-left: 20px;
  }
`;
