import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";

// Кастомный хук, возвращающий роуты для авторизованного пользователя и не авторизованного пользователя
export const useRoutes = (isAuth) => {
   if (isAuth) {
      return (
         <Switch>
            <Route path="/documents" exact>
               <LinksPage/>
            </Route>
            <Route path="/create" exact>
               <CreatePage/>
            </Route>
            <Route path="/detail/:id">
               <DetailPage/>
            </Route>
            <Redirect to="/create"/>
         </Switch>
      )
   }

   return (
      <Switch>
         <Route path="/" exact>
            <AuthPage/>
         </Route>
         <Redirect to="/"/>
      </Switch>
   )
}