import { Col, Row } from "antd";
import { STYLE_UTILS, VERSION_STYLE_1 } from "../../styles";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Styled_MapHomeComponent_Container,
  Styled_MapHomeComponent_Location,
} from "./styled";
import { Pagination, Navigation } from "swiper";
import {
  ArrowLeftRoundComponent,
  ArrowRightRoundComponent,
} from "@/components/stuff/ArrowComponent";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ButtonComponent from "@/components/stuff/ButtonComponent";
import useMobileDetect from "@/hooks/useMobileDetect";
import { useAppSelector } from "@/redux-store/stores";
import { DestinationType } from "@/models/Destination";
import { useRouter } from "next/router";
import { cloneDeep } from "lodash";
import Image from "next/image";
import WhiteLogo from "@/public/images/svg/arrow-right-white.svg";
// import vnTopo from '@/public/geo-data/vn.json'
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   Marker,
//   ZoomableGroup,
// } from 'react-simple-maps';
const MapHomeComponent: React.FC = () => {
  const isMobile = useMobileDetect();
  const { push } = useRouter();
  const { listTourPlaces } = useAppSelector((state) => state.home);
  const [state, _setState] = useState<{ locationSelected: DestinationType }>({
    locationSelected: {},
  });
  const setState = (data: {}) => {
    _setState({ ...state, ...data });
  };
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperNameRef = useRef<any>({});

  const onMouseEnterMap = useCallback(
    (item: any, index: number) => {
      return () => {
        if ((index || index === 0) && swiperNameRef.current && !isMobile) {
          swiperNameRef.current && swiperNameRef?.current?.slideTo(index);
        }
        setState({ locationSelected: item });
      };
    },
    [state.locationSelected, swiperNameRef.current]
  );

  const onClickLocation = (item: any, _: boolean) => {
    return () => {
      // if (mobile) {
      push(`/khamphavietnam/${item?.slug}`, undefined, { scroll: true });
      // }
    };
  };

  const onMouseLeave = useCallback(
    (_: any) => {
      return () => {
        // setState({ locationSelected: locationMap[0] });
      };
    },
    [state.locationSelected]
  );

  const locationMapCustom = [
    {
      key: 1,
      top: 10,
      left: 135,
      left_arrow: "20%",
      title: "Hà Giang",
      icon: "/images/location.png",
      slug: "ha-giang",
    },
    {
      key: 2,
      top: 35,
      left: 60,
      width: 110,
      left_arrow: "20%",
      title: "Sapa",
      slug: "sapa",
      icon: "/images/location.png",
    },
    {
      key: 3,
      top: 50,
      left: 270,
      left_arrow: "10%",
      title: "Quảng Ninh",
      icon: "/images/location.png",
      slug: "quang-ninh",
    },
    {
      key: 4,
      top: 100,
      left: 10,
      left_arrow: "75%",
      title: "Mộc Châu",
      icon: "/images/location.png",
      slug: "moc-chau",
    },
    {
      key: 5,
      top: 70,
      left: 155,
      left_arrow: "10%",
      title: "Hà Nội",
      icon: "/images/location.png",
      slug: "ha-noi",
    },
    {
      key: 6,
      top: 120,
      left: 200,
      left_arrow: "10%",
      title: "Hải Phòng",
      icon: "/images/location.png",
      slug: "hai-phong",
    },
    {
      key: 7,
      top: 330,
      left: 200,
      left_arrow: "60%",
      title: "Huế",
      icon: "/images/location.png",
      slug: "hue",
    },
    {
      key: 8,
      top: 350,
      left: 280,
      left_arrow: "10%",
      title: "Đà Nẵng",
      icon: "/images/location.png",
      slug: "da-nang",
    },
    {
      key: 9,
      top: 380,
      left: 300,
      left_arrow: "10%",
      title: "Hội An",
      icon: "/images/location.png",
      slug: "hoi-an",
    },
    {
      key: 10,
      top: 520,
      left: 350,
      left_arrow: "5%",
      title: "Nha Trang",
      icon: "/images/location.png",
      slug: "nha-trang",
    },
    {
      key: 11,
      top: 565,
      left: 280,
      left_arrow: "5%",
      title: "Đà Lạt",
      icon: "/images/location.png",
      slug: "da-lat",
    },
    {
      key: 12,
      top: 620,
      left: 180,
      left_arrow: "25%",
      title: "Hồ Chí Minh",
      icon: "/images/location.png",
      slug: "tp-ho-chi-minh",
    },
    {
      key: 13,
      top: 670,
      left: 170,
      left_arrow: "25%",
      title: "Cần Thơ",
      icon: "/images/location.png",
      slug: "can-tho",
    },
    {
      key: 14,
      top: 650,
      left: 20,
      left_arrow: "55%",
      title: "Phú Quốc",
      icon: "/images/location.png",
      slug: "phu-quoc",
    },
    {
      key: 15,
      top: 330,
      left: 430,
      left_arrow: "55%",
      title: (
        <div className="map_container-location">
          <span>
            Quần đảo Hoàng Sa
            <div> (Đà Nẵng)</div>
          </span>{" "}
        </div>
      ),
      icon: "/images/Star.png",
      slug: "hoang-sa",
    },
    {
      key: 16,
      top: 700,
      left: 400,
      left_arrow: "55%",
      title: (
        <div className="map_container-location">
          <span>
            Quần đảo Trường Sa
            <div>(Khánh Hoà)</div>
          </span>{" "}
        </div>
      ),
      slug: "truong-sa",
      icon: "/images/Star.png",
    },
  ];

  const locationMap = useMemo(() => {
    if (listTourPlaces) {
      return [
        ...listTourPlaces
          .concat(locationMapCustom)
          .reduce(
            (m, o) => m.set(o.slug, Object.assign(m.get(o.slug) || {}, o)),
            new Map()
          )
          .values(),
      ];
    }
    return [];
  }, [listTourPlaces, locationMapCustom]);
  const locationMapMobileCustom = [
    {
      key: 5,
      top: 38,
      left: 80,
      left_arrow: "10%",
      title: "Hà Nội",
      icon: "/images/location.png",
      slug: "ha-noi",
    },
    {
      key: 1,
      top: -14,
      left: 70,
      left_arrow: "20%",
      title: "Hà Giang",
      icon: "/images/location.png",
      slug: "ha-giang",
    },
    {
      key: 2,
      top: 8,
      left: 25,
      // width: 110,
      left_arrow: "20%",
      title: "Sapa",
      icon: "/images/location.png",
      slug: "sapa",
    },
    {
      key: 3,
      top: 19,
      left: 169,
      left_arrow: "10%",
      title: "Quảng Ninh",
      icon: "/images/location.png",
      slug: "quang-ninh",
    },
    {
      key: 4,
      top: 50,
      left: -4,
      left_arrow: "75%",
      title: "Mộc Châu",
      icon: "/images/location.png",
      slug: "moc-chau",
    },

    {
      key: 6,
      top: 63,
      left: 129,
      left_arrow: "10%",
      title: "Hải Phòng",
      icon: "/images/location.png",
      slug: "hai-phong",
    },
    {
      key: 7,
      left: 127,
      top: 215,
      left_arrow: "60%",
      title: "Huế",
      icon: "/images/location.png",
      slug: "hue",
    },
    {
      key: 8,
      top: 232,
      left: 180,
      left_arrow: "10%",
      title: "Đà Nẵng",
      icon: "/images/location.png",
      slug: "da-nang",
    },
    {
      key: 9,
      top: 250,
      left: 190,
      left_arrow: "20%",
      title: "Hội An",
      icon: "/images/location.png",
      slug: "hoi-an",
    },
    {
      key: 10,
      top: 335,
      left: 195,
      left_arrow: "38%",
      title: "Nha Trang",
      icon: "/images/location.png",
      slug: "nha-trang",
    },
    {
      key: 11,
      top: 367,
      left: 182,
      left_arrow: "5%",
      title: "Đà Lạt",
      icon: "/images/location.png",
      slug: "da-lat",
    },
    {
      key: 12,
      top: 410,
      left: 112,
      left_arrow: "25%",
      title: "Hồ Chí Minh",
      icon: "/images/location.png",
      slug: "tp-ho-chi-minh",
    },
    {
      key: 13,
      top: 446,
      left: 106,
      left_arrow: "25%",
      title: "Cần Thơ",
      icon: "/images/location.png",
      slug: "can-tho",
    },
    {
      key: 14,
      top: 427,
      left: -5,
      left_arrow: "80%",
      title: "Phú Quốc",
      icon: "/images/location.png",
      slug: "phu-quoc",
    },
    {
      key: 15,
      top: 206,
      left: 277,
      left_arrow: "55%",
      title: (
        <div className="map_container-location">
          {isMobile ? (
            ""
          ) : (
            <span>
              Quần đảo Hoàng Sa
              <div> (Đà Nẵng)</div>
            </span>
          )}
        </div>
      ),
      icon: "/images/Star.png",
      slug: "hoang-sa",
    },
    {
      key: 16,
      top: 485,
      left: 250,
      left_arrow: "55%",
      title: (
        <div className="map_container-location">
          {isMobile ? (
            ""
          ) : (
            <span>
              Quần đảo Trường Sa
              <div>(Khánh Hoà)</div>
            </span>
          )}
        </div>
      ),
      icon: "/images/Star.png",
      slug: "truong-sa",
    },
  ];
  const locationMapMobile = useMemo(() => {
    if (listTourPlaces) {
      return [
        ...listTourPlaces
          .concat(locationMapMobileCustom)
          .reduce(
            (m, o) => m.set(o.slug, Object.assign(m.get(o.slug) || {}, o)),
            new Map()
          )
          .values(),
      ];
    }
    return [];
  }, [listTourPlaces, locationMapMobileCustom]);

  useEffect(() => {
    // default values
    if (
      Object?.keys(state?.locationSelected).length === 0 &&
      locationMap?.[0]?.slide_image?.[0]
    ) {
      setState({ locationSelected: locationMap?.[0] });
    }
  }, [locationMap, state?.locationSelected]);

  // const markers = [
  //   {
  //     name: "Hà giang",
  //     coordinates: [104.98357, 22.82333],
  //     markerOffset: 15,
  //   },
  // ];

  return (
    <div>
      <Styled_MapHomeComponent_Container>
        {!isMobile && (
          <Col lg={13} sm={24} className="map_left">
            <div>
              <div className={"map_left--location"}>Việt Nam</div>
              <Swiper
                navigation={true}
                modules={[Navigation]}
                onSwiper={(swiper) => (swiperNameRef.current = swiper)}
                onSlideChange={(swiperCore) => {
                  const { activeIndex } = swiperCore;
                  setState({ locationSelected: locationMap?.[activeIndex] });
                }}
              >
                {(cloneDeep(locationMap)?.slice(0, -2) || [])?.map(
                  (item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className={"map_left--destination"}>
                          <span onClick={onClickLocation(item, false)}>
                            {item?.name}
                          </span>
                        </div>
                      </SwiperSlide>
                    );
                  }
                )}
              </Swiper>

              <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                  type: "bullets",
                }}
                modules={[Pagination, Navigation]}
                className="map_left--slide"
                onInit={(swiper: any) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
              >
                {(state?.locationSelected?.slide_image || [])?.map(
                  (item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        {item?.image?.url && (
                          <div className="map_left--slide_img">
                            <Image
                              src={item?.image?.url}
                              alt="map_left"
                              layout="fill"
                            />
                          </div>
                        )}
                        <div className="map_left--slide_title">
                          {item?.image_name}
                        </div>
                      </SwiperSlide>
                    );
                  }
                )}
                <Row
                  justify="space-between"
                  align="middle"
                  className="map_left--pagination"
                >
                  <div className="swiper-pagination"></div>
                  <div>
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
              <div className="map_left--description">
                {state?.locationSelected?.description}
              </div>
              <ButtonComponent
                text={
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      push(
                        `/khamphavietnam/${state?.locationSelected?.slug}`,
                        undefined,
                        { scroll: true }
                      )
                    }
                  >
                    <span>Khám phá</span> <WhiteLogo />
                  </div>
                }
              />
            </div>
          </Col>
        )}
        <Col lg={11} xs={24} className="map_right">
          {/* <img src="/images/map.png" className="map_right--img-maps"/> */}
          {(isMobile ? locationMapMobile : locationMap).map((item, index) => {
            return (
              <Styled_MapHomeComponent_Location
                key={item.key}
                width={item.width}
                top={item.top}
                left={item.left}
                color={STYLE_UTILS[VERSION_STYLE_1].colorMapTitle}
                left_arrow={item.left_arrow}
                onMouseEnter={onMouseEnterMap(item, index)}
                onMouseLeave={onMouseLeave(item)}
                onClick={onClickLocation(item, isMobile)}
                className={`${
                  item?.key === 15 || item?.key === 16
                    ? "island"
                    : ` ${
                        state?.locationSelected?.slug === item?.slug
                          ? "active"
                          : ""
                      }`
                }`}
                style={
                  item?.slug === "truong-sa" || item?.slug === "hoang-sa"
                    ? { pointerEvents: "none", alignItems: "center" }
                    : { cursor: "pointer", alignItems: "center" }
                }
              >
                <div className={`map_location--wrap`}>
                  <Image
                    src={item.icon}
                    className="map_location"
                    alt="location"
                    width={20}
                    height={20}
                    layout="responsive"
                  />
                  {item?.key === 15 || item?.key === 16 ? (
                    ""
                  ) : (
                    <div className="map_location--overlay">
                      <Image
                        src={"/images/location-white.png"}
                        alt="overlay"
                        width={20}
                        height={20}
                        layout="responsive"
                      />
                    </div>
                  )}
                </div>
                <span className="map_title">{item.title}</span>
              </Styled_MapHomeComponent_Location>
            );
          })}
        </Col>
        {/* <Col xl={12}>
          <ComposableMap
            projectionConfig={{ scale: 2500 }}
            width={1000}
            height={1000}
          // style={{
          //   width: '100%',
          //   height: 'auto',
          // }}
          >
            <ZoomableGroup center={[104, 14]}>
              <Geographies geography={vnTopo}>
                {({ geographies, projection }) => {
                  return geographies.map(
                    (geography, i) =>
                      geography.id !== 'ATA' && (
                        <Geography
                          key={i}
                          geography={geography}
                          style={{
                            default: {
                              fill: '#EDEDED',
                              stroke: 'white',
                              strokeWidth: 0.75,
                              outline: 'none',
                              background: "#EDEDED"
                            },
                            hover: {
                              fill: '#e6dfd9',
                              stroke: '#212529',
                              strokeWidth: 0.75,
                              outline: 'none',
                            },
                          }}
                        />
                      ),
                  )
                }
                }
              </Geographies>

              {markers.map(({ name, coordinates, markerOffset }) => (
                <Marker key={name} coordinates={[coordinates[0], coordinates[1]]}>
                  <g
                    fill="none"
                    stroke="#FF5533"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(-12, -24)"
                  >
                    <circle cx="12" cy="10" r="3" />
                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                  </g>
                  <text
                    textAnchor="middle"
                    // y={markerOffset}
                    x="40" y="-5" className="small"
                    style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                  >
                    {name}
                  </text>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </Col> */}
      </Styled_MapHomeComponent_Container>
    </div>
  );
};

export default memo(MapHomeComponent);
