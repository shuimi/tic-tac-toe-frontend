import {
  Button,
  Card,
  Center,
  Container,
  Stack,
  Text,
  Progress,
  Group,
  ActionIcon,
  NumberInput,
  NumberInputHandlers
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { PlaygroundGridLayout } from "../../layouts";
import { Cell, Mark } from "../../../data";
import { Refresh } from "tabler-icons-react";
import { useEffect, useRef, useState } from "react";


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
      <Group position='center' grow>
        <Card
          withBorder
          radius="md"
          p="xl"
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          })}
        >
          <Text size="xs" transform="uppercase" weight={700} color="dimmed">
            Monthly goal
          </Text>
          <Text size="lg" weight={500}>
            $5.431 / $10.000
          </Text>
          <Progress value={54.31} mt="md" size="lg" radius="xl" />
        </Card>
        <Card
          withBorder
          radius="md"
          p="xl"
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          })}
        >
          <Text size="xs" transform="uppercase" weight={700} color="dimmed">
            Monthly goal
          </Text>
          <Text size="lg" weight={500}>
            $5.431 / $10.000
          </Text>
          <Progress value={54.31} mt="md" size="lg" radius="xl" />
        </Card>
      </Group>

      <Center mb={'lg'}>
        <PlaygroundGridLayout
          rank={gameRank}
          data={playgroundCells}
          onCellClick={onCellClick}
          sellSize={ROW_MAX_HEIGHT / gameRank - (30 / gameRank)}
          spacing={30 / gameRank}
        />
      </Center>

      <Group spacing={5}>
        <ActionIcon size={42} variant="default" onClick={onDecrementSize}>
          –
        </ActionIcon>
        <NumberInput
          hideControls
          value={gameRank}
          onChange={(val) => val && setGameRank(val)}
          handlersRef={handlers}
          max={12}
          min={3}
          step={1}
          styles={{ input: { width: 54, height: 42, textAlign: 'center' } }}
        />
        <ActionIcon size={42} variant="default" onClick={onIncrementSize}>
          +
        </ActionIcon>
      </Group>

      <Button leftIcon={<Refresh/>} onClick={onResetClick}>
        Сбросить
      </Button>

    </Stack>
  </Container>
}

export default PlaygroundPage;