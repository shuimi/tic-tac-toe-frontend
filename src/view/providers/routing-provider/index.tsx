import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

interface RoutingProviderProps extends PropsWithChildren {}

export const RoutingProvider = (props: RoutingProviderProps) => {

  const {children} = props

  return <>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </>
}