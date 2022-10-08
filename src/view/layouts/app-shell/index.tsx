import { PropsWithChildren, useState } from "react";
import { AppShell } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import { shellBackground } from "./app-shell.styles";
import { BasicHeader } from "../../components";
import { UserMenu } from "../../organisms";

const appLinks = [
  {
    level: 0,
    id: 0,
    label: 'Игра',
    link: '/',
    header: true,
  },
  {
    level: 0,
    id: 1,
    label: 'Профиль',
    link: 'profile',
    header: true,
  },
  {
    level: 0,
    id: 2,
    label: 'Магазин',
    link: 'shop',
    header: true,
  },
]

interface AppShellProps extends PropsWithChildren {}

export function AppShellLayout (props: AppShellProps) {

  const {children} = props

  const [activePage, setActivePage] = useState<number>()

  const UserMenuInstance = <UserMenu
    links={appLinks}
    position='top-end'
    width={260}
  />

  const Header = <BasicHeader
    avatar={UserMenuInstance}
    links={appLinks}
    active={activePage}
    setActive={setActivePage}
  />

  return <AppShell padding={32} header={Header} styles={shellBackground}>
    <NavigationProgress/>
    {children}
  </AppShell>
}