import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export const CreatePage = () => {
   const history = useHistory()
   const auth = useContext(AuthContext)
   const {request} = useHttp()
   const [title, setTitle] = useState('')
   const [subTitle, setSubTitle] = useState('')
   const [description, setDescription] = useState('')

   useEffect( () => {
      window.M.updateTextFields();
   }, [])

   const pressHandler = async (e) => {
      try {
        const data = await request('/api/document/generate', 'POST', {
           title,
           subTitle,
           description
        }, {
           Authorization: `Bearer ${auth.token}` // Проверка авторизации, делали через миддлвару
        })

         history.push(`/detail/${data.article.topic._id}`) // перход на страницу с документацией
      }
      catch (e) {

      }
   }

   return (
      <div className="row" style={{display: "flex", flexDirection: "column"}}>
         <div className="col s8 offset-s2" style={{padding: '2rem'}}>
            <input
               placeholder="Введите название раздела"
               id="title"
               type="text"
               onChange={e => setTitle(e.target.value)}
            />
            <label htmlFor="title">Введите название раздела</label>
            <input
               placeholder="Введите название подраздела"
               id="subTitle"
               type="text"
               onChange={e => setSubTitle(e.target.value)}
            />
            <label htmlFor="subTitle">Введите название подраздела</label>
            <input
               placeholder="Вставьте контент подраздела"
               id="description"
               type="text"
               onChange={e => setDescription(e.target.value)}
            />
            <label htmlFor="description">Вставьте контент подраздела</label>

         </div>
         <button onClick={pressHandler} style={{margin: '0 auto'}} className="btn yellow darken-4" >Создать</button>

      </div>
   )
}