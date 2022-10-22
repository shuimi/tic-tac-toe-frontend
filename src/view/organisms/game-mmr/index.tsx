import React from "react";
import { Group, GroupProps, Text, UnstyledButton } from "@mantine/core";
import { ThreeDCubeSphere } from "tabler-icons-react";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../../data/stores/atoms/auth";

interface GameMMRProps extends GroupProps {}

export const GameMMR = (props: GameMMRProps) => {

  const {...other} = props

  const currentUser = useRecoilValue(currentUserAtom)

  return <UnstyledButton component={Group} mx={'lg'} {...other}>
    <Text size={18}>MMR:</Text>
    <ThreeDCubeSphere/>
    <Text size={20}>{ currentUser.user?.mmr }</Text>
  </UnstyledButton>
}