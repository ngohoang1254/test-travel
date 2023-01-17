import ButtonComponent from "@/components/stuff/ButtonComponent";
import { ITourplaceDestination } from "@/models/Tourplace";
import { useAppSelector } from "@/redux-store/stores";
import { removeVietnameseTones } from "@/utils/functions";
import { Col, Drawer, Input, Row } from "antd";
import { useRouter } from "next/router";
import React, { memo, useCallback, useMemo, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

type Props = {};

function SearchDestinationMobile({}: Props) {
  const { push } = useRouter();
  const {
    tourplace: { dataTourplace },
  } = useAppSelector((state) => state);
  const [state, _setState] = useState({
    visiblePopupSearch: false,
    keyWord: "",
    resultSearch: [],
  });
  const setState = (data: {}) => {
    _setState({ ...state, ...data });
  };

  const onSearch = (e: any) => {
    let changedText = removeVietnameseTones(e.target.value as string);

    if (e.target.value === "") {
      setState({ keyWord: changedText, resultSearch: [] });
      return null;
    }
    let resultSearch = dataTourplace?.data?.filter((item) => {
      return removeVietnameseTones(item.name as string)
        ?.toLowerCase()
        ?.trim()
        ?.includes(changedText.toLowerCase()?.trim());
    });
    setState({ keyWord: changedText, resultSearch: resultSearch });
  };

  const handleRedirect = useCallback(
    (item: ITourplaceDestination) => {

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

  const contentSearch = useMemo(() => {
    if (state?.keyWord && state?.resultSearch?.length === 0) {
      return (
        <div>
          <div className="search-destination-mobile-not-found">
            <img src="/images/search/not-found.png" />
            <div className="search-destination-mobile-not-found--text">
              Oops... không tìm thấy địa điểm
              <div>
                <span>Hãy tìm kiếm địa điểm khác để Local giúp bạn</span>
              </div>
            </div>
          </div>
          <div className="search-destination-mobile-not-found--suggest-title">
            ĐỊA ĐIỂM GỢI Ý
          </div>
          <Row justify="space-between" gutter={[20, 20]}>
            {(dataTourplace?.data || [])
              .slice(0, 4)
              .map((item: ITourplaceDestination, index) => {
                return (
                  <Col
                    span={24}
                    key={index}
                    onClick={() => handleRedirect(item)}
                  >
                    <img
                      src={item?.featured_image?.url}
                      style={{ width: 80, height: 60, borderRadius: 15 }}
                    />
                    <span
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
                      {item?.name}
                    </span>
                  </Col>
                );
              })}
          </Row>
        </div>
      );
    }
    return (
      <Row gutter={[30, 30]}>
        {(state?.resultSearch || [])?.map(
          (item: ITourplaceDestination, index: number) => {
            // let keyWord: string = item?.name?.toLowerCase().search(state?.keyWord?.toLowerCase()).toString() || ""
            const getStartEnd = (str: string, sub: string) => [
              str.indexOf(sub),
              str.indexOf(sub) + sub.length,
            ];
            const itemNameChangedRemove = removeVietnameseTones(
              item?.name as string
            )?.trimEnd();

            const startEndIndexStr = getStartEnd(
              itemNameChangedRemove?.toLowerCase() as string,
              state?.keyWord?.toLowerCase().trimEnd() as string
            );

            const firstText =
              startEndIndexStr?.[0] > 0 &&
              item?.name?.slice(0, startEndIndexStr?.[0]);

            const strSearched = item?.name?.slice(
              startEndIndexStr?.[0],
              startEndIndexStr?.[1]
            );

            const strRemain = item?.name?.slice(startEndIndexStr?.[1]);
            return (
              <Col span={24} key={index} onClick={() => handleRedirect(item)}>
                <Row align="middle">
                  <img
                    src={item?.featured_image?.url}
                    style={{ width: 80, height: 60, borderRadius: 15 }}
                  />
                  <div
                    style={{ paddingLeft: 20, fontWeight: 700, fontSize: 14 }}
                  >
                    {firstText && <span>{firstText}</span>}
                    <span style={{ color: "#EF4444" }}>{strSearched}</span>
                    {strRemain}
                  </div>
                </Row>
              </Col>
            );
          }
        )}
      </Row>
    );
  }, [state?.keyWord, state?.resultSearch, dataTourplace?.data]);

  const onClickSearchInput = useCallback(() => {
    if (state?.visiblePopupSearch === false) {
      setState({ visiblePopupSearch: true, resultSearch: dataTourplace?.data });
    }
  }, []);
  return (
    <>
      <Styled_SearchDestinationMobile_Wrapper id="search-destination-mobile">
        <Styled_SearchDestinationMobile_Global />
        <ButtonComponent
          style={{ marginTop: 10 }}
          styleButton={{ padding: "7px 20px", fontSize: 16, fontWeight: 500 }}
          text={
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                onClickSearchInput();
              }}
            >
              <span>Tìm điểm đến</span>{" "}
              <span>
                <img src="/images/svg/arrow-right-white.svg" />
              </span>
            </div>
          }
        />
        <Drawer
          placement="right"
          // width={"100vw"}
          zIndex={11}
          closable={false}
          // getContainer={false}
          visible={state?.visiblePopupSearch || false}
          // afterVisibleChange={(visible) => {
          //   if (visible) {
          //     document.getElementsByTagName('body')[0].classList.toggle('hide-scroll')
          //   } else{
          //     document.getElementsByTagName('body')[0].className = ""
          //   }
          // }}
        >
          <Row
            align="middle"
            onClick={() => {
              setState({ visiblePopupSearch: false });
            }}
          >
            <span className="search-destination-mobile--back">&#8592;</span>
            <span className="search-destination-mobile--back-text">
              Tìm kiếm
            </span>
          </Row>
          <Input
            placeholder="Nhập từ khoá cần tìm..."
            className="search-destination-mobile--input"
            onChange={onSearch}
          />
          {contentSearch}
        </Drawer>
      </Styled_SearchDestinationMobile_Wrapper>
    </>
  );
}

export default memo(SearchDestinationMobile);

const Styled_SearchDestinationMobile_Global = createGlobalStyle`
    .search-destination-mobile--input {
      margin: 12px 0px;
      padding: 16px 20px;
      gap: 10px;

      height: 40px;

      background: #f6f6f6;
      border-radius: 12px;
      border-color: transparent;
    }
    /* search */
    .search-destination-mobile--back {
      font-size: 17px;
      margin-right: 12px;
    }
    .search-destination-mobile--back-text {
      font-size: 28px;
      font-weight: 600;
    }
    .search-destination-mobile-wrapper-input {
      position: relative;
    }
    .search-destination-mobile-icon-input {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }
    .search-destination-mobile-input {
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
    .search-destination-mobile-result-img {
      width: 72px;
      height: 72px;
      border-radius: 15px;
    }
    .search-destination-mobile-result-title {
      font-size: 14px;
      font-weight: 700;
      padding-left: 20px;
    }

    /* notfound */
    .search-destination-mobile-not-found {
      text-align: center;
      margin-top: 20px;
    }
    .search-destination-mobile-not-found--text {
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
    .search-destination-mobile-not-found--suggest-title {
      margin: 20px 0px;
      font-weight: 600;
      font-size: 14PX;
      line-height: 156%;
      color: #b91c1c;
    }
    .search-destination-mobile-not-found--item {
      cursor: pointer;
      &:hover {
        background: #ededed;
        border-radius: 15px;
      }
    }
    .search-destination-mobile-wrap--item {
      cursor: pointer;
      &:hover {
        background: #ededed;
        border-radius: 15px;
      }
    }
`;

const Styled_SearchDestinationMobile_Wrapper = styled.div``;
