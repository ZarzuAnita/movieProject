import axios from 'axios'
import React, { Fragment } from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import { useState, useEffect } from 'react';
import notAvailable from './notAvailable.png';
import '../styles/moviesStyle.css'


function Movies() {

  const [popularMovies, setPopularMovies] = useState([]);
  const [comedy, setComedyMovies] = useState([])
  const [drama, setDramaMovies] = useState([])
  const [sf, setSFMovies] = useState([])
  const [western, setWesternMovies] = useState([])


  const Api = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`;
  const Images = 'https://image.tmdb.org/t/p/w500';

  const PopularMoviesCall = async () => {
    const respMovie = await axios.get(Api, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
        include_adult:'default',
        include_video:'default',
        with_genres:'28'

      }
    })
    const results = respMovie.data.results;
    setPopularMovies(results)
    console.log(popularMovies)

    const respComedy = await axios.get(Api, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
        include_adult:'default',
        include_video:'default',
        with_genres:'35'

      }
    })
    const results2 = respComedy.data.results;
    setComedyMovies(results2)
    console.log(comedy)



    const respDrama = await axios.get(Api, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
        include_adult:'false',
        include_video:'default',
        with_genres:'18'

      }
    })
    const results3 = respDrama.data.results;
    setDramaMovies(results3)
    console.log(comedy)



    const respSF = await axios.get(Api, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
        include_adult:'false',
        include_video:'default',
        with_genres:'878'

      }
    })
    const results4 = respSF.data.results;
    setSFMovies(results4)
    console.log(sf)


    const respwestern = await axios.get(Api, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
        include_adult:'false',
        include_video:'default',
        with_genres:'37'

      }
    })
    const results5 = respwestern.data.results;
    setWesternMovies(results5)
    console.log(western)


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
    
      <div className="tablero">
          <h2>Comedy</h2> 
              {comedy.map((movie) => (
              <div className='movies'>                
                <img width='200' src={movie.poster_path ? `${Images}${movie.poster_path}` : notAvailable} alt='' />
                <AiFillPlayCircle color='purple' fontSize={45} id='playIcon' />
              </div>
            ))}
      </div>

      <div className="tablero">
          <h2>Drama</h2> 
              {drama.map((movie) => (
              <div className='movies'>                
                <img width='200' src={movie.poster_path ? `${Images}${movie.poster_path}` : notAvailable} alt='' />
                <AiFillPlayCircle color='purple' fontSize={45} id='playIcon' />
              </div>
            ))}
      </div>


      <div className="tablero">
          <h2>Science Fiction</h2> 
              {sf.map((movie) => (
              <div className='movies'>                
                <img width='200' src={movie.poster_path ? `${Images}${movie.poster_path}` : notAvailable} alt='' />
                <AiFillPlayCircle color='purple' fontSize={45} id='playIcon' />
              </div>
            ))}
      </div>

      <div className="tablero">
          <h2>Western</h2> 
              {western.map((movie) => (
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