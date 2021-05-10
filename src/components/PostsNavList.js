import React from 'react'
import {Loader} from "../components/Loader";

export const PostsNavList = ({selectHandler, loading, topics}) => {

   if (loading) {
      return <Loader />
   }

   return (
      <>
         {!loading && topics && (
            <div className="input-field col s12">
               <h5>Выберите какую статью хотите изменить</h5>
               <select className="browser-default" onChange={selectHandler}>
                  <option value="Выберите нужный вариант" hidden>Выберите нужный вариант</option>
                  {topics.map(link => {
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