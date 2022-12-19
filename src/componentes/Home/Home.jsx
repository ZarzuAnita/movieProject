import React, {Fragment} from 'react';
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
    const Api = 'https://api.themoviedb.org/3/discover/movie';
    const images = 'https://image.tmdb.org/t/p/w500/';
    const ApiSeries = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
    const ApiMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
    const ApiFiction = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=2&with_genres=878&with_watch_monetization_types=flatrate`;
    const ApiThriller = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=2&with_genres=53&with_watch_monetization_types=flatrate`;
    const ApiComedy = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=35&without_genres=99&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;
    const ApiComedy2 = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=2&timezone=America%2FNew_York&with_genres=35&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;
    const ApiDocumentary = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=99&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

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
          for(let i = 0; i < 10; i++){
          topRatedAux.push(currentTopSeries[i], currentTopMovies[i])
         };
         setTopRated(topRatedAux);

         const fictionMoviesData = await axios.get (ApiFiction,{
          params: {
            api_key: process.env.REACT_APP_API_KEY
          }
         });
         const currentFictionMovies = fictionMoviesData.data.results;
         setFictionMovies(currentFictionMovies);

         const thrillerMoviesData = await axios.get (ApiThriller,{
          params: {
            api_key: process.env.REACT_APP_API_KEY
          }
         });
         const currentThrillerMovies = thrillerMoviesData.data.results;
         setThrillerMovies(currentThrillerMovies);

         const comedySeriesData = await axios.get (ApiComedy,{
          params: {
            api_key: process.env.REACT_APP_API_KEY
          }
         });
         const comedySeriesData2 = await axios.get(ApiComedy2,{
          params: {
            api_key: process.env.REACT_APP_API_KEY
          }
         });
         const currentComedySeries = comedySeriesData.data.results;
         const currentComedySeries2= comedySeriesData2.data.results;
         setComedySeries(currentComedySeries.concat(currentComedySeries2));

         const documentarySeriesData = await axios.get(ApiDocumentary,{
          params: {
            api_key: process.env.REACT_APP_API_KEY
          }
         });
         const currentDocumentarySeries = documentarySeriesData.data.results;
         setDocumentarySeries(currentDocumentarySeries);


        };
      
    useEffect(() =>{
        movieCall();
      }, []);


      const settings = {
        className: "center",
        centerMode: true,
        centerPadding: "60px",
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 500,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    
      const opts = {
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
        },
      };
    



    return (

      <Fragment>
      <div className='simple'>
          <div className=''>
              <img src={randomMov ? `${images}${randomMov.backdrop_path}` : ""} alt="image not found"/>
              <h3>{randomMov.title}</h3> 
          </div>
          
          <div className="simple">
            <h2>Top Rated</h2>
            
            {topRated.map((movie, index) => {
                return (
                  
                 <div key={index} className="">
                  
                    <img width='200' src={movie ? images + movie.poster_path : ""} alt="image not found"/>
                 
                </div>
              
                )})};
     
        </div>
        <div className="simple">
            <h2>Discover Movies</h2>
            
            {movies.map((movie, index) => {
                return (
                 <div key={index} className="">
                    <img width='200' src={movie ? images + movie.poster_path : ""} alt="image not found"/>
                   
                </div>
                )})};
           
        </div>
        
        <div className="simple">
            <h2>Fiction Movies</h2>
           
            {fictionMovies.map((movie, index) => {
                return (
                 <div key={index} className="">
                    <img width='200'src={movie ? images + movie.poster_path : ""} alt="image not found"/>
                </div>
                )})};
           
        </div>
        <div className="simple">
            <h2>Thriller Movies</h2>
            
            {thrillerMovies.map((movie, index) => {
                return (
                 <div key={index} className="">
                    <img width='200' src={movie ? images + movie.poster_path : ""} alt="image not found"/>
                </div>
                )})};
           
        </div>
        <div className="simple">
            <h2>Comedy Series</h2>
           
            {comedySeries.map((movie, index) => {
                return (
                 <div key={index} className="">
                    <img width='200' src={movie.poster_path ? images + movie.poster_path : ""}/>
                </div>
                )})};
            
        </div>
        <div className="simple">
            <h2>Documentary Series</h2>
           
            {documentarySeries.map((movie, index) => {
                return (
                 <div key={index} className="">
                    <img width='200' src={movie ? images + movie.poster_path : ""} alt="image not found"/>
                </div>
                )})};
            
        </div>
      </div>
      </Fragment>
    )
};

export default Home;
