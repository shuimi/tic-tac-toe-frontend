import React, { ReactNode } from "react";
import { CurrencyEthereum, GardenCart, Icon } from "tabler-icons-react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Group,
  Indicator,
  Stack,
  Text,
  Title,
  UnstyledButton
} from "@mantine/core";


interface ProductCardProps {
  bought?: boolean,
  price?: number,
  onAddClick?: () => void,
  onMoreClick?: () => void,
  title?: ReactNode,
  description?: ReactNode,
  photo?: Icon,
}

export const ProductCard = (props: ProductCardProps) => {

  const {
    bought,
    title,
    description,
    photo,
    price,
    onAddClick,
    onMoreClick
  } = props

  return <Indicator disabled={!bought}>
    <Card>
      <Stack justify={'flex-end'} spacing={0}>
        <Box onClick={onMoreClick}>
          <Center p={'xs'}>
            <Avatar size={156}>
              {photo && photo({size: 156, strokeWidth: 1.2})}
            </Avatar>
          </Center>
          <Card.Section component={Stack} p={'md'} pb={'xl'}>
            <Title order={3}>{title}</Title>
            <Text size={14} style={{height: '3em'}}>{description}</Text>
          </Card.Section>
        </Box>
        <Card.Section component={Stack} px={'md'}>
          <Group position={'apart'}>
            <UnstyledButton style={{ height: '2.4em' }} component={Group}>
              <CurrencyEthereum/>
              <Text size={16}>{price}</Text>
            </UnstyledButton>
            {
              !bought &&
                <Button onClick={onAddClick} leftIcon={<GardenCart size={22} strokeWidth={1.3}/>}>
                    Купить
                </Button>
            }
          </Group>
        </Card.Section>
      </Stack>
    </Card>
  </Indicator>
}
