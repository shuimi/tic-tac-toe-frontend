import React, { FC, ReactNode } from 'react'
import {
  Avatar,
  Menu,
  MenuProps,
} from '@mantine/core'
import { Logout } from 'tabler-icons-react'

import { useStyles } from './user-menu.styles'
import { UserButton } from "../../components";
import { useRouting } from "../../../core/hooks/use-routing";

interface LinkProps {
  label: string;
  link: string;
}

interface UserMenuProps extends Omit<MenuProps, 'children'> {
  links?: LinkProps[];
}

export const UserMenu: FC<UserMenuProps> = (props) => {

  const { links = [], ...other} = props

  const { classes } = useStyles()

  const routing = useRouting()


  const login = `@login`
  const avatar = null

  const fullName = 'Vladimir Shustov'
  const email = 'email'


  const onLogoutClick = () => { return }

  const onUserButtonClick = () => routing.go.to('/profile')

  return <>
    <Menu trigger='hover' openDelay={50} closeDelay={350} shadow={'lg'} {...other}>
      <Menu.Target>
        <Avatar radius='xl' src={avatar}/>
      </Menu.Target>
      <Menu.Dropdown className={classes.menu}>
        <Menu.Label>{login}</Menu.Label>
        <UserButton name={fullName} email={email || 'empty'} onClick={onUserButtonClick}/>
        <Menu.Divider/>
        {links.map(link => <Menu.Item onClick={() => routing.go.to(link.link)}>
          {link.label}
        </Menu.Item>)}
        <Menu.Divider/>
        <Menu.Item icon={<Logout/>} onClick={onLogoutClick}>
          Выйти
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  </>
}