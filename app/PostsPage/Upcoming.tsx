import React, { memo } from "react";
import { Col, Row } from "antd";
import styled from "styled-components";
import { useAppSelector } from "@/redux-store/stores";
import useMobileDetect from "@/hooks/useMobileDetect";
import Image from "next/image";
function Upcoming() {
  const isMobile = useMobileDetect();
  const {
    dataPosts: { upcoming },
  } = useAppSelector((state) => state.posts);
  return (
    <>
      <Styled_Upcoming_Wrapper>
        <div>
          <div className="upcoming-title">
            {isMobile ? "Các sự kiện sắp tới" : "Sắp diễn ra"}
          </div>
        </div>
        {(upcoming?.upcoming_item || []).map((item, index) => {
          return (
            <div key={index} className="upcoming-title--wrap-event">
              <Row
                justify="space-between"
                gutter={!isMobile ? [50, 50] : [0, 0]}
              >
                <Col xs={24} xl={8} className="upcoming-title--date-wrap">
                  <div className="upcoming-title--date-date">
                    {item?.start_date &&
                      item?.end_date &&
                      `${new Date(item?.start_date).getDate()} - ${new Date(
                        item?.end_date
                      ).getDate()}`}
                  </div>
                  <div className="upcoming-title--date-month">
                    {item?.start_date &&
                      item?.end_date &&
                      `Tháng ${
                        new Date(item?.start_date).getMonth() + 1
                      }, ${new Date(item?.end_date).getFullYear()}`}
                  </div>
                </Col>
                <Col xs={24} xl={8} className="upcoming-title--content-wrap">
                  <div className="upcoming-title--content-title">
                    {item?.title}
                  </div>
                  <div className="upcoming-title--content-content">
                    {item?.description}
                  </div>
                </Col>

                <Col xs={24} xl={8} className="upcoming-title--img">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    alt="thumbnail"
                    src={item?.thumbnail_image?.[0]?.url!}
                    className="upcoming-title--img-img"
                  />
                </Col>
              </Row>
            </div>
          );
        })}
      </Styled_Upcoming_Wrapper>
    </>
  );
}
export default memo(Upcoming);

const Styled_Upcoming_Wrapper = styled.div`
  padding: 50px;
  .upcoming-title {
    font-size: 32px;
    font-weight: 700;
  }
  .upcoming-title--date-date {
    font-size: 56px;
    font-weight: 700;
    color: #565656;
  }
  .upcoming-title--date-month {
    font-weight: 600;
    font-size: 32px;
    color: #b0b0b0;
  }
  .upcoming-title--content-title {
    font-weight: 600;
    font-size: 40px;
    color: #0e7490;
  }
  .upcoming-title--date-month {
    font-weight: 400;
    font-size: 20px;
    color: #565656;
  }

  .upcoming-title--img {
    height: 258px;
    position: relative;
    &-img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
  .upcoming-title--wrap-event {
    margin-top: 40px;
  }
  @media screen and (max-width: 1023px) {
    padding: 0px 16px;
    .upcoming-title {
      font-size: 24px;
      font-weight: 700;
    }
    .upcoming-title--date-wrap {
      order: 2;
      .upcoming-title--date-date {
        font-size: 32px;
        font-weight: 700;
      }
      .upcoming-title--date-month {
        font-size: 18px;
        font-weight: 700;
        color: #b0b0b0;
      }
    }
    .upcoming-title--content-wrap {
      order: 3;
      .upcoming-title--content-title {
        font-weight: 700;
        font-size: 20px;
        color: #0e7490;
      }
      .upcoming-title--content-content {
        font-weight: 400;
        font-size: 14px;
        color: #565656;
      }
    }
    .upcoming-title--img {
      order: 1;
      height: 232px;
    }
    .upcoming-title--wrap-event {
      margin-top: 10px;
    }
  }
`;
