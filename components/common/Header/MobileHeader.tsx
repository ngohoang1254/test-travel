import { ITourplaceDestination } from "@/models/Tourplace";
import { useAppDispatch, useAppSelector } from "@/redux-store/stores";
import { STYLE_UTILS, VERSION_STYLE_1 } from "@/styles";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Col, Collapse, Drawer, Input, Row, Spin } from "antd";
import { debounce } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import Image from "next/image";

const MobileHeader = () => {
  const {
    tourplace: { dataTourplace },
    posts: { dataSearchPosts, searchParams, dataSuggestNotFound },
  } = useAppSelector((state) => state);
  const { searchPosts, scrollSearchPosts } = useAppDispatch().posts;
  const {
    push,
    query: { destinationId },
  } = useRouter();
  const [state, _setState] = useState({
    isExtends: false,
    visible: false,
    visibleSearch: false,
  });
  const setState = (data: {}) => {
    _setState({ ...state, ...data });
  };
  const showDrawer = () => {
    setState({ visible: true });
  };

  const onClose = () => {
    setState({ visible: false });
  };

  useEffect(() => {
    // prevent scroll body
    setTimeout(() => {
      if (document.getElementsByClassName("ant-drawer-open")[0]) {
        document.getElementsByTagName("body")[0].className = "hide-scroll";
      } else {
        document.getElementsByTagName("body")[0].className = "";
      }
    });
  });

  const handleRedirectSearch = (item: any) => {
    setState({ visible: false, visibleSearch: false });

    push(
      {
        pathname: `/khamphavietnam/posts/${item?.slug}`,
      },
      undefined,
      { shallow: true, scroll: true }
    );
  };

  const handleRedirectPopup = useCallback(
    (item: ITourplaceDestination) => {
      setState({ visible: false });

      push(
        {
          pathname: `/khamphavietnam/${item?.slug}`,
        },
        undefined,
        { shallow: true, scroll: true }
      );
    },
    [dataTourplace?.data]
  );
  const handleExtends = useCallback(() => {
    setState({ isExtends: !state.isExtends, visible: true });
  }, [state?.isExtends]);

  const onChange = debounce((e: any) => {
    searchPosts({
      keySearch: "title_contains",
      keyWord: e.target.value,
      _limit: 10,
      _start: 0,
    });
  }, 700);

  const fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(async () => {
      const newStart = dataSearchPosts?.data?.length;
      await scrollSearchPosts({
        ...searchParams,
        _start: newStart,
      });
    }, 1500);
  };

  return (
    <Styled_HeaderComponent_Header_Wrapper id="header-mobile">
      <Styled_HeaderComponent_Header
        backgroundcolor={STYLE_UTILS[VERSION_STYLE_1].backgroundColorHeader}
      >
        <Styled_HeaderComponent_Row justify="space-between" align="middle">
          <Link href={"/khamphavietnam"} className="logo">
            <Image src="/images/logo.png" width={70} height={20} alt="logo" />
          </Link>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Image
              onClick={() => {
                setState({ visibleSearch: true });
                document
                  .getElementsByTagName("body")[0]
                  .classList.toggle("hide-scroll");
              }}
              style={{ marginRight: 15 }}
              width={24}
              height={24}
              alt="search"
              src="/images/search/search-white.png"
            />

            <Image
              onClick={showDrawer}
              width={24}
              height={24}
              alt="search"
              src={"/images/svg/sort.svg"}
            />
          </div>
        </Styled_HeaderComponent_Row>
      </Styled_HeaderComponent_Header>

      <Drawer
        placement="right"
        onClose={onClose}
        visible={state.visible}
        closable={false}
        getContainer={false}
        width={"calc(100% - 80px)"}
        zIndex={10}
      >
        <Link href={"/khamphavietnam"}>
          <a className="header--title">Trang chủ</a>
        </Link>

        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => (
            <DownOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse"
          expandIconPosition={"end"}
        >
          <Collapse.Panel
            header={<div className="header--title">Điểm đến</div>}
            key="1"
            className="site-collapse-custom-panel"
          >
            <div>
              <div className="header--title_child">Điểm đến nổi bật</div>
              {state.isExtends ? (
                <Row className="header--child-container-1">
                  {(dataTourplace?.data || []).map((item, index) => {
                    return (
                      <Col
                        span={12}
                        className={`header--point ${
                          destinationId == item.slug ? "active" : ""
                        }`}
                        key={index}
                        onClick={() => handleRedirectPopup(item)}
                      >
                        {item?.name}
                      </Col>
                    );
                  })}
                </Row>
              ) : (
                <>
                  <div className="header--child-container-1">
                    {(dataTourplace?.data?.slice(0, 10) || []).map(
                      (item, index) => {
                        return (
                          <div
                            className={`header--point ${
                              destinationId == item.slug ? "active" : ""
                            }`}
                            key={index}
                            onClick={() => handleRedirectPopup(item)}
                          >
                            {item?.name}
                          </div>
                        );
                      }
                    )}
                  </div>
                  <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                    {(dataTourplace?.data?.slice(10, 14) || []).map(
                      (item, index) => {
                        return (
                          <Col
                            span={12}
                            key={index}
                            onClick={() => handleRedirectPopup(item)}
                          >
                            <div
                              className={`mobile-header--point destination ${
                                destinationId == item.slug ? "active" : ""
                              }`}
                            >
                              {" "}
                              {item?.name}
                            </div>
                            <div className="header--destination-img">
                              {item?.featured_image?.url && (
                                <Image
                                  alt="feature"
                                  layout="fill"
                                  src={item?.featured_image?.url}
                                />
                              )}
                            </div>
                            <div className="header--overclay-img"></div>
                          </Col>
                        );
                      }
                    )}
                  </Row>
                </>
              )}
              <div
                className="header-destination-extend"
                onClick={handleExtends}
              >
                {state.isExtends ? (
                  <div>
                    Thu gọn <UpOutlined />
                  </div>
                ) : (
                  <div>
                    Xem toàn bộ <DownOutlined />
                  </div>
                )}
              </div>
            </div>
          </Collapse.Panel>
        </Collapse>
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => (
            <DownOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse"
          expandIconPosition={"end"}
        >
          <Collapse.Panel
            header={<div className="header--title">Tiện ích</div>}
            key="1"
            className="site-collapse-custom-panel"
          >
            <div className="header--child-container-1">
              {/* <div
                className={`header--point`}
                onClick={() => {
                  setState({ visible: false });
                  document.getElementById("data-package")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Gói cước du lịch
              </div> */}
              <div
                className={`header--point`}
                onClick={() => {
                  setState({ visible: false });
                  window.open("https://buy.mylocal.vn/");
                }}
              >
                SIM số đẹp
              </div>
              <a
                className={`header--point`}
                onClick={() => {
                  setState({ visible: false });
                  document.getElementById("data-package")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  window.open("https://mylocal.vn/");
                }}
              >
                myLocal.vn
              </a>
            </div>
          </Collapse.Panel>
        </Collapse>
        <Link href={"/khamphavietnam/ve-local"}>
          <a
            className="header--title"
            style={{ paddingTop: 10, display: "block" }}
          >
            Về Local
          </a>
        </Link>
      </Drawer>

      {/*drawer search  */}
      <Drawer
        placement="right"
        width={"100vw"}
        zIndex={11}
        closable={false}
        getContainer={false}
        visible={state?.visibleSearch || false}
        className="header-search"
      >
        <Row
          align="middle"
          onClick={() => {
            setState({ visibleSearch: false });
            document
              .getElementsByTagName("body")[0]
              .classList.toggle("hide-scroll");
          }}
        >
          <span className="header-search--back">&#8592;</span>
          <span className="header-search--back-text">Tìm kiếm</span>
        </Row>
        <Input
          placeholder="Nhập từ khoá cần tìm..."
          className="header--input"
          onChange={onChange}
        />
        <div style={{ textAlign: "right", fontSize: 12, color: "#898989" }}>
          {dataSearchPosts?.total} kết quả
        </div>

        {dataSearchPosts?.data?.length > 0 && (
          <InfiniteScroll
            dataLength={(dataSearchPosts?.data || []).length} //This is important field to render the next data
            next={fetchMoreData}
            hasMore={dataSearchPosts?.data?.length < searchParams?._total}
            loader={<Spin spinning={true} size="large" />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            height={"calc(100vh - 200px)"}
            style={{ overflowX: "hidden" }}
          >
            <Row style={{ marginTop: 20 }}>
              {(dataSearchPosts?.data || [])?.map((item, index) => {
                const getStartEnd = (str: string, sub: string) => [
                  str.indexOf(sub),
                  str.indexOf(sub) + sub.length,
                ];
                const startEndIndexStr = getStartEnd(
                  item?.title?.toLowerCase() as string,
                  searchParams?.keyWord?.toLowerCase() as string
                );
                const firstText =
                  startEndIndexStr?.[0] > 0 &&
                  item?.title?.slice(0, startEndIndexStr?.[0]);
                const strSearched = item?.title?.slice(
                  startEndIndexStr?.[0],
                  startEndIndexStr?.[1]
                );
                const strRemain = item?.title?.slice(startEndIndexStr?.[1]);
                return (
                  <Col
                    span={24}
                    key={index}
                    style={{ marginTop: 20, marginBottom: 20 }}
                    className="header-search-wrap--item"
                    onClick={() => handleRedirectSearch(item)}
                  >
                    <Row align="middle" gutter={[20, 20]}>
                      <Col span={6}>
                        <div
                          className="header-search-result-img"
                          style={{
                            width: 72,
                            height: 72,
                            position: "relative",
                          }}
                        >
                          {item?.thumbnail?.url && (
                            <Image
                              alt="search-img"
                              objectFit="cover"
                              layout="fill"
                              src={item?.thumbnail?.url}
                            />
                          )}
                        </div>
                      </Col>
                      <Col span={18} className="header-search-result-title">
                        {firstText && <span>{firstText}</span>}
                        <span style={{ color: "#EF4444" }}>{strSearched}</span>
                        {strRemain}
                      </Col>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </InfiniteScroll>
        )}
        {searchParams?._total === 0 && (
          <div>
            <div className="header-search-not-found">
              <Image
                width={128}
                height={128}
                alt="not-found"
                src="/images/search/not-found.png"
              />
              <div className="header-search-not-found--text">
                Oops... không tìm thấy bài viết
                <div>
                  <span>Hãy tìm kiếm từ khoá khác để Local giúp bạn</span>
                </div>
              </div>
            </div>
            <div className="header-search-not-found--suggest-title">
              BÀI VIẾT GỢI Ý
            </div>
            <Row justify="space-between" gutter={[30, 30]}>
              {(dataSuggestNotFound || [])?.map((item: any, index) => {
                return (
                  <Col
                    xl={24}
                    key={index}
                    onClick={() => handleRedirectSearch(item)}
                    className="header-search-not-found--item"
                  >
                    <Row align="middle" wrap={false}>
                      <Col xl={4}>
                        <div
                          style={{
                            width: 72,
                            height: 72,
                          }}
                        >
                          <Image
                            objectFit="cover"
                            alt="searchNotFound"
                            layout="fill"
                            src={item?.thumbnail?.url}
                            style={{
                              borderRadius: 20,
                            }}
                          />
                        </div>
                      </Col>
                      <Col
                        xl={19}
                        style={{
                          paddingLeft: 20,
                          fontWeight: 700,
                          fontSize: 14,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          width: 250,
                        }}
                      >
                        {item?.title}
                      </Col>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}
      </Drawer>
    </Styled_HeaderComponent_Header_Wrapper>
  );
};
export default memo(MobileHeader);

const Styled_HeaderComponent_Header = styled.header<{
  backgroundcolor: string;
}>`
  background-color: ${(props) => props.backgroundcolor};
  position: fixed !important;
  width: 100%;
  height: 70px;
  line-height: 70px;
  padding: 0 20px;
  backdrop-filter: blur(8px);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .search {
    font-size: 16px;
    color: white;
    span {
      margin-left: 15px;
    }
  }
`;

const Styled_HeaderComponent_Header_Wrapper = styled.header`
  .header--destination-img {
    width: 100%;
    height: 124px;
    position: relative;
    img {
      border-radius: 15px;
    }
  }
  .header--title {
    font-size: 14px;
    font-weight: 600;
    color: black;
  }
  .header--title_child {
    font-size: 16px;
    font-weight: 600;
    padding-left: 40px;
  }
  .header--point {
    padding-left: 40px;
    border-radius: 20px;
    &.active {
      background: #ff4b5a;
      color: white;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .mobile-header--point {
    border-radius: 20px;
    &.destination {
      position: absolute;
      color: white;
      bottom: 10px;
      left: 20px;
      font-size: 12px;
      font-weight: 500;
      z-index: 1;
    }

    &.active {
      color: #ff4b5a;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .header--child-container-1 {
    /* padding: 0px 24px; */
    line-height: 50px;
    &.box {
      margin-top: 20px;
    }
  }
  .header--point {
    font-size: 14px;
    font-weight: 400;
  }
  .header-destination-extend {
    text-align: end;
    font-size: 12px;
    font-weight: 500;
    color: #1d4ed8;
    padding-top: 20px;
  }
  .site-collapse-custom-collapse {
    background-color: white;
    margin-top: 12px;
    .ant-collapse-header {
      padding-left: 0px;
      padding-top: 0px;
      padding-bottom: 0px;
    }
  }
  .ant-collapse-content-box {
    padding: 0px;
  }
  .ant-drawer {
    /* width: 200px; */
  }
  .header--input {
    margin: 12px 0px;
    padding: 16px 20px;
    gap: 10px;

    height: 40px;

    background: #f6f6f6;
    border-radius: 12px;
    border-color: transparent;
  }
  /* search */
  .header-search--back {
    font-size: 17px;
    margin-right: 12px;
  }
  .header-search--back-text {
    font-size: 28px;
    font-weight: 600;
  }
  .header-search-wrapper-input {
    position: relative;
  }
  .header-search-icon-input {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
  .header-search-input {
    background: #f6f6f6;
    border-radius: 15px;
    border: 1px solid #f6f6f6;
    outline: none;
    /* height: 50px; */
    padding: 24px;
    padding-left: 60px;
    font-size: 20px;
    &:hover {
      outline: none;
    }
    &:focus {
      outline: none;
    }
  }
  .header-search-result-img {
    width: 72px;
    height: 72px;
    position: relative;
    img {
      border-radius: 15px;
    }
  }
  .header-search-result-title {
    font-size: 14px;
    font-weight: 700;
    padding-left: 20px;
  }

  /* notfound */
  .header-search-not-found {
    text-align: center;
    margin-top: 20px;
  }
  .header-search-not-found--text {
    font-weight: 700;
    font-size: 18px;
    line-height: 156%;
    color: #242424;
    span {
      font-weight: 400;
      font-size: 14px;
      line-height: 178%;
      color: #898989;
    }
  }
  .header-search-not-found--suggest-title {
    margin: 20px 0px;
    font-weight: 600;
    font-size: 14px;
    line-height: 156%;
    color: #b91c1c;
  }
  .header-search-not-found--item {
    cursor: pointer;
    &:hover {
      background: #ededed;
      border-radius: 15px;
    }
  }
  .header-search-wrap--item {
    cursor: pointer;
    &:hover {
      background: #ededed;
      border-radius: 15px;
    }
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

const Styled_HeaderComponent_Row = styled(Row)`
  flex: 1;
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
