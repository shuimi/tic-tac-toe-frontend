import React from 'react';
import { AppProvider } from "./app.provider";
import { Route, Routes } from "react-router-dom";
import { AppShellLayout } from "./view";

import SignUpPage from "./view/pages/sign-up";
import SignInPage from "./view/pages/sign-in";
import PlaygroundPage from "./view/pages/playground";
import StatsPage from "./view/pages/stats";
import ShopPage from "./view/pages/shop";

export const AppRoot = () => {

  const Authorized = <AppShellLayout>
    <Routes>
      <Route path={'/'} element={<PlaygroundPage/>} />
      <Route path={'/stats'} element={<StatsPage/>} />
      <Route path={'/shop'} element={<ShopPage/>} />
    </Routes>
  </AppShellLayout>

  const Unauthorized = <Routes>
    <Route path={'/'} element={<SignInPage/>} />
    <Route path={'/signup'} element={<SignUpPage/>} />
  </Routes>

  return <AppProvider>
    {Unauthorized}
  </AppProvider>
}
