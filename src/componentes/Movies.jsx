import axios from 'axios'
import React, { Fragment, useEffect } from 'react'

 function Movies() {
  const Api = 'https://api.themoviedb.org/3/discover/movie'
  const MovieCall = async () =>{
      const data = await axios.get (Api,{
        params: {
          api_key:'3bb50757489312cdb75262aa3722fec4'
        }
        })
        console.log (data.data.results)
      }
        useEffect(() =>{
    MovieCall()
  }, [])      
    return (
    <Fragment>
      <h1>Movies</h1>
    </Fragment>
  
  )
}


export default Movies