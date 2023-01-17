import { CategoryInfo } from "@/models/Destination";
import { useAppDispatch, useAppSelector } from "@/redux-store/stores";
import { Col, Row } from "antd";
import React, { memo, useCallback, useState } from "react";
import styled from "styled-components";
import useMobileDetect from "@/hooks/useMobileDetect";
import Image from "next/image";

const BannerDestination: React.FC = () => {
  const isMobile = useMobileDetect();
  const { dataDestination } = useAppSelector((state) => state.destination);
  const { updateData } = useAppDispatch().destination;
  const [state, _setState] = useState({
    bannerSelectedId: -1,
    bannerSelectedIndex: -1,
  });
  const setState = (data: {}) => {
    _setState({ ...state, ...data });
  };
  const onMouseEnter = useCallback(
    (id: number = -1, index?: number) => {
      return () => {
        setState({
          bannerSelectedId: id,
          bannerSelectedIndex: index ?? state?.bannerSelectedIndex,
        });
      };
    },
    [state.bannerSelectedId, dataDestination]
  );
  const onMouseLeave = useCallback(() => {
    setState({
      bannerSelectedId: -1,
    });
  }, [state.bannerSelectedId, dataDestination]);

  const collapseBanner = useCallback(
    (id: number = -1) => {
      return () => {
        switch (state.bannerSelectedId) {
          case -1: {
            return {
              col: 8,
              className: "",
            };
          }
          case id: {
            return {
              col: 14,
              className: "active",
            };
          }
          default: {
            return {
              col: 5,
              className: "",
            };
          }
        }
      };
    },
    [state.bannerSelectedId]
  );
  const scrollComponent = (index: number) => {
    return () => {
      let idScrollTo = "";
      if (index === 0) {
        idScrollTo = "where-to-go-component";
      }
      if (index === 1) {
        idScrollTo = "what-to-eat-component";
      }
      if (index === 2) {
        idScrollTo = "what-to-play-component";
      }
      document.getElementById(idScrollTo)?.scrollIntoView({
        behavior: "smooth",
      });
    };
  };
  return (
    <Styled_BannerDestination_Wrapper>
      <Row style={isMobile ? {} : { flexWrap: "nowrap", overflow: "hidden" }}>
        {dataDestination?.category_info &&
          (dataDestination?.category_info || []).map(
            (item: CategoryInfo, index: number) => (
              <Col
                key={index}
                className={`banner-destination-container--col ${
                  collapseBanner(item?.id)().className
                }`}
                xs={24}
                xl={collapseBanner(item?.id)().col}
                lg={collapseBanner(item?.id)().col}
                onMouseLeave={onMouseLeave}
                onMouseEnter={onMouseEnter(item?.id, index)}
                onClick={scrollComponent(index)}
              >
                <div className="banner-destination--overlay"></div>
                <Image
                  className="banner-destination-img"
                  src={`${item?.featured_image?.url}`}
                  alt="loading"
                  onLoad={() => {
                    updateData({ isLoadingBannerDestination: false });
                  }}
                  layout="fill"
                />
                <Row className="banner-destination-wrap">
                  <Col xs={16} xl={12} className="banner-destination-title">
                    {item?.sub_category?.name}
                    {state.bannerSelectedId === item?.id && !isMobile && (
                      <p className="banner-destination-sub">
                        {item?.post_description}
                      </p>
                    )}
                  </Col>
                  {((item?.relatedPosts && item?.relatedPosts?.length > 0) ||
                    Object?.keys(item?.main_post || {})?.length > 0) && (
                    <Col xs={8} xl={12} className="banner-destination-icon">
                      {isMobile ? (
                        <Image
                          src="/images/svg/arrow-right-mobile-white.svg"
                          alt="arrow"
                          width={64}
                          height={24}
                          layout="intrinsic"
                        />
                      ) : (
                        <Image
                          src="/images/svg/arrow-right-long-white.svg"
                          alt="arrow"
                          width={64}
                          height={24}
                          layout="intrinsic"
                        />
                      )}
                    </Col>
                  )}
                </Row>
              </Col>
            )
          )}
      </Row>

      {!isMobile && (
        <div
          className="banner-destination-name"
          onClick={scrollComponent(state?.bannerSelectedIndex)}
          onMouseEnter={onMouseEnter(state?.bannerSelectedId)}
        >
          {dataDestination?.name}
        </div>
      )}
      {/* {isMobile && state.bannerSelectedId === -1 && ( */}
      {isMobile && (
        <div className="banner-destination-name" onClick={scrollComponent(1)}>
          {dataDestination?.name}
        </div>
      )}
    </Styled_BannerDestination_Wrapper>
  );
};

export default memo(BannerDestination);

const Styled_BannerDestination_Wrapper = styled.div`
  width: 100%;
  position: relative;
  .banner-destination {
    &-container--col {
      width: 100%;
      height: 100vh;
      cursor: pointer;
      transition: 1s ease 0s;
      &.active {
        transition: 0.5s ease 0s;
      }
      &:hover {
        .banner-destination-wrap {
          align-items: flex-end;
        }
        .banner-destination-icon {
          padding-bottom: 30px;
          z-index: 3;
        }
      }
      @media screen and (max-width: 768px) {
        height: 250px;
      }
    }
    &--overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.5;
      z-index: 2;
    }
    &-wrap {
      width: 100%;
      position: absolute;
      bottom: 20px;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      cursor: pointer;
    }
    &-icon {
      text-align: right;
      z-index: 3;
    }
    &-img {
      height: 900px;
      width: 100%;
      cursor: pointer;
      object-fit: cover;
      @media screen and (max-width: 768px) {
        height: 250px;
      }
    }
    &-title {
      font-size: 40px;
      font-weight: 700;
      color: white;
      cursor: pointer;
      z-index: 3;
    }
    &-sub {
      font-size: 24px;
      font-style: italic;
      font-weight: 400;
      text-align: left;
      z-index: 3;
    }
    &-name {
      z-index: 3;
      color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 96px;
      font-weight: 700;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }
  }
  @media screen and (max-width: 1023px) {
    .banner-destination-name {
      font-size: 40px;
      font-weight: 700;
      white-space: nowrap;
    }
    .banner-destination-title {
      font-size: 20px;
      font-weight: 700;
    }
    .banner-destination-sub {
      font-size: 12px;
      font-weight: 500;
    }
    .banner-destination-icon {
      padding-bottom: 0px !important;

      img {
        width: 50px;
      }
    }
  }
`;
