import { Grid, Group, Progress, Stack, Text, UnstyledButton } from "@mantine/core";
import { Crown, DeviceGamepad } from "tabler-icons-react";
import React from "react";


export const GamesPlayedStats = () => {

  return <Grid m={'md'} mb={32} align={'center'}>
    <Grid.Col span={'content'}>
      <Stack mr={'lg'}>
        <UnstyledButton component={Group}>
          <DeviceGamepad/>
          <Text size={16}>Всего сыграно:</Text>
          <Text size={16}>1234</Text>
        </UnstyledButton>
        <UnstyledButton component={Group}>
          <Crown/>
          <Text size={16}>Побед:</Text>
          <Text size={16}>1234</Text>
        </UnstyledButton>
      </Stack>
    </Grid.Col>
    <Grid.Col span={'auto'}>
      <Progress
        radius='sm'
        size={24}
        sections={[
          { value: 33, color: 'cyan', label: 'Побед (33%)', tooltip: 'Вы победили 33 раза' },
          { value: 28, color: 'pink', label: 'Поражений (28%)', tooltip: 'Вы потерпели поражение 28 раз' },
          { value: 25, color: 'violet', label: 'Ничьих (25%)', tooltip: 'Вы сыграли в ничью 25 раз' },
        ]}
      />
    </Grid.Col>
  </Grid>
}