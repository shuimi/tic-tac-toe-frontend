import { PropsWithChildren } from "react";
import { UiProvider, RoutingProvider, DataProvider } from "./view";

interface AppProviderProps extends PropsWithChildren {}

export const AppProvider = (props: AppProviderProps) => {

  const {children} = props

  return <>
    <DataProvider>
      <RoutingProvider>
        <UiProvider>
          {children}
        </UiProvider>
      </RoutingProvider>
    </DataProvider>
  </>
}