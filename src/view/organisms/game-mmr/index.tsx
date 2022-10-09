import React from "react";
import { Group, GroupProps, Text, UnstyledButton } from "@mantine/core";
import { ThreeDCubeSphere } from "tabler-icons-react";

interface GameMMRProps extends GroupProps {}

export const GameMMR = (props: GameMMRProps) => {

  const {...other} = props

  // todo: fetch game mmr

  return <UnstyledButton component={Group} mx={'lg'} {...other}>
    <Text size={18}>MMR:</Text>
    <ThreeDCubeSphere/>
    <Text size={20}>1234</Text>
  </UnstyledButton>
}