import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";

export const PostsNavList = ({selectHandler}) => {
   const {token} = useContext(AuthContext)
   const {request, loading} = useHttp()
   const [links, setLinks] = useState(null)

   const getLinks = useCallback(async () => {
      try {
         const fetched = await request(`/api/document/`, 'GET', null, {
            Authorization: `Bearer ${token}`
         })

         setLinks(fetched)
      } catch (e) {
         console.log(e)
      }
   }, [token, request])

   useEffect(() => {
      getLinks()
   }, [getLinks])

   if (loading) {
      return <Loader />
   }

   return (
      <>
         {!loading && links && (
            <div className="input-field col s12">
               <h5>Выберите какую статью хотите изменить</h5>
               <select className="browser-default" onChange={selectHandler}>
                  <option value="Выберите нужный вариант" hidden>Выберите нужный вариант</option>
                  {links.map(link => {
                     return (
                        <optgroup key={link._id} label={link.title}>
                           {link.description.map( desc => <option key={desc._id} value={`${link.title}&&${desc.subTitle}&&${desc.description}`}>{desc.subTitle}</option>)}
                        </optgroup>
                     )
                  })}
               </select>
            </div>
         )}
      </>
   )
}