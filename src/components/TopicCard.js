import React from "react";

export const TopicCard = ({links}) => {

   return (
         <>
            <h2>{links.subTitle}</h2>
            <div dangerouslySetInnerHTML={{__html: links.description}}></div>
         </>

   )
}