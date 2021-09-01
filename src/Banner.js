import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './request';
import './Banner.css';
function Banner() {
  const [movie, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovies(
        request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
        ]
      )
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "....." : str;
  }
  return (
    <header className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
        "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
      )`,
        backgroundPosition: "centre centre"

      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__discription">
          {truncate(movie?.overview, 150)}
        </h1>

        {/* bg image*/}
        {/*title*/}
        {/*2 images*/}
        {/* description  */}

      </div>
      <div className="banner__fadebottom" />
    </header>
  )
}

export default Banner
//{/* */}