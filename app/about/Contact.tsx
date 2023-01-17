import LayoutComponent from "@/components/common/LayoutComponent";
import useMobileDetect from "@/hooks/useMobileDetect";
import TelegramIcon from "@/public/images/social/telegram-red.svg";
import { Col, Row } from "antd";
import Image from "next/image";
import { memo } from "react";
import styled from "styled-components";

type Props = {};

const Contact = ({}: Props) => {
  const isMobile = useMobileDetect();
  return (
    <LayoutComponent backgroundcolor="white">
      <Styled_Contact_Wrapper>
        <div className="contact-title">
          Cùng chúng tôi kể câu chuyện Việt Nam
        </div>
        <Row justify="center" gutter={!isMobile ? [60, 60] : [0, 0]}>
          <Col xs={24} xl={12} className={"contact-col-1"}>
            <Image
              width={524}
              height={540}
              alt="img-mobile"
              src="/images/mobile.png"
              className="img-1 mobile"
            />
          </Col>
          <Col xs={24} xl={12} className={"contact-col-2"}>
            <div className="contact-des">
              Với mỗi chuyến đi là một hành trình kết nối yêu thương, hãy đi du
              lịch với một tâm hồn luôn rộng mở, đi để hiểu hơn văn hóa mỗi vùng
              miền, đi để có thêm thật nhiều bạn mới và đi để biết mình thật bé
              nhỏ giữa thế giới bao la này.
            </div>
            <div className="contact-des">
              Local cũng tin rằng sau mỗi chuyến đi, trái tim khát khao khám phá
              của bạn đã được được lấp đầy bởi vô vàn trải nghiệm đáng giá và
              mong muốn được sẻ chia với mọi người có cùng đam mê. Dù bạn là ai
              hay bạn đến từ đâu, Local luôn luôn muốn lắng nghe những câu
              chuyện du lịch thú vị và đáng nhớ đó từ bạn. Vì thế, cùng với dự
              án Khám phá Việt Nam, Local rất vinh dự khi có sự tham gia đóng
              góp, xây dựng nội dung từ bạn.
            </div>
            <div className="contact-des">Liên hệ với chúng tôi qua:</div>
            <br />
            <div className="contact-info">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="contact-email black">
                  <Image
                    width={30}
                    height={30}
                    layout="intrinsic"
                    src="/images/about-page/email-black.png"
                    alt="email"
                  />
                </span>

                <span className="contact-email red">
                  <Image
                    width={30}
                    height={30}
                    layout="intrinsic"
                    src="/images/about-page/email-red.png"
                    alt="email"
                  />{" "}
                </span>

                <span className="contact-text">content@asimtelecom.vn</span>
              </div>
              <TelegramIcon className="contact-telegram" />
            </div>
            <br />
          </Col>
        </Row>
      </Styled_Contact_Wrapper>
    </LayoutComponent>
  );
};

export default memo(Contact);

const Styled_Contact_Wrapper = styled.div`
  padding: 60px;
  .contact-col-1 {
    display: flex;
    justify-content: center;
  }
  .contact-title {
    font-weight: 700;
    font-size: 64px;
    text-align: center;
    color: #2f2f2f;
    padding-bottom: 20px;
  }
  .img-1 {
    width: 100%;
    height: 100%;
  }
  .contact-des {
    font-weight: 400;
    font-size: 20px;
    line-height: 178%;
    color: #565656 !important;
  }
  .contact-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f6f6f6;
    border-radius: 50px;
    padding: 10px 0px 10px 20px;
    cursor: pointer;
    &:hover {
      .contact-text {
        color: #ef4444;
      }
      .contact-email {
        &.red {
          display: inline-block;
        }
        &.black {
          display: none;
        }
      }
    }
  }
  .contact-email {
    margin-top: 5px;
    margin-right: 10px;
    &.red {
      display: none;
    }
  }
  .contact-telegram {
    padding-right: 10px;
    fill: #FF4B5A;
  }
  .contact-text {
    font-size: 18px;
    font-weight: 600;
  }
  @media screen and (max-width: 1023px) {
    padding: 0 10px;
    .contact-title {
      font-weight: 700;
      font-size: 32px;
      line-height: 130%;
      text-align: center;
      color: #2f2f2f;
      padding-bottom: 0px;
    }
    .contact-des {
      padding-top: 20px;
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
      color: #565656 !important;
    }
    .contact-col-1 {
      order: 2;
    }
    .contact-col-2 {
      order: 1;
    }
    .img-1 {
      &.mobile {
        padding: 20px 0px;
      }
    }
  }
`;
