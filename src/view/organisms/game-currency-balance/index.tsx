import React from "react";
import { Group, GroupProps, Text, UnstyledButton } from "@mantine/core";
import { CurrencyEthereum } from "tabler-icons-react";

interface GameCurrencyBalanceProps extends GroupProps {}

export const GameCurrencyBalance = (props: GameCurrencyBalanceProps) => {

  const {...other} = props

  // todo: fetch game currency balance

  return <UnstyledButton component={Group} mx={'lg'} {...other}>
    <Text size={18}>Баланс:</Text>
    <CurrencyEthereum/>
    <Text size={20}>2321</Text>
  </UnstyledButton>
}