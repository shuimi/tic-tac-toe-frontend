import React from 'react';
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  UnstyledButtonProps,
} from '@mantine/core';
import { ChevronRight } from 'tabler-icons-react';
import { useStyles } from "./user-button.styles";

interface UserButtonProps extends UnstyledButtonProps, React.ComponentPropsWithoutRef<'button'> {
  image?: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

export function UserButton({ image = undefined, name, email, icon, ...others }: UserButtonProps) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} {...others} p={'sm'}>
      <Group>
        {image && <Avatar src={image} radius="xl"/>}
        <div style={{ flex: 1 }}>
          <Text size="sm">
            {name}
          </Text>
          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>
        {icon || <ChevronRight size={14}/>}
      </Group>
    </UnstyledButton>
  );
}