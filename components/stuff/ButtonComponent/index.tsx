import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  version?: string;
  text: string | ReactNode;
  style?: React.CSSProperties;
  className?: string;
  styleButton?: React.CSSProperties
};

export default function ButtonComponent({
  version = "normal",
  text = "",
  style,
  className = "",
  styleButton
}: Props) {
  const renderButton = () => {
    switch (version) {
      case "hover": {
        return (
          <Styled_BannerComponent_Version_Hover style={style} className={className}>
            <button style={styleButton}>{text}</button>
          </Styled_BannerComponent_Version_Hover>
        );
      }
      default:
        return (
          <Styled_BannerComponent_Version_Normal style={style} className={className}>
            <button style={styleButton}>{text}</button>
          </Styled_BannerComponent_Version_Normal>
        );
    }
  };
  return <>{renderButton()}</>;
}

const Styled_BannerComponent_Version_Normal = styled.div`
  width: 100%;
  text-align: center;
  button {
    padding: 10px 50px;
    color: white;
    font-weight: 600;
    font-size: 24px;
    background: #ff4b5a;
    border-radius: 50px;
    border: transparent;
  }
`;

const Styled_BannerComponent_Version_Hover = styled.div`
  width: 100%;
  text-align: center;
  .img-2 {
    display: none;
  }
  button {
    padding: 10px 50px;
    font-weight: 600;
    font-size: 24px;
    border-radius: 50px;
    border: transparent;
    background-color: white;
  }
  &:hover {
    button {
      background: #ff4b5a;
      color: white;
    }
    .img-1 {
      display: none;
    }
    .img-2 {
      display: inline;
    }
  }
`;
