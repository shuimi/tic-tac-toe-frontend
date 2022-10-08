import React, { useState } from "react";
import {
  Avatar,
  Center,
  Drawer,
  Group,
  Paper,
  Table,
  Text,
  Timeline,
  UnstyledButton,
  Button,
  Badge,
  Stack, Progress
} from "@mantine/core";
import { AchievementsCard, DailyCard, ProfileCard, ProfileLayout } from "../../layouts/profile-layout";
import { UserButton } from "../../components";
import { CurrencyEthereum, GitBranch } from "tabler-icons-react";
import { PlaygroundGridLayout } from "../../layouts";


export enum Player {
  BOT,
  PLAYER
}

export enum GameStatus {
  UNFINISHED,
  FINISHED_WIN,
  FINISHED_LOSE,
  FINISHED_DRAW,
}

export interface GameHistory {
  id: string,
  firstTurn: Player,
  history: number[],
  lastPosition: number[],
  timestamp: string,
  status: GameStatus,
}



const DailyMock = [
  {
    id: 0,
    title: 'Боевая машина',
    description: 'Победить или взять ничью 4 раза, игаря второй ход',
    done: 2,
    total: 4,
    finished: false,
    reward: 8,
  },
  {
    id: 1,
    title: 'Дипломат',
    description: '10 раз завершить игру ничьей',
    done: 7,
    total: 10,
    finished: false,
    reward: 5,
  },
  {
    id: 2,
    title: 'Грандмастер',
    description: '10 раз завершить игру победой',
    done: 10,
    total: 10,
    finished: true,
    reward: 10,
  },
]

const AchievementsMock = [
  {
    id: 0,
    title: 'Big daddy',
    description: 'Сыграть игру на поле 12x12'
  },
  {
    id: 1,
    title: 'Маэстро-сто',
    description: 'Ни разу не проиграть, сыграв 100 игр подряд'
  },
]

const GamesMock: GameHistory[] = [
  {
    id: '1',
    firstTurn: Player.BOT,
    history: [2, 3, 5, 7],
    lastPosition: [0, 0, 1, 2, 0, 1, 0, 2, 0],
    timestamp: new Date(Date.now()).toDateString(),
    status: GameStatus.FINISHED_DRAW,
  },
  {
    id: '2',
    firstTurn: Player.PLAYER,
    history: [2, 3, 5, 7],
    lastPosition: [0, 0, 1, 2, 0, 1, 0, 2, 0],
    timestamp: new Date(Date.now()).toDateString(),
    status: GameStatus.FINISHED_DRAW,
  },
  {
    id: '3',
    firstTurn: -1,
    history: [2, 3, 5, 7],
    lastPosition: [0, 0, 1, 2, 0, 1, 0, 2, 0],
    timestamp: new Date(Date.now()).toDateString(),
    status: GameStatus.FINISHED_DRAW,
  },
];


function ProfilePage () {

  const [historyDrawerOpened, setHistoryDrawerOpened] = useState(false)

  const HistoryDrawer = <Drawer
    opened={historyDrawerOpened}
    onClose={() => setHistoryDrawerOpened(false)}
    position={'right'}
    title="История игры"
    padding="xl"
    size="xl"
  >
    <Timeline active={1} bulletSize={24} lineWidth={2}>
      <Timeline.Item bullet={<GitBranch size={12} />} title="New branch">
        <Text color="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
        <Text size="xs" mt={4}>2 hours ago</Text>
      </Timeline.Item>

      <Timeline.Item bullet={<GitBranch size={12} />} title="Commits">
        <Text color="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
        <Text size="xs" mt={4}>52 minutes ago</Text>
      </Timeline.Item>

      <Timeline.Item title="Pull request" bullet={<GitBranch size={12} />} lineVariant="dashed">
        <Text color="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
        <Text size="xs" mt={4}>34 minutes ago</Text>
      </Timeline.Item>

      <Timeline.Item title="Code review" bullet={<GitBranch size={12} />}>
        <Text color="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
        <Text size="xs" mt={4}>12 minutes ago</Text>
      </Timeline.Item>
    </Timeline>
  </Drawer>




  const Rows = GamesMock.map((game) => {

    const onOpenHistoryClick = () => {
      setHistoryDrawerOpened(true)
    }

    const firstTurnEntity =
      game.firstTurn == Player.BOT
        ? <Badge size={'lg'} color={'gray'} variant={'dot'}>Бот</Badge>
        : game.firstTurn == Player.PLAYER
          ? <Badge size={'lg'} color={'green'} variant={'dot'}>Игрок</Badge>
          : <Badge size={'lg'} color={'red'} variant={'dot'}>Аноним</Badge>


    const ROW_MAX_HEIGHT = 40 * 3
    const gameRank = 3

    const LastPositionPlaygroundPreview = <Group>
      <PlaygroundGridLayout
        rank={gameRank}
        data={
          game.lastPosition.map((positionCode, index) => ({
            position: index,
            mark: positionCode,
          }))
        }
        sellSize={ROW_MAX_HEIGHT / gameRank - (30 / gameRank)}
        spacing={30 / gameRank}
        color={'cyan.2'}
      />
    </Group>

    const timestamp = game.timestamp

    const status =
      game.status == GameStatus.UNFINISHED
        ? <Badge size={'lg'} color={'gray'} variant={'dot'}>Не завершена</Badge>
        : game.status == GameStatus.FINISHED_WIN
          ? <Badge size={'lg'} color={'green'} variant={'dot'}>Победа</Badge>
          : game.status == GameStatus.FINISHED_LOSE
            ? <Badge size={'lg'} color={'red'} variant={'dot'}>Поражение</Badge>
            : game.status == GameStatus.FINISHED_DRAW
              ? <Badge size={'lg'} color={'cyan'} variant={'dot'}>Ничья</Badge>
              : <Badge size={'lg'} color={'red'} variant={'dot'}>Неизвестный исход</Badge>


    return <tr key={game.id}>
      <td>{firstTurnEntity}</td>
      <td>
        <Text mb={'xs'}>Всего ходов: {game.lastPosition.length}</Text>
        <Button onClick={onOpenHistoryClick}>
          Показать
        </Button>
      </td>
      <td>{LastPositionPlaygroundPreview}</td>
      <td>{timestamp}</td>
      <td>{status}</td>
    </tr>
  })


  const GameHistoryTable = <Stack>
    <Table striped highlightOnHover withColumnBorders>
      <thead>
      <tr>
        <th>Первый ход</th>
        <th>История ходов</th>
        <th>Последняя позиция</th>
        <th>Время завершения</th>
        <th>Статус</th>
      </tr>
      </thead>
      <tbody>{Rows}</tbody>
    </Table>
  </Stack>



  const TopPanel = <Paper mb={'xl'} p={'md'} radius={'md'}>
    <Group position={'apart'}>
      <Group noWrap mx={'lg'}>
        <Avatar radius={'xl'}/>
        <UserButton name={'Vladimir Shustov'} email={'wlashcontact@gmail.com'}/>
      </Group>
      <UnstyledButton component={Group} mx={'lg'}>
        <CurrencyEthereum/>
        <Text size={20}>2321</Text>
      </UnstyledButton>
    </Group>
  </Paper>

  const LeftPanel = <>
    <ProfileCard title={'Задания'}>
      {DailyMock.map(daily =>
        <DailyCard key={`daily/${daily.id}`} { ...daily } />
      )}
    </ProfileCard>
    <ProfileCard title={'Достижения'}>
      {AchievementsMock.map(achievement =>
        <AchievementsCard key={`achievement/${achievement.id}`} { ...achievement } />
      )}
    </ProfileCard>
  </>

  const RightSection = <ProfileCard title={'История игр'}>
    <Progress
      radius="xl"
      size={24}
      sections={[
        { value: 33, color: 'cyan', label: 'Побед (33%)', tooltip: 'Вы победили 33 раза' },
        { value: 28, color: 'pink', label: 'Поражений (28%)', tooltip: 'Вы потерпели поражение 28 раз' },
        { value: 25, color: 'violet', label: 'Ничьих (25%)', tooltip: 'Вы сыграли в ничью 25 раз' },
      ]}
    />
    {GameHistoryTable}
  </ProfileCard>


  return <>
    {HistoryDrawer}
    <ProfileLayout
      topPanel={TopPanel}
      leftPanel={LeftPanel}
      rightSection={RightSection}
    />
  </>
}

export default ProfilePage;