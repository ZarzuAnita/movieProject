import axios from 'axios'
import React, { Fragment, Component } from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import { useState, useEffect } from 'react';
import notAvailable from './notAvailable.png';
import Slider from 'react-slick';
import "./SimpleSlider/slick.css"; 
import "./SimpleSlider/slick-theme.css";
import '../styles/moviesStyle.css'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles'


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


    const settings = {
      className: "center",
      centerMode: true,
      centerPadding: "60px",
      infinite: true,
      slidesToShow: 5,
      slidesToScroll:4,
      speed: 500,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
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

  return (
    <Fragment>
   
      <div className="simple">
          <h2>Action</h2>
            <Slider {...settings}>
              {popularMovies.map((movie) => (
              <div>                         
                <img width='200' src={movie.poster_path ? `${Images}${movie.poster_path}` : notAvailable} alt='' />
                <AiFillPlayCircle color='purple' fontSize={45} id='playIcon' />
              </div>
                   
            ))}
           
            </Slider> 
            
      </div>
      <div className="simple">
          <h2>Comedy</h2>
          <Slider {...settings}> 
              {comedy.map((movie) => (
              <div className=''>                
                <img width='200' src={movie.poster_path ? `${Images}${movie.poster_path}` : notAvailable} alt='' />
                <AiFillPlayCircle color='purple' fontSize={45} id='playIcon' />
              </div>
            ))}
        </Slider>
      </div>

      <div className="simple">
          <h2>Drama</h2> 
          <Slider {...settings}>
              {drama.map((movie) => (
              <div className=''>                
                <img width='200' src={movie.poster_path ? `${Images}${movie.poster_path}` : notAvailable} alt='' />
                <AiFillPlayCircle color='purple' fontSize={45} id='playIcon' />
              </div>
            ))}
          </Slider>
      </div>


      <div className="simple">
          <h2>Science Fiction</h2> 
          <Slider {...settings}>
              {sf.map((movie) => (
              <div className=''>                
                <img width='200' src={movie.poster_path ? `${Images}${movie.poster_path}` : notAvailable} alt='' />
                <AiFillPlayCircle color='purple' fontSize={45} id='playIcon' />
              </div>
            ))}
          </Slider>
      </div>

      <div className="simple">
          <h2>Western</h2>
          <Slider {...settings}> 
              {western.map((movie) => (
              <div className=''>                
                <img width='200' src={movie.poster_path ? `${Images}${movie.poster_path}` : notAvailable} alt='' />
                <AiFillPlayCircle color='purple' fontSize={45} id='playIcon' />
              </div>
            ))}
         </Slider>
      </div>
    
    </Fragment>
  )
              }             



export default Movies;