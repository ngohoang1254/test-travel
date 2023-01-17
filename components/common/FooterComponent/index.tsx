import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import {
  Styled_FooterComponent_CopyRight,
  Styled_FooterComponent_Wrapper,
} from "./styled";
interface Props {}

const FooterComponent: React.FC<Props> = ({}) => {
  return (
    <>
      <Styled_FooterComponent_Wrapper>
        <div className="footer_component">
          <div className={"footer_component--logo"}>
            <Image
              width={86}
              height={38}
              alt="logo"
              src={"/images/logo-local.png"}
            />
          </div>

          <Row className="footer_component--about">
            <Col xs={24} xl={9}>
              <ul>
                <li>
                  <Link href={"/khamphavietnam/ve-local"}>Về Local</Link>
                </li>
                <li>Điểm đến</li>
                <li>Tiện ích</li>
              </ul>
            </Col>
            <Col xs={24} xl={7} className="footer_component--about-download">
              <div className="footer_component--about-download--title">
                Tải ứng dụng Local
              </div>
              <span className="footer_component--about-download--wrap">
                <a
                  href="https://apps.apple.com/us/app/mylocal-vn/id1543101669"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    width={91}
                    height={23}
                    alt="app-store"
                    src={"/images/app-store.png"}
                  />
                </a>
              </span>
              <span className="footer_component--about-download--wrap">
                <a
                  href="https://play.google.com/store/apps/details?id=com.mylocal.vn"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    width={91}
                    height={23}
                    alt="app-store"
                    src={"/images/ch-play.png"}
                  />
                </a>
              </span>
            </Col>
            <Col xs={24} xl={7} className="footer_component--about-social">
              <div className="footer_component--about-social--title">
                Kết nối với chúng tôi
              </div>
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <a
                  href=" https://zalo.me/1137261962097606994"
                  target="_blank"
                  rel="noreferrer"
                  className="img"
                >
                  <Image
                    width={21}
                    height={22}
                    layout="intrinsic"
                    alt="zalo"
                    src={"/images/social/zalo.png"}
                  />
                </a>

                <a
                  href="https://www.facebook.com/mangdidongLocal"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    width={21}
                    height={22}
                    layout="intrinsic"
                    alt="facebook"
                    src={"/images/social/facebook.png"}
                  />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCZONDd1joVBOWtiW8y-PO1A"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    width={24}
                    height={18}
                    layout="intrinsic"
                    alt="youtube"
                    src={"/images/social/youtube.png"}
                  />
                </a>
              </div>
            </Col>
          </Row>

          <hr />

          <Row className="footer_component--info">
            <Col xs={24} xl={9} className="footer_component--info-company">
              <div className="footer_component--info-company--wrapper-1">
                <div className="footer_component--info-company--title">
                  Chịu trách nhiệm nội dung:
                </div>
                <div className="footer_component--info-company--text">
                  Ông Quách Mạnh Lâm, Phó Tổng giám đốc
                </div>
              </div>
              <div>
                <span className="footer_component--info-company--text">
                  Email:
                </span>{" "}
                <span className="footer_component--info-company--title">
                  lamquach@asimtelecom.vn
                </span>
              </div>
              <div>
                <span className="footer_component--info-company--text">
                  Điện thoại:
                </span>{" "}
                <span className="footer_component--info-company--title">
                  0934 551 602
                </span>
              </div>

              <div className="footer_component--info-company--title company">
                Công ty Cổ phần Viễn thông ASIM
              </div>
              <div className="footer_component--info-company--wrapper-2">
                <div className="footer_component--info-company--text">
                  Trụ sở chính: Toà nhà VPBank, Số 05, Điện Biên Phủ, Quận Ba
                  Đình, Hà Nội.
                </div>
                <div className="footer_component--info-company--text">
                  Trụ sở HCM: Số 18 Nguyễn Văn Mại, Quận Tân Bình, TP Hồ Chí
                  Minh.
                </div>
              </div>
            </Col>

            <Col xs={24} xl={4} className="footer_component--info-hotline">
              <div className="footer_component--info-hotline--title">
                Tổng đài
              </div>
              <div className="footer_component--info-hotline--text">
                1900 1900 (Nhánh 01)
              </div>
              <div>
                <span className="footer_component--info-hotline--text">
                  Email:
                </span>{" "}
                <span className="footer_component--info-hotline--text">
                  lamquach@asimtelecom.vn
                </span>
              </div>
            </Col>

            <Col xs={24} xl={7} className="footer_component--info-certificate">
              <div className="footer_component--info-certificate--first">
                Giấy chứng nhận đăng ký kinh doanh số 0315981331 do Sở Kế hoạch
                và Đầu tư TP Hồ Chí Minh cấp lần đầu ngày 24/10/2019, đăng ký
                thay đổi lần thứ 6 ngày 21/10/2021
              </div>
              <div>
                Giấy phép thiết lập Trang thông tin điện tử tổng hợp số
                19/GP-STTTT do Sở thông tin & Truyền thông Tp Hồ Chí Minh cấp
                ngày 15/4/2022
              </div>
            </Col>
            <Col className="footer_component--info-verified">
              <Image
                width={152}
                height={57}
                alt="veri"
                src="/images/verified.png"
              />
            </Col>
          </Row>
        </div>
        {/* <div className="footer_component--social">
          <img src="/images/social/messenger.png" />
        </div> */}
      </Styled_FooterComponent_Wrapper>
      <Styled_FooterComponent_CopyRight>
        <div>Copyright © 2021 ASIM</div>
      </Styled_FooterComponent_CopyRight>
    </>
  );
};

export default memo(FooterComponent);
