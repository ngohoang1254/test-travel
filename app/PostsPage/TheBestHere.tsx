import React, { memo } from "react";
import { Col, Row } from "antd";
import styled from "styled-components";
import { useAppSelector } from "@/redux-store/stores";
import useMobileDetect from "@/hooks/useMobileDetect";
import Image from "next/image";

interface Props {}

function TheBestHere({}: Props) {
  const isMobile = useMobileDetect();
  const { dataPosts } = useAppSelector((state) => state.posts);
  const { best_yummy } = dataPosts || [];
  return (
    <>
      <Styled_TheBestHere_Title className="the-best-here--title">
        Ngon nhất ở đây
      </Styled_TheBestHere_Title>
      <Styled_TheBestHere_Wrapper gutter={[20, 20]}>
        {((best_yummy && best_yummy?.yummy_content) || []).map(
          (item, index) => {
            return (
              <React.Fragment key={index}>
                <Col xl={isMobile ? 6 : 12} className="the-best-here">
                  <div className="the-best-here--container">
                    <div className="the-best-here--img">
                      <Image
                        alt="thumbnail"
                        layout="fill"
                        objectFit="cover"
                        src={item?.thumbnail_image?.url!}
                      />
                    </div>
                    <div className="the-best-here--overlay"></div>
                  </div>
                  <p className="the-best-here--text">{item?.title}</p>
                </Col>
              </React.Fragment>
            );
          }
        )}
      </Styled_TheBestHere_Wrapper>
    </>
  );
}

export default memo(TheBestHere);

const Styled_TheBestHere_Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  padding-left: 50px;
  margin-top: 70px;
  @media screen and (max-width: 1023px) {
    margin-top: 10px;
    padding-left: 10px;
    margin-bottom: 15px;
    font-size: 24px;
    font-weight: 700;
  }
`;
const Styled_TheBestHere_Wrapper = styled(Row)`
  padding: 50px;
  justify-content: center;
  margin: 0px !important;
  .the-best-here {
    height: 410px;
    line-height: 410px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 15px;
    }
  }
  .the-best-here--text {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    font-size: 36px;
    font-weight: 700;
    color: white;
    text-align: center;
  }
  .the-best-here--overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    background-color: black;
    opacity: 0.3;
    border-radius: 15px;
  }
  .the-best-here--free {
    font-size: 64px;
    font-weight: 700;
    text-align: left;
    color: #2f2f2f;
  }
  .the-best-here--container {
    position: relative;
    height: 100%;
    width: 100%;
  }
  @media screen and (max-width: 1023px) {
    padding: 0px;
    .the-best-here {
      padding: 0px;
      height: 100%;
      line-height: unset;
    }
    .the-best-here--img {
      width: 166px !important;
      height: 134px !important;
    }
    .the-best-here--overlay {
      width: 166px !important;
      height: 134px !important;
    }
    .the-best-here--text {
      font-size: 12px;
      font-weight: 500;
      height: 20px;
      bottom: 0;
      top: unset;
      text-align: left;
      padding-left: 20px;
    }
  }
`;
