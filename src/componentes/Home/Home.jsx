import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Home (){
    const [movies, setMovies] = useState([]);
    const Api = 'https://api.themoviedb.org/3/discover/movie';
    const images = 'https://image.tmdb.org/t/p/w500/';

    const MovieCall = async () =>{
        const data = await axios.get (Api,{
          params: {
            api_key:'3bb50757489312cdb75262aa3722fec4'
          }
          })
          const results = data.data.results;
          setMovies(results);
          console.log(movies);
          console.log(images)
          
        };

    useEffect(() =>{
        MovieCall()
      }, []); 


    return (
        <div>
            {movies.map((movie) => {
                return (
                 <div className="">
                    <img src={images + movie.poster_path} alt="image"/>
                    <h3>{movie.title}</h3>
                 </div>
                )
            })};
        </div>
    )
};

export default Home;
