import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import {DocumentsPage} from "./pages/DocumentsPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";
import {ModifyPage} from "./pages/ModifyPage";

// Кастомный хук, возвращающий роуты для авторизованного пользователя и не авторизованного пользователя
export const useRoutes = (isAuth, isAdmin) => {
   if (isAuth && !isAdmin) {
      return (
         <Switch>
            <Route path="/document/" exact >
               <DocumentsPage/>
            </Route>
            <Route path="/detail/:id/">
               <DetailPage/>
            </Route>
            <Redirect to="/document/"/>
         </Switch>
      )
   }

   if (isAuth && isAdmin) {
      return (
         <Switch>
            <Route path="/modify/" exact>
               <ModifyPage/>
            </Route>
            <Route path="/create/" exact>
               <CreatePage/>
            </Route>
            <Route path="/document/" exact >
               <DocumentsPage/>
            </Route>
            <Route path="/detail/:id/">
               <DetailPage/>
            </Route>
            <Redirect to="/document/"/>
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