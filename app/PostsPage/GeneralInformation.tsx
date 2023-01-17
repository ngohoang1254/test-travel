import {
  ArrowLeftRoundComponent,
  ArrowRightRoundComponent,
} from "@/components/stuff/ArrowComponent";
import useMobileDetect from "@/hooks/useMobileDetect";
import { Thumbnail } from "@/models/Posts";
import { useAppSelector } from "@/redux-store/stores";
import { parseDateToDay } from "@/utils/functions";
import { Col, Modal, Row } from "antd";
import format from "date-fns/format";
import Image from "next/image";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Styled_GeneralInformation_Wrapper } from "./styled";
import ArrowBlack from "@/public/images/svg/arrow-right-black.svg";
import ArrowRed from "@/public/images/svg/arrow-right-red.svg";

const GeneralInformation: React.FC = () => {
  const isMobile = useMobileDetect();
  const {
    dataPosts: { map, ticket, enjoy_relax, menu, main_info },
  } = useAppSelector((state) => state.posts);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const prevRefPreview = useRef(null);
  const nextRefPreview = useRef(null);
  const [state, _setState] = useState({
    isModalVisible: false,
    selectedImage: {},
    selectedImageIndex: 0,
  });
  const setState = (data: {}) => {
    _setState({ ...state, ...data });
  };

  const showModal = (item: Thumbnail, index: number) => {
    return () => {
      setState({
        isModalVisible: true,
        selectedImage: item,
        selectedImageIndex: index,
      });
    };
  };

  useEffect(() => {
    // prevent scroll body
    setTimeout(() => {
      if (state?.isModalVisible) {
        document.getElementsByTagName("body")[0].className = "hide-scroll";
      } else {
        document.getElementsByTagName("body")[0].className = "";
      }
    });
  });

  const handleOk = () => {
    setState({ isModalVisible: false });
  };

  const handleCancel = () => {
    setState({ isModalVisible: false });
  };

  const displayUI = useMemo(() => {
    if (!main_info?.enabled && !menu?.enabled) {
      return {
        className: "",
        left: 0,
        right: 8,
        center: true,
      };
    }
    if (!ticket?.enabled && !enjoy_relax?.enabled && !map?.enabled) {
      return {
        className: "",
        left: 15,
        right: 0,
        center: true,
      };
    }
    return {
      className: "",
      left: 15,
      right: 8,
      center: false,
    };
  }, [
    main_info?.enabled,
    menu?.enabled,
    ticket?.enabled,
    enjoy_relax?.enabled,
    map?.enabled,
  ]);
  if (
    !main_info?.enabled &&
    !menu?.enabled &&
    !ticket?.enabled &&
    !enjoy_relax?.enabled &&
    !map?.enabled
  ) {
    return <></>;
  }
  return (
    <Styled_GeneralInformation_Wrapper
      justify={displayUI?.center ? "center" : undefined}
    >
      {(main_info?.enabled || menu?.enabled) && (
        <Col
          xl={displayUI?.left}
          className="general-information--information--left"
        >
          {main_info?.enabled && (
            <div className="general-information--information">
              <h1 className="general-information--common_title">
                Thông tin chung
              </h1>
              <div className="general-information--common_des">
                {main_info?.description}
              </div>
              {main_info.text_time && (
                <Row className="general-information--information_wrapper-box-1">
                  <div className="general-information--information_icon">
                    <Image
                      alt="time"
                      width={28}
                      height={28}
                      layout="intrinsic"
                      src={"/images/svg/time-circle.svg"}
                    />
                  </div>
                  <div className="general-information--common_icon-text">
                    <div className="general-information--common_title-1">
                      Giờ mở cửa
                    </div>
                    {main_info?.text_time ? (
                      <div className="general-information--common_des">
                        {main_info?.text_time}
                      </div>
                    ) : (
                      main_info?.start_time &&
                      main_info?.end_time && (
                        <div className="general-information--common_des">
                          `${parseDateToDay(new Date(main_info?.start_time))} -
                          ${parseDateToDay(new Date(main_info?.end_time))}: $
                          {format(new Date(main_info?.start_time), "HH:mm")} - $
                          {format(new Date(main_info?.end_time), "HH:mm")}`
                        </div>
                      )
                    )}
                  </div>
                </Row>
              )}
              {main_info?.address && (
                <Row className="general-information--information_wrapper-box-1">
                  <div className="general-information--information_icon">
                    <Image
                      width={28}
                      height={28}
                      layout="intrinsic"
                      alt="location"
                      src={"/images/svg/location.svg"}
                    />
                  </div>
                  <div className="general-information--common_icon-text">
                    <div className="general-information--common_title-1">
                      Địa chỉ
                    </div>
                    <div className="general-information--common_des">
                      {main_info?.address}
                    </div>
                  </div>
                </Row>
              )}
              {main_info?.hotline && (
                <Row className="general-information--information_wrapper-box-1">
                  <div className="general-information--information_icon">
                    <Image
                      width={28}
                      height={28}
                      layout="intrinsic"
                      alt="telephone"
                      src={"/images/svg/telephone.svg"}
                    />
                  </div>
                  <div className="general-information--common_icon-text">
                    <div className="general-information--common_title-1">
                      Liên hệ
                    </div>
                    <div className="general-information--common_des">
                      {main_info?.hotline}
                    </div>
                  </div>
                </Row>
              )}
            </div>
          )}
          {/* {menu?.enabled && ( */}
          <div className="general-information--menu">
            <Row align="middle" justify="space-between">
              <h1 className="general-information--common_title-1">Thực đơn</h1>
              {menu?.full_menu && (
                <div className="general-information--common_hover--arrow">
                  <ArrowBlack className="general-information--ticket_icon black" />
                  <ArrowRed className="general-information--ticket_icon red" />{" "}
                  {menu?.full_menu && (
                    <span>
                      <b>
                        <u>
                          <a
                            href={menu?.full_menu}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Xem toàn bộ
                          </a>
                        </u>
                      </b>
                    </span>
                  )}
                </div>
              )}
            </Row>
            <div>
              <Swiper
                slidesPerView={isMobile ? 2 : 3}
                spaceBetween={20}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                  type: "bullets",
                }}
                modules={[Pagination, Navigation]}
                className="general-information--information-carousel--swiper"
                onInit={(swiper: any) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
              >
                {(menu?.slide_images || []).map(
                  (item: Thumbnail, index: number) => {
                    return (
                      <SwiperSlide
                        style={{
                          height: 368,
                        }}
                        key={index}
                      >
                        <div className="banner-carousel--imggeneral-information--information-menu-img">
                          <Image
                            layout="fill"
                            objectFit="cover"
                            src={item?.url!}
                            onClick={showModal(item, index)}
                            alt="pic"
                            //   src={item?.image?.url}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  }
                )}
                <Row
                  justify="space-between"
                  className="general-wrapper-directional"
                >
                  <div className="swiper-pagination"></div>

                  <Row
                    justify="space-between"
                    align="middle"
                    className="banner-carousel--arrow general-wrapper-arrow"
                  >
                    <ArrowLeftRoundComponent
                      ref={prevRef}
                      style={{
                        marginRight: 20,
                        border: "1px solid #27272796",
                      }}
                      className="general-information--arrow-carousel"
                    />
                    <ArrowRightRoundComponent
                      ref={nextRef}
                      style={{
                        border: "1px solid #27272796",
                      }}
                      className="general-information--arrow-carousel"
                    />
                  </Row>
                </Row>
              </Swiper>
            </div>
          </div>
          {/* )} */}
        </Col>
      )}
      {(ticket?.enabled || enjoy_relax?.enabled || map?.enabled) && (
        <Col xl={displayUI?.right} className="general-information--ticket">
          {ticket?.enabled && (
            <div>
              <Row align="middle" justify="space-between">
                <div className="general-information--common_title-1">
                  Giá vé
                </div>
                <Image
                  alt="ticket-star"
                  width={32}
                  height={32}
                  src={"/images/svg/ticket-star.svg"}
                />
              </Row>
              <div className="general-information--common_des">
                {ticket?.description}
              </div>
              {ticket?.url && (
                <div className="general-information--common_hover--arrow">
                  <ArrowBlack className="general-information--ticket_icon black" />
                  <ArrowRed className="general-information--ticket_icon red" />{" "}
                  <span>
                    <b>
                      <u>
                        <a href={ticket?.url} target="_blank" rel="noreferrer">
                          Xem giá vé
                        </a>
                      </u>
                    </b>
                  </span>
                </div>
              )}
            </div>
          )}
          {enjoy_relax?.enabled && (
            <div className="general-information--common_wrapper">
              <Row align="middle" justify="space-between">
                <div className="general-information--common_title-1">
                  Tận hưởng và thư giãn
                </div>
                <Image
                  alt="award"
                  width={32}
                  height={32}
                  src={"/images/svg/award.svg"}
                />
              </Row>
              {enjoy_relax?.enjoy_content?.map((item, index) => {
                return (
                  <div
                    className="general-information--common_hover--arrow"
                    key={index}
                  >
                    <ArrowBlack className="general-information--ticket_icon black" />
                    <ArrowRed className="general-information--ticket_icon red" />{" "}
                    <span>
                      <b>
                        <u>
                          <a href={item?.url} target="_blank" rel="noreferrer">
                            {item?.title}
                          </a>
                        </u>
                      </b>
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          {map?.enabled && (
            <div className="general-information--common_wrapper">
              <Row align="middle" justify="space-between">
                <div className="general-information--common_title-1">
                  Bản đồ
                </div>
                <Image
                  alt="star"
                  width={32}
                  height={32}
                  src={"/images/svg/ticket-star.svg"}
                />
              </Row>
              <div className="general-information--common_des">
                {map?.description}
              </div>
              <Image
                width={476}
                height={324}
                alt="map"
                src={map?.thumbnail_image?.url!}
                className="general-information--map-img"
              />
              {map?.url && (
                <div className="general-information--common_hover--arrow map">
                  <ArrowBlack className="general-information--ticket_icon black" />
                  <ArrowRed className="general-information--ticket_icon red" />{" "}
                  <span>
                    <b>
                      <u>
                        <a href={map?.url} target="_blank" rel="noreferrer">
                          Xem bản đồ
                        </a>
                      </u>
                    </b>
                  </span>
                </div>
              )}
            </div>
          )}
        </Col>
      )}

      <Modal
        visible={state.isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName={"general-information--modal"}
        footer={null}
        maskStyle={{ backgroundColor: "rgb(235 235 235 / 65%)", width: "auto" }}
        style={{ top: 20 }}
        getContainer={false}
      >
        {/* <img className="banner-carousel--img" src={"/images/menu.png"} /> */}
        <Swiper
          slidesPerView={1}
          initialSlide={state?.selectedImageIndex}
          spaceBetween={30}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            renderBullet: function (index, className) {
              return (
                '<img  src="' +
                menu?.slide_images?.[index].url +
                '" class="' +
                className +
                "" +
                '">' +
                "</img>"
              );
            },
          }}
          modules={[Pagination, Navigation]}
          className="banner-carousel--swiper"
          onInit={(swiper: any) => {
            swiper.params.navigation.prevEl = prevRefPreview.current;
            swiper.params.navigation.nextEl = nextRefPreview.current;
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {(menu?.slide_images || []).map((item: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <img className="banner-carousel--img" src={item?.url} />
              </SwiperSlide>
            );
          })}
          <Row justify="center">
            <div className="swiper-pagination"></div>
          </Row>

          <ArrowLeftRoundComponent
            ref={prevRefPreview}
            style={{
              border: "1px solid #27272796",
              position: "absolute",
              top: "50%",
              zIndex: 1,
              background: "rgba(47, 47, 47, 0.6)",
            }}
          />
          <ArrowRightRoundComponent
            ref={nextRefPreview}
            style={{
              border: "1px solid #27272796",
              position: "absolute",
              top: "50%",
              right: 0,
              zIndex: 1,
              background: "rgba(47, 47, 47, 0.6)",
            }}
          />
        </Swiper>
      </Modal>
    </Styled_GeneralInformation_Wrapper>
  );
};

export default memo(GeneralInformation);
