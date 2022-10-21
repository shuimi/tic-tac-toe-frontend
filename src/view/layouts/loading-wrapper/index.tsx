import { LoadingOverlay } from "@mantine/core";
import React, { FC, PropsWithChildren } from "react";

export const LoadingWrapper: FC<PropsWithChildren<{loading: boolean}>> = ({ children, loading }) => {
  return <div style={(loading ? { position: 'relative' } : {})}>
    <LoadingOverlay visible={loading}/>
    { children }
  </div>
}