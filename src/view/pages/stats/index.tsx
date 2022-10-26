import React, { useEffect, useState } from "react";
import {
  Accordion,
  Avatar,
  Badge,
  Button,
  Center,
  Drawer,
  Group,
  Paper,
  Stack,
  Table,
  Text,
  Timeline,
} from "@mantine/core";
import { PlaygroundGridLayout, ProfileLayout } from "../../layouts";
import { TitledCard, UserButton } from "../../components";
import { GitBranch } from "tabler-icons-react";
import {
  AchievementsMock,
  DailyMock,
  GameModel,
  GameStatus,
  GameStatusModel,
  GameType,
  Mark,
  Player,
  PlaygroundMark
} from "../../../data";
import { AchievementsCard, DailyCard } from "./components";
import { GameCurrencyBalance, GameMMR, GamesPlayedStats } from "../../organisms";


import { AnimatedAxis, AnimatedGrid, AnimatedLineSeries, Tooltip, XYChart, } from '@visx/xychart';
import { useGamesHistory } from "../../../data/hooks/http/games-history.hook";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserAtom } from "../../../data/stores/atoms/auth";
import { LoadingWrapper } from "../../layouts/loading-wrapper";
import { useRouting } from "../../../core/hooks/use-routing";
import { firstTurnMarkAtom, gameAtom, gameRankAtom, gameTypeAtom, winConditionAtom } from "../playground/store";


const data1 = [
  { x: '2020-01-01', y: 50 },
  { x: '2020-01-02', y: 10 },
  { x: '2020-01-03', y: 20 },
];

const data2 = [
  { x: '2020-01-01', y: 30 },
  { x: '2020-01-02', y: 40 },
  { x: '2020-01-03', y: 80 },
];

const accessors = {
  xAccessor: (d: {x: string, y: number}) => d.x,
  yAccessor: (d: {x: string, y: number}) => d.y,
};

const XYChartMock = () => {
  return <XYChart width={600} height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
    <AnimatedAxis orientation="bottom" />
    <AnimatedGrid columns={false} numTicks={4} />
    <AnimatedLineSeries dataKey="Line 1" data={data1} {...accessors} />
    <AnimatedLineSeries dataKey="Line 2" data={data2} {...accessors} />
    <Tooltip
      snapTooltipToDatumX
      snapTooltipToDatumY
      showVerticalCrosshair
      showSeriesGlyphs
      renderTooltip={({ tooltipData, colorScale }) => {
        if (tooltipData != undefined && colorScale != undefined) {
          const key = tooltipData.nearestDatum?.key || ''
          const datum = tooltipData.nearestDatum?.datum as {x: string, y: number}
          return <div>
            <div style={{ color:  colorScale(key) }}>
              {key}
            </div>
            {accessors.xAccessor(datum)}
            {', '}
            {accessors.yAccessor(datum)}
          </div>
        }
        return <></>
      }}
    />
  </XYChart>
}




function StatsPage () {

  const routing = useRouting()

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
      <Timeline.Item bullet={<GitBranch size={12}/>} title="Ход 1">
        <Text color="dimmed" size="sm">
          You&apos;ve created new branch from master</Text>
        <Text size="xs" mt={4}>2 hours ago</Text>
      </Timeline.Item>
      <Timeline.Item bullet={<GitBranch size={12}/>} title="Ход 2">
        <Text color="dimmed" size="sm">You&apos;ve pushed 23 commits to</Text>
        <Text size="xs" mt={4}>52 minutes ago</Text>
      </Timeline.Item>
      <Timeline.Item bullet={<GitBranch size={12}/>} title="Ход 3"  lineVariant="dashed">
        <Text color="dimmed" size="sm">You&apos;ve submitted a pull request</Text>
        <Text size="xs" mt={4}>34 minutes ago</Text>
      </Timeline.Item>
      <Timeline.Item bullet={<GitBranch size={12}/>} title="Ход 4" >
        <Text color="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
        <Text size="xs" mt={4}>12 minutes ago</Text>
      </Timeline.Item>
    </Timeline>
  </Drawer>


  const currentUser = useRecoilValue(currentUserAtom)

  const {gamesHistory, updateHistory, pending} = useGamesHistory()
  useEffect(updateHistory, [])


  const setFirstTurnMark = useSetRecoilState(firstTurnMarkAtom)
  const setGame = useSetRecoilState(gameAtom)
  const setGameType = useSetRecoilState(gameTypeAtom)
  const setGameRank = useSetRecoilState(gameRankAtom)
  const setWinCondition = useSetRecoilState(winConditionAtom)


  const onContinueUnfinishedGameClick = (game: GameModel) => {

    currentUser.user?.id == game.playerX
      ? setFirstTurnMark(Mark.X)
      : setFirstTurnMark(Mark.O)

    setGame(game)
    setGameRank(game.board.n)
    setWinCondition(game.board.k)

    switch (game.board.n) {
      case 3: {
        game.board.k === 3
          ? setGameType(GameType.CLASSIC)
          : setGameType(GameType.CUSTOM)
        break
      }
      case 15: {
        game.board.k === 5
          ? setGameType(GameType.GOMOKU)
          : setGameType(GameType.CUSTOM)
        break
      }
      default: {
        setGameType(GameType.CUSTOM)
        break
      }
    }
    routing.go.root()
  }


  const sortedGameHistory = [...gamesHistory]
    .sort((a, b) => {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    })

  const Rows = sortedGameHistory
    .map((unprocessedGame) => {

      const game = {
        id: unprocessedGame.id,
        rank: unprocessedGame.board.n,
        winCondition: unprocessedGame.board.k,
        firstTurn: unprocessedGame.playerX === currentUser.user?.id ? Player.PLAYER : Player.BOT,
        history: unprocessedGame.moves,
        lastPosition: unprocessedGame.board.fields
          .map(field => (
            field === Mark.X
              ? PlaygroundMark.CROSS
              : field === Mark.O
                ? PlaygroundMark.ZERO
                : PlaygroundMark.VOID
          )),
        timestamp: `
          ${new Date(unprocessedGame.startDate).toLocaleDateString()} 
          ${new Date(unprocessedGame.startDate).toLocaleTimeString()}
        `,
        status: unprocessedGame.status === GameStatusModel.DRAW
          ? GameStatus.FINISHED_DRAW
          : unprocessedGame.status === GameStatusModel.NOT_FINISHED
            ? GameStatus.UNFINISHED
            : unprocessedGame.playerX === currentUser.user?.id
              ? unprocessedGame.status === GameStatusModel.X_WIN
                ? GameStatus.FINISHED_WIN
                : GameStatus.FINISHED_LOSE
              : unprocessedGame.status === GameStatusModel.O_WIN
                ? GameStatus.FINISHED_WIN
                : GameStatus.FINISHED_LOSE
      }

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
      const gameRank = game.rank

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
          withPadding
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
          <Text mb={'xs'}>Всего ходов: {game.history.length}</Text>
          <Button onClick={onOpenHistoryClick}>
            Показать
          </Button>
        </td>
        <td>{LastPositionPlaygroundPreview}</td>
        <td>{timestamp}</td>
        <td>
          <Stack>
            {status}
            {game.status == GameStatus.UNFINISHED && <Button onClick={() => {
              onContinueUnfinishedGameClick(unprocessedGame)
            }}>
              Продолжить
            </Button>}
          </Stack>
        </td>
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
    <Group position={'apart'} mb={'md'}>
      <Group noWrap mx={'lg'}>
        <Avatar radius={'xl'}/>
        <UserButton name={'Vladimir Shustov'} email={'wlashcontact@gmail.com'}/>
      </Group>
      <Group>
        <GameMMR/>
        <GameCurrencyBalance/>
      </Group>
    </Group>
    <Accordion variant="separated">
      <Accordion.Item value="stats">
        <Accordion.Control>
          Статистика
        </Accordion.Control>
        <Accordion.Panel>
          <Center>
            <XYChartMock/>
            <XYChartMock/>
          </Center>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  </Paper>

  const LeftPanel = <>
    <TitledCard title={'Задания'}>
      {DailyMock.map(daily =>
        <DailyCard key={`daily/${daily.id}`} { ...daily } />
      )}
    </TitledCard>
    <TitledCard title={'Достижения'}>
      {AchievementsMock.map(achievement =>
        <AchievementsCard key={`achievement/${achievement.id}`} { ...achievement } />
      )}
    </TitledCard>
  </>

  const RightSection = <TitledCard title={'История игр'}>
    <LoadingWrapper loading={pending}>
      <GamesPlayedStats/>
      {GameHistoryTable}
    </LoadingWrapper>
  </TitledCard>


  return <>
    {HistoryDrawer}
    <ProfileLayout
      topPanel={TopPanel}
      leftPanel={LeftPanel}
      rightSection={RightSection}
    />
  </>
}

export default StatsPage;