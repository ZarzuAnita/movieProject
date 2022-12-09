import axios from 'axios'
import React, { Fragment } from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import { useState, useEffect } from 'react';
import notAvailable from './notAvailable.png';
import _ from 'lodash';
import '../styles/moviesStyle.css'

function Movies() {

  const [popularMovies, setPopularMovies] = useState([]);

  const Api = 'https://api.themoviedb.org/3/discover/movie';
  const Images = 'https://image.tmdb.org/t/p/w500';

  const PopularMoviesCall = async () => {
    const respMovie = await axios.get(Api, {
      params: {
        api_key: '3bb50757489312cdb75262aa3722fec4',
        language: 'en-US',
        include_adult:'default',
        include_video:'default',
        with_genres:'28'

      }
    })
    const results = respMovie.data.results;
    setPopularMovies(results)
    console.log(popularMovies)

  }
  useEffect(() => {
    PopularMoviesCall()
  }, [])
  console.log(popularMovies)


  return (
    <Fragment>
      <div className="tablero">
          <h2>Action</h2> 
              {popularMovies.map((movie) => (
              <div className='movies'>                
                <img width='200' src={movie.poster_path ? `${Images}${movie.poster_path}` : notAvailable} alt='' />
                <AiFillPlayCircle color='purple' fontSize={45} id='playIcon' />
              </div>
            ))}
      </div>
    
    </Fragment>
  )
};


export default Movies;