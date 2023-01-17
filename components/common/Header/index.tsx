import { Col, Dropdown, Menu, Popover, Row, Space } from "antd";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
  memo,
} from "react";
import Link from "next/link";
import { DownOutlined, UpOutlined, SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { STYLE_UTILS, VERSION_STYLE_1 } from "../../../styles";
import { useAppDispatch, useAppSelector } from "@/redux-store/stores";
import { useRouter } from "next/router";
import { ITourplaceDestination } from "@/models/Tourplace";
import useMobileDetect from "@/hooks/useMobileDetect";
import MobileHeader from "./MobileHeader";
import SearchPosts from "../SearchPosts";
import Image from "next/image";
const HeaderComponent: React.FC = () => {
  const isMobile = useMobileDetect();
  const {
    push,
    query: { destinationId, postsId },
    pathname,
  } = useRouter();
  // type CountdownHandle = React.ElementRef<any>;
  // const ref = React.useRef<CountdownHandle>(null);
  const searchPostsRef = useRef<any>();

  const [state, _setState] = useState({
    isExtends: false,
    visibleDestination: false,
    isSearchPostsModal: false,
    isHoverKey: "",
  });
  const setState = (data: {}) => {
    _setState({ ...state, ...data });
  };
  const { fetchTourplace } = useAppDispatch().tourplace;
  const { updateData } = useAppDispatch().destination;
  const { dataTourplace } = useAppSelector((state) => state.tourplace);

  useEffect(() => {
    if (dataTourplace && dataTourplace?.data?.length === 0) {
      fetchTourplace();
    }
  }, []);

  const handleExtends = useCallback(() => {
    setState({ isExtends: !state.isExtends, visibleDestination: true });
  }, [state?.isExtends, state?.visibleDestination]);

  const handleRedirectPopup = useCallback(
    (item: ITourplaceDestination) => {
      if (destinationId === item?.slug && !postsId) {
        setState({ visibleDestination: false });
        return null;
      }
      updateData({
        dataDestination: { category_info: [] },
        dataOutstanding: [],
        isLoadingBannerDestination: false,
      });
      setState({ visibleDestination: false });
      push(
        {
          pathname: `/khamphavietnam/${item?.slug}`,
        },
        undefined,
        { shallow: true, scroll: true }
      );
    },
    [dataTourplace?.data, postsId, destinationId]
  );

  const selectedKeysMenu = useMemo(() => {
    if (destinationId) {
      return "location";
    } else if (pathname.includes("ve-local")) {
      return "about";
    }
    return "home";
  }, [destinationId, pathname]);

  const handleVisibleChangeDestination = (newVisible: boolean) => {
    setState({ visibleDestination: newVisible });
  };

  const contentDestination = () => {
    return (
      <div>
        <div className="header-title">Điểm đến nổi bật</div>
        <Row gutter={[16, 16]}>
          {state.isExtends ? (
            (dataTourplace?.data || []).map((item, index) => {
              return (
                <Col
                  style={{ flex: "0 0 20%" }}
                  className={`header--point`}
                  // className={`header--point ${destinationId == item.slug ? "active" : ""
                  //   }`}
                  key={index}
                  onClick={() => handleRedirectPopup(item)}
                >
                  {item?.name}
                </Col>
              );
            })
          ) : (
            <>
              <Col span={12}>
                <Row>
                  {(dataTourplace?.data?.slice(0, 10) || []).map(
                    (item, index) => {
                      return (
                        <Col
                          span={12}
                          className={`header--point`}
                          // className={`header--point ${destinationId == item.slug ? "active" : ""
                          //   }`}
                          key={index}
                          onClick={() => handleRedirectPopup(item)}
                        >
                          {item?.name}
                        </Col>
                      );
                    }
                  )}
                </Row>
              </Col>
              <Col span={12}>
                <Row gutter={[16, 16]}>
                  {(dataTourplace?.data?.slice(10, 14) || []).map(
                    (item, index) => {
                      return (
                        <Col
                          span={12}
                          key={index}
                          onClick={() => handleRedirectPopup(item)}
                        >
                          <div
                            className={`header--point destination`}
                            // className={`header--point destination ${
                            //   destinationId == item.slug ? "active" : ""
                            // }`}
                          >
                            {" "}
                            {item?.name}
                          </div>
                          {item?.featured_image?.url && (
                            <Image
                              src={item?.featured_image?.url}
                              className="header--destination-img"
                              alt="feature-img"
                              height={72}
                              width={128}
                              layout="responsive"
                            />
                          )}
                          <div className="header--overclay-img"></div>
                        </Col>
                      );
                    }
                  )}
                </Row>
              </Col>
            </>
          )}
        </Row>
        <div className="header-destination-extend" onClick={handleExtends}>
          {state.isExtends ? (
            <div>
              Thu gọn <UpOutlined />
            </div>
          ) : (
            <div>
              Mở rộng <DownOutlined />
            </div>
          )}
        </div>
      </div>
    );
  };
  const utilitiesMenu = (
    <Menu
      items={[
        // {
        //   key: "1",
        //   label: (
        //     <span
        //       onClick={() => {
        //         document.getElementById("data-package")?.scrollIntoView({
        //           behavior: "smooth",
        //         });
        //       }}
        //     >
        //       Gói cước du lịch
        //     </span>
        //   ),
        // },
        // {
        //   type: "divider",
        // },
        {
          key: "2",
          label: "Sim số đẹp",
          onClick: () => window.open("https://buy.mylocal.vn/"),
        },
        {
          type: "divider",
        },
        {
          key: "3",
          label: "myLocal.vn",
          onClick: () => {
            document.getElementById("data-package")?.scrollIntoView({
              behavior: "smooth",
            }),
              window.open("https://mylocal.vn/");
          },
        },
      ]}
    />
  );

  const onMouseEnter = (str: string) => {
    return () => {
      if (state?.isHoverKey != str) {
        setState({ isHoverKey: str });
      }
    };
  };

  const menuItems = [
    {
      key: "home",
      label: <Link href={"/khamphavietnam"}>Trang chủ</Link>,
    },
    {
      key: "location",
      label: (
        <Styled_HeaderComponent_DestinationPopover
          content={contentDestination()}
          visible={state?.visibleDestination}
          onVisibleChange={handleVisibleChangeDestination}
          // trigger="click"
          getPopupContainer={(trigger) => {
            return trigger;
          }}
        >
          <Space
            onMouseEnter={onMouseEnter("location")}
            onMouseLeave={onMouseEnter("")}
          >
            <span>Điểm đến</span>
            {state?.isHoverKey === "location" ? (
              <UpOutlined />
            ) : (
              <DownOutlined />
            )}
          </Space>
        </Styled_HeaderComponent_DestinationPopover>
      ),
    },
    {
      key: "utilities",
      // icon: <LogoutOutlined />,
      label: (
        <Styled_HeaderComponent_Utilities
          overlay={utilitiesMenu}
          overlayClassName="header-menu"
          // trigger={["click"]}
          getPopupContainer={(trigger) => {
            return trigger;
          }}
        >
          <Space
            onMouseEnter={onMouseEnter("utilities")}
            onMouseLeave={onMouseEnter("")}
          >
            Tiện ích
            {state?.isHoverKey === "utilities" ? (
              <UpOutlined />
            ) : (
              <DownOutlined />
            )}
          </Space>
        </Styled_HeaderComponent_Utilities>
      ),
    },
    {
      key: "about",
      // icon: <LogoutOutlined />,
      label: <Link href={"/khamphavietnam/ve-local"}>Về Local</Link>,
    },
  ];
  return (
    <>
      {isMobile ? (
        <MobileHeader />
      ) : (
        <>
          <Styled_HeaderComponent_Header
            backgroundcolor={STYLE_UTILS[VERSION_STYLE_1].backgroundColorHeader}
          >
            <Styled_HeaderComponent_Row justify="space-between" align="middle">
              <Link href={"/khamphavietnam"} className="logo">
                <Image
                  src="/images/logo.png"
                  width={120}
                  height={33}
                  alt="logo"
                  layout="intrinsic"
                />
              </Link>
              <Menu
                selectedKeys={[selectedKeysMenu]}
                mode="horizontal"
                defaultSelectedKeys={["home"]}
                items={menuItems}
              ></Menu>
              <div
                className="search"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  searchPostsRef.current.show();
                }}
              >
                <SearchOutlined />
                <span>Tìm kiếm</span>
              </div>
            </Styled_HeaderComponent_Row>
          </Styled_HeaderComponent_Header>
          <SearchPosts ref={searchPostsRef} />
        </>
      )}
    </>
  );
};

export default memo(HeaderComponent);

const Styled_HeaderComponent_Header = styled.header<{
  backgroundcolor: string;
}>`
  background-color: ${(props) => props.backgroundcolor};
  position: fixed !important;
  width: 100%;
  height: 80px;
  line-height: 80px;
  padding: 0 70px;
  z-index: 10;
  backdrop-filter: blur(8px);
  .search {
    font-size: 16px;
    color: white;
    span {
      margin-left: 15px;
    }
  }
  .logo {
    cursor: pointer;
  }
`;

const Styled_HeaderComponent_Row = styled(Row)`
  .ant-menu-root {
    background-color: transparent;
    border-bottom: unset !important;
    width: 500px;
    a {
      color: white;
      font-size: 16px;
    }
  }
  .ant-menu-item {
    &:hover {
      &::after {
        border-bottom: 2px solid #ef4444 !important;
      }
      color: #ef4444;
    }
    &-selected {
      &::after {
        border-bottom: 2px solid #ef4444 !important;
      }
    }
  }
  .ant-dropdown-trigger {
    &:hover {
      color: #ef4444 !important;
    }
  }
  .ant-space-item {
    color: white;
    font-size: 16px;
  }
  .ant-menu-title-content {
    &:hover {
      a {
        color: white;
      }
    }
  }
`;

const Styled_HeaderComponent_Utilities = styled(Dropdown)`
  .header-menu {
    border-radius: 15px;
    .ant-dropdown-menu {
      border-radius: 15px;
      left: 0px;
      top: 25px;
      width: 150px;
      &-title-content {
        &:hover {
          color: #ef4444;
        }
      }
      &-item {
        &:hover {
          border-radius: 15px;
          background-color: transparent;
        }
      }
    }
  }
`;

const Styled_HeaderComponent_DestinationPopover = styled(Popover)`
  .ant-popover-arrow {
    display: none;
  }
  .ant-popover-inner {
    border-radius: 10px;
    white-space: nowrap;
    width: 740px;
  }
  .ant-popover-inner-content {
    padding: 32px;
  }
  .header--destination-img {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
  }
  .header-destination-extend {
    font-size: 14px;
    font-weight: 500;
    text-align: right;
    color: #b0b0b0;
    margin-top: 20px;
    cursor: pointer;
  }
  .header--point {
    margin-top: 24px;
    font-size: 16px;
    font-weight: 400;
    font-family: SFProText;
    cursor: pointer;
    &.destination {
      position: absolute;
      color: white;
      bottom: 10px;
      left: 20px;
      font-size: 14px;
      font-weight: 600;
      font-family: SFProText;
      z-index: 1;
    }
    &:hover {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      color: #ef4444;
    }
    &.active {
      color: #ef4444;
    }
  }
  .header-title {
    font-size: 24px;
    font-weight: 600;
  }
  .header--overclay-img {
    position: absolute;
    width: calc(100% - 16px);
    height: 100%;
    z-index: 0;
    background-color: black;
    top: 0;
    opacity: 0.3;
    border-radius: 10px;
  }
`;
