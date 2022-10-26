import { closeAllModals, openModal } from "@mantine/modals";
import { Button, Center } from "@mantine/core";
import React from "react";


export const onDrawModal = () => openModal({
  centered: true,
  title: 'Ничья! Вы сражались на равных с искуственным интеллектом!',
  children: (
    <Center>
      <Button onClick={() => {
        closeAllModals()
      }}>
        Я могу победить его!
      </Button>
    </Center>
  ),
})
