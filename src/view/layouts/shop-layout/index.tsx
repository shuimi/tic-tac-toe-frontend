import React, { ReactNode } from "react";
import {
  Avatar,
  Button,
  Card,
  Center,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  UnstyledButton
} from "@mantine/core";
import {
  Alien,
  Analyze,
  Assembly,
  Atom,
  AugmentedReality,
  Baguette,
  BallBaseball,
  BallBasketball,
  BallBowling,
  BallFootball,
  BallVolleyball,
  Barrel,
  BrandAmongus,
  BrandTelegram, CurrencyEthereum, Icon
} from "tabler-icons-react";



interface ShopFiltersProps {
}

export const ShopFiltersPanel = (props: ShopFiltersProps) => {

  const {} = props

  return <>
  </>
}



interface ProductCardProps {
  price?: number,
  onAddClick?: () => void,
  onMoreClick?: () => void,
  title?: ReactNode,
  description?: ReactNode,
  photo?: Icon,
}

export const ProductCard = (props: ProductCardProps) => {

  const {title, description, photo, price, onAddClick, onMoreClick} = props

  return <Card>
    <Stack justify={'flex-end'} spacing={0}>
      <Center p={'xs'}>
        <Avatar size={156}>
          {photo && photo({size: 156, strokeWidth: 1.2})}
        </Avatar>
      </Center>
      <Card.Section component={Stack} p={'md'}>
        <Title order={3}>{title}</Title>
        <Text size={14}>{description}</Text>
      </Card.Section>
      <Card.Section component={Stack} px={'md'}>
        <Group position={'apart'}>
          <UnstyledButton component={Group}>
            <CurrencyEthereum/>
            <Text size={16}>{price}</Text>
          </UnstyledButton>
          <Button>В корзину</Button>
        </Group>
      </Card.Section>
    </Stack>
  </Card>
}


const skinsMock = [
  {
    id: 0,
    price: 29,
    title: 'Alien',
    description: 'Зелёные человечки покажут, кто здесь главный.',
    photo: Alien
  },
  {
    id: 1,
    price: 29,
    title: 'Analyze',
    description: 'Макс, анализ.',
    photo: Analyze
  },
  {
    id: 2,
    price: 29,
    title: 'Assembly',
    description: 'MASM, TASM, NASM, WASM...',
    photo: Assembly
  },
  {
    id: 3,
    price: 29,
    title: 'Atom',
    description: 'Это про Prolog или про Recoil?',
    photo: Atom
  },
  {
    id: 4,
    price: 29,
    title: 'Augmented Reality',
    description: 'Коробка в рамках.',
    photo: AugmentedReality
  },
  {
    id: 5,
    price: 29,
    title: 'Basketball',
    description: 'Высокий? Любишь отбивать? Высоко прыгаешь?',
    photo: BallBasketball
  },
  {
    id: 6,
    price: 29,
    title: 'Bowling',
    description: 'Любите катать шары? Мы идём к вам!',
    photo: BallBowling
  },
  {
    id: 7,
    price: 29,
    title: 'Football',
    description: 'Для тех, кто любит гонять мяч при помощи ног.',
    photo: BallFootball
  },
  {
    id: 8,
    price: 29,
    title: 'Baseball',
    description: 'Главное не перепутать биту и клюшку для гольфа, как Кейчи...',
    photo: BallBaseball
  },
  {
    id: 9,
    price: 29,
    title: 'Volleyball',
    description: 'Стандарт. Играл каждый.',
    photo: BallVolleyball
  },
  {
    id: 10,
    price: 29,
    title: 'Baguette',
    description: 'Сражение по-французски.',
    photo: Baguette
  },
  {
    id: 11,
    price: 29,
    title: 'Barrel',
    description: 'Следишь за стоимостью нефти?',
    photo: Barrel
  },
  {
    id: 12,
    price: 29,
    title: 'Amogus',
    description: '~-Амогус-~ Ту-ду-ду ту-ду-ду... ту-дуду...',
    photo: BrandAmongus
  },
  {
    id: 13,
    price: 29,
    title: 'Telegram',
    description: 'Любитель бумажных самолётиков?',
    photo: BrandTelegram
  }
]


interface ShopLayoutProps {
}

export const ShopLayout = (props: ShopLayoutProps) => {
  return <Container>
    <SimpleGrid cols={6}>
      {skinsMock.map(skin => <ProductCard key={`skin-card/${skin.id}`} {...skin} />)}
    </SimpleGrid>
  </Container>
}