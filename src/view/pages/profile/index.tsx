import { AchievementsCard, DailyCard, ProfileCard, ProfileLayout } from "../../layouts/profile-layout";
import { Avatar, Group, Paper, Table, Text, UnstyledButton } from "@mantine/core";
import { UserButton } from "../../components";
import { CurrencyEthereum } from "tabler-icons-react";
import React from "react";


const DailyMock = [
  {
    id: 0,
    title: 'Боевая машина',
    description: 'Победить или взять ничью 4 раза, игаря второй ход',
    done: 2,
    total: 4,
    finished: false,
    reward: 8,
  },
  {
    id: 1,
    title: 'Дипломат',
    description: '10 раз завершить игру ничьей',
    done: 7,
    total: 10,
    finished: false,
    reward: 5,
  },
  {
    id: 2,
    title: 'Грандмастер',
    description: '10 раз завершить игру победой',
    done: 10,
    total: 10,
    finished: true,
    reward: 10,
  },
]

const AchievementsMock = [
  {
    id: 0,
    title: 'Big daddy',
    description: 'Сыграть игру на поле 12x12'
  },
  {
    id: 1,
    title: 'Маэстро-сто',
    description: 'Ни разу не проиграть, сыграв 100 игр подряд'
  },
]

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

function ProfilePage () {
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ));
  return <>
    <ProfileLayout
      topPanel={
        <Paper mb={'xl'} p={'md'} radius={'md'}>
          <Group position={'apart'}>
            <Group noWrap mx={'lg'}>
              <Avatar radius={'xl'}/>
              <UserButton name={'Vladimir Shustov'} email={'wlashcontact@gmail.com'}/>
            </Group>
            <UnstyledButton component={Group} mx={'lg'}>
              <CurrencyEthereum/>
              <Text size={20}>2321</Text>
            </UnstyledButton>
          </Group>
        </Paper>
      }
      leftPanel={
        <>
          <ProfileCard title={'Задания'}>
            {DailyMock.map(daily =>
              <DailyCard key={`daily/${daily.id}`} { ...daily } />
            )}
          </ProfileCard>
          <ProfileCard title={'Достижения'}>
            {AchievementsMock.map(achievement =>
              <AchievementsCard key={`achievement/${achievement.id}`} { ...achievement } />
            )}
          </ProfileCard>
        </>
      }
      rightSection={
        <ProfileCard title={'История игр'}>
          <Table>
            <thead>
            <tr>
              <th>Element position</th>
              <th>Element name</th>
              <th>Symbol</th>
              <th>Atomic mass</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ProfileCard>
      }
    />
  </>
}

export default ProfilePage;