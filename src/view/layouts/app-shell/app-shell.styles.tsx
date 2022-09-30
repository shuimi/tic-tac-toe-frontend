import { MantineTheme } from "@mantine/core";

export const shellBackground = (theme: MantineTheme) => ({
  main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
})