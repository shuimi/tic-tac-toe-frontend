import { PropsWithChildren } from "react";
import { ColorScheme, ColorSchemeProvider, Global, MantineProvider } from "@mantine/core";
import { mantineGlobalStyles, MantineThemeConfig } from "./configs";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

interface UiProviderProps extends PropsWithChildren {}

export const UiProvider = (props: UiProviderProps) => {

  const {children} = props

  const [ colorScheme, setColorScheme ] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([ [ 'mod+J', () => toggleColorScheme() ] ])


  return <>
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <Global styles={mantineGlobalStyles}/>
      <MantineProvider  theme={{
        ...MantineThemeConfig,
        colorScheme: colorScheme,
      }} withGlobalStyles withNormalizeCSS>

        <ModalsProvider>
          <NotificationsProvider>
            {children}
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  </>
}