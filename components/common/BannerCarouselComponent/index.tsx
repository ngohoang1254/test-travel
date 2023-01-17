import {
  ArrowLeftRoundComponent,
  ArrowRightRoundComponent,
} from "@/components/stuff/ArrowComponent";
import { SlideImage } from "@/models/Destination";
import { Row } from "antd";
import React, { memo, useRef } from "react";
import styled from "styled-components";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import useMobileDetect from "@/hooks/useMobileDetect";
import Image from "next/image";

type Props = {
  description?: string;
  slide_image?: SlideImage[];
};

const BannerCarouselComponent = ({ description, slide_image }: Props) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const isMobile = useMobileDetect();
  if (slide_image?.length === 0 || !slide_image) {
    return null;
  }
  return (
    <Styled_BannerCarouselComponent_Wrapper>
      <Swiper
        slidesPerView={isMobile ? 1 : "auto"}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          type: "bullets",
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="banner-carousel--swiper"
        onInit={(swiper: any) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.destroy();
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {(slide_image || []).map((item: SlideImage, index: number) => {
          return (
            <SwiperSlide key={index}>
              {item?.image?.url && (
                <div className="banner-carousel--img">
                  <Image
                    objectFit="cover"
                    src={item?.image?.url}
                    alt="banner-carousel"
                    layout="fill"
                  />
                </div>
              )}
            </SwiperSlide>
          );
        })}
        <Row
          justify="space-between"
          align="middle"
          className="banner-carousel--arrow"
        >
          <ArrowLeftRoundComponent
            ref={prevRef}
            className="transparent"
            style={{
              marginRight: 20,
            }}
          />
          <ArrowRightRoundComponent ref={nextRef} className="transparent" />
        </Row>
        <div className="swiper-pagination"></div>
        <div className="banner-carousel--description">{description}</div>
      </Swiper>
    </Styled_BannerCarouselComponent_Wrapper>
  );
};

export default memo(BannerCarouselComponent);

const Styled_BannerCarouselComponent_Wrapper = styled.div`
  padding: 60px 0px 0px 60px;
  .banner-carousel--img {
    height: 700px;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }
  .banner-carousel--arrow {
    position: absolute;
    top: 40%;
    z-index: 2323;
    width: 100%;
    padding: 0px 20px;
    padding-right: 60px;
  }
  .banner-carousel--description {
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    padding: 0px 220px;
    margin-top: 40px;
    margin-bottom: 40px;
    color: #565656;
    @media screen and (max-width: 768px) {
      padding: 0px;
      margin-top: 0;
      margin-bottom: 0;
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
  .swiper-slide {
    width: 1300px !important;
  }
  @media screen and (max-width: 1023px) {
    padding: 20px 20px 20px 20px;
    .swiper-slide {
      width: 100% !important;
    }
    .banner-carousel--img {
      height: 232px;
      img {
        border-radius: 8px;
      }
    }
    .banner-carousel--arrow {
      display: none;
    }
    /* .swiper-slide {
      width: 85%;
    } */
    /* .swiper-pagination {
      display: none;
    } */
    .banner-carousel--description {
      text-align: left;
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
