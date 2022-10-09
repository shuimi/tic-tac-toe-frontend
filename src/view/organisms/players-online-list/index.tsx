import { Avatar, Card, Group, Stack, Text, Badge, UnstyledButton } from "@mantine/core";
import { ChevronRight, ThreeDCubeSphere } from "tabler-icons-react";
import React from "react";

const PlayersOnlineMock = [
  {
    id: 'asdsa12312wdqesdaier2eds3jcicr3',
    login: 'bishkek22',
    mmr: 653,
    photo: 'https://www.meme-arsenal.com/memes/cb46c8964c4e300690e52d6bfde3bd2e.jpg',
    isBot: false,
  },
  {
    id: 'asdsa12312wdqesdqwewe2982838111',
    login: 'urs_tauKita27',
    mmr: 1780,
    photo: 'https://memepedia.ru/wp-content/uploads/2019/07/chilipizdrik-14.jpg',
    isBot: false,
  },
  {
    id: 'asdfsdxzxxxxxxcxcier2eds3jcicr3',
    login: 'Олег Лихогуб',
    mmr: 4621,
    photo: 'https://sun2-11.userapi.com/impg/uwhfz_44JjlOSJsy0a4a_r4Bu9TLxjUU6n6AEA/BVnW7jOO1wo.jpg?size=1080x1080&quality=95&sign=f58939dad81770f2f0bfe0a434990925&type=album',
    isBot: false,
  },
  {
    id: 'asdsa12312wdqe111111111111ic22',
    login: 'Текст текст',
    mmr: 3205,
    photo: 'https://sun9-6.userapi.com/impf/c855420/v855420444/15bd61/qx64UOB0H_Y.jpg?size=604x480&quality=96&sign=34ce82b016f9bdcb617ae972c7b1a22a&type=album',
    isBot: false,
  },
  {
    id: 'id_bot_vasiliy_1000',
    login: 'Бот Василий',
    mmr: 1000,
    photo: 'https://st3.depositphotos.com/8950810/17657/v/450/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg',
    isBot: true,
  },
  {
    id: 'id_bot_yang_3000',
    login: 'Бот Ян',
    mmr: 3000,
    photo: 'https://media.istockphoto.com/vectors/chatbot-icon-bot-sign-or-symbol-cute-robot-head-speaks-vector-id1334639872?k=20&m=1334639872&s=170667a&w=0&h=__xU5OnhZTfzuYD-NKk6JITg_-FELJFO2VEpuLDemLQ=',
    isBot: true,
  },
  {
    id: 'id_bot_magnus_5000',
    login: 'Бот Магнус',
    mmr: 5000,
    photo: 'https://previews.123rf.com/images/gmast3r/gmast3r1801/gmast3r180101022/94046703-chatter-bot-cute-robot-icon-in-speech-bubble-icon-concept-of-chatbot-or-chat-bottechnology-flat-vect.jpg',
    isBot: true,
  },
]


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

  return <Stack>
    {
      PlayersOnlineMock
        .sort((playerA, playerB) => playerA.mmr - playerB.mmr)
        .map(playerOnline => <PlayerCard {...playerOnline}/>)
    }
  </Stack>
}