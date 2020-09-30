import React, {useState} from "react";

import MovieCard from "./MovieCard";

export default function SearchMovies() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState('');

    const searchMovies = async (e) => {
        e.preventDefault();

        // const API_KEY = process.env.API_KEY;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=c41a7b1e642e7162a71ce85a73130f72&language=en-US&query=${query}&page=1&include_adult=false`;
    
        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);

        } catch(err) {
            console.error(err);
        }
    }

    const displayMovies = () => {
        return (
            movies.filter(movie => movie.poster_path).map(movie => (<MovieCard key={movie.id} movie={movie} />))
        )
    }

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query"></label>
                <input 
                    className="input" 
                    type="text"
                    name="query"
                    placeholder="Movie Name"
                    value={query}
                    onChange={handleChange}
                />
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {movies.length > 0 ? displayMovies() : null}
            </div>    
        </>
    );
}