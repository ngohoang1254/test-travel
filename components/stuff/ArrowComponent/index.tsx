/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { forwardRef } from "react";
import styled from "styled-components";

interface Props {
  isHover?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ArrowLeftRoundComponent = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    // const refCallback = useRef(null);
    //   useImperativeHandle(ref, () => ({
    //     show: (data, callBack) => {
    //       refCallback.current = callBack;
    //     },
    //   }));
    return (
      <Styled_ArrowLeftRoundComponent_Navigation
        ref={ref}
        className={props.className}
        style={props?.style}
      >
        <img
          src={"/images/svg/arrow-left-grey.svg"}
          className={props?.isHover ? "arrow-left" : ""}
        />
        {props?.isHover && (
          <img
            className="arrow-left-hover"
            src={"/images/hover-arrow-left-white.png"}
          />
        )}
      </Styled_ArrowLeftRoundComponent_Navigation>
    );
  }
);

const ArrowRightRoundComponent = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    return (
      <Styled_ArrowRightRoundComponent_Navigation
        ref={ref}
        className={props.className}
        style={props?.style}
      >
        <img
          src={"/images/svg/arrow-right-grey.svg"}
          className={props?.isHover ? "arrow-right" : ""}
        />
        {props?.isHover && (
          <img
            className="arrow-right-hover"
            src={"/images/hover-arrow-right-white.png"}
          />
        )}
      </Styled_ArrowRightRoundComponent_Navigation>
    );
  }
);
ArrowLeftRoundComponent.displayName = "ArrowLeftRoundComponent";
ArrowRightRoundComponent.displayName = "ArrowRightRoundComponent";
export { ArrowLeftRoundComponent, ArrowRightRoundComponent };

const Styled_ArrowLeftRoundComponent_Navigation = styled.div`
  color: white;
  cursor: pointer;
  border: 1px solid white;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 35px;
  border-radius: 50%;
  .arrow-left-hover {
    padding-top: 14px;
    margin-left: 5px;
    display: none;
  }
  &.transparent {
    background: #27272796;
  }
  &:hover {
    background: #ff4b5a;
    border: none !important;
    .arrow-left {
      display: none;
    }
    .arrow-left-hover {
      display: block !important;
      width: 20px;
    }
  }
`;
const Styled_ArrowRightRoundComponent_Navigation = styled.div`
  color: white;
  cursor: pointer;
  border: 1px solid white;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 35px;
  border-radius: 50%;
  .arrow-right-hover {
    margin-left: 14px;
    margin-top: 13px;
    display: none;
  }
  &.transparent {
    background-color: #27272796;
  }
  &:hover {
    background: #ff4b5a;
    border: none !important;
    .arrow-right {
      display: none !important;
    }
    .arrow-right-hover {
      display: block !important;
      width: 20px;
    }
  }
`;
