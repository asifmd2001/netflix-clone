import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTraier from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLarge }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            //console.log(request.data.results);
            setMovies(request.data.results)
            return request;
        }
        fetchData();

    }, [fetchUrl]);
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }

    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTraier(((movie?.title || movie?.name || movie?.original_name || "")))
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => console.log(error));
        }
    };
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_poster">
                {movies.map(movie => (

                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster  ${isLarge && "row__posterLarge"}`}
                        src={`${base_url}${isLarge ? movie.poster_path : movie.backdrop_path ? movie.backdrop_path : movie.poster_path
                            }`}
                        alt={movie.name}
                        title={movie?.title || movie?.name || movie?.original_name}
                    />

                ))}

            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

        </div>
    )
}

export default Row
