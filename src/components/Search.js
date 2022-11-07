import "../App.css";
import { useEffect, useState } from "react";

const Search = () => {
  const [movie, setMovie] = useState("");
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    console.log("Render");

    async function getData() {
      const res = await fetch(
        `http://www.omdbapi.com/?s=${movie}&apikey=681f4c10`
      );

      const data = await res.json();

      const res2 = await fetch(
        ` http://www.omdbapi.com/?i=${data.Search[0].imdbID}&apikey=681f4c10`
      );

      const data2 = await res2.json();

      setMovieData(data2);
    }

    const timeoutId = setTimeout(() => {
      if (movie) {
        getData();
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [movie]);

  return (
    <div className="container">
      <div className="search-container">
        <input
          className="search"
          type="text"
          placeholder="Search movie"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
        />
        <span className="icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>
      {movie ? (
        <div className="movie-container">
          <div className="img-container">
            <img className="img" src={movieData.Poster} alt="" />
          </div>
          <div className="movie-description">
            <h1 className="title"> {movieData.Title} </h1>
            <p className="relase">
              <b> Released:</b> {movieData.Released}{" "}
            </p>
            <p className="plot"> {movieData.Plot} </p>
            <small className="director">
              <b>Directed by:</b> {movieData.Director}{" "}
            </small>
            <p className="awards">
              <b>Awards:</b> {movieData.Awards}{" "}
            </p>
            <p className="actors">
              <b>Actors:</b> {movieData.Actors}{" "}
            </p>
            <p className="genre">
              <b> Genre:</b> {movieData.Genre}{" "}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
