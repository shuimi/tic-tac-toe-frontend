import { useEffect, useRef, useState } from "react";
import {
  Button,
  Center,
  Container,
  Stack,
  Group,
  ActionIcon,
  NumberInput,
  NumberInputHandlers, Select, Input
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { PlaygroundGridLayout } from "../../layouts";
import { Cell, GameType, Mark } from "../../../data";
import { Refresh } from "tabler-icons-react";
import { TitledCard } from "../../components";


function PlaygroundPage () {

  const ROW_MAX_HEIGHT = 180 * 3

  const [gameRank, setGameRank] = useState(3)
  const handlers = useRef<NumberInputHandlers>()

  const getInitialPlayground = (gameRank: number) => [...Array(gameRank * gameRank)]
    .map((element, index) => ({
      position: index,
      mark: Mark.VOID,
      protected: false,
    }))

  const [playgroundCells, playgroundHandlers] = useListState<Cell>(getInitialPlayground(gameRank))


  useEffect(() => {
    playgroundHandlers.setState(getInitialPlayground(gameRank))
  }, [gameRank])


  const onIncrementSize = () => handlers.current?.increment()

  const onDecrementSize = () => handlers.current?.decrement()

  const onCellClick = (index: number) => {
    playgroundHandlers.setItem(index, {
      position: index,
      mark: Mark.CROSS,
      protected: true,
    })
  }

  const onResetClick = () => {
    playgroundHandlers.setState(getInitialPlayground(gameRank))
  }


  return <Container>
    <Stack align={'center'}>
      <TitledCard title={'Новая игра'} style={{width: 180 * 3 + 10}} withBorder>
        <Group align={'flex-end'}>
          <Select
            label='Тип игры'
            placeholder="Выберите тип пигры"
            data={[
              { value: GameType.CLASSIC, label: 'Классика' },
              { value: GameType.GOMOKU, label: 'Гомоку' },
              { value: GameType.CUSTOM, label: 'Своя' },
            ]}
            defaultValue={GameType.CLASSIC}
          />
          <Input.Wrapper label={'Размер поля'}>
            <Group spacing={5}>
              <ActionIcon size={36} variant="default" onClick={onDecrementSize}>
                –
              </ActionIcon>
              <NumberInput
                hideControls
                value={gameRank}
                onChange={(val) => val && setGameRank(val)}
                handlersRef={handlers}
                max={15}
                min={3}
                step={1}
                styles={{ input: { width: 54, height: 34, textAlign: 'center' } }}
              />
              <ActionIcon size={36} variant="default" onClick={onIncrementSize}>
                +
              </ActionIcon>
            </Group>
          </Input.Wrapper>
          <Input.Wrapper label={'Длина линии'}>
            <Group spacing={5}>
              <ActionIcon size={36} variant='default'>
                –
              </ActionIcon>
              <NumberInput
                hideControls
                max={gameRank}
                min={3}
                step={1}
                styles={{ input: { width: 54, height: 34, textAlign: 'center' } }}
              />
              <ActionIcon size={36} variant='default'>
                +
              </ActionIcon>
            </Group>
          </Input.Wrapper>
        </Group>
        <Button leftIcon={<Refresh/>} onClick={onResetClick}>
          Сбросить
        </Button>
      </TitledCard>
      <Center mb={'lg'}>
        <PlaygroundGridLayout
          rank={gameRank}
          data={playgroundCells}
          onCellClick={onCellClick}
          sellSize={ROW_MAX_HEIGHT / gameRank - (30 / gameRank)}
          spacing={30 / gameRank}
          withPadding
        />
      </Center>
    </Stack>
  </Container>
}

export default PlaygroundPage;