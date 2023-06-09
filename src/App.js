import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovies from "./components/AddMovies";

function App() {
  useEffect(() => {
    moviedetailsfetcher();
  }, []);
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  // function moviedetailsfetcher() {
  //   fetch("https://swapi.dev/api/films/")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const transformeddata = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date,
  //         };
  //       });
  //       setMovies(transformeddata);
  //     });
  // }
  const moviedetailsfetcher = useCallback(async () => {
    {
      setisLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://reactproject-15b3e-default-rtdb.firebaseio.com/movies.json"
        );
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const data = await response.json();
        const loadedmovies = [];
        for (const key in data) {
          loadedmovies.push({
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate,
          });
        }

        setMovies(loadedmovies);
      } catch (error) {
        setError(error.message);
      }
      setisLoading(false);
    }
  });
  async function movieDataHandler(moviedata) {
    const response = await fetch(
      "https://reactproject-15b3e-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(moviedata),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return (
    <React.Fragment>
      <section>
        <AddMovies sendMovieData={movieDataHandler}></AddMovies>
      </section>
      <section>
        <button onClick={moviedetailsfetcher}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && movies.length && !error > 0 ? (
          <p>loading......</p>
        ) : (
          <MoviesList movies={movies} />
        )}
        {!isLoading && movies.length === 0 && !error ? (
          <p>no movies found</p>
        ) : (
          <MoviesList movies={movies} />
        )}
        {!isLoading && error ? <p>something went wrong</p> : ""}
      </section>
    </React.Fragment>
  );
}

export default App;
