import { useAppDispatch, useAppSelector } from "@/redux-store/stores";
import React, { memo, useEffect } from "react";
import BannerComponent from "../../components/common/BannerComponent";
// import DataPackageComponent from "../../components/common/DataPackageComponent";
import FooterComponent from "../../components/common/FooterComponent";
import HeaderComponent from "../../components/common/Header";
import LayoutComponent from "../../components/common/LayoutComponent";
import MapHomeComponent from "./Map.home";
import useMobileDetect from "@/hooks/useMobileDetect";

const HomePage: React.FC = () => {
  const { listDontMiss } = useAppSelector((state) => state.home);
  const { fetchHomeNews, fetchTourPlaces } = useAppDispatch().home;
  const isMobile = useMobileDetect();

  useEffect(() => {
    fetchHomeNews();
    fetchTourPlaces();
  }, []);
  
  return (
    <>
      {/* {!isLoadingBannerHome && <SpinComponent isLoading={true} />} */}
      <HeaderComponent />
      <LayoutComponent>
        <BannerComponent
          img={"/images/carousel.png"}
          bannerTitle={"Khám phá Việt Nam cùng Local"}
          bannerSubTitle={
            "Khắc họa một Việt Nam gần gũi, thân thương và sống động qua những câu chuyện giàu bản sắc văn hóa của từng địa phương"
          }
          key={"HomePage-1"}
          haveCarousel={true}
          swiper={{
            list: listDontMiss,
          }}
          isSeach={true}
          onLoadBanner={() => {
            // updateData({
            //   isLoadingBannerHome: true,
            // });
            setTimeout(() => {
              window.scrollTo(0, 0);
            }, 700);
          }}
        />
        <MapHomeComponent />

        <BannerComponent
          img={isMobile ? "/images/banner-mobile.jpg" : "/images/banner.png"}
          bannerTitle={"Việt Nam, Đi và Yêu"}
          bannerSubTitle={
            "Bước chân lên mỗi mảnh đất trên hình chữ S nhiệm màu để yêu thêm đất nước, con người Việt Nam."
          }
          key={"HomePage-2"}
          breakpointsTitle={{
            2560: {
              top: "50%",
            },
            1023: {
              top: "50%",
            },
          }}
        />

        {/* <DataPackageComponent /> */}

        <FooterComponent />
      </LayoutComponent>
    </>
  );
};

export default memo(HomePage);
