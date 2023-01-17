import React, { memo, useEffect, useState } from "react";
import { isIOS } from "react-device-detect";
import styled from "styled-components";
import Image from "next/image";

interface Props {}

const BannerAbout: React.FC<Props> = () => {
  const [state, _setState] = useState({
    isIOS: false,
  });
  const setState = (data: {}) => {
    _setState({ ...state, ...data });
  };
  useEffect(() => {
    if (isIOS) {
      setState({
        isIOS: true,
      });
    }
  }, []);
  return (
    <Styled_BannerAbout_Wrapper>
      <Styled_BannerAbout_Container>
        {state?.isIOS ? (
          <Image
            src={
              "https://dtt9gnpt0fl6t.cloudfront.net/CMS/2022/8/ezgif_com_gif_maker_9d7a69641d.gif"
            }
            alt="/images/about-page/banner.gif"
            className={"home__banner"}
            style={{ width: "100%", height: "280px" }}
          />
        ) : (
          <Styled_BannerAbout_Video autoPlay={true} muted={true} loop={true}>
            <source
              src="https://dtt9gnpt0fl6t.cloudfront.net/CMS/2022/8/KPVN_3d2ce899e0.mp4"
              type="video/mp4"
            ></source>
          </Styled_BannerAbout_Video>
        )}
        <Styled_BannerAbout_BannerTitle className="banner--component-title">
          VỀ LOCAL
        </Styled_BannerAbout_BannerTitle>
      </Styled_BannerAbout_Container>
    </Styled_BannerAbout_Wrapper>
  );
};

export default memo(BannerAbout);

const Styled_BannerAbout_Video = styled.video`
  width: 100%;
`;

const Styled_BannerAbout_Container = styled.div`
  position: relative;
`;

const Styled_BannerAbout_BannerTitle = styled.div`
  position: absolute;
  left: 50px;
  bottom: 0px;
  font-weight: 900;
  font-size: 180px;
  color: white;
`;

const Styled_BannerAbout_Wrapper = styled.div<{
  format?: string;
}>`
  @media screen and (max-width: 1023px) {
    .banner--component-title {
      font-weight: 900;
      font-size: 64px;
      left: 10px;
    }
  }
`;
