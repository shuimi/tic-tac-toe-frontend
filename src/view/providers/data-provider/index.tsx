import { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";

interface DataProviderProps extends PropsWithChildren {}

export const DataProvider = (props: DataProviderProps) => {

  const {children} = props

  return <>
    <RecoilRoot>
      {children}
    </RecoilRoot>
  </>
}