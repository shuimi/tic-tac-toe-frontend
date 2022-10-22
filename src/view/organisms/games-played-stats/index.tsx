import { Grid, Group, Progress, Stack, Text, UnstyledButton } from "@mantine/core";
import { Crown, DeviceGamepad } from "tabler-icons-react";
import React from "react";
import { useRecoilValue } from "recoil";
import { gamesHistoryAtom } from "../../pages/playground/store";
import { GameStatusModel } from "../../../data";
import { currentUserAtom } from "../../../data/stores/atoms/auth";


export const GamesPlayedStats = () => {

  const currentUser = useRecoilValue(currentUserAtom)
  const gamesHistory = useRecoilValue(gamesHistoryAtom)

  const gamesTotal = gamesHistory.length

  const gamesUnfinished = gamesHistory
    .filter(game => game.status === GameStatusModel.NOT_FINISHED).length

  const gamesWon = gamesHistory
    .filter(game =>
      game.status === GameStatusModel.X_WIN && game.playerX === currentUser.user?.id
      || game.status === GameStatusModel.O_WIN && game.playerO === currentUser.user?.id
    ).length

  const gamesDraw = gamesHistory
    .filter(game =>
      game.status === GameStatusModel.DRAW
    ).length

  const gamesLoosed = gamesTotal - (gamesWon + gamesDraw + gamesUnfinished)

  const percent = {
    won: (gamesWon * 100 / gamesTotal).toFixed(2),
    loosed: (gamesLoosed * 100 / gamesTotal).toFixed(2),
    draw: (gamesDraw * 100 / gamesTotal).toFixed(2),
  }

  return <Grid m={'md'} mb={32} align={'center'}>
    <Grid.Col span={'content'}>
      <Stack mr={'lg'}>
        <UnstyledButton component={Group}>
          <DeviceGamepad/>
          <Text size={16}>Всего сыграно:</Text>
          <Text size={16}>{ gamesTotal }</Text>
        </UnstyledButton>
        <UnstyledButton component={Group}>
          <Crown/>
          <Text size={16}>Побед:</Text>
          <Text size={16}>{ gamesWon }</Text>
        </UnstyledButton>
      </Stack>
    </Grid.Col>
    <Grid.Col span={'auto'}>
      <Progress
        radius='sm'
        size={24}
        sections={[
          {
            value: 33,
            color: 'cyan',
            label: `Побед (${percent.won}%)`, tooltip: `Вы победили ${gamesWon} раз(а)`
          },
          {
            value: 28,
            color: 'pink',
            label: `Поражений (${percent.loosed}%)`, tooltip: `Вы потерпели поражение ${gamesLoosed} раз(а)`
          },
          {
            value: 25,
            color: 'violet',
            label: `Ничьих (${percent.draw}%)`, tooltip: `Вы сыграли в ничью ${gamesDraw} раз(а)`
          },
        ]}
      />
    </Grid.Col>
  </Grid>
}