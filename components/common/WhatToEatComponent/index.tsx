import {
  ArrowLeftRoundComponent,
  ArrowRightRoundComponent,
} from "@/components/stuff/ArrowComponent";
import {
  CategoryInfo,
  RelatedPosts,
  ThumbnailRelatedPosts,
} from "@/models/Destination";
import { Col, Row } from "antd";
import React, {
  memo,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

interface Props {
  itemRender?: CategoryInfo;
  handleRedirectPopup: (
    type: string,
    item?: RelatedPosts & CategoryInfo
  ) => MouseEventHandler<HTMLDivElement> | undefined;
}
interface IRelatedPostsExtra {
  title_1?: string;
  thumbnail?: ThumbnailRelatedPosts;
  sapo_1?: string;
  thumbnail_1?: ThumbnailRelatedPosts;
}

const WhatToEatComponent: React.FC<Props> = ({
  itemRender,
  handleRedirectPopup,
}) => {
  const [state, _setState] = useState<any>({ listItem: [] });
  const setState = (data: {}) => {
    _setState({ ...state, ...data });
  };
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (itemRender?.relatedPosts && itemRender?.relatedPosts?.length > 0) {
      const middleIndex = Math.ceil(itemRender?.relatedPosts?.length / 2);

      let firstArr = itemRender?.relatedPosts?.splice(0, middleIndex);
      let secondArr = itemRender?.relatedPosts?.splice(-middleIndex);

      const listMerged = firstArr.map(function (item, index) {
        return {
          ...item,
          title_1: secondArr[index]?.title,
          sapo_1: secondArr[index]?.sapo,
          thumbnail_1: secondArr[index]?.thumbnail,
        };
      });
      setState({ listItem: listMerged });
    }
  }, [itemRender?.relatedPosts]);

  return (
    <Styled_WhatToEatComponent_Container id="what-to-eat-component">
      <div className="what-to-eat-title">{itemRender?.sub_category?.name}</div>
      <div className="what-to-eat-sub">
        Mách bạn ăn ở đâu ngon, uống ở đâu &quot;xịn&quot;
      </div>
      <Row className="what-to-eat-first--wrapperHold what-to-eat-first">
        <Col
          sm={24}
          xl={10}
          className="what-to-eat-first--container"
          onClick={handleRedirectPopup("main", itemRender)}
        >
          <div className="what-to-eat-first--img">
            {itemRender?.main_post?.thumbnail?.url && (
              <Image
                layout="fill"
                className=".img"
                alt="img"
                src={itemRender?.main_post?.thumbnail?.url}
              />
            )}
          </div>
          <div className="what-to-eat-first--wrap">
            <div className="what-to-eat-first--title">
              {itemRender?.main_post?.title}
            </div>
            <div className="what-to-eat-first--des">
              {itemRender?.main_post?.sapo}
            </div>
          </div>
        </Col>
        <Col sm={24} xl={14}>
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
            {(state?.listItem || []).map(
              (item: RelatedPosts & IRelatedPostsExtra, index: number) => {
                return (
                  <SwiperSlide
                    key={index}
                    className={"what-to-eat-another"}
                    onClick={handleRedirectPopup("", item)}
                  >
                    {item?.thumbnail?.url && (
                      <div className="img">
                        <Image
                          layout="fill"
                          className="img"
                          alt="thumbnail"
                          src={item?.thumbnail?.url}
                        />
                      </div>
                    )}
                    <div className="what-to-eat-another--wrap">
                      <div className={"what-to-eat-another--title"}>
                        {item?.title}
                      </div>
                      <div className="what-to-eat-another--des">
                        {item?.sapo}
                      </div>
                    </div>
                    {item?.title_1 && (
                      <>
                        {item?.thumbnail_1?.url && (
                          <div className="img" style={{ marginTop: 20 }}>
                            <Image
                              alt="thumbnail"
                              layout="fill"
                              src={item?.thumbnail_1?.url}
                            />
                          </div>
                        )}
                        <div className="what-to-eat-another--wrap">
                          <div className={"what-to-eat-another--title"}>
                            {item?.title_1}
                          </div>
                          <div className="what-to-eat-another--des">
                            {item?.sapo_1}
                          </div>
                        </div>
                      </>
                    )}
                  </SwiperSlide>
                );
              }
            )}

            <Row
              justify="end"
              align="middle"
              className="what-to-eat-wrapper-directional"
            >
              <div className="swiper-pagination"></div>
              <div className="what-to-eat-wrapper-arrow">
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
    </Styled_WhatToEatComponent_Container>
  );
};
export default memo(WhatToEatComponent);

export const Styled_WhatToEatComponent_Container = styled.div`
  padding: 60px 0px 70px 60px;
  .what-to-eat-title {
    font-size: 32px;
    font-weight: 700;
  }
  .what-to-eat-sub {
    font-size: 20px;
    font-style: italic;
    font-weight: 500;
    color: #898989;
    margin-bottom: 20px;
  }
  .what-to-eat-wrapper-arrow {
    margin-right: 40px;
  }
  .what-to-eat-wrapper-directional {
    position: absolute;
    bottom: 10px;
    z-index: 1;
    width: 100%;
    justify-content: space-between;
  }
  .what-to-eat-first {
    &--img {
      width: 486px;
      height: 690px;
      position: relative;
      img {
        border-radius: 1000px;
        object-fit: cover;
      }
    }
  }
  .what-to-eat-first--wrap {
    bottom: 0;
    padding: 0px 20px 20px 20px;
  }
  .what-to-eat-first--title {
    font-weight: 700;
    font-size: 40px;
    color: #0e7490;
  }
  .what-to-eat-first--des {
    font-weight: 400;
    font-size: 18px;
    color: #565656;
  }
  .what-to-eat-another--wrap-container {
    &:hover {
      .what-to-eat-another--title {
        color: #ef4444;
      }
    }
  }
  .what-to-eat-another {
    height: 240px;
    width: 360px;
    border-radius: 8px;

    .img {
      height: 240px;
      width: 360px;
      border-radius: 8px;
      position: relative;
      img {
        object-fit: cover;
        border-radius: 8px;
      }
    }
  }
  .what-to-eat-another--wrap {
    margin-top: 40px;
    line-height: 35px;
  }
  .what-to-eat-another--title {
    font-size: 24px;
    font-weight: 700;
    text-align: left;
    color: #0e7490;
  }
  .what-to-eat-another--des {
    font-size: 18px;
    font-weight: 400;
    color: #565656;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .what-to-eat-first--wrapperHold {
    justify-content: space-between;
  }
  .what-to-eat-first--container {
    /* position: absolute; */
    cursor: pointer;
    &:hover {
      .what-to-eat-first--title {
        color: #ef4444;
      }
    }
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
    padding: 0px 20px;
    margin-bottom: 20px;
    .what-to-eat-first {
      &--img {
        width: 100%;
        height: 500px;
      }
    }
    .what-to-eat-title {
      font-size: 24px;
      font-weight: 600;
    }
    .what-to-eat-sub {
      font-size: 12px;
      font-style: italic;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .what-to-eat-first--title {
      font-size: 20px;
      font-weight: 600;
      margin-top: 10px;
    }
    .what-to-eat-first--wrap {
      padding: 0px;
      margin-bottom: 20px;
    }
    .what-to-eat-first--des {
      font-size: 14px;
      font-weight: 400;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .what-to-eat-another {
      height: 100%;
      width: 100%;
    }
    .what-to-eat-another--wrap {
      margin-top: 0px;
      line-height: unset;
      margin-left: 10px;
    }
    .what-to-eat-first--container {
      &:hover {
        .what-to-eat-first--title {
          color: #0e7490;
        }
      }
    }
    .what-to-eat-another--wrap-container {
      display: flex;
      margin-bottom: 20px;
      img {
        width: 136px;
        height: 136px;
        min-width: 136px;
      }
      .what-to-eat-another--title {
        font-size: 14px;
        font-weight: 600;
      }
      .what-to-eat-another--des {
        font-size: 12px;
        font-weight: 400;
      }
      &:hover {
        .what-to-eat-another--title {
          color: #0e7490;
        }
      }
    }
    .what-to-eat-wrapper-directional {
      justify-content: center;
      .what-to-eat-wrapper-arrow {
        display: none;
      }
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
