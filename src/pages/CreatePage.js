import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useMessage} from "../hooks/message.hook";

export const CreatePage = () => {
   const history = useHistory()
   const auth = useContext(AuthContext)
   const message = useMessage()
   const {request} = useHttp()
   const [title, setTitle] = useState('')
   const [subTitle, setSubTitle] = useState('')
   const [description, setDescription] = useState('')

   useEffect( () => {
      window.M.updateTextFields();
   }, [])

   const pressHandler = async (e) => {
      try {
        const data = await request('/api/document/generate/', 'POST', {
           title,
           subTitle,
           description
        }, {
           Authorization: `Bearer ${auth.token}` // Проверка авторизации, делали через миддлвару
        })
         message('Статья создана')

         history.push(`/detail/${data.article.section._id}/`) // перход на страницу с документацией
      }
      catch (e) {

      }
   }

   return (
      <div className="row" style={{display: "flex", flexDirection: "column"}}>
         <div className="col s8 offset-s2" style={{padding: '2rem'}}>
            <h6>Введите название раздела</h6>
            <input
               placeholder="Введите название раздела"
               id="title"
               type="text"
               onChange={e => setTitle(e.target.value)}
            />
            <h6 >Введите название подраздела</h6>
            <input
               placeholder="Введите название подраздела"
               id="subTitle"
               type="text"
               onChange={e => setSubTitle(e.target.value)}
            />
            <h6>Создайте контент подраздела</h6>
            <CKEditor
               editor={ ClassicEditor }
               data={`${description}`}
               onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  setDescription(data)
               } }
            />
         </div>
         <button onClick={pressHandler} style={{margin: '0 auto'}} className="btn yellow darken-4" >Создать</button>

      </div>
   )
}