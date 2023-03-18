import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";
import "./App.css";
import searchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com?apikey=14a5302f";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const movieSearch = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    movieSearch("superman");
  }, []);

  return (
    <div className="app">
      <h1>MovieTime</h1>

      <div className="search">
        <input
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => movieSearch(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
