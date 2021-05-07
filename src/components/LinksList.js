import React from 'react';
import {Link} from "react-router-dom";

export const LinksList = ({links}) => {
   if (!links.length) {
      return <p className="center">Ссылок пока нет</p>
   }

   return links.map(link => (
         <ul className="collection with-header" key={link._id}>
            <li className="collection-header"><h4>{link.title}</h4></li>
            {link.description.map((desc) => (
               <li className="collection-item" key={desc._id}>
                  <div>{desc.subTitle}<Link to={`/detail/${desc._id}`} className="secondary-content"><i className="material-icons">send</i></Link></div>
               </li>
            ))}
         </ul>
      ))

}