import {
  Avatar,
  Container,
  Group,
  Paper,
  UnstyledButton,
  Text,
  Grid,
  Col,
  Title,
  Stack,
  Card,
  Box,
  ActionIcon,
} from "@mantine/core";
import { Box as BoxIcon, CurrencyEthereum, Checkbox as CheckboxIcon, ChevronRight } from "tabler-icons-react";
import React, { PropsWithChildren, ReactNode } from "react";


interface CardTitleProps extends PropsWithChildren {
  onClick?: () => void,
}

export const CardTitle = (props: CardTitleProps) => {

  const {children, onClick} = props

  return <UnstyledButton onClick={onClick} component={Group} mx={'md'} mt={'xs'} mb={'lg'} >
    <Title order={4}>
      { children }
    </Title>
    <ChevronRight size={16}/>
  </UnstyledButton>
}



interface ProfileCardProps extends PropsWithChildren {
  title: ReactNode,
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {children, title} = props

  return <Paper p={'md'} radius={'md'} mb={'md'}>
    <CardTitle>
      { title }
    </CardTitle>
    <Stack>
      { children }
    </Stack>
  </Paper>
}



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