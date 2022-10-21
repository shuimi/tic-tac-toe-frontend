import React, { FC } from 'react'
import {
  Avatar,
  Menu,
  MenuProps,
} from '@mantine/core'
import { Logout } from 'tabler-icons-react'

import { useStyles } from './user-menu.styles'
import { UserButton } from '../../components'
import { useRouting } from '../../../core/hooks/use-routing'
import { useAuth } from '../../../data/hooks/http/auth.hook'

import { useRecoilValue } from 'recoil'
import { currentUserAtom } from "../../../data/stores/atoms/auth"

interface LinkProps {
  label: string;
  link: string;
}

interface UserMenuProps extends Omit<MenuProps, 'children'> {
  links?: LinkProps[];
}

export const UserMenu: FC<UserMenuProps> = (props) => {

  const { links = [], ...other } = props

  const { classes } = useStyles()

  const routing = useRouting()


  const currentUser = useRecoilValue(currentUserAtom)

  const { logout } = useAuth()

  const onUserButtonClick = () => routing.go.to('/profile')

  return <>
    <Menu trigger='hover' openDelay={50} closeDelay={350} shadow={'lg'} {...other}>
      <Menu.Target>
        <Avatar radius='xl'/>
      </Menu.Target>
      <Menu.Dropdown className={classes.menu}>
        <Menu.Label>
          {currentUser.user?.username}
        </Menu.Label>
        <UserButton
          name={currentUser.user?.name || 'Безымянный'}
          email={currentUser.user?.mmr || '0'}
          onClick={onUserButtonClick}
        />
        <Menu.Divider/>
        {
          links.map(link => <Menu.Item
            key={`user-menu/links/${link.link}`}
            onClick={() => routing.go.to(link.link)}
          >
            {link.label}
          </Menu.Item>)
        }
        <Menu.Divider/>
        <Menu.Item icon={<Logout/>} onClick={logout}>
          Выйти
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  </>
}