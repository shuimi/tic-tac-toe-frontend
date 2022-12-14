import React, { useEffect, useRef } from "react";
import {
  ActionIcon,
  Avatar,
  Button,
  Center,
  Container,
  Grid,
  Group,
  Input,
  NumberInput,
  NumberInputHandlers,
  Paper,
  SegmentedControl,
  Select,
  Stack,
  Text
} from "@mantine/core";
import { PlaygroundGridLayout } from "../../layouts";
import { GameType, Mark, PlaygroundCell, PlaygroundMark } from "../../../data";
import { Exposure0, Refresh, X } from "tabler-icons-react";
import { TitledCard, UserButton } from "../../components";
import { PlayersOnlineList } from "../../organisms/players-online-list";
import { GlobalChat } from "../../organisms/global-chat";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  enemyIsSelected,
  firstTurnMarkAtom, gameIsFinished,
  gameIsStarted,
  gameRankAtom,
  gameTypeAtom, isMyTurnSelector,
  selectedEnemyAtom,
  winConditionAtom
} from "./store";
import { useGame } from "../../../data/hooks/http/game.hook";
import { useListState } from "@mantine/hooks";
import { LoadingWrapper } from "../../layouts/loading-wrapper";
import { GameMMR } from "../../organisms";
import { currentUserAtom } from "../../../data/stores/atoms/auth";
import { onDrawModal, onLoseModal, onWinModal } from "./overlays";


function PlaygroundPage () {

  const ROW_MAX_HEIGHT = 180 * 3

  const isEnemySelected = useRecoilValue(enemyIsSelected)
  const selectedEnemy = useRecoilValue(selectedEnemyAtom)

  const [gameRank, setGameRank] = useRecoilState(gameRankAtom)
  const [winCondition, setWinCondition] = useRecoilState(winConditionAtom)

  const gameRankHandlers = useRef<NumberInputHandlers>()
  const winConditionHandlers = useRef<NumberInputHandlers>()

  const onIncrementSize = () => gameRankHandlers.current?.increment()
  const onDecrementSize = () => gameRankHandlers.current?.decrement()
  const onIncrementWinCondition = () => winConditionHandlers.current?.increment()
  const onDecrementWinCondition = () => winConditionHandlers.current?.decrement()

  const [gameType, setGameType] = useRecoilState(gameTypeAtom)

  useEffect(() => {
    switch (gameType) {
      case GameType.CLASSIC: {
        setGameRank(3)
        setWinCondition(3)
        break
      }
      case GameType.GOMOKU: {
        setGameRank(15)
        setWinCondition(5)
        break
      }
    }
  }, [gameType])

  useEffect(() => {
    if (winCondition > gameRank)
      setWinCondition(gameRank)
  }, [gameRank])

  const disableSizeControls = gameType !== GameType.CUSTOM

  const {pending, game, start, move, reset, update} = useGame({
    onWin: onWinModal,
    onLose: onLoseModal,
    onDraw: onDrawModal,
  })

  const isGameStarted = useRecoilValue(gameIsStarted)

  const getInitialPlayground = (gameRank: number) => [...Array(gameRank * gameRank)]
    .map((element, index) => ({
      position: index,
      mark: PlaygroundMark.VOID,
      protected: true,
    }))

  const [playgroundCells, playgroundHandlers] = useListState<PlaygroundCell>(getInitialPlayground(gameRank))

  const getPlaygroundCells = () => {
    if (game?.board) {
      return game?.board.fields.map((field, index) => ({
        position: index,
        mark: field === Mark.X
          ? PlaygroundMark.CROSS
          : field === Mark.O
            ? PlaygroundMark.ZERO
            : PlaygroundMark.VOID,
        protected: field != Mark.EMPTY
      }))
    }
    else {
      return getInitialPlayground(gameRank)
    }
  }

  // usePlayBoardUpdateCron(2000)

  useEffect(() => {
    if (game) {
      playgroundHandlers.setState(getPlaygroundCells())
    }
  }, [])

  useEffect(() => {
    playgroundHandlers.setState(getPlaygroundCells())
  }, [game])

  useEffect(() => {
    playgroundHandlers.setState(getInitialPlayground(gameRank))
  }, [gameRank])

  const onCellClick = (index: number) => move(index)
  const onPlayClick = () => start()
  const onSurrenderClick = () => reset()


  const [firstTurnMark, setFirstTurnMark] = useRecoilState(firstTurnMarkAtom)


  const GameSettings = <TitledCard
    title={isEnemySelected ? `?????????? ???????? ?? ${selectedEnemy?.name}` : `?????????? ????????`}
    style={{width: 180 * 3 + 10}}
  >
    <Group align={'flex-end'}>
      <Select
        label='?????? ????????'
        placeholder="???????????????? ?????? ??????????"
        data={[
          { value: GameType.CLASSIC, label: '????????????????' },
          { value: GameType.GOMOKU, label: '????????????' },
          { value: GameType.CUSTOM, label: '????????' },
        ]}
        value={gameType}
        defaultValue={GameType.CLASSIC}
        onChange={setGameType}
      />
      <Input.Wrapper label={'???????????? ????????'}>
        <Group spacing={5}>
          <ActionIcon
            size={36}
            variant='default'
            onClick={onDecrementSize}
            disabled={disableSizeControls}
          >
            ???
          </ActionIcon>
          <NumberInput
            disabled={disableSizeControls}
            hideControls
            value={gameRank}
            onChange={(val) => val && setGameRank(val)}
            handlersRef={gameRankHandlers}
            max={15}
            min={3}
            step={1}
            styles={{ input: { width: 54, height: 34, textAlign: 'center' } }}
          />
          <ActionIcon
            size={36}
            variant='default'
            onClick={onIncrementSize}
            disabled={disableSizeControls}
          >
            +
          </ActionIcon>
        </Group>
      </Input.Wrapper>
      <Input.Wrapper label={'?????????? ??????????'}>
        <Group spacing={5}>
          <ActionIcon
            size={36}
            variant='default'
            onClick={onDecrementWinCondition}
            disabled={disableSizeControls}
          >
            ???
          </ActionIcon>
          <NumberInput
            disabled={disableSizeControls}
            hideControls
            value={winCondition}
            onChange={(val) => val && setWinCondition(val)}
            handlersRef={winConditionHandlers}
            max={gameRank}
            min={3}
            step={1}
            styles={{ input: { width: 54, height: 34, textAlign: 'center' } }}
          />
          <ActionIcon
            size={36}
            variant='default'
            onClick={onIncrementWinCondition}
            disabled={disableSizeControls}
          >
            +
          </ActionIcon>
        </Group>
      </Input.Wrapper>
    </Group>
    <Group mt={4}>
      <Stack spacing={2} mb={'lg'}>
        <Text size={14} mb={0} p={0}>?????????????? ??????????</Text>
        <SegmentedControl
          m={0}
          size={'sm'}
          value={firstTurnMark}
          onChange={(value) => setFirstTurnMark(value as Mark)}
          data={[
            { label: '????????????????', value: Mark.X },
            { label: '????????????', value: Mark.O },
            { label: '?????? ??????????????', value: Mark.EMPTY },
          ]}
        />
      </Stack>
    </Group>
    <Group mt={4}>
      <Button leftIcon={<Refresh/>} onClick={onPlayClick} disabled={!isEnemySelected}>
        ???????????? ????????
      </Button>
    </Group>
  </TitledCard>

  const CurrentGame = <TitledCard
    title={isEnemySelected ? `?????????? ???????? ?? ${selectedEnemy?.name}` : `?????????? ????????`}
    style={{width: 180 * 3 + 10}}
  >
    <Stack mx={'md'} mb={'md'}>
      <Group>
        <Text>
          ???? ?????????????? ????:
        </Text>
        <Avatar>
          {firstTurnMark == Mark.X ? <X/> : <Exposure0/> }
        </Avatar>
      </Group>
      <Text>
        ?????????????? ??????????: {game?.moves.length}
      </Text>
      <Text>
        <Group>
          ?????? ???????????? ?????????????????? ?? ?????????? {game?.board.k}
          <Avatar size={'sm'}>
            {firstTurnMark == Mark.X ? <X/> : <Exposure0/> }
          </Avatar>
        </Group>
      </Text>
    </Stack>
    <Group mt={4}>
      <Button leftIcon={<Refresh/>} onClick={onSurrenderClick} disabled={!isGameStarted}>
        ??????????????
      </Button>
      <Button leftIcon={<Refresh/>} onClick={update} disabled={!isGameStarted}>
        ????????????????
      </Button>
    </Group>
  </TitledCard>



  const currentUser = useRecoilValue(currentUserAtom)

  const TopPanel = <Paper mb={'xl'} p={'md'} radius={'md'}>
    <Group position={'apart'}>
      <Group noWrap mx={'lg'}>
        <Avatar radius={'xl'}/>
        <UserButton name={currentUser.user?.name || ''} email={currentUser.user?.username || ''}/>
      </Group>
      <Group>
        <GameMMR/>
        {/*<GameCurrencyBalance/>*/}
      </Group>
    </Group>
  </Paper>

  const isGameFinished = useRecoilValue(gameIsFinished)
  const nowIsMyTurn = useRecoilValue(isMyTurnSelector)


  return <Container>
    {TopPanel}
    <Grid>
      <Grid.Col span={'content'}>
        <TitledCard title={'???????????? ????????????'}>
          <PlayersOnlineList/>
        </TitledCard>
      </Grid.Col>
      <Grid.Col span={'auto'}>
        <Stack align={'center'}>
          {isGameStarted ? CurrentGame : GameSettings}
          <Center mb={'sm'}>
            <LoadingWrapper loading={pending}>
              <PlaygroundGridLayout
                disabled={isGameFinished}
                rank={gameRank}
                data={playgroundCells}
                onCellClick={onCellClick}
                sellSize={ROW_MAX_HEIGHT / gameRank - (30 / gameRank)}
                spacing={30 / gameRank}
                withPadding
              />
            </LoadingWrapper>
          </Center>
        </Stack>
      </Grid.Col>
      <Grid.Col span={'content'}>
        <TitledCard title={'?????????? ??????'}>
          <GlobalChat/>
        </TitledCard>
      </Grid.Col>
    </Grid>
  </Container>
}

export default PlaygroundPage;