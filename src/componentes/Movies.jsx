import axios from 'axios'
import React, { Fragment, Component } from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import notAvailable from './notAvailable.png';
import Slider from 'react-slick';
import "./SimpleSlider/slick.css";
import "./SimpleSlider/slick-theme.css";
import '../styles/moviesStyle.css'
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';



function Movies() {

  const [popularMovies, setPopularMovies] = useState([]);
  const [comedy, setComedyMovies] = useState([])
  const [drama, setDramaMovies] = useState([])
  const [sf, setSFMovies] = useState([])
  const [western, setWesternMovies] = useState([])

  const [trailer, setTrailer] = useState(null)


  const Api = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`;
  const Images = 'https://image.tmdb.org/t/p/w500';
  const trailerApi = `https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=${process.env.REACT_APP_API_KEY}`

  const PopularMoviesCall = async () => {
    const respMovie = await axios.get(Api, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
        include_adult: 'default',
        include_video: 'default',
        with_genres: '28'

      }
    })
    const results = respMovie.data.results;
    setPopularMovies(results)
    console.log(popularMovies)

    const respComedy = await axios.get(Api, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
        include_adult: 'default',
        include_video: 'default',
        with_genres: '35'

      }
    })
    const results2 = respComedy.data.results;
    setComedyMovies(results2)
    console.log(comedy)



    const respDrama = await axios.get(Api, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
        include_adult: 'false',
        include_video: 'default',
        with_genres: '18'

      }
    })
    const results3 = respDrama.data.results;
    setDramaMovies(results3)
    console.log(comedy)



    const respSF = await axios.get(Api, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
        include_adult: 'false',
        include_video: 'default',
        with_genres: '878'

      }
    })
    const results4 = respSF.data.results;
    setSFMovies(results4)
    console.log(sf)


    const respwestern = await axios.get(Api, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
        include_adult: 'false',
        include_video: 'default',
        with_genres: '37'

      }
    })
    const results5 = respwestern.data.results;
    setWesternMovies(results5)
    console.log(western)

 }

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
    height: '400px',
    playerVars: {
      autoplay: 1,
    },
  };
  function toTop() {
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <div id= 'trailer'>        
      </div>
    <Fragment>
      <div>
        {trailer && (
          <YouTube         
            videoId={trailer.results[0].key}
            onReady={handleReady}
            opts={opts}  
          />
        )}
        <div style={{ display: trailer ? 'block' : 'none' }}>
          <AiOutlineClose className="trailerClose" onClick={handleCloseClick} />
        </div>
      </div>

      <div className="simple">
        <h2>Action</h2>
        <Slider {...settings}>
          {popularMovies.map((movie) => (
            <div>
              <img width='200' src={movie.poster_path ? `${Images}${movie.poster_path}` : notAvailable} alt='' />
              <a onClick={toTop}><AiFillPlayCircle onClick={() => handlePlayClick(movie.id)} color='purple' fontSize={45} id='playIcon'/></a>
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
              <a onClick={toTop}><AiFillPlayCircle onClick={() => handlePlayClick(movie.id)} color='purple' fontSize={45} id='playIcon'/></a>
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
              <a onClick={toTop}><AiFillPlayCircle onClick={() => handlePlayClick(movie.id)} color='purple' fontSize={45} id='playIcon'/></a>
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
              <a onClick={toTop}><AiFillPlayCircle onClick={() => handlePlayClick(movie.id)} color='purple' fontSize={45} id='playIcon'/></a>
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
              <a onClick={toTop}><AiFillPlayCircle onClick={() => handlePlayClick(movie.id)} color='purple' fontSize={45} id='playIcon'/></a>
            </div>
          ))}
        </Slider>
      </div>

    </Fragment>
    </div>
  )
}



export default Movies;