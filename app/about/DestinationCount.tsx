import { Col, Row } from "antd";
import React, { memo, useRef } from "react";
import styled from "styled-components";
import useMobileDetect from "@/hooks/useMobileDetect";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

const DestinationCount = () => {
  const isMobile = useMobileDetect();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <Styled_DestinationCount_Wrapper>
      {!isMobile ? (
        <Row>
          <Col xs={24} xl={8} className="destination-count-img-1">
            <Row align="bottom" className="destination-count-wrap">
              <Col span={24} className="destination-count-title">
                3567K+
              </Col>
              <Col span={24} className="destination-count-des">
                Lorem ipsum dolor sit amet, consectetur adipiscing
                elit...............
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={8} className="destination-count-img-2">
            <Row align="bottom" className="destination-count-wrap">
              <Col span={24} className="destination-count-title">
                3,125
              </Col>
              <Col span={24} className="destination-count-des">
                Lorem ipsum dolor sit amet, consectetur adipiscing
                elit...............
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={8} className="destination-count-img-3">
            <Row align="bottom" className="destination-count-wrap">
              <Col span={24} className="destination-count-title">
                $0.34
              </Col>
              <Col span={24} className="destination-count-des">
                Lorem ipsum dolor sit amet, consectetur adipiscing
                elit...............
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <div>
          <Swiper
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
              type: "bullets",
            }}
            modules={[Pagination, Navigation]}
            onInit={(swiper: any) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            <SwiperSlide>
              <div className="destination-count-img-1">
                <Row align="bottom" className="destination-count-wrap">
                  <Col span={24} className="destination-count-title">
                    $0.34
                  </Col>
                  <Col span={24} className="destination-count-des">
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit...............
                  </Col>
                </Row>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="destination-count-img-2">
                <Row align="bottom" className="destination-count-wrap">
                  <Col span={24} className="destination-count-title">
                    $0.34
                  </Col>
                  <Col span={24} className="destination-count-des">
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit...............
                  </Col>
                </Row>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="destination-count-img-3">
                <Row align="bottom" className="destination-count-wrap">
                  <Col span={24} className="destination-count-title">
                    $0.34
                  </Col>
                  <Col span={24} className="destination-count-des">
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit...............
                  </Col>
                </Row>
              </div>
            </SwiperSlide>

            <Row
              justify="center"
              align="middle"
              className="outstanding-destination-wrapper-directional"
            >
              <div className="swiper-pagination"></div>
            </Row>
          </Swiper>
        </div>
      )}
    </Styled_DestinationCount_Wrapper>
  );
};

export default memo(DestinationCount);

const Styled_DestinationCount_Wrapper = styled.div`
  .destination-count-img-1 {
    background: url("/images/about-page/left.png") no-repeat;
    background-size: cover;
    height: 524px;
    width: 100%;
  }
  .destination-count-img-2 {
    background: url("/images/about-page/middle.png") no-repeat;
    background-size: cover;
    height: 524px;
    width: 100%;
  }
  .destination-count-img-3 {
    background: url("/images/about-page/right.png") no-repeat;
    background-size: cover;
    height: 524px;
    width: 100%;
  }
  .destination-count-wrap {
    height: 100%;
    padding-bottom: 40px;
    padding-left: 40px;
    align-content: flex-end;
  }
  .destination-count-title {
    font-weight: 800;
    font-size: 32px;
    color: #ffffff;
  }
  .destination-count-des {
    font-weight: 400;
    font-size: 20px;
    line-height: 178%;
    color: #ffffff;
  }
  @media screen and (max-width: 1023px) {
    background: white;
    .swiper-pagination {
      position: relative;
      width: auto;
      margin-top: 20px;
      margin-bottom: 20px;
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
