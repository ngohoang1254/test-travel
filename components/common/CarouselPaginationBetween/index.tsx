import {
  ArrowLeftRoundComponent,
  ArrowRightRoundComponent,
} from "@/components/stuff/ArrowComponent";
import { IPosts } from "@/models/Posts";
import { Row } from "antd";
import React, { MouseEventHandler, PropsWithChildren, useRef } from "react";
import styled from "styled-components";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

interface Props<T> {
  title: string;
  listItem: Array<IPosts> | Array<any>;
  width: number;
  handleRedirect?: (item: T) => MouseEventHandler<HTMLElement> | undefined;
  format?: string;
  // itemRender: CategoryInfo;
}

const CarouselPaginationBetween = <T,>({
  title,
  listItem = [],
  width = 420,
  handleRedirect,
  format = "quare",
}: PropsWithChildren<Props<T>>) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <Styled_CarouselPaginationBetween_Container width={width} format={format}>
      <div className="carousel-pagination-title">{title}</div>
      <div>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
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
          {(listItem || []).map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className={"carousel-pagination-another"}
                onClick={handleRedirect && handleRedirect(item)}
              >
                <div className="carousel-pagination-another--wrap">
                  <Image
                    alt="thumbnail"
                    layout="fill"
                    src={item?.thumbnail?.url}
                  />
                  <div className="carousel-pagination-another-ovelay"></div>
                  <div className={"carousel-pagination-another--title"}>
                    {item?.title}
                  </div>
                  {/* <div className="carousel-pagination-another--des"> */}
                  {/* {item?.sapo} */}
                  {/* </div> */}
                </div>
              </SwiperSlide>
            );
          })}

          <Row
            justify="end"
            align="middle"
            className="carousel-pagination-wrapper-directional"
          >
            <div className="swiper-pagination"></div>
            <div className="carousel-pagination-wrapper-arrow">
              <Row>
                <ArrowLeftRoundComponent
                  ref={prevRef}
                  style={{
                    marginRight: 20,
                    border: "1px solid #27272796",
                  }}
                />
                <ArrowRightRoundComponent
                  ref={nextRef}
                  style={{
                    border: "1px solid #27272796",
                  }}
                />
              </Row>
            </div>
          </Row>
        </Swiper>
      </div>
    </Styled_CarouselPaginationBetween_Container>
  );
};
export default CarouselPaginationBetween;

export const Styled_CarouselPaginationBetween_Container = styled.div<{
  width: number;
  format?: string;
}>`
  padding: 60px 0px 0px 60px;
  .carousel-pagination-title {
    font-size: 32px;
    font-weight: 700;
  }
  .carousel-pagination-sub {
    font-size: 20px;
    font-style: italic;
    font-weight: 500;
    color: #898989;
  }
  .carousel-pagination-wrapper-arrow {
    margin-right: 40px;
  }
  .carousel-pagination-wrapper-directional {
    justify-content: space-between;
    margin-top: 30px;
  }
  .carousel-pagination-first {
    &--img {
      width: 100% !important;
      height: 424px !important;
    }
  }
  .carousel-pagination-first--wrap {
    bottom: 0;
    padding: 0px 20px 20px 20px;

    width: 642px !important;
  }
  .carousel-pagination-first--title {
    font-weight: 700;
    font-size: 40px;
    color: #ef4444;
  }
  .carousel-pagination-first--des {
    font-size: 20px;
    font-weight: 400;
    color: #565656;
  }
  .carousel-pagination-another {
    width: ${(props) => props.width + "px"};
    img {
      width: 100%;
      height: 353px;
      object-fit: cover;
    }
  }
  .carousel-pagination-another--wrap {
    margin-top: 40px;
    line-height: 40px;
    position: relative;
    height: 353px;
    width: 100%;
    img {
      border-radius: 15px;
    }
  }
  .carousel-pagination-another--title {
    font-size: 24px;
    font-weight: 600;
    text-align: left;
    color: white;
    position: absolute;
    bottom: 10px;
    padding-left: 20px;
  }
  .carousel-pagination-another--des {
    font-size: 18px;
    font-weight: 400;
    color: #565656;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .carousel-pagination-first--wrapperHold {
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .carousel-pagination-first--container {
    /* position: absolute; */
  }
  .carousel-pagination-another-ovelay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.3;
    border-radius: 15px;
  }
  .swiper {
    height: 100%;
  }
  .swiper-slide {
    cursor: pointer;
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
  @media screen and (max-width: 1023px) {
    padding: 20px 0px 0px 16px;
    .carousel-pagination-another--wrap {
      margin-top: 10px;
      height: 200px;
    }
    .carousel-pagination-title {
    }
    .carousel-pagination-another {
      width: 80%;
      img {
        height: 200px;
      }
    }
    .carousel-pagination-wrapper-directional {
      justify-content: center;
      display: block;
      position: initial;
      .carousel-pagination-wrapper-arrow {
        display: none;
      }
    }
    .carousel-pagination-another--title {
      font-size: 14px;
      font-weight: 700;
      white-space: pre-wrap;
      width: 95%;
      line-height: 25px;
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
