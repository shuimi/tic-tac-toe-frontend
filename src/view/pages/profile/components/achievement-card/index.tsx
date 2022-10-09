import React, { PropsWithChildren, ReactNode } from "react";
import { Avatar, Card, Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { Checkbox as CheckboxIcon } from "tabler-icons-react";


interface AchievementsCardProps extends PropsWithChildren {
  title?: ReactNode,
  description?: ReactNode,
}

export const AchievementsCard = (props: AchievementsCardProps) => {

  const {title, description} = props

  return <UnstyledButton component={Card}>
    <Group position={'apart'}>
      <Group>
        <Avatar color={'green'} radius={'xl'} mr={'md'}>
          <CheckboxIcon/>
        </Avatar>
        <Stack justify={'center'} spacing={0} mr={'md'}>
          <Text size={14} weight={700} my={0}>
            {title}
          </Text>
          <Text size={12} my={0} style={{maxWidth: '16em'}}>{description}</Text>
        </Stack>
      </Group>
    </Group>
  </UnstyledButton>
}

