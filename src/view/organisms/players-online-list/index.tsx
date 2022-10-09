import { Avatar, Card, Group, Stack, Text, Badge, UnstyledButton } from "@mantine/core";
import { ChevronRight, ThreeDCubeSphere } from "tabler-icons-react";
import React from "react";
import { PlayersOnlineMock } from "../../../data";

interface PlayerCardProps {
  login?: string,
  mmr?: number,
  photo?: string,
  isBot?: boolean,
}

export const PlayerCard = (props: PlayerCardProps) => {

  const {login, mmr, photo, isBot} = props

  return <UnstyledButton>
    <Card>
      <Group position={'apart'}>
        <Group>
          <Avatar radius={'xl'} mr={'md'} src={photo}/>
          <Stack justify={'center'} spacing={0} mr={'md'}>
            <Group>
              <Text>{login}</Text>
              {isBot && <Badge size={'sm'}>Бот</Badge>}
            </Group>
            <Group align={'center'}>
              <ThreeDCubeSphere size={16}/>
              <Text size={14}>MMR:</Text>
              <Text size={14}>{ mmr }</Text>
            </Group>
          </Stack>
        </Group>
        <ChevronRight size={16}/>
      </Group>
    </Card>
  </UnstyledButton>
}


interface PlayersOnlineListProps {}

export const PlayersOnlineList = (props: PlayersOnlineListProps) => {

  const {} = props

  return <Stack style={{height: 700, width: 464}}>
    {
      PlayersOnlineMock
        .sort((playerA, playerB) => playerA.mmr - playerB.mmr)
        .map(playerOnline => <PlayerCard {...playerOnline}/>)
    }
  </Stack>
}