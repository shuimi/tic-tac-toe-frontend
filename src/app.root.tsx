import React, { useEffect } from 'react';
import { AppProvider } from "./app.provider";
import { Route, Routes } from "react-router-dom";
import { AppShellLayout } from "./view";

import SignUpPage from "./view/pages/sign-up";
import SignInPage from "./view/pages/sign-in";
import PlaygroundPage from "./view/pages/playground";
import StatsPage from "./view/pages/stats";
import ShopPage from "./view/pages/shop";
import Error404Page from "./view/pages/errors/404";
import Error500Page from "./view/pages/errors/500";

import { isAuthenticatedSelector } from "./data/stores/atoms/auth";
import { useRecoilValue } from "recoil";
import { userPingCron } from "./data/cron/users.cron";



const AuthRouter = () => {

  const isAuthenticated = useRecoilValue(isAuthenticatedSelector)

  useEffect(() => {
    if (isAuthenticated) {
      userPingCron.start()
    }
  }, [isAuthenticated])

  const Authorized = <AppShellLayout>
    <Routes>
      <Route path={'/'} element={<PlaygroundPage/>} />
      <Route path={'/stats'} element={<StatsPage/>} />
      <Route path={'/shop'} element={<ShopPage/>} />
      <Route path='*' element={<Error404Page/>}/>
      <Route path='500' element={<Error500Page/>}/>
    </Routes>
  </AppShellLayout>

  const Unauthorized = <Routes>
    <Route path={'/'} element={<SignInPage/>} />
    <Route path={'/signup'} element={<SignUpPage/>} />
  </Routes>

  return isAuthenticated ? Authorized : Unauthorized
}


export const AppRoot = () => {

  return <AppProvider>
    <AuthRouter/>
  </AppProvider>
}
