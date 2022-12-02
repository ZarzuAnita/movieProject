import React, { Fragment } from 'react';
import {BiSearchAlt} from 'react-icons/bi';
import { Routes, Route, NavLink} from 'react-router-dom';
import Movies from './Movies';
import TvShows from './TvShows';
import Trending from './Trends';
import Filters from './Filters';
import logo from './logo.png';

import '../styles/navBarStyle.css'

// id = 'search' mirar luego porqué no está funcionando el posicionarse dentro de la barra de buscador

export default function NavBar() {
  return (
    <Fragment>
        <nav className=''>
            <div className='nav-options'>           
                    <img src={logo} width="250" height="80"/>
                    <NavLink to=''>
                    <span>Movies</span>
                    </NavLink>
                    <NavLink to='/TvShows'>
                    <span>Tv Shows</span>
                    </NavLink>
                    <NavLink to='/Trending'>
                    <span>Trending</span>
                    </NavLink>
                    <NavLink to='/Filters'>
                    <span>Filters</span>
                    </NavLink>
            </div>
            <div className='input-group'>
            <BiSearchAlt fontSize={36} color ='white' id='search'/> 
            <input type ="text" placeholder='Search your movie'/>
            </div>
        </nav>
      <Routes>
          <Route path ='' element= {<Movies/>}/>
          <Route path ='TvShows' element= {<TvShows/>}/>
          <Route path ='Trending' element= {<Trending/>}/>
          <Route path ='Filters' element= {<Filters/>}/>
      </Routes>

    </Fragment>
  )
}
