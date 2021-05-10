import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";

export const DocumentsPage = () => {
   const [links, setLinks] = useState([])
   const {loading, request} = useHttp()
   const {token} = useContext(AuthContext)

   const fetchLinks = useCallback( async () => {
      try {
         const fetched = await request('/api/document', 'GET', null, {
            Authorization: `Bearer ${token}`
         })

         setLinks(fetched)
      } catch (e) {

      }

   }, [token, request])

   useEffect(() => {
      fetchLinks()
   }, [fetchLinks])


   if (loading) {
      return <Loader/>
   }

   return (
      <>
         {!loading && <LinksList links={links}/>}
      </>
   )
}