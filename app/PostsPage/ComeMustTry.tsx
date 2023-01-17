import {
  ArrowLeftRoundComponent,
  ArrowRightRoundComponent,
} from "@/components/stuff/ArrowComponent";
import { useAppSelector } from "@/redux-store/stores";
// import { CategoryInfo } from "@/models/Destination";
import { Col, Row } from "antd";
import React, { memo, useRef } from "react";
import styled from "styled-components";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
interface Props {
  // itemRender: CategoryInfo;
}

const ComeMustTry: React.FC<Props> = () => {
  const {
    dataPosts: { must_try },
  } = useAppSelector((state) => state.posts);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <Styled_ComeMustTry_Container>
      <div className="come-must-try-title">Đến là phải thử</div>
      <div className="come-must-try-sub">
        Mách bạn các địa điểm vui chơi không thể bỏ qua
        {/* {itemRender?.post_description} */}
      </div>
      <Row className="come-must-try-first--wrapperHold come-must-try-first">
        <Col xs={24} xl={12} className="come-must-try-first--container">
          <Image
            alt="thumbnail"
            layout="fill"
            src={must_try?.thumbnail_image?.url!}
            className="come-must-try-first--img"
          />
        </Col>
        <Col xs={24} xl={12}>
          <div className="come-must-try-first--wrap">
            <div className="come-must-try-first--title">{must_try?.title}</div>
            <div className="come-must-try-first--des">
              {must_try?.description}
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
          {(must_try?.slide_must_try || []).map((item, index) => {
            return (
              <SwiperSlide key={index} className={"come-must-try-another"}>
                <div className="come-must-try-another--wrap">
                  <div className="come-must-try-another--img">
                    <Image
                      className="img"
                      objectFit="cover"
                      layout="fill"
                      alt="thumbnail"
                      src={item?.thumbnail_image?.url!}
                    />
                  </div>
                </div>{" "}
                <div className={"come-must-try-another--title"}>
                  {item?.title}
                </div>
              </SwiperSlide>
            );
          })}

          <Row
            justify="end"
            align="middle"
            className="come-must-try-wrapper-directional"
          >
            <div className="swiper-pagination"></div>
            <div className="come-must-try-wrapper-arrow">
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
    </Styled_ComeMustTry_Container>
  );
};
export default memo(ComeMustTry);

export const Styled_ComeMustTry_Container = styled.div`
  padding: 60px 0px 0px 60px;
  .come-must-try-title {
    font-size: 32px;
    font-weight: 700;
  }
  .come-must-try-sub {
    font-size: 20px;
    font-style: italic;
    font-weight: 500;
    color: #898989;
  }
  .come-must-try-wrapper-arrow {
    margin-right: 40px;
  }
  .come-must-try-wrapper-directional {
    justify-content: space-between;
  }
  .come-must-try-first {
    &--img {
      width: 100% !important;
      height: 424px !important;
      border-radius: 15px;
    }
  }
  .come-must-try-first--wrap {
    bottom: 0;
    padding: 0px 20px 20px 20px;

    width: 642px !important;
  }
  .come-must-try-first--title {
    font-weight: 700;
    font-size: 40px;
    color: #0e7490;
  }
  .come-must-try-first--des {
    font-size: 20px;
    font-weight: 400;
    color: #565656;
  }
  .come-must-try-another {
    width: 420px;
    &--img {
      width: 100%;
      height: 280px;
      position: relative;
      img {
        border-radius: 8px;
      }
    }
  }

  .come-must-try-another--title {
    font-size: 24px;
    font-weight: 700;
    text-align: left;
    color: #0e7490;
  }
  .come-must-try-another--des {
    font-size: 18px;
    font-weight: 400;
    color: #565656;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .come-must-try-first--wrapperHold {
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .come-must-try-first--container {
    border-radius: 8px;
    height: 424px;
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
    padding: 20px 10px;
    .come-must-try-first--wrap {
      width: 100% !important;
    }
    .come-must-try-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 15px;
    }
    .come-must-try-sub {
      display: none;
    }
    .come-must-try-first--img {
      height: auto !important;
    }
    .come-must-try-first--wrap {
      padding: 0px;
    }
    .come-must-try-first--container {
      height: 250px;
    }
    .come-must-try-first--title {
      font-size: 20px;
      font-weight: 700;
      color: #0e7490;
      margin: 5px 0px;
    }
    .come-must-try-first--des {
      font-weight: 400;
      font-size: 20px;
      color: #565656;
    }
    .come-must-try-another {
      width: 70%;
      .come-must-try-another--wrap {
        margin-top: 0px;

        .come-must-try-another--title {
          font-weight: 700;
          font-size: 16px;
          color: #0e7490;
          &.red {
            font-weight: 700;
            font-size: 16px;
            color: #0e7490;
          }
        }
      }
      &--img {
        position: relative;
        height: 156px;
      }
    }
    .come-must-try-wrapper-directional {
      justify-content: center;
      .come-must-try-wrapper-arrow {
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
