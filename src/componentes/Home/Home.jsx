import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Home (){
    const [movies, setMovies] = useState([]);
    const [randomMov, setRandomMov] = useState({});
    const Api = 'https://api.themoviedb.org/3/discover/movie';
    const images = 'https://image.tmdb.org/t/p/w500/';

    const movieCall = async () =>{
        const data = await axios.get (Api,{
          params: {
            api_key:'3bb50757489312cdb75262aa3722fec4'
          }
          })
          const results = data.data.results;
          setMovies(results);
          const random = Math.floor(Math.random() * results.length);
          const randomMovie = results[random];
          console.log(randomMovie);
          setRandomMov(randomMovie);  
        };

    useEffect(() =>{
        movieCall();
      }, []);



    return (
      <div>
          <div className=''>
              <img src={randomMov ? `${images}${randomMov.backdrop_path}` : ""} alt="image not found"/>
              <h3>{randomMov.title}</h3> 
          </div>
        <div>
            {movies.map((movie, index) => {
                return (
                 <div key={index} className="">
                    <img src={movie ? images + movie.poster_path : ""} alt="image not found"/>
                    <h3>{movie.title}</h3>
                 </div>
                )
            })};
        </div>
      </div>
    )
};

export default Home;
