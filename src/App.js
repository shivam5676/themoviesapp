import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setisLoading]=useState(false)
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

  async function moviedetailsfetcher() {
    setisLoading(true);
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    const transformeddata = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformeddata);
    setisLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={moviedetailsfetcher}>Fetch Movies</button>
      </section>
      <section>
        {isLoading&&movies.length>0?<p>loading......</p>: <MoviesList movies={movies} />}
        {!isLoading&&movies.length===0?<p>no movies found</p>: <MoviesList movies={movies} />}
       
      </section>
    </React.Fragment>
  );
}

export default App;
