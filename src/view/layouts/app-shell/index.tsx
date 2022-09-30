import { PropsWithChildren, useState } from "react";
import { AppShell } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import { shellBackground } from "./app-shell.styles";
import { BasicHeader } from "../../components";
import { UserMenu } from "../../organisms";

interface AppShellProps extends PropsWithChildren {}

export function AppShellLayout (props: AppShellProps) {
  const {children} = props

  const [ activePage, setActivePage ] = useState<number>()

  const headerLinks = [
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
  ]

  const Header = <BasicHeader
    avatar={<UserMenu position='top-end' width={260}/>}
    links={headerLinks}
    active={activePage}
    setActive={setActivePage}
  />

  return <AppShell padding={32} header={Header} styles={shellBackground}>
    <NavigationProgress/>
    {children}
  </AppShell>
}