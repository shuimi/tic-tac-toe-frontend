import { Avatar, Card, Group, Stack, Text, Badge, UnstyledButton, createStyles, Checkbox } from "@mantine/core";
import { ChevronRight, ThreeDCubeSphere } from "tabler-icons-react";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedEnemyAtom, usersOnlineAtom } from "../../pages/playground/store";
import { useUsers } from "../../../data/hooks/http/users.hook";
import { useUncontrolled } from "@mantine/hooks";


const useStyles = createStyles((theme, { checked }: { checked: boolean }) => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    transition: 'background-color 150ms ease, border-color 150ms ease',
    border: `1px solid ${
      checked
        ? theme.fn.variant({ variant: 'outline', color: theme.primaryColor }).border
        : theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    backgroundColor: checked
      ? theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background
      : theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.white,
  },

  body: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
}))

interface ImageCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  login?: string,
  mmr?: string,
  photo?: string,
  isBot?: boolean,
}

export function PlayerCard({
  checked,
  defaultChecked,
  onChange,
  title,
  className,
  login,
  mmr,
  photo,
  isBot,
  ...others
}: ImageCheckboxProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof ImageCheckboxProps>) {

  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  });

  const { classes, cx } = useStyles({ checked: value });

  return (
    <UnstyledButton
      {...others}
      onClick={() => handleChange(!value)}
      className={cx(classes.button, className)}
    >
      <div className={classes.body}>
        <Group position={'apart'}>
          <Group>
            <Avatar radius={'xl'} mr={'md'} src={photo}/>
            <Stack justify={'center'} spacing={0} mr={'md'}>
              <Group>
                <Text>{login}</Text>
                {isBot && <Badge size={'sm'}>Бот</Badge>}
              </Group>
              <Group align={'center'}>
                <ThreeDCubeSphere size={16}/>
                <Text size={14}>MMR:</Text>
                <Text size={14}>{ mmr }</Text>
              </Group>
            </Stack>
          </Group>
          <ChevronRight size={16}/>
        </Group>
      </div>
    </UnstyledButton>
  )
}


export const PlayersOnlineList = () => {

  const usersOnline = useRecoilValue(usersOnlineAtom)
  const [selectedEnemy, setSelectedEnemy] = useRecoilState(selectedEnemyAtom)

  const {updateUsersOnline} = useUsers()

  useEffect(() => {
    updateUsersOnline()
  }, [])

  return <Stack style={{height: 700, width: 464}}>
    {
      usersOnline
        ?.map(playerOnline =>
        <PlayerCard
          checked={playerOnline.id === selectedEnemy?.id}
          key={`players-list/player/${playerOnline.id}`}
          login={playerOnline.username}
          mmr={playerOnline.mmr}
          isBot={playerOnline.bot}
          onChange={(checked) => {
            if (checked) setSelectedEnemy(playerOnline)
          }}
        />
      )
    }
  </Stack>
}