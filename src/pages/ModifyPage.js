import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import {DocumentsPage} from "./DocumentsPage";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {PostsNavList} from "../components/PostsNavList";
import {useMessage} from "../hooks/message.hook";

export const ModifyPage = () => {
   const history = useHistory()
   const auth = useContext(AuthContext)
   const {request} = useHttp()
   const message = useMessage()
   const [titleToChange, setTitleToChange] = useState('')
   const [subTitleToChange, setSubTitleToChange] = useState('')
   const [modifyTitle, setModifyTitle] = useState('')
   const [modifySubTitle, setModifySubTitle] = useState('')
   const [modifyDescription, setModifyDescription] = useState('')

   useEffect( () => {
      window.M.updateTextFields();
   }, [])


   const fetchTopics = useCallback( async () => {
      try {
         const fetched = await request('/api/document', 'GET', null, {
            Authorization: `Bearer ${auth.token}`
         })

      } catch (e) {

      }

   }, [auth.token, request])

   useEffect(() => {
      fetchTopics()
   }, [fetchTopics])

   const pressHandler = async (e) => {
      try {
         const data = await request('/api/document/modify', 'POST', {
            titleToChange,
            subTitleToChange,
            modifyTitle,
            modifySubTitle,
            modifyDescription,
         }, {
            Authorization: `Bearer ${auth.token}` // Проверка авторизации, делали через миддлвару
         })

         message('Данные изменены')

         history.push(`/detail/${data.article.topic._id}`) // перход на страницу с документацией
      }
      catch (e) {

      }
   }
   const selectHandler = (e) => {
      const selectValue = e.target.value.split('&&')
      setTitleToChange(selectValue[0]);
      setSubTitleToChange(selectValue[1]);
      setModifyTitle(selectValue[0]);
      setModifySubTitle(selectValue[1]);
      setModifyDescription(selectValue[2]);
   }

   return (
      <div className="row" style={{}}>
         <div className="col s4" style={{paddingTop: '2rem'}}>
            <PostsNavList selectHandler={selectHandler} />
         </div>

         <div className="col s8" style={{paddingTop: '2rem'}}>
            <h6>Название раздела, который хотите изменить</h6>
            <input
               id="title"
               type="text"
               value={titleToChange}
               disabled
               style={{color: "red"}}
            />
            <h6>Название подраздела, который хотите изменить</h6>
            <input
               id="subTitle"
               type="text"
               value={subTitleToChange}
               style={{color: "red"}}
               disabled
            />
            <h6>Введите измененное название раздела</h6>
            <input
               placeholder="Название раздела"
               id="description"
               type="text"
               value={modifyTitle? modifyTitle : titleToChange}
               onChange={e => setModifyTitle(e.target.value)}
            />
            <label htmlFor="title">Введите новое название раздела (Если хотите	&nbsp;
               <span style={{color: 'red'}}>
                  удалить 	&nbsp;
               </span>
               раздел, оставьте пустым )
            </label>

            <h6>Введите измененное название подраздела</h6>
            <input
               placeholder="Название подраздела"
               id="newSubTitle"
               type="text"
               value={modifySubTitle? modifySubTitle : subTitleToChange}
               onChange={e => setModifySubTitle(e.target.value)}
            />
            <label htmlFor="title">Введите новое название подраздела (Если хотите &nbsp;
               <span style={{color: 'red'}}>
                  удалить
               </span>&nbsp;
               подраздел, оставьте пустым)
            </label>
            <h6>Введите новый контент подраздела</h6>
            <CKEditor
               editor={ ClassicEditor }
               data={`${modifyDescription}`}
               onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  setModifyDescription(data)
               } }
            />
            <label htmlFor="description">Вставьте контент подраздела</label>

         </div>
         <button onClick={pressHandler} style={{margin: '0 auto'}} className="btn yellow darken-4" >Изменить</button>
      </div>
   )
}