import useMobileDetect from "@/hooks/useMobileDetect";
import { Col, Row } from "antd";
import { memo, useRef } from "react";
import { EffectCoverflow, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatPrice } from "../../../utils/functions";
import {
  Styled_DataPackageComponent_Info_Package,
  Styled_DataPackageComponent_WrapperMobile,
  Styled_DataPackageComponent_WrapperPackage,
} from "./styled";
interface Props {
  backgroundColor?: string;
}
const DataPackageComponent: React.FC<Props> = ({ backgroundColor }) => {
  const isMobile = useMobileDetect();

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const dataPackage = [
    {
      title: "A68",
      description: [
        "Data tốc độ cao 3GB/ngày trong 30 ngày",
        "Thời hạn sử dụng: 30 ngày",
        "Miễn phí kích hoạt",
      ],
      price: 118000,
    },
    {
      title: "A50",
      description: [
        <div key={"dataPackage-1"}>
          Data 4G <b>không giới hạn</b> tại Việt Nam
        </div>,
        <div key={"dataPackage-2"}>
          Luôn giữ kết nối với <b>35 phút liên mạng và 120 phút nội mạng</b>{" "}
          Mobifone/Local{" "}
        </div>,
        "Thời hạn sử dụng: 30 ngày",
        "Miễn phí kích hoạt",
      ],
      price: 0,
      className: "active",
    },
    {
      title: "A89",
      description: [
        "Data tốc độ cao 4GB/ngày trong 30 ngày",
        "Thoại: 1000 phút nội mạng Mobifone/Local",
        "Thời hạn sử dụng: 30 ngày",
        "Miễn phí kích hoạt",
      ],
      price: 139000,
    },
  ];

  const dataPackageMobile = [
    {
      title: "A50",
      description: [
        <div key={"dataPackageMobile-1"}>
          Data 4G <b>không giới hạn</b> tại Việt Nam
        </div>,
        <div key={"dataPackageMobile-2"}>
          Luôn giữ kết nối với <b>35 phút liên mạng và 120 phút nội mạng</b>{" "}
          Mobifone/Local{" "}
        </div>,
        "Thời hạn sử dụng: 30 ngày",
        "Miễn phí kích hoạt",
      ],
      price: 0,
      className: "active",
    },
    {
      title: "A68",
      description: [
        "Data tốc độ cao 3GB/ngày trong 30 ngày",
        "Thời hạn sử dụng: 30 ngày",
        "Miễn phí kích hoạt",
      ],
      price: 118000,
      className: "normal",
    },
    {
      title: "A89",
      description: [
        "Data tốc độ cao 4GB/ngày trong 30 ngày",
        "Thoại: 1000 phút nội mạng Mobifone/Local",
        "Thời hạn sử dụng: 30 ngày",
        "Miễn phí kích hoạt",
      ],
      price: 139000,
      className: "normal",
    },
  ];

  return (
    <div
      id="data-package"
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "transparent",
        paddingBottom: 35
      }}
    >
      <Styled_DataPackageComponent_Info_Package>
        <div className="data-package_info-title">Gói cước du lịch</div>
        <div className="data-package_info-sub-title">
          Gói cước 4G không giới hạn, đồng hành cùng bạn ghi lại và chia sẻ trọn
          vẹn mọi trải nghiệm khám phá!
        </div>
      </Styled_DataPackageComponent_Info_Package>

      {isMobile ? (
        <Styled_DataPackageComponent_WrapperMobile>
          <Swiper
            effect={"coverflow"}
            initialSlide={0}
            // loop={true}
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={40}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 1,
              // slideShadows: true,
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
              type: "bullets",
            }}
            modules={[Navigation, EffectCoverflow, Pagination]}
            onInit={(swiper: any) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {(dataPackageMobile || []).map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className={
                    item?.className
                      ? `${item?.className} data-package_column`
                      : "data-package_column"
                  }
                >
                  <div>
                    {item?.className === "active" && (
                      <div className="data-package--most-popular">
                        NỔI BẬT NHẤT
                      </div>
                    )}
                    <div className="data-package_column--wrapper">
                      {item.title && <h1>{item.title}</h1>}
                      {(item?.description || []).map((description, index) => {
                        return (
                          <div className="data-package_description" key={index}>
                            <img
                              src={
                                item?.className === "active"
                                  ? "/images/check-circle-white.png"
                                  : "/images/check-circle-red.png"
                              }
                            />
                            {description}
                          </div>
                        );
                      })}
                      <Row
                        justify="space-between"
                        align="middle"
                        className="data-package_price--wrapper"
                      >
                        <div className="data-package_price--title">
                          Giá cước
                        </div>
                        <div className="data-package_price">
                          {item?.price
                            ? formatPrice({
                                locale: "vi",
                                number: item?.price || 0,
                              })
                            : "XXX.000đ"}
                        </div>
                      </Row>
                      <div className="data-package_button">
                        <button
                          onClick={() => window.open(`https://buy.mylocal.vn/`)}
                        >
                          Mua ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
            {/* <Row
              justify="center"
              align="middle"
              className="outstanding-destination-wrapper-directional"
            > */}
            <div className="swiper-pagination"></div>
            {/* </Row> */}
          </Swiper>
        </Styled_DataPackageComponent_WrapperMobile>
      ) : (
        <Styled_DataPackageComponent_WrapperPackage>
          {dataPackage.map((item, index) => {
            return (
              <Col
                span={7}
                key={index}
                className={
                  item?.className
                    ? `${item?.className} data-package_column`
                    : "data-package_column"
                }
              >
                {item?.className === "active" && (
                  <div className="data-package--most-popular">NỔI BẬT NHẤT</div>
                )}
                <div className="data-package_column--wrapper">
                  {item.title && <h1>{item.title}</h1>}
                  {(item?.description || []).map((description, index) => {
                    return (
                      <div className="data-package_description" key={index}>
                        <img
                          src={
                            item?.className === "active"
                              ? "/images/check-circle-white.png"
                              : "/images/check-circle-red.png"
                          }
                        />
                        {description}
                      </div>
                    );
                  })}
                  <Row
                    justify="space-between"
                    align="middle"
                    className="data-package_price--wrapper"
                  >
                    <div className="data-package_price--title">Giá cước</div>
                    <div className="data-package_price">
                      {item?.price
                        ? formatPrice({
                            locale: "vi",
                            number: item?.price || 0,
                          })
                        : "XXX.000đ"}
                    </div>
                  </Row>
                  <div className="data-package_button">
                    <button
                      onClick={() => window.open(`https://buy.mylocal.vn/`)}
                    >
                      Mua ngay
                    </button>
                  </div>
                </div>
              </Col>
            );
          })}
        </Styled_DataPackageComponent_WrapperPackage>
      )}
    </div>
  );
};

export default memo(DataPackageComponent);
