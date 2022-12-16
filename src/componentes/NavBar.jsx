import React, { Fragment } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { Routes, Route, NavLink} from 'react-router-dom';
import Home from './Home/Home';
import { useState, useEffect } from 'react';
import Movies from './Movies';
import TvShows from './TvShows';
import Filters from './Filters';
import logo from './logo.png';
import '../styles/navBarStyle.css';
import axios from 'axios';


export default function NavBar() {
  const [ apiData, setApiData ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [layer, setLayer] = useState(false);
  const moviesCall = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`;
  const images = 'https://image.tmdb.org/t/p/w500/';
  const searchInput = document.getElementById('search');
  const popup = document.getElementById('popup');

  const handleSearch = (event) => {
    console.log(apiData.length)
    setSearch(event.target.value);
  };

  const popupDisplay = () => {
    
  };

  const movieCall = async () => {
    const getAllData = await axios.get(moviesCall,{
      params: {
        api_key: process.env.REACT_APP_API_KEY
      }
  });
  const results = getAllData.data.results;
  results.splice(10, 10);
  setApiData(results);
  };

  useEffect(()=>{movieCall()},[search]);

  return (
    <Fragment>
        <nav className=''>
            <div className='nav-options'>           
                    <img src={logo} width="250" height="80"/>
                    <NavLink to=''>
                    <span>Home</span>
                    </NavLink>
                    <NavLink to='/Movies'>
                    <span>Movies</span>
                    </NavLink>
                    <NavLink to='/TvShows'>
                    <span>Tv Shows</span>
                    </NavLink>
                    <NavLink to='/Filters'>
                    <span>Filters</span>
                    </NavLink>
            </div>
            <div className='input-group'>
              <div onClick={() => setLayer(true)}>
            <BiSearchAlt fontSize={36} color ='white' id='search'/>
            </div>
            <input id='search' type ="text" placeholder='Search your movie' value={search} onChange={handleSearch}/>

            <div className='popup' style={{disable: layer? 'block' : 'none'}}>
            <button  className="X" onClick={() => setLayer(false)} style={{display: layer? 'block' : 'none'}}>X</button>
            {apiData.map((movie, index) => {
                return (
                 <div key={index} className="">
                    <img  height='300' width='150'src={movie ? images + movie.poster_path : ""} alt="image not found"/>
                </div>
                )})}
            </div>

            </div>
        </nav>
      <Routes>
          <Route path ='' element= {<Home/>}/>
          <Route path ='Movies' element= {<Movies/>}/>
          <Route path ='TvShows' element= {<TvShows/>}/>
          <Route path ='Filters' element= {<Filters/>}/>
      </Routes>

    </Fragment>
  )
};
