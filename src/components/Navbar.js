import React, {useContext} from 'react'
import {NavLink, useHistory } from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";

export const NavBar = ({isAdmin}) => {
   const history = useHistory()
   const auth = useContext(AuthContext)
   const logoutHandler = (event) => {
      event.preventDefault();
      auth.logout();
      history.push('/')
   }

   return (
      <nav>
         <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem'}}>
            <NavLink to='/documents' className="brand-logo l">MERN</NavLink>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
               {isAdmin && (
                  <>
                     <li><NavLink to="/create">Создать</NavLink></li>
                     <li><NavLink to="/modify">Изменить</NavLink></li>
                  </>
               )}
               <li><NavLink to="/document">Документация</NavLink></li>
               <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
            </ul>
         </div>
      </nav>
   )
}