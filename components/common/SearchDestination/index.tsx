import { ITourplaceDestination } from "@/models/Tourplace";
import { useAppSelector } from "@/redux-store/stores";
import { removeVietnameseTones } from "@/utils/functions";
import { Col, Input, Popover, Row } from "antd";
import { useRouter } from "next/router";
import React, { memo, useCallback, useMemo, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

type Props = {};

function SearchDestination({}: Props) {
  const { push } = useRouter();
  const {
    tourplace: { dataTourplace },
  } = useAppSelector((state) => state);
  const [state, _setState] = useState({
    visiblePopupSearch: false,
    keyWord: "",
    resultSearch: [],
    keyWordOriginal: "",
  });

  const setState = (data: {}) => {
    _setState({ ...state, ...data });
  };

  const onSearch = (e: any) => {
    let changedText = removeVietnameseTones(e.target.value as string);
    if (e.target.value === "") {
      setState({ keyWord: "", keyWordOriginal: "", resultSearch: [] });
      return null;
    }
    let resultSearch = dataTourplace?.data?.filter((item) => {
      return removeVietnameseTones(item.name as string)
        ?.toLowerCase()
        ?.trim()
        ?.includes(changedText.toLowerCase()?.trim());
    });
    setState({
      keyWord: changedText,
      resultSearch: resultSearch,
      keyWordOriginal: e.target.value,
    });
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
          <div className="search-destination-not-found">
            <img src="/images/search/not-found.png" />
            <div className="search-destination-not-found--text">
              Oops... không tìm thấy địa điểm
              <div>
                <span>We can’t find the location that you’re looking for</span>
              </div>
            </div>
          </div>
          <div className="search-destination-not-found--suggest-title">
            ĐỊA ĐIỂM GỢI Ý
          </div>
          <Row justify="space-between">
            {(dataTourplace?.data || [])
              .slice(0, 4)
              .map((item: ITourplaceDestination, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleRedirect(item)}
                    className={"search-item"}
                  >
                    <img
                      src={item?.featured_image?.url}
                      style={{ width: 180, height: 120, borderRadius: 10 }}
                    />
                    <div
                      style={{
                        padding: "10px 0px 10px 5px",
                        fontWeight: 700,
                        fontSize: 20,
                      }}
                    >
                      {item?.name}
                    </div>
                  </div>
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
            // let keyWord: string =itemName?.toLowerCase().search(state?.keyWord?.toLowerCase()).toString() || ""
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
              <Col
                xl={12}
                key={index}
                onClick={() => handleRedirect(item)}
                className={"search-item"}
              >
                <Row align="middle">
                  <img
                    src={item?.featured_image?.url}
                    style={{ width: 180, height: 120, borderRadius: 20 }}
                  />
                  <div
                    style={{ paddingLeft: 20, fontWeight: 700, fontSize: 20 }}
                  >
                    {firstText && <span>{firstText}</span>}
                    <span style={{ color: "#EF4444" }}>{strSearched}</span>
                    {strRemain}
                    {/* {itemName} */}
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
    } else {
      setState({
        visiblePopupSearch: true,
        keyWord: "",
        resultSearch: [],
        keyWordOriginal: ""
      });
    }
  }, [state]);

  // const handleVisibleChange = () => {
  //   if (state?.visiblePopupSearch) {
  //     setState({ visiblePopupSearch: false });
  //   }
  // };
  const handleVisibleChange = (_: boolean) => {
    // setState({ visiblePopupSearch: newVisible });
  };
  return (
    <Styled_SearchDestination_Wrapper>
      <GlobalStyled_SearchDestination />
      <Popover
        content={contentSearch}
        trigger="click"
        placement="bottom"
        // getPopupContainer={(trigger) => {
        //   return trigger;
        // }}
        overlayStyle={{ maxWidth: 830, borderRadius: 20, width: "100vw" }}
        overlayInnerStyle={{
          borderRadius: 20,
          height: 500,
          overflowY: "scroll",
        }}
        visible={state?.keyWord?.length > 0 && state?.visiblePopupSearch}
        // visible={true}
        onVisibleChange={handleVisibleChange}
        overlayClassName="search-destination--popover"
      >
        <Styled_SearchDestination_Input
          placeholder="Hà Giang, Đà Lạt, Hồ Chí Minh, ..."
          prefix={<img src="/images/search-destination-icon.png" />}
          onClick={onClickSearchInput}
          // onBlur={handleVisibleChange}
          onChange={onSearch}
          value={state?.keyWordOriginal}
          onBlur={() => {
            setTimeout(() => {
              setState({
                visiblePopupSearch: false,
                keyWord: "",
                resultSearch: [],
                keyWordOriginal: ""
              });
            },1000)
          }}
        />
      </Popover>
    </Styled_SearchDestination_Wrapper>
  );
}

export default memo(SearchDestination);

const Styled_SearchDestination_Input = styled(Input)`
  /* padding: 24px; */
  border-radius: 20px !important;
  .ant-input {
    padding: 20px 0px !important;
    font-size: 18px;
    font-weight: 400;
    color: #898989;
  }
`;
const Styled_SearchDestination_Wrapper = styled.div`
  /* padding: 24px; */
  border-radius: 20px !important;
  .ant-input {
    padding: 20px 0px !important;
    font-size: 18px;
    font-weight: 400;
    color: #898989;
  }
`;

const GlobalStyled_SearchDestination = createGlobalStyle`
  .search-destination--popover{
    .search-item{
      &:hover  {
        background: #ededed;
        border-radius: 15px;
      }
    }

    .search-destination-not-found{
      text-align: center;
      margin-top: 20px;
    }
    .search-destination-not-found--text{
      font-weight: 700;
      font-size: 32px;
      line-height: 130%;
      color: #242424;
      span{
        font-weight: 400;
        font-size: 18px;
        line-height: 178%;
        color: #898989;
      }
    }
    .search-destination-not-found--suggest-title{
      margin: 20px 0px ;
      font-weight: 600;
      font-size: 18px;
      line-height: 156%;
      color: #B91C1C;
    }
  }
`;
