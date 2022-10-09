import React, { PropsWithChildren, ReactNode } from "react";
import { ActionIcon, Avatar, Card, Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { Box as BoxIcon, Checkbox as CheckboxIcon, CurrencyEthereum } from "tabler-icons-react";


interface DailyCardProps extends PropsWithChildren {
  finished?: boolean,
  title?: ReactNode,
  description?: ReactNode,
  done?: number,
  total?: number,
  reward?: number,
}

export const DailyCard = (props: DailyCardProps) => {

  const {finished, title, description, done, total, reward} = props

  return <UnstyledButton component={Card}>
    <Group position={'apart'}>
      <Group>
        <Avatar color={finished ? 'green' : 'red'} radius={'xl'} mr={'md'}>
          {finished ? <CheckboxIcon/> : <BoxIcon/>}
        </Avatar>
        <Stack justify={'center'} spacing={0} mr={'md'}>
          <Text size={14} weight={700} my={0}>
            {title} ({done}/{total})
          </Text>
          <Text size={12} my={0} style={{maxWidth: '16em'}}>{description}</Text>
        </Stack>
      </Group>
      <Group ml={'xs'} spacing={1} align={'center'}>
        <Text size={14}>{finished && '+'}{reward}</Text>
        <ActionIcon ml={0} color={finished ? 'green' : 'gray'}>
          <CurrencyEthereum strokeWidth={1.3} />
        </ActionIcon>
      </Group>
    </Group>
  </UnstyledButton>
}