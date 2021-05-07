import React from "react";

export const LinkCard = ({links}) => {

   return (
         <>
            <h2>{links.subTitle}</h2>
            <p>{links.description}</p>
         </>

   )
}