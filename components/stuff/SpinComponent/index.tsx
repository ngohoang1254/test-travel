import { Spin } from "antd";
import React from "react";

type Props = {
  isLoading: boolean;
};

function SpinComponent({ isLoading }: Props) {
  return (
    <Spin
      spinning={isLoading}
      size={"large"}
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        zIndex: 9999,
        top: 0,
        left: 0,
        background: "white",
      }}
    ></Spin>
  );
}

export default SpinComponent;
