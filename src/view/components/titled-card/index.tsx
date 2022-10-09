import React, { PropsWithChildren, ReactNode } from "react";
import { Paper, PaperProps, Stack } from "@mantine/core";
import { CardTitle } from "../card-title";


interface TitledCardProps extends PropsWithChildren, PaperProps {
  title: ReactNode,
}

export const TitledCard = (props: TitledCardProps) => {
  const {children, title, ...other} = props

  return <Paper p={'md'} radius={'md'} mb={'md'} {...other}>
    <CardTitle>
      { title }
    </CardTitle>
    <Stack>
      { children }
    </Stack>
  </Paper>
}