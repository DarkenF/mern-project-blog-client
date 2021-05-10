import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {TopicCard} from "../components/TopicCard";

export const DetailPage = () => {
   const {token} = useContext(AuthContext)
   const {request, loading} = useHttp()
   const [links, setLinks] = useState(null)
   const linkId = useParams().id

   const getLinks = useCallback(async () => {
      try {
         const fetched = await request(`/api/document/${linkId}/`, 'GET', null, {
            Authorization: `Bearer ${token}`
         })

         setLinks(fetched)
      } catch (e) {
         console.log(e)
      }
   }, [token, linkId, request])

   useEffect(() => {
      getLinks()
   }, [getLinks])

   if (loading) {
      return <Loader />
   }

   return (
      <>
         {!loading && links && <TopicCard links={links}/>}
      </>
   )
}