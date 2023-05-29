import { Fragment, useState } from "react";

const AddMovies = (props) => {
  const [title, setTitle] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const releaseDateHandler = (event) => {
    setReleaseDate(event.target.value);
  };
  const openingTextHandler = (event) => {
    setOpeningText(event.target.value);
  };
  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const addMoviesHandler = (event) => {
    event.preventDefault();
    const NewMovieobj={
        title:title,
        openingText:openingText,
        releaseDate:releaseDate
    }
    props.sendMovieData(NewMovieobj);
  };
  return (
    <Fragment>
      <form onSubmit={addMoviesHandler}>
        <label>Title</label>
        <input onChange={titleHandler} required></input>
        <br></br>
        <label>Opening Text</label>
        <input onChange={openingTextHandler} required></input>
        <br></br>
        <label>Release Date</label>
        <input onChange={releaseDateHandler} required></input>
        <br></br>
        <button>Add Movies</button>
      </form>
    </Fragment>
  );
};
export default AddMovies;
