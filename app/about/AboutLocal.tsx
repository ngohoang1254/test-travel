import { Col, Row } from "antd";
import Image from "next/image";
import React, { memo } from "react";
import styled from "styled-components";

type Props = {};

function AboutLocal({}: Props) {
  return (
    <Styled_AboutLocal_Wrapper>
      <Row gutter={[50, 50]} align="middle">
        <Col xs={24} xl={13} className="about-local-wrap-1_container-1">
          <div className="about-local-title">Local là gì?</div>
          <div className="about-local-des">
            Được phát triển bởi Công ty cổ phần viễn thông ASIM, Local là sản
            phẩm mạng di dộng ảo mới nhất của Việt Nam tiên phong cung cấp gói
            cước 4G siêu DATA tốc độ cao. Nhờ hoạt động trên nền sóng hạ tầng
            của MobiFone, Local có chất lượng sóng di động khỏe và ổn định, với
            chi phí tiết kiệm cùng nhiều ưu đãi nhất. Đặt tên <b>Local</b>,
            chúng tôi ấp ủ khát khao được cùng bạn khám phá những trải nghiệm{" "}
            <b>địa phương</b> tuyệt vời nhất ở mọi nơi bạn đi qua trên khắp lãnh
            thổ Việt Nam.
            <br />
            <br />
            <div style={{ fontStyle: "italic" }}>
              "Live like a local anywhere!"
            </div>
          </div>
        </Col>
        <Col xs={24} xl={11} className="about-local-wrap-2_container-2">
          <Image
            alt="about-local"
            src="/images/about-page/img-both-1.png"
            className="about-local-img about-local-img-1"
            width={519}
            height={619}
            layout="intrinsic"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24} xl={8} className="about-local-wrap-2_container-1">
          <div className="about-local-title">
            Vì sao Local thực hiện dự án Khám phá Việt Nam?
          </div>
          <div className="about-local-des">
            Với mong muốn đồng hành cùng bạn trên hành trình khám phá Việt Nam 4
            ngàn năm tuổi, Local thực hiện dự án KHÁM PHÁ VIỆT NAM để khắc họa
            một đất nước gần gũi, thân thương và sống động qua những câu chuyện
            giàu bản sắc văn hóa của từng địa phương. Thông qua dự án này, Local
            tin rằng bạn sẽ được khơi dậy nguồn cảm hứng du lịch và từ đó thêm
            yêu mến đất nước, con người Việt Nam.
          </div>
          <div className="about-local-wrap-2_container-img">
            <Image
              src="/images/about-page/img-both-2.png"
              className="about-local-img about-local-img-3"
              width={427}
              height={369}
              layout="intrinsic"
              alt="img3"
            />
          </div>
        </Col>
        <Col xs={24} xl={8} className="about-local-wrap-2_container-2">
          <Image
            alt="img5"
            width={385}
            height={657}
            layout="intrinsic"
            src="/images/about-page/img-5.png"
            className="about-local-img about-local-img-5"
          />
        </Col>
        <Col xs={24} xl={8} className="about-local-wrap-2_container-3">
          <div className="about-local-wrap-2_container-img right">
            <Image
              alt="img6"
              width={428}
              height={420}
              layout="intrinsic"
              src="/images/about-page/img-both-3.png"
              className="about-local-img about-local-img-6"
            />
          </div>
          <div className="about-local-des">
            Đặc biệt, chỉ với một mã QR, Local sẽ kể bạn nghe những câu chuyện
            văn hóa lịch sử đằng sau mỗi danh lam thắng cảnh, cùng bạn đắm chìm
            trong các thiên đường vui chơi giải trí, đồng hành cùng bạn trải
            nghiệm ẩm thực địa phương, gợi ý những địa điểm du lịch đang còn “ẩn
            mình” hay giúp bạn hòa mình vào những sự kiện lễ hội mang đậm dấu ấn
            Việt Nam. Đây sẽ là một cuốn cẩm nang du lịch điện tử để bạn dễ dàng
            tìm kiếm thông tin trên mỗi chuyến du lịch khám phá dải đất hình chữ
            S.
          </div>
        </Col>
      </Row>
    </Styled_AboutLocal_Wrapper>
  );
}

export default memo(AboutLocal);

const Styled_AboutLocal_Wrapper = styled.div`
  padding: 60px;
  padding-top: 100px;
  .about-local-wrap {
    position: relative;
  }
  .about-local-title {
    font-weight: 700;
    font-size: 64px;
    color: #242424;
  }
  .about-local-des {
    font-weight: 400;
    font-size: 20px;
    color: #565656;
  }
  .about-local-wrap-1_container-2 {
    text-align: center;
  }
  /*  */
  .about-local-wrap-2_container-2 {
    align-self: center;
    text-align: center;
  }
  .about-local-wrap-2_container-img {
    padding-top: 50px;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
    }
    &.right {
      padding-bottom: 100px;
    }
  }
  .about-local-img {
    height: 100%;
    width: 100%;
  }
  .about-local-img-5 {
    width: 90%;
  }
  @media screen and (max-width: 1023px) {
    padding: 20px;
    .about-local-title {
      font-weight: 700;
      font-size: 32px;
    }
    .about-local-des {
      font-weight: 400;
      font-size: 14px;
    }
    .about-local-wrap-2_container-img {
      padding-top: 20px;
      &.right {
        padding-bottom: 0px;
      }
    }
    .about-local-img-5 {
      display: none;
    }
    .about-local-wrap-2_container-3 {
      display: flex;
      flex-wrap: wrap;
      .about-local-wrap-2_container-img {
        &.right {
          order: 2;
        }
      }
      :nth-child(2) {
        order: 1;
      }
    }
  }
`;
