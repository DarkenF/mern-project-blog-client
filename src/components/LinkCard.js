import React from "react";

export const LinkCard = ({links}) => {

   return (
         <>
            <h2>{links.subTitle}</h2>
            <p dangerouslySetInnerHTML={{__html: links.description}}></p>
         </>

   )
}