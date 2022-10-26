import React, { useEffect, useRef } from "react";
import {
  Accordion,
  ActionIcon, Avatar,
  Button,
  Center,
  Container,
  Grid,
  Group,
  Input,
  NumberInput,
  NumberInputHandlers, Paper,
  SegmentedControl,
  Select,
  Stack,
  Text
} from "@mantine/core";
import { PlaygroundGridLayout } from "../../layouts";
import { GameType, Mark, PlaygroundCell, PlaygroundMark } from "../../../data";
import { Refresh } from "tabler-icons-react";
import { TitledCard, UserButton } from "../../components";
import { PlayersOnlineList } from "../../organisms/players-online-list";
import { GlobalChat } from "../../organisms/global-chat";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  enemyIsSelected,
  firstTurnMarkAtom,
  gameIsStarted,
  gameRankAtom,
  gameTypeAtom, isMyTurnSelector,
  selectedEnemyAtom,
  winConditionAtom
} from "./store";
import { useGame } from "../../../data/hooks/http/game.hook";
import { useListState } from "@mantine/hooks";
import { LoadingWrapper } from "../../layouts/loading-wrapper";
import { closeAllModals, closeModal, openModal } from "@mantine/modals";
import { GameCurrencyBalance, GameMMR } from "../../organisms";
import { currentUserAtom } from "../../../data/stores/atoms/auth";
import { usePlayBoardUpdateCron } from "../../../data/cron/playboard.cron";


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
    onWin: () => openModal({
      title: 'Вы победили!',
      children: (
        <Button onClick={() => {
          reset()
          closeAllModals()
        }}>
          Ура!
        </Button>
      ),
    }),
    onLose: () => openModal({
      title: 'Жаль, но вы проиграли...',
      children: (
        <Button onClick={() => {
          reset()
          closeAllModals()
        }}>
          Ещё разок...
        </Button>
      ),
    }),
    onDraw: () => openModal({
      title: 'Ничья! Вы сражались на равных с искуственным интеллектом!',
      children: (
        <Button onClick={() => {
          reset()
          closeAllModals()
        }}>
          Я могу победить его!
        </Button>
      ),
    })
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
      setGameRank(game.board.n)
      setWinCondition(game.board.k)
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
    title={isEnemySelected ? `Новая игра с ${selectedEnemy?.name}` : `Новая игра`}
    style={{width: 180 * 3 + 10}}
  >
    <Group align={'flex-end'}>
      <Select
        label='Тип игры'
        placeholder="Выберите тип пигры"
        data={[
          { value: GameType.CLASSIC, label: 'Классика' },
          { value: GameType.GOMOKU, label: 'Гомоку' },
          { value: GameType.CUSTOM, label: 'Своя' },
        ]}
        value={gameType}
        defaultValue={GameType.CLASSIC}
        onChange={setGameType}
      />
      <Input.Wrapper label={'Размер поля'}>
        <Group spacing={5}>
          <ActionIcon
            size={36}
            variant='default'
            onClick={onDecrementSize}
            disabled={disableSizeControls}
          >
            –
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
      <Input.Wrapper label={'Длина линии'}>
        <Group spacing={5}>
          <ActionIcon
            size={36}
            variant='default'
            onClick={onDecrementWinCondition}
            disabled={disableSizeControls}
          >
            –
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
        <Text size={14} mb={0} p={0}>Первыми ходят</Text>
        <SegmentedControl
          m={0}
          size={'sm'}
          value={firstTurnMark}
          onChange={(value) => setFirstTurnMark(value as Mark)}
          data={[
            { label: 'Крестики', value: Mark.X },
            { label: 'Нолики', value: Mark.O },
            { label: 'Без разницы', value: Mark.EMPTY },
          ]}
        />
      </Stack>
    </Group>
    <Group mt={4}>
      <Button leftIcon={<Refresh/>} onClick={onPlayClick} disabled={!isEnemySelected}>
        Начать игру
      </Button>
    </Group>
  </TitledCard>

  const CurrentGame = <TitledCard
    title={isEnemySelected ? `Новая игра с ${selectedEnemy?.name}` : `Новая игра`}
    style={{width: 180 * 3 + 10}}
  >
    <Group mt={4}>
      <Button leftIcon={<Refresh/>} onClick={onSurrenderClick} disabled={!isGameStarted}>
        Сдаться
      </Button>
      <Button leftIcon={<Refresh/>} onClick={update} disabled={!isGameStarted}>
        Обновить
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
        <GameCurrencyBalance/>
      </Group>
    </Group>
  </Paper>

  const nowIsMyTurn = useRecoilValue(isMyTurnSelector)


  return <Container>
    {TopPanel}
    <Grid>
      <Grid.Col span={'content'}>
        <TitledCard title={'Игроки онлайн'}>
          <PlayersOnlineList/>
        </TitledCard>
      </Grid.Col>
      <Grid.Col span={'auto'}>
        <Stack align={'center'}>
          {isGameStarted ? CurrentGame : GameSettings}
          <Center mb={'sm'}>
            <LoadingWrapper loading={pending}>
              <PlaygroundGridLayout
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
        <TitledCard title={'Общий чат'}>
          <GlobalChat/>
        </TitledCard>
      </Grid.Col>
    </Grid>
  </Container>
}

export default PlaygroundPage;