import { Container, Grid, Col } from "@mantine/core";
import React, { ReactNode } from "react";

interface ProfileLayoutProps {
  topPanel?: ReactNode,
  leftPanel?: ReactNode,
  rightSection?: ReactNode,
}

export const ProfileLayout = (props: ProfileLayoutProps) => {

  const {topPanel, leftPanel, rightSection} = props

  return <Container>
    {topPanel}
    <Grid>
      <Col span={'content'}>
        {leftPanel}
      </Col>
      <Col span={'auto'}>
        {rightSection}
      </Col>
    </Grid>
  </Container>
}