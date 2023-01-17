import {
  ArrowLeftRoundComponent,
  ArrowRightRoundComponent,
} from "@/components/stuff/ArrowComponent";
import { useAppSelector } from "@/redux-store/stores";
import { Col, Row } from "antd";
import React, { memo, useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import useMobileDetect from "@/hooks/useMobileDetect";
import { cloneDeep } from "lodash";
import Image from "next/image";

interface Props {}

const FreeExperience: React.FC<Props> = () => {
  const isMobile = useMobileDetect();
  const { dataPosts } = useAppSelector((state) => state.posts);
  const { free_attraction } = dataPosts || [];
  const [state, _setState] = useState<any>({ listMerged: [] });
  const setState = (data: {}) => {
    _setState({ ...state, ...data });
  };
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (
      free_attraction?.attraction_content &&
      free_attraction?.attraction_content?.length > 0
    ) {
      const cloneDeepFreeAttraction = cloneDeep(
        free_attraction?.attraction_content
      );
      cloneDeepFreeAttraction?.unshift({
        id: -1,
        title: "Trải nghiệm 0 đồng",
        thumbnail_image: cloneDeepFreeAttraction?.[0]?.thumbnail_image,
      });
      const middleIndex = Math.ceil(cloneDeepFreeAttraction.length / 2);

      let firstArr = cloneDeepFreeAttraction.splice(0, middleIndex);
      let secondArr = cloneDeepFreeAttraction.splice(-middleIndex);

      const listMerged = firstArr.map(function (item, index) {
        return {
          ...item,
          title_1: secondArr[index]?.title,
          thumbnail_image_1: secondArr[index]?.thumbnail_image,
        };
      });
      setState({ listMerged: listMerged });
    }
  }, [free_attraction?.attraction_content]);

  const sizeBox = useMemo(() => {
    if (free_attraction?.attraction_content?.length === 0) {
      return {
        experience: 0,
        box: 0,
      };
    }
    switch (free_attraction?.attraction_content?.length) {
      case 1:
        return {
          experience: 12,
          box: 12,
        };
      case 2: {
        return {
          experience: 24,
          box: 12,
        };
      }
      case 3: {
        return {
          experience: 12,
          box: 12,
        };
      }
      case 4: {
        return {
          experience: 0,
          box: 12,
        };
      }
      default: {
        return {
          experience: 0,
          box: 12,
        };
      }
    }
  }, [free_attraction?.attraction_content]);

  if (
    !free_attraction?.enabled ||
    free_attraction?.attraction_content?.length === 0
  ) {
    return <></>;
  }
  if (isMobile) {
    return (
      <Styled_FreeExperience_Wrapper_Mobile>
        <h1 className="free-experience-title-mobile">Trải nghiệm 0 đồng</h1>
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
          {(free_attraction?.attraction_content || []).map(
            (item: any, index: number) => {
              return (
                <SwiperSlide key={index} className={"free-experience-another"}>
                  <div className="free-experience--free_first--wrapper">
                    <Image
                      alt="thumbnail"
                      layout="fill"
                      src={item?.thumbnail_image?.url}
                    />
                    <div className="free-experience--free_first--text">
                      {item?.title}
                    </div>
                  </div>
                </SwiperSlide>
              );
            }
          )}

          <Row
            justify="center"
            align="middle"
            className="free-experience-wrapper-directional"
          >
            <div className="swiper-pagination"></div>
          </Row>
        </Swiper>
      </Styled_FreeExperience_Wrapper_Mobile>
    );
  }

  if (
    free_attraction?.attraction_content &&
    free_attraction?.attraction_content?.length < 4
  ) {
    return (
      <Styled_FreeExperience_Wrapper>
        {free_attraction?.attraction_content.length < 4 && (
          <Col
            xl={sizeBox.experience}
            className="free-experience free-experience--free"
          >
            <p>Trải nghiệm 0 đồng</p>
          </Col>
        )}
        {free_attraction?.attraction_content.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Col xl={sizeBox.box} className="free-experience">
                <Image
                  layout="fill"
                  alt="thumbnail"
                  src={item?.thumbnail_image?.url!}
                />
                <div className="free-experience--overlay"></div>
                <p className="free-experience--text">{item?.title}</p>
              </Col>
            </React.Fragment>
          );
        })}
      </Styled_FreeExperience_Wrapper>
    );
  }
  return (
    <Styled_FreeExperience_Container>
      <Row className="free-experience-first--wrapperHold free-experience-first">
        <Col xl={24}>
          <Swiper
            slidesPerView={2}
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
            {(state?.listMerged || [] || []).map((item: any, index: number) => {
              return (
                <SwiperSlide key={index} className={"free-experience-another"}>
                  {/* <img src={item?.thumbnail?.url} /> */}
                  {index === 0 ? (
                    <div className="free-experience free-experience--free">
                      <div className="free-experience--free_first">
                        <Image
                          layout="fill"
                          alt="thumbnail"
                          src={item?.thumbnail_image?.url}
                          style={{ visibility: "hidden" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            transform: "translateY(-50%)",
                            top: "50%",
                            paddingLeft: "50px",
                          }}
                        >
                          Trải nghiệm 0 đồng
                        </div>
                      </div>

                      <div className="free-experience--free_first--wrapper">
                        <Image
                          layout="fill"
                          alt="thumbnail"
                          src={item?.thumbnail_image_1?.url}
                        />
                        <div className="free-experience--free_first--text">
                          {item?.title_1}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="free-experience--free_first--wrapper">
                        <Image
                          layout="fill"
                          alt="thumbnail"
                          src={item?.thumbnail_image?.url}
                        />
                        <div className="free-experience--free_first--text">
                          {item?.title}
                        </div>
                      </div>
                      <div className="free-experience--free_first--wrapper">
                        <Image
                          layout="fill"
                          alt="thumbnail"
                          src={item?.thumbnail_image_1?.url}
                        />
                        <div className="free-experience--free_first--text">
                          {item?.title_1}
                        </div>
                      </div>
                    </>
                  )}
                </SwiperSlide>
              );
            })}

            <Row
              justify="end"
              align="middle"
              className="free-experience-wrapper-directional"
            >
              <div className="swiper-pagination"></div>
              <div className="free-experience-wrapper-arrow">
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
    </Styled_FreeExperience_Container>
  );
};
export default memo(FreeExperience);

export const Styled_FreeExperience_Wrapper_Mobile = styled.div`
  margin-top: 20px;
  background: white;
  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    color: #2f2f2f;
    padding-left: 10px;
    padding-bottom: 10px;
  }
  .free-experience--free_first--wrapper {
    position: relative;
    min-height: 224px;
  }
  .free-experience--free_first--text {
    position: absolute;
    bottom: 20px;
    left: 24px;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    color: white;
  }
  img {
    height: 224px;
    width: 375px;
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
export const Styled_FreeExperience_Container = styled.div`
  .free-experience-title {
    font-size: 32px;
    font-weight: 700;
  }
  .free-experience-sub {
    font-size: 20px;
    font-style: italic;
    font-weight: 500;
    color: #898989;
  }
  .free-experience-wrapper-arrow {
    margin-right: 40px;
  }
  .free-experience-wrapper-directional {
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 100%;
    justify-content: space-between;
  }
  .free-experience-first {
    &--img {
      width: 486px;
      height: 690px;
      border-radius: 1000px;
    }
  }
  .free-experience-first--wrap {
    bottom: 0;
    padding: 0px 20px 20px 20px;

    width: 642px !important;
  }
  .free-experience-first--title {
    font-weight: 700;
    font-size: 40px;
    color: #ef4444;
  }
  .free-experience-first--des {
    font-weight: 400;
    font-size: 18px;
    color: #565656;
  }
  .free-experience-another {
    justify-content: center;
    img {
      width: 100%;
      height: 400px;
    }
  }
  .free-experience-another--wrap {
    margin-top: 40px;
    line-height: 35px;
  }
  .free-experience-another--title {
    font-size: 24px;
    font-weight: 700;
    text-align: left;
    color: #0e7490;
    &.red {
      color: #ef4444;
    }
  }
  .free-experience-another--des {
    font-size: 18px;
    font-weight: 400;
    color: #565656;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .free-experience-first--wrapperHold {
    justify-content: space-between;
  }
  .free-experience-first--container {
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

  .free-experience--free {
    font-size: 64px;
    font-weight: 700;
    text-align: left;
    color: #2f2f2f;
    height: 100% !important;
  }
  .free-experience--free_first {
    position: relative;
    background-color: #f6f6f6;
  }
  .free-experience--free_first--wrapper {
    position: relative;
  }
  .free-experience--free_first--text {
    position: absolute;
    top: 50%;
    left: 50px;
    transform: translateY(-50%);
    color: white;
    font-size: 36px;
    font-weight: 600;
  }
`;

const Styled_FreeExperience_Wrapper = styled(Row)`
  margin-top: 70px;
  background-color: #f6f6f6;
  .free-experience {
    height: 410px;
    line-height: 410px;
    > p {
      padding-left: 50px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .free-experience--text {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    font-size: 36px;
    font-weight: 700;
    color: white;
  }
  .free-experience--overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    background-color: black;
    opacity: 0.5;
  }
  .free-experience--free {
    font-size: 64px;
    font-weight: 700;
    text-align: left;
    color: #2f2f2f;
  }
`;
