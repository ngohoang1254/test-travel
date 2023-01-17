import { useAppDispatch, useAppSelector } from "@/redux-store/stores";
import { Col, Input, Row, Spin } from "antd";
import Modal from "antd/lib/modal/Modal";
import { debounce } from "lodash";
import React, { useState, useRef, forwardRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import { useRouter } from "next/router";

const SearchPosts: React.ForwardRefRenderFunction<any, any> = (
  _,
  forwardedRef
) => {
  const { push } = useRouter();
  const { dataSearchPosts, searchParams, dataSuggestNotFound } = useAppSelector(
    (state) => state.posts
  );
  const { searchPosts, scrollSearchPosts, fetchSuggestPosts,updateData } =
    useAppDispatch().posts;
  const [state, _setState] = useState({
    isOpen: false,
  });
  const setState = (data: {}) => {
    _setState({ ...state, ...data });
  };
  const refCallback = useRef<() => void>();
  const toggleOpenModal = () => {
    setState({
      isOpen: !state?.isOpen,
    });
  };

  useEffect(() => {
    fetchSuggestPosts({});
  }, []);
  
  useEffect(() => {
    if(!state?.isOpen){
      updateData({
        dataSearchPosts: {
          data: [],
          total: 0
        },
        searchParams: {}
      })
    }else{
      setTimeout(() => {
        document.getElementById('inputSearchPost')?.focus()
      }, 300)
    }
  },[state?.isOpen])

  React.useImperativeHandle(forwardedRef, () => ({
    show: (_: any, callBack: () => void) => {
      refCallback.current && callBack && (refCallback.current = callBack);
      toggleOpenModal();
    },
  }));

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
  const handleRedirect = (item: any) => {
    push(
      {
        pathname: `/khamphavietnam/posts/${item?.slug}`,
      },
      undefined,
      { shallow: true, scroll: true }
    );
    toggleOpenModal()
  };
  return (
    <Styled_SearchPosts_Wrapper>
      <Modal
        visible={state?.isOpen}
        onOk={() => toggleOpenModal()}
        onCancel={() => toggleOpenModal()}
        width={1000}
        closeIcon={<div style={{ color: "white" }}>X</div>}
        getContainer={false}
        footer={false}
      >
        <div className="search-posts-wrapper-input">
          <img
            src="/images/search/search.png"
            className="search-posts-icon-input"
          />
          <Input
            id="inputSearchPost"
            placeholder="Nhập từ khoá cần tìm..."
            className="search-posts-input"
            onChange={onChange}
          />
        </div>
        {dataSearchPosts?.data?.length > 0 && (
          <>
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
              height={400}
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
                      xl={12}
                      key={index}
                      style={{ marginTop: 20, marginBottom: 20 }}
                      className="search-posts-wrap--item"
                      onClick={() => handleRedirect(item)}
                    >
                      <Row align="middle">
                        <Col span={4}>
                          <img
                            src={item?.thumbnail?.url}
                            style={{ width: 72, height: 72 }}
                            className="search-posts-result-img"
                          />
                        </Col>
                        <Col span={19} className="search-posts-result-title">
                          {firstText && <span>{firstText}</span>}
                          <span style={{ color: "#EF4444" }}>
                            {strSearched}
                          </span>
                          {strRemain}
                        </Col>
                      </Row>
                    </Col>
                  );
                })}
              </Row>
            </InfiniteScroll>
            <div style={{textAlign: "right", marginTop: 20, color: "#898989"}}>{dataSearchPosts?.total} kết quả</div>
          </>
        )}
        {searchParams?._total === 0 && (
          <div>
            <div className="search-posts-not-found">
              <img src="/images/search/not-found.png" />
              <div className="search-posts-not-found--text">
                Oops... không tìm thấy bài viết
                <div>
                  <span>Hãy tìm kiếm từ khoá khác để Local giúp bạn</span>
                </div>
              </div>
            </div>
            <div className="search-posts-not-found--suggest-title">
              BÀI VIẾT GỢI Ý
            </div>
            <Row justify="space-between" gutter={[30, 30]}>
              {(dataSuggestNotFound || [])?.map((item: any, index) => {
                return (
                  <Col
                    xl={12}
                    key={index}
                    onClick={() => handleRedirect(item)}
                    className="search-posts-not-found--item"
                  >
                    <Row align="middle">
                      <Col xl={4}>
                        <img
                          src={item?.thumbnail?.url}
                          style={{ width: 72, height: 72, borderRadius: 20 }}
                        />
                      </Col>
                      <Col
                        xl={19}
                        style={{
                          paddingLeft: 20,
                          fontWeight: 700,
                          fontSize: 20,
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
      </Modal>
    </Styled_SearchPosts_Wrapper>
  );
};

const Styled_SearchPosts_Wrapper = styled.div`
  .ant-modal-content {
    border-radius: 15px;
  }
  .ant-modal-close {
    right: -100px !important;
  }
  .search-posts-wrapper-input {
    position: relative;
  }
  .search-posts-icon-input {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
  .search-posts-input {
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
  .search-posts-result-img {
    width: 72px;
    height: 72px;
    border-radius: 15px;
  }
  .search-posts-result-title {
    font-size: 20px;
    font-weight: 700;
    padding-left: 20px;
  }

  /* notfound */
  .search-posts-not-found {
    text-align: center;
    margin-top: 20px;
  }
  .search-posts-not-found--text {
    font-weight: 700;
    font-size: 32px;
    line-height: 130%;
    color: #242424;
    span {
      font-weight: 400;
      font-size: 18px;
      line-height: 178%;
      color: #898989;
    }
  }
  .search-posts-not-found--suggest-title {
    margin: 20px 0px;
    font-weight: 600;
    font-size: 18px;
    line-height: 156%;
    color: #b91c1c;
  }
  .search-posts-not-found--item {
    cursor: pointer;
    &:hover {
      background: #ededed;
      border-radius: 15px;
    }
  }
  .search-posts-wrap--item {
    cursor: pointer;
    &:hover {
      background: #ededed;
      border-radius: 15px;
    }
  }
`;

export default forwardRef(SearchPosts);
// export default connect(() =>{}, ()=> {},null, {forwardRef:false})(SearchPosts);
