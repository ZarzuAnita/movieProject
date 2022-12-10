import React, { Fragment } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { Routes, Route, NavLink} from 'react-router-dom';
import Home from './Home/Home';
import Movies from './Movies';
import TvShows from './TvShows';
import Filters from './Filters';
import logo from './logo.png';
import '../styles/navBarStyle.css';


export default function NavBar() {
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
            <BiSearchAlt fontSize={36} color ='white' id='search'/>
            <input type ="text" placeholder='Search your movie'/>
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
