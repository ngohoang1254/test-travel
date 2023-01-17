import React, {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import {
  ArrowLeftRoundComponent,
  ArrowRightRoundComponent,
} from "@/components/stuff/ArrowComponent";
import useMobileDetect from "@/hooks/useMobileDetect";
import { useRouter } from "next/router";
import { IDontMiss } from "@/models/DontMiss";
import { useAppSelector } from "@/redux-store/stores";
import SearchDestination from "../SearchDestination";
import SearchDestinationMobile from "../SearchDestination/SearchDestinationMobile";
import { ArrowRightOutlined } from "@ant-design/icons";
// import Image from "next/image";

interface Props {
  img: string;
  bannerTitle?: string;
  bannerSubTitle?: string | ReactNode;
  haveCarousel?: boolean;
  swiper?: {
    list: IDontMiss[];
  };
  isSeach?: Boolean;
  bannerSubTitleType?: "normal" | "italic" | "oblique";
  format?: string;
  onLoadBanner?: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
  breakpointsTitle?: {
    [key: number | number]: {
      top: number | string;
    };
  };
}

const BannerComponent: React.FC<Props> = ({
  img = "",
  bannerTitle = "",
  bannerSubTitle = "",
  haveCarousel = false,
  swiper = null,
  isSeach = false,
  bannerSubTitleType = "normal",
  format = "",
  onLoadBanner = () => {},
  breakpointsTitle = {},
}) => {
  const {
    home: { listDontMiss },
  } = useAppSelector((state) => state);
  // let window: any;
  const { push } = useRouter();
  const isMobile = useMobileDetect();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [pathNameReal, setPathNameReal] = useState("");
  const handleRedirect = useCallback(
    (item: any) => {
      return () => {
        push(
          {
            pathname: `/khamphavietnam/${item?.tour_place_v2?.slug}/${item?.slug}`,
          },
          undefined,
          { scroll: true }
        );
      };
    },
    [listDontMiss]
  );
  useEffect(() => {
    if (bannerTitle) setPathNameReal(window.location.href);
  }, [bannerTitle]);

  return (
    <Styled_BannerComponent_Wrapper
      format={format}
      breakpointsTitle={breakpointsTitle}
    >
      <Styled_BannerComponent_Container>
        <Styled_BannerComponent_Img
          alt="banner"
          src={img}
          // layout="fill"
          // objectFit="cover"
          className={"home__banner"}
          onLoad={(e: React.SyntheticEvent<HTMLDivElement, Event>) => {
            onLoadBanner && onLoadBanner(e);
          }}
        />
        {/* </div>
        )} */}
        <div className="home__banner--overclay"></div>
        <Styled_BannerComponent_BannerTitle className="banner--component-title">
          {bannerTitle}
          <Styled_BannerComponent_BannerSubTitle
            bannerSubTitleType={bannerSubTitleType}
            className="banner--component-subtitle"
          >
            {bannerSubTitle}

            {pathNameReal.includes(
              "ve-mien-dat-thieng-tay-yen-tu-giua-thien-nhien-hoang-so"
            ) ? (
              <div
                className={` ${
                  isMobile
                    ? "banner--component--button--mobile"
                    : "banner--component--button"
                }`}
                onClick={() => {
                  window.open("https://tyt.vnpass.vn/", "_blank");
                }}
              >
                Mua vé
                <ArrowRightOutlined
                  style={{ marginLeft: "8px", verticalAlign: "middle" }}
                />
              </div>
            ) : (
              <></>
            )}
          </Styled_BannerComponent_BannerSubTitle>

          {isSeach && (
            <>
              {isMobile ? <SearchDestinationMobile /> : <SearchDestination />}
            </>
          )}
        </Styled_BannerComponent_BannerTitle>

        {haveCarousel && (
          <Styled_BannerComponent_Swiper className="banner--component-swiper">
            <Styled_BannerComponent_DontMiss className="banner--component-dont-miss-title">
              Đừng bỏ lỡ
            </Styled_BannerComponent_DontMiss>
            <Swiper
              slidesPerView={isMobile ? "auto" : 4}
              spaceBetween={isMobile ? 10 : 30}
              grabCursor={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"
              // navigation={true}
              loop={true}
              onInit={(swiper: any) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
            >
              {(swiper?.list || []).map((item, index: number) => {
                return (
                  <SwiperSlide
                    key={index + "BannerComponent"}
                    onClick={handleRedirect(item)}
                  >
                    <Styled_BannerComponent_SwiperSlide
                      style={{
                        backgroundImage: `url(${item.thumbnail?.url})`,
                      }}
                    />
                    <Styled_BannerComponent_Title>
                      {item?.title}
                    </Styled_BannerComponent_Title>
                  </SwiperSlide>
                );
              })}
              <ArrowLeftRoundComponent
                ref={prevRef}
                className="transparent banner--component--arrow"
                style={{
                  position: "absolute",
                  top: "30%",
                  left: "5%",
                  zIndex: 1000,
                }}
                isHover={true}
              />
              <ArrowRightRoundComponent
                ref={nextRef}
                className="transparent banner--component--arrow"
                style={{
                  position: "absolute",
                  top: "30%",
                  right: "5%",
                  zIndex: 1000,
                }}
                isHover={true}
              />
            </Swiper>
          </Styled_BannerComponent_Swiper>
        )}
      </Styled_BannerComponent_Container>
    </Styled_BannerComponent_Wrapper>
  );
};

export default memo(BannerComponent);

const Styled_BannerComponent_Img = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;
const Styled_BannerComponent_SwiperSlide = styled.div`
  box-shadow: 1px -100px 61px -26px rgba(0, 0, 0, 0.72) inset;
  -webkit-box-shadow: "1px -100px 61px -26px rgba(0,0,0,0.72) inset";
  -moz-box-shadow: "1px -100px 61px -26px rgba(0,0,0,0.72) inset";
  background-repeat: no-repeat;
  background-size: cover;
  height: 200px;
  border-radius: 10px;
  cursor: pointer;
  @media screen and (max-width: 1023px) {
    width: calc(100vw - 100px) !important;
  }
  @media screen and (max-width: 350px) {
    height: 142px;
  }
`;
const Styled_BannerComponent_Title = styled.div`
  position: absolute;
  bottom: 10px;
  color: white;
  left: 10px;
  font-size: 18px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  @media screen and (max-width: 1023px) {
    font-size: 15px;
  }
`;

const Styled_BannerComponent_Container = styled.div`
  position: relative;
`;

const Styled_BannerComponent_BannerTitle = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 64px;
  font-weight: 700;
  color: white;
  text-align: center;
  z-index: 2;
`;
const Styled_BannerComponent_BannerSubTitle = styled.div<{
  bannerSubTitleType: "normal" | "italic" | "oblique";
}>`
  font-style: ${(props) => props.bannerSubTitleType};
  font-size: 20px;
  font-weight: 500;
`;

const Styled_BannerComponent_DontMiss = styled.div`
  padding-left: 50px;
  font-weight: 700;
  font-size: 32px;
  color: #ffffff;
  margin-bottom: 10px;
`;

const Styled_BannerComponent_Swiper = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  z-index: 2;
  .swiper {
    width: 100%;
    height: 100%;
    &-button {
      &-prev {
        left: 60px;
      }
      &-next {
      }
    }
    .prev {
      position: absolute;
    }
  }
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .swiper-wrapper {
    padding-left: 50px;
    padding-bottom: 12px;
  }
  .swiper-pagination {
    position: relative;
    bottom: -5px;
    &-bullet {
      height: 16px;
      width: 16px;
      background: white;
      opacity: 1;
      &-active {
        background: #ff4b5a;
        border-radius: 100px;
        width: 40px;
      }
    }
  }
  @media screen and (max-width: 1023px) {
    .swiper-slide {
      width: auto !important;
    }
  }
`;

const Styled_BannerComponent_Wrapper = styled.div<{
  format?: string;
  breakpointsTitle?: {
    [key: number | number]: {
      top: number | string;
    };
  };
}>`
  .banner--component--button {
    padding: 8px 28px;
    background: linear-gradient(180deg, #ff2f48 0%, #ff6577 100%) !important;
    color: #fff;
    border-color: #ff4d4f;
    background: #ff4d4f;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px #0000000b;
    align-items: center;
    margin: auto;
    width: 224px;
    border-radius: 12px !important;
    margin-top: 40px;
    font-style: normal;
    cursor: pointer;
  }
  .banner--component--button--mobile {
    z-index: 9999;
    position: absolute;
    left: 0;
    right: 0;
    padding: 8px 28px;
    background: linear-gradient(180deg, #ff2f48 0%, #ff6577 100%) !important;
    color: #fff;
    border-color: #ff4d4f;
    background: #ff4d4f;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px #0000000b;
    align-items: center;
    margin: auto;
    width: 224px;
    border-radius: 12px !important;
    margin-top: 40px;
    font-style: normal;
    cursor: pointer;
  }

  .home__banner--overclay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: black;
    top: 0;
    opacity: 0.3;
  }
  @media screen and (max-width: 2560px) {
    .banner--component-title {
      top: ${(props) =>
        props?.breakpointsTitle?.[2560]
          ? props?.breakpointsTitle?.[2560]?.top
          : "35%"};
    }
  }
  @media screen and (max-width: 1023px) {
    .home__banner {
      height: 100vh;
    }
    .banner--component-title {
      font-size: 32px;
      font-weight: 600;
      text-align: center;
      width: 100%;
      padding: 0 15px;
      top: ${(props) =>
        props?.breakpointsTitle?.[1023]
          ? props?.breakpointsTitle?.[1023]?.top
          : "40%"};
    }
    .banner--component-subtitle {
      font-size: 12px;
      font-weight: 500;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .swiper-wrapper {
      padding-left: 10px;
      padding-bottom: 5px;
      width: 85%;
      img {
        height: 172px !important;
      }
    }
    .banner--component-swiper {
      bottom: 0;
    }
    .banner--component-dont-miss-title {
      padding-left: 10px;
      font-weight: 700;
      font-size: 18px;
      color: #ffffff;
    }
    .banner--component--arrow {
      display: none;
    }

    .swiper-pagination {
      position: relative;
      width: auto;
      margin-top: 5px;
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
