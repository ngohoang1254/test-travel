import {
  ArrowLeftRoundComponent,
  ArrowRightRoundComponent,
} from "@/components/stuff/ArrowComponent";
import { CategoryInfo, RelatedPosts } from "@/models/Destination";
import { Col, Row } from "antd";
import React, { memo, MouseEventHandler, useRef } from "react";
import styled from "styled-components";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

interface Props {
  itemRender: CategoryInfo;
  handleRedirectPopup: (
    type: string,
    item?: RelatedPosts & CategoryInfo
  ) => MouseEventHandler<HTMLDivElement> | undefined;
}

const WhatToPlayComponent: React.FC<Props> = ({
  itemRender,
  handleRedirectPopup,
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <Styled_WhatToPlayComponent_Container id="what-to-play-component">
      <div className="what-to-play-title">{itemRender?.sub_category?.name}</div>
      <div className="what-to-play-sub">
        Mách bạn các địa điểm vui chơi không thể bỏ qua
        {/* {itemRender?.post_description} */}
      </div>
      <Row
        className="what-to-play-first--wrapperHold what-to-play-first"
        onClick={handleRedirectPopup("main", itemRender)}
      >
        <Col xl={12} sm={24} className="what-to-play-first--container">
          <div className="what-to-play-first--img">
            {itemRender?.main_post?.thumbnail?.url && (
              <Image
                alt="post"
                layout="fill"
                src={itemRender?.main_post?.thumbnail?.url}
              />
            )}
          </div>
        </Col>
        <Col xl={12} sm={24}>
          <div className="what-to-play-first--wrap">
            <div className="what-to-play-first--title">
              {itemRender?.main_post?.title}
            </div>
            <div className="what-to-play-first--des">
              {itemRender?.main_post?.sapo}
            </div>
          </div>
        </Col>
      </Row>
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
          {(itemRender?.relatedPosts || []).map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className={"what-to-play-another"}
                onClick={handleRedirectPopup("", item)}
              >
                {item?.thumbnail?.url && (
                  <div className="img">
                    <Image
                      layout="fill"
                      alt="thumbnail"
                      src={item?.thumbnail?.url}
                    />
                  </div>
                )}
                <div className="what-to-play-another--wrap">
                  <div className={"what-to-play-another--title"}>
                    {item?.title}
                  </div>
                  <div className="what-to-play-another--des">{item?.sapo}</div>
                </div>
              </SwiperSlide>
            );
          })}

          <Row
            justify="end"
            align="middle"
            className="what-to-play-wrapper-directional"
          >
            <div className="swiper-pagination"></div>
            <div className="what-to-play-wrapper-arrow">
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
    </Styled_WhatToPlayComponent_Container>
  );
};
export default memo(WhatToPlayComponent);

export const Styled_WhatToPlayComponent_Container = styled.div`
  padding: 60px 0px 0px 60px;
  .what-to-play-title {
    font-size: 32px;
    font-weight: 700;
  }
  .what-to-play-sub {
    font-size: 20px;
    font-style: italic;
    font-weight: 500;
    color: #898989;
    margin-bottom: 20px;
  }
  .what-to-play-wrapper-arrow {
    margin-right: 40px;
  }
  .what-to-play-wrapper-directional {
    justify-content: space-between;
  }
  .what-to-play-first {
    &--img {
      width: 100% !important;
      height: 424px !important;
      img {
        border-radius: 15px;
        object-fit: cover;
      }
    }
  }
  .what-to-play-first--wrap {
    bottom: 0;
    padding: 0px 20px 20px 30px;
    /* width: 642px !important; */
  }
  .what-to-play-first--title {
    font-weight: 700;
    font-size: 40px;
  }
  .what-to-play-first--des {
    font-size: 20px;
    font-weight: 400;
    color: #565656;
  }
  .what-to-play-another {
    width: 420px;
    &:hover {
      .what-to-play-another--title {
        color: #ef4444;
      }
    }
    .img {
      width: 100%;
      height: 250px;
      border-radius: 8px;
      position: relative;
      img {
        border-radius: 8px;
        object-fit: cover;
      }
    }
  }
  .what-to-play-another--wrap {
    margin-top: 40px;
    line-height: 40px;
  }
  .what-to-play-another--title {
    font-size: 24px;
    font-weight: 700;
    text-align: left;
    color: #0e7490;
  }
  .what-to-play-another--des {
    font-size: 18px;
    font-weight: 400;
    color: #565656;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .what-to-play-first--wrapperHold {
    justify-content: space-between;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover {
      .what-to-play-first--title {
        color: #ef4444;
      }
    }
  }
  .what-to-play-first--container {
    /* position: absolute; */
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
    padding: 0px 20px;
    .what-to-play-title {
      font-size: 24px;
      font-weight: 600;
    }
    .what-to-play-sub {
      font-size: 12px;
      font-style: italic;
      font-weight: 500;
      text-align: left;
      margin-bottom: 10px;
    }
    .what-to-play-first--img {
      height: auto !important;
      margin-bottom: 10px;
    }
    .what-to-play-first--wrap {
      padding: 0px;
    }
    .what-to-play-first--title {
      font-size: 20px;
      font-weight: 600;
      color: #0e7490;
    }
    .what-to-play-first--des {
      font-size: 14px;
      font-weight: 400;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .what-to-play-another--wrap {
      margin-top: 0px;
      line-height: unset;
      margin-left: 10px;
    }
    .what-to-play-first--wrapperHold {
      &:hover {
        .what-to-play-first--title {
          color: #0e7490;
        }
      }
    }
    .what-to-play-another {
      display: flex;
      width: 80%;
      &:hover {
        .what-to-play-another--title {
          color: #0e7490;
        }
      }
      img {
        width: 50%;
        border-radius: 15px;
        height: 100%;
      }
    }
    .what-to-play-another--title {
      font-weight: 600;
      font-size: 14px;
      color: #0e7490;
    }
    .what-to-play-another--des {
      font-weight: 400;
      font-size: 12px;

      color: #565656;
    }
    .what-to-play-wrapper-directional {
      justify-content: center;
    }
    .what-to-play-wrapper-arrow {
      display: none;
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
