import React, { PropsWithChildren } from "react";
import { Group, Title, UnstyledButton } from "@mantine/core";
import { ChevronRight } from "tabler-icons-react";


interface CardTitleProps extends PropsWithChildren {
  onClick?: () => void,
}

export const CardTitle = (props: CardTitleProps) => {

  const {children, onClick} = props

  return <UnstyledButton onClick={onClick} component={Group} mx={'md'} mt={'xs'} mb={'lg'} >
    <Title order={4}>
      { children }
    </Title>
    <ChevronRight size={16}/>
  </UnstyledButton>
}