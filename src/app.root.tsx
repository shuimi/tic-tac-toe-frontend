import React from 'react';
import { AppProvider } from "./app.provider";
import { Route, Routes } from "react-router-dom";
import { AppShellLayout } from "./view";

import SignUpPage from "./view/pages/sign-up";
import SignInPage from "./view/pages/sign-in";
import PlaygroundPage from "./view/pages/playground";
import ProfilePage from "./view/pages/profile";
import ShopPage from "./view/pages/shop";

export const AppRoot = () => {

  const Authorized = <AppShellLayout>
    <Routes>
      <Route path={'/'} element={<PlaygroundPage/>} />
      <Route path={'/profile'} element={<ProfilePage/>} />
      <Route path={'/shop'} element={<ShopPage/>} />
    </Routes>
  </AppShellLayout>

  const Unauthorized = <Routes>
    <Route path={'/'} element={<SignInPage/>} />
    <Route path={'/signup'} element={<SignUpPage/>} />
  </Routes>

  return <AppProvider>
    {Authorized}
  </AppProvider>
}
