import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {PostsNavList} from "../components/PostsNavList";
import {useMessage} from "../hooks/message.hook";

export const ModifyPage = () => {

   const history = useHistory()
   const auth = useContext(AuthContext)
   const {request, loading} = useHttp()
   const message = useMessage()
   const [state, setState] = useState({
      titleToChange: '',
      subTitleToChange: '',
      modifyTitle: '',
      modifySubTitle: '',
      modifyDescription: '',
   })
   const [topics, setTopics] = useState(null)

   useEffect( () => {
      window.M.updateTextFields();
   }, [])


   const fetchTopics = useCallback( async () => {
      try {
         const fetched = await request('/api/document/', 'GET', null, {
            Authorization: `Bearer ${auth.token}`
         })
         setTopics(fetched)
      } catch (e) {}
   }, [auth.token, request])

   useEffect(() => {
      fetchTopics()
   }, [fetchTopics])

   const pressHandler = async (e) => {
      try {
         const data = await request('/api/document/modify/', 'POST', {...state}, {
            Authorization: `Bearer ${auth.token}` // Проверка авторизации, делали через миддлвару
         })

         message('Данные изменены')

         history.push(`/detail/${data.article.topic._id}/`) // перход на страницу с документацией
      }
      catch (e) {

      }
   }
   const selectHandler = (e) => {
      const selectValue = e.target.value.split('&&')
      setState(prevState => {
         return {
            ...prevState,
            titleToChange: selectValue[0],
            modifyTitle: selectValue[0],
            subTitleToChange: selectValue[1],
            modifySubTitle: selectValue[1],
            modifyDescription: selectValue[2],
         }
      })
   }

   return (
      <div className="row" style={{}}>
         <div className="col s4" style={{paddingTop: '2rem'}}>
            <PostsNavList selectHandler={selectHandler} topics={topics} loading={loading}/>
         </div>

         <div className="col s8" style={{paddingTop: '2rem'}}>
            <h6>Название раздела, который хотите изменить</h6>
            <input
               id="title"
               type="text"
               value={state.titleToChange}
               disabled
               style={{color: "red"}}
            />
            <h6>Название подраздела, который хотите изменить</h6>
            <input
               id="subTitle"
               type="text"
               value={state.subTitleToChange}
               style={{color: "red"}}
               disabled
            />
            <h6>Введите измененное название раздела</h6>
            <input
               placeholder="Название раздела"
               id="description"
               type="text"
               value={state.modifyTitle? state.modifyTitle : state.titleToChange}
               onChange={e => setState((prev) => {return {...prev, modifyTitle: e.target.value}})}
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
               value={state.modifySubTitle? state.modifySubTitle : state.subTitleToChange}
               onChange={e => setState((prev) => {return {...prev, modifySubTitle: e.target.value}})}
            />
            <label htmlFor="title">Введите новое название подраздела (Если хотите &nbsp;
               <span style={{color: 'red'}}>
                  удалить
               </span>&nbsp;
               подраздел, оставьте пустым)
            </label>
            <div style={{color: 'red'}}>
                  Для удления отдельной статьи из раздела, заполните поле "Название раздела", а поле "Название подраздела" оставьте пустым
            </div>
            <h6>Введите новый контент подраздела</h6>
            <CKEditor
               editor={ ClassicEditor }
               data={`${state.modifyDescription}`}
               onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  setState((prev) => {return {...prev, modifyDescription: data}})
               } }
            />
            <label htmlFor="description">Вставьте контент подраздела</label>

         </div>
         <button onClick={pressHandler} style={{margin: '0 auto'}} className="btn yellow darken-4" >Изменить</button>
      </div>
   )
}