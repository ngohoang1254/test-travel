import {
  ArrowLeftRoundComponent,
  ArrowRightRoundComponent,
} from "@/components/stuff/ArrowComponent";
import { CategoryInfo, RelatedPosts } from "@/models/Destination";
import { Col, Row } from "antd";
import Image from "next/image";
import React, { memo, MouseEventHandler, useRef } from "react";
import styled from "styled-components";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  itemRender: CategoryInfo;
  handleRedirectPopup: (
    type: string,
    item?: RelatedPosts & CategoryInfo
  ) => MouseEventHandler<HTMLDivElement> | undefined;
}

const WhereToGoComponent: React.FC<Props> = ({
  itemRender,
  handleRedirectPopup,
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <Styled_WhereToGoComponent_Container id="where-to-go-component">
      <div className="where-to-go-title">{itemRender?.sub_category?.name}</div>
      <div className="where-to-go-sub">
        Mách bạn những địa điểm nhất định phải đến một lần
      </div>
      <Row className="where-to-go-first--wrapperHold where-to-go-first">
        <Col
          sm={24}
          xl={11}
          className="where-to-go-first--container where-to-go-first--img"
          onClick={handleRedirectPopup("main", itemRender)}
        >
          {itemRender?.main_post?.thumbnail?.url && (
            <Image
              alt="thumbnail"
              layout="fill"
              src={itemRender?.main_post?.thumbnail?.url}
            />
          )}
          <div className="where-to-go-first-overlay"></div>
          <div className="where-to-go-first--wrap">
            <div className="where-to-go-first--title">
              {itemRender?.main_post?.title}
            </div>
            <div className="where-to-go-first--des">
              {itemRender?.main_post?.sapo}
            </div>
          </div>
        </Col>
        <Col sm={24} xl={12}>
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
            {(itemRender?.relatedPosts || []).map(
              (item: RelatedPosts, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className={"where-to-go-another"}
                    onClick={handleRedirectPopup("", item)}
                  >
                    {item?.thumbnail?.url && (
                      <div className="img">
                        <Image
                          alt="thumbnail"
                          layout="fill"
                          src={item?.thumbnail?.url}
                        />
                      </div>
                    )}
                    <div className="where-to-go-another--wrap">
                      <div className={"where-to-go-another--title"}>
                        {item?.title}
                      </div>
                      <div className="where-to-go-another--des">
                        {item?.sapo}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              }
            )}

            <Row
              justify="end"
              align="middle"
              className="where-to-go-wrapper-directional"
            >
              <div className="swiper-pagination"></div>
              <div className="where-to-go-wrapper-arrow">
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
        </Col>
      </Row>
    </Styled_WhereToGoComponent_Container>
  );
};
export default memo(WhereToGoComponent);

export const Styled_WhereToGoComponent_Container = styled.div`
  padding: 60px 0px 70px 60px;
  .where-to-go-title {
    font-size: 32px;
    font-weight: 700;
  }
  .where-to-go-sub {
    font-size: 20px;
    font-style: italic;
    font-weight: 500;
    color: #898989;
    margin-bottom: 20px;
  }
  .where-to-go-wrapper-arrow {
    margin-right: 40px;
  }
  .where-to-go-wrapper-directional {
    position: absolute;
    bottom: 10px;
    z-index: 1;
    width: 100%;
    justify-content: space-between;
  }
  .where-to-go-first {
    &--img {
      width: 100% !important;
      height: 642px !important;

      & img {
        border-radius: 15px;
        object-fit: cover;
      }
    }
    &-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.2;
      border-radius: 15px;
      object-fit: cover;
    }
    /* @media screen and (max-width: 375px) {
      &--img {
        width: 100%;
        height: 500px;
      }
    } */
  }
  .where-to-go-first--wrap {
    position: absolute;
    bottom: 0;
    padding: 0px 20px 20px 20px;
  }
  .where-to-go-first--title {
    font-weight: 700;
    font-size: 40px;
    color: #ffffff;
  }
  .where-to-go-first--des {
    font-weight: 400;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.87);
  }
  .where-to-go-another {
    height: 300px !important;
    width: 250px !important;

    &:hover {
      .where-to-go-another--title {
        color: #ef4444;
      }
    }
    .img {
      width: 250px !important;
      height: 300px !important;
      img {
        border-radius: 1000px;
        object-fit: cover;
      }
    }
  }
  .where-to-go-another--wrap {
    margin-top: 40px;
    line-height: 40px;
  }
  .where-to-go-another--title {
    font-size: 24px;
    font-weight: 700;
    text-align: left;
    color: #0e7490;
  }
  .where-to-go-another--des {
    font-size: 18px;
    font-weight: 400;
    color: #565656;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .where-to-go-first--wrapperHold {
    justify-content: space-between;
  }
  .where-to-go-first--container {
    cursor: pointer;

    &:hover {
      .where-to-go-first--title {
        color: #ef4444;
      }
    }
    /* position: absolute; */
  }
  .swiper {
    height: 110%;
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
    padding: 0px;
    .where-to-go-title {
      padding-left: 20px;
      font-size: 20px;
      font-weight: 600;
    }
    .where-to-go-sub {
      padding-left: 20px;
      font-size: 12px;
      font-style: italic;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .where-to-go-first--img {
      border-radius: 0px;
      height: 100% !important;
    }
    .where-to-go-first--title {
      font-size: 24px;
      font-weight: 600;
    }
    .where-to-go-first--des {
      font-size: 14px;
      font-weight: 400;
    }
    .where-to-go-first--container {
      &:hover {
        .where-to-go-first--title {
          color: white;
        }
      }
      /* position: absolute; */
    }
    .swiper {
      padding: 0px 20px;
    }
    .where-to-go-another {
      &:hover {
        .where-to-go-another--title {
          color: #0e7490;
        }
      }
    }
    .where-to-go-another {
      height: 100% !important;
      /* padding-left: 10px; */

      img {
        /* padding: 20px; */
      }
      &:nth-last-child(1) {
        img {
          /* padding-right: 20px; */
          /* padding-left: 0 !important; */
        }
      }
    }
    .where-to-go-another--title {
      font-weight: 600;
      font-size: 18px;
      &.red {
        color: #0e7490;
      }
    }
    .where-to-go-another--des {
      font-weight: 400;
      font-size: 14px;
      color: #565656;
      margin-top: 10px;
    }
    .where-to-go-another--wrap {
      margin-top: 10px;
      line-height: unset;
    }
    .where-to-go-wrapper-directional {
      justify-content: center;
      display: block;
      position: initial;
      .where-to-go-wrapper-arrow {
        display: none;
      }
    }
    .swiper {
      height: auto;
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
