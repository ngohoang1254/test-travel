// import ButtonComponent from "@/components/stuff/ButtonComponent";
import { useAppSelector } from "@/redux-store/stores";
import { memo } from "react";
import styled from "styled-components";

const Content = () => {
  const { dataPosts } = useAppSelector((state) => state.posts);
  return (
    <Styled_Content_Wrapper className="content-wrapper">
      {/* <ButtonComponent
        className="content-share"
        version="hover"
        style={{ width: "auto", position: "absolute", right: "100px" }}
        text={
          <>
            <span style={{ marginRight: 10}}>
              <img src="/images/svg/share-black.svg" className="img-1" />
              <img src="/images/svg/share-white.svg" className="img-2" />
            </span>
            <span>Chia sẻ</span>
          </>
        }
      /> */}
      <h1 className="content-wrapper--title">
        {dataPosts?.multi_language_content?.[0]?.title}
      </h1>
      <div
        dangerouslySetInnerHTML={{
          __html: dataPosts?.multi_language_content?.[0]?.content || "",
        }}
      ></div>
    </Styled_Content_Wrapper>
  );
};

export default memo(Content);

const Styled_Content_Wrapper = styled.div`
  width: 750px;
  margin: auto;
  margin-top: 100px;
  img {
    width: 100% !important;
    height: 100% !important;
  }
  .content-wrapper--title {
    font-size: 32px;
    font-weight: 600;
    color: #000000;
  }
  .img-1 {
    width: auto;
    height: auto;
  }
  .img-2 {
    width: auto;
    height: auto;
  }
  .text-huge {
    font-size: 32px;
    font-weight: 700;
  }
  .text-big {
    font-size: 28px;
    font-weight: 600;
  }
  .text-small {
    font-size: 16px;
    font-weight: 500;
  }
  .text-tiny {
    font-size: 12px;
    font-weight: 500;
  }
  h1 {
    font-size: 32px;
    font-weight: 700;
  }
  span {
    font-size: 20px;
    font-weight: 400;
    color: #565656 !important;
  }
  p {
    font-size: 20px;
    font-weight: 400;
    color: #565656 !important;
  }
  figcaption {
    text-align: center;
    margin: 10px 0px;
    span {
      font-style: italic !important;
      font-weight: 400;
      font-size: 20px;
      text-align: center;
      color: #898989 !important;
    }
  }
  @media screen and (max-width: 1023px) {
    width: auto;
    margin-top: 0px;
    padding: 0 16px;
    .content-share {
      display: none;
    }
    .content-wrapper--title {
      font-size: 24px;
      font-weight: 700;
    }
    .text-huge {
        font-size: 24px;
        font-weight: 700;
    }
    .text-big {
        font-size: 20px;
        font-weight: 600;
    }
    .text-small {
        font-size: 14px;
        font-weight: 500;
    }
    .text-tiny {
        font-size: 10px;
        font-weight: 500;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
    }
    span {
      font-weight: 400;
      font-size: 16px;
      color: #565656 !important;
    }
    p {
      font-weight: 400;
      font-size: 16px;
      color: #565656 !important;
    }
    figcaption {
      text-align: center;
      margin: 10px 0px;
      span {
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        color: #898989 !important;
      }
    }
  }
`;
