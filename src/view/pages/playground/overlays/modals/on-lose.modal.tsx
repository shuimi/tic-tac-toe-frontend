import { closeAllModals, openModal } from "@mantine/modals";
import { Button, Center, Stack, Text } from "@mantine/core";
import React from "react";


export const onLoseModal = (deltaMMR?: number | null) => openModal({
  centered: true,
  title: 'Жаль, но вы проиграли...',
  children: (
    <Center>
      <Stack>
        <Text>
          Ваш MMR упал на {deltaMMR ? (-deltaMMR) : 0}!
        </Text>
        <Button onClick={() => {
          closeAllModals()
        }}>
          Ещё разок...
        </Button>
      </Stack>
    </Center>
  ),
})