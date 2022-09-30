import { createStyles } from "@mantine/core";

export const HEADER_HEIGHT = 57

export const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  linksGroup: {
    height: '100%',
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 0,
  },

  avatar: {
    display: 'flex',
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingLeft: `1.5em`,
    paddingRight: `1.5em`,
  },

  mainLink: {
    height: '100%',
    fontSize: 14,
    fontWeight: 400,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    paddingLeft: `1.5em`,
    paddingRight: `1.5em`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottom: '2px solid transparent',
    transition: 'border-color 100ms ease, color 100ms ease',

    '&:hover': {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      textDecoration: 'none',
    },
  },

  mainLinkActive: {
    color: theme.colors.primary[0],
    borderBottomColor: theme.colors.primary[0],
  },
}))
