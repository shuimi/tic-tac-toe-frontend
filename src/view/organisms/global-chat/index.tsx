import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Grid,
  Group,
  Input,
  ScrollArea,
  Stack,
  Text,
  UnstyledButton
} from "@mantine/core";
import { BrandTelegram, ChevronRight, Robot, ThreeDCubeSphere } from "tabler-icons-react";
import React, { useEffect, useRef } from "react";


const GlobalChatMessagesMock = [
  {
    id: '1',
    sender: {
      id: 'me',
      photo: 'https://cs12.pikabu.ru/post_img/big/2021/02/07/9/1612707174128538080.jpg',
      login: 'Пч0лы',
    },
    message: 'Привет, текст сообщения, привет, игра, тема, генерация текста',
    timestamp: new Date(Date.now()).toLocaleTimeString(),
  },
  {
    id: '2',
    sender: {
      id: 'me',
      photo: 'https://cs12.pikabu.ru/post_img/big/2021/02/07/9/1612707174128538080.jpg',
      login: 'Пч0лы',
    },
    message: '???',
    timestamp: new Date(Date.now()).toLocaleTimeString(),
  },
  {
    id: '3',
    sender: {
      id: 'uuid1',
      photo: 'https://sun9-15.userapi.com/s/v1/ig2/rOMb2BqhZ-CdN4Cy9dluo10zvwlB2KOgMN-qorJATI5gJ09dFJL6t-gmcZjWliNMzhriNo-pwO2lxTUp91aoMrJj.jpg?size=200x265&quality=96&crop=0,0,430,570&ava=1',
      login: 'urs_tauKita27',
    },
    message: 'Здесь текст сообщение текст текст 1 2 4 ыолфыолол',
    timestamp: new Date(Date.now()).toLocaleTimeString(),
  },
  {
    id: '4',
    sender: {
      id: 'uuid1',
      photo: 'https://sun9-15.userapi.com/s/v1/ig2/rOMb2BqhZ-CdN4Cy9dluo10zvwlB2KOgMN-qorJATI5gJ09dFJL6t-gmcZjWliNMzhriNo-pwO2lxTUp91aoMrJj.jpg?size=200x265&quality=96&crop=0,0,430,570&ava=1',
      login: 'urs_tauKita27',
    },
    message: 'Типичный чат хихи',
    timestamp: new Date(Date.now()).toLocaleTimeString(),
  },
  {
    id: '5',
    sender: {
      id: 'id_bot_magnus_5000',
      photo: 'https://previews.123rf.com/images/gmast3r/gmast3r1801/gmast3r180101022/94046703-chatter-bot-cute-robot-icon-in-speech-bubble-icon-concept-of-chatbot-or-chat-bottechnology-flat-vect.jpg',
      login: 'Бот Магнус',
    },
    message: 'Кто хочет сразиться? Кидайте вызов!',
    timestamp: new Date(Date.now()).toLocaleTimeString(),
  },
  {
    id: '11',
    sender: {
      id: 'me',
      photo: 'https://cs12.pikabu.ru/post_img/big/2021/02/07/9/1612707174128538080.jpg',
      login: 'Пч0лы',
    },
    message: 'Привет, текст сообщения, привет, игра, тема, генерация текста',
    timestamp: new Date(Date.now()).toLocaleTimeString(),
  },
  {
    id: '21',
    sender: {
      id: 'me',
      photo: 'https://cs12.pikabu.ru/post_img/big/2021/02/07/9/1612707174128538080.jpg',
      login: 'Пч0лы',
    },
    message: '???',
    timestamp: new Date(Date.now()).toLocaleTimeString(),
  },
  {
    id: '31',
    sender: {
      id: 'uuid1',
      photo: 'https://sun9-15.userapi.com/s/v1/ig2/rOMb2BqhZ-CdN4Cy9dluo10zvwlB2KOgMN-qorJATI5gJ09dFJL6t-gmcZjWliNMzhriNo-pwO2lxTUp91aoMrJj.jpg?size=200x265&quality=96&crop=0,0,430,570&ava=1',
      login: 'urs_tauKita27',
    },
    message: 'Здесь текст сообщение текст текст 1 2 4 ыолфыолол',
    timestamp: new Date(Date.now()).toLocaleTimeString(),
  },
  {
    id: '41',
    sender: {
      id: 'uuid1',
      photo: 'https://sun9-15.userapi.com/s/v1/ig2/rOMb2BqhZ-CdN4Cy9dluo10zvwlB2KOgMN-qorJATI5gJ09dFJL6t-gmcZjWliNMzhriNo-pwO2lxTUp91aoMrJj.jpg?size=200x265&quality=96&crop=0,0,430,570&ava=1',
      login: 'urs_tauKita27',
    },
    message: 'Типичный чат хихи',
    timestamp: new Date(Date.now()).toLocaleTimeString(),
  },
  {
    id: '51',
    sender: {
      id: 'id_bot_magnus_5000',
      photo: 'https://previews.123rf.com/images/gmast3r/gmast3r1801/gmast3r180101022/94046703-chatter-bot-cute-robot-icon-in-speech-bubble-icon-concept-of-chatbot-or-chat-bottechnology-flat-vect.jpg',
      login: 'Бот Магнус',
    },
    message: 'Кто хочет сразиться? Кидайте вызов!',
    timestamp: new Date(Date.now()).toLocaleTimeString(),
  },
  {
    id: '511',
    sender: {
      id: 'id_bot_magnus_5000',
      photo: 'https://previews.123rf.com/images/gmast3r/gmast3r1801/gmast3r180101022/94046703-chatter-bot-cute-robot-icon-in-speech-bubble-icon-concept-of-chatbot-or-chat-bottechnology-flat-vect.jpg',
      login: 'Бот Магнус',
    },
    message: 'Кто хочет сразиться? Кидайте вызов!',
    timestamp: new Date(Date.now()).toLocaleTimeString(),
  },
  {
    id: '5111',
    sender: {
      id: 'id_bot_magnus_5000',
      photo: 'https://previews.123rf.com/images/gmast3r/gmast3r1801/gmast3r180101022/94046703-chatter-bot-cute-robot-icon-in-speech-bubble-icon-concept-of-chatbot-or-chat-bottechnology-flat-vect.jpg',
      login: 'Бот Магнус',
    },
    message: 'Кто хочет сразиться? Кидайте вызов!',
    timestamp: new Date(Date.now()).toLocaleTimeString(),
  },
  {
    id: '5111',
    sender: {
      id: 'id_bot_magnus_5000',
      photo: 'https://previews.123rf.com/images/gmast3r/gmast3r1801/gmast3r180101022/94046703-chatter-bot-cute-robot-icon-in-speech-bubble-icon-concept-of-chatbot-or-chat-bottechnology-flat-vect.jpg',
      login: 'Бот Магнус',
    },
    message: 'Кто хочет сразиться? Кидайте вызов!',
    timestamp: new Date(Date.now()).toLocaleTimeString(),
  },
  {
    id: '5111',
    sender: {
      id: 'id_bot_magnus_5000',
      photo: 'https://previews.123rf.com/images/gmast3r/gmast3r1801/gmast3r180101022/94046703-chatter-bot-cute-robot-icon-in-speech-bubble-icon-concept-of-chatbot-or-chat-bottechnology-flat-vect.jpg',
      login: 'Бот Магнус',
    },
    message: 'Кто хочет сразиться? Кидайте вызов!',
    timestamp: new Date(Date.now()).toLocaleTimeString(),
  },
]


interface MessageCloudProps {
  photo?: string,
  message?: string,
  name?: string,
  timestamp?: string,
  me?: boolean,
  isBot?: boolean,
}

export const MessageCloud = (props: MessageCloudProps) => {

  const {photo, message, name, timestamp, me, isBot} = props

  const leftPosition = !me
  const noPhoto = photo === undefined

  const emptyAvatarMargin = 46

  return <Group align={'flex-end'} position={leftPosition ? 'left' : 'right'} mb={6}>
    {
      leftPosition && photo
      && <Avatar radius={'xl'} size={32} mr={2} src={photo} ml={2}/>
    }
    <Stack
      spacing={0}
      ml={noPhoto && leftPosition ? emptyAvatarMargin : 0}
      mr={noPhoto && !leftPosition ? emptyAvatarMargin : 0}
    >
      {
        name
        && <Text align={me ? 'right' : 'left'} size={12}>
          {name}{isBot && <Robot size={22} strokeWidth={2}/>}
        </Text>
      }
      <Card radius={8} py={4} px={10}>
        <Text size={14} style={{maxWidth: '360px'}}>{message}</Text>
        <Text size={10} color={'dimmed'} align={me ? 'unset' : 'end'}>{timestamp}</Text>
      </Card>
    </Stack>
    {
      !leftPosition && photo
      && <Avatar radius={'xl'} size={32} ml={2} src={photo} mr={2}/>
    }
  </Group>
}

interface GlobalChatProps {}

export const GlobalChat = (props: GlobalChatProps) => {

  const {} = props

  const viewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    viewport?.current?.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });

  useEffect(() => scrollToBottom(), [])

  return <Stack style={{height: 700, width: 472}}>
    <ScrollArea
      scrollbarSize={4}
      scrollHideDelay={250}
      viewportRef={viewport}
      offsetScrollbars
    >
      {
        GlobalChatMessagesMock
          .map((message, index, messages) => {

            const length = messages.length
            let result = message as any

            if (index != length - 1) {
              const {sender} = message
              const {sender: nextSender} = messages[index + 1]

              if (sender.id == nextSender.id) {
                result = {
                  ...result,
                  sender: {
                    ...result.sender,
                    photo: undefined,
                  },
                }
              }
            }
            if (index != 0) {
              const {sender} = message
              const {sender: previousSender} = messages[index - 1]

              if (sender.id == previousSender.id) {
                result = {
                  ...result,
                  sender: {
                    ...result.sender,
                    login: undefined,
                  },
                }
              }
            }
            return result
          })
          .map(message => <MessageCloud
            key={message.id}
            isBot={message.sender.id == 'id_bot_magnus_5000'}
            name={message.sender.login}
            me={message.sender.id == 'me'}
            photo={message.sender.photo}
            {...message}
          />)
      }
    </ScrollArea>
    <Grid align={'center'}>
      <Grid.Col span={'auto'}>
        <Input
          variant={'filled'}
          placeholder={'Введите сообщение'}
          radius={'md'}
          size={'md'}
        />
      </Grid.Col>
      <Grid.Col span={'content'}>
        <ActionIcon>
          <BrandTelegram/>
        </ActionIcon>
      </Grid.Col>
    </Grid>
  </Stack>
}