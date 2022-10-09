import React, { ReactNode } from "react";
import { Container } from "@mantine/core";

interface ShopLayoutProps {
  topPanel?: ReactNode,
  bottomPanel?: ReactNode,
}

export const ShopLayout = (props: ShopLayoutProps) => {
  
  const {topPanel, bottomPanel} = props
  
  return <Container>
    {topPanel}
    {bottomPanel}
  </Container>
}