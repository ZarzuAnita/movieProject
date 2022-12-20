import React, {Fragment, Component} from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai';
import Slider from 'react-slick';
import '../SimpleSlider/slick.css';
import '../SimpleSlider/slick-theme.css';
import './homeStyle.css'
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
import notAvailable from './notAvailable.png';
import { random } from 'lodash';


function Home (){
    const [movies, setMovies] = useState([]);
    const [topSeries, setTopSeries] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [randomMov, setRandomMov] = useState({});
    const [topRated, setTopRated] = useState([]);
    const [fictionMovies, setFictionMovies] = useState([]);
    const [thrillerMovies, setThrillerMovies] = useState([]);
    const [comedySeries, setComedySeries] = useState([]);
    const [documentarySeries, setDocumentarySeries] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const Api = 'https://api.themoviedb.org/3/discover/movie';
    const images = 'https://image.tmdb.org/t/p/w500/';
    const ApiSeries = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
    const ApiMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
    const ApiFiction = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=2&with_genres=878&with_watch_monetization_types=flatrate`;
    const ApiThriller = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=2&with_genres=53&with_watch_monetization_types=flatrate`;
    const ApiComedy = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=35&without_genres=99&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;
    const ApiComedy2 = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=2&timezone=America%2FNew_York&with_genres=35&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;
    const ApiDocumentary = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=99&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;
    const trailerApi = `https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=${process.env.REACT_APP_API_KEY}`;

    const movieCall = async () =>{
        //llamada peli random.
        const data = await axios.get (Api,{
          params: {
            api_key: process.env.REACT_APP_API_KEY
          }
          });
          const results = data.data.results;
          const defMovies = results.slice(0, 6);
          setMovies(defMovies);
          console.log(defMovies)
          const random = Math.floor(Math.random() * results.length);
          const randomMovie = results[random];
          setRandomMov(randomMovie);

          // llamada top rated con series y pelis concatenadas.
          const tvData = await axios.get (ApiSeries,{
            params: {
              api_key: process.env.REACT_APP_API_KEY
            }
          });

          const currentTopSeries = tvData.data.results;
          setTopSeries(currentTopSeries);

          const moviesData = await axios.get (ApiMovies,{
            params: {
              api_key: process.env.REACT_APP_API_KEY
            }
          });
          const currentTopMovies = moviesData.data.results;
          setTopMovies(currentTopMovies);
          // bucle para mezclarlas en un mismo array y renderizarlas después
          let topRatedAux = [];
          for(let i = 0; i < 3; i++){
          topRatedAux.push(currentTopSeries[i], currentTopMovies[i])
         };
         setTopRated(topRatedAux);

         // llamada para peliculas de ficción
         const fictionMoviesData = await axios.get (ApiFiction,{
          params: {
            api_key: process.env.REACT_APP_API_KEY
          }
         });
         const currentFictionMovies = fictionMoviesData.data.results;
         const defFictionMovies = currentFictionMovies.slice(0, 6);
         setFictionMovies(defFictionMovies);

         // llamada para peliculas de thriller
         const thrillerMoviesData = await axios.get (ApiThriller,{
          params: {
            api_key: process.env.REACT_APP_API_KEY
          }
         });
         const currentThrillerMovies = thrillerMoviesData.data.results;
         const defThrillerMovies = currentThrillerMovies.slice(0, 6);
         setThrillerMovies(defThrillerMovies);

        // llamada para series de comedia
         const comedySeriesData = await axios.get(ApiComedy2,{
          params: {
            api_key: process.env.REACT_APP_API_KEY
          }
         });
         const currentComedySeries= comedySeriesData.data.results;
         const defCurrentComedySeries = currentComedySeries.slice(0, 6);
         setComedySeries(defCurrentComedySeries);

         // llamada para series documentales.
         const documentarySeriesData = await axios.get(ApiDocumentary,{
          params: {
            api_key: process.env.REACT_APP_API_KEY
          }
         });
         const currentDocumentarySeries = documentarySeriesData.data.results;
        const defDocumentarySeries = currentDocumentarySeries.slice(0, 6);
        setDocumentarySeries(defDocumentarySeries);
        };
    
        //use effect que ejecuta todas las calls y la actualizacion de los estados donde se guarda la info de las llamadas.

      const getMovieTrailer = async (movieId) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
        const data = await response.json();
        return data;
      }
    
      const handlePlayClick = async (movieId) => {
        const movieTrailer = await getMovieTrailer(movieId);
        console.log(movieTrailer)
        setTrailer(movieTrailer);
      }
    
      const handleCloseClick = () => {
        setTrailer(null);
      }
    
      const handleReady = (event) => {
        event.target.playVideo();
      };


      useEffect(() =>{
        movieCall();
      }, []);
    
    
    
    
      const opts = {
        width: '100%',
        height: '400px',
        playerVars: {
          autoplay: 1,
        },
      };
      function toTop() {
        window.scrollTo(0, 0);
      }
    
    

    return (
      <div className='simple'>
              <div id= 'trailer'>        
              </div>
              <Fragment>
              <div>
        {trailer && (
          <YouTube         
            videoId={trailer.results[0] ? trailer.results[0].key : "trailer not found"}
            onReady={handleReady}
            opts={opts}  
          />
        )}
        <div style={{ display: trailer ? 'block' : 'none' }}>
          <AiOutlineClose className="trailerClose" onClick={handleCloseClick} />
        </div>
      </div>

           {/*  random movie */}
          <div className='ri-background'>
              <img className='random-image' width='750' height='350' src={randomMov ? `${images}${randomMov.backdrop_path}` : notAvailable} alt="image not found"/>
              <div className='ri-text'>
                <fieldset>
              <h2>{randomMov.title}</h2>
              <p>Rating : {randomMov.vote_average}</p>
              <h4>Synopsis</h4>
              <p>{randomMov.overview}</p>
              </fieldset>
              </div> 
          </div>
          
          <div className=''>
            <h2>Top Rated</h2>
          </div>
          <div className="tablero">
           {topRated.map((movie) => (
              <div>
              <img width="200" src={movie.poster_path ? `${images}${movie.poster_path}` : notAvailable} alt="" />
              <a onClick={toTop}><AiFillPlayCircle onClick={() => handlePlayClick(movie.id)} color='purple' fontSize={45} id='playIcon'/></a>
              </div>
           ))}
        </div>
        
        <div>
            <h2>Discover Movies</h2>
            </div>
            <div className="tablero">
            {movies.map((movie) => (
                 <div>
                    <img width='200' src={movie ? images + movie.poster_path : notAvailable} alt="image not found"/>
                    <a onClick={toTop}><AiFillPlayCircle onClick={() => handlePlayClick(movie.id)} color='purple' fontSize={45} id='playIcon'/></a>
                </div>
                ))}
        </div>
        
        <div>
            <h2>Fiction Movies</h2>
           </div>
           <div className="tablero">
            {fictionMovies.map((movie) => (
                 <div>
                    <img width='200'src={movie ? images + movie.poster_path : notAvailable} alt="image not found"/>
                    <a onClick={toTop}><AiFillPlayCircle onClick={() => handlePlayClick(movie.id)} color='purple' fontSize={45} id='playIcon'/></a>
                </div>
                ))}
           
        </div>
        <div>
            <h2>Thriller Movies</h2>
            </div>
            <div className="tablero">
            {thrillerMovies.map((movie) => (
                 <div>
                    <img width='200' src={movie ? images + movie.poster_path : notAvailable} alt="image not found"/>
                    <a onClick={toTop}><AiFillPlayCircle onClick={() => handlePlayClick(movie.id)} color='purple' fontSize={45} id='playIcon'/></a>
                </div>
                ))}
           
        </div>
        <div>
            <h2>Comedy Series</h2>
           </div>
           <div className="tablero">
            {comedySeries.map((movie) => (
                 <div>
                    <img width='200' src={movie.poster_path ? images + movie.poster_path : notAvailable}/>
                    <a onClick={toTop}><AiFillPlayCircle onClick={() => handlePlayClick(movie.id)} color='purple' fontSize={45} id='playIcon'/></a>
                </div>
                ))}
            
        </div>
        <div className=''>
            <h2>Documentary Series</h2>
           </div>
           <div className="tablero">
            {documentarySeries.map((movie) => (
            <div>
            <img width='200' src={movie.poster_path ? `${images}${movie.poster_path}` : notAvailable} alt='' />
            <a onClick={toTop}><AiFillPlayCircle onClick={() => handlePlayClick(movie.id)} color='purple' fontSize={45} id='playIcon'/></a>
          </div>

                ))}
            
        </div>
        </Fragment>
      </div>
    )
};

export default Home;
