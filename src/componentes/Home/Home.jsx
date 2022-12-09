import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Home (){
    const [movies, setMovies] = useState([]);
    const [topSeries, setTopSeries] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [randomMov, setRandomMov] = useState({});
    const [topRated, setTopRated] = useState([]);
    const Api = 'https://api.themoviedb.org/3/discover/movie';
    const images = 'https://image.tmdb.org/t/p/w500/';
    const ApiSeries = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
    const ApiMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

    const movieCall = async () =>{
        const data = await axios.get (Api,{
          params: {
            api_key: process.env.REACT_APP_API_KEY
          }
          })
          const results = data.data.results;
          setMovies(results);
          const random = Math.floor(Math.random() * results.length);
          const randomMovie = results[random];
          setRandomMov(randomMovie);
          
          const tvData = await axios.get (ApiSeries,{
            params: {
              api_key: process.env.REACT_APP_API_KEY
            }
          })
          const currentTopSeries = tvData.data.results;
          setTopSeries(currentTopSeries);

          const moviesData = await axios.get (ApiMovies,{
            params: {
              api_key: process.env.REACT_APP_API_KEY
            }
          })
          const currentTopMovies = moviesData.data.results;
          setTopMovies(currentTopMovies);

          let topRatedAux = [];
          for(let i = 0; i < currentTopSeries.length; i++){
          topRatedAux.push(currentTopSeries[i], currentTopMovies[i])
         };

         setTopRated(topRatedAux);

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
            <h3>Top Rated</h3>
            {topRated.map((movie, index) => {
                return (
                 <div key={index} className="">
                    <img src={movie ? images + movie.poster_path : ""} alt="image not found"/>
                </div>
                )})};
        </div>
        <div>
            <h3>Movies</h3>
            {movies.map((movie, index) => {
                return (
                 <div key={index} className="">
                    <img src={movie ? images + movie.poster_path : ""} alt="image not found"/>
                    <h3>{movie.title}</h3>
                </div>
                )})};
        </div>
      </div>
    )
};

export default Home;
