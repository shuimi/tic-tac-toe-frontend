import { closeAllModals, openModal } from "@mantine/modals";
import { Button, Center, Text, Stack } from "@mantine/core";
import React from "react";


export const onWinModal = (deltaMMR?: number | null) => openModal({
  centered: true,
  title: 'Вы победили!',
  children: (
    <Center>
      <Stack>
        <Text>
          Вы получили {deltaMMR} MMR!
        </Text>
        <Button onClick={() => {
          closeAllModals()
        }}>
          Ура!
        </Button>
      </Stack>
    </Center>
  ),
})