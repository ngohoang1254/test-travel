import React, { memo } from "react";
import FooterComponent from "../../components/common/FooterComponent";
import HeaderComponent from "../../components/common/Header";
import LayoutComponent from "../../components/common/LayoutComponent";
import AboutLocal from "./AboutLocal";
import BannerAbout from "./BannerAbout";
import Contact from "./Contact";

const AboutPage: React.FC = () => {
  return (
    <>
      <HeaderComponent />
      <LayoutComponent>
        <BannerAbout />

        <AboutLocal />

        {/* <DestinationCount /> */}

        <Contact />

        {/* <DataPackageComponent /> */}

        <FooterComponent />
      </LayoutComponent>
    </>
  );
};

export default memo(AboutPage);
