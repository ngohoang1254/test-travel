import React, { memo } from "react";
import styled from "styled-components";
const LayoutComponent = ({
  children,
  backgroundcolor = "#F6F6F6",
}: {
  children: React.ReactNode;
  backgroundcolor?: string;
}) => {
  return (
    <Styled_LayoutComponent backgroundcolor={backgroundcolor}>
      {children}
    </Styled_LayoutComponent>
  );
};

export default memo(LayoutComponent);

const Styled_LayoutComponent = styled.div<{ backgroundcolor?: string }>`
  background: ${(props) => props.backgroundcolor};
`;
