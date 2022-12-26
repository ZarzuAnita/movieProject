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

function TvShows() {
  
  const [comedyTv, setComedyTv] = useState([])
  const [animation, setAnimationTv] = useState([])
  const [documentary, setDocumentaryTv] = useState([])
  const [mystery, setMysteryTv] = useState([])
  const [reality, setRealityTv] = useState([])

  const [trailerTv, setTrailerTv] = useState(null)
  

  const Api = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}`;
  const Images = 'https://image.tmdb.org/t/p/w500';
  const trailerApi = `https://api.themoviedb.org/3/tv/{tv_id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
  
  const PopularTvCall = async () => {
    
    const respComedy = await axios.get(Api, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
        include_adult: 'default',
        include_video: 'default',
        with_genres: '35'

      }
    })
    const results = respComedy.data.results;
    setComedyTv(results)
   

    const respAnimation = await axios.get(Api, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
        include_adult: 'default',
        include_video: 'default',
        with_genres: '16'

      }
    })
    const results2 = respAnimation.data.results;
    setAnimationTv(results2)
  


    const respDocumentary = await axios.get(Api, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
        include_adult: 'false',
        include_video: 'default',
        with_genres: '99'

      }
    })
    const results3 = respDocumentary.data.results;
    setDocumentaryTv(results3)
  



    const respMystery = await axios.get(Api, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
        include_adult: 'false',
        include_video: 'default',
        with_genres: '9648'

      }
    })
    const results4 = respMystery.data.results;
    setMysteryTv(results4)
  

    const respReality = await axios.get(Api, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: 'en-US',
        include_adult: 'false',
        include_video: 'default',
        with_genres: '10764'

      }
    })
    const results5 = respReality.data.results;
    setRealityTv(results5)
   
  }  



  const getTvTrailer = async (tvId) => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
    const data = await response.json();
    return data;
  }

  const handlePlayClick = async (tvId) => {
    const tvTrailer = await getTvTrailer(tvId);
    setTrailerTv(tvTrailer);
  }

  const handleCloseClick = () => {
    setTrailerTv(null);
  }

  const handleReady = (event) => {
    event.target.playVideo();
  };

  useEffect(() => {
    PopularTvCall()
  }, [])

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
    <Fragment>
    <div>
        {trailerTv && (
          <YouTube
            videoId={trailerTv.results[0] ? trailerTv.results[0].key : "trailer not found"}
            onReady={handleReady}
            opts={opts}  
          />
        )}
        <div style={{ display: trailerTv ? 'block' : 'none' }}>
          <AiOutlineClose className="trailerClose" onClick={handleCloseClick} />
        </div>
      </div>
  
      <div className="simple">
        <h2>Comedy</h2>
        <Slider {...settings}>
          {comedyTv.map((tv) => (
            <div >
              <img width='200' src={tv.poster_path ? `${Images}${tv.poster_path}` : notAvailable} alt='' />
              <a onClick={toTop}><AiFillPlayCircle onClick={() => handlePlayClick(tv.id)} color='purple' fontSize={45} id='playIcon'/></a>
            </div>

          ))}
        </Slider>
      </div>

      <div className="simple">
        <h2>Animation</h2>
        <Slider {...settings}>
          {animation.map((tv) => (
            <div className=''>
              <img width='200' src={tv.poster_path ? `${Images}${tv.poster_path}` : notAvailable} alt='' />
              <a onClick={toTop}><AiFillPlayCircle onClick={() => handlePlayClick(tv.id)} color='purple' fontSize={45} id='playIcon'/></a>
            </div>
          ))}
        </Slider>
      </div>
      
      
      <div className="simple">
        <h2>Documentary</h2>
        <Slider {...settings}>
          {documentary.map((tv) => (
            <div className=''>
              <img width='200' src={tv.poster_path ? `${Images}${tv.poster_path}` : notAvailable} alt='' />
              <a onClick={toTop}><AiFillPlayCircle onClick={() => handlePlayClick(tv.id)} color='purple' fontSize={45} id='playIcon'/></a>
            </div>
          ))}
        </Slider>
      </div>

      <div className="simple">
        <h2>Mystery</h2>
        <Slider {...settings}>
          {mystery.map((tv) => (
            <div className=''>
              <img width='200' src={tv.poster_path ? `${Images}${tv.poster_path}` : notAvailable} alt='' />
              <a onClick={toTop}><AiFillPlayCircle onClick={() => handlePlayClick(tv.id)} color='purple' fontSize={45} id='playIcon'/></a>
            </div>
          ))}
        </Slider>
      </div>  

      <div className="simple">
        <h2>Reality</h2>
        <Slider {...settings}>
          {reality.map((tv) => (
            <div className=''>
              <img width='200' src={tv.poster_path ? `${Images}${tv.poster_path}` : notAvailable} alt='' />
              <a onClick={toTop}><AiFillPlayCircle onClick={() => handlePlayClick(tv.id)} color='purple' fontSize={45} id='playIcon'/></a>
            </div>
          ))}
        </Slider>
      </div>  

      </Fragment>
  )
};

export default TvShows;