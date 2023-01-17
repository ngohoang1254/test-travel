import { IOutStanding } from "@/models/Outstanding";
import { useAppSelector } from "@/redux-store/stores";
import { Row } from "antd";
import { useRouter } from "next/router";
import React, { useCallback, useRef, memo } from "react";
import styled from "styled-components";
import { Navigation, Pagination, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import useMobileDetect from "@/hooks/useMobileDetect";
import Image from "next/image";
type Props = {};

function OutstandingDestinationComponent({}: Props) {
  const isMobile = useMobileDetect();
  const { push } = useRouter();
  const { dataOutstanding } = useAppSelector((state) => state.destination);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
console.log(dataOutstanding)
  const handleRedirectPopup = useCallback(
    (item: IOutStanding) => {
      return () => {
        push(
          {
            pathname: `/khamphavietnam/${item?.slug}`,
          },
          undefined,
          { scroll: true }
        );
      };
    },
    [dataOutstanding]
  );

  return (
    <Styled_OutstandingDestinationComponent_Container>
      <div className="outstanding-destination-title">Điểm đến nổi bật</div>
      <div className="outstanding-destination-sub">
        Còn rất nhiều điểm đến du lịch hấp dẫn đang chờ bạn khám phá
      </div>
      <Swiper
        effect={"coverflow"}
        initialSlide={2}
        // loop={true}
        spaceBetween={isMobile ? 30 : 0}
        centeredSlides={true}
        slidesPerView={isMobile ? "auto" : 4}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 350,
          modifier: 1,
          // slideShadows: true,
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          type: "bullets",
        }}
        modules={[Pagination, Navigation, EffectCoverflow]}
        onInit={(swiper: any) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.destroy();
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {(dataOutstanding || []).map((item: IOutStanding, index) => {
          return (
            <SwiperSlide
              key={index}
              onClick={handleRedirectPopup(item)}
              className="outstanding-destination--swiperslide"
            >
              {item?.featured_image?.url && (
                <div className="outstanding-destination-wrapper-img">
                  <Image
                    alt="url"
                    layout="fill"
                    src={item?.featured_image?.url}
                  />
                </div>
              )}
              {isMobile && (
                <div className="outstanding-destination-wrapper-title--mobile">
                  {item?.name}
                </div>
              )}
              {!isMobile && (
                <>
                  <div className="outstanding-destination-wrapper-title">
                    {item?.name}
                  </div>
                  <div className="outstanding-destination-wrapper-title-overclay"></div>
                </>
              )}
            </SwiperSlide>
          );
        })}

        <Row
          justify="center"
          align="middle"
          className="outstanding-destination-wrapper-directional"
        >
          <div className="swiper-pagination"></div>
        </Row>
      </Swiper>
    </Styled_OutstandingDestinationComponent_Container>
  );
}

export default memo(OutstandingDestinationComponent);

export const Styled_OutstandingDestinationComponent_Container = styled.div`
  padding: 60px;
  background-color: #f6f6f6;
  .outstanding-destination-title {
    font-size: 64px;
    font-weight: 700;
    text-align: center;
  }
  .outstanding-destination-sub {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 60px;
  }

  .outstanding-destination-wrapper-img {
    height: 530px;
    width: 100%;
    img {
      border-radius: 1000px;
      object-fit: cover;
    }
  }

  .outstanding-destination--swiperslide {
    position: relative;
  }
  .outstanding-destination-wrapper-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: 600;
    display: none;
    color: white;
    z-index: 5;
  }
  .outstanding-destination-wrapper-title--mobile {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-top: 20px;
  }
  .swiper-container {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .swiper-slide {
    cursor: pointer;
    background-position: center;
    background-size: cover;
    border-radius: 1000px;
    &:hover {
      .outstanding-destination-wrapper-title {
        display: block;
      }
      .outstanding-destination-wrapper-title-overclay {
        display: block;
      }
    }
  }
  .outstanding-destination-wrapper-title-overclay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: 1000px;
    background: black;
    opacity: 0.5;
    display: none;
  }
  .swiper-slide-shadow-left {
    border-radius: 1000px;
    background-image: linear-gradient(
      to left,
      rgb(27 27 27 / 50%),
      rgb(255 255 255 / 46%)
    );
  }
  .swiper-slide-shadow-right {
    border-radius: 1000px;
    background-image: linear-gradient(
      to right,
      rgb(28 28 28 / 50%),
      rgb(255 255 255 / 25%)
    );
  }
  .swiper-pagination {
    position: relative;
    width: auto;
    margin-top: 60px;
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
  @media screen and (max-width: 1023px) {
    padding: 0px;
    margin-top: 20px;
    .outstanding-destination-wrapper-img {
      height: 414px;
      width: 100%;
    }
    .swiper-slide {
      width: 80%;
    }
    .outstanding-destination-title {
      font-size: 32px;
      font-weight: 600;
      text-align: center;
    }
    .outstanding-destination-sub {
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      margin-bottom: 20px;
    }
    .swiper-pagination {
      position: relative;
      width: auto;
      margin-top: 30px;
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
      display: none;
    }
    .swiper-slide-shadow-right {
      display: none;
    }
  }
`;
